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
    { name: 'General Enquiries', href: '/admin/enquiries', icon: MessageSquareReply }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        
        {/* Sidebar Header Brand */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1 bg-teal-500 rounded text-white">
              <Activity className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm tracking-tight leading-none">Asha Jyothi</span>
              <span className="text-[10px] font-semibold text-teal-400 tracking-wide uppercase mt-0.5">Staff Portal</span>
            </div>
          </Link>
          <span className="p-1 bg-slate-800 rounded text-slate-500 hover:text-slate-300">
            <Shield className="h-4 w-4 text-teal-500" />
          </span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-grow p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  active 
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/10' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="p-4 border-t border-slate-800 flex flex-col gap-2">
          {/* Back to Home Website */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 hover:text-white text-slate-500 transition-colors"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span>Go to public website</span>
          </Link>

          {/* Log Out */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all focus:outline-none"
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4 shrink-0" />
            )}
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 max-w-7xl overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}
