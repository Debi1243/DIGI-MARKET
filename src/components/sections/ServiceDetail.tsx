"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import clsx from "clsx";
import { services } from "@/lib/data";
import SplitText from "../ui/SplitText";
import Button from "../ui/Button";
import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";
import TiltCard from "../ui/TiltCard";
import SectionHeading from "../ui/SectionHeading";

export default function ServiceDetail({ slug }: { slug: string }) {
  const s = services.find((x) => x.slug === slug)!;
  const Icon = s.icon;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const related = services.filter((x) => x.slug !== slug && x.category === s.category).slice(0, 3);
  const fallback = services.filter((x) => x.slug !== slug && !related.includes(x)).slice(0, 3 - related.length);

  return (
    <>
      <section ref={heroRef} className="relative overflow-hidden pb-24 pt-44 md:pt-52">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className={clsx("pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br opacity-25 blur-[140px]", s.accent)} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 text-sm text-muted">
              <Link href="/services" className="hover:text-lime">Services</Link>
              <span>/</span>
              <span className="text-paper">{s.category}</span>
            </motion.nav>
            <SplitText as="h1" animateOnMount delay={0.35} text={s.title} className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-tight" />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {s.intro}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Get a quote</Button>
              <Button href="/work" variant="ghost">See case studies</Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 14 }}
            className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block"
          >
            <motion.div style={{ rotate }} className="absolute inset-0 rounded-full border border-dashed border-white/20" />
            <motion.div style={{ rotate, scale }} className="absolute inset-8 rounded-full border border-white/10">
              <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_20px_4px_rgba(198,255,61,0.6)]" />
            </motion.div>
            <div className={clsx("absolute inset-20 grid animate-float place-items-center rounded-[2.5rem] bg-gradient-to-br shadow-2xl", s.accent)}>
              <Icon className="h-24 w-24 text-ink/85" strokeWidth={1.25} />
            </div>
          </motion.div>
        </div>
        <div className="relative mx-auto mt-20 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 sm:grid-cols-3">
          {s.stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.1} className="bg-ink p-8">
              <Counter value={st.value} suffix={st.suffix} className="font-display text-5xl font-semibold tracking-tight text-gradient" />
              <p className="mt-2 text-sm text-muted">{st.label}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="What's included" title="Built around your goals" highlight={["goals"]} />
            <Reveal delay={0.2} className="mt-10">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Deliverables</p>
              <ul className="mt-4 space-y-3">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-lime/15 text-lime"><Check className="h-3.5 w-3.5" /></span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {s.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-16" : ""}>
                <TiltCard max={8}>
                  <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-2 p-8">
                    <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative font-mono text-sm text-lime">0{i + 1}</span>
                    <h3 className="relative mt-10 font-display text-2xl font-semibold tracking-tight">{f.title}</h3>
                    <p className="relative mt-3 leading-relaxed text-muted">{f.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Pairs well with" title="Related services" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[...related, ...fallback].map((r, i) => {
              const RIcon = r.icon;
              return (
                <Reveal key={r.slug} delay={i * 0.08}>
                  <Link href={`/services/${r.slug}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-lime/50 hover:bg-white/[0.03]">
                    <span className={clsx("grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-ink", r.accent)}><RIcon className="h-5 w-5" /></span>
                    <span className="flex-1 font-medium">{r.title}</span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition-all group-hover:rotate-45 group-hover:text-lime" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
