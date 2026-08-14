export interface DiagnosticService {
  id: string;
  name: string;
  description: string;
  iconName: string;
  preparation?: string;
}

export const centreInfo = {
  name: "Asha Jyothi Diagnostic Centre",
  location: "Toopran, Telangana",
  address: "13-21/1/A, Keshava Nagar Colony, Toopran, Telangana 502334",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Asha+Jyothi+Diagnostic+Centre+Toopran+Telangana",
  whatsapp: {
    number: "917386320634", // Testing WhatsApp contact
    prefilledText: {
      enquiry: "Hello Asha Jyothi Diagnostic Centre, I would like to enquire about diagnostic scan pricing and instructions.",
      appointment: (serviceName: string) => `Hello Asha Jyothi Diagnostic Centre, I would like to request an appointment slot for ${serviceName}.`
    }
  },
  contact: {
    phones: ["+91 73863 20634", "+91 94400 09788"],
    email: "info@ashajyothidiagnostics.com",
    workingHours: "Monday - Saturday: 7:30 AM to 8:30 PM, Sunday: 7:30 AM to 1:00 PM"
  },
  services: [
    {
      id: "usg",
      name: "Ultrasound Scan (USG)",
      description: "High-resolution imaging scans for obstetric, abdominal, and pelvic examinations.",
      iconName: "Activity",
      preparation: "Preparation instructions: Fasting (usually 6-8 hours) is required for upper abdomen USG. Drink plenty of water and hold urine for pelvic USG."
    },
    {
      id: "xray",
      name: "Digital X-Ray",
      description: "Advanced high-definition digital radiology services for precise bone and chest diagnostics.",
      iconName: "Tv",
      preparation: "Preparation instructions: Wear loose clothing. Remove jewelry or metallic items in the scanning area."
    },
    {
      id: "ct",
      name: "CT Scan",
      description: "Detailed cross-sectional computed tomography diagnostics for internal organs and structure scans.",
      iconName: "Scan",
      preparation: "Preparation instructions: Contact the centre. Fasting is required if contrast medium is used. Please bring any past scan reports."
    },
    {
      id: "lab",
      name: "Pathology & Blood Laboratory",
      description: "Comprehensive hematology, biochemistry, thyroid profile, and clinical pathology tests.",
      iconName: "FlaskConical",
      preparation: "Preparation instructions: Fasting (10-12 hours) is highly recommended for lipid profiles, fasting blood sugar, and general wellness health checkups."
    },
    {
      id: "ecg",
      name: "ECG & Heart Monitoring",
      description: "Electrocardiograms and cardiac scans for cardiovascular wellness checkups.",
      iconName: "HeartPulse",
      preparation: "Preparation instructions: Avoid applying oily creams or lotions to the chest prior to the test."
    }
  ] as DiagnosticService[]
};
