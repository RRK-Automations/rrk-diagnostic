import { centreInfo } from '@/config/centreInfo';
import { healthPackages } from '@/config/packages';

export const defaultDivisions = [
  {
    id: '01',
    title: 'Pathology & Blood Laboratory',
    category: 'Pathology',
    image: '/images/pathology.jpg',
    description: 'Fully automated multi-channel biochemistry, hematology, and serology analyzers for high-precision complete blood pictures and metabolic profiling.',
    tags: ['CBC & Haemogram', 'Blood Sugar', 'Lipid Profile', 'LFT & KFT'],
    timing: 'Same-Day (2-3 Hours)'
  },
  {
    id: '02',
    title: 'Thyroid & Hormonal Immunoassays',
    category: 'Pathology',
    image: '/images/thyroid.jpg',
    description: 'High-sensitivity chemiluminescence assays for TSH, Free T3/T4, reproductive fertility hormones, and Vitamin D/B12 estimations.',
    tags: ['TSH Ultra-sensitive', 'Free T3 / T4', 'Vitamin D & B12', 'Hormonal Assay'],
    timing: 'Same-Day Evening'
  },
  {
    id: '03',
    title: '4D Ultrasound & Color Doppler',
    category: 'Radiology & Imaging',
    image: '/images/ultrasound.jpg',
    description: 'High-definition 4D ultrasound imaging for whole abdomen, pelvic, obstetrics anomaly, and vascular arterial/venous Doppler scans.',
    tags: ['Abdomen & Pelvis', 'Color Doppler', 'Obstetric USG', 'USG KUB'],
    timing: 'Immediate Scan Report'
  },
  {
    id: '04',
    title: 'Digital X-Ray & Digital OPG',
    category: 'Radiology & Imaging',
    image: '/images/xray.jpg',
    description: 'Low-dose high-frequency digital radiography for chest, bones, and joints, plus full panoramic dental OPG scans with instant digital reads.',
    tags: ['Chest PA View', 'Bone & Joint', 'Digital OPG Dental', 'Instant Reads'],
    timing: '15-20 Minutes'
  },
  {
    id: '05',
    title: 'Cardiology (2D Echo, ECG, TMT)',
    category: 'Cardiology',
    image: '/images/ecg.jpg',
    description: 'Complete non-invasive cardiac evaluation suite with 12-lead digital ECG, color flow 2D Echocardiography, and computerized Treadmill Stress Test.',
    tags: ['12-Lead ECG', '2D Echo', 'TMT Stress Test', 'TROP-T Cardiac'],
    timing: 'Instant Reporting'
  },
  {
    id: '06',
    title: 'Urine, Stool & Clinical Microscopy',
    category: 'Pathology',
    image: '/images/urine.jpg',
    description: 'Automated strip chemistry, clinical sediment microscopy, and stool hanging-drop preparations for acute infections and gastrointestinal markers.',
    tags: ['Complete Urine (CUE)', 'Urine Culture', 'Stool Hanging Drop', 'Ketone Bodies'],
    timing: '2 Hours'
  },
  {
    id: '07',
    title: 'Fever & Acute Infectious Panels',
    category: 'Pathology',
    image: '/images/fever.jpg',
    description: 'Rapid, calibrated testing for acute fevers including Malaria Smears/Antigen (Pf/Pv), Widal slide/tube agglutination for typhoid, and Dengue NS1.',
    tags: ['Malaria Panel', 'Widal Typhoid', 'Dengue NS1', 'Viral Markers'],
    timing: '1-2 Hours (Emergency)'
  },
  {
    id: '08',
    title: 'Jaundice & Liver Health Workup',
    category: 'Pathology',
    image: '/images/jaundice.jpg',
    description: 'Bilirubin fractions (Total, Direct, Indirect) and hepatic enzymes (SGOT, SGPT, ALP) to grade and monitor acute and chronic liver conditions.',
    tags: ['Bilirubin Fractions', 'Liver Enzymes (SGOT/SGPT)', 'Viral Hepatitis', 'Proteins'],
    timing: 'Same-Day'
  }
];

