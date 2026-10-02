"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const milestones = [
  { year: "2014", title: "Lift-off", text: "Started as a two-person web studio building sites for local businesses." },
  { year: "2016", title: "Software suite", text: "Launched our billing and school management products, now used by thousands." },
  { year: "2019", title: "Growth marketing", text: "Added SEO, social and paid media to help clients get found and convert." },
  { year: "2022", title: "Mobile first", text: "Opened our app studio and shipped our 50th Flutter app." },
  { year: "2026", title: "AI-assisted delivery", text: "AI-powered audits and automation help us ship faster without cutting corners." },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Our journey" title="A decade of shipping" highlight={["shipping"]} align="center" />
        <div ref={ref} className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <motion.div style={{ scaleY }} className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-lime via-cyan to-violet md:left-1/2" />
          <div className="space-y-16">
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative grid items-center gap-6 pl-12 md:grid-cols-2 md:pl-0 ${i % 2 ? "" : "md:[&>div:nth-child(2)]:order-2"}`}>
                <span className="absolute left-4 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-ink bg-lime md:left-1/2" />
                <Reveal className={i % 2 ? "md:pr-16 md:text-right" : "md:pl-16"}>
                  <p className="font-display text-6xl font-bold text-white/10">{m.year}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{m.title}</h3>
                  <p className="mt-2 text-muted">{m.text}</p>
                </Reveal>
                <div />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
