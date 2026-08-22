import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ThreeDProvider from '@/components/ThreeDProvider';

export const metadata: Metadata = {
  title: 'Asha Jyothi Diagnostics — Precision Diagnostics, Compassionate Care · 33+ Years of Excellence',
  description: 'Asha Jyothi Diagnostic Centre in Toopran, Medak. 33+ years of diagnostic trust (Estd. 1992). Complete pathology, 4D ultrasound, CT scan, digital X-Ray & OPG, 2D Echo, 25% discount on health checkup packages and same-day reports.',
  keywords: 'Asha Jyothi Diagnostics, diagnostic centre Toopran, blood tests Toopran, ultrasound Toopran, CT scan Medak, digital X-ray Toopran, P. Mallesh Goud, health packages Toopran, pathology lab Toopran'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#12304b]">
        {/* Top Scroll Progress Indicator */}
        <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-slate-200/60 pointer-events-none">
          <div
            id="scroll-progress"
            className="h-full w-0 bg-gradient-to-r from-[#0a6cbe] via-[#0ea5e9] to-[#14b8a6] transition-all duration-75 ease-out"
          />
        </div>

        <ThreeDProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </ThreeDProvider>
      </body>
    </html>
  );
}
