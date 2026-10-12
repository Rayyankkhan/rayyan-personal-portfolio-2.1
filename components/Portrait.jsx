'use client';

import { useState } from 'react';
import { site } from '@/lib/data';

/* Compact profile card used in About. Falls back to initials until /public/profile.webp exists. */
export default function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="glass mt-8 flex items-center gap-5 rounded-2xl p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-accent/40 to-accent-warm/30 ring-1 ring-white/15">
        {failed ? (
          <span className="flex h-full w-full items-center justify-center font-display text-2xl font-bold text-white">
            {site.initials}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/profile.webp"
            alt={`Portrait of ${site.name}`}
            width={160}
            height={160}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-white">{site.name}</p>
        <p className="text-sm text-zinc-400">{site.role}</p>
        <p className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {site.availability}
        </p>
      </div>
    </div>
  );
}
