'use client';

import React from 'react';
import { 
  User, 
  Globe, 
  Database, 
  Cpu, 
  Calendar, 
  FileSpreadsheet, 
  MessageSquare, 
  Mail, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function IntegrationFlow() {
  const steps = [
    {
      id: 1,
      title: 'Patient Actions',
      description: 'Patient submits appointment request or general enquiry on the website.',
      icon: User,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      glow: 'shadow-indigo-100/50'
    },
    {
      id: 2,
      title: 'Next.js Frontend',
      description: 'Validates inputs, rate-limits submissions, and sends payload to API handler.',
      icon: Globe,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
      glow: 'shadow-sky-100/50'
    },
    {
      id: 3,
      title: 'Database & Backend',
      description: 'Mongoose saves record as "New" (source of truth) and spawns webhook trigger.',
      icon: Database,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      glow: 'shadow-emerald-100/50'
    },
    {
      id: 4,
      title: 'n8n Orchestration',
      description: 'Parses webhook secret and automates multi-channel service flows.',
      icon: Cpu,
      color: 'bg-teal-50 text-teal-600 border-teal-200',
      glow: 'shadow-teal-100/50'
    }
  ];

  const integrations = [
    {
      name: 'Google Calendar',
      purpose: 'Automatically schedule confirmed bookings for clinic medical staff.',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      name: 'CRM / Google Sheets',
      purpose: 'Sync lead records in real-time for customer relationship tracking.',
      icon: FileSpreadsheet,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      name: 'WhatsApp Business',
      purpose: 'Send automated booking acknowledgements, confirmations & reminders.',
      icon: MessageSquare,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      name: 'Staff & Patient Email',
      purpose: 'Dispatch notification summaries and preparation instructions.',
      icon: Mail,
      color: 'bg-red-50 text-red-600 border-red-200'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
          Integration Workflow
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
          Your Appointment. Automatically Connected.
        </h3>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed">
          Behind our simple user booking form is a secure, automated data engine that keeps our medical staff and patients connected in real time.
        </p>
      </div>

      {/* Workflow Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start relative mb-12">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div key={step.id} className="flex flex-col items-center text-center relative group">
              {/* Step indicator bubble */}
              <div className={`p-4 rounded-full border-2 ${step.color} shadow-lg ${step.glow} mb-4 group-hover:scale-105 transition-transform relative animate-pulse-glow`}>
                <StepIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white shadow">
                  {step.id}
                </span>
              </div>
              
              <h4 className="text-base font-bold text-slate-800 tracking-tight">{step.title}</h4>
              <p className="text-slate-500 text-xs mt-2 px-4 leading-relaxed">{step.description}</p>

              {/* Connecting arrow (hidden on mobile, visible on desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 -right-4 translate-x-1/2 z-10 text-slate-300">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Integrations Grid */}
      <div className="border-t border-slate-100 pt-10">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Automated Operations Handled by n8n
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((integration) => {
            const IntIcon = integration.icon;
            return (
              <div 
                key={integration.name}
                className="flex items-start gap-4 p-4 border border-slate-150 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all group"
              >
                <div className={`p-2.5 rounded-lg border ${integration.color} group-hover:scale-105 transition-transform shrink-0`}>
                  <IntIcon className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800 tracking-tight group-hover:text-teal-600 transition-colors">
                    {integration.name}
                  </h5>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    {integration.purpose}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security note */}
      <div className="mt-8 flex items-center justify-center gap-2 bg-slate-50 border border-slate-100 rounded-lg p-3 max-w-xl mx-auto">
        <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
        <span className="text-[11px] font-medium text-slate-500 leading-none">
          Data encryption and HIPAA-aware security tokens protect patient logs throughout the sync flow.
        </span>
      </div>
    </div>
  );
}
