"use client";

import { useActionState, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ChoiceGroup, TextField, TextareaField } from "./Field";
import { submitContact } from "@/app/contact/actions";
import {
  budgetOptions,
  contactSchema,
  interestOptions,
  readContactForm,
  toFieldErrors,
  type ContactField,
  type ContactState,
  type FieldErrors,
} from "@/lib/contact";

const FIELD_ORDER: ContactField[] = ["interests", "name", "email", "phone", "company", "budget", "message"];
const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
  // Remounting with a new key resets the action state for "send another message".
  const [instance, setInstance] = useState(0);
  return <ContactFormInner key={instance} onReset={() => setInstance((n) => n + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  // "" marks a field the visitor has fixed since the server last answered.
  const [clientErrors, setClientErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [valid, setValid] = useState<Partial<Record<ContactField, boolean>>>({});

  const serverErrors: FieldErrors = state.status === "invalid" ? state.errors : {};
  const errors: FieldErrors = { ...serverErrors, ...clientErrors };
  const errorFor = (field: ContactField) => errors[field] || undefined;
  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;

  const validate = () => {
    if (!formRef.current) return { errors: {} as FieldErrors, data: undefined };
    const data = readContactForm(new FormData(formRef.current));
    const result = contactSchema.safeParse(data);
    return { errors: result.success ? {} : toFieldErrors(result.error), data };
  };

  const checkField = (field: ContactField, live = false) => {
    if (live && !errors[field]) return;
    const { errors: next, data } = validate();
    const value = data?.[field];
    const filled = Array.isArray(value) ? value.length > 0 : Boolean(value?.trim());
    setClientErrors((prev) => ({ ...prev, [field]: next[field] ?? "" }));
    setValid((prev) => ({ ...prev, [field]: !next[field] && filled }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { errors: next } = validate();
    const invalid = FIELD_ORDER.filter((f) => next[f]);
    if (invalid.length === 0) return;
    e.preventDefault();
    setClientErrors(Object.fromEntries(FIELD_ORDER.map((f) => [f, next[f] ?? ""])));
    const first = formRef.current?.querySelector<HTMLElement>(`[name="${invalid[0]}"]`);
    first?.focus();
  };

  // Field events bubble to the form, so one pair of handlers validates every control.
  const fieldFrom = (target: EventTarget) => {
    const name = (target as HTMLInputElement).name as ContactField;
    return FIELD_ORDER.includes(name) ? name : null;
  };
  const onBlur = (e: FocusEvent<HTMLFormElement>) => {
    const field = fieldFrom(e.target);
    if (field && field !== "interests" && field !== "budget") checkField(field);
  };
  const onChange = (e: ChangeEvent<HTMLFormElement>) => {
    const field = fieldFrom(e.target);
    if (field) checkField(field, true);
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-8 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            role="status"
            className="flex min-h-[28rem] flex-col items-start justify-center"
          >
            <CircleCheck aria-hidden className="size-10 text-success" strokeWidth={1.5} />
            <h2 className="mt-6 font-display text-h2 font-medium">
              Thanks{state.name ? `, ${state.name.split(" ")[0]}` : ""}. Message received.
            </h2>
            <p className="mt-4 max-w-[44ch] text-muted">
              A strategist will reply within one business day with a few questions and next steps.
            </p>
            <Button variant="secondary" className="mt-8" onClick={onReset}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={formAction}
            onSubmit={onSubmit}
            onBlur={onBlur}
            onChange={onChange}
            noValidate
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
            aria-describedby="form-note"
          >
            <ChoiceGroup
              legend="What can we help with?"
              name="interests"
              type="checkbox"
              options={interestOptions}
              defaultValue={values?.interests ?? ["Website"]}
              error={errorFor("interests")}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <TextField id="name" label="Your name" autoComplete="name" defaultValue={values?.name} name="name" error={errorFor("name")} valid={valid.name} />
              <TextField
                id="email"
                label="Work email"
                type="email"
                inputMode="email"
                autoComplete="email"
                defaultValue={values?.email}
                name="email" error={errorFor("email")} valid={valid.email}
              />
              <TextField
                id="phone"
                label="Phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                optional
                defaultValue={values?.phone}
                name="phone" error={errorFor("phone")} valid={valid.phone}
              />
              <TextField
                id="company"
                label="Company"
                autoComplete="organization"
                optional
                defaultValue={values?.company}
                name="company" error={errorFor("company")} valid={valid.company}
              />
            </div>

            <ChoiceGroup
              legend="Budget"
              name="budget"
              type="radio"
              options={budgetOptions}
              defaultValue={[values?.budget ?? budgetOptions[1]]}
              error={errorFor("budget")}
            />

            <TextareaField
              id="message"
              name="message"
              label="About the project"
              hint="Goals, timelines, links to anything you have today."
              rows={5}
              defaultValue={values?.message}
              error={errorFor("message")}
            />

            {/* Honeypot for bots; hidden from people and assistive tech. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {state.status === "error" && (
              <p role="alert" className="flex items-start gap-2 rounded-md border border-error/40 bg-error/5 p-4 text-sm text-error">
                <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
                {state.message}
              </p>
            )}

            <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p id="form-note" className="text-sm text-muted">
                We reply within one business day. No newsletters, ever.
              </p>
              <Button type="submit" size="lg" loading={pending} loadingLabel="Sending…">
                Send message
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
