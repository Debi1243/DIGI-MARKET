"use client";

import { motion } from "framer-motion";
import SplitText from "./SplitText";

export default function PageHero({ eyebrow, title, text, highlight }: { eyebrow: string; title: string; text?: string; highlight?: string[] }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-44 md:pt-52">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <motion.div
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet/25 blur-[140px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          {eyebrow}
        </motion.span>
        <SplitText
          as="h1"
          animateOnMount
          delay={0.35}
          text={title}
          highlight={highlight}
          className="mt-6 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] font-semibold leading-[0.98] tracking-tight"
        />
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {text}
          </motion.p>
        )}
      </div>
    </section>
  );
}
