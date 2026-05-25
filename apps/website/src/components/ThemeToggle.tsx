"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@azeer/ui";
import { Moon, Sun } from "@/lib/icons";

const emptySubscribe = () => () => {};

/**
 * ThemeToggle — flips next-themes between `light` and `dark`, which swaps the
 * `data-theme` attribute the DS reads. Until hydrated it renders a stable
 * placeholder so the server/client markup match (the active theme isn't known
 * on the server). `useSyncExternalStore` provides that "mounted" signal without
 * a setState-in-effect (which the repo's react-hooks lint rule forbids).
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" aria-label="Toggle theme">
        {" "}
      </Button>
    );
  }

  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
