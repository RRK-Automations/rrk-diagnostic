import React from 'react';
import Link from 'next/link';
import { centreInfo } from '@/config/centreInfo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              Asha Jyothi Diagnostics
            </span>
          </Link>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#0a6cbe]/10 px-3 py-1 text-xs font-bold text-[#0a6cbe]">
            <span>★</span> 33+ Years of Excellence (Estd. 1992)
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Trusted diagnostic care in Toopran, Medak. Under the leadership of <strong>Director P. Mallesh Goud</strong>, bringing pathology, advanced ultrasound, CT scan, digital X-Ray and cardiology under one roof.
          </p>
          <p className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-lg p-2">
            🏷️ Flat 25% Discount on all Preventive Health Packages!
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
                Health Packages (25% OFF)
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
            <li>
              <Link href="/admin/dashboard" className="transition text-slate-400 hover:text-slate-600">Staff Portal</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Top Diagnostics & Specialties */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#12304b]">
            Diagnostic Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-500">
            <li><Link href="/services" className="transition hover:text-[#0a6cbe]">CT Scan & Color Doppler</Link></li>
            <li><Link href="/services" className="transition hover:text-[#0a6cbe]">4D Ultrasound (USG)</Link></li>
            <li><Link href="/services" className="transition hover:text-[#0a6cbe]">Digital X-Ray & Digital OPG</Link></li>
            <li><Link href="/services" className="transition hover:text-[#0a6cbe]">2D Echo & 12-Lead ECG</Link></li>
            <li><Link href="/services" className="transition hover:text-[#0a6cbe]">Pathology & Biochemistry</Link></li>
            <li><Link href="/services" className="transition hover:text-[#0a6cbe]">Thyroid & Hormonal Assay</Link></li>
            <li><Link href="/services" className="transition hover:text-[#0a6cbe]">Doorstep Blood Collection</Link></li>
          </ul>
          <h5 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#12304b]">
            Consultant Specialists:
          </h5>
          <p className="mt-1 text-xs text-slate-500 leading-normal">
            Cardiologist · Neurologist · Radiologist · Urologist · Gastroenterologist
          </p>
        </div>

        {/* Column 4: Contact & Reach Us */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#12304b]">
            Reach Us
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li className="leading-relaxed">
              📍 <strong>{centreInfo.address}</strong>
            </li>
            <li>
              📞 <strong>Mobile:</strong>{' '}
              <a href="tel:+919440009788" className="transition hover:text-[#0a6cbe]">+91 94400 09788</a> /{' '}
              <a href="tel:+919440282688" className="transition hover:text-[#0a6cbe]">+91 94402 82688</a>
            </li>
            <li>
              ☎️ <strong>Landline:</strong> 08454-235537, 08454-235538
            </li>
            <li>
              ✉️ <strong>Email:</strong>{' '}
              <a href={`mailto:${centreInfo.contact.email}`} className="transition hover:text-[#0a6cbe]">
                {centreInfo.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${centreInfo.whatsapp.number}?text=${encodeURIComponent(centreInfo.whatsapp.prefilledText.enquiry)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-[#25a85c] transition hover:text-[#1fbd5a] mt-1"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366] text-white">
                  ✓
                </span>
                WhatsApp: +91 94400 09788
              </a>
            </li>
            <li className="text-xs text-slate-500 pt-1">
              ⏰ <strong>Timings:</strong> 7:00 AM – 9:00 PM (All 7 Days · 24/7 Emergency Support)
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 pt-7 text-xs text-slate-400 sm:flex-row">
        <p>© {currentYear} Asha Jyothi Diagnostic Centre. All rights reserved. Estd. 1992.</p>
        <p className="flex items-center gap-3">
          <span>Director: P. Mallesh Goud</span>
          <span>·</span>
          <span>Toopran, Medak, Telangana</span>
        </p>
      </div>
    </footer>
  );
}
