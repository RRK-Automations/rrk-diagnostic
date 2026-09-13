import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, PhoneCall, Stethoscope, Search } from 'lucide-react';
import { getWhatsAppUrl } from '@/utils/whatsapp';

export default function NotFound() {
  const whatsappUrl = getWhatsAppUrl(
    '919440009788',
    'Hello Asha Jyothi Diagnostics, I landed on a missing page on your website and need assistance.'
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-100 rounded-full blur-3xl opacity-70 pointer-events-none" />
        
        <div className="w-20 h-20 bg-sky-50 border border-sky-100 text-[#0a6cbe] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Search className="w-9 h-9" />
        </div>

        <span className="inline-block px-3.5 py-1 bg-sky-100/70 text-[#0a6cbe] font-mono text-xs font-bold rounded-full mb-3">
          404 PAGE NOT FOUND
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12304b] tracking-tight">
          Looking for a Diagnostic Service?
        </h1>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          The page you are looking for does not exist or may have moved. Access our diagnostic test list, packages, or reach our Toopran desk on WhatsApp.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-3 px-5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/investigations"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <Stethoscope className="w-4 h-4 text-[#0a6cbe]" />
            <span>Browse Diagnostic Tests</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 px-5 text-sm font-bold text-white hover:bg-[#1fbd5a] transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>WhatsApp Reception Desk</span>
          </a>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Asha Jyothi Diagnostic Centre · Keshava Nagar Colony, Toopran
        </p>
      </div>
    </div>
  );
}
