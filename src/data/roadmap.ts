import type { CategoryId, YearInSchool } from '../context/types';

export interface RoadmapYear {
  year: YearInSchool;
  title: string;
  focus: Partial<Record<CategoryId, string>>;
}

export const ROADMAP: RoadmapYear[] = [
  {
    year: 'Freshman',
    title: 'Year 1 — Explore',
    focus: {
      coursework: 'Build a strong foundation in intro sciences; find your study rhythm.',
      service: 'Start a recurring volunteering commitment — consistency matters more than hours yet.',
      leadership: 'Join a club or org; observe how it runs before seeking an officer role.',
    },
  },
  {
    year: 'Sophomore',
    title: 'Year 2 — Build',
    focus: {
      research: 'Join a lab or research group, even in a support role.',
      clinicalShadowing: 'Start shadowing physicians across a few specialties.',
      leadership: 'Take on a small leadership or mentorship role.',
    },
  },
  {
    year: 'Junior',
    title: 'Year 3 — Deepen',
    focus: {
      research: 'Aim for a poster, presentation, or co-authorship.',
      clinicalShadowing: 'Log substantial clinical hours; consider an EMT/CNA/scribe role.',
      mcat: 'Take a full-length diagnostic and start a structured study plan.',
    },
  },
  {
    year: 'Senior',
    title: 'Year 4 — Apply',
    focus: {
      mcat: 'Sit for the MCAT with enough buffer to retake if needed.',
      coursework: 'Finalize your cumulative and science GPA.',
      service: 'Round out your service record before submitting primaries.',
      leadership: 'Highlight sustained leadership impact in your application narrative.',
    },
  },
  {
    year: 'Post-bacc / Gap year',
    title: 'Gap Year — Strengthen & Apply',
    focus: {
      research: 'Use flexible time for a substantial research or clinical research role.',
      clinicalShadowing: 'Take on paid clinical work (scribe, EMT, CNA) for depth and income.',
      mcat: 'Use extra time to meaningfully improve your MCAT score if retaking.',
      coursework: 'Address any GPA trends with post-bacc coursework if needed.',
    },
  },
];
