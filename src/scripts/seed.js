const { loadEnvConfig } = require('@next/env');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables from .env.local/etc.
loadEnvConfig(process.cwd());

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in the environment.');
  process.exit(1);
}

// Inline Schema definitions for script simplicity
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' }
});

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },
  service: { type: String, required: true, trim: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  message: { type: String, trim: true, default: '' },
  bookingType: { type: String, enum: ['walk-in', 'home_collection'], default: 'walk-in' },
  address: { type: String, default: '' },
  landmark: { type: String, default: '' },
  fastingRequired: { type: Boolean, default: false },
  packageId: { type: String, default: '' },
  status: {
    type: String,
    enum: ['new', 'contacted', 'confirmed', 'completed', 'cancelled'],
    default: 'new'
  }
}, { timestamps: true });

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },
  service: { type: String, trim: true, default: '' },
  message: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved'],
    default: 'new'
  }
}, { timestamps: true });

const TestResultSchema = new mongoose.Schema({
  parameter: { type: String, required: true },
  value: { type: String, required: true },
  unit: { type: String, default: '' },
  referenceRange: { type: String, default: '' },
  flag: { type: String, enum: ['normal', 'high', 'low'], default: 'normal' }
}, { _id: false });

const ReportSchema = new mongoose.Schema({
  reportCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
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

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema);

async function seed() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB.');

    // 1. Seed Admin User
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      console.log('Seeding default admin user...');
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await User.create({
        username: 'admin',
        passwordHash,
        role: 'admin'
      });
      console.log(`Admin user created. Username: admin, Password: ${ADMIN_PASSWORD}`);
    } else {
      console.log('Admin user already exists. Skipping user seed.');
    }

    // 2. Clear old mock data
    console.log('Clearing old mock entries...');
    await Appointment.deleteMany({ patientName: { $regex: /^Demo Patient/ } });
    await Enquiry.deleteMany({ name: { $regex: /^Demo Enquirer/ } });
    await Report.deleteMany({ reportCode: { $regex: /^AJ-RPT-/ } });

    // 3. Seed Mock Appointments (with home collection entries)
    console.log('Seeding mock appointments...');
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];

    const mockAppointments = [
      {
        patientName: 'Demo Patient: Keshava Rao',
        phone: '9848022338',
        email: 'keshava.r@gmail.com',
        service: 'Master Health Checkup',
        preferredDate: tomorrow,
        preferredTime: '07:00 AM - 08:00 AM (Early Fasting)',
        bookingType: 'home_collection',
        address: 'H.No 12-44, Keshava Nagar Colony, Toopran',
        landmark: 'Near Water Tank',
        fastingRequired: true,
        message: 'Elderly patient. Please send home phlebotomist for fasting draw.',
        status: 'new'
      },
      {
        patientName: 'Demo Patient: Anitha Reddy',
        phone: '9440123456',
        email: 'anitha.reddy@yahoo.com',
        service: 'Digital X-Ray',
        preferredDate: today,
        preferredTime: '02:30 PM - 03:00 PM',
        bookingType: 'walk-in',
        message: 'Chest X-Ray suggested by physician for chronic cough.',
        status: 'confirmed'
      },
      {
        patientName: 'Demo Patient: Balaji Naidu',
        phone: '9908123456',
        email: 'balaji.n@outlook.com',
        service: 'Comprehensive Diabetic Profile',
        preferredDate: tomorrow,
        preferredTime: '08:00 AM - 09:00 AM (Fasting Slot)',
        bookingType: 'home_collection',
        address: 'Flat 202, Sri Sai Nilayam, Toopran',
        landmark: 'Opposite State Bank of India',
        fastingRequired: true,
        message: 'Fasting blood sugar & HbA1c testing.',
        status: 'contacted'
      },
      {
        patientName: 'Demo Patient: Ramesh Kumar',
        phone: '9123456789',
        email: 'ramesh.k@gmail.com',
        service: 'Pathology & Blood Laboratory',
        preferredDate: today,
        preferredTime: '08:00 AM - 08:30 AM',
        bookingType: 'walk-in',
        message: 'Fasting lipid profile test requested.',
        status: 'completed'
      },
      {
        patientName: 'Demo Patient: Lakshmi Devi',
        phone: '9876543210',
        email: '',
        service: 'ECG & Heart Monitoring',
        preferredDate: nextWeek,
        preferredTime: '04:00 PM - 04:30 PM',
        bookingType: 'walk-in',
        message: 'Cardiology screening requested.',
        status: 'cancelled'
      }
    ];

    await Appointment.insertMany(mockAppointments);
    console.log('Seeded mock appointments successfully.');

    // 4. Seed Mock Enquiries
    console.log('Seeding mock enquiries...');
    const mockEnquiries = [
      {
        name: 'Demo Enquirer: Dr. Srinivas',
        phone: '9490123456',
        email: 'srinivas.doc@gmail.com',
        service: 'CT Scan',
        message: 'Do you support contrast CT scans? What is the preparation time?',
        status: 'new'
      },
      {
        name: 'Demo Enquirer: Prasad Rao',
        phone: '9440012345',
        email: 'prasad.rao@outlook.com',
        service: 'Health Packages',
        message: 'Do you offer home collection services for the Senior Citizen Care package?',
        status: 'contacted'
      }
    ];

    await Enquiry.insertMany(mockEnquiries);
    console.log('Seeded mock enquiries successfully.');

    // 5. Seed Mock Diagnostic Reports for patient download testing
    console.log('Seeding sample patient diagnostic reports...');
    const mockReports = [
      {
        reportCode: 'AJ-RPT-101-4921',
        patientName: 'Demo Patient: Keshava Rao',
        phone: '9848022338',
        gender: 'Male',
        age: 62,
        testName: 'Complete Hemogram & Lipid Profile',
        testDate: today,
        doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
        status: 'ready',
        results: [
          { parameter: 'Hemoglobin (Hb)', value: '13.8', unit: 'g/dL', referenceRange: '13.0 - 17.0', flag: 'normal' },
          { parameter: 'Total Cholesterol', value: '235', unit: 'mg/dL', referenceRange: '< 200', flag: 'high' },
          { parameter: 'Triglycerides', value: '180', unit: 'mg/dL', referenceRange: '< 150', flag: 'high' },
          { parameter: 'HDL (Good Cholesterol)', value: '45', unit: 'mg/dL', referenceRange: '> 40', flag: 'normal' },
          { parameter: 'LDL (Bad Cholesterol)', value: '154', unit: 'mg/dL', referenceRange: '< 100', flag: 'high' },
          { parameter: 'Fasting Blood Glucose', value: '98', unit: 'mg/dL', referenceRange: '70 - 100', flag: 'normal' }
        ],
        conclusion: 'Moderate Hypercholesterolemia observed. Dietary modification and physician review advised.'
      },
      {
        reportCode: 'AJ-RPT-102-8832',
        patientName: 'Demo Patient: Anitha Reddy',
        phone: '9440123456',
        gender: 'Female',
        age: 38,
        testName: 'Complete Thyroid Profile (T3, T4, TSH)',
        testDate: today,
        doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
        status: 'ready',
        results: [
          { parameter: 'Total Triiodothyronine (T3)', value: '1.2', unit: 'ng/mL', referenceRange: '0.8 - 2.0', flag: 'normal' },
          { parameter: 'Total Thyroxine (T4)', value: '8.4', unit: 'ug/dL', referenceRange: '5.1 - 14.1', flag: 'normal' },
          { parameter: 'Ultrasensitive TSH', value: '2.45', unit: 'uIU/mL', referenceRange: '0.27 - 4.20', flag: 'normal' }
        ],
        conclusion: 'Euthyroid state. All thyroid parameters are within standard reference intervals.'
      },
      {
        reportCode: 'AJ-RPT-103-6719',
        patientName: 'Demo Patient: Ramesh Kumar',
        phone: '9123456789',
        gender: 'Male',
        age: 45,
        testName: 'Kidney Function Test (KFT & Serum Creatinine)',
        testDate: today,
        doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
        status: 'ready',
        results: [
          { parameter: 'Blood Urea', value: '28', unit: 'mg/dL', referenceRange: '15 - 45', flag: 'normal' },
          { parameter: 'Serum Creatinine', value: '0.9', unit: 'mg/dL', referenceRange: '0.6 - 1.2', flag: 'normal' },
          { parameter: 'Serum Uric Acid', value: '5.2', unit: 'mg/dL', referenceRange: '3.5 - 7.2', flag: 'normal' }
        ],
        conclusion: 'Renal parameters within normal physiological limits.'
      }
    ];

    await Report.insertMany(mockReports);
    console.log('Seeded sample diagnostic reports successfully.');

    console.log('Database seeding operation fully completed.');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  }
}

seed();
