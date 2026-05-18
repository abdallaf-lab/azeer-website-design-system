import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    check: false,
  },
  viteFinal: async (vite) => {
    vite.plugins = vite.plugins ?? [];
    vite.plugins.push(tailwindcss());
    vite.server = {
      ...vite.server,
      allowedHosts: true,
    };
    return vite;
  },
};

export default config;
