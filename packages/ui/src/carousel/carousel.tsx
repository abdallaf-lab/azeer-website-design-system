import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Button } from "../button";

type EmblaViewportRef = ReturnType<typeof useEmblaCarousel>[0];

interface CarouselContextValue {
  emblaRef: EmblaViewportRef;
  emblaApi: EmblaCarouselType | undefined;
  canPrev: boolean;
  canNext: boolean;
  selectedIndex: number;
  slideCount: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  orientation: "horizontal" | "vertical";
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    throw new Error(
      "Carousel.* subcomponents must be rendered inside <Carousel>",
    );
  }
  return ctx;
}

/** Hook escape hatch for consumers that need direct Embla API access. */
export function useCarousel() {
  return useCarouselContext();
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pass-through Embla options (`loop`, `align`, `slidesToScroll`, `dragFree`, etc). */
  options?: EmblaOptionsType;
  /**
   * Slide direction. Defaults to `<html dir>` at mount (auto-RTL). Override
   * here to force a direction independent of the document.
   */
  direction?: "ltr" | "rtl";
  /** Layout axis. Default `"horizontal"`. */
  orientation?: "horizontal" | "vertical";
  /** Receive the Embla API once it's ready (for external controls / autoplay plugins). */
  onApiReady?: (api: EmblaCarouselType) => void;
}

/**
 * Carousel — slide / image carousel built on `embla-carousel-react`.
 *
 * DS canon defers a full Carousel to v1.1+ ("empty-state illustrations,
 * onboarding tour"). This is the v1.1 promotion: Embla as the gesture /
 * scroll-snap engine (touch + keyboard + reduced-motion aware), with
 * slot-composed UI on top:
 *
 *   <Carousel options={{ loop: true }}>
 *     <CarouselContent>
 *       <CarouselItem>…</CarouselItem>
 *       <CarouselItem>…</CarouselItem>
 *     </CarouselContent>
 *     <CarouselPrevious />
 *     <CarouselNext />
 *     <CarouselDots />
 *   </Carousel>
 *
 * RTL: the carousel reads `<html dir>` on mount and tells Embla to flip the
 * slide direction. Override with `direction` if needed (e.g. an Arabic image
 * tour inside an LTR settings dialog).
 *
 * The `flipOnRtl` Icon prop handles chevron mirroring on the prev / next
 * buttons so the arrow always points "in the direction of travel".
 */
export function Carousel({
  options,
  direction,
  orientation = "horizontal",
  onApiReady,
  className,
  children,
  ...rest
}: CarouselProps) {
  const resolvedDir = React.useMemo(() => {
    if (direction) return direction;
    if (typeof document !== "undefined") {
      return document.documentElement.dir === "rtl" ? "rtl" : "ltr";
    }
    return "ltr";
  }, [direction]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: orientation === "vertical" ? "y" : "x",
    direction: resolvedDir,
    ...options,
  });

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    onApiReady?.(emblaApi);
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setSlideCount(emblaApi.slideNodes().length);
    };
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update);
    };
  }, [emblaApi, onApiReady]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (orientation === "horizontal") {
      if (ev.key === "ArrowLeft") {
        scrollPrev();
        ev.preventDefault();
      } else if (ev.key === "ArrowRight") {
        scrollNext();
        ev.preventDefault();
      }
    } else {
      if (ev.key === "ArrowUp") {
        scrollPrev();
        ev.preventDefault();
      } else if (ev.key === "ArrowDown") {
        scrollNext();
        ev.preventDefault();
      }
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        emblaRef,
        emblaApi,
        canPrev,
        canNext,
        selectedIndex,
        slideCount,
        scrollPrev,
        scrollNext,
        scrollTo,
        orientation,
      }}
    >
      <div
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { emblaRef, orientation } = useCarouselContext();
  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { orientation } = useCarouselContext();
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "ps-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

export interface CarouselNavButtonProps {
  className?: string;
  /** Accessible label. Default `"Previous slide"` / `"Next slide"`. */
  label?: string;
}

export function CarouselPrevious({
  className,
  label = "Previous slide",
}: CarouselNavButtonProps) {
  const { canPrev, scrollPrev, orientation } = useCarouselContext();
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      onClick={scrollPrev}
      disabled={!canPrev}
      aria-label={label}
      className={cn(
        "absolute rounded-full",
        orientation === "horizontal"
          ? "start-2 top-1/2 -translate-y-1/2"
          : "start-1/2 top-2 -translate-x-1/2 rotate-90",
        className,
      )}
    >
      <Icon icon={ChevronLeft} size={14} flipOnRtl aria-hidden="true" />
    </Button>
  );
}

export function CarouselNext({
  className,
  label = "Next slide",
}: CarouselNavButtonProps) {
  const { canNext, scrollNext, orientation } = useCarouselContext();
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      onClick={scrollNext}
      disabled={!canNext}
      aria-label={label}
      className={cn(
        "absolute rounded-full",
        orientation === "horizontal"
          ? "end-2 top-1/2 -translate-y-1/2"
          : "start-1/2 bottom-2 -translate-x-1/2 rotate-90",
        className,
      )}
    >
      <Icon icon={ChevronRight} size={14} flipOnRtl aria-hidden="true" />
    </Button>
  );
}

export interface CarouselDotsProps {
  className?: string;
  /** Accessible label generator. Default `(i) => \`Go to slide ${i + 1}\``. */
  ariaLabel?: (index: number) => string;
}

export function CarouselDots({
  className,
  ariaLabel = (i) => `Go to slide ${i + 1}`,
}: CarouselDotsProps) {
  const { slideCount, selectedIndex, scrollTo } = useCarouselContext();
  if (slideCount <= 1) return null;
  return (
    <div
      role="tablist"
      aria-label="Slide navigation"
      className={cn(
        "flex items-center justify-center gap-1.5 pt-3",
        className,
      )}
    >
      {Array.from({ length: slideCount }, (_, i) => {
        const active = i === selectedIndex;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            onClick={() => scrollTo(i)}
            aria-label={ariaLabel(i)}
            aria-selected={active}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full transition-all duration-base ease-standard",
              "cursor-pointer",
              active
                ? "h-2 w-6 bg-accent-fill"
                : "h-2 w-2 bg-border-strong hover:bg-border-focus",
            )}
          />
        );
      })}
    </div>
  );
}
