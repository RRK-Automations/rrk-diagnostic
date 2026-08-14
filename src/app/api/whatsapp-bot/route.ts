import { NextRequest, NextResponse } from 'next/server';
import { processInboundWhatsAppMessage } from '@/services/whatsappBot';

export const dynamic = 'force-dynamic';

// 1. Meta Webhook Verification (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.N8N_WEBHOOK_SECRET || 'demo_webhook_secret_token';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Bot] Meta Webhook Verified Successfully!');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

// 2. Inbound WhatsApp Messages (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if called directly with simple { phone, message, name } OR Meta WhatsApp Webhook payload
    let fromPhone = '';
    let messageText = '';
    let senderName = 'Valued Patient';

    if (body.phone && body.message) {
      // Direct / Simulator invocation
      fromPhone = body.phone;
      messageText = body.message;
      senderName = body.name || 'Valued Patient';
    } else if (body.entry && body.entry[0]?.changes && body.entry[0]?.changes[0]?.value) {
      // Meta WhatsApp Cloud API Webhook payload
      const value = body.entry[0].changes[0].value;
      if (!value.messages || value.messages.length === 0) {
        return NextResponse.json({ status: 'ignored_receipt' }, { status: 200 });
      }

      const msg = value.messages[0];
      const contact = value.contacts && value.contacts[0];

      fromPhone = msg.from;
      messageText = msg.text ? msg.text.body : '';
      senderName = contact?.profile?.name || 'Valued Patient';
    } else {
      return NextResponse.json({ error: 'Invalid payload structure' }, { status: 400 });
    }

    // Process through the conversational state engine
    const botResult = await processInboundWhatsAppMessage(fromPhone, messageText, senderName);

    // If Meta Access Token is configured in environment, send response automatically via WhatsApp
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (accessToken && phoneNumberId) {
      try {
        await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: fromPhone,
            type: 'text',
            text: {
              body: botResult.replyText
            }
          })
        });
      } catch (waErr) {
        console.error('[WhatsApp Bot] Meta API delivery error:', waErr);
      }
    }

    return NextResponse.json({
      success: true,
      fromPhone,
      senderName,
      receivedMessage: messageText,
      replyText: botResult.replyText,
      actionTaken: botResult.actionTaken,
      bookingCreated: botResult.bookingCreated
    }, { status: 200 });

  } catch (error: any) {
    console.error('[WhatsApp Bot] Error handling inbound message:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
