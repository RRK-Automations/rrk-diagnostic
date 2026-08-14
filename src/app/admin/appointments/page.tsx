'use client';

import React, { useState, useEffect } from 'react';
import { 
  CalendarRange, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { getAppointments, updateAppointmentStatus } from '@/services/appointmentApi';
import { centreInfo } from '@/config/centreInfo';

export default function AppointmentsManager() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sort, setSort] = useState('preferredDate_asc');
  const [selectedAppt, setSelectedAppt] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    const res = await getAppointments({ search, status: statusFilter, sort });
    if (res.success && res.data) {
      setAppointments(res.data.appointments);
    } else {
      setError(res.error || 'Failed to fetch appointments from server.');
    }
    setLoading(false);
  };

  // Re-fetch on filter/search triggers
  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, sort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAppointments();
  };

  const handleStatusChange = async (apptId: string, newStatus: string) => {
    setActionLoading(true);
    const res = await updateAppointmentStatus(apptId, newStatus);
    if (res.success && res.data) {
      // Update local listing
      setAppointments(prev =>
        prev.map(a => (a._id === apptId ? { ...a, status: newStatus } : a))
      );
      // Update selected detail modal card
      if (selectedAppt && selectedAppt._id === apptId) {
        setSelectedAppt((prev: any) => ({ ...prev, status: newStatus }));
      }
    } else {
      alert(res.error || 'Failed to update status. Check backend connection.');
    }
    setActionLoading(false);
  };

  const statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'New Request', value: 'new' },
    { label: 'Contacted Patient', value: 'contacted' },
    { label: 'Confirmed Booking', value: 'confirmed' },
    { label: 'Completed Scan', value: 'completed' },
    { label: 'Cancelled Booking', value: 'cancelled' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <CalendarRange className="h-6 w-6 text-teal-500" />
          <span>Appointments Manager</span>
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Review details, update status states, and trigger n8n automated confirmation messaging.
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
              placeholder="Search by Patient name or phone..."
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
        <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap gap-3 items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
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

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50 w-full sm:w-auto"
          >
            <option value="preferredDate_asc">Sort: Appointment Date (Asc)</option>
            <option value="preferredDate_desc">Sort: Appointment Date (Desc)</option>
            <option value="createdAt_desc">Sort: Booking Date (Desc)</option>
            <option value="createdAt_asc">Sort: Booking Date (Asc)</option>
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
        
        {/* Appointments List Table */}
        <div className={`bg-white border border-slate-200 rounded-xl p-5 shadow-sm ${selectedAppt ? 'lg:col-span-7' : 'lg:col-span-12'} overflow-x-auto`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Patient</th>
                  <th className="py-2.5">Service Requested</th>
                  <th className="py-2.5">Schedule Slot</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-55">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-teal-500" />
                        <span className="text-slate-400 font-medium">Retrieving booking requests...</span>
                      </div>
                    </td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                      No appointment requests match filters.
                    </td>
                  </tr>
                ) : (
                  appointments.map((appt) => (
                    <tr 
                      key={appt._id} 
                      className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedAppt?._id === appt._id ? 'bg-teal-50/30' : ''}`}
                      onClick={() => setSelectedAppt(appt)}
                    >
                      <td className="py-4 font-bold text-slate-800">
                        <p className="truncate max-w-[130px]">{appt.patientName}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{appt.phone}</p>
                      </td>
                      <td className="py-4 text-slate-600 font-semibold">{appt.service}</td>
                      <td className="py-4 text-slate-500 font-medium">
                        <p>{appt.preferredDate}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{appt.preferredTime}</p>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          appt.status === 'new' ? 'bg-indigo-50 text-indigo-600' :
                          appt.status === 'contacted' ? 'bg-amber-50 text-amber-600' :
                          appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 animate-pulse-glow' :
                          appt.status === 'completed' ? 'bg-slate-100 text-slate-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAppt(appt);
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

        {/* Selected Appointment Details Drawer */}
        {selectedAppt && (
          <div className="lg:col-span-5 bg-white border border-slate-250 rounded-xl p-6 shadow-md space-y-6 animate-in slide-in-from-right-2 duration-300 relative">
            
            <button
              onClick={() => setSelectedAppt(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Close
            </button>

            <div className="border-b border-slate-100 pb-4">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Booking Details Card
              </span>
              <h3 className="text-base font-extrabold text-slate-800 mt-1 leading-snug">
                {selectedAppt.patientName}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {selectedAppt._id}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <p className="text-slate-400 font-semibold flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-400" />
                    <span>Phone</span>
                  </p>
                  <a href={`tel:${selectedAppt.phone}`} className="font-bold text-slate-800 hover:text-teal-600 hover:underline">
                    {selectedAppt.phone}
                  </a>
                </div>
                {/* Email */}
                <div className="space-y-1">
                  <p className="text-slate-400 font-semibold flex items-center gap-1">
                    <Mail className="h-3 w-3 text-slate-400" />
                    <span>Email</span>
                  </p>
                  <p className="font-bold text-slate-800 truncate">{selectedAppt.email || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Service */}
                <div className="space-y-1">
                  <p className="text-slate-400 font-semibold">Service</p>
                  <p className="font-bold text-slate-800">{selectedAppt.service}</p>
                </div>
                {/* Schedule */}
                <div className="space-y-1">
                  <p className="text-slate-400 font-semibold flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>Schedule</span>
                  </p>
                  <p className="font-bold text-slate-800">{selectedAppt.preferredDate}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{selectedAppt.preferredTime}</p>
                </div>
              </div>

              {/* Message */}
              {selectedAppt.message && (
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                  <p className="text-slate-400 font-semibold flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    <span>Patient Note</span>
                  </p>
                  <p className="text-slate-600 italic font-medium leading-relaxed">{selectedAppt.message}</p>
                </div>
              )}
            </div>

            {/* Change Status Control Block */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <h4 className="font-bold text-xs text-slate-800 tracking-tight flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-teal-500" />
                <span>Process Status Change</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                
                {/* Contacted */}
                <button
                  onClick={() => handleStatusChange(selectedAppt._id, 'contacted')}
                  disabled={actionLoading || selectedAppt.status === 'contacted'}
                  className="py-2 px-3 border border-amber-250 bg-amber-50 hover:bg-amber-100/50 text-amber-700 font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Mark Contacted
                </button>

                {/* Confirm */}
                <button
                  onClick={() => handleStatusChange(selectedAppt._id, 'confirmed')}
                  disabled={actionLoading || selectedAppt.status === 'confirmed'}
                  className="py-2 px-3 border border-emerald-250 bg-emerald-50 hover:bg-emerald-100/50 text-emerald-700 font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Confirm Booking
                </button>

                {/* Completed */}
                <button
                  onClick={() => handleStatusChange(selectedAppt._id, 'completed')}
                  disabled={actionLoading || selectedAppt.status === 'completed'}
                  className="py-2 px-3 border border-slate-250 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Mark Completed
                </button>

                {/* Cancel */}
                <button
                  onClick={() => handleStatusChange(selectedAppt._id, 'cancelled')}
                  disabled={actionLoading || selectedAppt.status === 'cancelled'}
                  className="py-2 px-3 border border-rose-250 bg-rose-50 hover:bg-rose-100/50 text-rose-700 font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel Booking
                </button>

              </div>
            </div>

            {/* Quick Contact triggers */}
            <div className="border-t border-slate-100 pt-5 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">Trigger Alert:</span>
              <a
                href={`https://wa.me/${selectedAppt.phone.replace(/[^0-9]/g, '')}?text=Hello ${selectedAppt.patientName}, this is Asha Jyothi Diagnostic Centre Toopran. We are reaching out regarding your ${selectedAppt.service} request.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-750 inline-flex items-center gap-1 hover:underline"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
