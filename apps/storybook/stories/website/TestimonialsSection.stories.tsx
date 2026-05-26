import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestimonialsSection, type TestimonialItem } from "@azeer/website-ui";

const meta: Meta<typeof TestimonialsSection> = {
  title: "Website/Testimonials/TestimonialsSection",
  component: TestimonialsSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof TestimonialsSection>;

/** Token-only logo placeholder — replace with a real `currentColor` SVG in production. */
function PlaceholderLogo({ company }: { company: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="size-2 rounded-full bg-brand-primary" aria-hidden="true" />
      <span className="text-mkt-body-sm font-medium text-content-emphasis">{company}</span>
    </span>
  );
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "bayt-al-sweet",
    quote:
      "We were drowning in DM volume. After 6 weeks on Azeer, our team handles 3x the conversations with the same headcount, and our cart recovery rate hit 38%. Best ROI of any tool we've adopted.",
    author: { name: "Sarah Al-Mansouri", role: "Co-founder & CMO, Bayt Al-Sweet" },
    company: { name: "Bayt Al-Sweet", logo: <PlaceholderLogo company="Bayt Al-Sweet" /> },
  },
  {
    id: "andalusia-dental",
    quote:
      "WhatsApp reminders cut our no-show rate in half. We're effectively serving 8 more patients per clinic per week without adding a single new staff member.",
    author: { name: "Dr. Khalid Al-Otaibi", role: "Practice Manager, Andalusia Dental Group" },
    company: {
      name: "Andalusia Dental Group",
      logo: <PlaceholderLogo company="Andalusia Dental" />,
    },
  },
  {
    id: "noortech",
    quote:
      "The AI handles 70% of routine asks before they ever reach us. Our human team focuses on the 30% that genuinely needs us — and our NPS jumped 22 points.",
    author: { name: "Lana Habibi", role: "Head of Customer Experience, NoorTech Beauty" },
    company: { name: "NoorTech Beauty", logo: <PlaceholderLogo company="NoorTech Beauty" /> },
  },
  {
    id: "sahara",
    quote:
      "Patients prefer WhatsApp over phone calls. Our front-desk reclaimed 3 hours per day, and we now actually book appointments instead of playing phone tag.",
    author: { name: "Dr. Reem Al-Sabah", role: "Director, Sahara Wellness Clinics" },
    company: {
      name: "Sahara Wellness Clinics",
      logo: <PlaceholderLogo company="Sahara Wellness" />,
    },
  },
  {
    id: "tamkeen",
    quote:
      "We qualify 3x more inbound leads per week with zero added headcount. The AI catches conversations at 11pm that we'd otherwise lose. Our pipeline is up 45% YoY.",
    author: { name: "Faisal Al-Rashid", role: "VP of Sales, Tamkeen Holdings" },
    company: { name: "Tamkeen Holdings", logo: <PlaceholderLogo company="Tamkeen Holdings" /> },
  },
];

export const Default: Story = {
  name: "Default — 5 testimonials",
  render: () => <TestimonialsSection testimonials={defaultTestimonials} />,
};

export const EcommerceFocused: Story = {
  name: "E-commerce focused (3)",
  render: () => (
    <TestimonialsSection
      sectionHeader={{ title: "From e-commerce brands" }}
      testimonials={[defaultTestimonials[0], defaultTestimonials[2], defaultTestimonials[4]]}
    />
  ),
};

export const HealthcareFocused: Story = {
  name: "Healthcare focused (3)",
  render: () => (
    <TestimonialsSection
      sectionHeader={{ title: "From healthcare teams" }}
      testimonials={[defaultTestimonials[1], defaultTestimonials[3], defaultTestimonials[0]]}
    />
  ),
};

export const ThreeTestimonials: Story = {
  name: "Three testimonials (minimum)",
  render: () => <TestimonialsSection testimonials={defaultTestimonials.slice(0, 3)} />,
};

export const NoAutoRotation: Story = {
  name: "No auto-rotation (manual clicks only)",
  render: () => <TestimonialsSection testimonials={defaultTestimonials} autoRotateInterval={0} />,
};

export const ReducedMotion: Story = {
  name: "Reduced motion",
  parameters: {
    docs: {
      description: {
        story:
          "Under `prefers-reduced-motion: reduce`, auto-rotation is disabled and the progress bar is suppressed. Click any logo to switch testimonials manually. Toggle your OS setting to verify.",
      },
    },
  },
  render: () => <TestimonialsSection testimonials={defaultTestimonials} />,
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <TestimonialsSection
        sectionHeader={{
          title: "آراء العملاء",
          description: "ما تقوله الفرق التي تتعامل مع العملاء عن تشغيل عملياتها على أزير.",
        }}
        testimonials={[
          {
            id: "bayt",
            quote:
              "كنا نغرق في حجم الرسائل عبر المحادثات. بعد ٦ أسابيع على أزير، فريقنا يتعامل مع ٣ أضعاف المحادثات بنفس عدد الموظفين، ومعدل استرداد السلال وصل إلى ٣٨٪. أفضل عائد على الاستثمار من أي أداة تبنّيناها.",
            author: { name: "سارة المنصوري", role: "مؤسسة مشاركة ومديرة تسويق، بيت الحلويات" },
            company: { name: "بيت الحلويات", logo: <PlaceholderLogo company="بيت الحلويات" /> },
          },
          {
            id: "andalusia",
            quote:
              "تذكيرات واتساب خفّضت معدل الغياب لدينا إلى النصف. نخدم فعلياً ٨ مرضى إضافيين في كل عيادة أسبوعياً دون توظيف أي موظف جديد.",
            author: { name: "د. خالد العتيبي", role: "مدير الممارسة، مجموعة الأندلس لطب الأسنان" },
            company: {
              name: "مجموعة الأندلس",
              logo: <PlaceholderLogo company="مجموعة الأندلس" />,
            },
          },
          {
            id: "noortech",
            quote:
              "الذكاء الاصطناعي يتعامل مع ٧٠٪ من الأسئلة الروتينية قبل أن تصلنا. فريقنا البشري يركّز على الـ٣٠٪ التي تحتاج إلى تدخّل حقيقي — وارتفع مؤشر رضا العملاء ٢٢ نقطة.",
            author: { name: "لانا حبيبي", role: "مديرة تجربة العملاء، نور تك بيوتي" },
            company: { name: "نور تك بيوتي", logo: <PlaceholderLogo company="نور تك بيوتي" /> },
          },
        ]}
      />
    </div>
  ),
};
