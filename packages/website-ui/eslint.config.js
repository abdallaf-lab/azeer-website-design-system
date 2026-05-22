import react from "@azeer/config-eslint/react";

export default [
  ...react,
  {
    /*
     * @azeer/website-ui is a sibling component library to @azeer/ui — it
     * composes DS primitives into marketing sections. Like @azeer/ui, it must
     * be able to feed Lucide icon components into the system `<Icon />` wrapper
     * (which locks strokeWidth + the size scale). It NEVER renders a raw Lucide
     * element — every icon goes through `<Icon icon={…} />` from @azeer/ui.
     *
     * The no-restricted-imports ban from @azeer/config-eslint/base targets
     * apps/stories/consumers; it stays in force everywhere except the two
     * gateway component libraries.
     */
    rules: {
      "no-restricted-imports": "off",
    },
  },
];
