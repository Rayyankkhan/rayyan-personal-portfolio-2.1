'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { RiGithubFill, RiLinkedinFill } from 'react-icons/ri';
import { TbBrandFiverr } from 'react-icons/tb';
import { HiArrowDown, HiArrowDownTray } from 'react-icons/hi2';
import { hero, site, stats, techMarquee } from '@/lib/data';
import { Counter, Magnetic, SplitReveal } from './ui';
import HeroVisual from './HeroVisual';

const EASE = [0.22, 1, 0.36, 1];

function RotatingRole() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % hero.roles.length), 2800);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <p className="mt-6 flex items-center gap-3 font-mono text-sm text-zinc-400 sm:text-base">
      <span aria-hidden="true" className="text-accent">
        &gt;
      </span>
      <span className="relative inline-flex h-[1.5em] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={reduce ? false : { y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-zinc-100"
          >
            {hero.roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden="true" className="h-4 w-[2px] animate-pulse bg-accent" />
    </p>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: EASE },
  });
  const headlineWords = hero.headline.split(' ').length;

  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
      {/* ambient background: one soft theme-coloured glow + a faded grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.045) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at 30% 30%, #000 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 30% 30%, #000 20%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <div>
          <motion.p
            {...fade(0)}
            className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs text-zinc-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.availability}
          </motion.p>

          <motion.p {...fade(0.05)} className="mt-7 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
            {site.name} <span className="text-accent">/</span> {site.role}
          </motion.p>

          <SplitReveal
            as="h1"
            text={hero.headline}
            delay={0.15}
            accentFrom={Math.max(headlineWords - 3, 0)}
            className="mt-4 block font-display text-[clamp(2.4rem,6.2vw,4.7rem)] font-bold leading-[1.04] tracking-tight text-white"
          />

          <motion.div {...fade(0.55)}>
            <RotatingRole />
          </motion.div>

          <motion.p {...fade(0.65)} className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {hero.intro}
          </motion.p>

          <motion.div {...fade(0.75)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="btn-primary">
                View my work <HiArrowDown aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost">
                Book a call
              </a>
            </Magnetic>
            {site.resumeUrl && (
              <a href={site.resumeUrl} download className="btn-ghost">
                <HiArrowDownTray aria-hidden="true" /> CV
              </a>
            )}
          </motion.div>

          <motion.ul {...fade(0.85)} className="mt-8 flex items-center gap-3" aria-label="Social links">
            {[
              { href: site.links.github, label: 'GitHub', Icon: RiGithubFill },
              { href: site.links.linkedin, label: 'LinkedIn', Icon: RiLinkedinFill },
              { href: site.links.fiverr, label: 'Fiverr', Icon: TbBrandFiverr },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-xl text-zinc-300 transition hover:-translate-y-1 hover:border-accent/50 hover:text-white"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      <dl className="container-x mt-14 grid grid-cols-2 gap-y-8 border-t border-white/10 pt-8 sm:mt-20 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`flex flex-col-reverse ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-8' : ''}`}>
            <dt className="mt-1 text-xs text-zinc-400 sm:text-sm">{s.label}</dt>
            <dd className="font-display text-4xl font-bold text-white sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>

      <div
        className="mt-16 overflow-hidden border-y border-white/10 py-5"
        aria-label="Technologies I work with"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee gap-10 font-mono text-sm text-zinc-500">
          {[...techMarquee, ...techMarquee].map((t, i) => (
            <span key={i} aria-hidden={i >= techMarquee.length} className="flex items-center gap-10 whitespace-nowrap">
              {t} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
