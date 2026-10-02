import { z } from "zod";

export const interestOptions = ["Website", "SEO & Marketing", "Mobile App", "Branding", "Business Software", "Other"] as const;
export const budgetOptions = ["Under ₹50k", "₹50k – 2L", "₹2L – 5L", "₹5L +"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(120),
  email: z.email("Enter an email address we can reply to.").trim().max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^[+\d][\d\s()-]{6,}$/.test(v), "That phone number doesn't look right."),
  company: z.string().trim().max(160),
  interests: z.array(z.enum(interestOptions)).min(1, "Pick at least one area."),
  budget: z.enum(budgetOptions, "Choose a budget range."),
  message: z.string().trim().min(20, "A couple of sentences about the project helps us prepare.").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

export type ContactValues = ReturnType<typeof readContactForm>;

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors; values: ContactValues }
  | { status: "error"; message: string; values: ContactValues }
  | { status: "success"; name: string };

export function readContactForm(data: FormData) {
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    phone: String(data.get("phone") ?? ""),
    company: String(data.get("company") ?? ""),
    interests: data.getAll("interests").map(String),
    budget: String(data.get("budget") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
