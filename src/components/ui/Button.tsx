import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import Magnetic from "./Magnetic";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
};

export default function Button({ href, children, variant = "primary", className }: Props) {
  return (
    <Magnetic>
      <Link
        href={href}
        className={clsx(
          "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold transition-colors",
          variant === "primary" && "bg-lime text-ink",
          variant === "dark" && "bg-ink text-[#f4f3ff]",
          variant === "ghost" && "border border-white/15 text-paper hover:border-white/40",
          className,
        )}
      >
        <span
          className={clsx(
            "absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-y-0",
            variant === "primary" ? "bg-[#fff]" : variant === "dark" ? "bg-violet" : "bg-white/10",
          )}
        />
        <span className="relative">{children}</span>
        <span
          className={clsx(
            "relative grid h-7 w-7 place-items-center overflow-hidden rounded-full",
            variant === "primary" ? "bg-ink text-lime" : variant === "dark" ? "bg-lime text-ink" : "bg-white/10",
          )}
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-6 group-hover:translate-x-6" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      </Link>
    </Magnetic>
  );
}
