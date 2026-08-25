'use client';

import React from 'react';
import Link from 'next/link';
import { useCmsContent } from '@/hooks/useCmsContent';

export default function ServicesPage() {
  const { content } = useCmsContent();
  const divisionsList = content?.divisions || [];
  const whatsappNum = content?.whatsappNumber || '919440009788';

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0a6cbe]">Our Diagnostic Divisions</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              Comprehensive <span className="grad-text">Diagnostic Services</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Eight specialized diagnostic divisions under one roof in Toopran — from advanced pathology and 4D ultrasound to digital X-ray, digital OPG, and cardiology.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid with Photos */}
      <section className="mx-auto max-w-6xl px-5 mt-14">
        <div className="persp grid gap-8 md:grid-cols-2">
          {divisionsList.map((service: any, idx: number) => (
            <div key={service.id || idx} className="reveal3d" style={{ transitionDelay: `${idx * 0.10}s` }}>
              <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)] hover:border-[#0a6cbe]/50 transition">
                <div className="glare" />

                {/* Photo Aspect Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="zoom-img h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b3a5e]/80 via-transparent to-transparent pointer-events-none" />
                  <span className="depth absolute left-4 top-4 rounded-full border border-white/20 bg-white/95 px-3 py-1 text-xs font-bold text-[#0a6cbe] shadow-sm backdrop-blur">
                    Division {service.id}
                  </span>
                  <span className="depth absolute right-4 bottom-4 rounded-full bg-emerald-500/90 text-white px-3 py-1 text-xs font-bold backdrop-blur">
                    {service.timing}
                  </span>
                </div>

                <div className="depth flex flex-1 flex-col p-6">
                  {/* Title & Category */}
                  <div className="text-xs font-bold text-[#0a6cbe] uppercase tracking-wide">
                    {service.category}
                  </div>
                  <h3 className="mt-1 text-2xl font-black text-[#12304b]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  {/* Tags Included */}
                  {service.tags && service.tags.length > 0 && (
                    <div className="mt-5">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Key Investigations:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.tags.map((item: string, tIdx: number) => (
                          <span key={tIdx} className="rounded-md border border-slate-200 bg-[#f4f8fc] px-2.5 py-1 text-xs font-medium text-[#12304b]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <Link
                      href={`/book?service=${encodeURIComponent(service.title)}&type=home_collection`}
                      className="flex-1 rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-3 text-center text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105"
                    >
                      Book Diagnostic Test
                    </Link>
                    <a
                      href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi Asha Jyothi, I would like to enquire about ${service.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold text-white hover:bg-[#1fbd5a] transition"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
