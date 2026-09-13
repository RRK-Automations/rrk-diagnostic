'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-100">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-extrabold text-[#12304b]">
          Something went wrong
        </h2>

        <p className="mt-2 text-xs text-slate-500">
          We encountered an unexpected error while rendering this section.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a6cbe] py-3 px-5 text-sm font-bold text-white shadow hover:bg-[#095ca1] transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <Home className="w-4 h-4 text-[#0a6cbe]" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
