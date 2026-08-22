'use client';

import React, { useState } from 'react';
import { centreInfo } from '@/config/centreInfo';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Diagnostic Enquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to submit enquiry. Please call us directly.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-4 py-1.5 text-xs font-bold text-[#0a6cbe] mb-3">
              📍 TOOPRAN, MEDAK DISTRICT
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              Contact & <span className="grad-text">Location</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Have questions about scan pricing, fasting guidelines, or home sample collection? Our team is available 7 AM to 9 PM, every day.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-6xl px-5 mt-14">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Official Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="tilt rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)]">
              <div className="glare" />
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0a6cbe] to-[#0ea5e9] text-xs font-black text-white">
                  AJ
                </span>
                <div>
                  <h3 className="text-lg font-black text-[#12304b]">Asha Jyothi Diagnostic Centre</h3>
                  <p className="text-[11px] font-semibold text-[#0a6cbe]">33+ Years of Excellence (Estd. 1992)</p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <span className="text-base shrink-0">👤</span>
                  <div>
                    <strong className="text-slate-800">Director:</strong>
                    <p className="text-sm font-bold text-[#12304b]">P. Mallesh Goud</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base shrink-0">📍</span>
                  <div>
                    <strong className="text-slate-800">Official Address:</strong>
                    <p className="mt-0.5 leading-relaxed font-medium">
                      Behind Surya Medical & General Stores, Main Road, Toopran - 502 334, Medak Dist, Telangana.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base shrink-0">📞</span>
                  <div>
                    <strong className="text-slate-800">Mobile Hotline:</strong>
                    <p className="mt-0.5">
                      <a href="tel:+919440009788" className="font-bold text-[#0a6cbe] hover:underline">+91 94400 09788</a> /{' '}
                      <a href="tel:+919440282688" className="font-bold text-[#0a6cbe] hover:underline">+91 94402 82688</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base shrink-0">☎️</span>
                  <div>
                    <strong className="text-slate-800">Landline:</strong>
                    <p className="mt-0.5 font-semibold text-slate-700">08454-235537, 08454-235538</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base shrink-0">✉️</span>
                  <div>
                    <strong className="text-slate-800">Email:</strong>
                    <p className="mt-0.5">
                      <a href={`mailto:${centreInfo.contact.email}`} className="text-[#0a6cbe] hover:underline">
                        {centreInfo.contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base shrink-0">⏰</span>
                  <div>
                    <strong className="text-slate-800">Working Hours:</strong>
                    <p className="mt-0.5">7:00 AM – 9:00 PM (All 7 Days · 24/7 Emergency Support)</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <a
                  href={`https://wa.me/${centreInfo.whatsapp.number}?text=${encodeURIComponent(centreInfo.whatsapp.prefilledText.enquiry)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#1fbd5a] hover:shadow-md"
                >
                  <span>💬 Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="tilt rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)]">
              <div className="glare" />

              <h3 className="text-2xl font-black text-[#12304b]">
                Send an Online Diagnostic Enquiry
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Fill out your details below and our clinic reception desk will respond promptly.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                  <span className="text-3xl">🎉</span>
                  <h4 className="mt-2 text-lg font-bold text-emerald-900">Enquiry Received!</h4>
                  <p className="mt-1 text-xs text-emerald-700">
                    Thank you! Our front desk staff will contact you shortly on <strong>{formData.phone}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', service: 'General Diagnostic Enquiry', message: '' });
                    }}
                    className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {errorMsg && (
                    <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Patient / Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Service of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20 bg-white"
                      >
                        <option value="General Diagnostic Enquiry">General Diagnostic Enquiry</option>
                        <option value="25% Off Preventive Health Checkup Packages">25% Off Preventive Health Checkup Packages</option>
                        <option value="Whole Body Checkup (₹7,760)">Whole Body Checkup (₹7,760)</option>
                        <option value="Master Health Checkup (₹4,720)">Master Health Checkup (₹4,720)</option>
                        <option value="Ultrasound Scan (USG) & Doppler">Ultrasound Scan (USG) & Doppler</option>
                        <option value="CT Scan">CT Scan</option>
                        <option value="Digital X-Ray & Digital OPG">Digital X-Ray & Digital OPG</option>
                        <option value="2D Echo & ECG">2D Echo & ECG</option>
                        <option value="Home Sample Collection">Home Sample Collection in Toopran</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message / Inquiry Questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please ask about scan timings, fasting rules, or specific doctor consultations..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-3 text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-[1.01] disabled:opacity-50"
                  >
                    {loading ? 'Submitting Enquiry...' : 'Submit Diagnostic Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
