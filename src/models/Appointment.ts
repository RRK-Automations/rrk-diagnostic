import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  patientName: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // Slot name
  message?: string;
  bookingType: 'walk-in' | 'home_collection';
  address?: string;
  landmark?: string;
  fastingRequired?: boolean;
  packageId?: string;
  referringDoctor?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema({
  patientName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },
  service: { type: String, required: true, trim: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  message: { type: String, trim: true, default: '' },
  bookingType: { 
    type: String, 
    enum: ['walk-in', 'home_collection'], 
    default: 'walk-in' 
  },
  address: { type: String, trim: true, default: '' },
  landmark: { type: String, trim: true, default: '' },
  fastingRequired: { type: Boolean, default: false },
  packageId: { type: String, trim: true, default: '' },
  referringDoctor: { type: String, trim: true, default: '' },
  status: {
    type: String,
    enum: ['new', 'contacted', 'confirmed', 'completed', 'cancelled'],
    default: 'new'
  }
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
