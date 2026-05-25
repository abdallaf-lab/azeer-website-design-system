"use client";

import { Star, CheckCheck, Phone, Video, ArrowLeft } from "lucide-react";
import { useLocale } from "./locale-context";
import { cn } from "@/lib/utils";

function StarRow() {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="inline-flex size-7 items-center justify-center rounded-md border border-zinc-200 bg-white">
          <Star className="size-4 text-amber" fill="#FFC857" strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}

const incoming = "max-w-[85%] me-auto rounded-lg rounded-ss-sm bg-white px-3 py-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]";
const outgoing = "max-w-[75%] ms-auto rounded-lg rounded-se-sm bg-[#DCF8C6] px-3 py-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]";

export function PhoneSurvey({ className }: { className?: string }) {
  const { t, dir } = useLocale();
  const p = t.survey.phone;
  return (
    <div
      dir={dir}
      className={cn(
        "mx-auto w-[300px] max-w-full overflow-hidden rounded-[28px] border-[10px] border-zinc-900 bg-zinc-900",
        className
      )}
    >
      <div className="relative bg-[#075E54] pt-2">
        <div className="mx-auto mb-1 h-1 w-16 rounded-full bg-black/30" />
        <div className="flex items-center gap-2.5 px-3 pb-2.5 text-white">
          <ArrowLeft className="size-4 opacity-90 rtl:rotate-180" />
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/20 text-[13px] font-semibold">
            A
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-medium leading-tight">{p.contact}</div>
            <div className="text-[11px] leading-tight text-white/70">{p.online}</div>
          </div>
          <Video className="size-4 opacity-90" />
          <Phone className="size-4 opacity-90" />
        </div>
      </div>

      <div className="space-y-2.5 bg-[#E5DDD5] bg-dots px-3 py-4">
        <div className={incoming}>
          <p className="text-[13px] leading-snug text-zinc-800">{p.greeting}</p>
          <StarRow />
          <div className="mt-1.5 text-end text-[10px] text-zinc-400">9:41</div>
        </div>

        <div className={outgoing}>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="size-3.5 text-amber" fill="#FFC857" strokeWidth={0} />
            ))}
          </div>
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-zinc-500">
            9:41 <CheckCheck className="size-3.5 text-[#4FC3F7]" />
          </div>
        </div>

        <div className={incoming}>
          <p className="text-[13px] leading-snug text-zinc-800">{p.commentAsk}</p>
          <div className="mt-1 text-end text-[10px] text-zinc-400">9:41</div>
        </div>

        <div className={outgoing}>
          <p className="text-[13px] leading-snug text-zinc-800">{p.reply}</p>
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-zinc-500">
            9:42 <CheckCheck className="size-3.5 text-[#4FC3F7]" />
          </div>
        </div>
      </div>
    </div>
  );
}
