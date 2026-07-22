import type { CategoryId } from '../context/types';

export interface School {
  id: string;
  name: string;
  emphasis: CategoryId;
  tagline: string;
}

export const SCHOOLS: School[] = [
  {
    id: 'northfield',
    name: 'Northfield School of Medicine',
    emphasis: 'research',
    tagline: 'Strong NIH-funded research tracks and dedicated research years.',
  },
  {
    id: 'cascade',
    name: 'Cascade University College of Medicine',
    emphasis: 'clinicalShadowing',
    tagline: 'Early clinical immersion with longitudinal patient-care rotations.',
  },
  {
    id: 'harborview',
    name: 'Harborview School of Medicine',
    emphasis: 'service',
    tagline: 'Community health focus with strong underserved-care partnerships.',
  },
  {
    id: 'wrenfield',
    name: 'Wrenfield College of Medicine',
    emphasis: 'leadership',
    tagline: 'Health-policy and physician-leadership dual-degree pathways.',
  },
  {
    id: 'ashcombe',
    name: 'Ashcombe University School of Medicine',
    emphasis: 'coursework',
    tagline: 'Rigorous, exam-focused preclinical curriculum with strong board outcomes.',
  },
];
