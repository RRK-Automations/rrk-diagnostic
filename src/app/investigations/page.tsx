'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Check, 
  FlaskConical, 
  Droplets, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  HeartPulse, 
  Radio, 
  ScanLine, 
  Baby, 
  Clock, 
  Calendar, 
  MessageCircle, 
  PhoneCall, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useCmsContent } from '@/hooks/useCmsContent';
import { getWhatsAppUrl } from '@/utils/whatsapp';

interface SimpleTestItem {
  name: string;
  alias?: string;
  prep?: string;
  badge?: string;
}

interface SimpleInvestigationCategory {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  badge: string;
  turnaround: string;
  tests: SimpleTestItem[];
}

export default function InvestigationsPage() {
  const { content } = useCmsContent();
  const [searchQuery, setSearchQuery] = useState('');

  const whatsappNum = content?.whatsappNumber || '919440009788';

  const categories: SimpleInvestigationCategory[] = [
    {
      id: 'hematology',
      title: 'Hematology & Blood Picture',
      icon: 'Droplets',
      subtitle: 'Complete blood counts, anemia screening, coagulation times, and blood typing.',
      badge: 'Pathology Lab',
      turnaround: '2-3 Hours Delivery',
      tests: [
        { name: 'Complete Blood Picture (CBP / CBC)', alias: 'Full Hemogram & Platelets', badge: 'Popular' },
        { name: 'Haemogram', alias: 'Hb, RBC, Indices & Morphology' },
        { name: 'ESR (Erythrocyte Sedimentation Rate)', alias: 'Inflammation Marker' },
        { name: 'Absolute Eosinophil Count (AEC)', alias: 'Allergy & Asthma' },
        { name: 'BT / CT', alias: 'Bleeding Time & Clotting Time' },
        { name: 'PT / APTT', alias: 'Coagulation Pathway Screening' },
        { name: 'PT / INR', alias: 'Warfarin & Anticoagulant Check', badge: 'Popular' },
        { name: 'Blood Grouping & Rh Typing', alias: 'ABO Group Identification' }
      ]
    },
    {
      id: 'biochemistry',
      title: 'Biochemistry, Liver & Kidney Tests',
      icon: 'FlaskConical',
      subtitle: 'Automated organ estimations for blood sugar, diabetes, lipids, liver enzymes, and renal health.',
      badge: 'Pathology Lab',
      turnaround: 'Same-Day Reporting',
      tests: [
        { name: 'Blood Sugar (Fasting & Post-Lunch / PLBS)', prep: '8-10 hrs fasting for FBS', badge: 'Popular' },
        { name: 'HbA1C (Glycosylated Hemoglobin)', alias: '3-Month Sugar Average', prep: 'No fasting required', badge: 'Popular' },
        { name: 'Lipid Profile', alias: 'Complete Cholesterol & Triglycerides', prep: '10-12 hrs fasting mandatory', badge: 'Popular' },
        { name: 'Liver Function Test (LFT)', alias: 'SGOT, SGPT, Bilirubin, Proteins', prep: 'Overnight fasting preferred', badge: 'Popular' },
        { name: 'Serum Creatinine', alias: 'Kidney Filtration Indicator', badge: 'Popular' },
        { name: 'Blood Urea & Serum Uric Acid', alias: 'Kidney & Gout Marker' },
        { name: 'Serum Bilirubin Total & Direct', alias: 'Jaundice & Liver Fractions' },
        { name: 'Serum Amylase & Serum Lipase', alias: 'Pancreatic Health' }
      ]
    },
    {
      id: 'serology',
      title: 'Serology, Infection & Allergy Panels',
      icon: 'ShieldCheck',
      subtitle: 'High-sensitivity immunodiagnostics for typhoid, autoimmune markers, viral screens, and allergies.',
      badge: 'Serology Wing',
      turnaround: '1-2 Hours Delivery',
      tests: [
        { name: 'Serum Widal Test', alias: 'Typhoid Fever Agglutination' },
        { name: 'CRP (C-Reactive Protein)', alias: 'Quantitative Inflammation Marker', badge: 'Popular' },
        { name: 'Serum RA Test (Rheumatoid Factor)', alias: 'Arthritis Screening' },
        { name: 'ASO Titer', alias: 'Streptococcal Infection Check' },
        { name: 'Serum IgE', alias: 'Total Allergy Profile' },
        { name: 'Mantoux Test', alias: 'Tuberculin Skin Test (Read at 48-72h)' },
        { name: 'HBsAg & HCV', alias: 'Hepatitis B & Hepatitis C Screening' },
        { name: 'VDRL & HIV 1 & 2', alias: 'Confidential Serological Screening' }
      ]
    },
    {
      id: 'vitamins-fevers',
      title: 'Vitamins, Acute Fevers & Cardiac Blood Markers',
      icon: 'Sparkles',
      subtitle: 'Immunoassay vitamin levels, rapid acute fever identification, and emergency heart enzymes.',
      badge: 'Specialized Lab',
      turnaround: 'Rapid / Same-Day',
      tests: [
        { name: 'Vitamin D3 (25-OH Total)', alias: 'Bone & Immune Vitality', badge: 'Popular' },
        { name: 'Vitamin B12 (Cyanocobalamin)', alias: 'Nerve & Blood Vitality', badge: 'Popular' },
        { name: 'Malaria PV - PF', alias: 'Smear & Rapid Dual Antigen', badge: 'Urgent' },
        { name: 'Dengue NS1 / IgM / IgG', alias: 'Complete Dengue Profile', badge: 'Urgent' },
        { name: 'Chikungunya IgM / IgG', alias: 'Acute Chikungunya Fever' },
        { name: 'Troponin I / T', alias: 'High-Sensitivity Cardiac Marker', prep: '24/7 Emergency', badge: 'Emergency' }
      ]
    },
    {
      id: 'hormones-pathology',
      title: 'Hormones, Fertility & Clinical Microscopy',
      icon: 'Activity',
      subtitle: 'Thyroid assays, fertility parameters, urine chemistry, and stool microscopic examinations.',
      badge: 'Hormonal & Pathology',
      turnaround: 'Same-Day Delivery',
      tests: [
        { name: 'Thyroid Profile (T3, T4, TSH)', alias: 'Complete Thyroid Check', badge: 'Popular' },
        { name: 'Serum β-HCG', alias: 'Quantitative Pregnancy Confirmation' },
        { name: 'Pregnancy Test (HCG Urine Card)', alias: 'Rapid Urine Card Test' },
        { name: 'Semen Analysis', alias: 'Sperm Count & Motility', prep: '3-5 days abstinence required' },
        { name: 'Routine Urine Examination (CUE)', alias: 'Complete Urine Microscopy', badge: 'Popular' },
        { name: 'Urine Culture & Sensitivity (Urine C/S)', alias: 'UTI Antibiotic Check' },
        { name: 'Routine Stool Examination', alias: 'Microscopy & Parasite Check' }
      ]
    },
    {
      id: 'cardiology',
      title: 'Cardiology (ECG & 2D Echo)',
      icon: 'HeartPulse',
      subtitle: 'Non-invasive cardiac evaluation suite with 12-lead digital ECG and color flow Echocardiography.',
      badge: 'Cardiology Wing',
      turnaround: 'Immediate Scan & Report',
      tests: [
        { name: '12-Lead Digital ECG', alias: 'Computerized Electrocardiogram', prep: 'Loose clothing', badge: 'Popular' },
        { name: '2D Echo (2D Echocardiography with Color Doppler)', alias: 'Cardiac Color Ultrasound', badge: 'Popular' }
      ]
    },
    {
      id: 'ultrasound',
      title: 'Ultrasound & Sonography Suite',
      icon: 'Activity',
      subtitle: 'High-definition 4D sonography for abdominal organs, pelvic structures, breast, and neck.',
      badge: 'Imaging Wing',
      turnaround: 'Immediate Scan & Report',
      tests: [
        { name: 'US Scanning', alias: 'General Diagnostic Sonography' },
        { name: 'Ultrasound Abdomen', prep: '6-8 hrs fasting mandatory', badge: 'Popular' },
        { name: 'Ultrasound Pelvis', prep: 'Full urinary bladder required', badge: 'Popular' },
        { name: 'Routine Whole Abdomen', alias: 'Abdomen & Pelvis Combined', prep: 'Fasting + Full bladder', badge: 'Popular' },
        { name: 'Breast Ultrasound', alias: 'Sonomammography' },
        { name: 'Thyroid Scan', alias: 'Neck Ultrasound' },
        { name: 'Soft Tissue Ultrasound', alias: 'Musculoskeletal Swellings' },
        { name: 'Elastography – Breast', alias: 'Tissue Stiffness Assessment' },
        { name: 'TVS Scan', alias: 'Transvaginal Endovaginal Scan', badge: 'Popular' }
      ]
    },
    {
      id: 'pregnancy-fetal',
      title: 'Pregnancy & Fetal Scans',
      icon: 'Baby',
      subtitle: 'Specialized fetal medicine sonography tracking growth, structural anatomy, and fetal well-being.',
      badge: 'Fetal Medicine',
      turnaround: 'Same-Day Detailed Study',
      tests: [
        { name: 'NT Scan (Nuchal Translucency)', alias: '11 - 13.6 Weeks Screening', badge: 'Popular' },
        { name: 'TIFFA Scan (Level II Anomaly Scan)', alias: '18 - 22 Weeks Detailed Anatomy', badge: 'Popular' },
        { name: 'Growth Scan', alias: 'Fetal Biometry & Amniotic Fluid', badge: 'Popular' },
        { name: 'Fetal Doppler', alias: 'Umbilical & Uterine Flow', badge: 'Popular' },
        { name: 'Fetal Echo', alias: 'Fetal Cardiac Structure' },
        { name: 'Real-Time 4D Scanning', alias: 'Live HD Fetal Surface View', badge: 'Popular' }
      ]
    },
    {
      id: 'doppler',
      title: 'Color Doppler Vascular Studies',
      icon: 'Radio',
      subtitle: 'High-resolution color vascular flow Doppler for peripheral arteries, deep veins, and carotid blood flow.',
      badge: 'Vascular Radiology',
      turnaround: 'Same-Day Study',
      tests: [
        { name: 'Arterial Doppler', alias: 'Peripheral Arterial Circulation' },
        { name: 'Arterial Doppler – Upper Limbs', alias: 'Arm Arterial Doppler' },
        { name: 'Venous Doppler', alias: 'Peripheral Venous Flow' },
        { name: 'Venous Doppler – Lower Limbs', alias: 'Leg Venous & Varicose Doppler', badge: 'Popular' },
        { name: 'Carotid Doppler', alias: 'Stroke Risk & Neck Arteries', badge: 'Popular' },
        { name: 'DVT Scan', alias: 'Deep Vein Thrombosis Compression Scan', badge: 'Urgent' }
      ]
    },
    {
      id: 'radiology-xray-ct',
      title: 'Digital X-Ray & CT Scan',
      icon: 'ScanLine',
      subtitle: 'Low-dose digital radiography and cross-sectional Computed Tomography.',
      badge: 'Radiology Wing',
      turnaround: '15 Mins X-Ray / Same-Day CT',
      tests: [
        { name: 'Digital X-Ray', alias: 'Chest PA, Spine, Bones & Joints', badge: 'Popular' },
        { name: 'CT Scan Brain', alias: 'Head CT Plain', badge: 'Popular' },
        { name: 'CT Scan Abdomen', alias: 'Abdominal CT' },
        { name: 'CT PNS', alias: 'Paranasal Sinuses Scan' },
        { name: 'CT Chest (HRCT Thorax)', alias: 'High-Resolution Lung CT', badge: 'Popular' },
        { name: 'CECT Abdomen', alias: 'Contrast CT Abdomen', prep: 'Fasting + Normal Serum Creatinine' }
      ]
    }
  ];

  // Filter based on search query
  const query = searchQuery.toLowerCase().trim();
  const filteredCategories = categories.map((cat) => {
    if (!query) return cat;

    const filteredTests = cat.tests.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        (t.alias && t.alias.toLowerCase().includes(query)) ||
        cat.title.toLowerCase().includes(query)
    );

    if (filteredTests.length === 0) return null;
    return { ...cat, tests: filteredTests };
  }).filter(Boolean) as SimpleInvestigationCategory[];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="h-6 w-6 text-rose-600" />;
      case 'FlaskConical': return <FlaskConical className="h-6 w-6 text-sky-600" />;
      case 'ShieldCheck': return <ShieldCheck className="h-6 w-6 text-emerald-600" />;
      case 'Sparkles': return <Sparkles className="h-6 w-6 text-amber-600" />;
      case 'Activity': return <Activity className="h-6 w-6 text-indigo-600" />;
      case 'HeartPulse': return <HeartPulse className="h-6 w-6 text-red-600" />;
      case 'Baby': return <Baby className="h-6 w-6 text-pink-600" />;
      case 'Radio': return <Radio className="h-6 w-6 text-teal-600" />;
      case 'ScanLine': return <ScanLine className="h-6 w-6 text-purple-600" />;
      default: return <FlaskConical className="h-6 w-6 text-[#0a6cbe]" />;
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-14 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-4 py-1 text-xs font-bold text-[#0a6cbe] mb-3">
            CLINICAL INVESTIGATIONS CATALOG · ASHA JYOTHI DIAGNOSTICS TOOPRAN
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#12304b]">
            Diagnostic <span className="grad-text">Investigations & Tests</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Browse our complete list of blood tests, 4D ultrasound, CT scan, digital X-Ray, Doppler studies, and ECG/2D Echo.
          </p>

          {/* Simple Search Input */}
          <div className="mt-6 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search any test (e.g. CBP, Thyroid, 4D Scan, CT Brain, ECG)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-300 bg-white pl-11 pr-10 py-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories Grid - Clean, Lightweight Package-Style Cards */}
      <section className="mx-auto max-w-6xl px-5 mt-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => {
            const categoryWhatsappMsg = `Hi Asha Jyothi Diagnostics, I want to inquire / book tests under "${cat.title}". Please guide me.`;

            return (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-[0_16px_40px_-28px_rgba(18,48,75,0.2)] hover:border-[#0a6cbe]/50 hover:shadow-xl transition duration-300"
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-2xl bg-sky-50 border border-sky-100">
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold text-slate-600">
                        {cat.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="h-3 w-3 text-emerald-600" />
                      {cat.turnaround}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-4 text-xl font-black text-[#12304b] group-hover:text-[#0a6cbe] transition">
                    {cat.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {cat.subtitle}
                  </p>

                  {/* Tests List with Green Checkmarks */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                    {cat.tests.map((test, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] mt-0.5">
                          ✓
                        </span>
                        <div className="flex-1 leading-snug">
                          <span className="font-bold text-[#12304b]">{test.name}</span>
                          {test.alias && (
                            <span className="ml-1 text-[11px] text-slate-500 font-normal">
                              ({test.alias})
                            </span>
                          )}
                          {test.prep && (
                            <div className="mt-0.5 inline-block text-[10px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                              ⚠️ {test.prep}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-7 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={getWhatsAppUrl(whatsappNum, categoryWhatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition"
                  >
                    <MessageCircle className="h-3.5 w-3.5 fill-current" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <Link
                    href={`/book?department=${encodeURIComponent(cat.title)}`}
                    className="inline-flex items-center justify-center gap-1 rounded-2xl bg-sky-50 text-[#0a6cbe] hover:bg-sky-100 px-3.5 py-2.5 text-xs font-bold transition border border-sky-200"
                    title="Book test online"
                  >
                    <span>Book</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
            <Search className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No tests matched &quot;{searchQuery}&quot;</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Our central laboratory in Toopran performs over 500+ clinical tests and specialized scans.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0a6cbe] text-xs font-bold text-white shadow-sm"
            >
              Clear Search Query
            </button>
          </div>
        )}
      </section>

      {/* Patient Prep Note */}
      <section className="mx-auto max-w-6xl px-5 mt-16">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm text-center">
          <h3 className="text-xl font-extrabold text-[#12304b]">Need Doorstep Sample Collection in Toopran?</h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Our trained phlebotomists provide gentle, hygienic blood sample collection at your doorstep across Toopran and surrounding areas.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-7 py-3 text-xs font-bold text-white shadow-sm hover:shadow-md transition"
            >
              Book Home Collection
            </Link>
            <a
              href={getWhatsAppUrl(whatsappNum, 'Hi Asha Jyothi Diagnostics, I want to book doorstep sample collection in Toopran.')}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
