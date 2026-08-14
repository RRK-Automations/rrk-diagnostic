import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/config/db';
import IntegrationLog from '@/models/IntegrationLog';
import { verifySessionToken } from '@/services/auth';
import { retryFailedWebhook } from '@/services/automation';

// GET /api/admin/integration - Get recent integration logs (Protected)
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    
    // Return the latest 50 logs
    const logs = await IntegrationLog.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, logs });

  } catch (error: any) {
    console.error('Failed to get integration logs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/integration - Retry a failed webhook integration (Protected)
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { logId } = body;

    if (!logId) {
      return NextResponse.json({ error: 'Missing logId parameter' }, { status: 400 });
    }

    const success = await retryFailedWebhook(logId);
    
    if (success) {
      return NextResponse.json({ success: true, message: 'Webhook synced successfully' });
    } else {
      return NextResponse.json({ success: false, error: 'Retry attempt failed. Check n8n webhook availability.' }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Failed to retry integration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
