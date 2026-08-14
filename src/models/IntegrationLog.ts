import mongoose, { Schema, Document } from 'mongoose';

export interface IIntegrationLog extends Document {
  type: 'appointment' | 'enquiry' | 'status_change' | 'report_ready';
  relatedId: mongoose.Types.ObjectId;
  webhookUrl: string;
  status: 'success' | 'failed';
  errorMessage?: string;
  retryCount: number;
  payload: any;
  createdAt: Date;
  updatedAt: Date;
}

const IntegrationLogSchema: Schema = new Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['appointment', 'enquiry', 'status_change', 'report_ready'] 
  },
  relatedId: { type: Schema.Types.ObjectId, required: true },
  webhookUrl: { type: String, required: true },
  status: { type: String, required: true, enum: ['success', 'failed'] },
  errorMessage: { type: String },
  retryCount: { type: Number, default: 0 },
  payload: { type: Schema.Types.Mixed }
}, { timestamps: true });

export default mongoose.models.IntegrationLog || mongoose.model<IIntegrationLog>('IntegrationLog', IntegrationLogSchema);
