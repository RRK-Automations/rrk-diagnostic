import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/config/db';
import Enquiry from '@/models/Enquiry';
import { verifySessionToken } from '@/services/auth';

// PATCH /api/enquiries/[id] (Protected - Update enquiry status)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { status } = body;

    if (!status || !['new', 'contacted', 'resolved'].includes(status)) {
      return NextResponse.json({ error: 'Invalid or missing status parameter' }, { status: 400 });
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    enquiry.status = status;
    await enquiry.save();

    return NextResponse.json({ success: true, enquiry });

  } catch (error: any) {
    console.error('Failed to update enquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry });

  } catch (error: any) {
    console.error('Failed to get enquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
