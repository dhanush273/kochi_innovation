import React, { useEffect, useRef, useState } from 'react';
import { Download, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Canvas-based generator for the official 1080x1080 SOLIDWORKS Innovation Day 2026 creative.
 * Uses official Dassault 3DS typography, enlarged logos, and no oval container.
 */
export default function CreativeCanvas({ attendee, onRenderComplete }) {
  const canvasRef = useRef(null);
  const [isRendering, setIsRendering] = useState(true);
  const [dataUrl, setDataUrl] = useState('');

  const fullName = attendee?.fullName || 'Attendee Name';
  const designation = attendee?.designation || 'Design Engineer';
  const companyName = attendee?.companyName || 'Conceptia Konnect';
  const photoUrl = attendee?.photoUrl || '/people/ramesh.jpg';

  useEffect(() => {
    let isMounted = true;

    async function drawCanvas() {
      setIsRendering(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Ensure 3DS Fonts are loaded into the document and canvas context
      if (typeof FontFace !== 'undefined') {
        try {
          const fBold = new FontFace('3DS', 'url("/3DS Fonts/3DS BOLD.OTF")', { weight: '800' });
          const fSemi = new FontFace('3DS', 'url("/3DS Fonts/3DS SEMIBOLD.OTF")', { weight: '600' });
          const fReg = new FontFace('3DS', 'url("/3DS Fonts/3DS REGULAR.OTF")', { weight: '400' });
          const loaded = await Promise.all([fBold.load(), fSemi.load(), fReg.load()]);
          loaded.forEach(font => document.fonts.add(font));
          await document.fonts.ready;
        } catch (e) {
          console.warn('3DS Font Face loading notice:', e);
        }
      }

      // Helper to load image
      const loadImage = (src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.warn('Failed to load image:', src);
            resolve(null);
          };
          img.src = src;
        });
      };

      // Load logos & attendee photo
      const [ckLogo, swLogo, attendeePhoto] = await Promise.all([
        loadImage('/Logos/conceptia-konnect-logo.png'),
        loadImage('/Logos/solidworks-white-logo.png').then(img => img || loadImage('/Logos/solidworks-logo.png')),
        loadImage(photoUrl)
      ]);

      if (!isMounted) return;

      // 1. BASE BACKGROUND: Pristine White
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1080, 1080);

      // 2. BACKGROUND GRAPHICS & ACCENTS
      // Top-Right Radial / Curved Gradient Swoosh
      const topGrad = ctx.createRadialGradient(980, 120, 50, 850, 200, 600);
      topGrad.addColorStop(0, 'rgba(234, 88, 12, 0.9)');    // Conceptia warm orange
      topGrad.addColorStop(0.35, 'rgba(249, 115, 22, 0.55)');
      topGrad.addColorStop(0.7, 'rgba(254, 215, 170, 0.2)');
      topGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(400, 0, 680, 650);

      // Faint CAD Blueprint grid in bottom-right
      ctx.save();
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.7)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 700; x <= 1040; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 700);
        ctx.lineTo(x, 960);
        ctx.stroke();
      }
      for (let y = 700; y <= 960; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(700, y);
        ctx.lineTo(1040, y);
        ctx.stroke();
      }
      ctx.restore();

      // Top-Right 3D Isometric CAD Wireframe Cube
      ctx.save();
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.65)';
      ctx.lineWidth = 2.5;
      const cubeCenterX = 860;
      const cubeCenterY = 225;
      const cubeW = 68;
      const cubeH = 40;
      const cubeDepth = 52;

      // Top Face
      ctx.beginPath();
      ctx.moveTo(cubeCenterX, cubeCenterY - cubeDepth);
      ctx.lineTo(cubeCenterX + cubeW, cubeCenterY - cubeDepth + cubeH * 0.5);
      ctx.lineTo(cubeCenterX, cubeCenterY - cubeDepth + cubeH);
      ctx.lineTo(cubeCenterX - cubeW, cubeCenterY - cubeDepth + cubeH * 0.5);
      ctx.closePath();
      ctx.stroke();

      // Front-Right Face
      ctx.beginPath();
      ctx.moveTo(cubeCenterX + cubeW, cubeCenterY - cubeDepth + cubeH * 0.5);
      ctx.lineTo(cubeCenterX + cubeW, cubeCenterY + cubeH * 0.5);
      ctx.lineTo(cubeCenterX, cubeCenterY + cubeH);
      ctx.lineTo(cubeCenterX, cubeCenterY - cubeDepth + cubeH);
      ctx.stroke();

      // Front-Left Face
      ctx.beginPath();
      ctx.moveTo(cubeCenterX - cubeW, cubeCenterY - cubeDepth + cubeH * 0.5);
      ctx.lineTo(cubeCenterX - cubeW, cubeCenterY + cubeH * 0.5);
      ctx.lineTo(cubeCenterX, cubeCenterY + cubeH);
      ctx.stroke();
      ctx.restore();

      // Concentric Radar / CAD Coordinate Arcs
      ctx.save();
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.85)';
      ctx.lineWidth = 1.5;
      const arcCenterX = 880;
      const arcCenterY = 460;

      [180, 260, 340, 420].forEach((r, idx) => {
        ctx.beginPath();
        if (idx % 2 === 1) {
          ctx.setLineDash([4, 6]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.arc(arcCenterX, arcCenterY, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Active Radar Node Dot (Electric Blue)
      ctx.beginPath();
      ctx.arc(arcCenterX - 75, arcCenterY - 30, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.fill();
      ctx.restore();

      // Subtle curved red accent lines
      ctx.save();
      ctx.strokeStyle = 'rgba(225, 29, 72, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(560, 0);
      ctx.bezierCurveTo(570, 220, 680, 360, 1080, 450);
      ctx.stroke();
      ctx.restore();

      // 3. TOP BRANDING BAR (Enlarged Logo Sizes & White DS SOLIDWORKS Logo)
      // Conceptia Konnect Logo (Left) - Substantially Enlarged
      if (ckLogo) {
        const logoAspect = ckLogo.width / ckLogo.height;
        const targetH = 82;
        const targetW = targetH * logoAspect;
        ctx.drawImage(ckLogo, 65, 38, Math.min(targetW, 420), targetH);
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 32px "3DS", sans-serif';
        ctx.fillText('Conceptia KONNECT', 65, 88);
      }

      // White 3DS SOLIDWORKS Logo (Right) - Substantially Enlarged, High Contrast on Orange Gradient
      if (swLogo) {
        const swAspect = swLogo.width / swLogo.height;
        const targetH = 76;
        const targetW = targetH * swAspect;
        const swImgX = 1015 - targetW;
        const swImgY = 40;
        ctx.drawImage(swLogo, swImgX, swImgY, targetW, targetH);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 32px "3DS", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('3DS SOLIDWORKS', 1015, 88);
        ctx.textAlign = 'left';
      }

      // 4. MAIN HEADLINE SECTION (Without "2026 EDITION")
      // Red Horizontal Accent Bar
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(65, 178, 42, 6);

      // "— I'M AT" text in 3DS font
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 30px "3DS", sans-serif';
      ctx.fillText("I'M AT", 122, 186);

      // Headline Line 1: SOLIDWORKS
      ctx.fillStyle = '#0a192f';
      ctx.font = '800 78px "3DS", sans-serif';
      ctx.fillText('SOLIDWORKS', 65, 272);

      // Headline Line 2: INNOVATION DAY (with vibrant red-orange gradient)
      const textGrad = ctx.createLinearGradient(65, 305, 750, 350);
      textGrad.addColorStop(0, '#e11d48');
      textGrad.addColorStop(1, '#ea580c');
      ctx.fillStyle = textGrad;
      ctx.font = '800 78px "3DS", sans-serif';
      ctx.fillText('INNOVATION DAY', 65, 354);

      // Headline Line 3: "2026" in Electric Blue + "Hosted by Conceptia Konnect"
      ctx.fillStyle = '#2563eb';
      ctx.font = '800 84px "3DS", sans-serif';
      ctx.fillText('2026', 65, 442);

      // "Hosted by" & "Conceptia Konnect" beside 2026
      ctx.fillStyle = '#64748b';
      ctx.font = '600 22px "3DS", sans-serif';
      ctx.fillText('Hosted by', 295, 410);

      ctx.fillStyle = '#0f172a';
      ctx.font = '800 30px "3DS", sans-serif';
      ctx.fillText('Conceptia Konnect', 295, 442);

      // 5. ATTENDEE PHOTO & DETAILS SECTION
      const photoX = 68;
      const photoY = 485;
      const photoSize = 390;
      const cornerR = 34;

      // Layer 1: Vibrant Electric Blue Card (peeking top-left)
      ctx.save();
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.roundRect(photoX - 24, photoY - 22, 230, 230, 38);
      ctx.fill();
      ctx.restore();

      // Layer 2: Vibrant Warm Orange Card (peeking bottom-right)
      ctx.save();
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.roundRect(photoX + 42, photoY + 45, photoSize, photoSize, 44);
      ctx.fill();
      ctx.restore();

      // Layer 3: Main Photo Card with soft shadow & crisp white border
      ctx.save();
      ctx.shadowColor = 'rgba(15, 23, 42, 0.16)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoSize, photoSize, cornerR);
      ctx.fill();
      ctx.restore();

      // Border stroke
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoSize, photoSize, cornerR);
      ctx.stroke();
      ctx.restore();

      // Clip attendee photo inside rounded rect
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX + 5, photoY + 5, photoSize - 10, photoSize - 10, cornerR - 3);
      ctx.clip();

      if (attendeePhoto) {
        // Draw photo centered with aspect-fill cover
        const imgW = attendeePhoto.width;
        const imgH = attendeePhoto.height;
        const boxSize = photoSize - 10;
        const scale = Math.max(boxSize / imgW, boxSize / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const drawX = (photoX + 5) + (boxSize - drawW) / 2;
        const drawY = (photoY + 5) + (boxSize - drawH) / 2;
        ctx.drawImage(attendeePhoto, drawX, drawY, drawW, drawH);
      } else {
        // Fallback placeholder
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(photoX, photoY, photoSize, photoSize);
        ctx.fillStyle = '#64748b';
        ctx.font = '700 24px "3DS", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Attendee Photo', photoX + photoSize / 2, photoY + photoSize / 2);
      }
      ctx.restore();

      // 6. ATTENDEE DETAILS SECTION (Right of Photo)
      const detailX = 525;

      // Orange horizontal accent line
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(detailX, 510, 50, 5);

      // Name (3DS font with dynamic sizing)
      ctx.fillStyle = '#0f172a';
      let nameFontSize = 48;
      if (fullName.length > 20) {
        nameFontSize = 36;
      } else if (fullName.length > 15) {
        nameFontSize = 40;
      }
      ctx.font = `800 ${nameFontSize}px "3DS", sans-serif`;
      ctx.fillText(fullName, detailX, 565);

      // Designation
      ctx.fillStyle = '#475569';
      let desigFontSize = 26;
      if (designation.length > 28) {
        desigFontSize = 21;
      }
      ctx.font = `600 ${desigFontSize}px "3DS", sans-serif`;
      ctx.fillText(designation, detailX, 612);

      // Company
      ctx.fillStyle = '#ea580c';
      let compFontSize = 28;
      if (companyName.length > 25) {
        compFontSize = 22;
      }
      ctx.font = `800 ${compFontSize}px "3DS", sans-serif`;
      ctx.fillText(companyName, detailX, 655);

      // Sub-Block: A DAY OF INNOVATION • INSIGHTS • CONNECTIONS
      const blockY = 720;
      ctx.fillStyle = '#64748b';
      ctx.font = '800 13px "3DS", sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('A DAY OF', detailX, blockY);

      ctx.fillStyle = '#0f172a';
      ctx.font = '800 21px "3DS", sans-serif';
      ctx.fillText('INNOVATION  •  INSIGHTS  •  CONNECTIONS', detailX, blockY + 28);

      // Underline below title
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(detailX, blockY + 36, 420, 2);

      // Supporting tagline lines
      ctx.fillStyle = '#64748b';
      ctx.font = '500 17px "3DS", sans-serif';
      ctx.fillText('Exploring new possibilities in design, engineering and', detailX, blockY + 66);
      ctx.fillText('product development.', detailX, blockY + 92);

      // 7. BOTTOM FOOTER BAR
      // Divider line
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(68, 995);
      ctx.lineTo(1012, 995);
      ctx.stroke();

      // Left: Hosted by Conceptia Konnect
      ctx.fillStyle = '#475569';
      ctx.font = '600 22px "3DS", sans-serif';
      ctx.fillText('Hosted by Conceptia Konnect', 68, 1038);

      // Right: #InnovationDay2026
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 24px "3DS", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('#InnovationDay2026', 1012, 1038);
      ctx.textAlign = 'left'; // reset

      // Bottom 6px Gradient Accent Bar
      const bottomGrad = ctx.createLinearGradient(0, 1074, 1080, 1074);
      bottomGrad.addColorStop(0, '#2563eb');
      bottomGrad.addColorStop(0.5, '#ea580c');
      bottomGrad.addColorStop(1, '#e11d48');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, 1074, 1080, 6);

      // Generate Data URL for preview and download
      const generatedUrl = canvas.toDataURL('image/png', 1.0);
      setDataUrl(generatedUrl);
      setIsRendering(false);

      if (onRenderComplete) {
        onRenderComplete(generatedUrl);
      }
    }

    drawCanvas();

    return () => {
      isMounted = false;
    };
  }, [fullName, designation, companyName, photoUrl]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const safeName = (fullName || 'attendee').replace(/[^a-zA-Z0-9_-]/g, '_');
    const link = document.createElement('a');
    link.download = `SOLIDWORKS-Innovation-Day-2026-${safeName}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Celebrate with confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hidden Master Canvas rendering 1080x1080 full resolution */}
      <canvas
        ref={canvasRef}
        width={1080}
        height={1080}
        className="hidden"
      />

      {/* Responsive Preview Container */}
      <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
        {isRendering ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
            <span className="text-sm font-semibold tracking-wide">Composing 1080×1080 Creative...</span>
          </div>
        ) : (
          <img
            src={dataUrl}
            alt="Personalized SOLIDWORKS Innovation Day Post"
            className="w-full h-full object-contain select-none"
          />
        )}
      </div>
    </div>
  );
}
