export interface ReportTemplateParameter {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: 'normal' | 'high' | 'low';
}

export interface ReportTemplate {
  id: string;
  name: string;
  category: 'Hematology' | 'Biochemistry' | 'Immunoassay' | 'Cardiology' | 'Radiology' | 'Clinical Pathology' | 'General';
  doctorName: string;
  defaultConclusion: string;
  parameters: ReportTemplateParameter[];
}

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'cbp',
    name: 'Complete Blood Picture (CBP / CBC)',
    category: 'Hematology',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'All observed hematological parameters and differential counts are within biological reference limits.',
    parameters: [
      { parameter: 'Hemoglobin (Hb)', value: '14.2', unit: 'g/dL', referenceRange: '13.0 - 17.0', flag: 'normal' },
      { parameter: 'Total RBC Count', value: '4.8', unit: 'mill/cu.mm', referenceRange: '4.5 - 5.5', flag: 'normal' },
      { parameter: 'Packed Cell Volume (PCV)', value: '42.5', unit: '%', referenceRange: '40.0 - 50.0', flag: 'normal' },
      { parameter: 'Mean Corpuscular Volume (MCV)', value: '88.5', unit: 'fL', referenceRange: '80.0 - 100.0', flag: 'normal' },
      { parameter: 'MCH', value: '29.6', unit: 'pg', referenceRange: '27.0 - 32.0', flag: 'normal' },
      { parameter: 'MCHC', value: '33.4', unit: 'g/dL', referenceRange: '32.0 - 36.0', flag: 'normal' },
      { parameter: 'Total WBC Count (TC)', value: '7,400', unit: 'cells/cu.mm', referenceRange: '4,000 - 11,000', flag: 'normal' },
      { parameter: 'Neutrophils', value: '62', unit: '%', referenceRange: '40 - 70', flag: 'normal' },
      { parameter: 'Lymphocytes', value: '28', unit: '%', referenceRange: '20 - 40', flag: 'normal' },
      { parameter: 'Eosinophils', value: '04', unit: '%', referenceRange: '01 - 06', flag: 'normal' },
      { parameter: 'Monocytes', value: '05', unit: '%', referenceRange: '02 - 08', flag: 'normal' },
      { parameter: 'Basophils', value: '01', unit: '%', referenceRange: '00 - 01', flag: 'normal' },
      { parameter: 'Platelet Count', value: '2.6', unit: 'Lakhs/cu.mm', referenceRange: '1.5 - 4.5', flag: 'normal' },
      { parameter: 'Erythrocyte Sedimentation Rate (ESR)', value: '12', unit: 'mm/1st hr', referenceRange: '00 - 15', flag: 'normal' },
      { parameter: 'Peripheral Smear', value: 'Normocytic Normochromic RBCs. No hemoparasites seen.', unit: '', referenceRange: 'Normocytic Normochromic', flag: 'normal' }
    ]
  },
  {
    id: 'lipid',
    name: 'Lipid & Cholesterol Profile',
    category: 'Biochemistry',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'Lipid fractions show optimal cardiovascular profile. Diet & regular exercise advised.',
    parameters: [
      { parameter: 'Serum Total Cholesterol', value: '168', unit: 'mg/dL', referenceRange: '125 - 200 (Desirable: <200)', flag: 'normal' },
      { parameter: 'HDL Cholesterol (Good Cholesterol)', value: '48', unit: 'mg/dL', referenceRange: '40 - 60 (Protective: >50)', flag: 'normal' },
      { parameter: 'LDL Cholesterol (Calculated)', value: '94', unit: 'mg/dL', referenceRange: '60 - 100 (Optimal: <100)', flag: 'normal' },
      { parameter: 'VLDL Cholesterol', value: '26', unit: 'mg/dL', referenceRange: '10 - 30', flag: 'normal' },
      { parameter: 'Serum Triglycerides', value: '130', unit: 'mg/dL', referenceRange: '60 - 150 (Normal: <150)', flag: 'normal' },
      { parameter: 'Total Cholesterol / HDL Ratio', value: '3.5', unit: 'Ratio', referenceRange: '3.0 - 4.5 (Low Risk)', flag: 'normal' },
      { parameter: 'LDL / HDL Ratio', value: '1.96', unit: 'Ratio', referenceRange: '1.5 - 3.0', flag: 'normal' }
    ]
  },
  {
    id: 'thyroid',
    name: 'Thyroid Profile (T3, T4, TSH)',
    category: 'Immunoassay',
    doctorName: 'Dr. P. Anitha, MD (Pathology)',
    defaultConclusion: 'Euthyroid state. Serum TSH, Total T3, and Total T4 levels are within reference limits.',
    parameters: [
      { parameter: 'Total Triiodothyronine (T3)', value: '1.25', unit: 'ng/mL', referenceRange: '0.80 - 2.00', flag: 'normal' },
      { parameter: 'Total Thyroxine (T4)', value: '8.40', unit: 'µg/dL', referenceRange: '5.10 - 14.10', flag: 'normal' },
      { parameter: 'Thyroid Stimulating Hormone (TSH)', value: '2.14', unit: 'µIU/mL', referenceRange: '0.35 - 4.94', flag: 'normal' },
      { parameter: 'Free T3 (FT3)', value: '3.10', unit: 'pg/mL', referenceRange: '2.00 - 4.40', flag: 'normal' },
      { parameter: 'Free T4 (FT4)', value: '1.18', unit: 'ng/dL', referenceRange: '0.93 - 1.70', flag: 'normal' }
    ]
  },
  {
    id: 'lft',
    name: 'Liver Function Test (LFT)',
    category: 'Biochemistry',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'Hepatic enzymes, bilirubin fractions, and serum proteins demonstrate normal liver function.',
    parameters: [
      { parameter: 'Serum Bilirubin - Total', value: '0.80', unit: 'mg/dL', referenceRange: '0.20 - 1.20', flag: 'normal' },
      { parameter: 'Serum Bilirubin - Direct', value: '0.20', unit: 'mg/dL', referenceRange: '0.00 - 0.30', flag: 'normal' },
      { parameter: 'Serum Bilirubin - Indirect', value: '0.60', unit: 'mg/dL', referenceRange: '0.20 - 0.90', flag: 'normal' },
      { parameter: 'SGOT / AST', value: '24', unit: 'U/L', referenceRange: '10 - 40', flag: 'normal' },
      { parameter: 'SGPT / ALT', value: '28', unit: 'U/L', referenceRange: '10 - 45', flag: 'normal' },
      { parameter: 'Serum Alkaline Phosphatase (ALP)', value: '85', unit: 'U/L', referenceRange: '44 - 147', flag: 'normal' },
      { parameter: 'Serum Total Protein', value: '7.2', unit: 'g/dL', referenceRange: '6.4 - 8.3', flag: 'normal' },
      { parameter: 'Serum Albumin', value: '4.4', unit: 'g/dL', referenceRange: '3.5 - 5.0', flag: 'normal' },
      { parameter: 'Serum Globulin', value: '2.8', unit: 'g/dL', referenceRange: '2.0 - 3.5', flag: 'normal' },
      { parameter: 'Albumin / Globulin Ratio (A/G)', value: '1.57', unit: 'Ratio', referenceRange: '1.10 - 2.20', flag: 'normal' }
    ]
  },
  {
    id: 'kft',
    name: 'Kidney Function Test (KFT / RFT)',
    category: 'Biochemistry',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'Renal parameters and serum electrolytes indicate adequate glomerular filtration and electrolyte balance.',
    parameters: [
      { parameter: 'Blood Urea', value: '22', unit: 'mg/dL', referenceRange: '15 - 40', flag: 'normal' },
      { parameter: 'Blood Urea Nitrogen (BUN)', value: '10.2', unit: 'mg/dL', referenceRange: '7.0 - 20.0', flag: 'normal' },
      { parameter: 'Serum Creatinine', value: '0.85', unit: 'mg/dL', referenceRange: '0.60 - 1.20', flag: 'normal' },
      { parameter: 'Serum Uric Acid', value: '4.8', unit: 'mg/dL', referenceRange: '3.5 - 7.2', flag: 'normal' },
      { parameter: 'Serum Calcium - Total', value: '9.4', unit: 'mg/dL', referenceRange: '8.5 - 10.5', flag: 'normal' },
      { parameter: 'Serum Sodium (Na+)', value: '140', unit: 'mmol/L', referenceRange: '135 - 145', flag: 'normal' },
      { parameter: 'Serum Potassium (K+)', value: '4.2', unit: 'mmol/L', referenceRange: '3.5 - 5.1', flag: 'normal' },
      { parameter: 'Serum Chloride (Cl-)', value: '101', unit: 'mmol/L', referenceRange: '96 - 106', flag: 'normal' }
    ]
  },
  {
    id: 'diabetes',
    name: 'Diabetes & Glycemic Profile (FBS / PPBS / HbA1c)',
    category: 'Biochemistry',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'Glycemic control is in the normal non-diabetic range. Regular annual checkup recommended.',
    parameters: [
      { parameter: 'Fasting Blood Sugar (FBS)', value: '88', unit: 'mg/dL', referenceRange: '70 - 100 (Normal)', flag: 'normal' },
      { parameter: 'Post-Prandial Blood Sugar (PPBS)', value: '118', unit: 'mg/dL', referenceRange: '70 - 140 (Normal)', flag: 'normal' },
      { parameter: 'HbA1c (Glycated Hemoglobin)', value: '5.2', unit: '%', referenceRange: '4.0 - 5.6 (Non-Diabetic)', flag: 'normal' },
      { parameter: 'Estimated Average Glucose (eAG)', value: '102', unit: 'mg/dL', referenceRange: '70 - 120', flag: 'normal' },
      { parameter: 'Urine Fasting Glucose', value: 'Nil', unit: '', referenceRange: 'Negative / Nil', flag: 'normal' }
    ]
  },
  {
    id: 'cue',
    name: 'Complete Urine Examination (CUE)',
    category: 'Clinical Pathology',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'Physical, chemical, and microscopic examination of urine sample reveals no active infection or proteinuria.',
    parameters: [
      { parameter: 'Colour', value: 'Pale Yellow', unit: '', referenceRange: 'Pale Yellow', flag: 'normal' },
      { parameter: 'Appearance', value: 'Clear', unit: '', referenceRange: 'Clear', flag: 'normal' },
      { parameter: 'Specific Gravity', value: '1.018', unit: '', referenceRange: '1.010 - 1.025', flag: 'normal' },
      { parameter: 'pH / Reaction', value: '6.0', unit: '', referenceRange: '5.5 - 7.0 (Acidic)', flag: 'normal' },
      { parameter: 'Albumin / Protein', value: 'Nil', unit: '', referenceRange: 'Nil / Negative', flag: 'normal' },
      { parameter: 'Sugar / Glucose', value: 'Nil', unit: '', referenceRange: 'Nil / Negative', flag: 'normal' },
      { parameter: 'Pus Cells (Leukocytes)', value: '02 - 03', unit: '/HPF', referenceRange: '02 - 04 /HPF', flag: 'normal' },
      { parameter: 'Epithelial Cells', value: '01 - 02', unit: '/HPF', referenceRange: '01 - 04 /HPF', flag: 'normal' },
      { parameter: 'Red Blood Cells (RBCs)', value: 'Nil', unit: '/HPF', referenceRange: 'Nil /HPF', flag: 'normal' },
      { parameter: 'Casts', value: 'Nil', unit: '', referenceRange: 'Absent', flag: 'normal' },
      { parameter: 'Crystals', value: 'Nil', unit: '', referenceRange: 'Absent', flag: 'normal' },
      { parameter: 'Bacteria', value: 'Absent', unit: '', referenceRange: 'Absent', flag: 'normal' }
    ]
  },
  {
    id: 'cardiology',
    name: '2D Echo & 12-Lead ECG Summary',
    category: 'Cardiology',
    doctorName: 'Dr. S. K. Rao, MD, DM (Cardiology)',
    defaultConclusion: 'Normal 12-Lead ECG. 2D Echo demonstrates preserved Left Ventricular systolic function (LVEF 62%) with no regional wall motion abnormality.',
    parameters: [
      { parameter: 'Heart Rate', value: '76', unit: 'bpm', referenceRange: '60 - 100', flag: 'normal' },
      { parameter: 'Cardiac Rhythm', value: 'Normal Sinus Rhythm', unit: '', referenceRange: 'Normal Sinus Rhythm', flag: 'normal' },
      { parameter: 'PR Interval', value: '148', unit: 'ms', referenceRange: '120 - 200', flag: 'normal' },
      { parameter: 'QRS Duration', value: '88', unit: 'ms', referenceRange: '80 - 120', flag: 'normal' },
      { parameter: 'QTc Interval', value: '412', unit: 'ms', referenceRange: '360 - 440', flag: 'normal' },
      { parameter: 'Left Ventricular Ejection Fraction (LVEF)', value: '62', unit: '%', referenceRange: '55 - 70 % (Normal)', flag: 'normal' },
      { parameter: 'Interventricular Septum (IVSd)', value: '9.2', unit: 'mm', referenceRange: '6.0 - 11.0', flag: 'normal' },
      { parameter: 'Left Ventricle Dimensions (LVEDD)', value: '44', unit: 'mm', referenceRange: '35 - 52', flag: 'normal' },
      { parameter: 'Valvular Flow & Doppler', value: 'Normal laminar flow across all 4 valves. No AR/MR/TR/AS.', unit: '', referenceRange: 'Normal Valve Dynamics', flag: 'normal' },
      { parameter: 'Pericardial Effusion', value: 'No pericardial effusion detected', unit: '', referenceRange: 'Absent', flag: 'normal' }
    ]
  },
  {
    id: 'ultrasound',
    name: '4D Ultrasound Whole Abdomen Report',
    category: 'Radiology',
    doctorName: 'Dr. V. Ramana Reddy, MBBS, MD (Radiodiagnosis)',
    defaultConclusion: 'Sonographic study of whole abdomen reveals normal size and echotexture of liver, gall bladder, spleen, pancreas, and both kidneys. No focal lesion, calculus, or free fluid detected.',
    parameters: [
      { parameter: 'Liver', value: 'Normal in size (13.8 cm), smooth margin, homogenous parenchymal echotexture. No focal mass lesion.', unit: '', referenceRange: 'Normal Size & Echo', flag: 'normal' },
      { parameter: 'Gall Bladder', value: 'Normally distended, lumen is clear, wall thickness normal (2.2 mm). No calculus or sludge.', unit: '', referenceRange: 'Clear Lumen, No Calculus', flag: 'normal' },
      { parameter: 'Common Bile Duct (CBD)', value: 'Normal in caliber (3.8 mm). No intraductal calculus.', unit: '', referenceRange: 'Normal Caliber (<6 mm)', flag: 'normal' },
      { parameter: 'Pancreas', value: 'Normal in size, outline and echotexture. Main pancreatic duct is not dilated.', unit: '', referenceRange: 'Normal Morphology', flag: 'normal' },
      { parameter: 'Spleen', value: 'Normal in size (9.6 cm), homogenous echotexture. Splenic vein is normal.', unit: '', referenceRange: 'Normal (<12 cm)', flag: 'normal' },
      { parameter: 'Right Kidney', value: 'Normal in size (9.8 x 4.2 cm), shape and position. Normal CMD. No calculus or hydronephrosis.', unit: '', referenceRange: 'Normal Renal Parenchyma', flag: 'normal' },
      { parameter: 'Left Kidney', value: 'Normal in size (10.1 x 4.4 cm), shape and position. Normal CMD. No calculus or hydronephrosis.', unit: '', referenceRange: 'Normal Renal Parenchyma', flag: 'normal' },
      { parameter: 'Urinary Bladder', value: 'Well distended, normal mucosal outline. Lumen is echo-free.', unit: '', referenceRange: 'Clear Lumen', flag: 'normal' },
      { parameter: 'Peritoneal Cavity', value: 'No free fluid (ascites) or significant retroperitoneal lymphadenopathy seen.', unit: '', referenceRange: 'No Free Fluid', flag: 'normal' }
    ]
  },
  {
    id: 'vitamins',
    name: 'Vitamin D3 & Vitamin B12 Profile',
    category: 'Immunoassay',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'Vitamin D3 and B12 levels are in sufficient biological concentration.',
    parameters: [
      { parameter: '25-OH Vitamin D3 (Total)', value: '42.5', unit: 'ng/mL', referenceRange: '30.0 - 100.0 (Sufficient: >30)', flag: 'normal' },
      { parameter: 'Vitamin B12 (Cyanocobalamin)', value: '460', unit: 'pg/mL', referenceRange: '211 - 911 (Normal)', flag: 'normal' },
      { parameter: 'Serum Calcium - Total', value: '9.6', unit: 'mg/dL', referenceRange: '8.5 - 10.5', flag: 'normal' },
      { parameter: 'Serum Ferritin', value: '115', unit: 'ng/mL', referenceRange: '30 - 400', flag: 'normal' }
    ]
  },
  {
    id: 'fever',
    name: 'Fever & Acute Infectious Panel',
    category: 'Hematology',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'Serological and smear examinations for Dengue, Malaria, and Typhoid are negative.',
    parameters: [
      { parameter: 'Dengue NS1 Antigen (Rapid/ELISA)', value: 'Negative', unit: '', referenceRange: 'Negative', flag: 'normal' },
      { parameter: 'Dengue IgM Antibodies', value: 'Negative', unit: '', referenceRange: 'Negative', flag: 'normal' },
      { parameter: 'Dengue IgG Antibodies', value: 'Negative', unit: '', referenceRange: 'Negative', flag: 'normal' },
      { parameter: 'Malaria Smear & Antigen (Pf / Pv)', value: 'Negative (No malaria parasites seen)', unit: '', referenceRange: 'Negative', flag: 'normal' },
      { parameter: "Widal Test - S. typhi 'O'", value: '< 1:80 (Negative)', unit: 'Titre', referenceRange: '< 1:80 (Negative)', flag: 'normal' },
      { parameter: "Widal Test - S. typhi 'H'", value: '< 1:80 (Negative)', unit: 'Titre', referenceRange: '< 1:80 (Negative)', flag: 'normal' },
      { parameter: 'Platelet Count (Emergency)', value: '2.4', unit: 'Lakhs/cu.mm', referenceRange: '1.5 - 4.5', flag: 'normal' }
    ]
  },
  {
    id: 'custom',
    name: 'Custom / Blank Diagnostic Test',
    category: 'General',
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    defaultConclusion: 'Test observed within standard clinical limits.',
    parameters: [
      { parameter: 'Investigation Parameter 1', value: '', unit: '', referenceRange: '', flag: 'normal' },
      { parameter: 'Investigation Parameter 2', value: '', unit: '', referenceRange: '', flag: 'normal' }
    ]
  }
];
