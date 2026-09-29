import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer, Copy, Check, QrCode } from 'lucide-react';

export default function VenueQrModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const svgRef = useRef(null);

  if (!isOpen) return null;

  // Dedicated to live network URL
  const liveUrl = import.meta.env.VITE_PUBLIC_URL ||
    (typeof window !== 'undefined' ? window.location.origin + window.location.pathname.replace(/\/+$/, '') : '');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDownloadPng = () => {
    const svgElement = svgRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // High resolution for venue print
    canvas.width = 1200;
    canvas.height = 1200;

    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1200, 1200);
      ctx.drawImage(img, 100, 100, 1000, 1000);

      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'SOLIDWORKS-Innovation-Day-2026-QR-Code.png';
      downloadLink.href = pngUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    window.open(`/standee.html?url=${encodeURIComponent(liveUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mb-2">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Event Venue QR Code</h3>
          <p className="text-xs text-slate-500 mt-1">
            Scan with any phone camera to create your post
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
          <div ref={svgRef} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
            <QRCodeSVG
              value={liveUrl}
              size={210}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Live Link with Copy */}
        <div className="mt-4 flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
          <span className="text-xs font-mono text-slate-700 truncate flex-1 select-all px-1">
            {liveUrl}
          </span>
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 shadow-sm transition flex items-center gap-1 flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleDownloadPng}
            className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm shadow-rose-600/25"
          >
            <Printer className="w-4 h-4" />
            <span>Print Standee</span>
          </button>
        </div>
      </div>
    </div>
  );
}
