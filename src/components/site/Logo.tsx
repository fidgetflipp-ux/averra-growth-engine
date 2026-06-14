import averraLogo from "@/assets/averra-mark.png.asset.json";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={averraLogo.url}
      alt=""
      className={`block object-contain mix-blend-multiply ${className}`}
      aria-hidden="true"
    />
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
