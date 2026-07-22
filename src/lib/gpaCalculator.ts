import type { GpaInputs } from '../context/types';

export interface GpaScenario {
  label: string;
  gradeValue: number;
  projectedScience: number;
  projectedCumulative: number;
}

const SCENARIOS: { label: string; gradeValue: number }[] = [
  { label: "All A's (4.0)", gradeValue: 4.0 },
  { label: 'A-/B+ mix (3.5)', gradeValue: 3.5 },
  { label: "All B's (3.0)", gradeValue: 3.0 },
];

function projectGpa(currentGpa: number, creditsCompleted: number, creditsRemaining: number, gradeValue: number): number {
  const totalCredits = creditsCompleted + creditsRemaining;
  if (totalCredits <= 0) return currentGpa;
  const currentPoints = currentGpa * creditsCompleted;
  const projectedPoints = gradeValue * creditsRemaining;
  return (currentPoints + projectedPoints) / totalCredits;
}

export function computeGpaScenarios(inputs: GpaInputs): GpaScenario[] {
  return SCENARIOS.map((s) => ({
    label: s.label,
    gradeValue: s.gradeValue,
    projectedScience: projectGpa(inputs.scienceGpa, inputs.creditsCompleted, inputs.creditsRemaining, s.gradeValue),
    projectedCumulative: projectGpa(
      inputs.cumulativeGpa,
      inputs.creditsCompleted,
      inputs.creditsRemaining,
      s.gradeValue,
    ),
  }));
}
