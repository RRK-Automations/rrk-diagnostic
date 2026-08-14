import mongoose, { Schema, Document } from 'mongoose';

export interface ITestResult {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: 'normal' | 'high' | 'low';
}

export interface IReport extends Document {
  reportCode: string;
  appointmentId?: mongoose.Types.ObjectId;
  patientName: string;
  phone: string;
  gender?: string;
  age?: number;
  testName: string;
  testDate: string;
  doctorName: string;
  status: 'ready' | 'pending';
  results: ITestResult[];
  conclusion?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestResultSchema = new Schema({
  parameter: { type: String, required: true },
  value: { type: String, required: true },
  unit: { type: String, default: '' },
  referenceRange: { type: String, default: '' },
  flag: { type: String, enum: ['normal', 'high', 'low'], default: 'normal' }
}, { _id: false });

const ReportSchema: Schema = new Schema({
  reportCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
  appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  patientName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  gender: { type: String, default: 'Unspecified' },
  age: { type: Number },
  testName: { type: String, required: true, trim: true },
  testDate: { type: String, required: true },
  doctorName: { type: String, default: 'Dr. S. K. Sharma, MD (Pathology)' },
  status: { type: String, enum: ['ready', 'pending'], default: 'ready' },
  results: [TestResultSchema],
  conclusion: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
