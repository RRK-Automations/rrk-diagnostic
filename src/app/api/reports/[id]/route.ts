import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Report from '@/models/Report';

// GET /api/reports/[id] - Retrieve single report
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    let report = null;
    if (id.startsWith('AJ-') || id.startsWith('aj-')) {
      report = await Report.findOne({ reportCode: id.toUpperCase() });
    } else {
      report = await Report.findById(id);
    }

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, report });

  } catch (error: any) {
    console.error('Failed to get report detail:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
