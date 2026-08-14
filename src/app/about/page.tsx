import React from 'react';
import { Activity, Clock, ShieldCheck, HeartPulse } from 'lucide-react';
import { centreInfo } from '@/config/centreInfo';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
          About the Centre
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Asha Jyothi Diagnostic Centre
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Providing digital diagnostics, radiology scans, and clinical biochemistry analyses in Toopran, Medak District, Telangana.
        </p>
      </div>

      {/* Main Copy Intro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Accurate Diagnostic Testing For Our Community
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Asha Jyothi Diagnostic Centre, located in Keshav Nagar Colony, Toopran, is equipped to support local clinical diagnostic requests. We serve patients across Toopran, Medak, and neighbouring villages who require reliable radiology and clinical pathology testing.
          </p>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            We understand that diagnostic test reports are the foundation of medical decision-making. Therefore, we emphasize standard calibration on our digital scans and automated biochemistry lab analyzers. Our center acts as a direct affiliate for Telangana Diagnostics, ensuring access to quality health panels.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-xl" />
          <h3 className="font-bold text-base border-b border-slate-800 pb-3 text-teal-400">Our Services at Toopran</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-extrabold text-white">Digital</p>
              <p className="text-slate-400 text-[11px] mt-1">X-Ray & Scan Grids</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">Full Lab</p>
              <p className="text-slate-400 text-[11px] mt-1">Biochemistry Panels</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">Toopran</p>
              <p className="text-slate-400 text-[11px] mt-1">Keshav Nagar Colony</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">No MRI</p>
              <p className="text-slate-400 text-[11px] mt-1">Scan Exclusions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values grid */}
      <div className="border-t border-slate-200 pt-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-lg shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-800">Quality Calibration</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Standard controls are processed on our laboratory biochemistry modules for accurate report generation.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-800">Efficient Operations</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Walk-in reports for digital X-Ray and routine pathology tests are ready for collection within standard timelines.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg shrink-0">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-800">Patient Comfort</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Our staff provides supportive pre-test instructions (such as fasting or hydration limits) prior to scans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
