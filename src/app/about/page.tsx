'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  FlaskConical, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Upload, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Activity, 
  Layers, 
  PhoneCall, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { useCmsContent } from '@/hooks/useCmsContent';

export default function AboutPage() {
  const { content } = useCmsContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = content?.galleryImages || [];

  const categories = [
    'All',
    'Pathology Lab',
    '4D Ultrasound',
    'Digital X-Ray',
    'Cardiology',
    'Centre Facility'
  ];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter((img: any) => img.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  const milestones = [
    {
      year: '1992',
      title: 'Foundation by P. Mallesh Goud',
      description: 'Asha Jyothi Diagnostic Centre was established in Toopran with a clear vision: bringing dependable, affordable pathology testing to the local community.'
    },
    {
      year: '2005',
      title: 'Ultrasonography & Imaging Wing',
      description: 'Expanded into non-invasive diagnostic imaging, introducing advanced high-resolution Ultrasound and color Doppler technology.'
    },
    {
      year: '2015',
      title: 'Digital X-Ray Radiography',
      description: 'Upgraded to high-frequency low-radiation digital radiography for all anatomical examinations.'
    },
    {
      year: '2020+',
      title: 'CT Scan & 2D Echo Cardiology',
      description: 'Integrated cross-sectional CT scanning, cardiac 2D Echocardiography, and fully automated biochemistry analyzers with same-day digital reporting.'
    }
  ];

  const qualityStandards = [
    {
      title: 'Calibrated Analyzers',
      desc: 'Daily multi-level control runs on fully automated biochemistry and hematology analyzers.'
    },
    {
      title: `${content?.discountPercentage || 25}% Discounted Packages`,
      desc: `Providing flat ${content?.discountPercentage || 25}% discount on all preventive packages to make healthcare accessible.`
    },
    {
      title: 'Same-Day Digital Delivery',
      desc: 'Routine blood and scan reports published same-day for immediate doctor consultation.'
    },
    {
      title: 'Doorstep Phlebotomy',
      desc: 'Trained sample collectors providing gentle, hygienic home collection across Toopran.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f4f8fc] py-16 border-b border-slate-200">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[130px] pointer-events-none" />

        <div className="persp relative mx-auto max-w-3xl px-5 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-4 py-1.5 text-xs font-bold text-[#0a6cbe] mb-3">
              ESTABLISHED IN {content?.establishedYear || 1992} · {content?.yearsOfExcellence || 33}+ YEARS OF TRUST
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#12304b] sm:text-6xl">
              About <span className="grad-text">{content?.centreName || 'Asha Jyothi Diagnostics'}</span>
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Three decades of clinical precision, compassionate patient care, and continuous technological advancement in Toopran, Medak.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Story */}
      <section className="mx-auto max-w-6xl px-5 mt-16">
        <div className="mx-auto grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal3d">
            <div className="tilt relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0b3a5e] to-[#12304b] p-8 text-white shadow-xl">
              <div className="glare" />
              <span className="inline-block rounded-full bg-[#0a6cbe] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-4">
                Founder & Director
              </span>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {content?.directorName || 'P. Mallesh Goud'}
              </h3>
              <p className="mt-1 text-xs font-semibold text-sky-200">
                {content?.directorDesignation || 'Director'} · {content?.centreName || 'Asha Jyothi Diagnostic Centre, Toopran'}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-slate-200">
                “Over {content?.yearsOfExcellence || 33} years ago, we began Asha Jyothi with a single commitment: no patient in Toopran should have to travel long distances or wait days for accurate diagnostic answers. Today, with full lab automation, CT scans, digital X-Ray, and 24/7 emergency readiness, we remain dedicated to every family we serve.”
              </p>
              <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap gap-4 text-xs text-sky-100">
                <span>📞 Cell: {(content?.phones?.length ? content.phones : ['94400 09788', '94402 82688', '93460 09788']).join(' / ')}</span>
              </div>
            </div>
          </div>

          <div className="reveal3d">
            <h2 className="text-3xl font-extrabold text-[#12304b] sm:text-4xl">
              Precision Diagnostics, <span className="grad-text">Compassionate Care</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {content?.centreName || 'Asha Jyothi Diagnostic Centre'} ({content?.address || 'Behind Surya Medical & General Stores, Main Road, Toopran'}) is Medak district&apos;s premier standalone diagnostic facility.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              From automated biochemistry, hematology, and hormonal assays to 4D ultrasound, vascular Doppler, and cardiac 2D Echocardiography, our center provides hospital-grade accuracy with the warmth of neighborhood care.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {qualityStandards.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-[#f4f8fc] p-4">
                  <h4 className="text-xs font-black text-[#0a6cbe]">{item.title}</h4>
                  <p className="mt-1 text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC FACILITY & INFRASTRUCTURE GALLERY */}
      <section id="gallery" className="mx-auto max-w-6xl px-5 mt-24">
        <div className="persp mb-10 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-4 py-1.5 text-xs font-bold text-[#0a6cbe] mb-2">
              CLINICAL INFRASTRUCTURE & LABS
            </span>
            <h2 className="text-3xl font-extrabold text-[#12304b] sm:text-4xl">
              Diagnostic Equipment & Facility Gallery
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
              Explore our fully automated clinical laboratory, high-resolution 4D Ultrasound suites, digital radiography, and patient care infrastructure in Toopran.
            </p>
          </div>
        </div>

        {/* Category Filters & Staff Upload Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? galleryImages.length 
                : galleryImages.filter((i: any) => i.category === cat).length;
              
              if (cat !== 'All' && count === 0) return null;

              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0a6cbe] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((item: any, idx: number) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-[#0a6cbe]/40 transition duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image || '/images/pathology.jpg'}
                  alt={item.title || 'Diagnostic equipment'}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e: any) => {
                    e.currentTarget.src = '/images/pathology.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-between p-4">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Maximize2 className="h-3.5 w-3.5 text-sky-300" />
                    <span>Click to view full photo</span>
                  </span>
                </div>

                <span className="absolute top-3 left-3 rounded-full bg-[#0a6cbe]/90 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                  {item.category || 'Clinical Facility'}
                </span>

                {item.featured && (
                  <span className="absolute top-3 right-3 rounded-full bg-emerald-500/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" /> Highlight
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#12304b] group-hover:text-[#0a6cbe] transition">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#0a6cbe]">
                  <span>Asha Jyothi Diagnostics</span>
                  <span className="group-hover:translate-x-1 transition">View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-[#f4f8fc] p-12 text-center text-slate-500">
            <Camera className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No images in this category yet</h4>
            <p className="text-xs text-slate-500 mt-1">Please check back soon for updated clinical facility photos.</p>
          </div>
        )}
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#0a6cbe] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
                  {filteredImages[lightboxIndex].category || 'Diagnostics'}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Photo {lightboxIndex + 1} of {filteredImages.length}
                </span>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main High-Res Image Display */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] max-h-[65vh] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filteredImages[lightboxIndex].image}
                alt={filteredImages[lightboxIndex].title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />

              {/* Prev Button */}
              {filteredImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
                  }}
                  className="absolute left-4 p-3 rounded-full bg-black/60 text-white hover:bg-[#0a6cbe] transition shadow-lg backdrop-blur-sm"
                  title="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Next Button */}
              {filteredImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
                  }}
                  className="absolute right-4 p-3 rounded-full bg-black/60 text-white hover:bg-[#0a6cbe] transition shadow-lg backdrop-blur-sm"
                  title="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Description */}
            <div className="p-6 bg-slate-900 border-t border-white/10 text-white">
              <h3 className="text-lg font-bold text-white">
                {filteredImages[lightboxIndex].title}
              </h3>
              {filteredImages[lightboxIndex].description && (
                <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {filteredImages[lightboxIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 33-Year Journey Milestones */}
      <section className="mx-auto max-w-6xl px-5 mt-24">
        <div className="persp mb-12 text-center">
          <div className="reveal3d">
            <span className="inline-block rounded-full bg-[#0a6cbe]/10 px-3 py-1 text-xs font-bold text-[#0a6cbe] mb-2">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl font-extrabold text-[#12304b] sm:text-4xl">
              {content?.yearsOfExcellence || 33}+ Years of Community Trust
            </h2>
          </div>
        </div>

        <div className="persp grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, idx) => (
            <div key={m.year} className="reveal3d" style={{ transitionDelay: `${idx * 0.08}s` }}>
              <div className="tilt relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#0a6cbe]/40 transition">
                <div className="glare" />
                <span className="text-2xl font-black text-[#0a6cbe]">{m.year}</span>
                <h4 className="mt-2 text-base font-extrabold text-[#12304b]">{m.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location CTA */}
      <section className="mx-auto max-w-6xl px-5 mt-20 text-center">
        <div className="reveal3d rounded-3xl bg-[#f4f8fc] border border-slate-200 p-10">
          <h3 className="text-2xl font-bold text-[#12304b]">Visit {content?.centreName || 'Asha Jyothi Diagnostic Centre'}</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            {content?.address || 'Behind Surya Medical & General Stores, Main Road, TOOPRAN - 502 334, Medak District, Telangana'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/packages"
              className="rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:shadow-md"
            >
              Explore {content?.discountPercentage || 25}% Off Packages
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Contact & Map Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
