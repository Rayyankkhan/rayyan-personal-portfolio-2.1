/** @type {import('tailwindcss').Config} */
// Colours are CSS variables holding "R G B" triplets (see app/globals.css) so every
// theme can re-skin the whole site AND Tailwind opacity modifiers (bg-accent/20) still work.
const c = (name) => `rgb(var(${name}) / <alpha-value>)`;

module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: c('--ink-950'),
          900: c('--ink-900'),
          800: c('--ink-800'),
          700: c('--ink-700'),
          600: c('--ink-600'),
        },
        accent: {
          DEFAULT: c('--accent'),
          warm: c('--accent-2'),
        },
        'on-accent': c('--on-accent'),
        // Slightly lighter than Tailwind's default so small labels pass WCAG AA on dark backgrounds
        zinc: { 500: '#8a8a96' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
