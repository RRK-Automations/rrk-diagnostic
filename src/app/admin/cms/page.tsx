'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Tag, 
  FlaskConical, 
  Stethoscope, 
  Megaphone, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Loader2,
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminCmsPage() {
  const [activeTab, setActiveTab] = useState<'centre' | 'packages' | 'services' | 'doctors' | 'hero'>('centre');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    fetchCmsContent();
  }, []);

  const fetchCmsContent = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/cms');
      const json = await res.json();
      if (json.success && json.content) {
        setData(json.content);
      } else {
        setErrorMsg(json.error || 'Failed to load CMS content.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error fetching CMS content.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (json.success) {
        setSuccessMsg(json.message || 'Website content published successfully!');
        if (json.content) setData(json.content);
        setTimeout(() => setSuccessMsg(''), 6000);
      } else {
        setErrorMsg(json.error || 'Failed to update CMS content.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error while saving changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    setErrorMsg('');
    setShowResetModal(false);

    try {
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' })
      });
      const json = await res.json();

      if (json.success) {
        setData(json.content);
        setSuccessMsg(json.message || 'Restored official 33-year defaults.');
        setTimeout(() => setSuccessMsg(''), 6000);
      } else {
        setErrorMsg(json.error || 'Failed to reset CMS defaults.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error while resetting defaults.');
    } finally {
      setResetting(false);
    }
  };

  // Helper Array Modifiers
  const handlePhoneChange = (index: number, value: string) => {
    const updated = [...(data.phones || [])];
    updated[index] = value;
    setData({ ...data, phones: updated });
  };

  const handleAddPhone = () => {
    setData({ ...data, phones: [...(data.phones || []), ''] });
  };

  const handleRemovePhone = (index: number) => {
    const updated = data.phones.filter((_: any, i: number) => i !== index);
    setData({ ...data, phones: updated });
  };

  const handleLandlineChange = (index: number, value: string) => {
    const updated = [...(data.landlines || [])];
    updated[index] = value;
    setData({ ...data, landlines: updated });
  };

  const handleAddLandline = () => {
    setData({ ...data, landlines: [...(data.landlines || []), ''] });
  };

  const handleRemoveLandline = (index: number) => {
    const updated = data.landlines.filter((_: any, i: number) => i !== index);
    setData({ ...data, landlines: updated });
  };

  // Package Modifiers
  const handlePackageChange = (index: number, field: string, value: any) => {
    const updated = [...(data.packages || [])];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, packages: updated });
  };

  const handlePackageTestsChange = (index: number, testsString: string) => {
    const tests = testsString.split('\n').map((t) => t.trim()).filter(Boolean);
    const updated = [...(data.packages || [])];
    updated[index] = { ...updated[index], tests, testsCount: tests.length };
    setData({ ...data, packages: updated });
  };

  const handleAddPackage = () => {
    const newPkg = {
      id: `pkg-${Date.now()}`,
      name: 'New Health Package',
      tagline: 'Comprehensive preventative health checkup',
      actualPrice: 5000,
      price: 3750,
      testsCount: 15,
      tests: ['Complete Blood Picture (CBP)', 'Lipid Profile', 'Fasting Blood Sugar', 'Serum Creatinine'],
      fasting: '10-12 hours overnight fasting',
      badge: '25% OFF',
      popular: false
    };
    setData({ ...data, packages: [...(data.packages || []), newPkg] });
  };

  const handleRemovePackage = (index: number) => {
    if (!confirm('Are you sure you want to remove this health package?')) return;
    const updated = data.packages.filter((_: any, i: number) => i !== index);
    setData({ ...data, packages: updated });
  };

  // Individual Services Modifiers
  const handleServiceChange = (index: number, field: string, value: any) => {
    const updated = [...(data.services || [])];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, services: updated });
  };

  const handleAddService = () => {
    const newSvc = {
      id: `svc-${Date.now()}`,
      name: 'New Laboratory Test',
      category: 'Pathology',
      price: 500,
      turnaroundTime: 'Same-day (3-4 hours)',
      preparation: '10-12 hours fasting required',
      description: 'Automated clinical testing'
    };
    setData({ ...data, services: [...(data.services || []), newSvc] });
  };

  const handleRemoveService = (index: number) => {
    const updated = data.services.filter((_: any, i: number) => i !== index);
    setData({ ...data, services: updated });
  };

  // Consultants Modifiers
  const handleConsultantChange = (index: number, field: string, value: any) => {
    const updated = [...(data.consultants || [])];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, consultants: updated });
  };

  const handleAddConsultant = () => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: 'Dr. New Specialist',
      specialty: 'Visiting Specialist',
      qualification: 'MBBS, MD',
      experience: '10+ Years Experience',
      timing: 'By Prior Appointment',
      availableDays: 'Monday – Saturday'
    };
    setData({ ...data, consultants: [...(data.consultants || []), newDoc] });
  };

  const handleRemoveConsultant = (index: number) => {
    const updated = data.consultants.filter((_: any, i: number) => i !== index);
    setData({ ...data, consultants: updated });
  };

  // Division Modifiers
  const handleDivisionChange = (index: number, field: string, value: any) => {
    const updated = [...(data.divisions || [])];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, divisions: updated });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a6cbe]" />
        <p className="text-sm font-semibold">Loading Website Content Manager...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#0a6cbe]/10 text-[#0a6cbe] rounded-xl font-bold">
              <Sparkles className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Website Content Manager (CMS)</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Modify text, prices, packages, phone numbers, and doctors live across all pages of the website.
          </p>
        </div>

        {/* Global Save & Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            disabled={saving || resetting}
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 transition shadow-sm disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restore Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving || resetting}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:shadow-lg hover:scale-105 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{saving ? 'Publishing Changes...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center gap-3 shadow-sm animate-in slide-in-from-top">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-bold text-rose-800 flex items-center gap-3 shadow-sm animate-in slide-in-from-top">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* CMS Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('centre')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'centre'
              ? 'bg-[#0a6cbe] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>1. Centre & Contacts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'packages'
              ? 'bg-[#0a6cbe] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Tag className="h-4 w-4" />
          <span>2. Health Packages ({data?.packages?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'services'
              ? 'bg-[#0a6cbe] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FlaskConical className="h-4 w-4" />
          <span>3. Divisions & Tests</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('doctors')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'doctors'
              ? 'bg-[#0a6cbe] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Stethoscope className="h-4 w-4" />
          <span>4. Doctors & Specialists ({data?.consultants?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hero'
              ? 'bg-[#0a6cbe] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Megaphone className="h-4 w-4" />
          <span>5. Hero & Announcements</span>
        </button>
      </div>

      {/* FORM BODY */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>

        {/* TAB 1: CENTRE & CONTACT INFO */}
        {activeTab === 'centre' && (
          <div className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-800">Centre Profile & Contact Information</h2>
              <p className="text-xs text-slate-500">Official registered branding, Director details, address, and emergency phone numbers.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Diagnostic Centre Name</label>
                <input
                  type="text"
                  value={data.centreName || ''}
                  onChange={(e) => setData({ ...data, centreName: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline / Slogan</label>
                <input
                  type="text"
                  value={data.tagline || ''}
                  onChange={(e) => setData({ ...data, tagline: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Director Name</label>
                <input
                  type="text"
                  value={data.directorName || ''}
                  onChange={(e) => setData({ ...data, directorName: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Director Designation</label>
                <input
                  type="text"
                  value={data.directorDesignation || ''}
                  onChange={(e) => setData({ ...data, directorDesignation: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Years of Excellence</label>
                <input
                  type="number"
                  value={data.yearsOfExcellence || 33}
                  onChange={(e) => setData({ ...data, yearsOfExcellence: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Established Year</label>
                <input
                  type="number"
                  value={data.establishedYear || 1992}
                  onChange={(e) => setData({ ...data, establishedYear: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Complete Physical Address</label>
              <textarea
                rows={2}
                value={data.address || ''}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe] focus:ring-2 focus:ring-[#0a6cbe]/20"
              />
            </div>

            {/* Mobile Numbers */}
            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#0a6cbe]" />
                  <span>Mobile Numbers for Appointments & Home Visits</span>
                </label>
                <button
                  type="button"
                  onClick={handleAddPhone}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0a6cbe] hover:underline"
                >
                  <Plus className="h-3 w-3" /> Add Phone
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(data.phones || []).map((phone: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => handlePhoneChange(idx, e.target.value)}
                      placeholder="e.g. 94400 09788"
                      className="w-full rounded-xl border border-slate-300 px-4 py-2 text-xs text-slate-800 focus:border-[#0a6cbe]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhone(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Landlines */}
            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-700">Official Landline Numbers</label>
                <button
                  type="button"
                  onClick={handleAddLandline}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0a6cbe] hover:underline"
                >
                  <Plus className="h-3 w-3" /> Add Landline
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(data.landlines || []).map((landline: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={landline}
                      onChange={(e) => handleLandlineChange(idx, e.target.value)}
                      placeholder="e.g. 08454-235537"
                      className="w-full rounded-xl border border-slate-300 px-4 py-2 text-xs text-slate-800 focus:border-[#0a6cbe]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLandline(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Timings & WhatsApp */}
            <div className="grid gap-5 sm:grid-cols-3 border-t border-slate-100 pt-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={data.operatingHours || ''}
                  onChange={(e) => setData({ ...data, operatingHours: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Support Text</label>
                <input
                  type="text"
                  value={data.emergencySupport || ''}
                  onChange={(e) => setData({ ...data, emergencySupport: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Business Number</label>
                <input
                  type="text"
                  value={data.whatsappNumber || ''}
                  onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HEALTH PACKAGES (25% DISCOUNT) */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-5">
              <div>
                <h2 className="text-base font-black text-slate-800">Health Packages Catalog ({data?.packages?.length || 0})</h2>
                <p className="text-xs text-slate-500">Edit package pricing, actual rates, offer discount rates, and included tests list.</p>
              </div>
              <button
                type="button"
                onClick={handleAddPackage}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-4 py-2 text-xs font-bold text-white shadow-sm hover:scale-105 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add New Package</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {(data.packages || []).map((pkg: any, idx: number) => (
                <div key={pkg.id || idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-black text-emerald-800">
                      Package #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Package Name</label>
                      <input
                        type="text"
                        value={pkg.name || ''}
                        onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-800 font-bold focus:border-[#0a6cbe]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Tagline / Description</label>
                      <input
                        type="text"
                        value={pkg.tagline || ''}
                        onChange={(e) => handlePackageChange(idx, 'tagline', e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-600 focus:border-[#0a6cbe]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Actual Price (₹)</label>
                        <input
                          type="number"
                          value={pkg.actualPrice || 0}
                          onChange={(e) => handlePackageChange(idx, 'actualPrice', Number(e.target.value))}
                          className="w-full rounded-xl border border-slate-300 px-3 py-1.5 text-xs text-slate-800 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-emerald-700 mb-1">Offer Price (25% Off ₹)</label>
                        <input
                          type="number"
                          value={pkg.price || 0}
                          onChange={(e) => handlePackageChange(idx, 'price', Number(e.target.value))}
                          className="w-full rounded-xl border border-emerald-300 bg-emerald-50/50 px-3 py-1.5 text-xs text-emerald-900 font-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Fasting Instructions</label>
                      <input
                        type="text"
                        value={pkg.fasting || ''}
                        onChange={(e) => handlePackageChange(idx, 'fasting', e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Tests Included (1 per line · {pkg.tests?.length || 0} Total Tests)
                      </label>
                      <textarea
                        rows={5}
                        value={(pkg.tests || []).join('\n')}
                        onChange={(e) => handlePackageTestsChange(idx, e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-800 font-mono leading-relaxed"
                        placeholder="Complete Blood Picture (CBP)&#10;Thyroid Profile (T3, T4, TSH)&#10;Lipid Profile&#10;Liver Function Test"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DIVISIONS & TESTS */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            {/* Section A: 8 Diagnostic Divisions */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-black text-slate-800">8 Core Diagnostic Divisions</h2>
                <p className="text-xs text-slate-500">Edit titles, clinical descriptions, turnaround times, and photo URLs for the main divisions.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {(data.divisions || []).map((div: any, idx: number) => (
                  <div key={div.id || idx} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#0a6cbe]">Division #{div.id}</span>
                      <span className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded-md font-semibold text-slate-600">
                        {div.category}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Division Title</label>
                      <input
                        type="text"
                        value={div.title || ''}
                        onChange={(e) => handleDivisionChange(idx, 'title', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-800 font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Image Path / URL</label>
                      <input
                        type="text"
                        value={div.image || ''}
                        onChange={(e) => handleDivisionChange(idx, 'image', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-800 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={div.description || ''}
                        onChange={(e) => handleDivisionChange(idx, 'description', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-800 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Turnaround Time</label>
                      <input
                        type="text"
                        value={div.timing || ''}
                        onChange={(e) => handleDivisionChange(idx, 'timing', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-800 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: Individual Tests Catalog */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-lg font-black text-slate-800">Individual Tests & Scans Price List ({data?.services?.length || 0})</h2>
                  <p className="text-xs text-slate-500">Live search catalogue for specific blood tests, ultrasound, ECG, and X-ray prices.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0a6cbe] px-3.5 py-2 text-xs font-bold text-white shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Test</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(data.services || []).map((svc: any, idx: number) => (
                  <div key={svc.id || idx} className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <input
                          type="text"
                          value={svc.category || 'Pathology'}
                          onChange={(e) => handleServiceChange(idx, 'category', e.target.value)}
                          className="text-[10px] font-bold uppercase bg-sky-50 text-[#0a6cbe] px-2 py-0.5 rounded-md border border-sky-200 max-w-[120px]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveService(idx)}
                          className="text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Test Name</label>
                      <input
                        type="text"
                        value={svc.name || ''}
                        onChange={(e) => handleServiceChange(idx, 'name', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-2.5 py-1 text-xs text-slate-900 font-bold"
                      />

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Price (₹)</label>
                          <input
                            type="number"
                            value={svc.price || 0}
                            onChange={(e) => handleServiceChange(idx, 'price', Number(e.target.value))}
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1 text-xs text-[#0a6cbe] font-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Turnaround</label>
                          <input
                            type="text"
                            value={svc.turnaroundTime || ''}
                            onChange={(e) => handleServiceChange(idx, 'turnaroundTime', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1 text-xs text-slate-700"
                          />
                        </div>
                      </div>

                      <div className="mt-2">
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Preparation / Fasting</label>
                        <input
                          type="text"
                          value={svc.preparation || ''}
                          onChange={(e) => handleServiceChange(idx, 'preparation', e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-2.5 py-1 text-[11px] text-amber-900 bg-amber-50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DOCTORS & SPECIALISTS */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-5">
              <div>
                <h2 className="text-base font-black text-slate-800">Consultant Specialists & Doctors Panel ({data?.consultants?.length || 0})</h2>
                <p className="text-xs text-slate-500">Edit visiting doctors, specialties, degrees, and clinic timings.</p>
              </div>
              <button
                type="button"
                onClick={handleAddConsultant}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Doctor</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(data.consultants || []).map((doc: any, idx: number) => (
                <div key={doc.id || idx} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-[#0a6cbe]">Consultant #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveConsultant(idx)}
                      className="text-xs text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Doctor Full Name</label>
                    <input
                      type="text"
                      value={doc.name || ''}
                      onChange={(e) => handleConsultantChange(idx, 'name', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Specialty / Department</label>
                    <input
                      type="text"
                      value={doc.specialty || ''}
                      onChange={(e) => handleConsultantChange(idx, 'specialty', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-[#0a6cbe] font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Qualifications</label>
                    <input
                      type="text"
                      value={doc.qualification || ''}
                      onChange={(e) => handleConsultantChange(idx, 'qualification', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Timing</label>
                      <input
                        type="text"
                        value={doc.timing || ''}
                        onChange={(e) => handleConsultantChange(idx, 'timing', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Available Days</label>
                      <input
                        type="text"
                        value={doc.availableDays || ''}
                        onChange={(e) => handleConsultantChange(idx, 'availableDays', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HERO & ANNOUNCEMENTS */}
        {activeTab === 'hero' && (
          <div className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-800">Hero Section & Promotional Banners</h2>
              <p className="text-xs text-slate-500">Edit headline banners, 25% discount promotions, and background video URLs.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Main Hero Headline</label>
                <input
                  type="text"
                  value={data.heroHeadline || ''}
                  onChange={(e) => setData({ ...data, heroHeadline: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 font-bold focus:border-[#0a6cbe]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subheading Text</label>
                <textarea
                  rows={3}
                  value={data.heroSubheading || ''}
                  onChange={(e) => setData({ ...data, heroSubheading: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800 focus:border-[#0a6cbe]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <div>
                  <label className="block text-xs font-bold text-emerald-900 mb-1">Special Discount Announcement Banner Text</label>
                  <input
                    type="text"
                    value={data.discountBannerText || ''}
                    onChange={(e) => setData({ ...data, discountBannerText: e.target.value })}
                    className="w-full rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-xs text-emerald-950 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-900 mb-1">Discount Percentage (%)</label>
                  <input
                    type="number"
                    value={data.discountPercentage || 25}
                    onChange={(e) => setData({ ...data, discountPercentage: Number(e.target.value) })}
                    className="w-full rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-xs text-emerald-950 font-black"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 border-t border-slate-100 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hero Video URL / Path</label>
                  <input
                    type="text"
                    value={data.heroVideoUrl || ''}
                    onChange={(e) => setData({ ...data, heroVideoUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hero Poster Image URL</label>
                  <input
                    type="text"
                    value={data.heroPosterUrl || ''}
                    onChange={(e) => setData({ ...data, heroPosterUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lab Showcase Video URL</label>
                  <input
                    type="text"
                    value={data.labVideoUrl || ''}
                    onChange={(e) => setData({ ...data, labVideoUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Action Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={saving || resetting}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#0a6cbe] to-[#0ea5e9] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:shadow-xl hover:scale-105 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            <span>{saving ? 'Publishing Updates...' : 'Save & Publish Live Changes'}</span>
          </button>
        </div>
      </form>

      {/* CONFIRM RESTORE DEFAULTS MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Restore Official 33-Year Defaults?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This will safely reset all packages (10 health checkups with 25% discount), diagnostic divisions, consultant doctor details, and contact numbers back to official defaults.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={resetting}
                className="rounded-xl bg-amber-600 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition"
              >
                {resetting ? 'Restoring...' : 'Yes, Restore Defaults'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
