'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCmsContent } from '@/hooks/useCmsContent';
import { createAppointment } from '@/services/appointmentApi';

export default function HomePage() {
  const { content } = useCmsContent();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Pathology' | 'Radiology & Imaging' | 'Cardiology'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fast Home Sample Collection Form State
  const [homeBooking, setHomeBooking] = useState({
    patientName: '',
    phone: '',
    service: 'Whole Body Checkup (₹7,760)',
    preferredDate: '',
    preferredTime: '07:00 AM - 08:00 AM (Early Fasting)',
    address: '',
    bookingType: 'home_collection' as const
  });
  const [homeLoading, setHomeLoading] = useState(false);
  const [homeSuccess, setHomeSuccess] = useState(false);
  const [homeError, setHomeError] = useState('');

  const handleHomeBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHomeLoading(true);
    setHomeError('');

    try {
      await createAppointment({
        patientName: homeBooking.patientName,
        phone: homeBooking.phone,
        service: homeBooking.service,
        preferredDate: homeBooking.preferredDate,
        preferredTime: homeBooking.preferredTime,
        address: homeBooking.address,
        bookingType: 'home_collection'
      });
      setHomeSuccess(true);
    } catch (err: any) {
      setHomeError(err.message || 'Failed to submit booking. Please call directly.');
    } finally {
      setHomeLoading(false);
    }
  };

  const marqueeItems = [
    'Complete Blood Picture (CBP)',
    'Thyroid Profile (T3, T4, TSH)',
    '4D Ultrasound & Color Doppler',
    'CT Scan & Digital Radiography',
    'Digital X-Ray & Digital OPG',
    '2D Echo & 12-Lead ECG',
    'TMT Treadmill Stress Test',
    'HbA1c & Fasting Glucose',
    'Lipid & Cholesterol Profile',
    'Liver (LFT) & Kidney (KFT) Function',
    'Urine Routine & Automated Culture',
    'Malaria & Dengue Fever Panels',
    'Vitamin D (25-OH) & Vitamin B12',
    'Hormonal Assays & Serology'
  ];

  const packagesList = content?.packages || [];
  const divisionsList = content?.divisions || [];
  const servicesList = content?.services || [];
  const consultantsList = content?.consultants || [];

  const filteredServices = servicesList.filter((s: any) => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch =
      (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const primaryPhone = content?.phones?.[0] || '94400 09788';
  const whatsappNum = content?.whatsappNumber || '919440009788';
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Asha+Jyothi+Diagnostic+Centre+Toopran+Telangana';

  return (
    <div className="overflow-hidden bg-white">
      {/* 1. HERO SECTION WITH CLEAR VIDEO BACKGROUND & CMS DYNAMIC CONTENT */}
      <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-50 pt-24 pb-16 text-white">
        {/* Crisp Background Video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={content?.heroPosterUrl || '/images/hero-poster.jpg'}
            className="h-full w-full object-cover scale-100 opacity-200"
          >
            <source src={content?.heroVideoUrl || '/videos/hero.mp4'} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,25,47,0.7)_100%)]" />
        </div>

        <div className="persp relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Content Column */}
            <div className="rise lg:col-span-7 flex flex-col items-start">
              {/* 33-Year Pill Badge */}
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-sky-400/40 bg-sky-950/60 px-4 py-1.5 text-xs font-bold text-sky-300 shadow-sm backdrop-blur">
                <span className="flex h-2.5 w-2.5 rounded-full bg-sky-400 animate-ping" />
                <span>★ {content?.yearsOfExcellence || 33}+ Years of Diagnostic Excellence · Estd. {content?.establishedYear || 1992} · Toopran</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {content?.heroHeadline ? (
                  content.heroHeadline
                ) : (
                  <>
                    Precision <span className="grad-text">Diagnostics.</span><br />
                    Compassionate Care.
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="mt-5 text-base font-medium leading-relaxed text-slate-200 sm:text-lg max-w-2xl">
                {content?.heroSubheading || `Under the leadership of Director ${content?.directorName || 'P. Mallesh Goud'}, Asha Jyothi brings comprehensive pathology, 4D ultrasound, CT scan, digital X-Ray & OPG, and 2D Echo under one roof in Toopran with same-day reports and 24/7 emergency support.`}
              </p>

              {/* 25% Discount Banner */}
              <div className="mt-5 inline-flex items-center gap-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-400/40 p-3.5 text-xs font-bold text-emerald-200 shadow-sm backdrop-blur">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-black text-xs shrink-0">
                  %
                </span>
                <span>{content?.discountBannerText || 'Special Promotion: Flat 25% Discount on all 10 Official Health Checkup Packages!'}</span>
              </div>

              {/* CTA Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#home-collection"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(10,108,190,0.7)] transition hover:shadow-[0_16px_44px_-10px_rgba(10,108,190,0.85)] hover:scale-105"
                >
                  <span>🏠 Book Home Sample Visit</span>
                  <span className="transition-transform group-hover:translate-x-1">↓</span>
                </a>
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/40 px-6 py-3.5 text-sm font-bold text-sky-200 shadow-sm backdrop-blur transition hover:bg-sky-900/60 hover:border-sky-300"
                >
                  <span>🏷️ View Packages ({content?.discountPercentage || 25}% Off)</span>
                </Link>
                <Link
                  href="/reports"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition shadow-sm backdrop-blur"
                >
                  <span>📄 Download Reports</span>
                </Link>
              </div>

              {/* Trust Micro-Badges */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Same-Day Digital Reports
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Walk-ins {content?.operatingHours || '7 AM – 9 PM'} ({content?.emergencySupport || '24/7 Emergency'})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Doorstep Phlebotomy in Toopran
                </span>
              </div>
            </div>

            {/* Right Visual Column with Laboratory Video Frame & Floaty Badges */}
            <div className="rise lg:col-span-5 relative">
              <div className="tilt relative overflow-hidden rounded-3xl border border-white/20 bg-slate-900/80 p-2 shadow-2xl backdrop-blur">
                <div className="glare" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-950">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/pathology.jpg"
                    className="h-full w-full object-cover zoom-img"
                  >
                    <source src={content?.labVideoUrl || '/videos/lab.mp4'} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="rounded-full bg-[#0a6cbe] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                      Automated Laboratory
                    </span>
                    <h3 className="mt-1 text-base font-extrabold text-white">
                      Hospital-Grade Diagnostic Infrastructure
                    </h3>
                    <p className="text-xs text-sky-200">
                      {content?.address || 'Behind Surya Medical & General Stores, Main Road, Toopran'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floaty Badge 1: 33+ Years */}
              <div className="floaty absolute -left-4 -top-6 rounded-2xl border border-sky-400/30 bg-slate-900/90 text-white px-4 py-3 shadow-xl backdrop-blur sm:-left-6">
                <div className="text-xl font-black text-sky-400">{content?.yearsOfExcellence || 33}+ Yrs</div>
                <div className="text-[10px] font-bold text-slate-300">Excellence Since {content?.establishedYear || 1992}</div>
              </div>

              {/* Floaty Badge 2: 24/7 Support */}
              <div className="floaty-slow absolute -bottom-5 -right-4 rounded-2xl border border-emerald-400/30 bg-slate-900/90 text-white px-4 py-3 shadow-xl backdrop-blur sm:-right-6">
                <div className="text-xl font-black text-emerald-400">24/7</div>
                <div className="text-[10px] font-bold text-slate-300">{content?.emergencySupport || 'Emergency Support'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUOUS DIAGNOSTIC MARQUEE */}
      <section aria-hidden="true" className="relative overflow-hidden border-y border-slate-200 bg-[#f4f8fc] py-3.5">
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <span key={idx} className="flex items-center gap-8 text-sm font-bold tracking-wide text-[#0a6cbe]">
              {item}
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-[#0ea5e9]/80 shrink-0" fill="currentColor">
                <path d="M6 0l1.8 4.2L12 6 7.8 7.8 6 12 4.2 7.8 0 6l4.2-1.8z" />
              </svg>
            </span>
          ))}
        </div>
      </section>

      {/* 3. 3D INTERACTIVE STATS COUNTERS */}
      <section id="stats" className="relative py-20 bg-white">
        <div className="persp mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 lg:grid-cols-4">
          <div className="reveal3d">
            <div className="tilt relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)]">
              <div className="glare" />
              <div className="depth bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] bg-clip-text text-4xl font-black text-transparent lg:text-5xl">
                <span data-count={String(content?.yearsOfExcellence || 33)} data-decimals="0">0</span>+
              </div>
              <div className="depth mt-2 text-sm font-extrabold text-[#12304b]">Years of Excellence</div>
              <div className="depth mt-1 text-xs text-slate-500">Established in {content?.establishedYear || 1992}</div>
            </div>
          </div>

          <div className="reveal3d" style={{ transitionDelay: '0.1s' }}>
            <div className="tilt relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-7 text-center shadow-[0_16px_40px_-28px_rgba(16,185,129,0.25)]">
              <div className="glare" />
              <div className="depth bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-4xl font-black text-transparent lg:text-5xl">
                <span data-count={String(content?.discountPercentage || 25)} data-decimals="0">0</span>%
              </div>
              <div className="depth mt-2 text-sm font-extrabold text-[#12304b]">Discount on Packages</div>
              <div className="depth mt-1 text-xs text-emerald-700 font-semibold">All {packagesList.length} Health Profiles</div>
            </div>
          </div>

          <div className="reveal3d" style={{ transitionDelay: '0.2s' }}>
            <div className="tilt relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)]">
              <div className="glare" />
              <div className="depth bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] bg-clip-text text-4xl font-black text-transparent lg:text-5xl">
                <span data-count="14" data-decimals="0">0</span>h
              </div>
              <div className="depth mt-2 text-sm font-extrabold text-[#12304b]">Open Every Day</div>
              <div className="depth mt-1 text-xs text-slate-500">{content?.operatingHours || '7 AM – 9 PM'}</div>
            </div>
          </div>

          <div className="reveal3d" style={{ transitionDelay: '0.3s' }}>
            <div className="tilt relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)]">
              <div className="glare" />
              <div className="depth bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] bg-clip-text text-4xl font-black text-transparent lg:text-5xl">
                <span data-count="7" data-decimals="0">0</span>
              </div>
              <div className="depth mt-2 text-sm font-extrabold text-[#12304b]">Days a Week</div>
              <div className="depth mt-1 text-xs text-slate-500">No Weekly Off in Toopran</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEDICATED HOME SAMPLE COLLECTION & FAST BOOKING SECTION */}
      <section id="home-collection" className="relative py-20 bg-gradient-to-br from-[#0b3a5e] via-[#0a6cbe] to-[#0ea5e9] text-white">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-[90px] pointer-events-none" />
        <div aria-hidden="true" className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-[90px] pointer-events-none" />

        <div className="persp relative z-10 mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Info Column */}
            <div className="reveal3d lg:col-span-6">
              <span className="inline-block rounded-full bg-white/20 backdrop-blur px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-white mb-3">
                🏠 DOORSTEP PHLEBOTOMY · TOOPRAN
              </span>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Book Doorstep Home Blood & Sample Collection
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-sky-100 sm:text-base">
                Avoid traveling on an empty stomach. Our trained, certified phlebotomists will visit your home in Toopran, collect samples safely with single-use sterile vacutainers, and deliver your verified digital report on the same day.
              </p>

              <div className="mt-6 space-y-3 text-xs text-sky-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-emerald-950 font-bold text-xs">✓</span>
                  <span>100% Sterile, Single-Use Vacuum Tubes & Needles</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-emerald-950 font-bold text-xs">✓</span>
                  <span>Temperature-Controlled Cool Box Sample Transport</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-emerald-950 font-bold text-xs">✓</span>
                  <span>Same-Day WhatsApp & PDF Report Delivery</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hi Asha Jyothi Diagnostics, I would like to book a Home Sample Collection in Toopran.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1fbd5a] transition hover:scale-105"
                >
                  <span>💬 Instant WhatsApp Booking</span>
                </a>
                <a
                  href={`tel:+91${primaryPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 transition"
                >
                  <span>📞 Call: +91 {primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Booking Form */}
            <div className="reveal3d lg:col-span-6">
              <div className="tilt rounded-3xl border border-white/25 bg-white p-7 text-[#12304b] shadow-2xl">
                <div className="glare" />
                <h3 className="text-xl font-black text-[#12304b]">
                  Fast Home Collection Schedule
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Select your package/test and enter your address for sample pickup.
                </p>

                {homeSuccess ? (
                  <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                    <span className="text-3xl">🎉</span>
                    <h4 className="mt-2 text-base font-bold text-emerald-900">Home Visit Booked!</h4>
                    <p className="mt-1 text-xs text-emerald-700">
                      Our phlebotomist team will call you on <strong>{homeBooking.phone}</strong> to confirm your slot.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setHomeSuccess(false);
                        setHomeBooking({
                          patientName: '',
                          phone: '',
                          service: 'Whole Body Checkup (₹7,760)',
                          preferredDate: '',
                          preferredTime: '07:00 AM - 08:00 AM (Early Fasting)',
                          address: '',
                          bookingType: 'home_collection'
                        });
                      }}
                      className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                    >
                      Book Another Test
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHomeBookingSubmit} className="mt-5 space-y-3.5">
                    {homeError && (
                      <div className="rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-800">
                        {homeError}
                      </div>
                    )}

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Patient Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={homeBooking.patientName}
                          onChange={(e) => setHomeBooking({ ...homeBooking, patientName: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit mobile number"
                          value={homeBooking.phone}
                          onChange={(e) => setHomeBooking({ ...homeBooking, phone: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Select Package / Test
                      </label>
                      <select
                        value={homeBooking.service}
                        onChange={(e) => setHomeBooking({ ...homeBooking, service: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20 bg-white"
                      >
                        {packagesList.map((p: any) => (
                          <option key={p.id} value={`${p.name} (₹${p.price})`}>
                            {p.name} (Offer ₹{p.price?.toLocaleString()} - {p.badge || '25% OFF'})
                          </option>
                        ))}
                        {servicesList.slice(0, 10).map((s: any) => (
                          <option key={s.id} value={`${s.name} (₹${s.price})`}>
                            {s.name} (₹{s.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={homeBooking.preferredDate}
                          onChange={(e) => setHomeBooking({ ...homeBooking, preferredDate: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Time Slot
                        </label>
                        <select
                          value={homeBooking.preferredTime}
                          onChange={(e) => setHomeBooking({ ...homeBooking, preferredTime: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20 bg-white"
                        >
                          <option value="07:00 AM - 08:00 AM (Early Fasting)">07:00 AM - 08:00 AM (Early Fasting)</option>
                          <option value="08:00 AM - 09:00 AM (Fasting Slot)">08:00 AM - 09:00 AM (Fasting Slot)</option>
                          <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                          <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                          <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                          <option value="04:00 PM - 06:00 PM (Evening)">04:00 PM - 06:00 PM (Evening)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Doorstep Address in Toopran *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House No, Colony, Street, Landmark in Toopran"
                        value={homeBooking.address}
                        onChange={(e) => setHomeBooking({ ...homeBooking, address: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={homeLoading}
                      className="w-full rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-3 text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-[1.01] disabled:opacity-50"
                    >
                      {homeLoading ? 'Confirming Home Collection...' : 'Schedule Home Sample Collection'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 10 OFFICIAL HEALTH PACKAGES SECTION WITH 25% DISCOUNT */}
      <section id="packages" className="relative py-24 bg-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="persp mx-auto mb-16 max-w-2xl text-center">
            <div className="reveal3d">
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold text-emerald-800 mb-3 shadow-sm">
                🏷️ OFFICIAL HEALTH CHECKUPS · FLAT {content?.discountPercentage || 25}% DISCOUNT
              </span>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-5xl">
                Popular Preventive <span className="grad-text">Health Packages</span>
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Doctor-designed diagnostic packages covering total body profiling, cardiac health, diabetes, women&apos;s wellness, and senior care in Toopran.
              </p>
            </div>
          </div>

          <div className="persp grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {packagesList.slice(0, 6).map((pkg: any, idx: number) => (
              <div key={pkg.id || idx} className="reveal3d" style={{ transitionDelay: `${idx * 0.06}s` }}>
                <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)] transition hover:border-[#0a6cbe]/50 hover:shadow-xl">
                  <div className="glare" />

                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                      {pkg.badge || '25% DISCOUNT'}
                    </span>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {pkg.testsCount || pkg.tests?.length || 0} Tests
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-black text-[#12304b]">
                    {pkg.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium text-slate-500 line-clamp-2">
                    {pkg.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-5 rounded-2xl bg-[#f4f8fc] p-4 border border-slate-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#0a6cbe]">
                        ₹{pkg.price?.toLocaleString()}
                      </span>
                      {pkg.actualPrice > pkg.price && (
                        <span className="text-sm font-semibold text-slate-400 line-through">
                          ₹{pkg.actualPrice?.toLocaleString()}
                        </span>
                      )}
                      {pkg.actualPrice > pkg.price && (
                        <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                          Save ₹{(pkg.actualPrice - pkg.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-[11px] font-medium text-slate-600 flex items-center gap-1">
                      <span>⚠️ Fasting:</span>
                      <span className="font-semibold text-slate-800">{pkg.fasting}</span>
                    </div>
                  </div>

                  {/* Key Tests Included */}
                  <div className="mt-5 flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Tests Included:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {(pkg.tests || []).slice(0, 4).map((test: string, tIdx: number) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <span className="text-[#0a6cbe] font-bold">✓</span>
                          <span className="line-clamp-1">{test}</span>
                        </li>
                      ))}
                      {pkg.tests && pkg.tests.length > 4 && (
                        <li className="text-[11px] font-semibold text-[#0a6cbe] pt-1">
                          + {pkg.tests.length - 4} more tests in package
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Book Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <Link
                      href={`/book?package=${pkg.id}&type=home_collection`}
                      className="flex-1 rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-2.5 text-center text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105"
                    >
                      Book Home Collection
                    </Link>
                    <a
                      href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi, I would like to book the ${pkg.name} (Offer Price: ₹${pkg.price}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[#25D366] p-2.5 text-white hover:bg-[#1fbd5a] transition"
                      title="Book on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="persp mt-12 text-center">
            <div className="reveal3d">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a6cbe]/40 bg-[#f4f8fc] px-8 py-4 text-sm font-bold text-[#0a6cbe] shadow-sm transition hover:bg-[#0a6cbe]/5 hover:border-[#0a6cbe]/70"
              >
                <span>View All {packagesList.length} Health Packages & Full Test Lists</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 8 CORE DIAGNOSTIC DIVISIONS */}
      <section id="services" className="relative py-24 bg-[#f4f8fc]">
        <div aria-hidden="true" className="absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full bg-[#0ea5e9]/10 blur-[130px] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-5">
          <div className="persp mx-auto mb-16 max-w-2xl text-center">
            <div className="reveal3d">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0a6cbe]">Diagnostic Divisions</p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-5xl">
                Comprehensive Scans & <span className="grad-text">Laboratory Divisions</span>
              </h2>
              <p className="mt-4 text-slate-500">
                Specialized clinical diagnostic divisions operating in-house with calibrated precision in Toopran.
              </p>
            </div>
          </div>

          <div className="persp grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {divisionsList.map((division: any, idx: number) => (
              <div key={division.id || idx} className="reveal3d" style={{ transitionDelay: `${idx * 0.05}s` }}>
                <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)] transition hover:border-[#0a6cbe]/40">
                  <div className="glare" />

                  {/* Division Image */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
                    <img
                      src={division.image}
                      alt={division.title}
                      className="zoom-img h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b3a5e]/80 via-transparent to-transparent pointer-events-none" />
                    <span className="depth absolute left-3 top-3 rounded-full border border-white/20 bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-[#0a6cbe] shadow-sm backdrop-blur">
                      {division.id}
                    </span>
                    <span className="depth absolute right-3 bottom-3 rounded-full bg-emerald-500/90 text-white px-2 py-0.5 text-[10px] font-bold backdrop-blur">
                      {division.timing}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="depth flex flex-1 flex-col p-5">
                    <h3 className="text-base font-extrabold text-[#12304b]">
                      {division.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">
                      {division.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(division.tags || []).map((tag: string, tIdx: number) => (
                        <span key={tIdx} className="rounded-md border border-slate-200 bg-[#f4f8fc] px-2 py-0.5 text-[10px] font-semibold text-[#0a6cbe]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="persp mt-12 text-center">
            <div className="reveal3d">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a6cbe]/35 bg-white px-7 py-3.5 text-sm font-bold text-[#0a6cbe] shadow-sm transition hover:bg-[#0a6cbe]/5"
              >
                <span>View Full Diagnostic Services Catalog</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE INDIVIDUAL LAB TEST SEARCH & QUICK BOOKING */}
      <section id="individual-tests" className="relative py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-5">
          <div className="persp mb-10 text-center">
            <div className="reveal3d">
              <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-3.5 py-1 text-xs font-bold text-[#0a6cbe] mb-2">
                INSTANT TEST SEARCH
              </span>
              <h2 className="text-3xl font-extrabold text-[#12304b] sm:text-4xl">
                Search Individual <span className="grad-text">Blood Tests & Scans</span>
              </h2>
              <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
                Looking for a specific investigation? Search by test name or filter by clinical category.
              </p>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search test name (e.g. CBP, TSH, Ultrasound, Lipid, ECG)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-xs text-slate-800 placeholder-slate-400 shadow-sm focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(['All', 'Pathology', 'Radiology & Imaging', 'Cardiology'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    activeCategory === cat
                      ? 'bg-[#0a6cbe] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Test Cards Table / Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service: any) => (
              <div
                key={service.id}
                className="tilt rounded-2xl border border-slate-200 bg-[#f4f8fc] p-5 shadow-sm hover:border-[#0a6cbe]/40 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="glare" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#0a6cbe]/10 px-2 py-0.5 text-[10px] font-bold text-[#0a6cbe]">
                      {service.category}
                    </span>
                    <span className="text-xs font-black text-[#0a6cbe]">
                      ₹{service.price}
                    </span>
                  </div>
                  <h4 className="mt-2.5 text-sm font-bold text-[#12304b]">
                    {service.name}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500 leading-normal line-clamp-2">
                    {service.description}
                  </p>
                  {service.preparation && (
                    <p className="mt-2 text-[10px] text-amber-800 bg-amber-50 rounded-lg p-1.5 font-medium">
                      ⚠️ {service.preparation}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">
                    ⚡ {service.turnaroundTime}
                  </span>
                  <Link
                    href={`/book?service=${encodeURIComponent(service.name)}&type=home_collection`}
                    className="rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-3.5 py-1 text-[11px] font-bold text-white shadow-sm hover:shadow transition"
                  >
                    Book Home Visit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONSULTANT DOCTORS SPOTLIGHT */}
      <section id="doctors" className="relative py-24 bg-[#f4f8fc]">
        <div className="mx-auto max-w-6xl px-5">
          <div className="persp mx-auto mb-16 max-w-2xl text-center">
            <div className="reveal3d">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0a6cbe]">Consultant Specialists</p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-5xl">
                Expert Specialists Reading Reports <span className="grad-text">With Care</span>
              </h2>
              <p className="mt-4 text-slate-500">
                Leading medical consultants available for specialized diagnostic evaluation and clinical reviews.
              </p>
            </div>
          </div>

          <div className="persp grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultantsList.map((doc: any, idx: number) => (
              <div key={doc.id || idx} className="reveal3d" style={{ transitionDelay: `${idx * 0.08}s` }}>
                <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition hover:border-[#0a6cbe]/40">
                  <div className="glare" />
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a6cbe]/10 text-xl font-bold text-[#0a6cbe]">
                      🩺
                    </span>
                    <div>
                      <h4 className="text-lg font-extrabold text-[#12304b]">{doc.name || doc.specialty}</h4>
                      <p className="text-xs font-semibold text-[#0a6cbe]">{doc.specialty}</p>
                      {doc.qualification && (
                        <p className="text-[10px] text-slate-400 font-medium">{doc.qualification}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-xs leading-relaxed text-slate-600 space-y-1">
                    {doc.timing && <p>🕒 <strong>Timing:</strong> {doc.timing}</p>}
                    {doc.availableDays && <p>📅 <strong>Days:</strong> {doc.availableDays}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="persp mt-12 text-center">
            <div className="reveal3d">
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a6cbe]/35 bg-white px-7 py-3.5 text-sm font-bold text-[#0a6cbe] shadow-sm transition hover:bg-[#0a6cbe]/5"
              >
                <span>Meet All Consultant Doctors</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 3D CTA BANNER WITH GOOGLE MAPS NAVIGATION */}
      <section id="contact-cta" className="relative py-20 bg-white">
        <div className="persp mx-auto max-w-6xl px-5">
          <div className="reveal3d">
            <div className="tilt relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a6cbe] via-[#0b5aa0] to-[#0ea5e9] p-10 text-center shadow-[0_30px_80px_-30px_rgba(10,108,190,0.6)] sm:p-16 text-white">
              <div className="glare" />
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-[90px] pointer-events-none" />
              <div aria-hidden="true" className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-300/25 blur-[90px] pointer-events-none" />

              <div className="depth relative z-10">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur px-4 py-1 text-xs font-bold tracking-wide text-white mb-4">
                  {content?.yearsOfExcellence || 33} Years of Trust in Toopran
                </span>
                <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                  Book your test today — reports the very same day
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sky-100 text-base">
                  Walk in any time, or let us collect your samples at home. Our care team is available from {content?.operatingHours || '7 AM to 9 PM'}, every single day.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(content?.whatsappPrefilledMessage || 'Hi Asha Jyothi, I would like to book a test.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#1fbd5a] hover:shadow-[0_12px_44px_-10px_rgba(37,211,102,0.7)] hover:scale-105"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Book on WhatsApp</span>
                  </a>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    <span>📍 Google Maps Directions</span>
                  </a>
                  <a
                    href={`tel:+91${primaryPhone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    <span>📞 +91 {primaryPhone}</span>
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-sky-100">
                  <span>📍 {content?.address}</span>
                  <span>🕕 Open {content?.operatingHours} ({content?.emergencySupport})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
