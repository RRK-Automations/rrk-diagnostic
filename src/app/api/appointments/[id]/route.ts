import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/config/db';
import Appointment from '@/models/Appointment';
import { verifySessionToken } from '@/services/auth';
import { triggerStatusChangeWebhook } from '@/services/automation';

// GET /api/appointments/[id] (Protected - Retrieve specific appointment)
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
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, appointment });

  } catch (error: any) {
    console.error('Failed to get appointment detail:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/appointments/[id] (Protected - Update appointment status and notes/message)
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
    const { status, message } = body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Update fields if provided
    let statusChanged = false;
    if (status) {
      if (!['new', 'contacted', 'confirmed', 'completed', 'cancelled'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
      }
      if (appointment.status !== status) {
        appointment.status = status;
        statusChanged = true;
      }
    }

    if (message !== undefined) {
      appointment.message = message;
    }

    await appointment.save();

    // Trigger n8n webhook on status changes
    if (statusChanged) {
      triggerStatusChangeWebhook(appointment).catch((err) => {
        console.error('Failed to trigger async status change webhook:', err);
      });
    }

    return NextResponse.json({ success: true, appointment });

  } catch (error: any) {
    console.error('Failed to update appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
