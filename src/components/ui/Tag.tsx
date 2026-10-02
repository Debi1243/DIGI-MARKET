import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-full border border-border px-3 text-xs text-muted">{children}</span>
  );
}
