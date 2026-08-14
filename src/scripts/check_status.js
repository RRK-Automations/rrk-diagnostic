const { loadEnvConfig } = require('@next/env');
const mongoose = require('mongoose');

loadEnvConfig(process.cwd());

const MONGODB_URI = process.env.MONGODB_URI;

const IntegrationLogSchema = new mongoose.Schema({}, { strict: false });
const AppointmentSchema = new mongoose.Schema({}, { strict: false });

const IntegrationLog = mongoose.models.IntegrationLog || mongoose.model('IntegrationLog', IntegrationLogSchema);
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    console.log('\n--- LATEST APPOINTMENTS IN DATABASE ---');
    const recentAppts = await Appointment.find().sort({ createdAt: -1 }).limit(3);
    console.log(JSON.stringify(recentAppts, null, 2));

    console.log('\n--- LATEST INTEGRATION WEBHOOK LOGS ---');
    const recentLogs = await IntegrationLog.find().sort({ createdAt: -1 }).limit(3);
    console.log(JSON.stringify(recentLogs, null, 2));

  } catch (err) {
    console.error('Check status error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

check();
