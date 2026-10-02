"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Makes every Motion animation honour the visitor's reduced-motion preference. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
