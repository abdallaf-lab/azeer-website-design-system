import react from "@azeer/config-eslint/react";

export default [
  ...react,
  {
    /*
     * @azeer/ui is the gateway package — it consumes the underlying libraries
     * (lucide-react, sonner, cmdk, @radix-ui/*) directly and re-exports a
     * curated surface for apps. The no-restricted-imports ban from
     * @azeer/config-eslint/base targets _consumers_; the gateway must be
     * exempt or the system can't be built.
     *
     * The ban still fires in apps, stories, and any other workspace that
     * extends the shared config.
     */
    rules: {
      "no-restricted-imports": "off",
    },
  },
];
