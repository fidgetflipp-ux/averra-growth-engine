import averraLogoSrc from "@/assets/averra-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={averraLogoSrc}
        alt="Averra"
        className="h-7 w-auto transition-transform duration-300 group-hover:scale-[1.04]"
      />
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
        Averra
      </span>
    </a>
  );
}
