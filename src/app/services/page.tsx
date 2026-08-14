'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Tv, 
  Scan, 
  FlaskConical, 
  HeartPulse, 
  ArrowRight,
  Info,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { centreInfo } from '@/config/centreInfo';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ServicesPage() {
  const serviceIcons: { [key: string]: any } = {
    Activity: Activity,
    Tv: Tv,
    Scan: Scan,
    FlaskConical: FlaskConical,
    HeartPulse: HeartPulse
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
          Diagnostic Offerings
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Our Diagnostic Services & Scans
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Asha Jyothi Diagnostic Centre utilizes digital imaging and clinical pathology analyzers. Review our available services and prep guidelines below.
        </p>
      </div>

      {/* MRI Disclaimer Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 max-w-4xl mx-auto">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm text-slate-800">Scan Availability Announcement</h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Please note that **MRI (Magnetic Resonance Imaging) scans are not offered** at our Toopran facility. We provide all other major scans, including high-resolution Ultrasound (USG), digital X-Ray, Computed Tomography (CT), and clinical laboratory blood analyses. If you have an MRI prescription, please contact us for referral recommendations.
          </p>
        </div>
      </div>

      {/* Services Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {centreInfo.services.map((service) => {
          const Icon = serviceIcons[service.iconName] || Activity;
          return (
            <div 
              key={service.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-xl group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 py-1 px-2 rounded-md">
                    Toopran Clinic
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">{service.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{service.description}</p>
                
                {/* Fasting & Preparation info box */}
                {service.preparation && (
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex gap-2">
                    <Info className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-500 leading-normal">
                      {service.preparation}
                    </p>
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Price:</span>
                  <span className="text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                    Contact centre for current pricing
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href={{ pathname: '/book', query: { service: service.name } }}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-lg text-center shadow transition-colors"
                  >
                    Book Scan
                  </Link>
                  <WhatsAppButton 
                    message={centreInfo.whatsapp.prefilledText.appointment(service.name)}
                    variant="button"
                    label="WhatsApp Us"
                    className="!shadow-none"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Info Section */}
      <div className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-teal-500" />
            <span>Why Book Scan with Us?</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-500 leading-relaxed font-medium">
            <li className="flex items-start gap-1.5">
              <span className="text-teal-500">•</span>
              <span>Direct access to digital reports online or physical copies at Toopran.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-teal-500">•</span>
              <span>Fully certified radiologists and laboratory technicians.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-teal-500">•</span>
              <span>Rate-limiting and session cookies secure patient diagnostic requests.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-50 border border-slate-150 p-6 rounded-xl space-y-4 text-center">
          <h4 className="font-bold text-slate-800 text-sm">Need a Custom Laboratory Package?</h4>
          <p className="text-slate-500 text-xs leading-relaxed">
            We provide full body screenings, diabetes management tracking packages, and thyroid profiles. Chat with our staff to request details.
          </p>
          <WhatsAppButton 
            message="Hello Asha Jyothi, I would like to request details on full body laboratory profiles and health packages."
            variant="button"
            label="Enquire on WhatsApp"
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  );
}
