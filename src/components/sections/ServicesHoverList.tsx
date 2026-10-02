"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { services } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

const featured = ["web-design", "digital-marketing", "mobile-apps", "logo-branding", "crm-software", "hospital-management"];

export default function ServicesHoverList() {
  const items = services.filter((s) => featured.includes(s.slug));
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Everything your brand needs to win online"
            highlight={["win", "online"]}
          />
          <Button href="/services" variant="ghost">All 15 services</Button>
        </div>

        <ul
          className="relative mt-16 border-t border-white/10"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setActive(null)}
        >
          {items.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.slug} onPointerEnter={() => setActive(i)}>
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="View"
                  className="group relative flex items-center gap-6 border-b border-white/10 py-8 md:py-10"
                >
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <span
                    className={clsx(
                      "font-display text-3xl font-semibold tracking-tight transition-all duration-500 md:text-6xl",
                      active !== null && active !== i ? "text-paper/25" : "text-paper",
                      "group-hover:translate-x-4",
                    )}
                  >
                    {s.title}
                  </span>
                  <span className="ml-auto hidden max-w-xs text-sm text-muted lg:block">{s.short}</span>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <span className="sr-only"><Icon /></span>
                </Link>
              </li>
            );
          })}

          <motion.div
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={items[active].slug}
                  initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={clsx(
                    "absolute -translate-x-1/2 -translate-y-1/2 grid h-56 w-72 place-items-center rounded-3xl bg-gradient-to-br shadow-2xl",
                    items[active].accent,
                  )}
                >
                  {(() => {
                    const Icon = items[active].icon;
                    return <Icon className="h-20 w-20 text-ink/80" strokeWidth={1.25} />;
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ul>
      </div>
    </section>
  );
}
