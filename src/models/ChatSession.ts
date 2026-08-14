import mongoose, { Schema, Document } from 'mongoose';

export interface IChatSession extends Document {
  phone: string;
  patientName: string;
  step: 'IDLE' | 'AWAITING_NAME' | 'AWAITING_AGE_GENDER' | 'AWAITING_SERVICE' | 'AWAITING_BOOKING_TYPE' | 'AWAITING_ADDRESS' | 'AWAITING_SLOT' | 'AWAITING_REPORT_QUERY';
  bookingData: {
    fullName?: string;
    age?: string;
    gender?: string;
    service?: string;
    bookingType?: 'walk-in' | 'home_collection';
    address?: string;
    landmark?: string;
    preferredDate?: string;
    preferredTime?: string;
    referringDoctor?: string;
    fastingRequired?: boolean;
    fastingGuidelines?: string;
  };
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema: Schema = new Schema({
  phone: { type: String, required: true, unique: true, index: true },
  patientName: { type: String, default: 'Valued Patient' },
  step: { 
    type: String, 
    enum: [
      'IDLE', 
      'AWAITING_NAME', 
      'AWAITING_AGE_GENDER', 
      'AWAITING_SERVICE', 
      'AWAITING_BOOKING_TYPE', 
      'AWAITING_ADDRESS', 
      'AWAITING_SLOT', 
      'AWAITING_REPORT_QUERY'
    ], 
    default: 'IDLE' 
  },
  bookingData: {
    fullName: { type: String },
    age: { type: String },
    gender: { type: String },
    service: { type: String },
    bookingType: { type: String, enum: ['walk-in', 'home_collection'] },
    address: { type: String },
    landmark: { type: String },
    preferredDate: { type: String },
    preferredTime: { type: String },
    referringDoctor: { type: String },
    fastingRequired: { type: Boolean, default: false },
    fastingGuidelines: { type: String }
  },
  lastMessageAt: { type: Date, default: Date.now }
}, { timestamps: true });

if (mongoose.models.ChatSession) {
  delete mongoose.models.ChatSession;
}

export default mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
