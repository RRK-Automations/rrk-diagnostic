'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { centreInfo } from '@/config/centreInfo';

interface WhatsAppButtonProps {
  message?: string;
  variant?: 'floating' | 'button' | 'link';
  className?: string;
  label?: string;
}

export default function WhatsAppButton({
  message = centreInfo.whatsapp.prefilledText.enquiry,
  variant = 'floating',
  className = '',
  label = 'Chat on WhatsApp'
}: WhatsAppButtonProps) {
  const encodedText = encodeURIComponent(message);
  const waUrl = `https://wa.me/${centreInfo.whatsapp.number}?text=${encodedText}`;

  if (variant === 'floating') {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-3.5 bg-emerald-500 text-white rounded-full shadow-2xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Contact clinic via WhatsApp"
        title="Contact clinic via WhatsApp"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 font-semibold text-sm transition-all duration-300 ease-in-out">
          WhatsApp Us
        </span>
      </a>
    );
  }

  if (variant === 'button') {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 text-white font-semibold text-sm rounded-lg hover:bg-emerald-600 shadow-md transition-colors active:scale-98 ${className}`}
      >
        <MessageSquare className="h-4 w-4" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 hover:underline ${className}`}
    >
      <MessageSquare className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}
