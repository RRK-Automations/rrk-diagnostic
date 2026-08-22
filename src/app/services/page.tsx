'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { centreInfo } from '@/config/centreInfo';

export default function ServicesPage() {
  const servicesList = [
    {
      id: '01',
      title: 'Pathology & Complete Blood Tests',
      category: 'Clinical Pathology',
      image: '/images/pathology.jpg',
      description: 'Fully automated biochemistry, hematology, and serology analyzers providing accurate complete blood counts (CBC), blood glucose, lipid profile, liver function (LFT), renal function (KFT), and metabolic panels.',
      investigations: ['CBC & Haemogram', 'Fasting & Post-Lunch Glucose', 'Lipid Profile', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Serum Electrolytes', 'Calcium & Phosphorus'],
      fasting: '10-12 hours overnight fasting recommended for lipid and glucose panels.',
      turnaround: 'Same-day report delivery (within 3-4 hours).'
    },
    {
      id: '02',
      title: 'Thyroid & Hormonal Profiles',
      category: 'Endocrinology & Immuno-Assay',
      image: '/images/thyroid.jpg',
      description: 'High-precision chemiluminescence immunoassays for Thyroid Stimulating Hormone (TSH), Total/Free T3 & T4, Fertility Hormones (FSH, LH, Prolactin), and Vitamin D & B12 assays.',
      investigations: ['TSH Ultra-sensitive', 'Free T3 & Free T4', 'Anti-TPO Antibodies', '25-OH Vitamin D', 'Vitamin B12', 'Serum Ferritin', 'Hormonal Assays'],
      fasting: 'Morning sample preferred before taking thyroid medications.',
      turnaround: 'Same-day evening report delivery.'
    },
    {
      id: '03',
      title: '4D Ultrasound & Color Doppler',
      category: 'Radiology & Imaging',
      image: '/images/ultrasound.jpg',
      description: 'High-definition diagnostic ultrasound imaging for whole abdomen, pelvis, obstetric pregnancy screening, anomaly scans, and vascular Color Doppler (arterial/venous) performed by skilled sonologists.',
      investigations: ['Whole Abdomen USG', 'Pelvic USG', 'Obstetric / Pregnancy USG', 'USG KUB (Kidneys, Ureter, Bladder)', 'Color Doppler (Limbs, Carotid)', 'Scrotal & Thyroid Doppler'],
      fasting: '6-8 hours fasting for upper abdomen. Full bladder (drink 4 glasses of water) for pelvic/KUB scans.',
      turnaround: 'Immediate scan report printout with high-resolution image plates.'
    },
    {
      id: '04',
      title: 'Digital X-Ray & Digital OPG',
      category: 'Radiology & Imaging',
      image: '/images/xray.jpg',
      description: 'State-of-the-art high-frequency digital radiography for chest, spine, extremities, and joints, plus digital Orthopantomogram (OPG) for comprehensive panoramic dental and jaw diagnostic evaluations.',
      investigations: ['Chest X-Ray PA & Lateral', 'Spine (Cervical, Lumbar, Dorsal)', 'Bone & Joint Radiography', 'Digital OPG (Full Dental Panoramic)', 'PNS & Skull Views'],
      fasting: 'No fasting required. Remove metallic objects and jewelry prior to scan.',
      turnaround: 'Instant digital image viewing and printed calibrated report within 20 minutes.'
    },
    {
      id: '05',
      title: 'Cardiology (2D Echo, 12-Lead ECG, TMT)',
      category: 'Cardiology',
      image: '/images/ecg.jpg',
      description: 'Non-invasive cardiovascular diagnostic suite including resting 12-lead digital electrocardiography (ECG), color Doppler 2D Echocardiography, and computerized Treadmill Stress Testing (TMT).',
      investigations: ['12-Lead Digital ECG', '2D Echocardiography (Color Flow)', 'TMT (Treadmill Stress Test)', 'Troponin-T (Cardiac Biomarker)', 'CPK-MB & BNP'],
      fasting: 'Light breakfast for TMT; no special fasting for resting ECG. Overnight fasting for lipid profiles.',
      turnaround: 'Immediate ECG and 2D Echo doctor reporting.'
    },
    {
      id: '06',
      title: 'Urine, Stool & Clinical Microscopy',
      category: 'Pathology',
      image: '/images/urine.jpg',
      description: 'Comprehensive microscopic examination, biochemical strip analysis, automated urine culture, and stool hanging-drop preparations for acute diarrheal pathogens, occult blood, and urinary tract infections.',
      investigations: ['Complete Urine Examination (CUE)', 'Urine Culture & Sensitivity', 'Microalbuminuria', 'Urine Ketone Bodies & Bile Salts', 'Stool Microscopic & Occult Blood', 'Stool Hanging Drop'],
      fasting: 'Fresh early-morning midstream urine sample recommended in sterile container.',
      turnaround: 'Routine analysis in 2 hours; culture reports in 48 hours.'
    },
    {
      id: '07',
      title: 'Fever & Acute Infectious Panels',
      category: 'Pathology',
      image: '/images/fever.jpg',
      description: 'Rapid, dependable diagnostic panels for acute febrile illnesses including Malaria peripheral smears, Rapid Malaria Antigen (Pf/Pv), Widal slide/tube agglutination for typhoid, Dengue NS1 & IgM/IgG, and viral serologies.',
      investigations: ['Malaria Smear & Antigen (Pf/Pv)', 'Widal Test (Typhoid)', 'Dengue NS1 Antigen & Antibody', 'Complete Blood Picture with Platelets', 'Chikungunya Serology', 'CRP Quantitative'],
      fasting: 'No fasting required. Can be tested at any time during fever spikes.',
      turnaround: 'Urgent emergency reporting within 1 to 2 hours.'
    },
    {
      id: '08',
      title: 'Jaundice & Liver Health Workup',
      category: 'Pathology',
      image: '/images/jaundice.jpg',
      description: 'Complete diagnostic profiling for acute and chronic jaundice, hepatitis infections, and liver parenchymal damage with fractionated bilirubin and hepatic enzyme assays.',
      investigations: ['Serum Bilirubin (Total, Direct, Indirect)', 'SGOT (AST) & SGPT (ALT)', 'Alkaline Phosphatase (ALP)', 'Total Proteins, Albumin & Globulin', 'Viral Hepatitis Markers (HBsAg, Anti-HCV, HAV IgM)'],
      fasting: 'Overnight 8-10 hours fasting recommended for precise enzyme accuracy.',
      turnaround: 'Same-day verified report delivery.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0a6cbe]">Our Diagnostic Divisions</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              Comprehensive <span className="grad-text">Diagnostic Services</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Eight specialized diagnostic divisions under one roof in Toopran — from advanced pathology and 4D ultrasound to digital X-ray, digital OPG, and cardiology.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid with Photos */}
      <section className="mx-auto max-w-6xl px-5 mt-14">
        <div className="persp grid gap-8 md:grid-cols-2">
          {servicesList.map((service, idx) => (
            <div key={service.id} className="reveal3d" style={{ transitionDelay: `${idx * 0.06}s` }}>
              <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)] hover:border-[#0a6cbe]/50 transition">
                <div className="glare" />

                {/* Photo Aspect Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="zoom-img object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b3a5e]/80 via-transparent to-transparent" />
                  <span className="depth absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-bold text-[#0a6cbe] shadow-sm backdrop-blur">
                    Division {service.id}
                  </span>
                  <span className="depth absolute right-4 bottom-4 rounded-full bg-emerald-500/90 text-white px-3 py-1 text-xs font-bold backdrop-blur">
                    {service.turnaround}
                  </span>
                </div>

                <div className="depth flex flex-1 flex-col p-6">
                  {/* Title & Category */}
                  <div className="text-xs font-bold text-[#0a6cbe] uppercase tracking-wide">
                    {service.category}
                  </div>
                  <h3 className="mt-1 text-2xl font-black text-[#12304b]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  {/* Investigations List */}
                  <div className="mt-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Investigations Included:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.investigations.map((item, tIdx) => (
                        <span key={tIdx} className="rounded-md border border-slate-200 bg-[#f4f8fc] px-2.5 py-1 text-xs font-medium text-[#12304b]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Preparation Guideline */}
                  <div className="mt-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 p-3 text-xs text-amber-900 flex items-start gap-2">
                    <span className="font-bold shrink-0">⚠️ Preparation:</span>
                    <span>{service.fasting}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <Link
                      href={`/book?service=${encodeURIComponent(service.title)}&type=home_collection`}
                      className="flex-1 rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-3 text-center text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105"
                    >
                      Book Diagnostic Test
                    </Link>
                    <a
                      href={`https://wa.me/${centreInfo.whatsapp.number}?text=${encodeURIComponent(`Hi Asha Jyothi, I would like to enquire about ${service.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold text-white hover:bg-[#1fbd5a] transition"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
