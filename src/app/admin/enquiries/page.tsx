'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquareReply, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { getEnquiries, updateEnquiryStatus } from '@/services/enquiryApi';

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedEnq, setSelectedEnq] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    const res = await getEnquiries({ search, status: statusFilter });
    if (res.success && res.data) {
      setEnquiries(res.data.enquiries);
    } else {
      setError(res.error || 'Failed to fetch enquiries from server.');
    }
    setLoading(false);
  };

  // Re-fetch on filter triggers
  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (enqId: string, newStatus: string) => {
    setActionLoading(true);
    const res = await updateEnquiryStatus(enqId, newStatus);
    if (res.success && res.data) {
      // Update local listing
      setEnquiries(prev =>
        prev.map(e => (e._id === enqId ? { ...e, status: newStatus } : e))
      );
      // Update selected detail modal card
      if (selectedEnq && selectedEnq._id === enqId) {
        setSelectedEnq((prev: any) => ({ ...prev, status: newStatus }));
      }
    } else {
      alert(res.error || 'Failed to update enquiry status. Check backend connection.');
    }
    setActionLoading(false);
  };

  const statusOptions = [
    { label: 'All Enquiries', value: '' },
    { label: 'New Enquiry', value: 'new' },
    { label: 'Contacted Enquirer', value: 'contacted' },
    { label: 'Resolved Enquiry', value: 'resolved' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <MessageSquareReply className="h-6 w-6 text-teal-500" />
          <span>General Enquiries</span>
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Review general patient questions, track follow-ups, and update resolution states.
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="w-full lg:max-w-md relative flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or message query..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs py-2 pl-9 pr-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="w-full lg:w-auto flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50 w-full sm:w-auto"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl flex gap-2.5 items-start text-xs font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Main split dashboard panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Enquiries List Table */}
        <div className={`bg-white border border-slate-200 rounded-xl p-5 shadow-sm ${selectedEnq ? 'lg:col-span-7' : 'lg:col-span-12'} overflow-x-auto`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Enquirer</th>
                  <th className="py-2.5">Service Interest</th>
                  <th className="py-2.5">Date Submitted</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-teal-500" />
                        <span className="text-slate-400 font-medium">Retrieving patient enquiries...</span>
                      </div>
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                      No general enquiries logged yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enq) => (
                    <tr 
                      key={enq._id} 
                      className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedEnq?._id === enq._id ? 'bg-teal-50/30' : ''}`}
                      onClick={() => setSelectedEnq(enq)}
                    >
                      <td className="py-4 font-bold text-slate-800">
                        <p className="truncate max-w-[130px]">{enq.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{enq.phone}</p>
                      </td>
                      <td className="py-4 text-slate-600 font-semibold">{enq.service || 'General'}</td>
                      <td className="py-4 text-slate-500 font-medium">
                        {new Date(enq.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          enq.status === 'new' ? 'bg-indigo-50 text-indigo-600' :
                          enq.status === 'contacted' ? 'bg-amber-50 text-amber-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEnq(enq);
                          }}
                          className="px-2 py-1 text-[10px] font-bold border border-slate-200 text-slate-600 rounded bg-white hover:bg-slate-50 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Enquiry Details Drawer */}
        {selectedEnq && (
          <div className="lg:col-span-5 bg-white border border-slate-250 rounded-xl p-6 shadow-md space-y-6 animate-in slide-in-from-right-2 duration-300 relative">
            
            <button
              onClick={() => setSelectedEnq(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Close
            </button>

            <div className="border-b border-slate-100 pb-4">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Enquiry Details Card
              </span>
              <h3 className="text-base font-extrabold text-slate-800 mt-1 leading-snug">
                {selectedEnq.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {selectedEnq._id}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <p className="text-slate-400 font-semibold flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-400" />
                    <span>Phone</span>
                  </p>
                  <a href={`tel:${selectedEnq.phone}`} className="font-bold text-slate-800 hover:text-teal-600 hover:underline">
                    {selectedEnq.phone}
                  </a>
                </div>
                {/* Email */}
                <div className="space-y-1">
                  <p className="text-slate-400 font-semibold flex items-center gap-1">
                    <Mail className="h-3 w-3 text-slate-400" />
                    <span>Email</span>
                  </p>
                  <p className="font-bold text-slate-800 truncate">{selectedEnq.email || 'N/A'}</p>
                </div>
              </div>

              <div>
                {/* Service Interest */}
                <p className="text-slate-400 font-semibold">Service Interest</p>
                <p className="font-bold text-slate-800 mt-0.5">{selectedEnq.service || 'General Diagnostics'}</p>
              </div>

              {/* Message */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                <p className="text-slate-400 font-semibold flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span>Enquiry Message</span>
                </p>
                <p className="text-slate-600 italic font-medium leading-relaxed">{selectedEnq.message}</p>
              </div>
            </div>

            {/* Change Status Control Block */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <h4 className="font-bold text-xs text-slate-800 tracking-tight flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-teal-500" />
                <span>Process Resolution State</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                
                {/* Contacted */}
                <button
                  onClick={() => handleStatusChange(selectedEnq._id, 'contacted')}
                  disabled={actionLoading || selectedEnq.status === 'contacted'}
                  className="py-2 px-3 border border-amber-250 bg-amber-50 hover:bg-amber-100/50 text-amber-700 font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Mark Contacted
                </button>

                {/* Resolved */}
                <button
                  onClick={() => handleStatusChange(selectedEnq._id, 'resolved')}
                  disabled={actionLoading || selectedEnq.status === 'resolved'}
                  className="py-2 px-3 border border-emerald-250 bg-emerald-50 hover:bg-emerald-100/50 text-emerald-700 font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Mark Resolved
                </button>

              </div>
            </div>

            {/* Quick Contact triggers */}
            <div className="border-t border-slate-100 pt-5 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">Direct Actions:</span>
              <a
                href={`https://wa.me/${selectedEnq.phone.replace(/[^0-9]/g, '')}?text=Hello ${selectedEnq.name}, this is Asha Jyothi Diagnostic Centre Toopran. We are responding to your general enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-750 inline-flex items-center gap-1 hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
