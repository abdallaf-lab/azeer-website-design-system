import * as React from "react";
import type { Decorator, Preview } from "@storybook/react-vite";
import { Toaster, TooltipProvider } from "@azeer/ui";

// Single Tailwind entry — preview.css @imports the token surface and adds
// @source directives, so the whole chain is processed together by Tailwind v4.
import "./preview.css";

/**
 * Wires the three theming axes (theme / density / dir) to <html> attributes.
 * `data-theme` / `data-density` flip the attribute even though dark + compact
 * are v1.5+ / v1.2+ scaffolds — proves the mechanism end-to-end so when
 * primitive overrides ship, every component switches with zero rework.
 *
 * Also mounts the singleton `TooltipProvider` (DS-locked 500/100 ms delays
 * baked into its defaults) so every story has tooltip support without
 * wrapping individually.
 */
const withGlobals: Decorator = (Story, ctx) => {
  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", String(ctx.globals.theme ?? "light"));
    html.setAttribute("data-density", String(ctx.globals.density ?? "comfortable"));
    html.setAttribute("dir", String(ctx.globals.dir ?? "ltr"));
  }, [ctx.globals.theme, ctx.globals.density, ctx.globals.dir]);
  return React.createElement(
    TooltipProvider,
    null,
    React.createElement(Toaster),
    React.createElement(Story),
  );
};

const preview: Preview = {
  decorators: [withGlobals],

  globalTypes: {
    theme: {
      name: "Theme",
      description:
        "Sets data-theme on <html>. Dark & high-contrast are v1.5+ scaffolds — attribute flips, primitive overrides land later.",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", right: "v1" },
          { value: "dark", title: "Dark", right: "v1.5+ scaffold" },
          { value: "high-contrast", title: "High contrast", right: "v1.5+ scaffold" },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      name: "Density",
      description:
        "Sets data-density on <html>. Compact shrinks control heights (32/40/48 → 28/32/40), control padding, and table row height (56 → 44). Typography, radii, and structural surfaces (ModuleHeader / Banner / HelpBubble) stay fixed.",
      defaultValue: "comfortable",
      toolbar: {
        title: "Density",
        icon: "grow",
        items: [
          { value: "comfortable", title: "Comfortable", right: "v1" },
          { value: "compact", title: "Compact", right: "v1.2" },
        ],
        dynamicTitle: true,
      },
    },
    dir: {
      name: "Direction",
      description: "Sets dir on <html>. RTL is fully shipped in v1.",
      defaultValue: "ltr",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "LTR" },
          { value: "rtl", title: "RTL" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    options: {
      storySort: {
        order: [
          "Foundation",
          [
            "Introduction",
            "Colors",
            "Typography",
            "Spacing",
            "Radius",
            "Motion",
            "Elevation",
            "Z-Index",
            "Control Sizes",
            "Theming",
            "RTL",
          ],
          "Brand",
          [
            "Overview",
            "Voice & Tone",
            "Logo",
            "Color",
            "Typography",
            "Patterns",
            "Applications",
            "Usage in Code",
          ],
          "Primitives",
          [
            "AppShell",
            "PrimaryRail",
            "Sidebar",
            "ModuleHeader",
            "Button",
            "Spinner",
            "Progress",
            "Skeleton",
            "Badge",
            "Avatar",
            "Alert",
            "Banner",
            "Card",
            "ChannelIcon",
            "Label",
            "Input",
            "PhoneInput",
            "NumberInput",
            "SearchInput",
            "FileInput",
            "DatePicker",
            "Textarea",
            "Select",
            "Combobox",
            "MultiSelect",
            "Switch",
            "Checkbox",
            "Radio",
            "Toggle",
            "ToggleGroup",
            "FormField",
            "FieldGroup",
            "InlineEdit",
            "CopyButton",
            "CommandPalette",
            "Tooltip",
            "Popover",
            "DropdownMenu",
            "Dialog",
            "Sheet",
            "ConfirmDialog",
            "Toast",
            "Tabs",
            "Accordion",
            "Table",
            "DataTable",
            "Pagination",
            "EmptyState",
            "HelpBubble",
            "ScrollArea",
            "Kbd",
            "Separator",
          ],
          "Website",
          [
            "Overview",
            "Navbar",
            "Hero",
            "Pricing",
            "FeatureGrid",
            "FeatureSplit",
            "VerticalSwitcher",
            "CompareTable",
            "StatsBand",
            "Testimonials",
            "LogoCloud",
            "ComplianceBand",
            "IntegrationsRow",
            "ChannelsRow",
            "FAQ",
            "CTABanner",
            "NewsletterSignup",
            "BlogCard",
            "Footer",
          ],
          "Patterns",
        ],
      },
    },
    a11y: {
      // axe-core runs per-story; warnings surface in the A11y panel.
      // No global element/rule disables — the system targets WCAG 2.1 AA.
      config: {},
      options: {},
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
