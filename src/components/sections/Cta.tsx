"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";

export default function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(12% 18% 12% 18% round 3rem)", "inset(0% 0% 0% 0% round 0rem)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  return (
    <section ref={ref} className="relative py-12">
      <motion.div style={{ clipPath: clip }} className="relative overflow-hidden bg-lime py-32 text-ink md:py-44">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#07070c_1px,transparent_0)] [background-size:24px_24px]" />
        <motion.div style={{ scale }} className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">Ready when you are</p>
          <h2 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl">
            Let&apos;s build something people remember.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-ink/70">
            Tell us about your goals. You will get a tailored plan, timeline and quote within 48 hours.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/contact" variant="dark">Get a free proposal</Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
