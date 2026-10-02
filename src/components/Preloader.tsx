"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand } from "@/lib/data";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("orbitra-loaded")) {
      setDone(true);
      return;
    }
    let n = 0;
    const id = window.setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 12));
      setCount(n);
      if (n >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => {
          setDone(true);
          try { sessionStorage.setItem("orbitra-loaded", "1"); } catch {}
        }, 350);
      }
    }, 70);
    return () => window.clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl font-bold tracking-tight md:text-7xl"
          >
            {brand.name}
            <span className="text-lime">.</span>
          </motion.div>
          <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div className="h-full bg-lime" animate={{ width: `${count}%` }} />
          </div>
          <div className="mt-4 font-mono text-sm text-muted tabular-nums">{count}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