export const defaultConsultants = [
  {
    id: 'doc-1',
    name: 'Dr. S. K. Rao',
    specialty: 'Cardiologist',
    qualification: 'MD (Gen Med), DM (Cardiology)',
    experience: '15+ Years Clinical Experience',
    timing: '5:00 PM – 7:00 PM',
    availableDays: 'Monday, Wednesday, Friday'
  },
  {
    id: 'doc-2',
    name: 'Dr. V. Ramana Reddy',
    specialty: 'Radiologist & Sonologist',
    qualification: 'MBBS, MD (Radiodiagnosis)',
    experience: '12+ Years Imaging Specialization',
    timing: '10:00 AM – 2:00 PM',
    availableDays: 'All 7 Days'
  },
  {
    id: 'doc-3',
    name: 'Dr. M. Sreenivasulu',
    specialty: 'Neurologist',
    qualification: 'MD, DM (Neurology)',
    experience: '14+ Years Clinical Experience',
    timing: 'By Prior Appointment',
    availableDays: 'Tuesday & Thursday'
  },
  {
    id: 'doc-4',
    name: 'Dr. P. Anitha',
    specialty: 'Pathologist & Lab Director',
    qualification: 'MBBS, MD (Pathology)',
    experience: '16+ Years Diagnostic Expertise',
    timing: '8:00 AM – 4:00 PM',
    availableDays: 'Monday – Saturday'
  },
  {
    id: 'doc-5',
    name: 'Dr. K. Srinivas',
    specialty: 'Urologist',
    qualification: 'MS (Gen Surg), MCh (Urology)',
    experience: '11+ Years Experience',
    timing: '4:00 PM – 6:00 PM',
    availableDays: 'Saturday & Sunday'
  },
  {
    id: 'doc-6',
    name: 'Dr. B. Lakshmi',
    specialty: 'Gastroenterologist',
    qualification: 'MD, DM (Gastroenterology)',
    experience: '10+ Years Experience',
    timing: 'By Prior Appointment',
    availableDays: 'Wednesday & Saturday'
  }
];

export function getDefaultSiteContent() {
  return {
    centreName: centreInfo.name,
    tagline: centreInfo.tagline,
    directorName: centreInfo.director,
    directorDesignation: 'Director',
    yearsOfExcellence: centreInfo.yearsOfExcellence,
    establishedYear: centreInfo.establishedYear,
    address: centreInfo.address,
    phones: centreInfo.contact?.phones || ['94400 09788', '94402 82688'],
    landlines: centreInfo.contact?.landlines || ['08454-235537', '08454-235538'],
    email: centreInfo.contact?.email || 'ashajyothidiagnostic@gmail.com',
    operatingHours: centreInfo.contact?.workingHours || '7:00 AM – 9:00 PM (All 7 Days)',
    emergencySupport: '24/7 Emergency Support',
    whatsappNumber: centreInfo.whatsapp?.number || '919440009788',
    whatsappPrefilledMessage: centreInfo.whatsapp?.prefilledText?.enquiry || 'Hi Asha Jyothi Diagnostics, I would like to book a diagnostic test / home visit.',

    heroHeadline: 'Precision Diagnostics. Compassionate Care.',
    heroSubheading: `Under the leadership of Director ${centreInfo.director}, Asha Jyothi brings comprehensive pathology, 4D ultrasound, CT scan, digital X-Ray & OPG, and 2D Echo under one roof in Toopran with same-day reports and 24/7 emergency support.`,
    discountBannerText: 'Special Promotion: Flat 25% Discount on all 10 Official Health Checkup Packages!',
    discountPercentage: 25,
    heroVideoUrl: '/videos/hero.mp4',
    heroPosterUrl: '/images/hero-poster.jpg',
    labVideoUrl: '/videos/lab.mp4',

    packages: healthPackages.map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      actualPrice: p.actualPrice,
      price: p.price,
      testsCount: p.testsCount,
      tests: p.tests,
      fasting: p.fasting,
      badge: '25% OFF',
      popular: p.popular || false
    })),

    divisions: defaultDivisions,

    services: (centreInfo.services || []).map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      price: s.price,
      turnaroundTime: s.turnaroundTime,
      preparation: s.preparation || '',
      description: s.description
    })),

    consultants: defaultConsultants
  };
}
