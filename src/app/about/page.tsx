'use client';

import React from 'react';
import Link from 'next/link';
import { centreInfo } from '@/config/centreInfo';

export default function AboutPage() {
  const milestones = [
    {
      year: '1992',
      title: 'Foundation by P. Mallesh Goud',
      description: 'Asha Jyothi Diagnostic Centre was established in Toopran with a clear vision: bringing dependable, affordable pathology testing to the local community.'
    },
    {
      year: '2005',
      title: 'Ultrasonography & Imaging Wing',
      description: 'Expanded into non-invasive diagnostic imaging, introducing advanced high-resolution Ultrasound and color Doppler technology.'
    },
    {
      year: '2015',
      title: 'Digital X-Ray & Digital OPG',
      description: 'Upgraded to high-frequency low-radiation digital radiography and specialized panoramic dental OPG imaging.'
    },
    {
      year: '2020+',
      title: 'CT Scan & 2D Echo Cardiology',
      description: 'Integrated cross-sectional CT scanning, cardiac 2D Echocardiography, and fully automated biochemistry analyzers with same-day digital reporting.'
    }
  ];

  const qualityStandards = [
    {
      title: 'Calibrated Analyzers',
      desc: 'Daily multi-level control runs on fully automated biochemistry and hematology analyzers.'
    },
    {
      title: '25% Discounted Packages',
      desc: 'Providing flat 25% discount on all 10 preventive packages to make healthcare accessible.'
    },
    {
      title: 'Same-Day Digital Delivery',
      desc: 'Routine blood and scan reports published same-day for immediate doctor consultation.'
    },
    {
      title: 'Doorstep Phlebotomy',
      desc: 'Trained sample collectors providing gentle, hygienic home collection across Toopran.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-4 py-1.5 text-xs font-bold text-[#0a6cbe] mb-3">
              ESTABLISHED IN 1992 · 33+ YEARS OF TRUST
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              About <span className="grad-text">Asha Jyothi Diagnostics</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Three decades of clinical precision, compassionate patient care, and continuous technological advancement in Toopran, Medak.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Story */}
      <section className="mx-auto max-w-6xl px-5 mt-16">
        <div className="mx-auto grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal3d">
            <div className="tilt relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0b3a5e] to-[#12304b] p-8 text-white shadow-xl">
              <div className="glare" />
              <span className="inline-block rounded-full bg-[#0a6cbe] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-4">
                Founder & Director
              </span>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                P. Mallesh Goud
              </h3>
              <p className="mt-1 text-xs font-semibold text-sky-200">
                Director · Asha Jyothi Diagnostic Centre, Toopran
              </p>
              <p className="mt-6 text-sm leading-relaxed text-slate-200">
                “Over 33 years ago, we began Asha Jyothi with a single commitment: no patient in Toopran should have to travel long distances or wait days for accurate diagnostic answers. Today, with full lab automation, CT scans, digital X-Ray & OPG, and 24/7 emergency readiness, we remain dedicated to every family we serve.”
              </p>
              <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap gap-4 text-xs text-sky-100">
                <span>📞 Cell: +91 94400 09788 / +91 94402 82688</span>
                <span>☎️ Landline: 08454-235537</span>
              </div>
            </div>
          </div>

          <div className="reveal3d">
            <h2 className="text-3xl font-extrabold text-[#12304b] sm:text-4xl">
              Precision Diagnostics, <span className="grad-text">Compassionate Care</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Asha Jyothi Diagnostic Centre (Behind Surya Medical & General Stores, Main Road, Toopran) is Medak district&apos;s premier standalone diagnostic facility.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              From automated biochemistry, hematology, and hormonal assays to 4D ultrasound, vascular Doppler, digital OPG dental imaging, and cardiac 2D Echocardiography, our center provides hospital-grade accuracy with the warmth of neighborhood care.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {qualityStandards.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-[#f4f8fc] p-4">
                  <h4 className="text-xs font-black text-[#0a6cbe]">{item.title}</h4>
                  <p className="mt-1 text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 33-Year Journey Milestones */}
      <section className="mx-auto max-w-6xl px-5 mt-20">
        <div className="persp mb-12 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-3 py-1 text-xs font-bold text-[#0a6cbe] mb-2">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl font-extrabold text-[#12304b] sm:text-4xl">
              33+ Years of Community Trust
            </h2>
          </div>
        </div>

        <div className="persp grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, idx) => (
            <div key={m.year} className="reveal3d" style={{ transitionDelay: `${idx * 0.08}s` }}>
              <div className="tilt relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#0a6cbe]/40 transition">
                <div className="glare" />
                <span className="text-2xl font-black text-[#0a6cbe]">{m.year}</span>
                <h4 className="mt-2 text-base font-extrabold text-[#12304b]">{m.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location CTA */}
      <section className="mx-auto max-w-6xl px-5 mt-20 text-center">
        <div className="reveal3d rounded-3xl bg-[#f4f8fc] border border-slate-200 p-10">
          <h3 className="text-2xl font-bold text-[#12304b]">Visit Asha Jyothi Diagnostic Centre</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            {centreInfo.address}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/packages"
              className="rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:shadow-md"
            >
              Explore 25% Off Packages
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Contact & Map Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
