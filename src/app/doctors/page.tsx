'use client';

import React from 'react';
import Link from 'next/link';
import { centreInfo } from '@/config/centreInfo';

export default function DoctorsPage() {
  const primarySpecialists = [
    {
      name: 'Dr. Ananya Sharma',
      qualification: 'MD, Internal Medicine',
      experience: '16+ Years Experience',
      role: 'Head of Preventive Health & Internal Medicine',
      description: 'Leads our internal medicine wing with a specialized focus on preventive health checkups, chronic diabetic management, hypertension, and endocrine disorders.',
      quote: '“The best medicine is the one that prevents the disease through early, accurate diagnosis.”',
      specialties: ['Preventive Screening', 'Diabetes & Hypertension', 'Thyroid Disorders', 'Metabolic Health']
    },
    {
      name: 'Dr. Rajesh Menon',
      qualification: 'MD, Radiodiagnosis',
      experience: '14+ Years Experience',
      role: 'Head of Imaging & Ultrasonology',
      description: 'Supervises all advanced imaging divisions, reporting 4D ultrasound, vascular Color Doppler, low-dose digital X-Ray, and digital OPG scans with high clinical accuracy.',
      quote: '“A clear, calibrated diagnostic image today saves a complicated story tomorrow.”',
      specialties: ['4D Ultrasound', 'Vascular Doppler', 'Digital X-Ray & OPG', 'Abdominal Sonology']
    },
    {
      name: 'Dr. S. K. Sharma',
      qualification: 'MD, Pathology',
      experience: '18+ Years Experience',
      role: 'Chief Clinical Pathologist & Laboratory Director',
      description: 'Oversees automated biochemistry, hematology, immuno-assays, and clinical microscopy ensuring every sample meets national diagnostic precision standards.',
      quote: '“Behind every laboratory sample is a patient’s life waiting for exact scientific answers.”',
      specialties: ['Clinical Hematology', 'Hormonal Assays', 'Biochemistry & LFT', 'Cytology & Serology']
    }
  ];

  const consultantDoctors = [
    {
      title: 'Consultant Cardiologist',
      icon: '🫀',
      focus: '2D Echocardiography, TMT Stress Testing, Cardiac Biomarkers (TROP-T), Arrhythmias & Coronary Screening.',
      availability: 'Available on Appointment / Weekly Specialist Clinics'
    },
    {
      title: 'Consultant Neurologist',
      icon: '🧠',
      focus: 'Stroke risk evaluation, peripheral neuropathy screening, cervical/lumbar spine radiography reviews.',
      availability: 'Available on Scheduled Specialist Consultation'
    },
    {
      title: 'Consultant Radiologist',
      icon: '🩻',
      focus: 'Cross-sectional imaging, specialized pelvic and abdominal scans, musculoskeletal sonography.',
      availability: 'Daily Diagnostic Reporting'
    },
    {
      title: 'Consultant Urologist',
      icon: '🩺',
      focus: 'USG KUB analysis, prostate enlargement (PSA screening), renal calculi, and hematuria workups.',
      availability: 'Available on Prior Booking'
    },
    {
      title: 'Consultant Gastroenterologist',
      icon: '🔬',
      focus: 'Jaundice profiling, viral hepatitis workups, liver enzyme grading, and abdominal pathology review.',
      availability: 'Weekly Clinical Review'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0a6cbe]">Medical Team & Specialists</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              Doctors who read every report <span className="grad-text">like family</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Our specialists combine decades of hospital and diagnostic experience with personalized attention in Toopran.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Specialists Section */}
      <section className="mx-auto max-w-6xl px-5 mt-14">
        <div className="persp grid gap-8 md:grid-cols-3">
          {primarySpecialists.map((doc, idx) => (
            <div key={doc.name} className="reveal3d" style={{ transitionDelay: `${idx * 0.08}s` }}>
              <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)] hover:border-[#0a6cbe]/50 transition">
                <div className="glare" />

                {/* Experience Badge */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#0a6cbe]/10 px-3 py-1 text-xs font-bold text-[#0a6cbe]">
                    {doc.experience}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Asha Jyothi
                  </span>
                </div>

                {/* Name & Qualification */}
                <h3 className="mt-4 text-2xl font-black text-[#12304b]">
                  {doc.name}
                </h3>
                <p className="mt-1 text-xs font-extrabold text-[#0a6cbe] uppercase tracking-wide">
                  {doc.qualification}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {doc.role}
                </p>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed text-slate-600">
                  {doc.description}
                </p>

                {/* Quote */}
                <blockquote className="mt-4 border-l-2 border-[#0a6cbe]/40 pl-3 text-xs italic text-slate-600 bg-slate-50 py-2 rounded-r-lg">
                  {doc.quote}
                </blockquote>

                {/* Specialties Chips */}
                <div className="mt-5 flex flex-wrap gap-1.5 flex-1">
                  {doc.specialties.map((spec) => (
                    <span key={spec} className="rounded-md border border-slate-200 bg-[#f4f8fc] px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Book Link */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/book?doctor=${encodeURIComponent(doc.name)}`}
                    className="block w-full rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-2.5 text-center text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105"
                  >
                    Consult Doctor
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visiting & Consultant Specialists Panel */}
      <section className="mx-auto max-w-6xl px-5 mt-20">
        <div className="persp mb-10 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-3.5 py-1 text-xs font-bold text-[#0a6cbe] mb-2">
              SPECIALIST CLINICS
            </span>
            <h2 className="text-3xl font-extrabold text-[#12304b] sm:text-4xl">
              Visiting Consultant Doctors Available
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Expert clinical consultants available for diagnostic reviews and clinical second opinions.
            </p>
          </div>
        </div>

        <div className="persp grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {consultantDoctors.map((item, idx) => (
            <div key={item.title} className="reveal3d" style={{ transitionDelay: `${idx * 0.06}s` }}>
              <div className="tilt relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-[#f4f8fc] p-6 shadow-sm hover:shadow-md hover:border-[#0a6cbe]/40 transition">
                <div className="glare" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="text-base font-extrabold text-[#12304b]">{item.title}</h4>
                    <p className="text-[11px] font-semibold text-[#0a6cbe]">{item.availability}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {item.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
