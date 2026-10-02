"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Zap, BadgeIndianRupee, Target, LifeBuoy } from "lucide-react";
import { whyUs } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";

const icons = [Zap, BadgeIndianRupee, Target, LifeBuoy];
const colors = ["bg-lime text-ink", "bg-cyan text-ink", "bg-violet text-paper", "bg-paper text-ink"];

function Card({ i, progress, total }: { i: number; progress: MotionValue<number>; total: number }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const Icon = icons[i];
  const item = whyUs[i];
  return (
    <div className="sticky top-28 flex h-[70vh] items-start justify-center md:top-32" style={{ paddingTop: i * 24 }}>
      <motion.div
        style={{ scale }}
        className={`relative flex h-[26rem] w-full origin-top flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 md:p-14 ${colors[i]}`}
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-sm opacity-70">0{i + 1} / 0{total}</span>
          <Icon className="h-10 w-10 md:h-14 md:w-14" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">{item.title}</h3>
          <p className="mt-4 max-w-xl text-lg opacity-80">{item.text}</p>
        </div>
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border-[40px] border-current opacity-10" />
      </motion.div>
    </div>
  );
}

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Orbitra"
          title="Four reasons teams stay with us for years"
          highlight={["years"]}
          text="We are not the cheapest and we are not the biggest. We are the partner who answers the phone, ships on time and cares about your numbers as much as you do."
        />
        <div ref={ref} className="mt-16">
          {whyUs.map((_, i) => (
            <Card key={i} i={i} progress={scrollYProgress} total={whyUs.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
