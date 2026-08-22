'use client';

import React from 'react';
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
  Home, 
  Shield, 
  Loader2 
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

  // If we are on the login screen (/admin), do not show sidebar
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
    { name: 'Dashboard Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Appointments Manager', href: '/admin/appointments', icon: CalendarRange },
    { name: 'Digital Reports', href: '/admin/reports', icon: FileText },
    { name: 'General Enquiries', href: '/admin/enquiries', icon: MessageSquareReply },
    { name: 'Website CMS (Content)', href: '/admin/cms', icon: Globe, badge: 'CMS' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        
        {/* Sidebar Header Brand */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1 bg-[#0a6cbe] rounded text-white shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm tracking-tight leading-none">Asha Jyothi</span>
              <span className="text-[10px] font-semibold text-sky-400 tracking-wide uppercase mt-0.5">Admin & CMS Portal</span>
            </div>
          </Link>
          <span className="p-1 bg-slate-800 rounded text-slate-500 hover:text-slate-300">
            <Shield className="h-4 w-4 text-[#0ea5e9]" />
          </span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-grow p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active 
                    ? 'bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] text-white shadow-md shadow-sky-950/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="p-4 border-t border-slate-800 flex flex-col gap-2">
          {/* Back to Home Website */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
          >
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-[#0ea5e9]" />
              <span>Live Website View</span>
            </div>
            <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-400">External</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-all text-left"
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

      {/* Main Admin Content View Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
