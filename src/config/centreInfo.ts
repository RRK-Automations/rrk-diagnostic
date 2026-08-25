export interface DiagnosticServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  preparation?: string;
  turnaroundTime: string;
  description: string;
}

export interface CentreContact {
  phones: string[];
  landlines: string[];
  email: string;
  emergency: string;
  workingHours: string;
  director: string;
}

export interface CentreInfo {
  name: string;
  tagline: string;
  establishedYear: number;
  yearsOfExcellence: number;
  director: string;
  address: string;
  landmark: string;
  pincode: string;
  city: string;
  district: string;
  state: string;
  mapUrl: string;
  contact: CentreContact;
  whatsapp: {
    number: string;
    prefilledText: {
      enquiry: string;
      appointment: (serviceName: string) => string;
      reports: string;
    };
  };
  highlights: string[];
  consultantSpecialties: string[];
  services: DiagnosticServiceItem[];
}

export const centreInfo: CentreInfo = {
  name: "Asha Jyothi Diagnostic Centre",
  tagline: "Precision Diagnostics, Compassionate Care · 33+ Years of Excellence",
  establishedYear: 1992,
  yearsOfExcellence: 33,
  director: "P. Mallesh Goud",
  address: "Behind Surya Medical & General Stores, Main Road, Toopran, Medak District, Telangana - 502334",
  landmark: "Behind Surya Medical & General Stores, Main Road",
  pincode: "502334",
  city: "Toopran",
  district: "Medak",
  state: "Telangana",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Asha+Jyothi+Diagnostic+Centre+Toopran+Telangana",
  contact: {
    director: "P. Mallesh Goud",
    phones: ["+91 94400 09788", "+91 94402 82688"],
    landlines: ["08454-235537", "08454-235538"],
    email: "ashajyothidiagnostic@gmail.com",
    emergency: "24/7 Emergency & Critical Diagnostics",
    workingHours: "Open All 7 Days · 7:00 AM to 9:00 PM (24/7 Emergency Support)"
  },
  whatsapp: {
    number: "917386320634", // Testing number; client: 919440009788 / 919440282688
    prefilledText: {
      enquiry: "Hello Asha Jyothi Diagnostic Centre, I would like to enquire about diagnostic test packages and scan pricing.",
      appointment: (serviceName: string) => `Hello Asha Jyothi Diagnostic Centre, I would like to book an appointment for ${serviceName}.`,
      reports: "Hello Asha Jyothi Diagnostic Centre, I would like to check the status of my diagnostic test report."
    }
  },
  highlights: [
    "33+ Years of Diagnostic Excellence (Estd. 1992)",
    "25% Discount on All Preventive Health Checkup Packages",
    "Same-Day Calibrated Digital Test Reports",
    "Doorstep Home Blood & Sample Collection in Toopran",
    "Advanced CT Scan, Color Doppler & 4D Ultrasound",
    "Digital X-Ray & Digital OPG (Dental Imaging)",
    "Fully Automated Biochemistry & Hematology Analyzers"
  ],
  consultantSpecialties: [
    "Cardiologist",
    "Neurologist",
    "Radiologist",
    "Urologist",
    "Gastroenterologist"
  ],
  services: [
    {
      id: "cbp",
      name: "Complete Blood Picture (CBP / CBC)",
      category: "Pathology",
      price: 350,
      preparation: "No fasting required",
      turnaroundTime: "2-3 Hours",
      description: "Automated complete blood count including Hb, TLC, DLC, Platelets, RBC indices & ESR."
    },
    {
      id: "thyroid",
      name: "Thyroid Profile (T3, T4, TSH)",
      category: "Pathology",
      price: 650,
      preparation: "Morning sample preferred before taking thyroid pills",
      turnaroundTime: "Same Day",
      description: "High-sensitivity chemiluminescence immunoassay for thyroid hormones."
    },
    {
      id: "lft",
      name: "Liver Function Test (LFT)",
      category: "Pathology",
      price: 800,
      preparation: "8-10 hours fasting recommended",
      turnaroundTime: "Same Day",
      description: "Total, direct & indirect bilirubin, SGOT, SGPT, ALP, and total protein fractions."
    },
    {
      id: "kft",
      name: "Kidney Function Test (KFT / RFT)",
      category: "Pathology",
      price: 750,
      preparation: "Overnight fasting recommended",
      turnaroundTime: "Same Day",
      description: "Serum creatinine, blood urea, uric acid, and serum electrolytes."
    },
    {
      id: "lipid",
      name: "Lipid Profile (Cholesterol)",
      category: "Pathology",
      price: 700,
      preparation: "10-12 hours overnight fasting mandatory",
      turnaroundTime: "Same Day",
      description: "Total cholesterol, HDL, LDL, VLDL, and Triglycerides."
    },
    {
      id: "hba1c",
      name: "HbA1c (Glycosylated Hemoglobin)",
      category: "Pathology",
      price: 500,
      preparation: "No fasting required",
      turnaroundTime: "Same Day",
      description: "Evaluates 3-month average blood glucose control."
    },
    {
      id: "usg-abdomen",
      name: "4D Ultrasound - Whole Abdomen & Pelvis",
      category: "Radiology & Imaging",
      price: 1500,
      preparation: "6-8 hours fasting + full bladder (drink water)",
      turnaroundTime: "Immediate Reporting",
      description: "High-resolution ultrasound imaging for liver, gall bladder, kidneys, pancreas, spleen & pelvic organs."
    },
    {
      id: "xray-chest",
      name: "Digital Chest X-Ray (PA View)",
      category: "Radiology & Imaging",
      price: 450,
      preparation: "Remove metal objects",
      turnaroundTime: "15-20 Minutes",
      description: "High-frequency digital radiography for lungs, heart size, and rib cage."
    },
    {
      id: "digital-opg",
      name: "Digital OPG (Full Mouth Dental X-Ray)",
      category: "Radiology & Imaging",
      price: 800,
      preparation: "Remove earrings & metallic dental clips",
      turnaroundTime: "15 Minutes",
      description: "Panoramic digital radiographic scan of upper and lower jaw and teeth."
    },
    {
      id: "ecg",
      name: "12-Lead Electrocardiogram (ECG)",
      category: "Cardiology",
      price: 300,
      preparation: "Rest for 5 minutes prior to test",
      turnaroundTime: "Immediate Printout",
      description: "Digital resting 12-lead ECG assessing heart rhythm and conduction."
    },
    {
      id: "2d-echo",
      name: "2D Echocardiography & Color Doppler",
      category: "Cardiology",
      price: 1800,
      preparation: "No special fasting required",
      turnaroundTime: "Same Day",
      description: "Ultrasound cardiac evaluation of heart chambers, valves, ejection fraction & wall motion."
    }
  ]
};
