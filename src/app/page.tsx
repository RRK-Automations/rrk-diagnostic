'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Clock3, 
  CheckCircle2,
  Tv,
  Scan,
  FlaskConical,
  HeartPulse,
  ArrowRight
} from 'lucide-react';
import { centreInfo } from '@/config/centreInfo';
import IntegrationFlow from '@/components/IntegrationFlow';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  const serviceIcons: { [key: string]: any } = {
    Activity: Activity,
    Tv: Tv,
    Scan: Scan,
    FlaskConical: FlaskConical,
    HeartPulse: HeartPulse
  };

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": centreInfo.name,
    "alternateName": "Asha Jyothi Diagnostics Toopran",
    "image": "https://www.ashajyothidiagnostics.com/logo.png",
    "url": "https://www.ashajyothidiagnostics.com",
    "telephone": "+919440282688",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "13-21/1/A, Keshava Nagar Colony, Toopran",
      "addressLocality": "Toopran",
      "addressRegion": "Telangana",
      "postalCode": "502334",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.8431272,
      "longitude": 78.4782485
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:30",
        "closes": "20:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "07:30",
        "closes": "13:00"
      }
    ],
    "medicalSpecialty": ["Radiology", "Pathology"],
    "availableService": centreInfo.services.map(s => ({
      "@type": "MedicalProcedure",
      "name": s.name,
      "description": s.description
    }))
  };

  return (
    <div className="space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white py-20 sm:py-28 overflow-hidden">
        {/* Abstract shapes/glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="text-xs font-bold text-teal-400 tracking-wider uppercase bg-teal-500/10 px-3.5 py-1 rounded-full border border-teal-500/20">
                Trusted Medical Diagnostic Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                Advanced Diagnostics.<br />
                <span className="text-teal-400">Trusted Care.</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Accurate diagnostic services with convenient online appointment requests and seamless communication channels for patients in Toopran, Telangana.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/book"
                  className="px-6 py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-teal-500/20 transition-all text-center"
                >
                  Book an Appointment
                </Link>
                <WhatsAppButton 
                  message={centreInfo.whatsapp.prefilledText.enquiry}
                  variant="button"
                  label="Enquire via WhatsApp"
                  className="!shadow-none text-center"
                />
              </div>

              {/* Trust Badge Grid */}
              <div className="pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-slate-400 border-t border-slate-700/50">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <ShieldCheck className="h-4 w-4 text-teal-400" />
                  <span className="text-xs font-medium">100% Accurate</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <Clock className="h-4 w-4 text-teal-400" />
                  <span className="text-xs font-medium">Fast Reports</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  <span className="text-xs font-medium">Verified Staff</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Form Wrapper */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Calendar className="h-5 w-5 text-teal-400" />
                    <span className="font-bold text-sm text-white">Need a Scan or Blood Analysis?</span>
                  </div>
                  
                  <div className="space-y-3 text-slate-300 text-xs">
                    <p className="leading-relaxed">
                      We offer a digital patient request platform. Choose your service, request a time slot, and our receptionist will contact you back to confirm.
                    </p>
                    <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-750">
                      <p className="font-semibold text-teal-400 mb-1">Services Offered:</p>
                      <ul className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-400 font-medium">
                        <li>• Ultrasound Scan</li>
                        <li>• Digital X-Ray</li>
                        <li>• Computed Tomography</li>
                        <li>• Pathology / Lab</li>
                        <li>• ECG Cardiology</li>
                        <li className="text-slate-500 line-through font-normal">• MRI Scans</li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/book"
                    className="w-full flex items-center justify-center gap-1.5 py-3 bg-white text-slate-900 font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors shadow"
                  >
                    <span>Request Diagnostic Booking</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Introduction & About */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
              About Asha Jyothi
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              State-of-the-Art Diagnostics in Toopran
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Asha Jyothi Diagnostic Centre has been serving the Toopran region for years, providing reliable radiology and pathology services. We are dedicated to delivering accurate diagnostics utilizing digital technology.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our clinical laboratory handles all hematology and biochemistry testing under stringent quality protocols, and our scan centre features digital scanners for digital X-Rays, Ultrasound, and Computed Tomography.
            </p>
            <div className="pt-2">
              <Link href="/about" className="text-sm font-bold text-teal-600 hover:text-teal-700 inline-flex items-center gap-1">
                <span>Learn more about our centre</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Core Trust Blocks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 border border-slate-150 rounded-xl bg-white space-y-2">
              <Award className="h-6 w-6 text-teal-500" />
              <h4 className="font-bold text-sm text-slate-800">Advanced Imaging</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Modern diagnostic ultrasound scanners, CT equipment, and digital X-Ray grids.</p>
            </div>
            <div className="p-5 border border-slate-150 rounded-xl bg-white space-y-2">
              <Activity className="h-6 w-6 text-indigo-500" />
              <h4 className="font-bold text-sm text-slate-800">Quality Pathology</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Full-fledged diagnostic clinical lab performing blood and biochemistry panels.</p>
            </div>
            <div className="p-5 border border-slate-150 rounded-xl bg-white space-y-2">
              <Clock3 className="h-6 w-6 text-amber-500" />
              <h4 className="font-bold text-sm text-slate-800">Convenient Scheduling</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Fast online booking requests and dedicated WhatsApp enquiry lines.</p>
            </div>
            <div className="p-5 border border-slate-150 rounded-xl bg-white space-y-2">
              <MapPin className="h-6 w-6 text-rose-500" />
              <h4 className="font-bold text-sm text-slate-800">Local & Accessible</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Located in Keshav Nagar Colony, Toopran - easily reachable from Medak Dist.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Major Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
            Our Offerings
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
            Diagnostic & Radiology Services
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Asha Jyothi provides digital diagnostics and scans. Please note that MRI scans are not available at our location.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {centreInfo.services.map((service) => {
            const Icon = serviceIcons[service.iconName] || Activity;
            return (
              <div 
                key={service.id}
                className="bg-white border border-slate-150 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-lg inline-block group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 tracking-tight">{service.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{service.description}</p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center gap-2">
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    No Fasting Required*
                  </span>
                  <Link
                    href={{ pathname: '/book', query: { service: service.name } }}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-0.5"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. n8n Automation Explainer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IntegrationFlow />
      </section>

      {/* 5. Location & Contact Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2">
          
          {/* Contact Details Card */}
          <div className="p-8 sm:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-400 tracking-wider uppercase bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 inline-block">
                Location & Timings
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Find Us in Toopran
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We are located in Keshav Nagar Colony, Tupran, Telangana. Call ahead for current pricing lists and preparation instructions.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Centre Address</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {centreInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Opening Hours</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {centreInfo.contact.workingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Contact Numbers</h4>
                  <div className="text-slate-400 text-xs mt-1 flex flex-col gap-1 font-medium">
                    <a href={`tel:${centreInfo.contact.phones[0].replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                      {centreInfo.contact.phones[0]}
                    </a>
                    <a href={`tel:${centreInfo.contact.phones[1].replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                      {centreInfo.contact.phones[1]}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={centreInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-lg transition-colors shadow-lg"
              >
                <span>Navigate on Google Maps</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Static Embedded Map Frame */}
          <div className="bg-slate-950 h-80 lg:h-auto min-h-[300px] border-t lg:border-t-0 lg:border-l border-slate-800 relative">
            <iframe 
              src="https://maps.google.com/maps?q=17.8431272,78.4782485&hl=en&z=16&output=embed" 
              className="absolute inset-0 w-full h-full border-0 opacity-80 filter invert contrast-125 saturate-50"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Asha Jyothi Diagnostic Centre Location Map"
            />
          </div>

        </div>
      </section>
    </div>
  );
}
