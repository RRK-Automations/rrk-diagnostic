import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/config/db';
import Enquiry from '@/models/Enquiry';
import { verifySessionToken } from '@/services/auth';
import { isRateLimited } from '@/services/rateLimit';
import { triggerEnquiryWebhook } from '@/services/automation';

// GET /api/enquiries (Protected Admin Route)
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    // Build filter query
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, enquiries });

  } catch (error: any) {
    console.error('Failed to get enquiries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/enquiries (Public enquiry submission)
export async function POST(request: Request) {
  try {
    // 1. Check Rate Limiter
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    // 2. Validate input
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Required fields: Name, Phone, and Message' },
        { status: 400 }
      );
    }

    // 3. Create enquiry
    const enquiry = await Enquiry.create({
      name,
      phone,
      email: email || '',
      service: service || '',
      message,
      status: 'new'
    });

    // 4. Trigger n8n webhook asynchronously (non-blocking)
    triggerEnquiryWebhook(enquiry).catch((err) => {
      console.error('Asynchronous enquiry webhook dispatch failed:', err);
    });

    return NextResponse.json({
      success: true,
      enquiryId: enquiry._id,
      status: enquiry.status,
      message: 'Enquiry request received. Our team will contact you shortly.'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Failed to create enquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
