import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/storybook-static/**",
      "**/node_modules/**",
      "**/.turbo/**",
      "**/.vite/**",
      "**/coverage/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lucide-react",
              message:
                "Azeer DS: import icons through the system icon wrapper, not lucide-react directly.",
            },
            {
              name: "sonner",
              message: "Azeer DS: import Toaster/toast from @azeer/ui, not sonner directly.",
            },
            {
              name: "cmdk",
              message: "Azeer DS: import Command primitives from @azeer/ui, not cmdk directly.",
            },
          ],
        },
      ],
    },
  },
];
