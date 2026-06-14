export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={`block ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7.4 34.5 19.2 10.9c1.1-2.2 4.4-2.2 5.5 0l11.9 23.6c.8 1.6-.4 3.5-2.3 3.5h-5.1c-1 0-1.9-.6-2.3-1.5l-4.9-10.2-4.9 10.2c-.4.9-1.3 1.5-2.3 1.5H9.7c-1.9 0-3.1-1.9-2.3-3.5Z"
        fill="var(--ink)"
      />
      <path d="M22 24.5 28.2 38H15.8L22 24.5Z" fill="var(--brand)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-9 transition-transform duration-300 group-hover:scale-[1.04]" />
      <span className="text-[17px] font-semibold tracking-normal text-ink">
        averra
      </span>
    </a>
  );
}
