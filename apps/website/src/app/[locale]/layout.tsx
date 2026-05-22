import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { locales, localeConfig, type Locale } from "@/i18n/config";
import { ToasterMount } from "@/components/ToasterMount";

export const metadata: Metadata = {
  title: {
    default: "Azeer — One inbox for every customer conversation",
    template: "%s · Azeer",
  },
  description:
    "Azeer unifies WhatsApp, Voice, SMS, email and social into one AI-assisted workspace, so your team replies faster and customers stay happy.",
  metadataBase: new URL("https://azeer.io"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
      "x-default": "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Azeer",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = localeConfig[locale as Locale].dir;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning data-density="comfortable">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          themes={["light", "dark"]}
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
            <ToasterMount />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
