'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { healthPackages } from '@/config/packages';
import { centreInfo } from '@/config/centreInfo';

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'fasting'>('all');

  const filteredPackages = healthPackages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.tests.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedFilter === 'popular') return matchesSearch && pkg.popular;
    if (selectedFilter === 'fasting') return matchesSearch && pkg.fasting.toLowerCase().includes('fasting');
    return matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-4xl px-5 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-extrabold text-emerald-800 mb-4 shadow-sm">
              🏷️ OFFICIAL PACKAGES · FLAT 25% DISCOUNT
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              Preventive Health <span className="grad-text">Checkup Packages</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg max-w-2xl mx-auto">
              10 doctor-designed diagnostic packages covering total body profiling, cardiac health, diabetes, women&apos;s wellness, and senior care in Toopran.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search tests (e.g. Vitamin D, USG, HbA1c, Liver)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-[#0a6cbe] focus:outline-none focus:ring-2 focus:ring-[#0a6cbe]/20"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  selectedFilter === 'all'
                    ? 'bg-[#0a6cbe] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All (10)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('popular')}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  selectedFilter === 'popular'
                    ? 'bg-[#0a6cbe] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Popular
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Health Packages Grid */}
      <section className="mx-auto max-w-6xl px-5 mt-14">
        <div className="persp grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg, idx) => (
            <div key={pkg.id} className="reveal3d" style={{ transitionDelay: `${idx * 0.05}s` }}>
              <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)] transition hover:border-[#0a6cbe]/50 hover:shadow-xl">
                <div className="glare" />

                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                    25% OFF
                  </span>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {pkg.testsCount} Tests
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-4 text-2xl font-black text-[#12304b]">
                  {pkg.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 font-medium">
                  {pkg.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-5 rounded-2xl bg-[#f4f8fc] p-4 border border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0a6cbe]">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-base font-semibold text-slate-400 line-through">
                      ₹{pkg.actualPrice.toLocaleString()}
                    </span>
                    <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      Save ₹{(pkg.actualPrice - pkg.price).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2.5 text-[11px] font-medium text-slate-600 flex items-center gap-1.5 border-t border-slate-200/60 pt-2">
                    <span>⚠️ Fasting:</span>
                    <span className="font-semibold text-slate-800">{pkg.fasting}</span>
                  </div>
                </div>

                {/* Tests List */}
                <div className="mt-5 flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Includes {pkg.tests.length} Key Investigations:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {pkg.tests.map((test, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="text-[#0a6cbe] font-bold">✓</span>
                        <span className="leading-tight">{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sample Type & Delivery */}
                <div className="mt-4 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-500 flex justify-between items-center">
                  <span>📦 {pkg.sampleType}</span>
                  <span className="font-semibold text-[#0a6cbe]">⚡ {pkg.reportDelivery}</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <Link
                    href={`/book?package=${pkg.id}`}
                    className="flex-1 rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-3 text-center text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105"
                  >
                    Book Home Collection
                  </Link>
                  <a
                    href={`https://wa.me/${centreInfo.whatsapp.number}?text=${encodeURIComponent(`Hi, I would like to book the ${pkg.name} (Offer Price: ₹${pkg.price}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold text-white hover:bg-[#1fbd5a] transition shadow-sm"
                    title="Book on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>WhatsApp</span>
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
