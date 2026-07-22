import type { CategoryId } from '../context/types';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  abbrev: string;
  goalHours: number;
  description: string;
}

// Display order is also the deterministic tie-break order used by lib/recommendations.ts
export const CATEGORY_ORDER: CategoryId[] = [
  'research',
  'clinicalShadowing',
  'service',
  'coursework',
  'leadership',
];

export const CATEGORY_META: Record<CategoryId, CategoryMeta> = {
  research: {
    id: 'research',
    label: 'Research',
    abbrev: 'RE',
    goalHours: 320,
    description: 'Lab work, literature reviews, posters, and independent projects.',
  },
  clinicalShadowing: {
    id: 'clinicalShadowing',
    label: 'Clinical / Shadowing',
    abbrev: 'CL',
    goalHours: 300,
    description: 'Direct patient-facing work and physician shadowing.',
  },
  service: {
    id: 'service',
    label: 'Service',
    abbrev: 'SV',
    goalHours: 350,
    description: 'Community service, hospital volunteering, and outreach.',
  },
  coursework: {
    id: 'coursework',
    label: 'Coursework',
    abbrev: 'CW',
    goalHours: 150,
    description: 'Rigorous coursework, self-study, and MCAT preparation time.',
  },
  leadership: {
    id: 'leadership',
    label: 'Leadership',
    abbrev: 'LE',
    goalHours: 100,
    description: 'Officer roles, mentorship, and organizing initiatives.',
  },
};

export const CATEGORY_LIST: CategoryMeta[] = CATEGORY_ORDER.map((id) => CATEGORY_META[id]);
