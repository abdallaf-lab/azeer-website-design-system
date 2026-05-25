import { Image as ImageIcon, ChevronDown, ExternalLink } from 'lucide-react';
import type { FlowBlock } from '../../types';

/**
 * BlockPreview — renders a single content block as it would appear inside
 * WhatsApp's native form sheet. Visually-faithful, not a perfect Meta replica.
 */
export function BlockPreview({ block }: { block: FlowBlock }) {
  const p = block.props as any;
  switch (block.type) {
    case 'Heading':
      return <h3 className="text-[16px] font-semibold leading-tight text-[#1d1d1f]">{p.text || 'Heading'}</h3>;

    case 'SubHeading':
      return <h4 className="text-[14px] font-semibold leading-tight text-[#1d1d1f]">{p.text || 'Sub-heading'}</h4>;

    case 'Caption':
      return <p className="text-[12px] leading-4 text-[#717171]">{p.text || 'Caption'}</p>;

    case 'TextBody':
      return <p className="text-[14px] leading-5 text-[#3a3a3c]">{p.text || 'Body text'}</p>;

    case 'TextInput':
      return (
        <label className="block">
          <span className="block text-[12px] font-medium text-[#3a3a3c]">
            {p.label} {p.required && <span className="text-[#d4375c]">*</span>}
          </span>
          <input
            disabled
            placeholder={p.placeholder}
            className="mt-1 h-10 w-full rounded-lg border border-[#e3e3e3] bg-white px-3 text-[14px] text-[#1d1d1f]"
          />
        </label>
      );

    case 'TextArea':
      return (
        <label className="block">
          <span className="block text-[12px] font-medium text-[#3a3a3c]">{p.label}</span>
          <textarea
            disabled
            placeholder={p.placeholder}
            className="mt-1 min-h-[80px] w-full rounded-lg border border-[#e3e3e3] bg-white p-3 text-[14px] text-[#1d1d1f]"
          />
        </label>
      );

    case 'Date':
      return (
        <label className="block">
          <span className="block text-[12px] font-medium text-[#3a3a3c]">{p.label}</span>
          <input
            type="date"
            disabled
            className="mt-1 h-10 w-full rounded-lg border border-[#e3e3e3] bg-white px-3 text-[14px] text-[#1d1d1f]"
          />
        </label>
      );

    case 'Dropdown':
      return (
        <label className="block">
          <span className="block text-[12px] font-medium text-[#3a3a3c]">{p.label}</span>
          <div className="mt-1 flex h-10 items-center justify-between rounded-lg border border-[#e3e3e3] bg-white px-3 text-[14px] text-[#717171]">
            <span>Select…</span>
            <ChevronDown className="size-4" />
          </div>
        </label>
      );

    case 'RadioButton':
      return (
        <fieldset>
          <legend className="text-[12px] font-medium text-[#3a3a3c]">{p.label}</legend>
          <div className="mt-2 flex flex-col gap-2">
            {(p.options ?? []).map((opt: string, i: number) => (
              <label key={i} className="flex items-center gap-2 text-[14px] text-[#1d1d1f]">
                <span className="size-4 rounded-full border border-[#bfbfbf]" />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      );

    case 'CheckboxGroup':
      return (
        <fieldset>
          <legend className="text-[12px] font-medium text-[#3a3a3c]">{p.label}</legend>
          <div className="mt-2 flex flex-col gap-2">
            {(p.options ?? []).map((opt: string, i: number) => (
              <label key={i} className="flex items-center gap-2 text-[14px] text-[#1d1d1f]">
                <span className="size-4 rounded-[4px] border border-[#bfbfbf]" />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      );

    case 'OptIn':
      return (
        <label className="flex items-start gap-2 text-[13px] text-[#1d1d1f]">
          <span className="mt-0.5 size-4 shrink-0 rounded-[4px] border border-[#bfbfbf]" />
          {p.label}
        </label>
      );

    case 'Image':
      return (
        <div className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-[#e3e3e3] bg-[#fafafa] text-[#a1a1a1]">
          <ImageIcon className="size-6" />
        </div>
      );

    case 'EmbeddedLink':
      return (
        <a className="inline-flex items-center gap-1 text-[14px] text-[#075e54] underline-offset-2 hover:underline">
          {p.text} <ExternalLink className="size-3.5" />
        </a>
      );

    case 'Footer':
      return (
        <button
          disabled
          className="h-11 w-full rounded-full bg-[#075e54] text-[14px] font-semibold text-white"
        >
          {p.label}
        </button>
      );

    default:
      return null;
  }
}
