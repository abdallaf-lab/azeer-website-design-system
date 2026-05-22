import { AzeerLogo, CtaButton, Navbar } from "@azeer/website-ui";
import { LocaleSwitcher } from "./LocaleSwitcher";

/**
 * LandingNav — a focused top bar for the clinic landing page. Unlike the
 * generic `SiteNavbar` (mega-menus for the whole product), this is a lean,
 * conversion-first bar: in-page section anchors and a single primary CTA. Kept
 * separate so the rest of the marketing site is unchanged. Server Component.
 */
export function LandingNav() {
  return (
    <Navbar
      logo={
        <a href="/" aria-label="Azeer home" className="inline-flex">
          <AzeerLogo className="text-xl" />
        </a>
      }
      items={[
        { label: "How it works", href: "#how-it-works" },
        { label: "Features", href: "#features" },
        { label: "Results", href: "#results" },
        { label: "Pricing", href: "/pricing" },
      ]}
      actions={
        <>
          <LocaleSwitcher />
          <CtaButton
            action={{ label: "Sign in", href: "/login" }}
            variant="ghost"
            size="md"
          />
          <CtaButton
            action={{ label: "Book a demo", href: "/demo" }}
            variant="primary"
            size="md"
          />
        </>
      }
    />
  );
}
