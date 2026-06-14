/**
 * Averra mark — abstract ascending architecture.
 * Three rising verticals + a precise diagonal apex, evoking growth and momentum.
 * Reads as a stylized "A" at favicon size, geometric at scale.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="currentColor" />
      {/* ascending bars */}
      <rect x="7" y="18" width="3" height="7" rx="1" fill="white" fillOpacity="0.55" />
      <rect x="12.5" y="13" width="3" height="12" rx="1" fill="white" fillOpacity="0.85" />
      <rect x="18" y="7" width="3" height="18" rx="1" fill="white" />
      {/* brand accent diagonal */}
      <path
        d="M7 9 L21 9"
        stroke="var(--brand)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-7 text-ink transition-transform duration-300 group-hover:scale-[1.04]" />
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
        Averra
      </span>
    </a>
  );
}
