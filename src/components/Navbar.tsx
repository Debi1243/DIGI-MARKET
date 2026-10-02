"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import Logo from "./ui/Logo";
import Magnetic from "./ui/Magnetic";
import ThemeToggle from "./ThemeToggle";
import { services } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 20);
  });

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
        onMouseLeave={() => setMega(false)}
      >
        <nav
          className={clsx(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
            scrolled || mega ? "glass shadow-2xl shadow-black/40" : "bg-transparent",
          )}
        >
          <Logo />
          <ul className="glass hidden items-center gap-1 rounded-full p-1.5 lg:flex">
            {links.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href} onMouseEnter={() => setMega(l.href === "/services")}>
                  <Link
                    href={l.href}
                    className={clsx(
                      "group relative flex items-center rounded-full px-4 py-2 font-display text-[15px] font-bold tracking-tight transition-colors",
                      active ? "text-ink" : "text-paper/90 hover:text-paper",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-lime via-cyan to-violet shadow-[0_0_24px_-4px_rgba(45,226,230,0.7)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Letters roll up on hover, replaced by a gradient copy. */}
                    <span className="relative block overflow-hidden" aria-label={l.label}>
                      <span className="flex" aria-hidden>
                        {l.label.split("").map((ch, k) => (
                          <span
                            key={k}
                            className="inline-block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full"
                            style={{ transitionDelay: `${k * 25}ms` }}
                          >
                            {ch}
                          </span>
                        ))}
                      </span>
                      <span className="absolute inset-0 flex" aria-hidden>
                        {l.label.split("").map((ch, k) => (
                          <span
                            key={k}
                            className={clsx(
                              "inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-y-0",
                              !active && "text-accent",
                            )}
                            style={{ transitionDelay: `${k * 25}ms` }}
                          >
                            {ch}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden lg:inline-block">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <motion.span animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} className="absolute h-0.5 w-5 bg-paper" />
              <motion.span animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} className="absolute h-0.5 w-5 bg-paper" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass mx-auto mt-3 hidden max-w-7xl grid-cols-3 gap-2 rounded-3xl p-4 shadow-2xl shadow-black/50 lg:grid"
            >
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                    <Link href={`/services/${s.slug}`} className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-white/5">
                      <span className={clsx("grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-ink", s.accent)}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-paper">{s.title}</span>
                        <span className="line-clamp-1 text-xs text-muted">{s.short}</span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-base px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    className={clsx(
                      "flex items-baseline gap-3 font-display text-5xl font-bold tracking-tight",
                      (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)) && "text-gradient",
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link href="/contact" className="flex items-center justify-between rounded-full bg-lime px-6 py-4 font-semibold text-ink">
              Start a project <ArrowUpRight />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
