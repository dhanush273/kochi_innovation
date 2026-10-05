import React, { useEffect, useRef, useState } from 'react';
import { Download, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_AI_AVATAR } from '../utils/aiDemoProfiles.js';

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
  const photoUrl = attendee?.photoUrl || DEFAULT_AI_AVATAR;

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
          const loadF = async (name, url, weight) => {
            const font = new FontFace(name, `url("${url}")`, { weight, style: 'normal' });
            const res = await font.load();
            document.fonts.add(res);
            return res;
          };
          await Promise.all([
            loadF('ThreeDS', '/fonts/3ds-bold.otf', '800'),
            loadF('ThreeDS', '/fonts/3ds-bold.otf', '700'),
            loadF('ThreeDS', '/fonts/3ds-semibold.otf', '600'),
            loadF('ThreeDS', '/fonts/3ds-regular.otf', '400'),
            loadF('3DS', '/fonts/3ds-bold.otf', '800'),
            loadF('3DS', '/fonts/3ds-bold.otf', '700'),
            loadF('3DS', '/fonts/3ds-semibold.otf', '600'),
            loadF('3DS', '/fonts/3ds-regular.otf', '400')
          ]);
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

      // 3. TOP BRANDING BAR (Substantially Increased Logo Sizes - Tightly Trimmed)
      // Conceptia Konnect Logo (Left)
      if (ckLogo) {
        // Source crop to remove transparent padding if full-res asset (11622x3600)
        const sx = ckLogo.width > 5000 ? 436 : 0;
        const sy = ckLogo.width > 5000 ? 998 : 0;
        const sw = ckLogo.width > 5000 ? 11122 : ckLogo.width;
        const sh = ckLogo.width > 5000 ? 1698 : ckLogo.height;
        const aspect = sw / sh;
        const targetH = 64; // Decreased by 4px from 68
        const targetW = targetH * aspect;
        ctx.drawImage(ckLogo, sx, sy, sw, sh, 65, 48, Math.min(targetW, 440), targetH);
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 30px ThreeDS, "3DS", sans-serif';
        ctx.fillText('Conceptia KONNECT', 65, 88);
      }

      // White 3DS SOLIDWORKS Logo (Right)
      if (swLogo) {
        // Source crop to remove transparent padding if full-res asset (3317x1671)
        const sx = swLogo.width > 2000 ? 233 : 0;
        const sy = swLogo.width > 2000 ? 543 : 0;
        const sw = swLogo.width > 2000 ? 2850 : swLogo.width;
        const sh = swLogo.width > 2000 ? 588 : swLogo.height;
        const aspect = sw / sh;
        const targetH = 60; // Decreased by 4px from 64
        const targetW = targetH * aspect;
        const swImgX = 1015 - targetW;
        ctx.drawImage(swLogo, sx, sy, sw, sh, swImgX, 50, targetW, targetH);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 30px ThreeDS, "3DS", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('3DS SOLIDWORKS', 1015, 88);
        ctx.textAlign = 'left';
      }

      // 4. MAIN HEADLINE SECTION
      // Red Horizontal Accent Bar
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(65, 170, 38, 5);

      // "— I'M AT" text in 3DS font
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 26px ThreeDS, "3DS", sans-serif';
      ctx.fillText("I'M AT", 116, 177);

      // Headline Line 1: SOLIDWORKS (Decreased font size)
      ctx.fillStyle = '#0a192f';
      ctx.font = '800 64px ThreeDS, "3DS", sans-serif';
      ctx.fillText('SOLIDWORKS', 65, 252);

      // Headline Line 2: INNOVATION DAY 2026 (One Line)
      const textGrad = ctx.createLinearGradient(65, 285, 540, 322);
      textGrad.addColorStop(0, '#e11d48');
      textGrad.addColorStop(1, '#ea580c');
      ctx.fillStyle = textGrad;
      ctx.font = '800 58px ThreeDS, "3DS", sans-serif';
      ctx.fillText('INNOVATION DAY', 65, 322);

      const innoWidth = ctx.measureText('INNOVATION DAY ').width;
      ctx.fillStyle = '#2563eb';
      ctx.fillText('2026', 65 + innoWidth, 322);

      // 5. ATTENDEE PHOTO & DETAILS SECTION
      const photoX = 68;
      const photoY = 445;
      const photoSize = 390;
      const cornerR = 36;

      // Layer 1: Electric Blue Card tilted counter-clockwise (-12 degrees) peeking out at top-left
      ctx.save();
      ctx.translate(photoX + 50, photoY + 55);
      ctx.rotate((-12 * Math.PI) / 180);
      ctx.fillStyle = '#1d63ff'; // Electric royal blue matching reference
      ctx.beginPath();
      ctx.roundRect(-90, -85, 240, 240, 42);
      ctx.fill();
      ctx.restore();

      // Layer 2: Vibrant Warm Orange Card peeking out at bottom-right
      ctx.save();
      const orangeGrad = ctx.createLinearGradient(photoX + 38, photoY + 38, photoX + photoSize + 38, photoY + photoSize + 38);
      orangeGrad.addColorStop(0, '#f97316');
      orangeGrad.addColorStop(1, '#ea580c');
      ctx.fillStyle = orangeGrad;
      ctx.beginPath();
      ctx.roundRect(photoX + 38, photoY + 38, photoSize, photoSize, 42);
      ctx.fill();

      // Subtle horizontal accent line extending from orange card towards right
      ctx.strokeStyle = 'rgba(234, 88, 12, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(photoX + photoSize + 38, photoY + photoSize * 0.72);
      ctx.lineTo(photoX + photoSize + 115, photoY + photoSize * 0.72);
      ctx.stroke();
      ctx.restore();

      // Layer 3: Main Photo Card with soft drop shadow
      ctx.save();
      ctx.shadowColor = 'rgba(15, 23, 42, 0.18)';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 10;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoSize, photoSize, cornerR);
      ctx.fill();
      ctx.restore();

      // Crisp White Border (12px)
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoSize, photoSize, cornerR);
      ctx.stroke();
      ctx.restore();

      // Clip attendee photo inside rounded rect with matching inner radius
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX + 6, photoY + 6, photoSize - 12, photoSize - 12, cornerR - 4);
      ctx.clip();

      if (attendeePhoto) {
        // Draw photo centered with aspect-fill cover
        const imgW = attendeePhoto.width;
        const imgH = attendeePhoto.height;
        const boxSize = photoSize - 12;
        const scale = Math.max(boxSize / imgW, boxSize / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const drawX = (photoX + 6) + (boxSize - drawW) / 2;
        const drawY = (photoY + 6) + (boxSize - drawH) / 2;
        ctx.drawImage(attendeePhoto, drawX, drawY, drawW, drawH);
      } else {
        // Fallback placeholder
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(photoX, photoY, photoSize, photoSize);
        ctx.fillStyle = '#64748b';
        ctx.font = '700 24px ThreeDS, "3DS", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Attendee Photo', photoX + photoSize / 2, photoY + photoSize / 2);
      }
      ctx.restore();

      // 6. ATTENDEE DETAILS SECTION (Right of Photo)
      const detailX = 525;

      // Orange horizontal accent pill
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.roundRect(detailX, 470, 48, 5, 2.5);
      ctx.fill();

      // Name (3DS font with dynamic sizing)
      ctx.fillStyle = '#0f172a';
      let nameFontSize = 52;
      if (fullName.length > 20) {
        nameFontSize = 38;
      } else if (fullName.length > 15) {
        nameFontSize = 44;
      }
      ctx.font = `800 ${nameFontSize}px ThreeDS, "3DS", sans-serif`;
      ctx.fillText(fullName, detailX, 530);

      // Designation
      ctx.fillStyle = '#475569';
      let desigFontSize = 28;
      if (designation.length > 28) {
        desigFontSize = 22;
      }
      ctx.font = `600 ${desigFontSize}px ThreeDS, "3DS", sans-serif`;
      ctx.fillText(designation, detailX, 574);

      // Company
      ctx.fillStyle = '#ea580c';
      let compFontSize = 28;
      if (companyName.length > 25) {
        compFontSize = 22;
      }
      ctx.font = `800 ${compFontSize}px ThreeDS, "3DS", sans-serif`;
      ctx.fillText(companyName, detailX, 616);

      // Sub-Block: A DAY OF INNOVATION • INSIGHTS • CONNECTIONS
      const blockY = 684;
      ctx.fillStyle = '#64748b';
      ctx.font = '800 13px ThreeDS, "3DS", sans-serif';
      ctx.letterSpacing = '2.5px';
      ctx.fillText('A DAY OF', detailX, blockY);

      // Reset letterSpacing for the three words and dots
      ctx.letterSpacing = '0px';
      const titleY = blockY + 28;
      const underlineY = titleY + 8;
      const underlineHeight = 3.5;

      ctx.font = '800 21px ThreeDS, "3DS", sans-serif';

      // 1. INNOVATION (with Red/Coral Underline)
      let curX = detailX;
      ctx.fillStyle = '#0f172a';
      ctx.fillText('INNOVATION', curX, titleY);
      const wInnovation = ctx.measureText('INNOVATION').width;
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(curX, underlineY, wInnovation, underlineHeight);
      curX += wInnovation + 9;

      // Orange dot bullet
      ctx.fillStyle = '#ea580c';
      ctx.fillText('•', curX, titleY);
      const wDot1 = ctx.measureText('•').width;
      curX += wDot1 + 9;

      // 2. INSIGHTS (with Navy Underline)
      ctx.fillStyle = '#0f172a';
      ctx.fillText('INSIGHTS', curX, titleY);
      const wInsights = ctx.measureText('INSIGHTS').width;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(curX, underlineY, wInsights, underlineHeight);
      curX += wInsights + 9;

      // Blue dot bullet
      ctx.fillStyle = '#2563eb';
      ctx.fillText('•', curX, titleY);
      const wDot2 = ctx.measureText('•').width;
      curX += wDot2 + 9;

      // 3. CONNECTIONS (with Electric Blue Underline)
      ctx.fillStyle = '#0f172a';
      ctx.fillText('CONNECTIONS', curX, titleY);
      const wConnections = ctx.measureText('CONNECTIONS').width;
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(curX, underlineY, wConnections, underlineHeight);

      // Hosted by Conceptia Konnect (under A DAY OF INNOVATION · INSIGHTS · CONNECTIONS)
      ctx.fillStyle = '#64748b';
      ctx.font = '600 18px ThreeDS, "3DS", sans-serif';
      ctx.fillText('Hosted by ', detailX, blockY + 64);
      const wHosted = ctx.measureText('Hosted by ').width;
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 19px ThreeDS, "3DS", sans-serif';
      ctx.fillText('Conceptia Konnect', detailX + wHosted, blockY + 64);

      // 7. BOTTOM FOOTER BAR
      // Divider line
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(68, 995);
      ctx.lineTo(1012, 995);
      ctx.stroke();

      // Left: #SOLIDWORKS
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 24px ThreeDS, "3DS", sans-serif';
      ctx.fillText('#SOLIDWORKS', 68, 1038);

      // Right: #InnovationDay2026
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 24px ThreeDS, "3DS", sans-serif';
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
