import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/config/db';
import Appointment from '@/models/Appointment';
import { verifySessionToken } from '@/services/auth';
import { isRateLimited } from '@/services/rateLimit';
import { triggerAppointmentWebhook } from '@/services/automation';

// GET /api/appointments (Protected Admin Route)
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
    const sort = searchParams.get('sort') || 'createdAt_desc';

    // Build filter query
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { patientName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort options
    let sortOptions: any = { createdAt: -1 };
    if (sort === 'preferredDate_asc') {
      sortOptions = { preferredDate: 1, preferredTime: 1 };
    } else if (sort === 'preferredDate_desc') {
      sortOptions = { preferredDate: -1, preferredTime: -1 };
    } else if (sort === 'createdAt_asc') {
      sortOptions = { createdAt: 1 };
    }

    const appointments = await Appointment.find(query).sort(sortOptions);
    return NextResponse.json({ success: true, appointments });

  } catch (error: any) {
    console.error('Failed to get appointments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/appointments (Public booking submission)
export async function POST(request: Request) {
  try {
    // 1. Check Rate Limiter
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try booking again in an hour.' },
        { status: 429 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { 
      patientName, 
      phone, 
      email, 
      service, 
      preferredDate, 
      preferredTime, 
      message,
      bookingType,
      address,
      landmark,
      fastingRequired,
      packageId,
      referringDoctor 
    } = body;

    // 2. Validate input
    if (!patientName || !phone || !service || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Required fields: Patient Name, Phone, Service, Preferred Date, and Preferred Time' },
        { status: 400 }
      );
    }

    if (bookingType === 'home_collection' && !address) {
      return NextResponse.json(
        { error: 'Home address is required for home sample collection requests.' },
        { status: 400 }
      );
    }

    // 3. Create appointment
    const appointment = await Appointment.create({
      patientName,
      phone,
      email: email || '',
      service,
      preferredDate,
      preferredTime,
      message: message || '',
      bookingType: bookingType || 'walk-in',
      address: address || '',
      landmark: landmark || '',
      fastingRequired: Boolean(fastingRequired),
      packageId: packageId || '',
      referringDoctor: referringDoctor || '',
      status: 'new'
    });

    // 4. Trigger n8n webhook asynchronously (non-blocking)
    triggerAppointmentWebhook(appointment).catch((err) => {
      console.error('Asynchronous appointment webhook dispatch failed:', err);
    });

    return NextResponse.json({
      success: true,
      appointmentId: appointment._id,
      status: appointment.status,
      message: 'Appointment request received. Our team will contact you to confirm.'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Failed to create appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
