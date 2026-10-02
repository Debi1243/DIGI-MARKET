"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";
import { stats } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const copy =
  "For more than a decade we have partnered with startups, hospitals, schools, hotels and retailers to turn bold ideas into software and campaigns that people love to use. One team. Every channel. Measurable growth.";

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".intro-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref}>
          <p className="font-display text-3xl font-medium leading-snug tracking-tight md:text-5xl md:leading-[1.15]">
            {copy.split(" ").map((w, i) => (
              <span key={i} className="intro-word inline-block whitespace-pre">
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="bg-base p-8 md:p-10">
              <Counter value={s.value} suffix={s.suffix} className="font-display text-5xl font-semibold tracking-tight text-gradient md:text-6xl" />
              <p className="mt-3 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
