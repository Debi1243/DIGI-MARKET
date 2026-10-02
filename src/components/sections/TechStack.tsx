import Marquee from "../ui/Marquee";
import { tech } from "@/lib/data";

export default function TechStack() {
  const half = Math.ceil(tech.length / 2);
  return (
    <section className="space-y-4 py-16">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted">Tools we master</p>
      {[tech.slice(0, half), tech.slice(half)].map((row, r) => (
        <Marquee key={r} duration={28 + r * 6} reverse={r === 1}>
          {row.map((t) => (
            <span key={t} className="glass mx-2 rounded-full px-6 py-3 text-sm font-medium text-paper/80 transition-colors hover:text-accent">
              {t}
            </span>
          ))}
        </Marquee>
      ))}
    </section>
  );
}
