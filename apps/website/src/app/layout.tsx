import "./globals.css";
import type { ReactNode } from "react";

/**
 * Root layout — minimal pass-through.
 *
 * The real layout (HTML shell, providers, fonts) lives at
 * `app/[locale]/layout.tsx` so it can apply per-locale dir + lang.
 * This file exists because Next.js requires a root layout in App Router.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
