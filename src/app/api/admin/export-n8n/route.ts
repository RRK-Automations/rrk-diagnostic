import { NextResponse } from 'next/server';
import workflowJson from '@/config/n8nWorkflowTemplate.json';

export async function GET() {
  return new NextResponse(JSON.stringify(workflowJson, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="ashajyothi_n8n_master_workflow.json"'
    }
  });
}
