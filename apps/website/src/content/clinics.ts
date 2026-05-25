/**
 * Content for the Azeer landing page — WhatsApp revenue orchestration for GCC
 * clinics. Kept separate from `marketing.ts` (the generic omnichannel content
 * other pages still consume) so this focused positioning lives in one place.
 *
 * Copy is revenue-led and clinic-specific: bookings, deposits, no-show
 * recovery, reactivation. Figures are illustrative pilot-clinic benchmarks.
 */
import type {
  ComplianceItem,
  FAQItem,
  FeatureGridItem,
  Stat,
  Testimonial,
  TrustBadgeItem,
} from "@azeer/website-ui";
import {
  BadgeCheck,
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Lock,
  Megaphone,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
} from "@/lib/icons";

/** Headline outcomes — framed as revenue, not vanity metrics. */
export const stats: Stat[] = [
  { value: "3.2×", label: "Return on Azeer", description: "average across pilot clinics" },
  { value: "−38%", label: "No-shows", description: "with deposits + WhatsApp reminders" },
  { value: "41%", label: "Booked after hours", description: "while your front desk is closed" },
  { value: "<30s", label: "First reply", description: "in Arabic or English, 24/7" },
];

/** The orchestration capabilities — what Azeer actually does, end to end. */
export const capabilities: FeatureGridItem[] = [
  {
    icon: Stethoscope,
    title: "Arabic-first AI front desk",
    description:
      "Answers every patient in fluent Arabic and English, books the right slot with the right doctor, and never clocks out.",
  },
  {
    icon: CreditCard,
    title: "Deposits that stop no-shows",
    description:
      "Collect a confirmation deposit in the chat — Mada, Apple Pay, or card. Patients who pay, show up.",
  },
  {
    icon: Bell,
    title: "Reminders patients actually read",
    description:
      "WhatsApp reminders hit a ~98% open rate — far past SMS or email. Fewer empty chairs, automatically.",
  },
  {
    icon: RefreshCw,
    title: "Win back lapsed patients",
    description:
      "Azeer re-engages no-shows and patients overdue for a recall — turning a quiet database into bookings.",
  },
  {
    icon: Megaphone,
    title: "Compliant broadcasts",
    description:
      "Send offers, recalls, and seasonal campaigns inside WhatsApp policy and template rules — no bans.",
  },
  {
    icon: BarChart3,
    title: "Revenue you can see",
    description:
      "Every conversation is tied to booked, paid revenue — so you know exactly what WhatsApp is earning.",
  },
];

/** Compliance & trust, tuned for GCC healthcare. */
export const compliance: ComplianceItem[] = [
  { icon: BadgeCheck, label: "Meta Business Partner", description: "Official WhatsApp Business API" },
  { icon: ShieldCheck, label: "PDPL ready", description: "Saudi data protection" },
  { icon: Lock, label: "In-region data residency", description: "GCC & EU regions" },
  { icon: FileText, label: "HIPAA-aligned", description: "Patient data handled safely" },
];

/** Dark-CTA trust pills. */
export const closingBadges: TrustBadgeItem[] = [
  { icon: BadgeCheck, label: "Meta Business Partner" },
  { icon: ShieldCheck, label: "PDPL ready" },
  { icon: TrendingUp, label: "Live in days" },
];

/** Clinic operator testimonials (GCC). */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We were losing patients to voicemail after 6pm. Azeer books them while we sleep — our chairs are full by morning.",
    authorName: "Dr. Reem Al-Subaie",
    authorRole: "Owner, Lumière Dental — Riyadh",
    rating: 5,
  },
  {
    quote:
      "Deposits cut our no-shows almost in half. That alone paid for Azeer in the first month.",
    authorName: "Khalid Mansour",
    authorRole: "Operations Lead, Derma Clinic — Dubai",
    rating: 5,
  },
  {
    quote:
      "Patients message in Arabic, English, sometimes both in one sentence. Azeer just handles it — and books them.",
    authorName: "Mariam Haddad",
    authorRole: "Front Desk Lead, Aesthly — Doha",
    rating: 5,
  },
];

/** Clinic-specific objections, answered. */
export const faqs: FAQItem[] = [
  {
    question: "Do patients have to install anything?",
    answer:
      "No. Patients message you on the WhatsApp they already use every day — Azeer works behind your clinic's number. There's nothing for them to download or learn.",
  },
  {
    question: "Can Azeer use our existing clinic number?",
    answer:
      "Yes. We can provision the WhatsApp Business API on your current clinic number or a new one, including porting where supported across the GCC.",
  },
  {
    question: "How well does it really handle Arabic?",
    answer:
      "Natively. Azeer replies in natural Modern Standard Arabic with Gulf-dialect awareness, switches to English when a patient does, and keeps the whole experience RTL-correct — names, numbers, and times included.",
  },
  {
    question: "Does it connect to our scheduling system?",
    answer:
      "Yes. Azeer syncs with your calendar and clinic management system so the slots it offers are real, and confirmed bookings flow straight back into your schedule.",
  },
  {
    question: "Is patient data safe?",
    answer:
      "Azeer is PDPL-ready with in-region data residency (GCC/EU) and handles patient data to HIPAA-aligned standards. As a Meta Business Partner we run only the official WhatsApp Business API.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Days, not months. Connect WhatsApp, import your services and doctors, set your deposit rules — and Azeer starts booking. Most clinics are live in under a week.",
  },
];

/** Clinic specialties Azeer serves — used in the trust strip. */
export const specialties = [
  "Dental",
  "Dermatology",
  "Aesthetics",
  "IVF & fertility",
  "Dental implants",
  "Cosmetic surgery",
  "Physiotherapy",
];

/** GCC markets — used in the trust strip. */
export const markets = [
  "Riyadh",
  "Jeddah",
  "Dubai",
  "Abu Dhabi",
  "Doha",
  "Kuwait City",
  "Manama",
];
