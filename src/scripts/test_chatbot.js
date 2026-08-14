const http = require('http');
const readline = require('readline');
const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

const SENDER_PHONE = '917386320634';
const SENDER_NAME = 'Uday';

async function sendChatbotMessage(messageText) {
  const payload = JSON.stringify({
    phone: SENDER_PHONE,
    name: SENDER_NAME,
    message: messageText
  });

  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/whatsapp-bot',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            resolve({ replyText: `❌ Server Error: ${json.error}` });
          } else {
            resolve(json);
          }
        } catch (e) {
          resolve({ replyText: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

async function runInteractiveSession() {
  console.log('\n======================================================');
  console.log('🤖 ASHA JYOTHI DIAGNOSTICS - WHATSAPP IN-CHAT BOT');
  console.log(`📱 Simulating Patient WhatsApp: +${SENDER_PHONE} (${SENDER_NAME})`);
  console.log('======================================================');
  console.log('💡 Type any message (e.g. "Hi", "1", "USG", "Tomorrow 8am").');
  console.log('💡 Type "exit" or press Ctrl+C to quit.\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Start with greeting
  const initial = await sendChatbotMessage('Hi');
  console.log(`\n💬 [Asha Jyothi Bot]:\n${initial.replyText}\n`);

  function promptUser() {
    rl.question('👉 [You]: ', async (input) => {
      const trimmed = input.trim();
      if (trimmed.toLowerCase() === 'exit') {
        console.log('\nExiting WhatsApp Bot Simulator. Goodbye!');
        rl.close();
        return;
      }

      if (trimmed.length > 0) {
        try {
          const response = await sendChatbotMessage(trimmed);
          console.log(`\n💬 [Asha Jyothi Bot]:\n${response.replyText}\n`);
          if (response.actionTaken) {
            console.log(`✨ [SYSTEM ACTION]: ${response.actionTaken}`);
          }
        } catch (err) {
          console.error('\n❌ Bot error:', err.message);
        }
      }
      promptUser();
    });
  }

  promptUser();
}

async function main() {
  const arg = process.argv[2];
  if (arg) {
    // Single message mode
    const res = await sendChatbotMessage(arg);
    console.log(`\n💬 [Asha Jyothi Bot Reply]:\n${res.replyText}\n`);
    if (res.actionTaken) {
      console.log(`✨ [SYSTEM ACTION]: ${res.actionTaken}`);
    }
  } else {
    // Interactive chat mode
    await runInteractiveSession();
  }
}

main();
