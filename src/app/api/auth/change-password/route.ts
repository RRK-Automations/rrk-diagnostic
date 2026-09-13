import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import connectDB from '@/config/db';
import User from '@/models/User';
import { verifySessionToken } from '@/services/auth';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: Session token missing' },
        { status: 401 }
      );
    }

    const session = verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or expired session' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Both current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ username: session.username.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: 'User account not found' },
        { status: 440 }
      );
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    user.passwordHash = await bcrypt.hash(newPassword, saltRounds);
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully! Please log in again with your new password on next session.'
    });

  } catch (error: any) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: 'Server error updating password' },
      { status: 500 }
    );
  }
}
