'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCmsContent } from '@/hooks/useCmsContent';

export default function PackagesPage() {
  const { content } = useCmsContent();
  const [searchQuery, setSearchQuery] = useState('');

  const packagesList = content?.packages || [];
  const whatsappNum = content?.whatsappNumber || '919440009788';
  const discountPct = content?.discountPercentage || 25;

  const filteredPackages = packagesList.filter((pkg: any) =>
    (pkg.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (pkg.tagline || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (pkg.tests || []).some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-black text-emerald-800 mb-3 shadow-sm">
              🏷️ FLAT {discountPct}% DISCOUNT ON ALL HEALTH PROFILES
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              Preventive <span className="grad-text">Health Packages</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              {content?.discountBannerText || 'Comprehensive, doctor-designed health packages in Toopran with high-precision pathology and same-day reports.'}
            </p>
          </div>
        </div>
      </section>

      {/* Search Input */}
      <div className="mx-auto max-w-xl px-5 mt-10">
        <input
          type="text"
          placeholder="Search packages or tests (e.g. Master, Cardiac, Diabetic, Vitamin)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border border-slate-300 bg-white px-6 py-3.5 text-xs text-slate-800 placeholder-slate-400 shadow-sm focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
        />
      </div>

      {/* Packages Grid */}
      <section className="mx-auto max-w-6xl px-5 mt-10">
        <div className="persp grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg: any, idx: number) => (
            <div key={pkg.id || idx} className="reveal3d" style={{ transitionDelay: `${idx * 0.05}s` }}>
              <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)] hover:border-[#0a6cbe]/50 hover:shadow-xl transition">
                <div className="glare" />

                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                    {pkg.badge || `${discountPct}% DISCOUNT`}
                  </span>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {pkg.testsCount || pkg.tests?.length || 0} Tests
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black text-[#12304b]">
                  {pkg.name}
                </h3>
                <p className="mt-1.5 text-xs font-medium text-slate-500">
                  {pkg.tagline}
                </p>

                {/* Pricing Details */}
                <div className="mt-5 rounded-2xl bg-[#f4f8fc] p-4 border border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0a6cbe]">
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

                {/* Test Breakdown */}
                <div className="mt-5 flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Complete Tests Breakdown:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {(pkg.tests || []).map((test: string, tIdx: number) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="text-[#0a6cbe] font-bold shrink-0">✓</span>
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking CTAs */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <Link
                    href={`/book?package=${pkg.id}&type=home_collection`}
                    className="flex-1 rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-3 text-center text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105"
                  >
                    Book Home Collection
                  </Link>
                  <a
                    href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi Asha Jyothi Diagnostics, I would like to book the ${pkg.name} (Offer Price: ₹${pkg.price}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#25D366] p-3 text-white hover:bg-[#1fbd5a] transition"
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
      </section>
    </div>
  );
}
