import Link from "next/link";
import { brand } from "@/lib/data";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7", className)}>
      <circle cx="16" cy="16" r="5.5" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="14" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-28 16 16)" />
      <circle cx="27.6" cy="9.6" r="2.4" className="fill-primary" />
    </svg>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 rounded-sm", className)} aria-label={`${brand.name}, home`}>
      <LogoMark />
      <span className="font-display text-[1.375rem] font-semibold tracking-[-0.03em]">{brand.name}</span>
    </Link>
  );
}
