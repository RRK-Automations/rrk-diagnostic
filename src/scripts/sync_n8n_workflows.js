const https = require('https');
const fs = require('fs');
const path = require('path');
const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

const N8N_HOST = process.env.N8N_HOST || 'uday06.app.n8n.cloud';
const N8N_API_KEY = process.env.N8N_API_KEY;

if (!N8N_API_KEY) {
  console.log('\n❌ [n8n Sync Error]: N8N_API_KEY is missing in .env.local.');
  console.log('💡 How to get your API Key:');
  console.log('   1. Open n8n (https://uday06.app.n8n.cloud)');
  console.log('   2. Go to Settings ➔ n8n API ➔ Create API Key');
  console.log('   3. Add N8N_API_KEY=your_key_here to .env.local\n');
  process.exit(0);
}

function n8nRequest(method, endpointPath, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;

    const req = https.request({
      hostname: N8N_HOST,
      path: `/api/v1${endpointPath}`,
      method: method,
      headers: {
        'X-N8N-API-KEY': N8N_API_KEY,
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (payload) req.write(payload);
    req.end();
  });
}

async function syncWorkflowFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ File not found: ${filePath}`);
    return;
  }

  const workflowJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const workflowName = workflowJson.name;

  console.log(`\n🔄 Syncing workflow: "${workflowName}"...`);

  // 1. Get existing workflows from n8n Cloud
  const listRes = await n8nRequest('GET', '/workflows');
  if (listRes.status !== 200) {
    console.error(`❌ Failed to list workflows:`, listRes.data);
    return;
  }

  const existingWorkflows = listRes.data.data || [];
  const matched = existingWorkflows.find(w => w.name.toLowerCase() === workflowName.toLowerCase());

  if (matched) {
    // 2. Update existing workflow via PUT /api/v1/workflows/:id
    console.log(`📌 Found existing workflow ID: ${matched.id}. Pushing updates...`);
    const updateRes = await n8nRequest('PUT', `/workflows/${matched.id}`, {
      name: workflowJson.name,
      nodes: workflowJson.nodes,
      connections: workflowJson.connections,
      settings: workflowJson.settings || {}
    });

    if (updateRes.status === 200) {
      console.log(`✅ SUCCESS: "${workflowName}" updated automatically on n8n Cloud!`);
    } else {
      console.error(`❌ Update error:`, updateRes.data);
    }
  } else {
    // 3. Create new workflow via POST /api/v1/workflows
    console.log(`✨ Creating new workflow in n8n Cloud...`);
    const createRes = await n8nRequest('POST', '/workflows', {
      name: workflowJson.name,
      nodes: workflowJson.nodes,
      connections: workflowJson.connections,
      settings: workflowJson.settings || {}
    });

    if (createRes.status === 200 || createRes.status === 201) {
      console.log(`✅ SUCCESS: "${workflowName}" created and synced on n8n Cloud!`);
    } else {
      console.error(`❌ Create error:`, createRes.data);
    }
  }
}

async function main() {
  console.log('==============================================');
  console.log('🚀 ASHA JYOTHI - AUTOMATIC N8N WORKFLOW SYNC');
  console.log('==============================================');

  await syncWorkflowFile('src/config/n8nWorkflowTemplate.json');
  await syncWorkflowFile('src/config/n8nWhatsAppChatbotTemplate.json');

  console.log('\n🎉 All workflow templates synchronized with n8n Cloud!');
}

main();
