import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { EcommerceHero } from "@/components/EcommerceHero";

export const metadata: Metadata = {
  title: "WhatsApp revenue for Salla & Zid stores",
  description:
    "Azeer recovers abandoned carts, confirms cash-on-delivery orders, and brings buyers back over WhatsApp, for D2C brands on Salla and Zid across Saudi Arabia. Book a 15-minute demo.",
  openGraph: {
    title: "Azeer: WhatsApp revenue for Salla & Zid stores",
    description:
      "Turn abandoned carts into paid orders. Cart recovery, COD confirmation, and buyer reactivation over WhatsApp, in Arabic and English.",
  },
};

/**
 * E-commerce vertical landing (Salla / Zid). Currently the hero only — the
 * `<EcommerceHero>` section composed from `@azeer/website-ui` on the marketing
 * scale. Renders LTR (/en/ecommerce) and RTL (/ar/ecommerce); every primitive
 * uses logical properties, so the layout mirrors automatically.
 */
export default function EcommercePage() {
  return (
    <>
      <SiteNavbar activeLabel="Solutions" />
      <main>
        <EcommerceHero />
      </main>
      <SiteFooter />
    </>
  );
}
