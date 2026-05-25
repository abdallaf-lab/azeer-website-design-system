/**
 * Tailwind v4 runs through its PostCSS plugin here. All Tailwind config lives in
 * `@azeer/tokens/tokens.css` (CSS-first) — there is no tailwind.config file.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
