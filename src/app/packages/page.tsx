'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Droplet, 
  Home, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { healthPackages } from '@/config/packages';
import { centreInfo } from '@/config/centreInfo';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function PackagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
          Preventive Health Checkups
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Comprehensive Health Packages
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Early detection is the key to longevity. Choose from our specialized pathology and imaging health packages designed for all age groups in Toopran.
        </p>
      </div>

      {/* Home Sample Collection Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-800/40">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-500 text-white rounded-xl shadow-md shrink-0">
            <Home className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Home Sample Collection Available in Toopran</span>
              <span className="text-[10px] font-extrabold bg-teal-400 text-slate-900 px-2 py-0.5 rounded-full uppercase">
                Convenient
              </span>
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed max-w-xl">
              Cannot visit the centre in person? Request our certified phlebotomist to collect your blood and urine samples at your doorstep in Keshav Nagar Colony & nearby areas.
            </p>
          </div>
        </div>
        <Link
          href="/book?type=home_collection"
          className="px-5 py-3 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold text-xs rounded-lg shadow-md transition-all shrink-0 inline-flex items-center gap-1.5"
        >
          <span>Book Home Collection</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {healthPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative ${
              pkg.popular
                ? 'border-teal-500 shadow-teal-500/5 ring-1 ring-teal-500/20'
                : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-6 bg-teal-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Most Popular Choice</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wide">
                  {pkg.testsCount} Essential Parameters
                </span>
                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mt-1">
                  {pkg.name}
                </h3>
                <p className="text-slate-400 text-xs font-medium mt-0.5">{pkg.tagline}</p>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed">{pkg.description}</p>

              {/* Fasting & Sample info pills */}
              <div className="space-y-2 text-[11px] bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span><strong>Prep:</strong> {pkg.fasting}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Droplet className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  <span><strong>Sample:</strong> {pkg.sampleType}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                  <span><strong>Reports:</strong> {pkg.reportDelivery}</span>
                </div>
              </div>

              {/* Tests Included List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 tracking-tight uppercase text-[10px]">
                  Included Tests & Diagnostics:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {pkg.tests.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-400">Package Pricing:</span>
                <span className="text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  Contact centre for pricing
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href={{ pathname: '/book', query: { package: pkg.name } }}
                  className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-lg text-center shadow transition-colors"
                >
                  Book Package
                </Link>
                <WhatsAppButton
                  message={`Hello Asha Jyothi Diagnostic Centre, I would like to enquire about pricing and slot availability for the ${pkg.name}.`}
                  variant="button"
                  label="WhatsApp Info"
                  className="!shadow-none text-center justify-center text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preparation guidelines alert */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-slate-800">
          <AlertCircle className="h-5 w-5 text-teal-500" />
          <h3 className="font-bold text-sm">General Instructions Before Your Health Package Checkup:</h3>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-teal-500 font-bold">•</span>
            <span>Do not consume food, tea, or coffee for at least 10–12 hours prior to fasting blood draws. Water is permitted.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-500 font-bold">•</span>
            <span>If your package includes Pelvic/Abdominal Ultrasound, drink 3–4 glasses of water 1 hour before the test.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-500 font-bold">•</span>
            <span>Carry previous medical prescriptions, blood reports, or diabetes medication lists with you.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-500 font-bold">•</span>
            <span>Wear comfortable, loose clothing for ECG and digital X-Ray imaging.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
