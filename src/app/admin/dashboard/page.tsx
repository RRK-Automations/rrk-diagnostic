'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CalendarRange, 
  MessageSquareReply, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Loader2, 
  Database,
  ArrowRight,
  TrendingUp,
  History,
  Download
} from 'lucide-react';
import { getAppointments } from '@/services/appointmentApi';
import { getEnquiries } from '@/services/enquiryApi';

interface LogEntry {
  _id: string;
  type: 'appointment' | 'enquiry' | 'status_change';
  relatedId: string;
  webhookUrl: string;
  status: 'success' | 'failed';
  errorMessage?: string;
  retryCount: number;
  createdAt: string;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [retryState, setRetryState] = useState<{ [key: string]: 'idle' | 'running' | 'success' | 'failed' }>({});

  const fetchData = async () => {
    try {
      const [apptsRes, enqsRes, logsRes] = await Promise.all([
        getAppointments(),
        getEnquiries(),
        fetch('/api/admin/integration').then(r => r.json())
      ]);

      if (apptsRes.success) setAppointments(apptsRes.data.appointments);
      if (enqsRes.success) setEnquiries(enqsRes.data.enquiries);
      if (logsRes.success) setLogs(logsRes.logs);
    } catch (error) {
      console.error('Failed to fetch dashboard metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleRetrySync = async (logId: string) => {
    setRetryState(prev => ({ ...prev, [logId]: 'running' }));
    try {
      const res = await fetch('/api/admin/integration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRetryState(prev => ({ ...prev, [logId]: 'success' }));
        // Refresh logs after brief delay
        setTimeout(fetchData, 1500);
      } else {
        setRetryState(prev => ({ ...prev, [logId]: 'failed' }));
      }
    } catch (error) {
      setRetryState(prev => ({ ...prev, [logId]: 'failed' }));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        <span className="text-sm font-semibold text-slate-500">Retrieving diagnostics logs...</span>
      </div>
    );
  }

  // Calculate metrics
  const totalAppts = appointments.length;
  const newAppts = appointments.filter(a => a.status === 'new').length;
  const confirmedAppts = appointments.filter(a => a.status === 'confirmed').length;
  const completedAppts = appointments.filter(a => a.status === 'completed').length;
  const totalEnqs = enquiries.length;
  const syncFailures = logs.filter(l => l.status === 'failed').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-xs mt-1">Real-time scheduling metrics and n8n webhook sync statuses.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/api/admin/export-n8n"
            download="ashajyothi_n8n_master_workflow.json"
            className="flex items-center gap-1.5 px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
            title="Appointments, Home Collections, Report Publishing & Google Sheets workflow"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Master Workflow (.json)</span>
          </a>

          <a
            href="/api/admin/export-n8n?type=chatbot"
            download="ashajyothi_n8n_whatsapp_chatbot.json"
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
            title="24/7 WhatsApp Interactive Menu & Intent Router Chatbot"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export WhatsApp Chatbot (.json)</span>
          </a>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-teal-500' : 'text-slate-400'}`} />
            <span>{refreshing ? 'Refreshing' : 'Refresh Metrics'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Appts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-lg">
              <CalendarRange className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" />
              <span>Active</span>
            </span>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Appointments</p>
            <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">{totalAppts}</p>
          </div>
          <div className="text-[10px] text-slate-500 flex gap-2 font-medium border-t border-slate-100 pt-3">
            <span>{newAppts} New</span>
            <span>&bull;</span>
            <span>{confirmedAppts} Confirmed</span>
          </div>
        </div>

        {/* Total Enquiries */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <MessageSquareReply className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">General Enquiries</p>
            <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">{totalEnqs}</p>
          </div>
          <div className="text-[10px] text-slate-500 flex gap-2 font-medium border-t border-slate-100 pt-3">
            <span>{enquiries.filter(e => e.status === 'new').length} Uncontacted</span>
          </div>
        </div>

        {/* Confirmed / Completed */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Completed Bookings</p>
            <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">{completedAppts}</p>
          </div>
          <div className="text-[10px] text-slate-500 flex gap-2 font-medium border-t border-slate-100 pt-3">
            <span>Success rate: {totalAppts ? Math.round((completedAppts / totalAppts) * 100) : 0}%</span>
          </div>
        </div>

        {/* Failed integrations */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
            </div>
            {syncFailures > 0 && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full animate-pulse">
                Action Required
              </span>
            )}
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Automation Issues</p>
            <p className={`text-2xl font-black tracking-tight mt-1 ${syncFailures > 0 ? 'text-rose-600' : 'text-slate-800'}`}>{syncFailures}</p>
          </div>
          <div className="text-[10px] text-slate-500 flex gap-2 font-medium border-t border-slate-100 pt-3">
            <span>Webhook logs tracked in DB</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Sync log tables & Quick Appointment widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Webhook Sync Log Section */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <History className="h-5 w-5 text-slate-400" />
            <h3 className="font-bold text-base text-slate-800 tracking-tight">Recent Webhook Sync Logs</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Sync Type</th>
                  <th className="py-2.5">Date / Time</th>
                  <th className="py-2.5">Webhook endpoint</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                      No webhook deliveries logged yet. Submit a form to trigger.
                    </td>
                  </tr>
                ) : (
                  logs.slice(0, 10).map((log) => {
                    const statusState = retryState[log._id] || 'idle';
                    return (
                      <tr key={log._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 font-semibold text-slate-700 capitalize">
                          {log.type === 'status_change' ? 'status update' : log.type}
                        </td>
                        <td className="py-3 text-slate-400">
                          {new Date(log.createdAt).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="py-3 font-mono text-[10px] text-slate-500 max-w-[150px] truncate" title={log.webhookUrl}>
                          {log.webhookUrl}
                        </td>
                        <td className="py-3">
                          {log.status === 'success' ? (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded font-semibold">
                              <CheckCircle className="h-3 w-3" />
                              <span>Synced</span>
                            </span>
                          ) : (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-rose-50 text-rose-600 rounded font-semibold" title={log.errorMessage}>
                                <AlertTriangle className="h-3 w-3" />
                                <span>Failed</span>
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 text-right">
                          {log.status === 'failed' && (
                            <button
                              onClick={() => handleRetrySync(log._id)}
                              disabled={statusState === 'running' || statusState === 'success'}
                              className="px-2.5 py-1 text-[10px] font-bold border border-rose-200 text-rose-600 rounded bg-rose-50 hover:bg-rose-100 transition-all inline-flex items-center gap-1 disabled:opacity-50"
                            >
                              {statusState === 'running' ? (
                                <>
                                  <Loader2 className="h-3 w-3 animate-spin text-rose-500" />
                                  <span>Syncing</span>
                                </>
                              ) : statusState === 'success' ? (
                                <>
                                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                                  <span className="text-emerald-600">Done</span>
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="h-3 w-3" />
                                  <span>Retry Sync</span>
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Lists Widgets */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-800 tracking-tight flex items-center gap-2">
              <CalendarRange className="h-5 w-5 text-slate-400" />
              <span>Recent Requests</span>
            </h3>
            <Link
              href="/admin/appointments"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-0.5"
            >
              <span>Manage</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {appointments.length === 0 ? (
              <p className="py-4 text-center text-xs text-slate-400 font-medium">No bookings request found.</p>
            ) : (
              appointments.slice(0, 5).map((appt) => (
                <div key={appt._id} className="py-3 flex flex-col gap-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 max-w-[130px] truncate">{appt.patientName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      appt.status === 'new' ? 'bg-indigo-50 text-indigo-600' :
                      appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                      appt.status === 'cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px] font-medium">
                    <span>{appt.service}</span>
                    <span>{appt.preferredDate}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
