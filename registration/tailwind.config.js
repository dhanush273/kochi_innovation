/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swRed: {
          DEFAULT: '#e11d48',
          dark: '#be123c',
          light: '#f43f5e'
        },
        ckOrange: {
          DEFAULT: '#ea580c',
          dark: '#c2410c',
          light: '#f97316'
        },
        navy: {
          900: '#0b1329',
          800: '#0f172a',
          700: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['3DS', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        '3ds': ['3DS', 'sans-serif'],
        '3ds-condensed': ['3DS Condensed', '3DS', 'sans-serif']
      }
    },
  },
  plugins: [],
}
