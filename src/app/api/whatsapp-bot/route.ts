import { NextRequest, NextResponse } from 'next/server';
import { processInboundWhatsAppMessage } from '@/services/whatsappBot';

export const dynamic = 'force-dynamic';

// 1. Meta Webhook Verification (GET) - Secure Token Challenge
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const EXPECTED_VERIFY_TOKEN = process.env.N8N_WEBHOOK_SECRET || 'demo_webhook_secret_token';

  if (mode === 'subscribe' && token === EXPECTED_VERIFY_TOKEN) {
    console.log('[WhatsApp Bot] Meta Webhook Verified Successfully with secure token!');
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn('[WhatsApp Bot] Unauthorized Webhook Verification Attempt Rejected');
  return new NextResponse('Forbidden: Invalid Verification Token', { status: 403 });
}

// 2. Inbound WhatsApp Messages (POST) - Handles All Message Types & Arrays
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if called directly (Simulator / Direct API)
    if (body.phone && body.message) {
      const fromPhone = body.phone;
      const messageText = body.message;
      const senderName = body.name || 'Valued Patient';

      const botResult = await processInboundWhatsAppMessage(fromPhone, messageText, senderName);

      return NextResponse.json({
        success: true,
        fromPhone,
        senderName,
        receivedMessage: messageText,
        replyText: botResult.replyText,
        actionTaken: botResult.actionTaken || 'NONE',
        bookingCreated: botResult.bookingCreated || null
      }, { status: 200 });
    }

    // Check if called from Meta WhatsApp Cloud API Webhook
    if (body.entry && body.entry[0]?.changes && body.entry[0]?.changes[0]?.value) {
      const value = body.entry[0].changes[0].value;

      // Ignore delivery receipts / status updates
      if (!value.messages || value.messages.length === 0) {
        return NextResponse.json({ status: 'ignored_receipt' }, { status: 200 });
      }

      const results = [];
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
      const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

      // Process all messages in the batch (Issue #10)
      for (const msg of value.messages) {
        const contact = value.contacts && value.contacts[0];
        const fromPhone = String(msg.from || '').replace(/[^0-9]/g, '');
        const senderName = contact?.profile?.name || 'Valued Patient';

        let messageText = '';

        // Validate message types & provide intelligent fallbacks (Issue #9)
        if (msg.type === 'text' && msg.text?.body) {
          messageText = msg.text.body.trim();
        } else if (msg.type === 'interactive' && msg.interactive) {
          messageText = msg.interactive.button_reply?.title || msg.interactive.list_reply?.title || '';
        } else if (msg.type === 'location') {
          messageText = `Location: ${msg.location?.latitude}, ${msg.location?.longitude} (${msg.location?.address || 'Shared Pin'})`;
        } else {
          messageText = `[UNSUPPORTED_MEDIA_${msg.type?.toUpperCase()}]`;
        }

        let botResult;
        if (messageText.startsWith('[UNSUPPORTED_MEDIA_')) {
          botResult = {
            replyText: `📎 *Asha Jyothi Diagnostics*\n\nWe received your ${msg.type || 'media'}. Our automated system currently processes text messages.\n\n👉 Please reply with your request as text or call our helpline directly at *+91 73863 20634*.`
          };
        } else {
          botResult = await processInboundWhatsAppMessage(fromPhone, messageText, senderName);
        }

        // Deliver outgoing response if Meta Cloud API is configured
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

        results.push({
          fromPhone,
          senderName,
          receivedMessage: messageText,
          replyText: botResult.replyText,
          actionTaken: botResult.actionTaken || 'NONE',
          bookingCreated: botResult.bookingCreated || null
        });
      }

      return NextResponse.json({
        success: true,
        processedCount: results.length,
        results: results,
        // Single convenience properties for single-message webhooks
        fromPhone: results[0]?.fromPhone,
        replyText: results[0]?.replyText,
        actionTaken: results[0]?.actionTaken,
        bookingCreated: results[0]?.bookingCreated
      }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid webhook payload structure' }, { status: 400 });

  } catch (error: any) {
    console.error('[WhatsApp Bot] Error handling inbound message:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
