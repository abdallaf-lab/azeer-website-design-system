"use client";

import { Toaster } from "@azeer/ui";

/**
 * Client boundary for the DS `Toaster`. `@azeer/ui` ships components as Vite
 * source without `"use client"` directives, so the App Router needs a client
 * island to render the Sonner-backed toaster. Mounted once in the root layout.
 */
export function ToasterMount() {
  return <Toaster />;
}
