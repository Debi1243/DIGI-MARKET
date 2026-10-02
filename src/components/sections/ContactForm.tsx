"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import clsx from "clsx";

const interests = ["Website", "SEO & Marketing", "Mobile App", "Branding", "Business Software", "Other"];
const budgets = ["< ₹50k", "₹50k – 2L", "₹2L – 5L", "₹5L +"];

function Field({ label, name, type = "text", textarea, error }: { label: string; name: string; type?: string; textarea?: boolean; error?: string }) {
  const cls =
    "peer w-full border-b bg-transparent pb-3 pt-6 text-lg outline-none transition-colors placeholder-transparent focus:border-lime " +
    (error ? "border-red-400" : "border-white/15");
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={4} placeholder={label} className={clsx(cls, "resize-none")} />
      ) : (
        <input name={name} type={type} placeholder={label} className={cls} />
      )}
      <span className="pointer-events-none absolute left-0 top-0 text-xs text-muted transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-xs peer-focus:text-lime">
        {label}
      </span>
      <AnimatePresence>
        {error && (
          <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 block text-xs text-red-400">
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

export default function ContactForm() {
  const [picked, setPicked] = useState<string[]>(["Website"]);
  const [budget, setBudget] = useState(budgets[1]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name")).trim()) next.name = "Please tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email")))) next.email = "Enter a valid email";
    if (String(data.get("message")).trim().length < 10) next.message = "A few more words about your project, please";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("sending");
    // Hook this up to your API route, Formspree, Resend, etc.
    window.setTimeout(() => setState("sent"), 1400);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2 p-8 md:p-12">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[32rem] flex-col items-center justify-center text-center">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="grid h-24 w-24 place-items-center rounded-full bg-lime text-ink">
              <Check className="h-12 w-12" />
            </motion.span>
            <h3 className="mt-8 font-display text-4xl font-semibold">Message received!</h3>
            <p className="mt-3 max-w-sm text-muted">Thanks for reaching out. A strategist will get back to you within one business day.</p>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={onSubmit} noValidate className="space-y-8">
            <div>
              <p className="text-sm text-muted">I&apos;m interested in…</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {interests.map((t) => {
                  const on = picked.includes(t);
                  return (
                    <motion.button
                      type="button"
                      key={t}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setPicked((p) => (on ? p.filter((x) => x !== t) : [...p, t]))}
                      className={clsx("rounded-full border px-4 py-2 text-sm transition-colors", on ? "border-lime bg-lime text-ink" : "border-white/15 hover:border-white/40")}
                    >
                      {t}
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Your name" name="name" error={errors.name} />
              <Field label="Email address" name="email" type="email" error={errors.email} />
              <Field label="Phone (optional)" name="phone" type="tel" />
              <Field label="Company" name="company" />
            </div>
            <div>
              <p className="text-sm text-muted">Budget</p>
              <div className="relative mt-4 grid grid-cols-2 gap-1 rounded-2xl bg-white/5 p-1 sm:grid-cols-4">
                {budgets.map((b) => (
                  <button type="button" key={b} onClick={() => setBudget(b)} className={clsx("relative rounded-xl px-3 py-3 text-sm transition-colors", budget === b ? "text-ink" : "text-paper/70")}>
                    {budget === b && <motion.span layoutId="budget" className="absolute inset-0 rounded-xl bg-paper" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className="relative">{b}</span>
                  </button>
                ))}
              </div>
            </div>
            <Field label="Tell us about your project" name="message" textarea error={errors.message} />
            <button
              type="submit"
              disabled={state === "sending"}
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-lime px-8 py-5 font-semibold text-ink disabled:opacity-70 md:w-auto"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative">{state === "sending" ? "Sending…" : "Send message"}</span>
              <motion.span className="relative" animate={state === "sending" ? { x: [0, 40], opacity: [1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.8 }}>
                <Send className="h-4 w-4" />
              </motion.span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
