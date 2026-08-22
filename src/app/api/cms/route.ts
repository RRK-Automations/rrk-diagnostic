import { NextResponse } from 'next/server';
import { getSiteContent } from '@/services/siteContent';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    console.error('[API /api/cms] Error fetching site content:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
