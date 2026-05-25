import type { FlowBlock, FlowBlockType } from '../../types';

/** Default props per block type — enough to render a sensible preview right away. */
const defaults: Record<FlowBlockType, FlowBlock['props']> = {
  Heading: { text: 'Heading' },
  SubHeading: { text: 'Sub-heading' },
  Caption: { text: 'Caption text' },
  TextBody: { text: 'Body paragraph copy.' },
  TextInput: { label: 'Label', placeholder: 'Type here…', required: false },
  TextArea: { label: 'Label', placeholder: 'Type here…' },
  Date: { label: 'Date', required: false },
  Dropdown: { label: 'Choose one', options: ['Option A', 'Option B', 'Option C'] },
  RadioButton: { label: 'Pick one', options: ['Option A', 'Option B'] },
  CheckboxGroup: { label: 'Pick any', options: ['Option A', 'Option B'] },
  OptIn: { label: 'I agree to receive updates' },
  Image: { src: '', alt: 'Image' },
  EmbeddedLink: { text: 'Open link', url: 'https://example.com' },
  Footer: { label: 'Continue' },
};

export function makeBlock(type: FlowBlockType): FlowBlock {
  return {
    id: `b_${Math.random().toString(36).slice(2, 9)}`,
    type,
    props: { ...defaults[type] },
  };
}

export const ALL_BLOCKS: FlowBlockType[] = [
  'Heading',
  'SubHeading',
  'Caption',
  'TextBody',
  'TextInput',
  'TextArea',
  'Date',
  'Dropdown',
  'RadioButton',
  'CheckboxGroup',
  'OptIn',
  'Image',
  'EmbeddedLink',
  'Footer',
];
