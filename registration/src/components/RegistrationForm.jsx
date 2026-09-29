import React, { useState, useRef } from 'react';
import { Camera, Plus, Upload, Check, AlertCircle, Sparkles, User, RefreshCw } from 'lucide-react';

export default function RegistrationForm({ onSubmit, isSubmitting }) {
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, or WEBP).');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setError('Photo size should be less than 12MB.');
      return;
    }

    setError('');
    setPhotoFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUseDemo = () => {
    setFullName('Ramesh Aravind');
    setDesignation('Design Engineer');
    setCompanyName('Conceptia Konnect');
    setPhotoPreview('/people/ramesh.jpg');
    setPhotoFile(null);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!designation.trim()) {
      setError('Please enter your designation.');
      return;
    }

    if (!companyName.trim()) {
      setError('Please enter your company name.');
      return;
    }

    if (!photoPreview) {
      setError('Please upload your photo to personalize your creative.');
      return;
    }

    setError('');
    onSubmit({
      fullName: fullName.trim(),
      designation: designation.trim(),
      companyName: companyName.trim(),
      photoUrl: photoPreview,
      photoFile
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Quick Demo Autofill Hint */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={handleUseDemo}
          className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 transition hover:bg-rose-100"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Fill with Demo Attendee (Ramesh)
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Harshita K S"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm font-medium transition"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Designation <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Design Engineer"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm font-medium transition"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Company <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Conceptia Konnect"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm font-medium transition"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Your Photo <span className="text-rose-500">*</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={handlePhotoSelect}
          />

          {!photoPreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-sky-200 hover:border-sky-300 bg-sky-50/30 hover:bg-sky-50/70 rounded-2xl p-4 sm:p-5 flex items-center gap-4 cursor-pointer transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-rose-50 group-hover:text-rose-600 text-slate-600 flex items-center justify-center transition flex-shrink-0">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-rose-600 transition">
                  Take or upload a photo
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Clear, front-facing works best
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-3 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 bg-white">
                <img
                  src={photoPreview}
                  alt="Selected Attendee"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>Photo Ready</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  Tap below to choose a different photo
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition"
              >
                Change
              </button>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-orange-500/25 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Generating Post...</span>
            </>
          ) : (
            <span>Create My Post</span>
          )}
        </button>
      </form>

      {/* Footer */}
      <footer className="text-center mt-6 text-xs text-slate-400 font-medium pb-8">
        Hosted by Conceptia Konnect · #InnovationDay2026
      </footer>
    </div>
  );
}
