"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
  highlight?: string[];
  animateOnMount?: boolean;
};

export default function SplitText({ text, className, delay = 0, stagger = 0.06, as = "h2", highlight = [], animateOnMount }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } };
  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="-mr-[0.12em] inline-block overflow-hidden pb-[0.12em] pr-[0.12em] align-top" aria-hidden>
          <motion.span
            className={clsx("inline-block", highlight.includes(w.replace(/[.,!?]/g, "")) && "text-gradient italic")}
            variants={{
              hidden: { y: "110%", rotate: 6 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
