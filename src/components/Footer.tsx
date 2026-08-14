'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Phone, MapPin, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import { centreInfo } from '@/config/centreInfo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-teal-500 rounded text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">Asha Jyothi</span>
            </Link>
            <p className="text-sm text-slate-500">
              Providing reliable, professional pathology lab analyses, digital x-ray diagnostics, and high-resolution scans for the Toopran region.
            </p>
            <div className="flex gap-2">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 py-1 px-2.5 rounded border border-slate-800 bg-slate-950/30 transition-all"
              >
                <ShieldAlert className="h-3 w-3" />
                <span>Staff Dashboard Portal</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>Health Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>Book / Home Visit</span>
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>Download Reports</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Working Hours */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Operational Hours</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-medium">Monday - Saturday</p>
                  <p className="text-slate-500 text-xs mt-0.5">7:30 AM to 8:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-medium">Sunday</p>
                  <p className="text-slate-500 text-xs mt-0.5">7:30 AM to 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact details */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Clinic Location</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-medium">Keshav Nagar Colony</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                    13-21/1/A, Toopran, Medak Dist,<br />Telangana - 502334
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-teal-500 shrink-0" />
                <div className="flex flex-col text-slate-300 font-medium">
                  <a href={`tel:${centreInfo.contact.phones[0].replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                    {centreInfo.contact.phones[0]}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={centreInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-xs font-semibold py-1.5 px-3 rounded bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-sm"
                >
                  Get Google Maps Directions
                </a>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-slate-800 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-4">
          <p>&copy; {currentYear} {centreInfo.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors">Telangana Diagnostics Affiliate</span>
            <span>&bull;</span>
            <span className="text-teal-600 font-medium">Integration Platform powered by RRK Automations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
