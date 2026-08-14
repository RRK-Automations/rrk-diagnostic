import { NextRequest, NextResponse } from 'next/server';
import workflowJson from '@/config/n8nWorkflowTemplate.json';
import chatbotJson from '@/config/n8nWhatsAppChatbotTemplate.json';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (type === 'chatbot') {
    return new NextResponse(JSON.stringify(chatbotJson, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="ashajyothi_n8n_whatsapp_chatbot.json"'
      }
    });
  }

  return new NextResponse(JSON.stringify(workflowJson, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="ashajyothi_n8n_master_workflow.json"'
    }
  });
}
