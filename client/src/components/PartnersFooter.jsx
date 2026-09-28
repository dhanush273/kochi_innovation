import React, { useState, useEffect } from 'react';
import { Phone, Mail, X } from 'lucide-react';

const ECOSYSTEM_LOGOS = [
  {
    id: 'solidworks',
    name: '3DS SOLIDWORKS',
    render: () => (
     <img
      src="/Logos/solidworks-logo.png"
      alt="3DS SOLIDWORKS"
      className="h-12 sm:h-13 md:h-12 w-auto object-contain flex-shrink-0"
    />
    )
  },
  {
    id: '3dexperience',
    name: '3DEXPERIENCE',
    render: () => (
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <img
          src="/Logos/3DEXPERIENCE circle logo.png"
          alt="3DEXPERIENCE Compass"
          className="h-7 sm:h-8 md:h-8.5 w-auto object-contain flex-shrink-0"
        />
        <img
          src="/Logos/3DEXPERIENCE Logo (2).png"
          alt="3DEXPERIENCE"
          className="h-4 sm:h-4.5 md:h-5 w-auto object-contain"
        />
      </div>
    )
  },
  {
    id: 'bom-creator',
    name: 'BOM Creator',
    render: () => (
      <img
        src="/Logos/BOM-Creator.png"
        alt="BOM Creator"
        className="h-12 sm:h-13 md:h-12 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: 'cst-studio',
    name: 'CST STUDIO SUITE',
    render: () => (
     <img
      src="/Logos/JB_CST-Studio_LOGO.png"
      alt="CST STUDIO SUITE"
      className="h-12 sm:h-13 md:h-12 w-auto object-contain flex-shrink-0"
    />
    )
  },
  {
    id: 'solidworks-pdm',
    name: 'SOLIDWORKS PDM',
    render: () => (
      <img
        src="/Logos/SOLIDWORKS PDM Logo.png"
        alt="SOLIDWORKS PDM"
        className="h-6 sm:h-7 md:h-8 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: 'driveworks',
    name: 'DriveWorks',
    render: () => (
      <img
        src="/Logos/DriveWorks Logo-01.png"
        alt="DriveWorks"
        className="h-8 sm:h-9 md:h-10 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: 'solidworks-plastics',
    name: 'SOLIDWORKS Plastics',
    render: () => (
        <img
          src="/Logos/SOLIDWORKS Plastics.png"
          alt="SOLIDWORKS Plastics"
          className="h-14 sm:h-15 md:h-12 w-auto object-contain flex-shrink-0"
        />
    )
  },
  {
    id: 'simulia',
    name: '3DS SIMULIA',
    render: () => (
      <img
        src="/Logos/Simulia Abaqus logo.png"
        alt="3DS SIMULIA"
        className="h-9 sm:h-10 md:h-8.5 w-auto object-contain flex-shrink-0"
      />
    )
  },
];

export default function PartnersFooter({ partners, branding }) {
  const [showSupport, setShowSupport] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowSupport(false);
    };
    if (showSupport) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSupport]);

  return (
    <footer>
      {/* 1. Upper Section: Partners & Marquee Logos (PURE WHITE BACKGROUND, COMPACT) */}
      <div className="bg-white border-t border-slate-200 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            {/* Left: Our Event Partner SolidCAM (CONSTANT / STATIC) */}
            <div className="flex flex-col items-center lg:items-start gap-1 flex-shrink-0 z-10">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#00589a]">
                Our Event Partner
              </span>
              
              {/* SolidCAM Logo */}
              <div className="flex items-center group transition-transform duration-200 hover:scale-[1.02]">
                <div className="relative flex items-center">
                  <img
                    src="/Logos/SOLIDCAM Png Logo (Red Color).png"
                    alt="SolidCAM - The Leaders in Integrated CAM"
                    className="h-16 sm:h-18 md:h-16 w-auto max-w-[240px] sm:max-w-[260px] object-contain drop-shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Vertical Divider separating SolidCAM from marquee */}
            <div className="hidden lg:block w-px h-10 bg-slate-200 mx-2 lg:mx-4 flex-shrink-0 self-center"></div>

            {/* Right: Infinite Marquee for Ecosystem Logos on White Background */}
            <div className="flex-1 w-full min-w-0 overflow-hidden relative py-1">
              
              {/* Edge Fade Gradients for white background */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none hidden sm:block"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none hidden sm:block"></div>

              {/* Marquee Track */}
              <div className="animate-marquee flex items-center gap-7 sm:gap-9 lg:gap-11">
                {[0, 1].map((setIndex) => (
                  <div 
                    key={`marquee-set-${setIndex}`}
                    className="flex items-center gap-7 sm:gap-9 lg:gap-11 flex-shrink-0"
                    aria-hidden={setIndex === 1 ? 'true' : undefined}
                  >
                    {ECOSYSTEM_LOGOS.map((item) => (
                      <div 
                        key={`${item.id}-${setIndex}`}
                        className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0 cursor-pointer"
                      >
                        {item.render()}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Bottom Section: Copyright & Legal Strip with Contact Support (REFERENCE BLUE BACKGROUND) */}
      <div className="relative bg-[#00589a] text-white py-4 sm:py-5 border-t border-[#00487e] overflow-hidden">
        {/* Dynamic Angled Red Wing Accent matching the flyer */}
        <div 
          className="absolute top-0 right-0 h-full w-28 sm:w-40 md:w-56 bg-gradient-to-l from-red-600/90 to-brand-red pointer-events-none opacity-85 hidden sm:block"
          style={{ clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 0% 100%)' }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between text-xs text-blue-100/90 gap-4">
            <div>
              © 2026 {branding?.companyName || 'Conceptia KONNECT'}. All rights reserved. Authorized Reseller for Dassault Systèmes SOLIDWORKS.
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-5">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-blue-300/40">•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Registration</span>
              <span className="text-blue-300/40">•</span>
              {/* Contact Event Support Button (Opens modal on click) */}
              <button
                type="button"
                onClick={() => setShowSupport(true)}
                className="hover:text-white cursor-pointer transition-colors focus:outline-none"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Modal (Only visible when clicked) */}
      {showSupport && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowSupport(false)}
        >
          <div 
            className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>
                <h3 className="font-extrabold text-base text-slate-900">
                  Contact Support
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSupport(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2.5 mb-4">
              Have questions regarding registration, agenda, or venue? Reach out to our event support team:
            </p>

            {/* Contact Channels */}
            <div className="space-y-3">
              {/* Phone */}
              <a
                href="tel:+919590506408"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 hover:bg-red-50/70 border border-slate-100 hover:border-red-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 text-[#bb221a] flex items-center justify-center flex-shrink-0 group-hover:bg-[#bb221a] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4 fill-current" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#bb221a] transition-colors">
                    Call Support
                  </span>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-[#bb221a] transition-colors">
                    +91 9590 506 408
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:marketing@ckonnect.in"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 hover:bg-red-50/70 border border-slate-100 hover:border-red-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 text-[#bb221a] flex items-center justify-center flex-shrink-0 group-hover:bg-[#bb221a] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#bb221a] transition-colors">
                    Email Support
                  </span>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-[#bb221a] transition-colors truncate">
                    marketing@ckonnect.in
                  </span>
                </div>
              </a>
            </div>

            {/* Footer note */}
            <div className="mt-5 pt-3 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400">
                {branding?.companyName || 'Conceptia KONNECT'} • Authorized SOLIDWORKS Reseller
              </span>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}