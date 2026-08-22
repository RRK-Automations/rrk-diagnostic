import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/services/auth';
import { getSiteContent, updateSiteContent, resetSiteContent } from '@/services/siteContent';

export const dynamic = 'force-dynamic';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  return Boolean(token && verifySessionToken(token));
}

// GET /api/admin/cms - Fetch full CMS document for staff editor
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized staff access' }, { status: 401 });
    }

    const content = await getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    console.error('[Admin CMS API GET Error]:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch CMS content' }, { status: 500 });
  }
}

// PUT /api/admin/cms - Save CMS changes
export async function PUT(req: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized staff access' }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateSiteContent(body);

    return NextResponse.json({ 
      success: true, 
      message: 'Website content updated successfully and published live!',
      content: updated 
    });
  } catch (error: any) {
    console.error('[Admin CMS API PUT Error]:', error);
    return NextResponse.json({ error: error.message || 'Failed to update CMS content' }, { status: 500 });
  }
}

// POST /api/admin/cms - Action dispatcher (e.g. reset to official defaults)
export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized staff access' }, { status: 401 });
    }

    const body = await req.json();

    if (body.action === 'reset') {
      const resetData = await resetSiteContent();
      return NextResponse.json({ 
        success: true, 
        message: 'Website content has been successfully restored to official 33-year defaults.', 
        content: resetData 
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('[Admin CMS API POST Error]:', error);
    return NextResponse.json({ error: error.message || 'Failed to execute CMS action' }, { status: 500 });
  }
}
