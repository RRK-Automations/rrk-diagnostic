'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  Search, 
  Printer, 
  ExternalLink,
  Sparkles,
  Layers,
  Filter,
  User,
  Calendar,
  X,
  Stethoscope
} from 'lucide-react';
import { getAllReportsAdmin, createReport } from '@/services/reportApi';
import { REPORT_TEMPLATES, ReportTemplate } from '@/config/reportTemplates';

export default function AdminReportsManager() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTest, setFilterTest] = useState('All');

  // Selected Template
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('cbp');

  // Form State
  const [form, setForm] = useState({
    patientName: '',
    phone: '',
    gender: 'Male',
    age: '35',
    testName: REPORT_TEMPLATES[0].name,
    testDate: new Date().toISOString().split('T')[0],
    doctorName: REPORT_TEMPLATES[0].doctorName,
    conclusion: REPORT_TEMPLATES[0].defaultConclusion,
    results: JSON.parse(JSON.stringify(REPORT_TEMPLATES[0].parameters))
  });

  const fetchReports = async () => {
    setLoading(true);
    const res = await getAllReportsAdmin();
    if (res.success && res.data) {
      setReports(res.data.reports);
    } else {
      setError(res.error || 'Failed to fetch reports.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // When staff changes the test dropdown template
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = REPORT_TEMPLATES.find(t => t.id === templateId) || REPORT_TEMPLATES[0];

    setForm(prev => ({
      ...prev,
      testName: template.name,
      doctorName: template.doctorName,
      conclusion: template.defaultConclusion,
      results: JSON.parse(JSON.stringify(template.parameters))
    }));
  };

  const handleAddParameter = () => {
    setForm(prev => ({
      ...prev,
      results: [
        ...prev.results,
        { parameter: '', value: '', unit: '', referenceRange: '', flag: 'normal' }
      ]
    }));
  };

  const handleRemoveParameter = (index: number) => {
    setForm(prev => ({
      ...prev,
      results: prev.results.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleResultChange = (index: number, field: string, value: string) => {
    setForm(prev => {
      const updated = [...prev.results];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, results: updated };
    });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);

    if (!form.patientName || !form.phone || !form.testName || form.results.length === 0) {
      setError('Please fill required patient details and at least one test parameter.');
      setCreating(false);
      return;
    }

    const res = await createReport({
      ...form,
      age: form.age ? parseInt(form.age, 10) : undefined
    });

    if (res.success && res.data) {
      setShowCreateModal(false);
      fetchReports();
      alert(`Report generated successfully! Report Reference Code: ${res.data.report.reportCode}`);
    } else {
      setError(res.error || 'Failed to create report.');
    }
    setCreating(false);
  };

  // Filtered reports
  const filteredReports = reports.filter(r => {
    const matchesSearch = 
      (r.patientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.phone || '').includes(searchTerm) ||
      (r.reportCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.testName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterTest === 'All' || r.testName?.toLowerCase().includes(filterTest.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#0a6cbe]/10 text-[#0a6cbe] rounded-xl">
              <FileText className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-black text-[#12304b]">Digital Reports Generator</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Create multi-panel diagnostic reports (CBP, Lipid, Thyroid, LFT, KFT, Diabetes, CUE, 2D Echo, Ultrasound) with hospital letterhead and barcodes.
          </p>
        </div>

        <button
          onClick={() => {
            handleTemplateChange(selectedTemplateId);
            setShowCreateModal(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] hover:from-[#095ca1] hover:to-[#0284c7] text-white font-bold text-xs shadow-md shadow-[#0a6cbe]/25 transition hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Generate New Patient Report</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, phone, test or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-500 shrink-0">Filter Panel:</span>
          {['All', 'Blood', 'Lipid', 'Thyroid', 'Liver', 'Kidney', 'Diabetes', 'Urine', 'Echo', 'Ultrasound'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterTest(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                filterTest === t 
                  ? 'bg-[#0a6cbe] text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#0a6cbe] mb-3" />
            <p className="text-xs font-semibold">Loading verified diagnostic reports...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FileText className="h-10 w-10 mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-600">No diagnostic reports found.</p>
            <p className="text-xs text-slate-400">Click &quot;Generate New Patient Report&quot; above to create a test report.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Report Code</th>
                  <th className="px-6 py-4">Patient Details</th>
                  <th className="px-6 py-4">Diagnostic Test Panel</th>
                  <th className="px-6 py-4">Test Date</th>
                  <th className="px-6 py-4">Reporting Doctor</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((report) => (
                  <tr key={report._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-mono font-black text-[#0a6cbe]">
                      {report.reportCode}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{report.patientName}</div>
                      <div className="text-[11px] text-slate-400">
                        {report.phone} · {report.gender || 'Unspecified'} ({report.age ? `${report.age}y` : 'N/A'})
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#12304b] block">{report.testName}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold inline-block mt-0.5">
                        {report.results?.length || 0} Parameters Tested
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap">
                      {report.testDate}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-[11px]">
                      {report.doctorName}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold text-emerald-800">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/reports?code=${report.reportCode}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#0a6cbe] hover:text-white text-slate-700 font-bold text-xs transition"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span>View / Print PDF</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE REPORT MODAL WITH TEST TEMPLATE SELECTOR */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-[#0a6cbe] rounded-xl text-white">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-black text-white">Generate Verified Diagnostic Report</h3>
                  <p className="text-xs text-sky-300">Select test panel template or enter custom parameters.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleCreateSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-2 text-xs font-semibold">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. TEST TEMPLATE DROPDOWN SELECTOR */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 space-y-2">
                <div className="flex items-center gap-2 text-[#0a6cbe]">
                  <Layers className="h-4 w-4" />
                  <label className="text-xs font-extrabold uppercase tracking-wide">
                    Select Test Template Panel (Dropdown)
                  </label>
                </div>
                
                <select
                  value={selectedTemplateId}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full rounded-xl border border-sky-300 bg-white px-4 py-3 text-xs font-bold text-[#12304b] focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20 shadow-sm cursor-pointer"
                >
                  {REPORT_TEMPLATES.map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      {tmpl.name} ({tmpl.category} · {tmpl.parameters.length} Parameters)
                    </option>
                  ))}
                </select>

                <p className="text-[11px] text-slate-500">
                  Selecting a template automatically pre-populates all clinical parameters, reference limits, units, and consultant doctor signature!
                </p>
              </div>

              {/* 2. PATIENT INFORMATION ROW */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={form.patientName}
                    onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                    className="w-full text-xs py-2 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-[#0a6cbe]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs py-2 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-[#0a6cbe]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full text-xs py-2 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-[#0a6cbe]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    placeholder="e.g. 42"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full text-xs py-2 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-[#0a6cbe]"
                  />
                </div>
              </div>

              {/* 3. TEST DETAILS & DOCTOR */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Diagnostic Test Title *</label>
                  <input
                    type="text"
                    required
                    value={form.testName}
                    onChange={(e) => setForm({ ...form, testName: e.target.value })}
                    className="w-full text-xs py-2.5 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-[#0a6cbe]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Test Date *</label>
                  <input
                    type="date"
                    required
                    value={form.testDate}
                    onChange={(e) => setForm({ ...form, testDate: e.target.value })}
                    className="w-full text-xs py-2.5 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-[#0a6cbe]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Reporting Pathologist / Doctor</label>
                  <input
                    type="text"
                    value={form.doctorName}
                    onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
                    className="w-full text-xs py-2.5 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-[#0a6cbe]"
                  />
                </div>
              </div>

              {/* 4. PARAMETERS TABLE & EDITING */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-[#12304b] uppercase tracking-wider">
                    Test Parameters & Observed Patient Values ({form.results.length})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddParameter}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0a6cbe] hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Custom Parameter</span>
                  </button>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 font-bold text-[10px] uppercase">
                      <tr>
                        <th className="p-3 w-2/6">Investigation Parameter</th>
                        <th className="p-3 w-1/6">Observed Value</th>
                        <th className="p-3 w-1/6">Unit</th>
                        <th className="p-3 w-2/6">Reference Range</th>
                        <th className="p-3 w-1/6 text-center">Flag</th>
                        <th className="p-3 w-12 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {form.results.map((param: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2">
                            <input
                              type="text"
                              required
                              value={param.parameter}
                              onChange={(e) => handleResultChange(idx, 'parameter', e.target.value)}
                              placeholder="Parameter Name"
                              className="w-full py-1.5 px-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0a6cbe]"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              required
                              value={param.value}
                              onChange={(e) => handleResultChange(idx, 'value', e.target.value)}
                              placeholder="Observed Value"
                              className="w-full py-1.5 px-2 text-xs font-bold border border-slate-200 rounded-lg text-[#0a6cbe] focus:outline-none focus:border-[#0a6cbe]"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={param.unit}
                              onChange={(e) => handleResultChange(idx, 'unit', e.target.value)}
                              placeholder="e.g. mg/dL"
                              className="w-full py-1.5 px-2 text-xs border border-slate-200 rounded-lg text-slate-500 focus:outline-none focus:border-[#0a6cbe]"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={param.referenceRange}
                              onChange={(e) => handleResultChange(idx, 'referenceRange', e.target.value)}
                              placeholder="e.g. 70 - 100"
                              className="w-full py-1.5 px-2 text-xs border border-slate-200 rounded-lg text-slate-500 focus:outline-none focus:border-[#0a6cbe]"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <select
                              value={param.flag}
                              onChange={(e) => handleResultChange(idx, 'flag', e.target.value)}
                              className={`py-1.5 px-2 text-[10px] font-bold rounded-lg border focus:outline-none ${
                                param.flag === 'high' 
                                  ? 'bg-rose-50 text-rose-700 border-rose-300' 
                                  : param.flag === 'low' 
                                  ? 'bg-amber-50 text-amber-700 border-amber-300' 
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              }`}
                            >
                              <option value="normal">Normal</option>
                              <option value="high">HIGH (↑)</option>
                              <option value="low">LOW (↓)</option>
                            </select>
                          </td>
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveParameter(idx)}
                              className="text-slate-400 hover:text-rose-500 p-1"
                              title="Remove parameter"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5. CLINICAL IMPRESSION / CONCLUSION */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Clinical Impression / Pathologist Conclusion
                </label>
                <textarea
                  rows={3}
                  value={form.conclusion}
                  onChange={(e) => setForm({ ...form, conclusion: e.target.value })}
                  placeholder="Enter conclusion or remarks..."
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0a6cbe]"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] text-xs font-bold text-white shadow-md transition hover:scale-105 disabled:opacity-50"
                >
                  {creating ? 'Saving & Publishing Report...' : 'Publish Digital Report'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
