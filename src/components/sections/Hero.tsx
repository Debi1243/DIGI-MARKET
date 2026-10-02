"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type MotionValue, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Rocket, TrendingUp, Sparkles } from "lucide-react";
import SplitText from "../ui/SplitText";
import Button from "../ui/Button";

const words = ["grow", "scale", "launch", "convert"];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative -ml-[0.08em] inline-flex h-[1.1em] overflow-hidden pl-[0.08em] pr-[0.15em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient italic"
        >
          {words[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function useLayer(sx: MotionValue<number>, sy: MotionValue<number>, depth: number) {
  return {
    x: useTransform(sx, (v) => v * depth),
    y: useTransform(sy, (v) => v * depth),
  };
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleOrb = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  const l1 = useLayer(sx, sy, 30);
  const l2 = useLayer(sx, sy, -20);
  const l3 = useLayer(sx, sy, 45);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20"
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <motion.div style={l2} className="pointer-events-none absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-violet/30 blur-[140px]" />
      <motion.div style={l1} className="pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan/20 blur-[140px]" />

      {/* Orbit system */}
      <motion.div
        style={{ scale: scaleOrb, ...l1 }}
        className="pointer-events-none absolute right-[-20rem] top-1/2 hidden h-[56rem] w-[56rem] -translate-y-1/2 lg:block"
      >
        {[1, 0.75, 0.5].map((s, i) => (
          <div
            key={s}
            className="absolute inset-0 m-auto rounded-full border border-white/10"
            style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
          >
            <div
              className="absolute inset-0 animate-spin-slow"
              style={{ animationDuration: `${20 + i * 12}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
            >
              <span
                className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: ["#c6ff3d", "#2de2e6", "#7c5cff"][i], boxShadow: `0 0 24px 6px ${["#c6ff3d88", "#2de2e688", "#7c5cff88"][i]}` }}
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-[radial-gradient(circle_at_30%_30%,#c6ff3d,#2de2e6_40%,#7c5cff_75%,#07070c)] shadow-[0_0_120px_30px_rgba(124,92,255,0.35)]" />
      </motion.div>

      <motion.div style={{ y: yText, opacity }} className="relative mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 text-sm text-paper/80"
        >
          <span className="rounded-full bg-lime px-2.5 py-0.5 text-xs font-semibold text-ink">New</span>
          Now taking on founding clients
          <Sparkles className="h-4 w-4 text-accent" />
        </motion.div>

        <SplitText
          as="h1"
          animateOnMount
          delay={0.3}
          text="We build digital experiences that make brands"
          className="mt-8 max-w-5xl font-display text-[clamp(2.75rem,7.5vw,7rem)] font-semibold leading-[0.95] tracking-tight"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-display text-[clamp(2.75rem,7.5vw,7rem)] font-semibold leading-[0.95] tracking-tight"
        >
          <RotatingWord />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          Strategy, design, engineering and marketing under one roof. From high-converting websites and SEO to
          mobile apps and custom business software, we help ambitious companies move faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/contact">Start your project</Button>
          <Button href="/work" variant="ghost">See what we build</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-14 flex items-center gap-4"
        >
          <div className="flex -space-x-3">
            {["from-lime to-cyan", "from-violet to-fuchsia-500", "from-amber-400 to-rose-500", "from-cyan to-blue-600"].map((g, i) => (
              <span key={i} className={`h-10 w-10 rounded-full border-2 border-base bg-gradient-to-br ${g}`} />
            ))}
          </div>
          <div className="text-sm">
            <p className="flex items-center gap-1.5 font-semibold text-paper">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Founding-client slots open
            </p>
            <p className="text-muted">Launch pricing for our first clients</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating KPI cards */}
      <motion.div style={l3} className="pointer-events-none absolute right-[8%] top-[24%] hidden xl:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -4 }}
          transition={{ delay: 1.6, type: "spring" }}
          className="glass animate-float rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-ink"><TrendingUp className="h-5 w-5" /></span>
            <div>
              <p className="text-xs text-muted">Growth focus</p>
              <p className="font-display text-xl font-semibold">SEO + Ads</p>
            </div>
          </div>
          <svg viewBox="0 0 160 40" className="mt-3 h-10 w-40">
            <motion.path
              d="M0 35 L20 30 L40 32 L60 22 L80 25 L100 14 L120 16 L140 6 L160 2"
              fill="none"
              stroke="#c6ff3d"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 2, duration: 1.6, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>
      <motion.div style={l2} className="pointer-events-none absolute bottom-[16%] right-[22%] hidden xl:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ delay: 1.9, type: "spring" }}
          className="glass flex animate-float items-center gap-3 rounded-2xl p-4 [animation-delay:1.5s]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet"><Rocket className="h-5 w-5" /></span>
          <div>
            <p className="text-xs text-muted">Under one roof</p>
            <p className="font-display text-xl font-semibold">15 services</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-lime"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
