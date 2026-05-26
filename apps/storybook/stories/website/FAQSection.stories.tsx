import type { Meta, StoryObj } from "@storybook/react-vite";
import { FAQSection, type FAQSectionItem } from "@azeer/website-ui";

const meta: Meta<typeof FAQSection> = {
  title: "Website/FAQ/FAQSection",
  component: FAQSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof FAQSection>;

const defaultFaqs: FAQSectionItem[] = [
  {
    id: "setup-time",
    category: "Product & Setup",
    question: "How long does it take to set up Azeer for my business?",
    answer:
      "Most teams are live within 24–48 hours. The WhatsApp setup takes a few hours (we handle Meta verification), and connecting Salla, Zid, or your existing tools is typically 30 minutes per integration. Healthcare clinics on average take 3–5 business days because of HIPAA compliance configuration.",
  },
  {
    id: "customer-install",
    category: "Product & Setup",
    question: "Do my customers need to install anything?",
    answer:
      "No. Customers just need WhatsApp on their phone (which they already have). They message your business number, and Azeer's AI agents handle the conversation. They never know there's AI in the loop unless we tell them — and our AI handoffs to humans are seamless.",
  },
  {
    id: "arabic",
    category: "Product & Setup",
    question: "Can the AI speak Arabic?",
    answer:
      "Yes — native Arabic and English, plus 11 other regional languages. Our AI was specifically trained on Gulf Arabic dialects (Saudi, Emirati, Kuwaiti, Levantine) so it sounds natural to your customers, not translated.",
  },
  {
    id: "ai-fallback",
    category: "Product & Setup",
    question: "What if the AI doesn't know the answer?",
    answer:
      "Azeer's AI is trained on your business's specific FAQs, policies, and product catalog. If a customer asks something outside that scope, Azeer escalates to your team with full conversation context — they don't start from zero.",
  },
  {
    id: "free-trial",
    category: "Pricing & Plans",
    question: "Is there a free trial?",
    answer:
      "Yes — 14 days, full features, no credit card required. We'll even help you set up during the trial so you can see real results before committing.",
  },
  {
    id: "switch-plans",
    category: "Pricing & Plans",
    question: "Can I switch plans later?",
    answer:
      "Yes, anytime. Upgrade instantly when you need more capacity, downgrade with one billing cycle notice. Annual plans get 35% off monthly, and you can switch from monthly to annual at any time (we credit the difference).",
  },
  {
    id: "exceed-limits",
    category: "Pricing & Plans",
    question: "What happens if I exceed my plan limits?",
    answer:
      "We send notifications when you hit 80% of any limit (team members, conversations, automations). You can either upgrade or we'll cap at the limit for that billing cycle — your data stays intact, but new conversations queue until renewal. No surprise charges, ever.",
  },
  {
    id: "enterprise",
    category: "Pricing & Plans",
    question: "Do you offer custom enterprise pricing?",
    answer:
      "Yes. The Scale plan is custom-priced and includes dedicated account management, HIPAA-ready compliance, multi-brand support, custom integrations, and SLA agreements. Talk to our team via the Contact button below.",
  },
];

export const Default: Story = {
  name: "Default — 8 FAQs, 2 categories",
  render: () => <FAQSection faqs={defaultFaqs} />,
};

export const SingleCategory: Story = {
  name: "Single category (single-column layout)",
  render: () => (
    <FAQSection
      heroTitle="Setup, simplified"
      heroDescription="Everything you need to know about getting Azeer live on your stack."
      faqs={defaultFaqs.slice(0, 6).map((f) => ({ ...f, category: "Getting started" }))}
    />
  ),
};

export const EcommerceFocused: Story = {
  name: "E-commerce focused (6)",
  render: () => (
    <FAQSection
      sectionHeader={{ title: "FAQ — e-commerce" }}
      heroTitle="Selling on Salla or Zid? Start here."
      faqs={[
        {
          id: "salla-zid",
          category: "Integrations",
          question: "Does Azeer work with Salla and Zid out of the box?",
          answer:
            "Yes — both platforms are first-class integrations. Cart-recovery, order-status, and post-purchase journeys come pre-built; you just connect your store and pick the templates that fit your brand voice.",
        },
        {
          id: "abandoned-carts",
          category: "Integrations",
          question: "How does cart recovery work?",
          answer:
            "Azeer detects abandoned carts in your store, waits a configurable delay (default 15 min), and sends a personalized WhatsApp reminder with the cart contents and an optional discount code. Brands recover 35–40% of abandoned revenue on average.",
        },
        {
          id: "multi-store",
          category: "Integrations",
          question: "Can I run multiple stores from one Azeer account?",
          answer:
            "Yes. The Growth plan supports up to 3 stores; Scale supports unlimited. All conversations from every store thread into one team inbox, with per-store routing rules.",
        },
        {
          id: "trial",
          category: "Pricing",
          question: "Is there a free trial?",
          answer: "Yes — 14 days, full features, no credit card required.",
        },
        {
          id: "switch",
          category: "Pricing",
          question: "Can I switch plans later?",
          answer:
            "Yes, anytime. Upgrade instantly; downgrade with one billing cycle notice.",
        },
        {
          id: "limits",
          category: "Pricing",
          question: "What about conversation overages?",
          answer:
            "We notify you at 80% of any plan limit. You can either upgrade or cap until renewal — no surprise charges.",
        },
      ]}
    />
  ),
};

export const HealthcareFocused: Story = {
  name: "Healthcare focused (6)",
  render: () => (
    <FAQSection
      sectionHeader={{ title: "FAQ — clinics" }}
      heroTitle="HIPAA-ready WhatsApp for clinic teams"
      faqs={[
        {
          id: "hipaa",
          category: "Compliance",
          question: "Is Azeer HIPAA-compliant?",
          answer:
            "The Scale plan ships HIPAA-ready with audit logs, BAAs, and access controls. Starter and Growth are NOT HIPAA-configured by default — clinics should use Scale.",
        },
        {
          id: "noshow",
          category: "Compliance",
          question: "How do reminders reduce no-shows?",
          answer:
            "Confirmations on booking, 48h reminders, 2h reminders with location + prep info, and one-tap rescheduling. Pilot clinics see no-show rates drop 35–50% in 6 weeks.",
        },
        {
          id: "patient-data",
          category: "Compliance",
          question: "Where is patient data stored?",
          answer:
            "All data resides in Azeer's GCC region by default. Multi-region residency available on Scale (e.g., for clinics operating in multiple markets).",
        },
        {
          id: "trial-clinic",
          category: "Pricing",
          question: "Free trial for clinics?",
          answer:
            "Yes — same 14 days, but Scale features (HIPAA, multi-brand) need a quick onboarding call so we can configure compliance correctly.",
        },
        {
          id: "scheduling",
          category: "Pricing",
          question: "Does it integrate with our scheduling system?",
          answer:
            "We support Cliniko, ClinicSoft, and major dental management systems. Custom integrations are available on Scale via our API.",
        },
        {
          id: "team",
          category: "Pricing",
          question: "How many team members?",
          answer:
            "Starter: 3. Growth: 10. Scale: unlimited. Most clinics start with Growth and upgrade as new branches come online.",
        },
      ]}
    />
  ),
};

export const NoSectionHeader: Story = {
  name: "No SectionHeader (hero is primary)",
  render: () => <FAQSection faqs={defaultFaqs} showSectionHeader={false} />,
};

export const NoCTAs: Story = {
  name: "No CTAs (clean FAQ-only)",
  render: () => <FAQSection faqs={defaultFaqs} showCTAs={false} />,
};

export const ReducedMotion: Story = {
  name: "Reduced motion",
  parameters: {
    docs: {
      description: {
        story:
          "Under `prefers-reduced-motion: reduce`, the SectionHeader canvas is omitted; the DS Accordion's height transition still plays — it's interaction motion conveying 'content is appearing/disappearing', not decorative. Rule #3 sub-rule: respect DS reduced-motion decisions on its own primitives.",
      },
    },
  },
  render: () => <FAQSection faqs={defaultFaqs} />,
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <FAQSection
        sectionHeader={{
          title: "الأسئلة الشائعة",
          description: "إجابات على الأسئلة الأكثر شيوعاً حول الإعداد والأسعار وكيف يدير أزير محادثاتك.",
        }}
        heroTitle="أسئلة؟ لدينا الإجابات"
        heroDescription="تصفّح أكثر الأسئلة شيوعاً عن إعداد أزير ووكلاء الذكاء الاصطناعي والأسعار — أو تواصل مع فريقنا إن احتجت إلى مساعدة محددة."
        primaryCTA={{ label: "الوثائق", href: "/docs" }}
        secondaryCTA={{ label: "تواصل معنا", href: "/contact" }}
        faqs={[
          {
            id: "ar-setup",
            category: "المنتج والإعداد",
            question: "كم يستغرق إعداد أزير لشركتي؟",
            answer:
              "معظم الفرق تصبح جاهزة خلال ٢٤–٤٨ ساعة. إعداد واتساب يستغرق بضع ساعات (نحن نتعامل مع التحقق من ميتا)، وربط سلة أو زد عادةً ٣٠ دقيقة لكل تكامل.",
          },
          {
            id: "ar-install",
            category: "المنتج والإعداد",
            question: "هل يحتاج عملائي إلى تثبيت أي شيء؟",
            answer:
              "لا. يحتاج العملاء فقط إلى واتساب على هواتفهم. يرسلون رسالة إلى رقم عملك، ووكلاء أزير الذكيون يديرون المحادثة.",
          },
          {
            id: "ar-arabic",
            category: "المنتج والإعداد",
            question: "هل الذكاء الاصطناعي يتحدث العربية؟",
            answer:
              "نعم — العربية والإنجليزية بطلاقة، بالإضافة إلى ١١ لغة إقليمية أخرى. وكلاؤنا مدرّبون خصيصاً على اللهجات الخليجية.",
          },
          {
            id: "ar-fallback",
            category: "المنتج والإعداد",
            question: "ماذا لو لم يعرف الذكاء الاصطناعي الإجابة؟",
            answer:
              "أزير يصعّد المحادثة إلى فريقك مع السياق الكامل — لا يبدأ فريقك من الصفر.",
          },
          {
            id: "ar-trial",
            category: "الأسعار والخطط",
            question: "هل هناك تجربة مجانية؟",
            answer: "نعم — ١٤ يوماً، كل الميزات، دون الحاجة إلى بطاقة ائتمان.",
          },
          {
            id: "ar-switch",
            category: "الأسعار والخطط",
            question: "هل يمكنني تغيير الخطة لاحقاً؟",
            answer: "نعم، في أي وقت. الترقية فورية، والتخفيض بإشعار دورة فوترة واحدة.",
          },
          {
            id: "ar-limits",
            category: "الأسعار والخطط",
            question: "ماذا يحدث إذا تجاوزت حدود خطتي؟",
            answer:
              "نُرسل تنبيهات عند الوصول إلى ٨٠٪ من أي حد. يمكنك إما الترقية أو سنقوم بالتوقف عند الحد لتلك الدورة. لا توجد رسوم مفاجئة أبداً.",
          },
          {
            id: "ar-enterprise",
            category: "الأسعار والخطط",
            question: "هل تقدّمون أسعاراً مخصصة للمؤسسات؟",
            answer:
              "نعم. خطة المؤسسات مخصصة الأسعار وتشمل إدارة حساب مخصصة، جاهزية HIPAA، دعم متعدد العلامات التجارية، تكاملات مخصصة، واتفاقيات مستوى خدمة.",
          },
        ]}
      />
    </div>
  ),
};
