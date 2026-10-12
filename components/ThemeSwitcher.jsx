'use client';

import { useEffect, useRef, useState } from 'react';
import { HiCheck, HiSwatch } from 'react-icons/hi2';
import { DEFAULT_THEME, THEME_KEY, themeIds, themes } from '@/lib/themes';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);

  // Sync with whatever the inline <head> script already applied
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (themeIds.includes(current)) setTheme(current);
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (id) => {
    const run = () => {
      document.documentElement.setAttribute('data-theme', id);
      try {
        localStorage.setItem(THEME_KEY, id);
      } catch {
        /* private mode: theme just won't persist */
      }
      // The Three.js scene listens for this and re-reads the CSS colour variables
      window.dispatchEvent(new CustomEvent('themechange', { detail: id }));
      setTheme(id);
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof document.startViewTransition === 'function' && !reduce) document.startViewTransition(run);
    else run();
  };

  const active = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="theme-menu"
        aria-label={`Colour theme: ${active.label}. Change theme`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-zinc-200 transition hover:border-accent/50 hover:text-white"
      >
        <HiSwatch aria-hidden="true" />
      </button>

      {open && (
        <div
          id="theme-menu"
          role="group"
          aria-label="Colour theme"
          className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl"
        >
          <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Colour theme</p>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={theme === t.id}
              onClick={() => choose(t.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5 ${
                theme === t.id ? 'bg-white/[0.06]' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="h-7 w-7 shrink-0 rounded-full ring-1 ring-white/20"
                style={{ background: `linear-gradient(135deg, ${t.swatch[0]}, ${t.swatch[1]})` }}
              />
              <span className="flex-1">
                <span className="block text-sm font-medium text-white">{t.label}</span>
                <span className="block text-xs text-zinc-500">{t.note}</span>
              </span>
              {theme === t.id && <HiCheck aria-hidden="true" className="text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
