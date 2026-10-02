import { Sparkle } from "lucide-react";
import Marquee from "../ui/Marquee";
import { clients } from "@/lib/data";

export default function Clients() {
  return (
    <section className="border-y border-white/5 py-10">
      <p className="mb-8 text-center text-xs uppercase tracking-[0.3em] text-muted">Brands that grow with us</p>
      <Marquee duration={35}>
        {clients.map((c) => (
          <span key={c} className="flex items-center gap-10 px-5 font-display text-2xl font-semibold text-paper/40 transition-colors hover:text-paper md:text-3xl">
            {c}
            <Sparkle className="h-5 w-5 text-accent/60" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
