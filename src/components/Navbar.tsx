'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { centreInfo } from '@/config/centreInfo';
import { Phone, Calendar, MessageCircle, Menu, X } from 'lucide-react';

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
    { name: 'Investigations', href: '/investigations', badge: '60+' },
    { name: 'Packages', href: '/packages', badge: '25% OFF' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Reports', href: '/reports' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 transition-all">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo - Official Asha Jyothi Diagnostic Centre Seal */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white p-0.5 shadow-xs border border-slate-200 group-hover:scale-105 transition shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Asha Jyothi Diagnostic Centre Toopran Logo"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold tracking-tight text-[#12304b] whitespace-nowrap">
              Asha Jyothi
              <span className="ml-1 text-xs font-semibold text-slate-500 hidden sm:inline">
                Diagnostics
              </span>
            </span>
            <span className="hidden xl:inline-flex rounded-full bg-[#0a6cbe]/10 px-2 py-0.5 text-[10px] font-bold text-[#0a6cbe] whitespace-nowrap">
              33 Yrs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Compact Spacing for Zero Overflow */}
        <div className="hidden items-center gap-3.5 xl:gap-5 text-xs xl:text-sm font-semibold text-slate-600 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative whitespace-nowrap transition-colors py-1.5 px-0.5 hover:text-[#0a6cbe] flex items-center gap-1 ${
                  isActive ? 'font-bold text-[#0a6cbe]' : 'text-slate-600'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-black tracking-tight whitespace-nowrap shadow-2xs ${
                    link.badge === '25% OFF' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-sky-100 text-[#0a6cbe] border border-sky-200'
                  }`}>
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

        {/* Action Area - Book Test & WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center gap-1.5 justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book a Test</span>
          </Link>

          <a
            href={`https://wa.me/${centreInfo.whatsapp.number}?text=${encodeURIComponent(centreInfo.whatsapp.prefilledText.enquiry)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:bg-[#1fbd5a] hover:scale-105 shrink-0"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
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
              <X className="h-5 w-5 text-slate-700" />
            ) : (
              <Menu className="h-5 w-5 text-slate-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur-lg px-5 py-6 lg:hidden shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#0a6cbe]/10 text-[#0a6cbe] font-bold'
                      : 'text-[#12304b] hover:bg-slate-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      link.badge === '25% OFF'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-[#0a6cbe]'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book a Test</span>
              </Link>
              <a
                href={`https://wa.me/${centreInfo.whatsapp.number}?text=${encodeURIComponent(centreInfo.whatsapp.prefilledText.enquiry)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
