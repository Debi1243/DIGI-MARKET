"use server";

import { brand } from "@/lib/data";
import { contactSchema, readContactForm, toFieldErrors, type ContactState } from "@/lib/contact";

const WEBHOOK_TIMEOUT_MS = 8000;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", name: "" };
  }

  const values = readContactForm(formData);
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "invalid", errors: toFieldErrors(parsed.error), values };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    // Without a delivery target, only pretend to send while developing locally.
    if (process.env.NODE_ENV !== "production") {
      return { status: "success", name: parsed.data.name };
    }
    return { status: "error", message: `Our form is offline right now. Please email us at ${brand.email}.`, values };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch {
    return { status: "error", message: `We couldn't send that just now. Please try again or email ${brand.email}.`, values };
  }

  return { status: "success", name: parsed.data.name };
}
