import React from 'react';
import { PosterArtKind, PosterTone } from '../types';

/** Ink sets for the four poster stocks. `fg` is always readable on `bg`. */
export const POSTER_TONES: Record<PosterTone, { bg: string; fg: string; accent: string }> = {
  coral: { bg: '#ff5a4e', fg: '#06061a', accent: '#ffe81a' },
  paper: { bg: '#f5eedc', fg: '#06061a', accent: '#ff5a4e' },
  violet: { bg: '#2a1c78', fg: '#f5eedc', accent: '#f23a93' },
  volt: { bg: '#ffe81a', fg: '#06061a', accent: '#f23a93' },
};

interface PosterArtProps {
  art: PosterArtKind;
  tone: PosterTone;
  className?: string;
}

/**
 * Flat, two-ink poster illustration drawn in SVG. Purely decorative, so it is
 * hidden from assistive tech; the surrounding card carries the event text.
 */
export const PosterArt: React.FC<PosterArtProps> = ({ art, tone, className = '' }) => {
  const { bg, fg, accent } = POSTER_TONES[tone];

  return (
    <svg
      viewBox="0 0 300 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="300" height="300" fill={bg} />

      {art === 'rays' && (
        <g>
          {Array.from({ length: 13 }, (_, i) => {
            const a = (Math.PI * (i + 0.5)) / 13;
            const spread = 0.055;
            const r = 420;
            const p = (t: number) => `${150 - Math.cos(t) * r},${250 - Math.sin(t) * r}`;
            return <polygon key={i} points={`150,250 ${p(a - spread)} ${p(a + spread)}`} fill={fg} />;
          })}
          <circle cx="150" cy="250" r="92" fill={accent} />
          <circle cx="150" cy="250" r="92" fill="none" stroke={fg} strokeWidth="5" />
          <rect x="0" y="250" width="300" height="50" fill={fg} />
        </g>
      )}

      {art === 'grid' && (
        <g>
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: 9 }, (_, col) => {
              const d = Math.hypot(col - 5.5, row - 3);
              const r = Math.max(2.5, 15 - d * 2.4);
              const hot = (col === 5 || col === 6) && (row === 2 || row === 3);
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={22 + col * 32}
                  cy={22 + row * 32}
                  r={r}
                  fill={hot ? accent : fg}
                />
              );
            })
          )}
        </g>
      )}

      {art === 'rings' && (
        <g fill="none">
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx="105" cy="130" r={18 + i * 22} stroke={fg} strokeWidth="7" opacity={0.9} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={`b-${i}`} cx="215" cy="205" r={12 + i * 20} stroke={accent} strokeWidth="7" />
          ))}
          <circle cx="215" cy="205" r="12" fill={accent} />
        </g>
      )}

      {art === 'stripes' && (
        <g>
          <circle cx="150" cy="165" r="118" fill={accent} />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x="0" y={150 + i * 21} width="300" height={4 + i * 2.2} fill={bg} />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <path
              key={`z-${i}`}
              d={`M${-10 + i * 30} 40 l15 -18 l15 18`}
              fill="none"
              stroke={fg}
              strokeWidth="6"
              strokeLinejoin="miter"
            />
          ))}
          <rect x="0" y="282" width="300" height="18" fill={fg} />
        </g>
      )}
    </svg>
  );
};
