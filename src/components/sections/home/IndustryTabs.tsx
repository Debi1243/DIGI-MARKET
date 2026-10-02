"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type IndustryItem = {
  label: string;
  slug: string;
  title: string;
  intro: string;
  features: string[];
  stats: { value: string; label: string }[];
};

export default function IndustryTabs({ items }: { items: IndustryItem[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const item = items[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="mt-14 grid gap-y-10 md:mt-20 lg:grid-cols-12 lg:gap-x-10">
      <div
        role="tablist"
        aria-label="Industries"
        onKeyDown={onKeyDown}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:col-span-3 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((it, i) => {
          const selected = i === active;
          return (
            <button
              key={it.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "group relative shrink-0 whitespace-nowrap rounded-md border px-4 py-2.5 text-left text-sm transition-colors",
                "lg:flex lg:items-center lg:justify-between lg:rounded-none lg:border-0 lg:border-b lg:border-inverse-border lg:px-0 lg:py-4 lg:text-base",
                selected
                  ? "border-inverse-fg bg-inverse-fg text-inverse lg:bg-transparent lg:text-inverse-fg"
                  : "border-inverse-border text-inverse-muted hover:text-inverse-fg",
              )}
            >
              {it.label}
              <span
                aria-hidden
                className={cn(
                  "hidden size-1.5 rounded-full bg-primary transition-opacity lg:block",
                  selected ? "opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="rounded-sm lg:col-span-9"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            className="grid gap-y-10 md:grid-cols-9 md:gap-x-10"
          >
            <div className="md:col-span-5">
              <h3 className="font-display text-h3 font-medium">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-inverse-muted">{item.intro}</p>
              <ul className="mt-8 border-t border-inverse-border">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 border-b border-inverse-border py-3 text-[0.9375rem]">
                    <span aria-hidden className="size-1 rounded-full bg-inverse-fg" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${item.slug}`}
                className="group/link mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
              >
                <span className="link-underline">Explore {item.title}</span>
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
            <dl className="grid content-start gap-px self-start bg-inverse-border md:col-span-4">
              {item.stats.map((st) => (
                <div key={st.label} className="flex items-baseline justify-between gap-4 bg-inverse py-5 first:pt-0">
                  <dt className="text-sm text-inverse-muted">{st.label}</dt>
                  <dd className="tabular font-display text-[2rem] font-medium leading-none tracking-[-0.03em]">{st.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
