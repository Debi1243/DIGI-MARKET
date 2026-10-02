"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { projects } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

type Project = (typeof projects)[number];

export function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={clsx("group", i % 2 === 1 && "md:mt-32")}
      data-cursor="Explore"
    >
      <div className={clsx("relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br p-8", p.gradient)}>
        <div className="absolute inset-0 bg-ink/10 transition-colors duration-700 group-hover:bg-transparent" />
        <motion.div style={{ y, rotate }} className="relative mx-auto mt-6 w-[85%] transition-transform duration-700 group-hover:scale-105">
          {/* Browser mockup */}
          <div className="overflow-hidden rounded-xl bg-ink shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="ml-3 h-3 flex-1 rounded bg-white/5" />
            </div>
            <div className="space-y-3 p-4">
              <div className="h-3 w-1/3 rounded bg-white/20" />
              <div className="h-6 w-3/4 rounded bg-white/80" />
              <div className="h-6 w-1/2 rounded bg-white/50" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[0, 1, 2].map((k) => (
                  <div key={k} className={clsx("h-16 rounded-lg bg-gradient-to-br opacity-80", p.gradient)} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <span className="absolute right-6 top-6 grid h-12 w-12 scale-0 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 group-hover:scale-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
          <p className="mt-1 text-sm text-muted">{p.category}</p>
        </div>
        <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-medium text-lime">{p.result}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">{t}</span>
        ))}
      </div>
    </motion.article>
  );
}

export default function WorkShowcase({ limit = 4 }: { limit?: number }) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected work" title="Results we are proud to put our name on" highlight={["proud"]} />
          <Button href="/work" variant="ghost">View all work</Button>
        </div>
        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {projects.slice(0, limit).map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
