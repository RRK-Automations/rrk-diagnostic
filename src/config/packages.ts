export interface HealthPackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  popular?: boolean;
  testsCount: number;
  tests: string[];
  fasting: string;
  sampleType: string;
  reportDelivery: string;
  recommendedFor: string;
}

export const healthPackages: HealthPackage[] = [
  {
    id: "master-health",
    name: "Master Health Checkup",
    tagline: "Comprehensive full-body wellness screening",
    description: "Extensive pathology and imaging evaluation designed to detect early health abnormalities, organ functions, and metabolic conditions.",
    popular: true,
    testsCount: 58,
    tests: [
      "Complete Blood Picture (CBP / CBC)",
      "Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)",
      "Liver Function Test (LFT - Bilirubin, SGOT, SGPT, Proteins)",
      "Kidney Function Test (KFT - Serum Creatinine, Urea, Uric Acid)",
      "Fasting Blood Sugar (FBS)",
      "Urine Routine & Microscopic Examination",
      "Thyroid Profile (TSH)",
      "ECG (12-Lead Electrocardiogram)",
      "Ultrasound Abdomen & Pelvis (USG)"
    ],
    fasting: "10-12 hours mandatory fasting required",
    sampleType: "Blood & Urine + Diagnostic Ultrasound",
    reportDelivery: "Same day (Evening)",
    recommendedFor: "Men & Women aged 25+ for annual preventive health checkup"
  },
  {
    id: "diabetic-care",
    name: "Comprehensive Diabetic Profile",
    tagline: "Complete glucose control & complication monitoring",
    description: "Detailed evaluation of long-term blood glucose regulation, insulin resistance, kidney health, and cardiovascular risk factors.",
    popular: false,
    testsCount: 18,
    tests: [
      "HbA1c (Glycosylated Hemoglobin - 3 Months Average)",
      "Fasting Blood Sugar (FBS)",
      "Post-Prandial Blood Sugar (PPBS)",
      "Lipid Profile (Heart Risk Assessment)",
      "Serum Creatinine & eGFR (Kidney Function)",
      "Microalbumin / Creatinine Ratio (Urine)",
      "Complete Urine Examination"
    ],
    fasting: "8-10 hours fasting for morning sample",
    sampleType: "Blood & Urine",
    reportDelivery: "Within 4 to 6 hours",
    recommendedFor: "Diabetic & pre-diabetic patients, family history of diabetes"
  },
  {
    id: "senior-citizen",
    name: "Senior Citizen Care Package",
    tagline: "Tailored for healthy aging & vital organ vitality",
    description: "Specialized geriatric package covering cardiac health, bone density markers, liver, kidney, electrolytes, and arthritis parameters.",
    popular: true,
    testsCount: 45,
    tests: [
      "Complete Hemogram & ESR",
      "Comprehensive Metabolic Panel (KFT + LFT)",
      "Lipid Profile (Full Cardiovascular risk)",
      "Serum Calcium & Phosphorus (Bone Health)",
      "Serum Electrolytes (Sodium, Potassium, Chloride)",
      "Uric Acid (Joint health & Gout)",
      "ECG (Electrocardiogram)",
      "Digital Chest X-Ray"
    ],
    fasting: "10-12 hours overnight fasting",
    sampleType: "Blood, Urine & Digital X-Ray",
    reportDelivery: "Same day report delivery",
    recommendedFor: "Seniors aged 55+ for proactive aging and joint/heart monitoring"
  },
  {
    id: "womens-wellness",
    name: "Women's Wellness & Thyroid Profile",
    tagline: "Hormonal, nutritional & pelvic vitality screening",
    description: "Focused screening assessing anemia, thyroid hormonal balance, calcium deficiencies, and reproductive/pelvic organ wellness.",
    popular: false,
    testsCount: 32,
    tests: [
      "Complete Blood Count with Peripheral Smear (Anemia check)",
      "Complete Thyroid Panel (Total T3, Total T4, Ultrasensitive TSH)",
      "Serum Iron, Ferritin & Total Iron Binding Capacity",
      "Serum Calcium & Vitamin D3 (Bone & Hormone support)",
      "Blood Glucose (Fasting)",
      "Ultrasound Pelvis (Uterus & Ovaries evaluation)",
      "Complete Urine Routine"
    ],
    fasting: "8-10 hours fasting; drink water for USG Pelvis",
    sampleType: "Blood, Urine & Pelvic Ultrasound",
    reportDelivery: "Same day",
    recommendedFor: "Women of all ages, PCOD/PCOS symptoms, thyroid or fatigue concerns"
  },
  {
    id: "cardiac-risk",
    name: "Cardiac & Hypertension Profile",
    tagline: "Essential heart health & arterial screening",
    description: "Focused cardio-diagnostic package designed to detect lipid imbalances, early cardiac strain, and hypertension damage.",
    popular: false,
    testsCount: 22,
    tests: [
      "12-Lead Digital ECG",
      "Complete Lipid Profile (VLDL, LDL, HDL, Triglycerides)",
      "Serum Homocysteine / hs-CRP (Arterial Inflammation)",
      "Serum Creatinine & Blood Urea",
      "Fasting Blood Sugar",
      "Digital Chest X-Ray (PA View)"
    ],
    fasting: "10-12 hours fasting required",
    sampleType: "Blood & Clinical Imaging",
    reportDelivery: "Same day",
    recommendedFor: "High blood pressure, high cholesterol, sedentary lifestyle, smokers"
  }
];
