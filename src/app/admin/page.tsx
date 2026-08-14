'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, ShieldAlert, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
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
        // Redirect to protected dashboard
        router.refresh(); // Triggers middleware evaluation
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
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-sm">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Activity className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Staff Portal Login</h2>
            <p className="text-slate-400 text-xs mt-1 font-medium">Asha Jyothi Diagnostic Centre admin console.</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg flex gap-2 items-center text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-xs font-bold text-slate-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. admin"
              className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-bold text-slate-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors shadow disabled:bg-slate-700"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-4 w-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-[10px] text-slate-400">
          <p>Protected administrative page. Activity logging is enabled.</p>
        </div>

      </div>
    </div>
  );
}
