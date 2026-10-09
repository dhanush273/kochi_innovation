const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://kochi-innovation.onrender.com';

/**
 * Resolves an asset URL properly whether hosted on Vercel, Netlify, or Render.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Ensure leading slash
  let clean = path.startsWith('/') ? path : `/${path}`;
  
  // Auto-replace .jfif with .jpg
  clean = clean.replace(/\.jfif$/i, '.jpg');

  return clean;
}

/**
 * Multi-layer image error handler that attempts alternative locations
 * (e.g. backend host, /Logos/ vs /uploads/, .jpg vs .jfif) before falling back.
 */
export function handleImageFallback(e, defaultFallback) {
  const img = e.currentTarget || e.target;
  if (!img) return;

  const currentSrc = img.getAttribute('src') || '';
  const attempts = Number(img.dataset.failCount || 0);
  img.dataset.failCount = attempts + 1;

  // Attempt 1: If it was .jfif, try .jpg
  if (attempts === 0 && currentSrc.includes('.jfif')) {
    img.src = currentSrc.replace(/\.jfif/i, '.jpg');
    return;
  }

  // Attempt 2: Try space vs hyphen in filename
  if (attempts <= 1 && currentSrc.includes('-')) {
    img.src = currentSrc.replace(/-/g, ' ');
    return;
  }
  if (attempts <= 1 && (currentSrc.includes('%20') || currentSrc.includes(' '))) {
    img.src = currentSrc.replace(/(%20|\s)+/g, '-');
    return;
  }

  // Attempt 3: If /uploads/ failed, try /people/ or /Logos/
  if (attempts <= 2 && currentSrc.includes('/uploads/')) {
    img.src = currentSrc.replace('/uploads/', '/people/');
    return;
  }

  // Attempt 4: If relative path failed on frontend CDN/Vercel, try backend Render host
  if (attempts <= 3 && currentSrc.startsWith('/')) {
    img.src = `${BACKEND_URL}${currentSrc}`;
    return;
  }

  // Final Attempt: Use default fallback or SVG avatar fallback
  img.onerror = null;
  const fallbackAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
  if (defaultFallback && defaultFallback !== '#') {
    img.src = defaultFallback;
  } else {
    img.src = fallbackAvatar;
  }
}
