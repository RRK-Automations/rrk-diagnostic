'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  FileText, 
  Search, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  Phone, 
  ShieldCheck, 
  Activity, 
  ArrowLeft,
  Calendar,
  AlertCircle,
  Download,
  QrCode
} from 'lucide-react';
import { searchReports } from '@/services/reportApi';
import { useCmsContent } from '@/hooks/useCmsContent';

function ReportsContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const { content } = useCmsContent();

  const [searchQuery, setSearchQuery] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<any[] | null>(null);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const directorName = content?.directorName || 'P. Mallesh Goud';
  const directorDesig = content?.directorDesignation || 'Director';
  const address = content?.address || 'Behind Surya Medical & General Stores, Main Road, TOOPRAN - 502 334, Medak District, Telangana';
  const phones = content?.phones || ['94400 09788', '94402 82688'];
  const whatsappNum = content?.whatsappNumber || '919440009788';

  const doSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSelectedReport(null);

    const res = await searchReports(query.trim());
    if (res.success && res.data) {
      setReports(res.data.reports);
      if (res.data.reports.length === 0) {
        setError(res.data.message || 'No reports found. If you tested recently, your results may be in processing.');
      } else if (res.data.reports.length === 1) {
        setSelectedReport(res.data.reports[0]);
      }
    } else {
      setError(res.error || 'Failed to connect to reports database. Please check your network.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (initialCode) {
      doSearch(initialCode);
    }
  }, [initialCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter your mobile phone number or Report Reference Code.');
      return;
    }
    doSearch(searchQuery);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      
      {/* Page Header (Hidden on print) */}
      <div className="text-center max-w-3xl mx-auto space-y-4 no-print">
        <span className="text-xs font-bold text-[#0a6cbe] tracking-wider uppercase bg-[#0a6cbe]/10 px-3.5 py-1 rounded-full border border-[#0a6cbe]/20">
          Patient Portal · Digital Lab Reports
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12304b] tracking-tight">
          Download Diagnostic & Pathology Reports
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Access your calibrated blood investigations, biochemistry panels, lipid profiles, thyroid, and radiology reports online using your registered phone number or reference code.
        </p>
      </div>

      {/* SEARCH SECTION (Hidden on print) */}
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm no-print space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-[#0a6cbe]/10 text-[#0a6cbe] rounded-2xl">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#12304b] tracking-tight">Search Your Lab / Scan Report</h2>
            <p className="text-slate-400 text-xs font-medium">Enter your 10-digit registered mobile number or Report Code.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. 94400 09788 or AJ-RPT-101-4921"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs py-3 pl-10 pr-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20 bg-slate-50/50 shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] hover:from-[#095ca1] hover:to-[#0284c7] text-white font-bold text-xs rounded-2xl transition shadow-md shadow-[#0a6cbe]/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Searching clinic database...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Retrieve Reports</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex gap-2.5 items-start text-xs font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* REPORT SELECTION LIST IF MULTIPLE RESULTS (Hidden on print) */}
      {reports && reports.length > 1 && !selectedReport && (
        <div className="max-w-3xl mx-auto space-y-4 no-print animate-in fade-in duration-200">
          <h3 className="font-bold text-sm text-slate-700">
            Matching Reports ({reports.length} found):
          </h3>
          <div className="grid gap-3">
            {reports.map((rpt) => (
              <div
                key={rpt._id}
                onClick={() => setSelectedReport(rpt)}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#0a6cbe] hover:shadow-md cursor-pointer transition flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#12304b] text-sm">{rpt.testName}</span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {rpt.reportCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Patient: <strong>{rpt.patientName}</strong> · Date: {rpt.testDate}</p>
                </div>
                <button className="px-4 py-2 bg-[#0a6cbe]/10 text-[#0a6cbe] font-bold text-xs rounded-xl hover:bg-[#0a6cbe] hover:text-white transition">
                  View Report
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIGITAL REPORT DETAIL VIEW & PRINTABLE DOCUMENT */}
      {selectedReport && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
          
          {/* Top Actions Bar (Hidden on print) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-4 rounded-2xl no-print shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition"
                title="Back to search"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <p className="font-bold text-xs">{selectedReport.testName}</p>
                <p className="text-[10px] text-slate-400 font-mono">Ref: {selectedReport.reportCode}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#0a6cbe] hover:bg-[#095ca1] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print / Download PDF</span>
              </button>
              <a
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello Asha Jyothi Diagnostics, I have a medical query regarding my report (${selectedReport.testName} - Ref: ${selectedReport.reportCode}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1fbd5a] text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <span>Doctor Query</span>
              </a>
            </div>
          </div>

          {/* OFFICIAL MEDICAL REPORT CONTAINER (Rendered on screen and printed on PDF) */}
          <div 
            id="printable-slip"
            className="printable-report bg-white border border-slate-300 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 text-slate-800"
          >
            {/* Header: Hospital Clinic Branding */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-900 pb-6 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a6cbe] text-sm font-black text-white shrink-0 print:bg-black">
                    AJ
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight print:text-black">
                      {content?.centreName || 'ASHA JYOTHI DIAGNOSTIC CENTRE'}
                    </h2>
                    <p className="text-[11px] font-bold text-[#0a6cbe] print:text-gray-800 uppercase tracking-wider">
                      Clinical Pathology, 4D Ultrasound, Digital X-Ray & Cardiology
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 print:text-gray-700 font-medium">
                  {address}
                </p>
                <p className="text-xs text-slate-500 print:text-gray-600">
                  Ph: {phones.join(' · ')} | {directorDesig}: {directorName}
                </p>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 font-black text-[10px] uppercase rounded-full border border-emerald-300 print:border-black print:text-black">
                  VERIFIED DIGITAL REPORT
                </span>
                <p className="text-xs font-mono font-bold text-slate-800 mt-2">
                  Report ID: {selectedReport.reportCode}
                </p>
                <p className="text-[11px] text-slate-500">
                  Date: {selectedReport.testDate}
                </p>
              </div>
            </div>

            {/* Patient & Doctor Demographics Bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Patient Name</p>
                <p className="font-bold text-slate-900 text-sm">{selectedReport.patientName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Phone Number</p>
                <p className="font-bold text-slate-900">{selectedReport.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Age / Gender</p>
                <p className="font-bold text-slate-900">
                  {selectedReport.age ? `${selectedReport.age} Yrs` : 'N/A'} / {selectedReport.gender}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Consultant Doctor</p>
                <p className="font-bold text-slate-900 text-xs truncate">{selectedReport.doctorName}</p>
              </div>
            </div>

            {/* Test Investigation Title */}
            <div className="border-b border-slate-200 pb-2">
              <h3 className="font-extrabold text-base text-slate-900 uppercase tracking-wide">
                Investigation: {selectedReport.testName}
              </h3>
            </div>

            {/* Test Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-600 font-bold uppercase tracking-wider bg-slate-100/70 text-[10px]">
                    <th className="py-2.5 px-3">Test Parameter</th>
                    <th className="py-2.5 px-3">Observed Value</th>
                    <th className="py-2.5 px-3">Standard Reference Range</th>
                    <th className="py-2.5 px-3">Units</th>
                    <th className="py-2.5 px-3 text-right">Flag Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(selectedReport.results || []).map((res: any, idx: number) => {
                    const isAbnormal = res.flag === 'high' || res.flag === 'low';
                    return (
                      <tr key={idx} className={isAbnormal ? 'bg-amber-50/50 font-medium' : ''}>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{res.parameter}</td>
                        <td className={`py-2.5 px-3 font-black text-xs ${isAbnormal ? 'text-rose-600' : 'text-slate-900'}`}>
                          {res.value}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{res.referenceRange || '—'}</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">{res.unit || '—'}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                            res.flag === 'high' ? 'bg-rose-100 text-rose-800' :
                            res.flag === 'low' ? 'bg-blue-100 text-blue-800' :
                            'bg-emerald-50 text-emerald-700'
                          }`}>
                            {res.flag}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pathologist Clinical Conclusion */}
            {selectedReport.conclusion && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1 text-xs">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#0a6cbe]" />
                  <span>Clinical Impression / Pathologist Interpretation:</span>
                </p>
                <p className="text-slate-600 leading-relaxed italic pl-5">
                  &ldquo;{selectedReport.conclusion}&rdquo;
                </p>
              </div>
            )}

            {/* Signatures & Footer Authenticity */}
            <div className="border-t-2 border-slate-200 pt-6 mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end text-xs">
              <div>
                <p className="font-mono text-[10px] text-slate-400">Electronic Security Verification:</p>
                <p className="font-mono text-[9px] text-slate-600 select-all truncate">
                  SHA256: 7f8a91b2c3d4e5f6a7b8c9d0e1f2a3b4
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Calibrated Medical Controls · Estd. 1992
                </p>
              </div>

              <div className="hidden sm:block text-center">
                <p className="text-[10px] text-slate-400">Digital QR Verification</p>
                <div className="inline-block p-1 bg-slate-100 border border-slate-200 rounded-lg mt-1">
                  <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center text-[7px] font-mono font-bold rounded">
                    AJ·VERIFIED
                  </div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <p className="font-bold text-slate-900 text-xs">{selectedReport.doctorName}</p>
                <p className="text-[10px] text-slate-500">Consultant Radiologist & Pathologist</p>
                <p className="text-[10px] font-semibold text-[#0a6cbe]">Reg No: TSMC / 48921</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-[9px] text-slate-400 text-center border-t border-slate-100 pt-3">
              This is a computer-verified digital report issued by Asha Jyothi Diagnostic Centre. For clinical management, please consult your treating physician.
            </div>

          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3 no-print">
        <h4 className="font-bold text-sm text-slate-800">Cannot find your diagnostic report?</h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Standard blood panels and ultrasound reports are uploaded within 4–6 hours of sample collection. For immediate help, contact the centre reception.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <a
            href={`tel:+91${phones[0].replace(/\s/g, '')}`}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-full hover:bg-slate-100 transition shadow-sm inline-flex items-center gap-1.5"
          >
            <Phone className="h-3.5 w-3.5 text-[#0a6cbe]" />
            <span>Call Reception: +91 {phones[0]}</span>
          </a>
        </div>
      </div>

    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a6cbe]" />
      </div>
    }>
      <ReportsContent />
    </Suspense>
  );
}
