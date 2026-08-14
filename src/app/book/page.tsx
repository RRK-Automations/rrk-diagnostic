'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar, 
  Phone, 
  Activity, 
  Clock, 
  FileCheck2, 
  Loader2, 
  AlertCircle,
  Home as HomeIcon,
  Building2,
  Printer,
  MapPin,
  QrCode,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { centreInfo } from '@/config/centreInfo';
import { healthPackages } from '@/config/packages';
import { createAppointment } from '@/services/appointmentApi';

function BookingFormContent() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedPackage = searchParams.get('package') || '';
  const preselectedType = searchParams.get('type') || '';

  const [bookingType, setBookingType] = useState<'walk-in' | 'home_collection'>(
    preselectedType === 'home_collection' ? 'home_collection' : 'walk-in'
  );

  const [form, setForm] = useState({
    patientName: '',
    phone: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    address: '',
    landmark: '',
    fastingRequired: false,
    referringDoctor: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    id: string;
    message: string;
    submittedData: typeof form & { bookingType: 'walk-in' | 'home_collection' };
  } | null>(null);

  // Pre-populate service / package from query parameters
  useEffect(() => {
    if (preselectedPackage) {
      const match = healthPackages.find(
        (p) => p.name.toLowerCase() === preselectedPackage.toLowerCase() || p.id === preselectedPackage
      );
      if (match) {
        setForm((prev) => ({ 
          ...prev, 
          service: match.name,
          fastingRequired: match.fasting.toLowerCase().includes('fasting')
        }));
      }
    } else if (preselectedService) {
      const match = centreInfo.services.find(
        (s) => s.name.toLowerCase() === preselectedService.toLowerCase()
      );
      if (match) {
        setForm((prev) => ({ ...prev, service: match.name }));
      }
    }

    if (preselectedType === 'home_collection') {
      setBookingType('home_collection');
    }
  }, [preselectedService, preselectedPackage, preselectedType]);

  const timeSlots = [
    '07:00 AM - 08:00 AM (Early Fasting)',
    '08:00 AM - 09:00 AM (Fasting Slot)',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM',
    '07:00 PM - 08:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const isPackage = healthPackages.some(p => p.name === selected);
    setForm(prev => ({
      ...prev,
      service: selected,
      fastingRequired: isPackage || selected.toLowerCase().includes('blood') || selected.toLowerCase().includes('lab')
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!form.patientName || !form.phone || !form.service || !form.preferredDate || !form.preferredTime) {
      setError('Please complete all required fields (Name, Phone, Service, Date, Time).');
      setLoading(false);
      return;
    }

    if (bookingType === 'home_collection' && !form.address) {
      setError('Please enter your home address for sample collection in Toopran.');
      setLoading(false);
      return;
    }

    const payload = {
      ...form,
      bookingType
    };

    const res = await createAppointment(payload);
    
    if (res.success && res.data) {
      setSuccessData({
        id: res.data.appointmentId,
        message: res.data.message,
        submittedData: payload
      });
      // Reset form
      setForm({
        patientName: '',
        phone: '',
        email: '',
        service: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
        address: '',
        landmark: '',
        fastingRequired: false,
        referringDoctor: ''
      });
    } else {
      setError(res.error || 'Something went wrong. Please check your network connection.');
    }
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
      
      {/* Booking Type Switcher Tabs */}
      {!successData && (
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => setBookingType('walk-in')}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${
              bookingType === 'walk-in'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="h-4 w-4 text-teal-500" />
            <span>Clinic Walk-in Visit</span>
          </button>

          <button
            type="button"
            onClick={() => setBookingType('home_collection')}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${
              bookingType === 'home_collection'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <HomeIcon className="h-4 w-4" />
            <span>Home Sample Collection</span>
          </button>
        </div>
      )}

      {/* Form Header */}
      {!successData && (
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <div className={`p-2.5 rounded-lg ${bookingType === 'home_collection' ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-700'}`}>
            {bookingType === 'home_collection' ? <HomeIcon className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {bookingType === 'home_collection' 
                ? 'Request Home Sample Collection in Toopran' 
                : 'Request Clinic Appointment Slot'}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5 font-medium">
              {bookingType === 'home_collection'
                ? 'Our certified phlebotomist visits your doorstep. Pay at sample collection.'
                : 'Visit our centre at Keshav Nagar Colony. No advance payment required.'}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl mb-6 flex gap-2.5 items-start text-xs font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* SUCCESS STATE & PRINTABLE BOOKING SLIP */}
      {successData ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="text-center space-y-2 no-print">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-100">
              <FileCheck2 className="h-7 w-7 animate-bounce" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {successData.submittedData.bookingType === 'home_collection'
                ? 'Home Sample Collection Logged!'
                : 'Appointment Request Logged!'}
            </h3>
            <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
              {successData.message}
            </p>
          </div>

          {/* PRINTABLE SLIP CONTAINER */}
          <div 
            id="printable-slip"
            className="border-2 border-dashed border-teal-500/50 bg-slate-50/50 rounded-2xl p-6 sm:p-8 space-y-6 print:border-solid print:border-black print:p-4 print:bg-white"
          >
            {/* Slip Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-teal-500 rounded text-white print:bg-black">
                    <Activity className="h-4 w-4" />
                  </div>
                  <h4 className="font-extrabold text-base text-slate-800 print:text-black">
                    Asha Jyothi Diagnostic Centre
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 print:text-gray-700">
                  13-21/1/A, Keshava Nagar Colony, Toopran, Telangana 502334
                </p>
                <p className="text-[11px] text-slate-500 print:text-gray-700">
                  Ph: {centreInfo.contact.phones[0]} | {centreInfo.contact.phones[1]}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 print:border-black print:text-black">
                  {successData.submittedData.bookingType === 'home_collection' ? 'HOME COLLECTION SLIP' : 'APPOINTMENT SLIP'}
                </span>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Ref ID: {successData.id}</p>
              </div>
            </div>

            {/* Slip Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Patient Name</p>
                <p className="font-bold text-slate-800 text-sm print:text-black">{successData.submittedData.patientName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Contact Phone</p>
                <p className="font-bold text-slate-800 text-sm print:text-black">{successData.submittedData.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Service / Package</p>
                <p className="font-bold text-teal-700 text-sm print:text-black">{successData.submittedData.service}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Scheduled Slot</p>
                <p className="font-bold text-slate-800 text-sm print:text-black">
                  {successData.submittedData.preferredDate} ({successData.submittedData.preferredTime})
                </p>
              </div>

              {successData.submittedData.referringDoctor && (
                <div className="col-span-2 space-y-1 bg-slate-100/70 p-2.5 rounded-lg">
                  <p className="text-slate-400 font-semibold uppercase text-[10px]">Referred By</p>
                  <p className="font-bold text-slate-800">{successData.submittedData.referringDoctor}</p>
                </div>
              )}

              {successData.submittedData.bookingType === 'home_collection' && (
                <div className="col-span-2 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-slate-400 font-semibold uppercase text-[10px] flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-teal-500" />
                    <span>Collection Address & Landmark</span>
                  </p>
                  <p className="font-semibold text-slate-700">
                    {successData.submittedData.address} {successData.submittedData.landmark ? `(Landmark: ${successData.submittedData.landmark})` : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Fasting & Instructions Notice */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 space-y-1 print:border-gray-400 print:bg-white print:text-black">
              <p className="font-bold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                <span>Patient Preparation Guidelines:</span>
              </p>
              <p className="leading-relaxed">
                • Please carry/present this Reference Code (<strong>{successData.id}</strong>) at the reception or to the home phlebotomist.<br />
                • For fasting lipid/glucose tests, maintain 10–12 hours overnight fasting. Water is allowed.<br />
                • Our staff will call to confirm technician availability prior to arrival.
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-200 pt-3">
              <span>Status: Request Received (Pending Reception Confirmation)</span>
              <span>Generated on {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 no-print">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow transition-all flex items-center justify-center gap-2"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save Slip as PDF</span>
            </button>

            <button
              onClick={() => setSuccessData(null)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
            >
              Book Another Appointment
            </button>

            <a
              href={`https://wa.me/${centreInfo.whatsapp.number}?text=Hello Asha Jyothi Diagnostics, I have logged an appointment request (Ref: ${successData.id}) for ${successData.submittedData.service} on ${successData.submittedData.preferredDate}. Please confirm my slot.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Follow up on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        /* BOOKING FORM */
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Patient Name */}
            <div className="space-y-1.5">
              <label htmlFor="patientName" className="block text-xs font-bold text-slate-700">
                Patient Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                required
                value={form.patientName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700">
                Mobile Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 9440282688"
                className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. ramesh@gmail.com"
                className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
              />
            </div>

            {/* Service / Package Selector */}
            <div className="space-y-1.5">
              <label htmlFor="service" className="block text-xs font-bold text-slate-700">
                Select Scan / Health Package <span className="text-rose-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                value={form.service}
                onChange={handleServiceChange}
                className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
              >
                <option value="">Choose diagnostic service or package...</option>
                <optgroup label="Health Checkup Packages">
                  {healthPackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} ({pkg.testsCount} tests)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Diagnostic Scans & Lab (No MRI)">
                  {centreInfo.services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Home Sample Collection Specific Fields */}
          {bookingType === 'home_collection' && (
            <div className="bg-teal-50/60 border border-teal-150 rounded-xl p-4 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs">
                <MapPin className="h-4 w-4 text-teal-600" />
                <span>Doorstep Collection Address (Toopran & nearby areas)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-bold text-slate-700">
                    House No, Street / Colony Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="e.g. Plot 42, Keshava Nagar Colony, Near Hanuman Temple, Toopran"
                    className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="landmark" className="block text-xs font-bold text-slate-700">
                    Nearby Landmark / Special Instructions <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    placeholder="e.g. Opposite Primary School, 2nd floor"
                    className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred Date */}
            <div className="space-y-1.5">
              <label htmlFor="preferredDate" className="block text-xs font-bold text-slate-700">
                Preferred Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                required
                min={todayDate}
                value={form.preferredDate}
                onChange={handleChange}
                className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
              />
            </div>

            {/* Preferred Time Slot */}
            <div className="space-y-1.5">
              <label htmlFor="preferredTime" className="block text-xs font-bold text-slate-700">
                Preferred Time Slot <span className="text-rose-500">*</span>
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                required
                value={form.preferredTime}
                onChange={handleChange}
                className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
              >
                <option value="">Select Time Slot...</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Referring Doctor (Optional) */}
          <div className="space-y-1.5">
            <label htmlFor="referringDoctor" className="block text-xs font-bold text-slate-700">
              Prescribing Doctor / Hospital Name <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="referringDoctor"
              name="referringDoctor"
              value={form.referringDoctor}
              onChange={handleChange}
              placeholder="e.g. Dr. Srinivas Rao, Gandhi Hospital Toopran"
              className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50"
            />
          </div>

          {/* Optional Message */}
          <div className="space-y-1.5">
            <label htmlFor="message" className="block text-xs font-bold text-slate-700">
              Medical Notes / Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              value={form.message}
              onChange={handleChange}
              placeholder="e.g. Doctor prescribed blood test, need fasting collection early morning..."
              className="w-full text-sm py-2 px-3 border border-slate-250 rounded-lg focus:outline-none focus:border-teal-500 bg-slate-50/50 resize-y"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-1.5 py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-teal-500/10 disabled:bg-teal-300"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting request...</span>
                </>
              ) : (
                <>
                  {bookingType === 'home_collection' ? <HomeIcon className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                  <span>
                    {bookingType === 'home_collection' ? 'Confirm Home Collection Request' : 'Confirm Appointment Slot'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 no-print">
        <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
          Digital Booking System
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Book Scans & Home Blood Collection
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Choose between an in-centre diagnostic visit or request home blood sample collection anywhere in Toopran.
        </p>
      </div>

      <Suspense fallback={
        <div className="max-w-2xl mx-auto py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        </div>
      }>
        <BookingFormContent />
      </Suspense>

      {/* Notice info */}
      <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-150 p-6 rounded-xl flex gap-3.5 items-start no-print">
        <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1.5 text-xs text-slate-600">
          <h4 className="font-bold text-slate-800">Booking Processing Information</h4>
          <p className="leading-relaxed">
            Upon submitting your request, our reception logs it in our MongoDB database and triggers instant notification workflows via n8n. Our team will contact you to confirm the appointment or coordinate home sample pickup.
          </p>
        </div>
      </div>
    </div>
  );
}
