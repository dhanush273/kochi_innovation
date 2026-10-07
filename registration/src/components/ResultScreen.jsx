import React, { useState } from 'react';
import { Download, Copy, Check, Share2, Sparkles, RefreshCw, Linkedin, Instagram, ArrowLeft } from 'lucide-react';
import CreativeCanvas from './CreativeCanvas.jsx';
import confetti from 'canvas-confetti';
import { getRandomCaption, getCaptionByIndex, CAPTION_TEMPLATES } from '../utils/captionGenerator.js';

export default function ResultScreen({ attendee, onReset }) {
  const [copied, setCopied] = useState(false);
  const [captionObj, setCaptionObj] = useState(() => getRandomCaption(attendee));
  const [creativeDataUrl, setCreativeDataUrl] = useState('');

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(captionObj.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const handleNextCaption = () => {
    setCaptionObj(getRandomCaption(attendee, captionObj.index));
  };

  const handleDownload = () => {
    if (!creativeDataUrl) return;
    const safeName = (attendee?.fullName || 'attendee').replace(/[^a-zA-Z0-9_-]/g, '_');
    const link = document.createElement('a');
    link.download = `SOLIDWORKS-Innovation-Day-2026-${safeName}.png`;
    link.href = creativeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Confetti celebration
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleShareToLinkedIn = async () => {
    // Auto-copy the caption so the user can easily paste it along with the downloaded creative
    try {
      await navigator.clipboard.writeText(captionObj.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }

    // Open LinkedIn post composer in new tab
    const linkedinUrl = 'https://www.linkedin.com/feed/?shareActive=true';
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Creative Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-col items-center">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4 text-center">
          Your Innovation Day Post is Ready!
        </h2>

        {/* 1080x1080 Master Creative Canvas Engine */}
        <CreativeCanvas
          attendee={attendee}
          onRenderComplete={(url) => setCreativeDataUrl(url)}
        />
      </div>

      {/* Caption Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Your Caption
          </label>
          <button
            type="button"
            onClick={handleNextCaption}
            title="Generate alternate caption copy"
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Alternate Copy</span>
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-sm text-slate-700 whitespace-pre-line leading-relaxed font-normal selection:bg-rose-500 selection:text-white">
          {captionObj.text}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-1">
        {/* Download Image Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={!creativeDataUrl}
          className="w-full py-4 px-6 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-red-600/25 transition flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          <span>Download Image</span>
        </button>

        {/* Share to LinkedIn Button */}
        <button
          type="button"
          onClick={handleShareToLinkedIn}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#0a66c2] hover:bg-[#084e96] active:scale-[0.99] text-white font-bold text-base shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2"
        >
          <Linkedin className="w-5 h-5 fill-current" />
          <span>Share to LinkedIn</span>
        </button>

        {/* Copy Caption Button */}
        <button
          type="button"
          onClick={handleCopyCaption}
          className="w-full py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-800 font-bold text-base transition flex items-center justify-center gap-2 border border-slate-200"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700">Caption Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 text-slate-600" />
              <span>Copy Caption</span>
            </>
          )}
        </button>
      </div>

      {/* Follow Us on Social Media */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Follow Us for Event Updates & Insights</span>
        </div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Connect with Conceptia Konnect on LinkedIn & Instagram for live event moments, highlights, and tech updates:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {/* Follow on LinkedIn */}
          <a
            href="https://www.linkedin.com/in/conceptiakonnectsolidworks/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 text-[#0a66c2] text-xs sm:text-sm font-bold border border-[#0a66c2]/20 transition active:scale-95"
          >
            <Linkedin className="w-4 h-4 fill-current" />
            <span>Follow on LinkedIn</span>
          </a>

          {/* Follow on Instagram */}
          <a
            href="https://www.instagram.com/conceptia_konnect/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-orange-500/20 text-[#e1306c] text-xs sm:text-sm font-bold border border-pink-200 transition active:scale-95"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>

      {/* Create Another Post Link */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition hover:underline"
        >
          Create Another Post
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center pt-2 pb-8 text-xs text-slate-400 font-medium">
        Hosted by Conceptia Konnect · #InnovationDay2026
      </footer>
    </div>
  );
}
