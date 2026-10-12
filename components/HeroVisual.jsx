'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// three.js (~150 KB gzip) is loaded only in the browser, after the page is interactive.
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroVisual() {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // Wait for the browser to be idle so the 3D bundle never competes with first paint / LCP
  useEffect(() => {
    const go = () => setLoad(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(go, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(go, 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px]"
      style={{
        // soft edge so particles fade out instead of being cut by the canvas border
        WebkitMaskImage: 'radial-gradient(closest-side, #000 66%, transparent 100%)',
        maskImage: 'radial-gradient(closest-side, #000 66%, transparent 100%)',
      }}
    >
      {/* CSS stand-in: visible while three.js loads, and permanently if WebGL is unavailable */}
      <div
        className={`absolute inset-[16%] rounded-full blur-2xl transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-80'}`}
        style={{
          background:
            'radial-gradient(circle at 35% 30%, rgb(var(--accent) / 0.85), rgb(var(--accent-2) / 0.45) 50%, transparent 72%)',
        }}
      />
      {load && <HeroScene onReady={() => setReady(true)} />}
    </div>
  );
}
