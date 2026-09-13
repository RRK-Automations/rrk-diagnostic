import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ThreeDProvider from '@/components/ThreeDProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://ashajyothidctoopran.com'),
  title: {
    default: 'Asha Jyothi Diagnostics — Precision Diagnostics, Compassionate Care · 33+ Years of Excellence',
    template: '%s | Asha Jyothi Diagnostic Centre, Toopran'
  },
  description: 'Asha Jyothi Diagnostic Centre in Toopran, Medak. 33+ years of clinical diagnostic trust (Estd. 1992). Director P. Mallesh Goud. Fully automated pathology laboratory, 4D ultrasound, CT scan, digital X-Ray & OPG, cardiac 2D Echo, 25% discount on health checkup packages and same-day reports.',
  keywords: [
    'Asha Jyothi Diagnostics',
    'Asha Jyothi Diagnostic Centre Toopran',
    'diagnostic centre Toopran',
    'blood test Toopran',
    'pathology lab Toopran',
    '4D ultrasound Toopran',
    'CT scan Medak',
    'digital X-ray Toopran',
    'dental OPG Toopran',
    '2D Echo Cardiology Toopran',
    'P. Mallesh Goud',
    'health checkup packages Toopran',
    'home sample collection Toopran'
  ],
  authors: [{ name: 'Asha Jyothi Diagnostic Centre', url: 'https://ashajyothidctoopran.com' }],
  creator: 'Asha Jyothi Diagnostic Centre',
  publisher: 'Asha Jyothi Diagnostic Centre',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Asha Jyothi Diagnostics — Premier Diagnostic Centre in Toopran',
    description: '33+ years of clinical precision in Toopran, Medak. Automated laboratory, 4D ultrasound, CT scan, digital X-Ray & OPG, 2D Echo, and flat 25% off health checkups.',
    url: 'https://ashajyothidctoopran.com',
    siteName: 'Asha Jyothi Diagnostic Centre',
    images: [
      {
        url: '/images/hero-poster.jpg',
        width: 1200,
        height: 630,
        alt: 'Asha Jyothi Diagnostic Centre Toopran',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asha Jyothi Diagnostic Centre — Toopran',
    description: 'Hospital-grade diagnostic laboratory and imaging center in Toopran, Medak district.',
    images: ['/images/hero-poster.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'Asha Jyothi Diagnostic Centre',
              alternateName: 'Asha Jyothi Diagnostics Toopran',
              url: 'https://ashajyothidctoopran.com',
              logo: 'https://ashajyothidctoopran.com/images/logo.png',
              image: 'https://ashajyothidctoopran.com/images/hero-poster.jpg',
              description: 'Premier diagnostic center and fully automated pathology lab in Toopran, Medak. 33+ years of clinical excellence (Estd. 1992). 4D Ultrasound, Digital X-Ray, Dental OPG, CT Scan, 2D Echo & 25% discount on health packages.',
              telephone: '+91-9440009788',
              priceRange: '₹₹',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'H.No. 13-21/1/A, Near Busstand, Keshava Nagar Colony',
                addressLocality: 'Toopran',
                addressRegion: 'Telangana',
                postalCode: '502334',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 17.8496,
                longitude: 78.4746,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '06:00',
                closes: '21:00',
              },
              medicalSpecialty: ['Pathology', 'Radiology', 'Ultrasound', 'Cardiology'],
            }),
          }}
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
