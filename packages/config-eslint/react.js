import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import base from "./base.js";

/**
 * Azeer DS RTL enforcement.
 *
 * Bans physical Tailwind direction utilities in JSX className strings and template literals.
 * Source of truth: Tokens-Theming §14 + Forbidden §3.
 *
 * Allowed logical equivalents:
 *   ms-* / me-* / ps-* / pe-* / start-* / end-*
 *   border-s / border-e / rounded-s / rounded-e
 *   text-start / text-end / float-start / float-end / clear-start / clear-end
 */
const PHYSICAL_UTILITY_PATTERN =
  "\\b(?:ml-|mr-|pl-|pr-|left-|right-|border-l\\b|border-r\\b|border-l-|border-r-|rounded-l\\b|rounded-r\\b|rounded-l-|rounded-r-|rounded-tl-|rounded-tr-|rounded-bl-|rounded-br-|text-left\\b|text-right\\b|float-left\\b|float-right\\b|clear-left\\b|clear-right\\b)";

const azeerRtlRule = {
  name: "azeer/rtl-no-physical-utilities",
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: `JSXAttribute[name.name='className'] Literal[value=/${PHYSICAL_UTILITY_PATTERN}/]`,
        message:
          "Azeer DS: physical direction utilities are banned. Use logical equivalents: ms-*/me-*, ps-*/pe-*, start-*/end-*, border-s/border-e, rounded-s/rounded-e, text-start/text-end, float-start/float-end, clear-start/clear-end.",
      },
      {
        selector: `JSXAttribute[name.name='className'] TemplateElement[value.raw=/${PHYSICAL_UTILITY_PATTERN}/]`,
        message:
          "Azeer DS: physical direction utilities are banned (template literal). Use logical equivalents.",
      },
    ],
  },
};

export default [
  ...base,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  azeerRtlRule,
];
