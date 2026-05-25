import react from "@azeer/config-eslint/react";

export default [
  {
    ignores: [".next/**", "next-env.d.ts"],
  },
  ...react,
  {
    /*
     * `react-refresh` targets Vite Fast Refresh; it's irrelevant in the Next
     * App Router, where `export const metadata` lives next to the page
     * component by design.
     */
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    /*
     * `src/lib/icons.ts` is the single curated re-export of Lucide marks the
     * marketing pages feed into the DS `<Icon />` wrapper (via section props).
     * The rest of the app keeps the `lucide-react` ban — pages import icons
     * from `@/lib/icons`, never from `lucide-react` directly.
     */
    files: ["src/lib/icons.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
];
