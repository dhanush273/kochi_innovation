import React from 'react';
import { QrCode, Sparkles } from 'lucide-react';

export default function Header({ onOpenQrModal }) {
  return (
    <header className="w-full max-w-xl mx-auto mb-6">
      {/* Logos Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-sm border border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <img
            src="/Logos/conceptia-konnect-logo.png"
            alt="Conceptia Konnect"
            className="h-10 sm:h-12 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/uploads/conceptia-konnect-logo.png';
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/Logos/solidworks-logo.png"
            alt="SOLIDWORKS"
            className="h-8 sm:h-10 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/uploads/solidworks-logo.png';
            }}
          />
          {onOpenQrModal && (
            <button
              type="button"
              onClick={onOpenQrModal}
              title="Show Venue QR Code"
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition border border-slate-200"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="mt-6 px-2">
        <div className="w-12 h-1 bg-rose-600 rounded-full mb-3" />
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          I’m Part of <span className="text-rose-600">What’s Next</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1 font-medium">
          SOLIDWORKS Innovation Day 2026 · Create your post in under a minute.
        </p>
      </div>
    </header>
  );
}
