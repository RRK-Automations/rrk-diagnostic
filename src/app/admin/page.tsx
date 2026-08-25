'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: 'admin', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.refresh();
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid administrator credentials.');
      }
    } catch (err) {
      setError('Network communication failure. Please verify server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-between bg-slate-950 text-white p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Main Website</span>
        </Link>
        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          ● Secure Staff Portal
        </span>
      </div>

      {/* Main Centered Login Box */}
      <div className="max-w-md w-full mx-auto my-auto">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-950/80 backdrop-blur-xl">
          
          {/* Brand & Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a6cbe] to-[#0ea5e9] text-white shadow-lg shadow-sky-950/50">
              <span className="text-xl font-black">AJ</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Staff & CMS Portal</h2>
              <p className="text-slate-400 text-xs mt-1 font-medium">Asha Jyothi Diagnostic Centre · Toopran</p>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-3 bg-rose-950/60 border border-rose-800/80 text-rose-300 rounded-xl flex gap-2.5 items-center text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-bold text-slate-300 mb-1.5">
                Staff Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. admin"
                className="w-full text-xs py-3 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/25"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-300 mb-1.5">
                Staff Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password (e.g. admin123)"
                className="w-full text-xs py-3 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/25"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] hover:from-[#095ca1] hover:to-[#0284c7] text-white font-bold text-xs rounded-xl transition shadow-lg shadow-[#0a6cbe]/30 hover:scale-[1.01] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying credentials...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Credential Hint */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              Demo Access: User <code className="text-sky-300 font-bold bg-slate-800 px-1.5 py-0.5 rounded">admin</code> · Pass <code className="text-sky-300 font-bold bg-slate-800 px-1.5 py-0.5 rounded">admin123</code>
            </p>
          </div>

        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-md w-full mx-auto text-center text-[10px] text-slate-400">
        <p>© {new Date().getFullYear()} Asha Jyothi Diagnostics. Authorized Medical Personnel Only.</p>
      </div>

    </div>
  );
}
