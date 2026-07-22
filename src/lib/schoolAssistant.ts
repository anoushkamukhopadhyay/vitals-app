import type { School } from '../data/schools';

interface KnowledgeSections {
  mission?: string;
  history?: string;
  curriculum?: string;
  values?: string;
  admissions?: string;
}

const SECTION_LABELS: { key: keyof KnowledgeSections; label: string }[] = [
  { key: 'mission', label: 'Mission' },
  { key: 'history', label: 'History' },
  { key: 'curriculum', label: 'Curriculum' },
  { key: 'values', label: 'Values' },
  { key: 'admissions', label: 'Admissions philosophy' },
];

/** Splits a school's authored knowledge text into its labeled sections (Mission:, History:, etc.). */
function parseKnowledge(knowledge: string): KnowledgeSections {
  const sections: KnowledgeSections = {};
  for (let i = 0; i < SECTION_LABELS.length; i++) {
    const { key, label } = SECTION_LABELS[i];
    const start = knowledge.indexOf(`${label}:`);
    if (start === -1) continue;
    const contentStart = start + label.length + 1;
    const nextLabel = SECTION_LABELS.slice(i + 1).find((l) => knowledge.indexOf(`${l.label}:`) !== -1);
    const end = nextLabel ? knowledge.indexOf(`${nextLabel.label}:`) : knowledge.length;
    sections[key] = knowledge.slice(contentStart, end).trim();
  }
  return sections;
}

const KEYWORD_MAP: { keywords: string[]; section: keyof KnowledgeSections; intro: string }[] = [
  { keywords: ['mission', 'purpose', 'why'], section: 'mission', intro: "According to the school's mission statement" },
  { keywords: ['history', 'founded', 'when was', 'started', 'established'], section: 'history', intro: 'Per the school\'s history' },
  { keywords: ['curriculum', 'program', 'classes', 'clerkship', 'preclinical', 'years'], section: 'curriculum', intro: 'Looking at the curriculum' },
  { keywords: ['value', 'culture', 'care about', 'believe'], section: 'values', intro: 'In terms of stated values' },
  { keywords: ['admission', 'apply', 'applicant', 'looking for', 'gpa', 'mcat', 'chances'], section: 'admissions', intro: "Per the school's admissions philosophy" },
];

/**
 * Simulates a grounded assistant response: matches the question against known
 * keywords and returns the corresponding section of the school's authored
 * "official profile," never text outside it. Runs entirely client-side —
 * no API call, no key required.
 */
export function simulateSchoolAnswer(question: string, school: School): string {
  const sections = parseKnowledge(school.knowledge);
  const lowerQ = question.toLowerCase();

  const match = KEYWORD_MAP.find((entry) => entry.keywords.some((kw) => lowerQ.includes(kw)));

  if (match && sections[match.section]) {
    return `${match.intro}: ${sections[match.section]}`;
  }

  return `That's not something covered in ${school.name}'s official profile. I can answer questions about its mission, history, curriculum, values, or admissions philosophy — try asking about one of those instead of guessing beyond what's published.`;
}
