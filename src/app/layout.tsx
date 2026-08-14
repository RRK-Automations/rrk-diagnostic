import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Asha Jyothi Diagnostic Centre | Accurate Diagnostics in Toopran",
  description: "Advanced diagnostic scans, digital X-Ray, pathology lab analyses, CT scan, and cardiovascular wellness packages in Keshava Nagar Colony, Toopran, Telangana.",
  keywords: "Diagnostic Centre Toopran, Blood Test Tupran, Ultrasound scan Toopran, X-Ray Toopran, Pathology laboratory Medak, Asha Jyothi Diagnostics",
  openGraph: {
    title: "Asha Jyothi Diagnostic Centre Toopran | Trusted Care",
    description: "Reliable laboratory reports and scan diagnostics. Book appointments or request home blood sample collections online.",
    type: "website",
    locale: "en_IN",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
