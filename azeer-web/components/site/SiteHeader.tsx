"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container, buttonClasses } from "@/components/primitives";
import { DemoButton } from "@/components/csat/demo-context";
import { useLocale, LanguageToggle } from "@/components/csat/locale-context";
import { cn } from "@/lib/utils";

const HREFS = ["/features", "/pricing", "/customers", "#how-it-works"];

export function SiteHeader() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[1100] w-full bg-white/85 backdrop-blur-md transition-shadow",
        scrolled ? "border-b border-zinc-200" : "border-b border-transparent"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="/" aria-label={t.nav.home} className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {t.nav.items.map((label, i) => (
              <a
                key={label}
                href={HREFS[i]}
                className="rounded-md px-3 py-2 text-[15px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <LanguageToggle />
            <a href="/login" className="rounded-md px-3 py-2 text-[15px] font-medium text-zinc-600 hover:text-zinc-900">
              {t.nav.signIn}
            </a>
            <DemoButton size="md" source="header">
              {t.nav.bookDemo}
            </DemoButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 md:hidden"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white md:hidden">
          <Container>
            <nav className="flex flex-col py-3">
              {t.nav.items.map((label, i) => (
                <a
                  key={label}
                  href={HREFS[i]}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-[16px] font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-zinc-100 pt-3">
                <LanguageToggle className="justify-center border border-zinc-200" />
                <a href="/login" className={buttonClasses({ variant: "secondary", size: "lg" })}>
                  {t.nav.signIn}
                </a>
                <DemoButton size="lg" source="mobile-menu" className="w-full">
                  {t.nav.bookDemo}
                </DemoButton>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
