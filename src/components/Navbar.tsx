'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { centreInfo } from '@/config/centreInfo';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Hide Navbar completely on Admin Dashboard & Login pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Packages', href: '/packages', badge: '25% OFF' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Reports', href: '/reports' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 transition-all">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand Logo - Clean, Single-Line, No Wrapping */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <span className="pulse-glow flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0a6cbe] to-[#0ea5e9] text-sm font-black text-white shadow-sm shrink-0">
            AJ
          </span>
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold tracking-tight text-[#12304b] whitespace-nowrap">
              Asha Jyothi
              <span className="ml-1.5 text-xs font-semibold text-slate-500 hidden sm:inline">
                Diagnostics
              </span>
            </span>
            <span className="hidden md:inline-flex rounded-full bg-[#0a6cbe]/10 px-2 py-0.5 text-[10px] font-bold text-[#0a6cbe] whitespace-nowrap">
              33 Yrs
            </span>
          </div>
        </Link>

        {/* Desktop Links - Elegant & Spaced */}
        <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative whitespace-nowrap transition-colors py-1 hover:text-[#0a6cbe] ${
                  isActive ? 'font-bold text-[#0a6cbe]' : 'text-slate-600'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700 whitespace-nowrap shadow-xs">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Area - Clean CTA Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105"
          >
            <span>Book a Test / Home Visit</span>
          </Link>

          <a
            href={`https://wa.me/${centreInfo.whatsapp.number}?text=${encodeURIComponent(centreInfo.whatsapp.prefilledText.enquiry)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:bg-[#1fbd5a] hover:scale-105 shrink-0"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#12304b] lg:hidden hover:bg-slate-50 transition"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur-lg px-5 py-6 lg:hidden shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#0a6cbe]/10 text-[#0a6cbe]'
                      : 'text-[#12304b] hover:bg-slate-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="mt-3 grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-2.5 text-xs font-bold text-white shadow-sm"
              >
                Book a Test
              </Link>
              <a
                href={`https://wa.me/${centreInfo.whatsapp.number}?text=${encodeURIComponent(centreInfo.whatsapp.prefilledText.enquiry)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 rounded-full bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
