'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Activity, 
  LayoutDashboard, 
  CalendarRange, 
  MessageSquareReply, 
  FileText,
  Globe,
  LogOut, 
  ExternalLink,
  Shield, 
  Menu,
  X,
  Loader2,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login screen (/admin), render full-screen clean view
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.refresh();
        router.push('/admin');
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  const navItems = [
    { name: 'Dashboard Overview', href: '/admin/dashboard', icon: LayoutDashboard, desc: 'Live metrics & stats' },
    { name: 'Appointments Manager', href: '/admin/appointments', icon: CalendarRange, desc: 'Home visits & lab bookings' },
    { name: 'Digital Reports', href: '/admin/reports', icon: FileText, desc: 'Generate & publish lab PDFs', badge: 'Multi-Test' },
    { name: 'General Enquiries', href: '/admin/enquiries', icon: MessageSquareReply, desc: 'Patient website queries' },
    { name: 'Website CMS (Content)', href: '/admin/cms', icon: Globe, desc: 'Edit prices & text', badge: 'Live CMS' }
  ];

  const currentNav = navItems.find(item => pathname === item.href || pathname?.startsWith(item.href + '/')) || {
    name: 'Admin Console',
    desc: 'Diagnostic Centre Operations'
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-slate-100 font-sans text-slate-800 antialiased">
      
      {/* MOBILE TOP BAR */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 text-white border-b border-slate-800 z-40 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0a6cbe] to-[#0ea5e9] text-xs font-black text-white shadow-sm">
            AJ
          </span>
          <div>
            <h1 className="font-extrabold text-sm leading-tight text-white">Asha Jyothi</h1>
            <p className="text-[10px] text-sky-400 font-medium">Staff & CMS Console</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 text-slate-300 flex flex-col shadow-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a6cbe] text-xs font-black text-white">
                  AJ
                </span>
                <span className="font-bold text-white text-sm">Staff Console</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-4 space-y-1 flex-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition ${
                      active 
                        ? 'bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] text-white shadow-sm' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-400 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5 text-sky-400" />
                  <span>Open Live Website</span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg text-rose-400 hover:bg-rose-950/40"
              >
                {loggingOut ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-3.5 w-3.5" />}
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-slate-900 text-slate-300 flex-col border-r border-slate-800 shrink-0 h-full select-none">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a6cbe] to-[#0ea5e9] text-sm font-black text-white shadow-md shadow-sky-950/40 shrink-0 group-hover:scale-105 transition">
              AJ
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-sm tracking-tight leading-none">Asha Jyothi</span>
              <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase mt-1">Diagnostic Centre</span>
            </div>
          </Link>
          <span className="p-1.5 bg-slate-800/80 rounded-xl text-sky-400 border border-slate-700/50">
            <Shield className="h-4 w-4" />
          </span>
        </div>

        {/* Staff User Profile Tag */}
        <div className="px-5 py-3.5 mx-4 mt-4 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div>
              <p className="text-xs font-bold text-white leading-tight">Admin Console</p>
              <p className="text-[10px] text-slate-400 font-medium">Authorized Staff</p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>

        {/* Navigation Section */}
        <div className="px-4 mt-5 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Operations & Management
          </span>
        </div>

        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  active 
                    ? 'bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] text-white shadow-lg shadow-[#0a6cbe]/25' 
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-xl transition ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-800 text-sky-400 group-hover:bg-slate-700'
                  }`}>
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                  <div>
                    <div className="leading-snug">{item.name}</div>
                    <div className={`text-[10px] font-normal ${active ? 'text-sky-100' : 'text-slate-400'}`}>
                      {item.desc}
                    </div>
                  </div>
                </div>
                {item.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${
                    active 
                      ? 'bg-white/20 text-white' 
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar Operations */}
        <div className="p-4 border-t border-slate-800/80 flex flex-col gap-2 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white transition border border-slate-750"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-sky-400" />
              <span>Live Public Website</span>
            </div>
            <span className="text-[10px] bg-slate-700/60 px-1.5 py-0.5 rounded text-slate-400 font-normal">New Tab</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition border border-transparent hover:border-rose-900/40"
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin text-rose-400" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-100">
        
        {/* Top Breadcrumb Bar */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 shrink-0 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Admin Console</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-bold text-[#12304b] text-sm">{currentNav.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Asha Jyothi Server Online
            </span>
          </div>
        </div>

        {/* Content Container (Independent Scroll) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
