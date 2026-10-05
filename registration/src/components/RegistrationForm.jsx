import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Plus, Upload, Check, AlertCircle, Sparkles, User, RefreshCw, Bot } from 'lucide-react';
import { getRandomAiProfile } from '../utils/aiDemoProfiles.js';

export default function RegistrationForm({ onSubmit, isSubmitting }) {
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState('');

  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

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
    const ai = getRandomAiProfile();
    setFullName(ai.fullName);
    setDesignation(ai.designation);
    setCompanyName(ai.companyName);
    setPhotoPreview(ai.photoUrl);
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
          className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 transition hover:bg-rose-100 shadow-sm"
          title="Autofill with random AI attendee profile"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          Fill with Demo (Random AI)
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
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Your Photo <span className="text-rose-500">*</span>
          </label>

          {/* Hidden Inputs */}
          {/* Gallery / Photos Picker (NO capture attribute - opens mobile photo gallery/files) */}
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoSelect}
          />
          {/* Dedicated Camera Trigger */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={handlePhotoSelect}
          />

          {!photoPreview ? (
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                {/* Choose from Gallery Button */}
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-sky-200 hover:border-sky-400 bg-sky-50/50 hover:bg-sky-50 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-sky-100 group-hover:scale-105 text-sky-600 flex items-center justify-center transition mb-2">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition">
                    Upload from Gallery
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    Photos, Library & Files
                  </span>
                </button>

                {/* Take Photo with Camera Button */}
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-50 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-rose-100 group-hover:scale-105 text-rose-600 flex items-center justify-center transition mb-2">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition">
                    Take a Photo
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    Use Phone Camera
                  </span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                Front-facing portrait photo works best for your personalized creative
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-3 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 bg-white shadow-sm">
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
                  Change or take a new photo below
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition shadow-sm"
                >
                  Gallery
                </button>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-100 transition"
                >
                  Camera
                </button>
              </div>
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
