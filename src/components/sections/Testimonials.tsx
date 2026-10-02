"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";

export default function Testimonials() {
  const [[i, dir], set] = useState<[number, number]>([0, 1]);
  const go = (d: number) => set(([n]) => [(n + d + testimonials.length) % testimonials.length, d]);

  useEffect(() => {
    const id = window.setInterval(() => set(([n]) => [(n + 1) % testimonials.length, 1]), 6000);
    return () => window.clearInterval(id);
  }, [i]);

  const t = testimonials[i];
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <SectionHeading eyebrow="Client love" title="Don't take our word for it" align="center" highlight={["word"]} />
        <div className="relative mt-16 min-h-[18rem] md:min-h-[16rem]">
          <Quote className="mx-auto h-12 w-12 text-lime" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 80, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -80, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mt-8 font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-8 font-semibold">{t.name}</p>
              <p className="text-sm text-muted">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-ink">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, k) => (
              <button key={k} onClick={() => set([k, k > i ? 1 : -1])} aria-label={`Testimonial ${k + 1}`} className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/15">
                {k === i && (
                  <motion.span layoutId="t-dot" className="absolute inset-0 bg-lime">
                    <motion.span className="absolute inset-0 origin-left bg-white/50" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 6, ease: "linear" }} />
                  </motion.span>
                )}
              </button>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-ink">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
