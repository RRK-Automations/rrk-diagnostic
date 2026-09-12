export interface InvestigationItem {
  id: string;
  name: string;
  alias?: string;
  department: string;
  subCategory: string;
  type: 'Laboratory' | 'Imaging' | 'Cardiology' | 'Radiology';
  sampleOrModality: string;
  fastingOrPrep?: string;
  turnaroundTime: string;
  description: string;
  popular?: boolean;
}

export interface InvestigationCategory {
  id: string;
  title: string;
  icon: string;
  type: 'Laboratory' | 'Radiology & Imaging' | 'Cardiology';
  description: string;
  items: InvestigationItem[];
}

export const diagnosticInvestigations: InvestigationCategory[] = [
  {
    id: 'hematology',
    title: 'Hematology & Blood Picture',
    icon: 'Droplets',
    type: 'Laboratory',
    description: 'Complete cellular blood work, coagulation indices, and blood group identification with automated cell counters.',
    items: [
      {
        id: 'hem-1',
        name: 'Haemogram',
        alias: 'Complete Hemogram',
        department: 'Hematology',
        subCategory: 'Haemogram',
        type: 'Laboratory',
        sampleOrModality: 'Blood (EDTA Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2-3 Hours',
        description: 'Comprehensive analysis of hemoglobin, RBC count, hematocrit (PCV), MCV, MCH, MCHC, and red cell morphology to detect anemia types.',
        popular: true
      },
      {
        id: 'hem-2',
        name: 'Complete Blood Picture (CBP)',
        alias: 'CBC / Hemogram with Platelets',
        department: 'Hematology',
        subCategory: 'Haemogram',
        type: 'Laboratory',
        sampleOrModality: 'Blood (EDTA Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2 Hours (Same-Day)',
        description: 'Measures Total WBC, Differential WBC (Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils), Platelets, Hemoglobin, and RBC count.',
        popular: true
      },
      {
        id: 'hem-3',
        name: 'ESR (Erythrocyte Sedimentation Rate)',
        alias: 'Sedimentation Rate',
        department: 'Hematology',
        subCategory: 'Inflammatory Markers',
        type: 'Laboratory',
        sampleOrModality: 'Blood (Citrate / EDTA Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2 Hours',
        description: 'Key non-specific diagnostic marker indicating systemic inflammation, acute infections, autoimmune disorders, and chronic conditions.'
      },
      {
        id: 'hem-4',
        name: 'Absolute Eosinophil Count (AEC)',
        alias: 'Eosinophils Absolute',
        department: 'Hematology',
        subCategory: 'Allergy & Immune',
        type: 'Laboratory',
        sampleOrModality: 'Blood (EDTA Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2-3 Hours',
        description: 'Specific quantitation of eosinophil count in peripheral blood to investigate allergies, asthma, and parasitic infestations.'
      },
      {
        id: 'hem-5',
        name: 'BT / CT (Bleeding Time & Clotting Time)',
        alias: 'Bleeding & Clotting Time',
        department: 'Hematology',
        subCategory: 'Coagulation',
        type: 'Laboratory',
        sampleOrModality: 'Capillary Blood / Duke/Ivy Method',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '30-45 Minutes',
        description: 'Essential pre-operative screening evaluating primary platelet plug formation and intrinsic coagulation cascade time.'
      },
      {
        id: 'hem-6',
        name: 'PT / APTT',
        alias: 'Prothrombin Time & Activated Partial Thromboplastin Time',
        department: 'Hematology',
        subCategory: 'Coagulation',
        type: 'Laboratory',
        sampleOrModality: 'Citrated Plasma (Blue Top)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '3-4 Hours',
        description: 'Dual evaluation of extrinsic, intrinsic, and common pathways of blood coagulation before surgical procedures or for bleeding tendencies.'
      },
      {
        id: 'hem-7',
        name: 'PT / INR (Prothrombin Time with INR)',
        alias: 'Prothrombin Time & International Normalized Ratio',
        department: 'Hematology',
        subCategory: 'Coagulation & Anticoagulant Monitoring',
        type: 'Laboratory',
        sampleOrModality: 'Citrated Plasma',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2-3 Hours',
        description: 'Monitors oral anticoagulant medications (Warfarin, Acenocoumarol) and evaluates hepatic synthesis of clotting factors.',
        popular: true
      },
      {
        id: 'hem-8',
        name: 'Blood Grouping & Rh Typing',
        alias: 'ABO & Rh Factor',
        department: 'Hematology',
        subCategory: 'Immunohematology',
        type: 'Laboratory',
        sampleOrModality: 'Blood (EDTA / Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '1 Hour',
        description: 'Determines ABO blood group (A, B, AB, O) and Rh factor (+ve / -ve) for medical emergencies, transfusions, and pregnancy antenatal checks.'
      }
    ]
  },
  {
    id: 'biochemistry',
    title: 'Biochemistry, Liver & Kidney Profiling',
    icon: 'FlaskConical',
    type: 'Laboratory',
    description: 'Automated multi-channel photometric and enzymatic estimations for blood sugars, renal function, liver enzymes, and lipids.',
    items: [
      {
        id: 'bio-1',
        name: 'Blood Sugar F / PL (Fasting & Post-Lunch)',
        alias: 'FBS & PLBS / PPBS',
        department: 'Biochemistry',
        subCategory: 'Diabetes Care',
        type: 'Laboratory',
        sampleOrModality: 'Fluoride Plasma',
        fastingOrPrep: 'Fasting: 8-10 hrs overnight; PLBS: Exactly 2 hrs post meal',
        turnaroundTime: '2 Hours (Same-Day)',
        description: 'Gold standard dual evaluation for diagnosing and monitoring diabetes mellitus, insulin sensitivity, and glycemic control.',
        popular: true
      },
      {
        id: 'bio-2',
        name: 'Blood Urea',
        alias: 'Urea Nitrogen',
        department: 'Biochemistry',
        subCategory: 'Renal Function',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2-3 Hours',
        description: 'Evaluates waste protein breakdown clearance to assess kidney function, hydration status, and pre-renal azotemia.'
      },
      {
        id: 'bio-3',
        name: 'Serum Creatinine',
        alias: 'Creatinine Blood Test',
        department: 'Biochemistry',
        subCategory: 'Renal Function',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2 Hours',
        description: 'High-precision enzymatic indicator of glomerular filtration rate (GFR) and kidney filtration health.',
        popular: true
      },
      {
        id: 'bio-4',
        name: 'Serum Uric Acid',
        alias: 'Uric Acid Level',
        department: 'Biochemistry',
        subCategory: 'Metabolic & Gout',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'Overnight fasting preferred',
        turnaroundTime: '2-3 Hours',
        description: 'Investigates hyperuricemia, acute gouty arthritis, joint pain, and kidney stone risk.'
      },
      {
        id: 'bio-5',
        name: 'Serum Bilirubin Total / Direct',
        alias: 'Bilirubin Fractions (Total, Direct, Indirect)',
        department: 'Biochemistry',
        subCategory: 'Liver Health',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: '4 hours fasting preferred',
        turnaroundTime: '2 Hours',
        description: 'Quantifies Total, Direct (Conjugated), and Indirect (Unconjugated) bilirubin to diagnose jaundice, hemolysis, or biliary obstruction.'
      },
      {
        id: 'bio-6',
        name: 'Serum Amylase',
        alias: 'Amylase Enzyme',
        department: 'Biochemistry',
        subCategory: 'Pancreatic Health',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'Avoid alcohol 24 hrs prior',
        turnaroundTime: '2-3 Hours',
        description: 'Key pancreatic digestive enzyme measured to quickly diagnose acute pancreatitis and severe abdominal pain.'
      },
      {
        id: 'bio-7',
        name: 'Serum Lipase',
        alias: 'Lipase Enzyme',
        department: 'Biochemistry',
        subCategory: 'Pancreatic Health',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'Avoid alcohol 24 hrs prior',
        turnaroundTime: '2-3 Hours',
        description: 'Highly sensitive and specific biomarker for diagnosing acute pancreatitis, remaining elevated longer than amylase.'
      },
      {
        id: 'bio-8',
        name: 'HbA1C (Glycosylated Hemoglobin)',
        alias: '3-Month Average Blood Sugar',
        department: 'Biochemistry',
        subCategory: 'Diabetes Care',
        type: 'Laboratory',
        sampleOrModality: 'Blood (EDTA Tube)',
        fastingOrPrep: 'No fasting required (any time of day)',
        turnaroundTime: '2 Hours (Same-Day)',
        description: 'High-performance HPLC method measuring average blood glucose levels over the preceding 90 days without daily fasting fluctuation.',
        popular: true
      },
      {
        id: 'bio-9',
        name: 'Lipid Profile',
        alias: 'Complete Cholesterol Panel',
        department: 'Biochemistry',
        subCategory: 'Cardiovascular & Lipids',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: '10-12 hours overnight fasting mandatory',
        turnaroundTime: '3-4 Hours',
        description: 'Measures Total Cholesterol, HDL (Good Cholesterol), LDL (Bad Cholesterol), Triglycerides, VLDL, and Cardiac Risk Ratios.',
        popular: true
      },
      {
        id: 'bio-10',
        name: 'Liver Function Test (LFT)',
        alias: 'Complete Liver Panel',
        department: 'Biochemistry',
        subCategory: 'Hepatic Function',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: '8-10 hours fasting preferred',
        turnaroundTime: '3-4 Hours',
        description: 'Evaluates SGOT (AST), SGPT (ALT), Alkaline Phosphatase (ALP), Total Bilirubin, Direct Bilirubin, Total Proteins, Albumin, Globulin, and A/G Ratio.',
        popular: true
      }
    ]
  },
  {
    id: 'serology',
    title: 'Serology, Immunology & Infectious Markers',
    icon: 'ShieldCheck',
    type: 'Laboratory',
    description: 'High-sensitivity immunochromatographic and agglutination tests for autoimmune antibodies, viral markers, and acute fever panels.',
    items: [
      {
        id: 'ser-1',
        name: 'Serum Widal Test',
        alias: 'Typhoid Slide / Tube Test',
        department: 'Serology',
        subCategory: 'Fever Panel',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '1-2 Hours',
        description: 'Detects agglutinating antibodies (TO, TH, AH, BH) against Salmonella typhi and paratyphi causing enteric typhoid fever.'
      },
      {
        id: 'ser-2',
        name: 'CRP (C-Reactive Protein)',
        alias: 'Quantitative CRP',
        department: 'Serology',
        subCategory: 'Inflammation & Infection',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2 Hours',
        description: 'Quantitative acute-phase reactant protein that surges rapidly in response to acute bacterial infections, inflammation, or tissue injury.',
        popular: true
      },
      {
        id: 'ser-3',
        name: 'Serum RA Test (Rheumatoid Factor)',
        alias: 'RA Factor Quantitative',
        department: 'Serology',
        subCategory: 'Autoimmune & Arthritis',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2-3 Hours',
        description: 'Evaluates autoantibody titers assisting in the clinical diagnosis of Rheumatoid Arthritis and connective tissue disorders.'
      },
      {
        id: 'ser-4',
        name: 'ASO Titer (Anti-Streptolysin O)',
        alias: 'ASO Quantitative',
        department: 'Serology',
        subCategory: 'Streptococcal Infections',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2-3 Hours',
        description: 'Detects antibodies against streptococcal group A hemolysin, aiding in the diagnosis of rheumatic fever and post-streptococcal glomerulonephritis.'
      },
      {
        id: 'ser-5',
        name: 'Serum IgE (Total Immunoglobulin E)',
        alias: 'Allergy IgE Marker',
        department: 'Serology',
        subCategory: 'Allergy',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Same-Day Evening',
        description: 'Quantifies total circulating IgE antibodies to assess generalized atopic allergy, skin urticaria, allergic rhinitis, and asthma.'
      },
      {
        id: 'ser-6',
        name: 'Mantoux Test',
        alias: 'Tuberculin Skin Test (TST)',
        department: 'Immunology',
        subCategory: 'Tuberculosis Screening',
        type: 'Laboratory',
        sampleOrModality: 'Intradermal PPD Injection (Forearm)',
        fastingOrPrep: 'Read reaction at 48-72 hours',
        turnaroundTime: '48 to 72 Hours',
        description: 'Screening test for Mycobacterium tuberculosis exposure measured by the diameter of induration on the forearm after 48-72 hours.'
      },
      {
        id: 'ser-7',
        name: 'HBsAg (Hepatitis B Surface Antigen)',
        alias: 'Australia Antigen / Hep B Screen',
        department: 'Serology',
        subCategory: 'Viral Hepatitis',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '1-2 Hours',
        description: 'Essential viral screening test identifying acute or chronic Hepatitis B infection, pre-operative protocols, and antenatal health.'
      },
      {
        id: 'ser-8',
        name: 'VDRL / RPR',
        alias: 'Syphilis Serology',
        department: 'Serology',
        subCategory: 'Infectious Screening',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2 Hours',
        description: 'Nontreponemal serological screening test for Treponema pallidum infection and pre-marriage/antenatal screening.'
      },
      {
        id: 'ser-9',
        name: 'HIV 1 & 2 (Antibody / Antigen)',
        alias: 'HIV Screening Test',
        department: 'Serology',
        subCategory: 'Viral Screening',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required (Confidential)',
        turnaroundTime: '2 Hours',
        description: 'High-sensitivity confidential immunoassay detecting antibodies against Human Immunodeficiency Virus types 1 & 2.'
      },
      {
        id: 'ser-10',
        name: 'HCV (Hepatitis C Virus Antibody)',
        alias: 'Anti-HCV Serology',
        department: 'Serology',
        subCategory: 'Viral Hepatitis',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2 Hours',
        description: 'Detects antibodies against Hepatitis C virus to evaluate viral hepatitis and chronic liver inflammation.'
      }
    ]
  },
  {
    id: 'vitamins-fevers',
    title: 'Vitamins, Fever Panels & Cardiac Blood Markers',
    icon: 'Sparkles',
    type: 'Laboratory',
    description: 'Chemiluminescence Vitamin estimations, rapid differential fever antigens, and emergency cardiac biomarkers.',
    items: [
      {
        id: 'vit-1',
        name: 'Vitamin D3 (25-Hydroxy D3)',
        alias: '25-OH Vitamin D Total',
        department: 'Biochemistry / Immunoassay',
        subCategory: 'Vitamins',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Same-Day Evening',
        description: 'Measures circulating 25-hydroxycholecalciferol levels to diagnose Vitamin D deficiency, bone health, osteoporosis, and immune vitality.',
        popular: true
      },
      {
        id: 'vit-2',
        name: 'Vitamin B12 (Cyanocobalamin)',
        alias: 'Cobalamin Level',
        department: 'Biochemistry / Immunoassay',
        subCategory: 'Vitamins',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'Overnight fasting preferred',
        turnaroundTime: 'Same-Day Evening',
        description: 'Assesses active Vitamin B12 levels essential for nerve health, brain function, RBC synthesis, and treating tingling sensations/fatigue.',
        popular: true
      },
      {
        id: 'fev-1',
        name: 'Malaria PV - PF (Smear & Antigen)',
        alias: 'Malarial Smear / Rapid Dual Antigen',
        department: 'Hematology / Serology',
        subCategory: 'Infection / Fever Profile',
        type: 'Laboratory',
        sampleOrModality: 'Blood (EDTA Tube)',
        fastingOrPrep: 'No fasting required (Emergency test)',
        turnaroundTime: '1 Hour (Urgent)',
        description: 'Dual testing via thick/thin peripheral smear microscopy and rapid antigen detection for Plasmodium Vivax and Plasmodium Falciparum.',
        popular: true
      },
      {
        id: 'fev-2',
        name: 'Dengue NS1 / IgM / IgG (Complete Dengue Profile)',
        alias: 'Dengue Duo Test',
        department: 'Serology',
        subCategory: 'Infection / Fever Profile',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required (Emergency test)',
        turnaroundTime: '1-2 Hours',
        description: 'Comprehensive dengue workup detecting NS1 early antigen (Day 1-5) and IgM/IgG antibodies for secondary infection surveillance.',
        popular: true
      },
      {
        id: 'fev-3',
        name: 'Chikungunya IgM / IgG',
        alias: 'Chikungunya Antibody Rapid',
        department: 'Serology',
        subCategory: 'Infection / Fever Profile',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '2 Hours',
        description: 'Identifies specific IgM antibodies for acute chikungunya viral fever and IgG for convalescent/past exposure investigation.'
      },
      {
        id: 'card-1',
        name: 'Troponin I / T (High-Sensitivity Cardiac Troponin)',
        alias: 'Trop-I / Trop-T Cardiac Marker',
        department: 'Biochemistry / Emergency',
        subCategory: 'Cardiac Blood Investigation',
        type: 'Laboratory',
        sampleOrModality: 'Serum / Heparinized Plasma',
        fastingOrPrep: 'No fasting required (24/7 Emergency)',
        turnaroundTime: '45-60 Minutes',
        description: 'Critical high-sensitivity biomarker for diagnosing acute myocardial infarction (heart attack) and myocardial injury.'
      }
    ]
  },
  {
    id: 'hormones-pathology',
    title: 'Hormonal, Fertility & Clinical Microscopy',
    icon: 'Activity',
    type: 'Laboratory',
    description: 'Chemiluminescence thyroid assays, reproductive fertility parameters, and urine/stool clinical microbiology.',
    items: [
      {
        id: 'hor-1',
        name: 'Thyroid Profile (T3 / T4 / TSH)',
        alias: 'Complete Thyroid Panel',
        department: 'Endocrinology / Immunoassay',
        subCategory: 'Hormonal / Fertility',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'Fasting preferred; take morning thyroid pills after blood draw',
        turnaroundTime: 'Same-Day (3-4 Hours)',
        description: 'Chemiluminescence measurement of Total Triiodothyronine (T3), Total Thyroxine (T4), and Ultrasensitive TSH to grade thyroid function.',
        popular: true
      },
      {
        id: 'hor-2',
        name: 'Serum β-HCG (Beta Human Chorionic Gonadotropin)',
        alias: 'Quantitative Beta HCG',
        department: 'Biochemistry / Immunoassay',
        subCategory: 'Hormonal / Fertility',
        type: 'Laboratory',
        sampleOrModality: 'Serum (Plain Tube)',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: '3-4 Hours',
        description: 'Accurate quantitative confirmation of pregnancy, gestational age progression, ectopic pregnancy detection, and molar pregnancy follow-up.'
      },
      {
        id: 'hor-3',
        name: 'Pregnancy Test (HCG Urine Card)',
        alias: 'Urine Pregnancy Test (UPT)',
        department: 'Clinical Pathology',
        subCategory: 'Hormonal / Fertility',
        type: 'Laboratory',
        sampleOrModality: 'Early Morning Urine Sample',
        fastingOrPrep: 'First morning mid-stream urine preferred',
        turnaroundTime: '15-30 Minutes',
        description: 'Rapid qualitative chromatographic immunoassay for early detection of hCG hormone in urine.'
      },
      {
        id: 'hor-4',
        name: 'Semen Analysis',
        alias: 'Semen Examination / Semenogram',
        department: 'Clinical Pathology / Andrology',
        subCategory: 'Hormonal / Fertility',
        type: 'Laboratory',
        sampleOrModality: 'Fresh Semen Sample (Sterile Container)',
        fastingOrPrep: 'Strict 3-5 days sexual abstinence required',
        turnaroundTime: '2-3 Hours',
        description: 'Detailed analysis of semen volume, sperm concentration count, total motility (rapid progressive), vitality, and morphology.'
      },
      {
        id: 'path-1',
        name: 'Routine Urine Examination (CUE)',
        alias: 'Complete Urine Examination',
        department: 'Clinical Pathology',
        subCategory: 'Urine & Stool Investigations',
        type: 'Laboratory',
        sampleOrModality: 'Fresh Urine (Sterile Container)',
        fastingOrPrep: 'Clean-catch midstream urine preferred',
        turnaroundTime: '1-2 Hours',
        description: 'Chemical strip testing (pH, Protein, Sugar, Ketones, Bilirubin) combined with automated centrifuge microscopy for Pus cells, RBCs, Casts, and Crystals.',
        popular: true
      },
      {
        id: 'path-2',
        name: 'Urine C/S (Culture & Sensitivity)',
        alias: 'Urine Microbial Culture',
        department: 'Microbiology',
        subCategory: 'Urine & Stool Investigations',
        type: 'Laboratory',
        sampleOrModality: 'Sterile Clean-Catch Midstream Urine',
        fastingOrPrep: 'Collect before starting antibiotic therapy',
        turnaroundTime: '48 to 72 Hours',
        description: 'Identifies causative bacterial pathogens causing urinary tract infection (UTI) and delivers an antibiotic sensitivity profile.'
      },
      {
        id: 'path-3',
        name: 'Routine Stool Examination',
        alias: 'Complete Stool Microscopy & Occult Blood',
        department: 'Clinical Pathology',
        subCategory: 'Urine & Stool Investigations',
        type: 'Laboratory',
        sampleOrModality: 'Fresh Stool Specimen',
        fastingOrPrep: 'Fresh uncontaminated sample in clean container',
        turnaroundTime: '2 Hours',
        description: 'Microscopic examination for ova, cysts (E. histolytica, Giardia), parasites, occult blood, pus cells, and reducing substances.'
      }
    ]
  },
  {
    id: 'cardiology-imaging',
    title: 'Cardiology (ECG & 2D Echo)',
    icon: 'HeartPulse',
    type: 'Cardiology',
    description: 'High-precision non-invasive cardiac evaluation suite with 12-lead digital ECG and color flow 2D Echocardiography.',
    items: [
      {
        id: 'card-ecg',
        name: '12-Lead Digital ECG',
        alias: 'Electrocardiogram',
        department: 'Cardiology',
        subCategory: 'Cardiology',
        type: 'Cardiology',
        sampleOrModality: '12-Lead Computerized Electrodes',
        fastingOrPrep: 'Wear loose comfortable clothing',
        turnaroundTime: 'Immediate (10-15 Mins)',
        description: 'Records electrical activity of the heart to detect arrhythmias, ischemic changes, conduction blocks, and myocardial strain.',
        popular: true
      },
      {
        id: 'card-echo',
        name: '2D Echo (2D Echocardiography with Color Doppler)',
        alias: 'Echocardiogram / Cardiac Ultrasound',
        department: 'Cardiology',
        subCategory: 'Cardiology',
        type: 'Cardiology',
        sampleOrModality: 'Ultrasound Transducer / Cardiac Probe',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Same-Day (Report by Consultant)',
        description: 'High-definition ultrasound imaging of heart chambers, valves, ejection fraction (EF%), myocardial wall motion, and blood flow velocity.',
        popular: true
      }
    ]
  },
  {
    id: 'ultrasound',
    title: 'Ultrasound & Sonography Suite',
    icon: 'Activity',
    type: 'Radiology & Imaging',
    description: 'High-frequency 4D ultrasound scans for abdominal organs, pelvic structures, small parts, and specialized soft tissue imaging.',
    items: [
      {
        id: 'usg-1',
        name: 'US Scanning (General Diagnostic Ultrasound)',
        alias: 'General USG',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'Multi-frequency Ultrasound Probe',
        fastingOrPrep: 'Varies by body region',
        turnaroundTime: 'Immediate Scan & Report',
        description: 'Non-invasive high-resolution real-time acoustic sonography imaging performed by experienced radiologists.'
      },
      {
        id: 'usg-2',
        name: 'Ultrasound Abdomen',
        alias: 'Upper Abdomen USG',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'Convex Ultrasound Probe',
        fastingOrPrep: '6-8 hours fasting mandatory',
        turnaroundTime: 'Immediate / Same-Day',
        description: 'Evaluates liver parenchyma, gallbladder (stones/sludge), biliary tree, pancreas, spleen, kidneys, and abdominal aorta.',
        popular: true
      },
      {
        id: 'usg-3',
        name: 'Ultrasound Pelvis',
        alias: 'Pelvic USG (Male / Female)',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'Pelvic Transducer Probe',
        fastingOrPrep: 'Full bladder required (Drink 4-5 glasses of water 1 hr prior)',
        turnaroundTime: 'Immediate / Same-Day',
        description: 'Evaluates urinary bladder, uterus, ovaries, endometrial thickness in females, and prostate gland in males.',
        popular: true
      },
      {
        id: 'usg-4',
        name: 'Routine Whole Abdomen',
        alias: 'Whole Abdomen & Pelvis USG (USG W/A)',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'Convex Transducer Probe',
        fastingOrPrep: '6-8 hours fasting + Full urinary bladder',
        turnaroundTime: 'Immediate / Same-Day',
        description: 'Comprehensive combined sonogram covering all upper abdominal organs, hepatobiliary system, kidneys, ureters, and pelvic anatomy.',
        popular: true
      },
      {
        id: 'usg-5',
        name: 'Breast Ultrasound (Sonomammography)',
        alias: 'Bilateral Breast USG',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'High-Frequency Linear Probe',
        fastingOrPrep: 'Wear two-piece comfortable clothing',
        turnaroundTime: 'Same-Day',
        description: 'High-resolution linear probe sonography to differentiate cystic vs solid lesions, investigate breast lumps, pain, or mastitis.'
      },
      {
        id: 'usg-6',
        name: 'Thyroid Scan (Neck Ultrasound)',
        alias: 'Thyroid & Parathyroid USG',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'High-Frequency Linear Probe',
        fastingOrPrep: 'No special prep required',
        turnaroundTime: 'Same-Day',
        description: 'Evaluates thyroid lobes, nodule classification (TIRADS), multinodular goiter, vascularity, and cervical lymph nodes.'
      },
      {
        id: 'usg-7',
        name: 'Soft Tissue Ultrasound',
        alias: 'Musculoskeletal & Swelling USG',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'High-Frequency Linear Probe',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Immediate / Same-Day',
        description: 'Detailed evaluation of subcutaneous swellings, lipomas, cysts, tendon tears, hematomas, and abscesses.'
      },
      {
        id: 'usg-8',
        name: 'Elastography – Breast',
        alias: 'Shear Wave / Strain Elastography Breast',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'Specialized Elastography Probe',
        fastingOrPrep: 'No special prep required',
        turnaroundTime: 'Same-Day',
        description: 'State-of-the-art tissue stiffness mapping assisting in distinguishing benign from malignant solid breast nodules non-invasively.'
      },
      {
        id: 'usg-9',
        name: 'TVS Scan (Transvaginal Sonography)',
        alias: 'Endovaginal Ultrasound',
        department: 'Radiology & Sonology',
        subCategory: 'Ultrasound & Sonography',
        type: 'Imaging',
        sampleOrModality: 'High-Resolution Endovaginal Probe',
        fastingOrPrep: 'Empty bladder before the scan',
        turnaroundTime: 'Immediate / Same-Day',
        description: 'High-magnification close-up internal imaging for early intrauterine pregnancy (5-8 wks), follicular monitoring, PCOD, and ovarian pathologies.',
        popular: true
      }
    ]
  },
  {
    id: 'pregnancy-fetal',
    title: 'Pregnancy & Fetal Scans',
    icon: 'Baby',
    type: 'Radiology & Imaging',
    description: 'Specialized obstetric sonography protocols tracking fetal development, structural anatomy, and maternal-fetal circulation.',
    items: [
      {
        id: 'fetal-1',
        name: 'NT Scan (Nuchal Translucency & Nasal Bone)',
        alias: 'First Trimester Screening (11-13.6 Weeks)',
        department: 'Fetal Medicine & Sonology',
        subCategory: 'Pregnancy & Fetal Scans',
        type: 'Imaging',
        sampleOrModality: 'High-Resolution Ultrasound Probe',
        fastingOrPrep: 'Moderate bladder fullness (Drink 2-3 glasses of water)',
        turnaroundTime: 'Same-Day Comprehensive Report',
        description: 'Crucial 11-13.6 week scan measuring fetal nuchal translucency thickness and nasal bone presence to screen for chromosomal abnormalities (Down syndrome).',
        popular: true
      },
      {
        id: 'fetal-2',
        name: 'TIFFA Scan (Targeted Imaging for Fetal Anomalies)',
        alias: 'Level II Anomaly Scan (18-22 Weeks)',
        department: 'Fetal Medicine & Sonology',
        subCategory: 'Pregnancy & Fetal Scans',
        type: 'Imaging',
        sampleOrModality: 'High-Resolution 4D Transducer',
        fastingOrPrep: 'Moderate bladder fullness; light meal prior is fine',
        turnaroundTime: 'Same-Day Detailed Study',
        description: 'Exhaustive head-to-toe structural anatomical survey of fetal brain, spine, face, cardiac chambers, stomach bubble, kidneys, limbs, and placenta.',
        popular: true
      },
      {
        id: 'fetal-3',
        name: 'Growth Scan (Fetal Well-being & Biometry)',
        alias: 'Third Trimester Obstetric Scan',
        department: 'Fetal Medicine & Sonology',
        subCategory: 'Pregnancy & Fetal Scans',
        type: 'Imaging',
        sampleOrModality: 'High-Resolution Probe',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Same-Day',
        description: 'Tracks estimated fetal weight (EFW), amniotic fluid index (AFI), placental maturity grade, and fetal presentation in the 3rd trimester.',
        popular: true
      },
      {
        id: 'fetal-4',
        name: 'Fetal Doppler',
        alias: 'Obstetric Uterine & Umbilical Doppler',
        department: 'Fetal Medicine & Sonology',
        subCategory: 'Pregnancy & Fetal Scans',
        type: 'Imaging',
        sampleOrModality: 'Color Doppler Ultrasound',
        fastingOrPrep: 'No special prep required',
        turnaroundTime: 'Same-Day',
        description: 'Evaluates blood flow velocity in the umbilical artery, fetal middle cerebral artery (MCA), and maternal uterine arteries in high-risk pregnancies.',
        popular: true
      },
      {
        id: 'fetal-5',
        name: 'Fetal Echo (Fetal Echocardiography)',
        alias: 'Targeted Fetal Heart Study',
        department: 'Fetal Medicine & Cardiology',
        subCategory: 'Pregnancy & Fetal Scans',
        type: 'Imaging',
        sampleOrModality: 'Cardiac Color Doppler Probe',
        fastingOrPrep: 'Usually done between 20-24 weeks gestation',
        turnaroundTime: 'Same-Day',
        description: 'Specialized non-invasive detailed structural and functional evaluation of the developing fetal heart chambers, outflow tracts, and rhythm.'
      },
      {
        id: 'fetal-6',
        name: '4D Scanning (Real-Time 4D Obstetric Ultrasound)',
        alias: 'HD Live 4D Fetal Scan',
        department: 'Radiology & Sonology',
        subCategory: 'Pregnancy & Fetal Scans',
        type: 'Imaging',
        sampleOrModality: 'Volumetric 4D Transducer Probe',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Immediate Video & Photo Capture',
        description: 'High-definition 3D/4D surface rendering displaying lifelike moving images of the baby’s facial features, yawning, and movements.',
        popular: true
      }
    ]
  },
  {
    id: 'doppler',
    title: 'Color Doppler Vascular Studies',
    icon: 'Radio',
    type: 'Radiology & Imaging',
    description: 'High-resolution color flow Doppler and spectral waveform analysis for peripheral arteries, veins, and carotid blood circulation.',
    items: [
      {
        id: 'dop-1',
        name: 'Arterial Doppler',
        alias: 'Peripheral Arterial Study',
        department: 'Vascular Radiology',
        subCategory: 'Doppler Studies',
        type: 'Imaging',
        sampleOrModality: 'High-Frequency Linear Vascular Probe',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Same-Day Study & Report',
        description: 'Maps arterial lumen, peak systolic velocities, plaque stenosis, and peripheral vascular disease.'
      },
      {
        id: 'dop-2',
        name: 'Arterial Doppler – Upper Limbs',
        alias: 'Subclavian, Brachial & Radial Arterial Doppler',
        department: 'Vascular Radiology',
        subCategory: 'Doppler Studies',
        type: 'Imaging',
        sampleOrModality: 'Vascular Ultrasound Probe',
        fastingOrPrep: 'Wear loose clothing on arms',
        turnaroundTime: 'Same-Day',
        description: 'Color Doppler and spectral waveform study of the subclavian, axillary, brachial, radial, and ulnar arteries.'
      },
      {
        id: 'dop-3',
        name: 'Venous Doppler',
        alias: 'Peripheral Venous Flow Study',
        department: 'Vascular Radiology',
        subCategory: 'Doppler Studies',
        type: 'Imaging',
        sampleOrModality: 'Vascular Ultrasound Probe',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Same-Day',
        description: 'Assesses venous valve competence, venous insufficiency, varicose veins, and venous blood reflux.'
      },
      {
        id: 'dop-4',
        name: 'Venous Doppler – Lower Limbs',
        alias: 'Femoral, Popliteal & Saphenous Venous Doppler',
        department: 'Vascular Radiology',
        subCategory: 'Doppler Studies',
        type: 'Imaging',
        sampleOrModality: 'Vascular Ultrasound Probe',
        fastingOrPrep: 'Wear loose pants/shorts for leg examination',
        turnaroundTime: 'Same-Day',
        description: 'Comprehensive assessment for varicose veins, perforator incompetence, deep vein patency, and swelling of legs.',
        popular: true
      },
      {
        id: 'dop-5',
        name: 'Carotid Doppler',
        alias: 'Carotid & Vertebral Arterial Doppler',
        department: 'Vascular Radiology',
        subCategory: 'Doppler Studies',
        type: 'Imaging',
        sampleOrModality: 'Vascular Linear Ultrasound Probe',
        fastingOrPrep: 'No special prep required',
        turnaroundTime: 'Same-Day',
        description: 'Evaluates common, internal, and external carotid arteries and vertebral arteries to assess stroke risk and plaque stenosis.',
        popular: true
      },
      {
        id: 'dop-6',
        name: 'DVT Scan (Deep Vein Thrombosis Study)',
        alias: 'Venous Compression Doppler for DVT',
        department: 'Vascular Radiology',
        subCategory: 'Doppler Studies',
        type: 'Imaging',
        sampleOrModality: 'High-Resolution Compression Doppler',
        fastingOrPrep: 'No fasting required (Emergency study)',
        turnaroundTime: 'Immediate / Urgent',
        description: 'Direct venous compressibility and color fill evaluation to immediately rule out life-threatening blood clots in deep veins.',
        popular: true
      }
    ]
  },
  {
    id: 'radiology-xray-ct',
    title: 'Digital X-Ray & Computed Tomography (CT Scan)',
    icon: 'ScanLine',
    type: 'Radiology & Imaging',
    description: 'Low-radiation digital radiography, full panoramic dental OPG, and cross-sectional Computed Tomography (CT) scans.',
    items: [
      {
        id: 'xray-1',
        name: 'Digital X-Ray',
        alias: 'High-Frequency Digital Radiography',
        department: 'Digital Radiography',
        subCategory: 'X-Ray',
        type: 'Radiology',
        sampleOrModality: 'High-Frequency Low-Dose Digital X-Ray',
        fastingOrPrep: 'Remove jewelry, metallic items and belts',
        turnaroundTime: '15-20 Minutes (Immediate Film/Digital)',
        description: 'Low-dose high-definition radiography for Chest (PA/AP view), Spine (Cervical, Lumbar, Dorsal), Bones, Joint fractures, and Abdomen.',
        popular: true
      },
      {
        id: 'xray-2',
        name: 'Digital OPG (Orthopantomogram)',
        alias: 'Full-Mouth Panoramic Dental X-Ray',
        department: 'Digital Radiography',
        subCategory: 'X-Ray',
        type: 'Radiology',
        sampleOrModality: 'Panoramic Digital Sensor',
        fastingOrPrep: 'Remove earrings, necklaces and dental dentures',
        turnaroundTime: '15 Minutes',
        description: 'Full panoramic dental radiography capturing upper and lower jaws, teeth roots, wisdom tooth impactions, and TM joints in a single sweep.',
        popular: true
      },
      {
        id: 'ct-1',
        name: 'CT Scan Brain',
        alias: 'Computed Tomography Head / Brain (Plain)',
        department: 'Computed Tomography (CT)',
        subCategory: 'CT Scan',
        type: 'Radiology',
        sampleOrModality: 'Multi-Slice CT Scanner',
        fastingOrPrep: 'No fasting for plain scan; remove metallic accessories',
        turnaroundTime: 'Same-Day (Emergency within 1 Hour)',
        description: 'Rapid cross-sectional imaging for head trauma, brain hemorrhage, stroke/infarction, intracranial mass lesions, and chronic headaches.',
        popular: true
      },
      {
        id: 'ct-2',
        name: 'CT Scan Abdomen',
        alias: 'CT Abdomen (Plain)',
        department: 'Computed Tomography (CT)',
        subCategory: 'CT Scan',
        type: 'Radiology',
        sampleOrModality: 'Multi-Slice CT Scanner',
        fastingOrPrep: '4-6 hours fasting preferred',
        turnaroundTime: 'Same-Day',
        description: 'Cross-sectional multi-planar imaging for abdominal pain, renal stones, intestinal obstructions, appendicitis, and organ pathology.'
      },
      {
        id: 'ct-3',
        name: 'CT PNS (Paranasal Sinuses)',
        alias: 'CT Sinuses (Coronal & Axial)',
        department: 'Computed Tomography (CT)',
        subCategory: 'CT Scan',
        type: 'Radiology',
        sampleOrModality: 'High-Resolution Bone CT',
        fastingOrPrep: 'No fasting required',
        turnaroundTime: 'Same-Day',
        description: 'Thin-slice high-resolution bone algorithm scanning to evaluate chronic sinusitis, nasal polyps, deviated nasal septum (DNS), and fungal sinus infections.'
      },
      {
        id: 'ct-4',
        name: 'CT Chest (HRCT Thorax)',
        alias: 'High-Resolution Computed Tomography Chest',
        department: 'Computed Tomography (CT)',
        subCategory: 'CT Scan',
        type: 'Radiology',
        sampleOrModality: 'Multi-Slice CT Scanner',
        fastingOrPrep: 'No fasting required for non-contrast HRCT',
        turnaroundTime: 'Same-Day',
        description: 'High-resolution lung parenchymal imaging to detect interstitial lung disease (ILD), pulmonary fibrosis, pneumonia, bronchiectasis, and nodules.',
        popular: true
      },
      {
        id: 'ct-5',
        name: 'CECT Abdomen (Contrast-Enhanced CT)',
        alias: 'Contrast CT Abdomen & Pelvis',
        department: 'Computed Tomography (CT)',
        subCategory: 'CT Scan',
        type: 'Radiology',
        sampleOrModality: 'Intravenous Iodinated Contrast + CT',
        fastingOrPrep: '4-6 hours fasting + Normal Serum Creatinine report mandatory',
        turnaroundTime: 'Same-Day',
        description: 'Comprehensive contrast-enhanced study demonstrating vascularity, lymph nodes, tumor staging, inflammatory bowel disease, and complex organ lesions.',
        popular: true
      }
    ]
  }
];

// Helper to get all items flattened
export const allInvestigationsList: InvestigationItem[] = diagnosticInvestigations.flatMap(
  (cat) => cat.items
);
