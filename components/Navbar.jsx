'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiBars3, HiXMark, HiArrowUpRight } from 'react-icons/hi2';
import { nav, site } from '@/lib/data';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section that crosses the middle of the viewport
  useEffect(() => {
    const els = nav.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(`#${en.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => {
      if (window.scrollY < 200) setActive('');
    };
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <nav
        aria-label="Main"
        className={`relative flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border px-3 py-2 transition duration-300 ${
          scrolled || open
            ? 'border-white/10 bg-ink-900/75 shadow-[0_10px_40px_-14px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="px-3 font-display text-lg font-bold text-white" aria-label={`${site.name} – back to top`}>
          {site.initials}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center md:flex">
          {nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? 'location' : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm transition ${
                  active === l.href ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <a href="#contact" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Hire me <HiArrowUpRight aria-hidden="true" />
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiXMark size={20} /> : <HiBars3 size={20} />}
          </button>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="absolute left-0 right-0 top-full mt-2 rounded-3xl border border-white/10 bg-ink-900/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Hire me
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
