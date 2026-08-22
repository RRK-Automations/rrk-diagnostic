'use client';

import React from 'react';
import Link from 'next/link';
import { useCmsContent } from '@/hooks/useCmsContent';

export default function Footer() {
  const { content } = useCmsContent();
  const currentYear = new Date().getFullYear();

  const directorName = content?.directorName || 'P. Mallesh Goud';
  const directorDesig = content?.directorDesignation || 'Director';
  const years = content?.yearsOfExcellence || 33;
  const estd = content?.establishedYear || 1992;
  const address = content?.address || 'Behind Surya Medical & General Stores, Main Road, TOOPRAN - 502 334, Medak District, Telangana';
  const phones = content?.phones || ['94400 09788', '94402 82688'];
  const landlines = content?.landlines || ['08454-235537', '08454-235538'];
  const email = content?.email || 'ashajyothidiagnostic@gmail.com';
  const hours = content?.operatingHours || '7:00 AM – 9:00 PM (All 7 Days)';
  const emergency = content?.emergencySupport || '24/7 Emergency Support';
  const discountPct = content?.discountPercentage || 25;

  return (
    <footer className="border-t border-slate-200 bg-[#f4f8fc] py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand & Excellence */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0a6cbe] to-[#0ea5e9] text-sm font-black text-white">
              AJ
            </span>
            <span className="font-extrabold text-[#12304b] text-base">
              {content?.centreName || 'Asha Jyothi Diagnostics'}
            </span>
          </Link>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#0a6cbe]/10 px-3 py-1 text-xs font-bold text-[#0a6cbe]">
            <span>★</span> {years}+ Years of Excellence (Estd. {estd})
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Trusted diagnostic care in Toopran, Medak. Under the leadership of <strong>{directorDesig} {directorName}</strong>, bringing comprehensive laboratory, ultrasound, CT scan, digital X-Ray, and cardiology under one roof.
          </p>
          <p className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-lg p-2">
            🏷️ Flat {discountPct}% Discount on all Preventive Health Packages!
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#12304b]">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
            <li>
              <Link href="/" className="transition hover:text-[#0a6cbe]">Home</Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-[#0a6cbe]">About Us</Link>
            </li>
            <li>
              <Link href="/services" className="transition hover:text-[#0a6cbe]">Diagnostic Services</Link>
            </li>
            <li>
              <Link href="/packages" className="transition hover:text-[#0a6cbe] font-semibold text-[#0a6cbe]">
                Health Packages ({discountPct}% OFF)
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="transition hover:text-[#0a6cbe]">Consultant Doctors</Link>
            </li>
            <li>
              <Link href="/reports" className="transition hover:text-[#0a6cbe]">Download Reports (PDF)</Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-[#0a6cbe]">Contact & Location</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Consultant Doctor Specialties */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#12304b]">
            Specialties Available
          </h4>
          <ul className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
            <li className="flex items-center gap-1.5">
              <span className="text-[#0a6cbe]">🩺</span> Cardiologist (2D Echo / TMT)
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#0a6cbe]">🩺</span> Radiologist & Sonologist (4D USG)
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#0a6cbe]">🩺</span> Neurologist
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#0a6cbe]">🩺</span> Pathologist (Automated Lab)
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#0a6cbe]">🩺</span> Urologist
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#0a6cbe]">🩺</span> Gastroenterologist
            </li>
          </ul>
        </div>

        {/* Column 4: Official Contact & Location */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#12304b]">
            Centre & Contact
          </h4>
          <div className="mt-4 space-y-2.5 text-xs text-slate-600">
            <p>
              📍 <strong className="text-slate-700">{address}</strong>
            </p>
            <p>
              📱 <strong>Mobile:</strong> {phones.join(' · ')}
            </p>
            <p>
              ☎️ <strong>Landline:</strong> {landlines.join(' · ')}
            </p>
            <p>
              ✉️ <strong>Email:</strong> {email}
            </p>
            <p className="rounded-lg bg-emerald-100/70 p-2 text-emerald-800 font-semibold">
              🕕 {hours}<br />
              ⚡ {emergency}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-slate-200 pt-6 px-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <p>© {currentYear} {content?.centreName || 'Asha Jyothi Diagnostic Centre'}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-slate-400 hover:text-[#0a6cbe] transition">
            Staff Portal / CMS Login
          </Link>
          <span>·</span>
          <span>{directorDesig}: {directorName}</span>
        </div>
      </div>
    </footer>
  );
}
