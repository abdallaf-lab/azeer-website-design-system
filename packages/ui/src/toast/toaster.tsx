import * as React from "react";
import { Toaster as SonnerToaster, type ToasterProps as SonnerToasterProps } from "sonner";
import { cn } from "../lib/cn";

/**
 * Watch `<html dir>` so the Toaster repositions when Storybook's RTL toggle
 * (or any app-level direction change) flips. Sonner v1.7 reads the prop at
 * construction; the MutationObserver keeps the position prop in sync.
 */
function useDocumentDir(): "ltr" | "rtl" {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr");
  React.useEffect(() => {
    const html = document.documentElement;
    const update = () => setDir((html.dir as "ltr" | "rtl") || "ltr");
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);
  return dir;
}

export interface ToasterProps extends Omit<SonnerToasterProps, "position" | "dir" | "richColors"> {}

/**
 * Toaster — singleton mount point for `toast.*` notifications.
 *
 * DS-locked defaults (Toast.md):
 *   - position:        top-end (auto-mirrors RTL — top-right LTR / top-left RTL)
 *   - max stack:       3 (older auto-dismiss; 4th pushes oldest out)
 *   - viewport offset: 16 px
 *   - gap between:     8 px
 *   - close button:    always visible
 *   - uniform surface: bg-surface + 1 px border + --elev-3
 *   - intent signal:   icon + icon-color (NOT bg) per Toast.md anatomy
 *
 * Mount once near the app root. Storybook's global decorator already does this.
 */
export function Toaster(props: ToasterProps) {
  const dir = useDocumentDir();
  return (
    <SonnerToaster
      position={dir === "rtl" ? "top-left" : "top-right"}
      dir={dir}
      visibleToasts={3}
      offset={16}
      gap={8}
      closeButton
      // richColors=false (default) — DS uses uniform bg-surface for every variant.
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: cn(
            "group/toast",
            "min-w-[360px] max-w-[440px]",
            "flex items-start gap-3",
            "rounded-lg border border-border-default",
            "bg-surface text-fg-default",
            "shadow-elev-3",
            "p-4",
          ),
          title: "text-body-md font-medium text-fg-default",
          description: "text-body-sm text-fg-muted",
          icon: "shrink-0",
          content: "flex-1 min-w-0 flex flex-col gap-1",
          actionButton: cn(
            "h-8 px-3 rounded-md",
            "bg-accent-fill text-fg-on-accent",
            "text-label-sm",
            "hover:bg-accent-fill-hover",
            "transition-colors duration-fast ease-standard",
            "cursor-pointer",
          ),
          cancelButton: cn(
            "h-8 px-3 rounded-md",
            "bg-transparent text-fg-default",
            "text-label-sm",
            "hover:bg-state-hover",
            "transition-colors duration-fast ease-standard",
            "cursor-pointer",
          ),
          closeButton: cn(
            "inline-flex items-center justify-center",
            "h-5 w-5 rounded-sm",
            "bg-transparent text-fg-muted",
            "hover:bg-state-hover",
            "transition-colors duration-fast ease-standard",
          ),
        },
      }}
      {...props}
    />
  );
}
