import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/services/auth';
import path from 'path';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  return Boolean(token && verifySessionToken(token));
}

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml'
];

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized staff access' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided in request' }, { status: 400 });
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds maximum 15MB limit' }, { status: 400 });
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Allowed formats: JPG, PNG, WebP, GIF, SVG' 
      }, { status: 400 });
    }

    // Prepare target directory in public/uploads/gallery
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate sanitized unique filename
    const timestamp = Date.now();
    const cleanName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-');
    const filename = `${timestamp}-${cleanName}`;
    const filePath = path.join(uploadDir, filename);

    // Convert File buffer to Node Buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/gallery/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'Diagnostic image uploaded successfully',
      url: publicUrl,
      filename,
      size: file.size,
      mimeType: file.type
    });
  } catch (error: any) {
    console.error('[Admin Upload API Error]:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to upload image' 
    }, { status: 500 });
  }
}
