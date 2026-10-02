import Link from "next/link";
import { brand } from "@/lib/data";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${brand.name} home`}>
      <span className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-0 rounded-full border border-lime/60 transition-transform duration-700 group-hover:rotate-180 [border-right-color:transparent]" />
        <span className="h-3 w-3 rounded-full bg-lime shadow-[0_0_20px_4px_rgba(198,255,61,0.5)]" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        {brand.name}
        <span className="text-accent">.</span>
      </span>
    </Link>
  );
}
