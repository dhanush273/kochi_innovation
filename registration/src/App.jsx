import React, { useState } from 'react';
import Header from './components/Header.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import VenueQrModal from './components/VenueQrModal.jsx';

export default function App() {
  const [step, setStep] = useState('form'); // 'form' | 'result'
  const [attendee, setAttendee] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    let uploadedPhotoUrl = formData.photoUrl;
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

    try {
      // 1. If a local file was uploaded, upload to server's /api/upload
      if (formData.photoFile) {
        const bodyFormData = new FormData();
        bodyFormData.append('image', formData.photoFile);

        try {
          const uploadRes = await fetch(`${apiBase}/api/upload`, {
            method: 'POST',
            body: bodyFormData
          });
          const uploadJson = await uploadRes.json();
          if (uploadJson.success && uploadJson.url) {
            uploadedPhotoUrl = uploadJson.url;
          }
        } catch (uploadErr) {
          console.warn('Backend image upload skipped, using local data URL:', uploadErr);
        }
      }

      // 2. Persist post data to MongoDB via /api/social-posts
      try {
        await fetch(`${apiBase}/api/social-posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            designation: formData.designation,
            companyName: formData.companyName,
            photoUrl: uploadedPhotoUrl
          })
        });
      } catch (postErr) {
        console.warn('Could not reach MongoDB endpoint, continuing smoothly:', postErr);
      }
    } catch (err) {
      console.warn('Submission error:', err);
    } finally {
      setAttendee({
        ...formData,
        photoUrl: uploadedPhotoUrl
      });
      setIsSubmitting(false);
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setAttendee(null);
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 flex flex-col justify-between">
      <div className="w-full">
        {/* Header Branding */}
        <Header onOpenQrModal={() => setIsQrModalOpen(true)} />

        {/* Dynamic Content: Form vs Result */}
        <main className="w-full">
          {step === 'form' ? (
            <RegistrationForm
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          ) : (
            <ResultScreen
              attendee={attendee}
              onReset={handleReset}
            />
          )}
        </main>
      </div>

      {/* Venue QR Code Modal for Organizers & Venue Screens */}
      <VenueQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />
    </div>
  );
}
