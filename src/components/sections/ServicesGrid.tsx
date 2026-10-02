"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { services, type ServiceCategory } from "@/lib/data";
import TiltCard from "../ui/TiltCard";

const filters: ("All" | ServiceCategory)[] = ["All", "Marketing", "Design", "Development", "Software"];

export default function ServicesGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx("relative rounded-full px-5 py-2.5 text-sm transition-colors", filter === f ? "text-ink" : "text-paper/70 hover:text-paper")}
            >
              {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
              <span className="relative">
                {f}
                <span className="ml-1.5 opacity-60">{f === "All" ? services.length : services.filter((s) => s.category === f).length}</span>
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltCard className="h-full" max={6}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-2 p-7"
                    >
                      <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className={clsx("pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-50", s.accent)} />
                      <div className="relative flex items-start justify-between">
                        <span className={clsx("grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110", s.accent)}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">{s.category}</span>
                      </div>
                      <h3 className="relative mt-8 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
                      <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors group-hover:text-lime">
                        Explore service
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
