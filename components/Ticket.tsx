import React from 'react';
import { PosterArtKind, PosterTone } from '../types';
import { PosterArt, POSTER_TONES } from './PosterArt';

/** Small deterministic generator so a given code always draws the same marks. */
const seeded = (text: string) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
};

/** Decorative barcode. It encodes nothing; it is drawn from the code text. */
export const Barcode: React.FC<{ code: string; className?: string }> = ({ code, className = '' }) => {
  const next = seeded(code);
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  while (x < 120) {
    const w = 1 + Math.floor(next() * 3);
    bars.push({ x, w });
    x += w + 1 + Math.floor(next() * 2);
  }
  return (
    <svg viewBox={`0 0 ${x} 10`} preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false">
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y="0" width={b.w} height="10" fill="currentColor" />
      ))}
    </svg>
  );
};

const QR_SIZE = 25;

const inFinder = (r: number, c: number) =>
  (r < 8 && c < 8) || (r < 8 && c >= QR_SIZE - 8) || (r >= QR_SIZE - 8 && c < 8);

/** Decorative QR-style pattern with the three corner finders. Not scannable. */
export const QrMotif: React.FC<{ code: string; className?: string }> = ({ code, className = '' }) => {
  const next = seeded(code);
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < QR_SIZE; r++) {
    for (let c = 0; c < QR_SIZE; c++) {
      if (inFinder(r, c)) continue;
      if (next() > 0.52) cells.push(<rect key={`${r}-${c}`} x={c} y={r} width="1.02" height="1.02" />);
    }
  }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <path d={`M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z`} fillRule="evenodd" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg
      viewBox={`-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}`}
      className={className}
      fill="currentColor"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Entry code graphic"
    >
      {finder(0, 0)}
      {finder(QR_SIZE - 7, 0)}
      {finder(0, QR_SIZE - 7)}
      {cells}
    </svg>
  );
};

interface TicketProps {
  title: string;
  /** Line above the title, e.g. the pass type. */
  pass: string;
  /** Label / value pairs printed on the body. */
  facts: { label: string; value: string }[];
  code: string;
  poster?: { art: PosterArtKind; tone: PosterTone };
  /** Lay out as a landscape ticket from the md breakpoint up. */
  wide?: boolean;
  className?: string;
}

export const Ticket: React.FC<TicketProps> = ({ title, pass, facts, code, poster, wide = false, className = '' }) => (
  <div className={`ticket ${wide ? 'ticket-wide' : ''} ${className}`}>
    <div className={`ticket-cut on-paper flex flex-col rounded-stock bg-paper text-ink-950 ${wide ? 'md:flex-row' : ''}`}>
      {poster && (
        <div
          className={`relative h-2.5 shrink-0 overflow-hidden ${wide ? 'md:h-auto md:w-36' : ''}`}
          style={{ backgroundColor: POSTER_TONES[poster.tone].accent }}
        >
          {wide && (
            <PosterArt art={poster.art} tone={poster.tone} className="absolute inset-0 hidden h-full w-full md:block" />
          )}
        </div>
      )}

      <div className={`min-w-0 flex-1 p-5 ${wide ? 'md:p-7' : ''}`}>
        <p className="text-sm font-bold text-coral-deep">{pass}</p>
        <h3 className={`display mt-1 text-balance text-4xl leading-[0.88] ${wide ? 'md:text-5xl md:leading-[0.86]' : ''}`}>
          {title}
        </h3>
        <dl className={`mt-5 grid grid-cols-2 gap-x-4 gap-y-3 ${wide ? 'lg:grid-cols-4' : ''}`}>
          {facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="text-xs font-medium text-ink-600">{fact.label}</dt>
              <dd className="text-sm font-bold leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className={`ticket-stub relative flex shrink-0 items-center gap-4 px-5 ${
          wide ? 'md:flex-col md:items-stretch md:justify-center md:gap-3 md:px-6 md:py-6' : ''
        }`}
      >
        <span aria-hidden="true" className={`perf-x absolute inset-x-3 top-0 text-ink-950/40 ${wide ? 'md:hidden' : ''}`} />
        {wide && <span aria-hidden="true" className="perf-y absolute inset-y-3 left-0 hidden text-ink-950/40 md:block" />}

        <div className="shrink-0">
          <p className="text-xs font-medium text-ink-600">Entry code</p>
          <p className="font-display text-3xl font-black leading-none tracking-wide">{code}</p>
        </div>
        <Barcode code={code} className={`h-14 min-w-0 flex-1 ${wide ? 'md:h-16 md:w-full md:flex-none' : ''}`} />
      </div>
    </div>
  </div>
);
