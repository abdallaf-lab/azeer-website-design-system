import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  cn,
} from "@azeer/ui";

const meta: Meta<typeof Carousel> = {
  title: "Primitives/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Slide carousel — Embla engine, slot-composed UI",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const slideClass =
  "h-48 rounded-md flex items-center justify-center text-heading-md text-fg-on-accent";
const palette = [
  "bg-accent-fill",
  "bg-info-fill",
  "bg-success-fill",
  "bg-warning-fill",
  "bg-danger-fill",
];

function Slide({ index, label }: { index: number; label?: string }) {
  return (
    <div className={cn(slideClass, palette[index % palette.length])}>
      {label ?? `Slide ${index + 1}`}
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i}>
              <Slide index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const WithDots: Story = {
  name: "With dots indicator",
  render: () => (
    <div style={{ width: 480 }}>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i}>
              <Slide index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  ),
};

export const Loop: Story = {
  name: "Loop (infinite)",
  render: () => (
    <div style={{ width: 480 }}>
      <Carousel options={{ loop: true }}>
        <CarouselContent>
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i}>
              <Slide index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  ),
};

export const MultiSlide: Story = {
  name: "Multiple slides per view",
  render: () => (
    <div style={{ width: 640 }}>
      <Carousel options={{ align: "start", slidesToScroll: 1 }}>
        <CarouselContent>
          {Array.from({ length: 8 }, (_, i) => (
            <CarouselItem key={i} className="basis-1/3">
              <div
                className={cn(
                  "h-32 rounded-md flex items-center justify-center text-heading-sm text-fg-on-accent",
                  palette[i % palette.length],
                )}
              >
                {i + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const OnboardingTour: Story = {
  name: "Onboarding tour (DS canonical use)",
  parameters: { layout: "fullscreen" },
  render: function OnboardingStory() {
    const slides = [
      {
        eyebrow: "Welcome",
        title: "Run every channel from one inbox",
        body: "WhatsApp, SMS, voice, email — all unified into a single conversation feed your team can act on together.",
      },
      {
        eyebrow: "Automate with AI",
        title: "Resolve routine questions without lifting a finger",
        body: "Train your AI agent on your knowledge base and let it handle the first response. Your team only steps in when it matters.",
      },
      {
        eyebrow: "Measure everything",
        title: "See what's working, in real time",
        body: "Dashboards for response time, CSAT, agent load, and AI containment — segmented by channel, team, and campaign.",
      },
    ];
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="w-[560px]">
          <Carousel options={{ loop: false }}>
            <CarouselContent>
              {slides.map((slide, i) => (
                <CarouselItem key={i}>
                  <div className="flex flex-col items-center text-center gap-3 px-10 py-12 bg-surface border border-border-subtle rounded-lg shadow-elev-2">
                    <div
                      className={cn(
                        "h-32 w-full rounded-md mb-4",
                        palette[i % palette.length],
                      )}
                    />
                    <span className="text-label-xs uppercase tracking-wide text-accent-text">
                      {slide.eyebrow}
                    </span>
                    <h3 className="text-heading-md text-fg-default">
                      {slide.title}
                    </h3>
                    <p className="text-body-md text-fg-muted max-w-sm">
                      {slide.body}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
            <div className="flex items-center justify-between mt-4">
              <Button variant="ghost" size="sm">
                Skip
              </Button>
              <div className="flex items-center gap-2">
                <CarouselPrevious
                  className="static translate-y-0 rounded-md"
                  label="Back"
                />
                <CarouselNext
                  className="static translate-y-0 rounded-md"
                  label="Next"
                />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    );
  },
};

export const RtlAuto: Story = {
  name: "RTL (auto-detected from <html dir>)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div lang="ar" dir="rtl" style={{ width: 480 }}>
      <Carousel options={{ loop: true }}>
        <CarouselContent>
          {[
            "الشريحة الأولى",
            "الشريحة الثانية",
            "الشريحة الثالثة",
            "الشريحة الرابعة",
          ].map((label, i) => (
            <CarouselItem key={i}>
              <div
                className={cn(slideClass, palette[i % palette.length])}
                style={{ fontFamily: "var(--font-arabic)" }}
              >
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious label="السابقة" />
        <CarouselNext label="التالية" />
        <CarouselDots />
      </Carousel>
    </div>
  ),
};

export const EmptyStateIllustration: Story = {
  name: "Empty-state hero illustrations (DS canonical use)",
  render: () => (
    <div className="w-[480px] p-8 bg-surface rounded-lg border border-border-subtle">
      <Carousel options={{ loop: true }}>
        <CarouselContent>
          {[
            "No conversations yet",
            "Connect a channel",
            "Invite your team",
          ].map((label, i) => (
            <CarouselItem key={i}>
              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className={cn(
                    "h-40 w-40 rounded-full",
                    palette[i % palette.length],
                  )}
                />
                <p className="text-label-md text-fg-default">{label}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </div>
  ),
};
