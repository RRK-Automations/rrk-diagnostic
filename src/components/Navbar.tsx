'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Menu, X, ShieldAlert, Phone } from 'lucide-react';
import { centreInfo } from '@/config/centreInfo';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Health Packages', href: '/packages' },
    { name: 'Book / Home Visit', href: '/book' },
    { name: 'Download Reports', href: '/reports' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`glass-nav sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'py-3 shadow-md border-slate-200/50 bg-white/95' : 'py-5 border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-teal-500 rounded-lg text-white group-hover:bg-teal-600 transition-colors">
              <Activity className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-800 tracking-tight leading-none">Asha Jyothi</span>
              <span className="text-xs font-semibold text-teal-600 tracking-wide uppercase mt-0.5">Diagnostic Centre</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-teal-600 ${isActive(link.href) ? 'text-teal-600 font-semibold' : 'text-slate-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Direct Phone Access */}
            <a
              href={`tel:${centreInfo.contact.phones[0].replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-600 border border-slate-200 bg-white/50 px-3 py-1.5 rounded-full transition-all shadow-sm"
            >
              <Phone className="h-3.5 w-3.5 text-teal-500" />
              <span>Call Centre</span>
            </a>

            {/* Admin Dashboard */}
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-teal-600 hover:bg-slate-100 p-2 rounded-full transition-all border border-transparent hover:border-slate-200"
              title="Staff Portal Login"
            >
              <ShieldAlert className="h-4 w-4 text-slate-400 hover:text-teal-500" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Quick Admin Access */}
            <Link
              href="/admin/dashboard"
              className="p-2 rounded-md text-slate-400 hover:text-teal-500"
            >
              <ShieldAlert className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold py-2 transition-colors hover:text-teal-600 ${isActive(link.href) ? 'text-teal-600 border-l-2 border-teal-500 pl-2' : 'text-slate-700'}`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-slate-100 my-2" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Need support?</span>
              <a
                href={`tel:${centreInfo.contact.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-1 text-sm font-semibold text-teal-600"
              >
                <Phone className="h-4 w-4" />
                <span>{centreInfo.contact.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
