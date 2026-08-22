'use client';

import React from 'react';
import Link from 'next/link';
import { useCmsContent } from '@/hooks/useCmsContent';

export default function DoctorsPage() {
  const { content } = useCmsContent();
  const consultantsList = content?.consultants || [];
  const whatsappNum = content?.whatsappNumber || '919440009788';
  const primaryPhone = content?.phones?.[0] || '94400 09788';

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-4 py-1 text-xs font-black text-[#0a6cbe] mb-3 shadow-sm">
              🩺 MEDICAL SPECIALISTS & CONSULTANTS PANEL
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              Specialists You Can <span className="grad-text">Trust</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Experienced consultant specialists and senior pathologists reading your scans and blood investigations with clinical precision in Toopran.
            </p>
          </div>
        </div>
      </section>

      {/* Consultants Grid */}
      <section className="mx-auto max-w-6xl px-5 mt-14">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#12304b]">Visiting Consultant Doctors Panel</h2>
          <p className="text-xs text-slate-500 mt-1">Available for clinical consultations, scan reviews, and diagnostic opinions at Asha Jyothi Centre, Toopran.</p>
        </div>

        <div className="persp grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {consultantsList.map((doc: any, idx: number) => (
            <div key={doc.id || idx} className="reveal3d" style={{ transitionDelay: `${idx * 0.06}s` }}>
              <div className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_-28px_rgba(18,48,75,0.25)] hover:border-[#0a6cbe]/40 hover:shadow-lg transition">
                <div className="glare" />

                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a6cbe]/15 to-[#0ea5e9]/15 text-2xl font-bold text-[#0a6cbe] shrink-0">
                    🩺
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-[#12304b]">{doc.name}</h3>
                    <p className="text-xs font-bold text-[#0a6cbe]">{doc.specialty}</p>
                    {doc.qualification && (
                      <p className="text-[11px] font-medium text-slate-400 mt-0.5">{doc.qualification}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex-1 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                  {doc.experience && (
                    <p className="flex items-center gap-2">
                      <span className="text-[#0a6cbe] font-bold">★</span>
                      <span>{doc.experience}</span>
                    </p>
                  )}
                  {doc.timing && (
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">🕒</span>
                      <span><strong>Timing:</strong> {doc.timing}</span>
                    </p>
                  )}
                  {doc.availableDays && (
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">📅</span>
                      <span><strong>Days:</strong> {doc.availableDays}</span>
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <Link
                    href={`/book?service=${encodeURIComponent(`Consultation - ${doc.specialty}`)}`}
                    className="flex-1 rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-2.5 text-center text-xs font-bold text-white shadow-sm hover:scale-105 transition"
                  >
                    Book Consultation
                  </Link>
                  <a
                    href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi, I would like to book an appointment with ${doc.name} (${doc.specialty}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#25D366] p-2.5 text-white hover:bg-[#1fbd5a] transition"
                    title="Enquire on WhatsApp"
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
