'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  Search, 
  Printer, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { getAllReportsAdmin, createReport } from '@/services/reportApi';

export default function AdminReportsManager() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form State
  const [form, setForm] = useState({
    patientName: '',
    phone: '',
    gender: 'Male',
    age: '',
    testName: 'Complete Blood Picture (CBP)',
    testDate: new Date().toISOString().split('T')[0],
    doctorName: 'Dr. S. K. Sharma, MD (Pathology)',
    conclusion: 'All observed clinical parameters are within biological reference limits.',
    results: [
      { parameter: 'Hemoglobin (Hb)', value: '14.2', unit: 'g/dL', referenceRange: '13.0 - 17.0', flag: 'normal' },
      { parameter: 'Total WBC Count', value: '7,500', unit: 'cells/cu.mm', referenceRange: '4,000 - 11,000', flag: 'normal' },
      { parameter: 'Platelet Count', value: '2.5', unit: 'Lakhs/cu.mm', referenceRange: '1.5 - 4.5', flag: 'normal' }
    ]
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
      results: prev.results.filter((_, i) => i !== index)
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
      setError('Please fill required patient and result parameters.');
      setCreating(false);
      return;
    }

    const res = await createReport(form);
    if (res.success && res.data) {
      setShowCreateModal(false);
      fetchReports();
      alert(`Report generated successfully! Report Code: ${res.data.report.reportCode}`);
    } else {
      setError(res.error || 'Failed to create report.');
    }
    setCreating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-teal-500" />
            <span>Digital Patient Reports</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Generate, publish, and audit verified pathology and scan reports for online download.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs font-bold transition-all shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Publish New Report</span>
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-2.5">Report Code</th>
              <th className="py-2.5">Patient Name</th>
              <th className="py-2.5">Phone Number</th>
              <th className="py-2.5">Investigation</th>
              <th className="py-2.5">Date</th>
              <th className="py-2.5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-teal-500" />
                    <span>Loading report records...</span>
                  </div>
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                  No reports published yet. Click &quot;Publish New Report&quot; to create one.
                </td>
              </tr>
            ) : (
              reports.map((rpt) => (
                <tr key={rpt._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-mono font-bold text-slate-800">{rpt.reportCode}</td>
                  <td className="py-3 font-bold text-slate-700">{rpt.patientName}</td>
                  <td className="py-3 text-slate-500">{rpt.phone}</td>
                  <td className="py-3 font-semibold text-teal-700">{rpt.testName}</td>
                  <td className="py-3 text-slate-400">{rpt.testDate}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded font-bold text-[10px]">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Ready</span>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE NEW REPORT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Generate Digital Patient Report</h3>
                <p className="text-slate-400 text-xs">Patient will be able to search and download this report using their phone.</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.patientName}
                    onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                    placeholder="e.g. Balaji Naidu"
                    className="w-full py-2 px-3 border border-slate-250 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 9908123456"
                    className="w-full py-2 px-3 border border-slate-250 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full py-2 px-3 border border-slate-250 rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    placeholder="e.g. 42"
                    className="w-full py-2 px-3 border border-slate-250 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Test Date</label>
                  <input
                    type="date"
                    required
                    value={form.testDate}
                    onChange={(e) => setForm({ ...form, testDate: e.target.value })}
                    className="w-full py-2 px-3 border border-slate-250 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Investigation / Test Name *</label>
                  <input
                    type="text"
                    required
                    value={form.testName}
                    onChange={(e) => setForm({ ...form, testName: e.target.value })}
                    placeholder="e.g. Lipid Profile & Serum Cholesterol"
                    className="w-full py-2 px-3 border border-slate-250 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consultant Pathologist</label>
                  <input
                    type="text"
                    value={form.doctorName}
                    onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
                    className="w-full py-2 px-3 border border-slate-250 rounded-lg"
                  />
                </div>
              </div>

              {/* Dynamic Results Table Editor */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 uppercase text-[10px]">Test Parameters & Values:</span>
                  <button
                    type="button"
                    onClick={handleAddParameter}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold text-[10px] inline-flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Parameter</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {form.results.map((res, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-150">
                      <div className="col-span-4">
                        <input
                          type="text"
                          placeholder="Parameter Name"
                          required
                          value={res.parameter}
                          onChange={(e) => handleResultChange(idx, 'parameter', e.target.value)}
                          className="w-full py-1.5 px-2 bg-white border border-slate-250 rounded"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="Value"
                          required
                          value={res.value}
                          onChange={(e) => handleResultChange(idx, 'value', e.target.value)}
                          className="w-full py-1.5 px-2 bg-white border border-slate-250 rounded font-bold"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="Units (mg/dL)"
                          value={res.unit}
                          onChange={(e) => handleResultChange(idx, 'unit', e.target.value)}
                          className="w-full py-1.5 px-2 bg-white border border-slate-250 rounded"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="Reference"
                          value={res.referenceRange}
                          onChange={(e) => handleResultChange(idx, 'referenceRange', e.target.value)}
                          className="w-full py-1.5 px-2 bg-white border border-slate-250 rounded"
                        />
                      </div>
                      <div className="col-span-1">
                        <select
                          value={res.flag}
                          onChange={(e) => handleResultChange(idx, 'flag', e.target.value)}
                          className="w-full py-1.5 px-1 bg-white border border-slate-250 rounded text-[10px]"
                        >
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <div className="col-span-1 text-center">
                        {form.results.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveParameter(idx)}
                            className="p-1 text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conclusion */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Impression / Note</label>
                <textarea
                  rows={2}
                  value={form.conclusion}
                  onChange={(e) => setForm({ ...form, conclusion: e.target.value })}
                  className="w-full py-2 px-3 border border-slate-250 rounded-lg"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg shadow inline-flex items-center gap-2 disabled:bg-teal-300"
                >
                  {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  <span>Publish to Patient Portal</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
