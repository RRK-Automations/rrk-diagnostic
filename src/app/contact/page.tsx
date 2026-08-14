'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { centreInfo } from '@/config/centreInfo';
import { createEnquiry } from '@/services/enquiryApi';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple validation
    if (!form.name || !form.phone || !form.message) {
      setError('Please complete all required fields (Name, Phone, and Message).');
      setLoading(false);
      return;
    }

    const res = await createEnquiry(form);
    
    if (res.success) {
      setSuccess(true);
      setForm({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    } else {
      setError(res.error || 'Something went wrong. Please check your network connection.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Contact Asha Jyothi Diagnostics
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Have general questions about diagnostic preparations, lab results, or test package options? Send us an enquiry or call directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        {/* Contact Info Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold border-b border-slate-800 pb-3 text-teal-400">Clinic Details</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Address</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {centreInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Timings</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {centreInfo.contact.workingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Phone Lines</h4>
                  <div className="text-slate-400 text-xs mt-1 flex flex-col gap-1 font-medium">
                    <a href={`tel:${centreInfo.contact.phones[0].replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                      {centreInfo.contact.phones[0]}
                    </a>
                    <a href={`tel:${centreInfo.contact.phones[1].replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                      {centreInfo.contact.phones[1]}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Email Address</h4>
                  <a href={`mailto:${centreInfo.contact.email}`} className="text-slate-400 text-xs mt-1 block hover:text-white transition-colors">
                    {centreInfo.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={centreInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 px-4 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-lg transition-colors shadow"
              >
                Directions on Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Enquiry Form Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-lg">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">Submit a General Enquiry</h2>
              <p className="text-slate-400 text-xs mt-0.5 font-medium">Our receptionist will reply via phone call or WhatsApp.</p>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl mb-6 flex gap-2.5 items-start text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-100">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Enquiry Logged Successfully!</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                  Enquiry request received. Our team will contact you shortly to address your questions.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9440282688"
                    className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. ramesh@gmail.com"
                    className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  />
                </div>

                {/* Service */}
                <div className="space-y-1.5">
                  <label htmlFor="service" className="block text-xs font-bold text-slate-700">
                    Service of Interest <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  >
                    <option value="">Select Service...</option>
                    {centreInfo.services.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-bold text-slate-700">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="e.g. Do you require fasting for blood thyroid panels? What are the pricing rates?"
                  className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50 resize-y"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-1.5 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-lg transition-colors shadow disabled:bg-teal-350"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending enquiry...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry Request</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
