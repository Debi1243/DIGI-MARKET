"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { projects } from "@/lib/data";
import ProjectMockup from "./ProjectMockups";
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
        <motion.div style={{ y, rotate }} className="relative mx-auto mt-4 w-[88%] transition-transform duration-700 group-hover:scale-105">
          <ProjectMockup kind={p.kind} />
        </motion.div>
        <span className="absolute left-6 top-6 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#fff] backdrop-blur">
          Sample project
        </span>
        <span className="absolute right-6 top-6 grid h-12 w-12 scale-0 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 group-hover:scale-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-accent">
            {p.client} <span className="font-normal text-muted">· {p.location}</span>
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
          <p className="mt-1 text-sm text-muted">{p.category}</p>
        </div>
        <span className="shrink-0 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-medium text-accent">{p.result}</span>
      </div>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">{p.summary}</p>
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
          <SectionHeading eyebrow="What we build" title="Ideas we can bring to life for you" highlight={["life"]} />
          <Button href="/work" variant="ghost">See more examples</Button>
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
