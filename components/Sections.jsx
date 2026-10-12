'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FaLayerGroup, FaNodeJs, FaReact } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { BiBug } from 'react-icons/bi';
import {
  HiArrowUpRight,
  HiCheckCircle,
  HiEnvelope,
  HiPaperAirplane,
  HiRocketLaunch,
  HiCalendarDays,
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { RiGithubFill, RiLinkedinFill } from 'react-icons/ri';
import { TbBrandFiverr } from 'react-icons/tb';
import {
  about,
  education,
  experience,
  nav,
  processSteps,
  projects,
  services,
  site,
  skills,
  testimonials,
} from '@/lib/data';
import { Magnetic, Reveal, SectionHeading } from './ui';
import Portrait from './Portrait';

/* ───────────────────────── About ───────────────────────── */
const tabs = ['Skills', 'Experience', 'Education'];

export function About() {
  const [tab, setTab] = useState('Skills');

  const onKey = (e) => {
    const i = tabs.indexOf(tab);
    if (e.key === 'ArrowRight') setTab(tabs[(i + 1) % tabs.length]);
    if (e.key === 'ArrowLeft') setTab(tabs[(i - 1 + tabs.length) % tabs.length]);
  };

  return (
    <section id="about" className="section">
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="About me" title={about.title} />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-zinc-400">
            {about.paragraphs.map((p) => (
              <p key={p} className="leading-relaxed">
                {p}
              </p>
            ))}
            <Portrait />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div role="tablist" aria-label="About details" onKeyDown={onKey} className="flex gap-2 rounded-full bg-white/5 p-1">
              {tabs.map((t) => (
                <button
                  key={t}
                  role="tab"
                  id={`tab-${t}`}
                  aria-selected={tab === t}
                  aria-controls={`panel-${t}`}
                  tabIndex={tab === t ? 0 : -1}
                  onClick={() => setTab(t)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                    tab === t ? 'bg-accent text-on-accent' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-6 min-h-[280px]">
              {tab === 'Skills' && (
                <div className="space-y-5">
                  {skills.map((g) => (
                    <div key={g.group}>
                      <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">{g.group}</h3>
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((s) => (
                          <li key={s} className="chip">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Experience' && (
                <ol className="relative space-y-6 border-l border-white/10 pl-6">
                  {experience.map((e) => (
                    <li key={e.role + e.org} className="relative">
                      <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent))]" aria-hidden="true" />
                      <p className="font-mono text-xs text-accent">{e.period}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{e.role}</h3>
                      <p className="text-sm text-zinc-400">{e.org}</p>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-zinc-400">
                        {e.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              )}

              {tab === 'Education' && (
                <ol className="relative space-y-6 border-l border-white/10 pl-6">
                  {education.map((e) => (
                    <li key={e.title} className="relative">
                      <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-warm" aria-hidden="true" />
                      <p className="font-mono text-xs text-accent">{e.period}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{e.title}</h3>
                      <p className="text-sm text-zinc-400">{e.org}</p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Services ───────────────────────── */
const icons = { react: FaReact, node: FaNodeJs, stack: FaLayerGroup, api: TbApi, bug: BiBug, rocket: HiRocketLaunch };

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="What I do"
          title="Services built around your business goals"
          desc="Everything you need to take a product from idea to a fast, reliable launch."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon] || FaReact;
            return (
              <li key={s.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <article className="card group h-full p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl text-accent transition group-hover:bg-accent group-hover:text-on-accent">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── Projects ───────────────────────── */
export function Projects() {
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const [cat, setCat] = useState('All');
  const [all, setAll] = useState(false);

  const filtered = projects.filter((p) => cat === 'All' || p.category === cat);
  const list = all || cat !== 'All' ? filtered : filtered.filter((p) => p.featured);

  return (
    <section id="work" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected work"
          title="Websites and apps I have built"
          desc="A selection of live projects. Open any card to visit the site."
        />

        <Reveal className="mt-8">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  cat === c ? 'border-accent bg-accent text-on-accent' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, idx) => (
              <motion.li
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: Math.min(idx, 5) * 0.04 }}
              >
                <article className="card group relative flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
                    <Image
                      src={p.image}
                      alt={`${p.title} website screenshot`}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" aria-hidden="true" />
                    <span className="chip absolute left-3 top-3 bg-ink-950/70 backdrop-blur">{p.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold text-white">
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                        {p.title}
                        <span className="sr-only"> (opens live site in a new tab)</span>
                      </a>
                    </h3>
                    <p className="mt-1 text-xs text-accent">{p.role}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <li key={s} className="chip !py-0.5">
                          {s}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white" aria-hidden="true">
                      Visit site
                      <HiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {cat === 'All' && !all && filtered.length > list.length && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setAll(true)} className="btn-ghost">
              Show all {filtered.length} projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Process ───────────────────────── */
export function Process() {
  return (
    <section id="process" className="section">
      <div className="container-x">
        <SectionHeading center eyebrow="How I work" title="A simple, transparent process" />
        <ol className="mt-14 grid gap-5 md:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.step}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="card h-full p-6">
                  <span className="font-display text-4xl font-bold gradient-text">{s.step}</span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials (hidden when empty) ───────────────────────── */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="section">
      <div className="container-x">
        <SectionHeading center eyebrow="Kind words" title="What clients say" />
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <Reveal className="h-full">
                <figure className="card h-full p-7">
                  <blockquote className="text-zinc-300">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="block text-zinc-500">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
export function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) return; // honeypot: bots fill this

    if (!site.formspreeId) {
      // Fallback with no backend: open the visitor's email app, pre-filled.
      const subject = encodeURIComponent(`Project enquiry from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      });
      if (!res.ok) throw new Error('failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition focus:border-accent focus:outline-none';

  const contactLinks = [
    { Icon: HiEnvelope, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    site.whatsapp && { Icon: FaWhatsapp, label: 'WhatsApp', value: `+${site.whatsapp}`, href: `https://wa.me/${site.whatsapp}` },
    site.bookingUrl && { Icon: HiCalendarDays, label: 'Book a call', value: 'Pick a time', href: site.bookingUrl },
  ].filter(Boolean);

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Let's work together" title="Have a project in mind? Let's talk." desc="Tell me about your idea, timeline and budget. I reply within one working day." />
              <ul className="mt-8 space-y-4">
                {contactLinks.map(({ Icon, label, value, href }) => (
                  <li key={label}>
                    <a href={href} className="group flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-xl text-accent transition group-hover:bg-accent group-hover:text-on-accent">
                        <Icon aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs text-zinc-500">{label}</span>
                        <span className="text-sm text-white">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs text-zinc-400">Your name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Doe" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs text-zinc-400">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={field} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs text-zinc-400">Project details</label>
                <textarea id="message" name="message" required rows={6} placeholder="What are you building, and when do you need it?" className={`${field} resize-none`} />
              </div>
              {/* honeypot */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <Magnetic className="!block w-full" strength={0.12}>
                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Send message'} <HiPaperAirplane aria-hidden="true" />
                </button>
              </Magnetic>

              <p role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
                {status === 'sent' && (
                  <span className="inline-flex items-center gap-2 text-emerald-400">
                    <HiCheckCircle aria-hidden="true" /> Thanks! Your message was sent. I will reply soon.
                  </span>
                )}
                {status === 'error' && <span className="text-accent">Something went wrong. Please email me directly at {site.email}.</span>}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
function LocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    if (!site.timezone) return;
    const fmt = () =>
      new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timezone }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  if (!time) return null;
  return (
    <p className="font-mono text-xs text-zinc-500">
      Local time <span className="text-zinc-300">{time}</span>
    </p>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-14">
      <p
        aria-hidden="true"
        className="select-none whitespace-nowrap bg-gradient-to-b from-white/[0.22] to-transparent bg-clip-text text-center font-display text-[clamp(2.2rem,10.5vw,8.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-transparent"
      >
        {site.name}
      </p>
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} {site.name}. Built with Next.js, Three.js &amp; Tailwind CSS.
          </p>
          <LocalTime />
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-5">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-zinc-500 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <ul className="flex items-center gap-3 text-xl text-zinc-400">
          <li><a href={site.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:text-white"><RiGithubFill /></a></li>
          <li><a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:text-white"><RiLinkedinFill /></a></li>
          <li><a href={site.links.fiverr} target="_blank" rel="noopener noreferrer" aria-label="Fiverr" className="transition hover:text-white"><TbBrandFiverr /></a></li>
        </ul>
      </div>
    </footer>
  );
}
