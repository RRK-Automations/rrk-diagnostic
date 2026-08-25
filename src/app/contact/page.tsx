'use client';

import React, { useState } from 'react';
import { useCmsContent } from '@/hooks/useCmsContent';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  UserCheck
} from 'lucide-react';

export default function ContactPage() {
  const { content } = useCmsContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const directorName = content?.directorName || 'P. Mallesh Goud';
  const directorDesig = content?.directorDesignation || 'Director';
  const address = content?.address || 'Behind Surya Medical & General Stores, Main Road, TOOPRAN - 502 334, Medak District, Telangana';
  const phones = content?.phones || ['94400 09788', '94402 82688'];
  const landlines = content?.landlines || ['08454-235537', '08454-235538'];
  const email = content?.email || 'ashajyothidiagnostic@gmail.com';
  const hours = content?.operatingHours || '7:00 AM – 9:00 PM (All 7 Days)';
  const emergency = content?.emergencySupport || '24/7 Emergency Support';
  const whatsappNum = content?.whatsappNumber || '919440009788';
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Asha+Jyothi+Diagnostic+Centre+Toopran+Telangana';

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
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-4 py-1.5 text-xs font-bold text-[#0a6cbe] mb-3 shadow-sm">
              📍 TOOPRAN, MEDAK DISTRICT · ESTD. 1992
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              Contact & <span className="grad-text">Location</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Visit our centre in Toopran or schedule a doorstep home sample collection. Open 7 days a week from 7 AM to 9 PM.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-6xl px-5 mt-12">
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* Left Column: Official Location & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-slate-900 text-slate-300 rounded-3xl p-7 shadow-xl border border-slate-800 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-[#0a6cbe]/20 text-sky-400 text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                  Official Diagnostic Centre
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {content?.centreName || 'Asha Jyothi Diagnostic Centre'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  33+ Years of Diagnostic Excellence · Estd. 1992
                </p>
              </div>

              <div className="space-y-4 text-xs border-t border-slate-800 pt-5">
                {/* Director */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-800 rounded-xl text-sky-400 shrink-0">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{directorDesig}</h4>
                    <p className="text-sky-300 font-bold text-sm mt-0.5">{directorName}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-800 rounded-xl text-sky-400 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Centre Location & Address</h4>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>

                {/* Mobile Hotlines */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-800 rounded-xl text-emerald-400 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Direct Mobile Hotline</h4>
                    <p className="text-slate-300 mt-0.5 space-x-2">
                      {phones.map((phone: string, idx: number) => (
                        <span key={idx}>
                          <a href={`tel:+91${phone.replace(/\s+/g, '')}`} className="font-bold text-emerald-400 hover:underline">
                            +91 {phone}
                          </a>
                          {idx < phones.length - 1 && ' · '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Landline */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-800 rounded-xl text-sky-400 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Official Landlines</h4>
                    <p className="text-slate-300 mt-0.5 font-semibold">
                      {landlines.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-800 rounded-xl text-sky-400 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Email Address</h4>
                    <a href={`mailto:${email}`} className="text-sky-400 hover:underline mt-0.5 block">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-800 rounded-xl text-amber-400 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Working Hours</h4>
                    <p className="text-slate-300 mt-0.5">{hours}</p>
                    <p className="text-emerald-400 font-bold text-[11px] mt-0.5">⚡ {emergency}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] hover:from-[#095ca1] hover:to-[#0284c7] text-white font-bold text-xs rounded-2xl transition shadow-md hover:scale-[1.02]"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Directions on Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(content?.whatsappPrefilledMessage || 'Hi Asha Jyothi Diagnostics, I would like to enquire about diagnostic scan pricing.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#1fbd5a] text-white font-bold text-xs rounded-2xl transition shadow-md"
                >
                  <span>💬 Message on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
                <iframe
                  title="Asha Jyothi Diagnostic Centre Location Map"
                  src="https://maps.google.com/maps?q=Asha+Jyothi+Diagnostic+Centre+Toopran+Telangana&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="p-3 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                <span>📍 Behind Surya Medical & General Stores, Main Road, Toopran</span>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-[#0a6cbe] font-bold hover:underline">
                  View Full Map →
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
                <div className="p-3 bg-[#0a6cbe]/10 text-[#0a6cbe] rounded-2xl">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Submit an Online Enquiry</h2>
                  <p className="text-slate-500 text-xs mt-0.5">Our front-desk team will contact you on your phone or WhatsApp shortly.</p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl mb-6 flex gap-2.5 items-start text-xs font-semibold">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-100 shadow-sm">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Enquiry Logged Successfully!</h3>
                    <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                      Thank you, {formData.name}. We have received your query regarding <strong>{formData.service || 'Diagnostic Services'}</strong>. Our staff will call you back at <strong>{formData.phone}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
                    }}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full text-xs py-3 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20 bg-slate-50/50"
                      />
                    </div>

                    {/* Contact Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 94400 09788"
                        className="w-full text-xs py-3 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Address */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ramesh@gmail.com"
                        className="w-full text-xs py-3 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20 bg-slate-50/50"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold text-slate-700 mb-1">
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full text-xs py-3 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20 bg-white"
                      >
                        <option value="General Diagnostic Enquiry">General Diagnostic Enquiry</option>
                        <option value="Health Package Booking (25% OFF)">Health Package Booking (25% OFF)</option>
                        <option value="Doorstep Home Sample Collection">Doorstep Home Sample Collection</option>
                        <option value="4D Ultrasound / Color Doppler Scan">4D Ultrasound / Color Doppler Scan</option>
                        <option value="Digital X-Ray / Digital OPG">Digital X-Ray / Digital OPG</option>
                        <option value="Cardiology (2D Echo / ECG / TMT)">Cardiology (2D Echo / ECG / TMT)</option>
                        <option value="Consultant Doctor Appointment">Consultant Doctor Appointment</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message or Questions <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Do you require fasting for lipid blood panels? What are the reporting timings?"
                      className="w-full text-xs py-3 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20 bg-slate-50/50 resize-y"
                    />
                  </div>

                  {/* Submit Action */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] hover:from-[#095ca1] hover:to-[#0284c7] text-white font-bold text-xs rounded-2xl transition shadow-md hover:scale-[1.01] disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Diagnostic Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
