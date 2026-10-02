"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

export default function Faq({ items, title = "Questions, answered" }: { items: { q: string; a: string }[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow="FAQ" title={title} highlight={["answered"]} />
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {items.map((f, i) => (
            <li key={f.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={open === i}
              >
                <span className="font-display text-lg font-medium md:text-xl">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 135 : 0, backgroundColor: open === i ? "#c6ff3d" : "rgba(255,255,255,0.06)" }}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                >
                  <Plus className={open === i ? "h-5 w-5 text-ink" : "h-5 w-5"} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-16 leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
