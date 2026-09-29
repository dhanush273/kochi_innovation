import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer, Copy, Check, Wifi, Globe, Edit2 } from 'lucide-react';

export default function VenueQrModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Auto-detect production / Vercel URL or local development
  const envPublicUrl = import.meta.env.VITE_PUBLIC_URL || '';
  const localWifiIp = '192.168.5.124';

  const getInitialUrl = () => {
    if (envPublicUrl) return envPublicUrl;
    if (typeof window !== 'undefined') {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalhost) {
        return `http://${localWifiIp}:3002`;
      }
      // On Vercel or any live domain: automatically use the exact live origin + pathname
      return window.location.origin + window.location.pathname.replace(/\/+$/, '');
    }
    return `http://${localWifiIp}:3002`;
  };

  const [qrUrl, setQrUrl] = useState(getInitialUrl);
  const svgRef = useRef(null);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl);
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

    // High-resolution for print (1200 x 1200)
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
    window.open(`/standee.html?url=${encodeURIComponent(qrUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mb-2">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Event Venue QR Code</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Attendees scan this QR code with their mobile cameras to create their post.
          </p>
        </div>

        {/* QR Code Graphic Box */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
          <div ref={svgRef} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <QRCodeSVG
              value={qrUrl}
              size={220}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-xs font-semibold text-slate-600 mt-3 text-center flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-rose-600" />
            <span>Scan with any smartphone camera</span>
          </p>
        </div>

        {/* Target URL Selector / Editor */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Encoded Destination Link</span>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="text-rose-600 hover:text-rose-700 flex items-center gap-1 normal-case font-semibold text-xs"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEditing ? 'Done' : 'Change URL'}</span>
            </button>
          </div>

          {isEditing ? (
            <input
              type="url"
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              placeholder="https://your-domain.com"
              className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white border border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-800"
            />
          ) : (
            <div className="flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={qrUrl}
                className="bg-transparent text-xs text-slate-600 flex-1 outline-none font-mono truncate select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-sm transition flex items-center gap-1 flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}

          {/* Presets */}
          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
            <button
              type="button"
              onClick={() => setQrUrl(typeof window !== 'undefined' ? window.location.origin + window.location.pathname.replace(/\/+$/, '') : '')}
              className={`px-2.5 py-1 rounded-lg border transition ${
                typeof window !== 'undefined' && qrUrl === (window.location.origin + window.location.pathname.replace(/\/+$/, ''))
                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🌐 Live Link ({typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? window.location.hostname : 'Current'})
            </button>
            {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
              <button
                type="button"
                onClick={() => setQrUrl(`http://${localWifiIp}:3002`)}
                className={`px-2.5 py-1 rounded-lg border transition ${
                  qrUrl === `http://${localWifiIp}:3002`
                    ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                📶 Local Wi-Fi ({localWifiIp}:3002)
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleDownloadPng}
            className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm shadow-rose-600/25"
          >
            <Printer className="w-4 h-4" />
            <span>Print Standee</span>
          </button>
        </div>
      </div>
    </div>
  );
}
