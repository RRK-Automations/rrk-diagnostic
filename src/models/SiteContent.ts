import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteContent extends Document {
  // Centre & Contact Info
  centreName: string;
  tagline: string;
  directorName: string;
  directorDesignation: string;
  yearsOfExcellence: number;
  establishedYear: number;
  address: string;
  phones: string[];
  landlines: string[];
  email: string;
  operatingHours: string;
  emergencySupport: string;
  whatsappNumber: string;
  whatsappPrefilledMessage: string;

  // Hero & Announcement Settings
  heroHeadline: string;
  heroSubheading: string;
  discountBannerText: string;
  discountPercentage: number;
  heroVideoUrl: string;
  heroPosterUrl: string;
  labVideoUrl: string;

  // Health Packages
  packages: Array<{
    id: string;
    name: string;
    tagline: string;
    actualPrice: number;
    price: number;
    testsCount: number;
    tests: string[];
    fasting: string;
    badge?: string;
    popular?: boolean;
  }>;

  // Diagnostic Divisions
  divisions: Array<{
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    tags: string[];
    timing: string;
  }>;

  // Individual Test Pricing Catalog
  services: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    turnaroundTime: string;
    preparation?: string;
    description: string;
  }>;

  // Consultant Specialists & Doctors
  consultants: Array<{
    id: string;
    name: string;
    specialty: string;
    qualification?: string;
    experience?: string;
    timing?: string;
    availableDays?: string;
  }>;

  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    centreName: { type: String, required: true, default: 'Asha Jyothi Diagnostic Centre' },
    tagline: { type: String, default: 'Precision Diagnostics & Compassionate Care' },
    directorName: { type: String, required: true, default: 'P. Mallesh Goud' },
    directorDesignation: { type: String, default: 'Director' },
    yearsOfExcellence: { type: Number, default: 33 },
    establishedYear: { type: Number, default: 1992 },
    address: { 
      type: String, 
      required: true, 
      default: 'Behind Surya Medical & General Stores, Main Road, TOOPRAN - 502 334, Medak District, Telangana' 
    },
    phones: { type: [String], default: ['94400 09788', '94402 82688'] },
    landlines: { type: [String], default: ['08454-235537', '08454-235538'] },
    email: { type: String, default: 'ashajyothidiagnostic@gmail.com' },
    operatingHours: { type: String, default: '7:00 AM – 9:00 PM (All 7 Days)' },
    emergencySupport: { type: String, default: '24/7 Emergency Support' },
    whatsappNumber: { type: String, default: '919440009788' },
    whatsappPrefilledMessage: { 
      type: String, 
      default: 'Hi Asha Jyothi Diagnostics, I would like to book a diagnostic test / home visit.' 
    },

    heroHeadline: { type: String, default: 'Precision Diagnostics. Compassionate Care.' },
    heroSubheading: { 
      type: String, 
      default: 'Under the leadership of Director P. Mallesh Goud, Asha Jyothi brings comprehensive pathology, 4D ultrasound, CT scan, digital X-Ray & OPG, and 2D Echo under one roof in Toopran with same-day reports and 24/7 emergency support.' 
    },
    discountBannerText: { 
      type: String, 
      default: 'Special Promotion: Flat 25% Discount on all 10 Official Health Checkup Packages!' 
    },
    discountPercentage: { type: Number, default: 25 },
    heroVideoUrl: { type: String, default: '/videos/hero.mp4' },
    heroPosterUrl: { type: String, default: '/images/hero-poster.jpg' },
    labVideoUrl: { type: String, default: '/videos/lab.mp4' },

    packages: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        tagline: { type: String, default: '' },
        actualPrice: { type: Number, required: true },
        price: { type: Number, required: true },
        testsCount: { type: Number, required: true },
        tests: { type: [String], default: [] },
        fasting: { type: String, default: '10-12 hours overnight fasting' },
        badge: { type: String, default: '25% OFF' },
        popular: { type: Boolean, default: false }
      }
    ],

    divisions: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        tags: { type: [String], default: [] },
        timing: { type: String, default: 'Same-Day' }
      }
    ],

    services: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        turnaroundTime: { type: String, default: '2-4 hours' },
        preparation: { type: String, default: '' },
        description: { type: String, default: '' }
      }
    ],

    consultants: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        specialty: { type: String, required: true },
        qualification: { type: String, default: '' },
        experience: { type: String, default: '' },
        timing: { type: String, default: 'By Prior Appointment' },
        availableDays: { type: String, default: 'Monday – Saturday' }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);
