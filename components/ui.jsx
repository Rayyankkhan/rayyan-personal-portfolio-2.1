'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import Lenis from 'lenis';

const EASE = [0.22, 1, 0.36, 1];

/* ───────────── Smooth inertial scrolling + accessible in-page anchors ───────────── */
export function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ duration: 1.15, wheelMultiplier: 0.95 });
    let id = 0;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    // Own anchor handling: works on every Lenis version and keeps keyboard focus correct.
    const onClick = (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72, duration: 1.4 });
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return children;
}

/* ───────────── Thin scroll progress bar ───────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent to-accent-warm"
    />
  );
}

/* ───────────── Cursor glow + card spotlight (one shared pointer listener) ───────────── */
export function GlobalEffects() {
  const glow = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let last = null;

    const apply = () => {
      raf = 0;
      if (!last) return;
      const { clientX: x, clientY: y, target } = last;

      if (!reduce && glow.current) {
        glow.current.style.opacity = '1';
        glow.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
      const card = target instanceof Element ? target.closest('.card') : null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${x - r.left}px`);
        card.style.setProperty('--my', `${y - r.top}px`);
      }
    };

    const onMove = (e) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glow}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background: 'radial-gradient(circle, rgb(var(--accent) / 0.10), transparent 60%)',
        willChange: 'transform',
      }}
    />
  );
}

/* ───────────── Fade + rise when scrolled into view ───────────── */
export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────── Word-by-word mask reveal for big headlines ─────────────
   Screen readers get the whole sentence via aria-label; the animated words are aria-hidden. */
export function SplitReveal({ text, as: Tag = 'span', className = '', delay = 0, accentFrom = -1, stagger = 0.05 }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
            <motion.span
              className={`inline-block ${accentFrom >= 0 && i >= accentFrom ? 'gradient-text' : ''}`}
              initial={reduce ? false : { y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ───────────── Magnetic hover (fine pointers only) ───────────── */
export function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(
      window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ───────────── Count-up when scrolled into view ───────────── */
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, desc, center = false }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent ${center ? 'justify-center' : ''}`}>
        <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-base leading-relaxed text-zinc-400">{desc}</p>}
    </Reveal>
  );
}
