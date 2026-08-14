import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/config/db';
import Report from '@/models/Report';
import { verifySessionToken } from '@/services/auth';
import { isRateLimited } from '@/services/rateLimit';
import { triggerReportReadyWebhook } from '@/services/automation';

// GET /api/reports (Patient lookup by phone/code OR Admin list)
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const phone = searchParams.get('phone') || '';
    const code = searchParams.get('code') || '';

    // If admin is requesting all reports
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    const isAdmin = token && verifySessionToken(token);

    if (isAdmin && !query && !phone && !code) {
      const reports = await Report.find().sort({ createdAt: -1 }).limit(100);
      return NextResponse.json({ success: true, reports });
    }

    // Public lookup
    const filterQuery: any = {};

    if (code) {
      filterQuery.reportCode = code.toUpperCase().trim();
    } else if (phone) {
      filterQuery.phone = { $regex: phone.trim().slice(-10) }; // Match last 10 digits
    } else if (query) {
      filterQuery.$or = [
        { reportCode: query.toUpperCase().trim() },
        { phone: { $regex: query.trim() } },
        { patientName: { $regex: query.trim(), $options: 'i' } }
      ];
    } else {
      return NextResponse.json(
        { error: 'Please provide a registered Phone number or Report Reference Code to search.' },
        { status: 400 }
      );
    }

    const reports = await Report.find(filterQuery).sort({ createdAt: -1 });

    if (!reports || reports.length === 0) {
      return NextResponse.json({
        success: true,
        reports: [],
        message: 'No reports found matching the details. If you recently tested, reports may still be processing.'
      });
    }

    return NextResponse.json({ success: true, reports });

  } catch (error: any) {
    console.error('Failed to query reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/reports (Admin create/publish report)
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { 
      patientName, 
      phone, 
      gender, 
      age, 
      testName, 
      testDate, 
      doctorName, 
      results, 
      conclusion,
      appointmentId 
    } = body;

    if (!patientName || !phone || !testName || !testDate || !results || results.length === 0) {
      return NextResponse.json(
        { error: 'Required fields: Patient Name, Phone, Test Name, Test Date, and at least one Result parameter.' },
        { status: 400 }
      );
    }

    // Generate unique Report Reference Code
    const count = await Report.countDocuments();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reportCode = `AJ-RPT-${count + 101}-${randomSuffix}`;

    const report = await Report.create({
      reportCode,
      appointmentId: appointmentId || undefined,
      patientName,
      phone,
      gender: gender || 'Unspecified',
      age: age ? Number(age) : undefined,
      testName,
      testDate,
      doctorName: doctorName || 'Dr. S. K. Sharma, MD (Pathology)',
      status: 'ready',
      results,
      conclusion: conclusion || 'All other parameters within standard biological limits. Clinical correlation recommended.'
    });

    // Trigger n8n webhook asynchronously
    triggerReportReadyWebhook(report).catch((err) => {
      console.error('Asynchronous report ready webhook dispatch failed:', err);
    });

    return NextResponse.json({ success: true, report }, { status: 201 });

  } catch (error: any) {
    console.error('Failed to create report:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
