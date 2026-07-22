import { GRADE_POINTS, type GpaInputs } from '../context/types';

export interface ProjectedGpa {
  projectedScience: number;
  projectedCumulative: number;
  scienceCreditsThisTerm: number;
  cumulativeCreditsThisTerm: number;
}

/**
 * Projects science and cumulative GPA by adding this term's classes
 * (each with its own credits + grade) to the current GPA/credit base.
 * Every class counts toward cumulative; only classes flagged isScience
 * also count toward the science GPA.
 */
export function computeProjectedGpa(inputs: GpaInputs): ProjectedGpa {
  const termCredits = inputs.classes.reduce((sum, c) => sum + c.credits, 0);
  const termPoints = inputs.classes.reduce((sum, c) => sum + c.credits * GRADE_POINTS[c.grade], 0);

  const scienceClasses = inputs.classes.filter((c) => c.isScience);
  const scienceTermCredits = scienceClasses.reduce((sum, c) => sum + c.credits, 0);
  const scienceTermPoints = scienceClasses.reduce((sum, c) => sum + c.credits * GRADE_POINTS[c.grade], 0);

  const totalCumulativeCredits = inputs.cumulativeCreditsCompleted + termCredits;
  const totalScienceCredits = inputs.scienceCreditsCompleted + scienceTermCredits;

  const projectedCumulative =
    totalCumulativeCredits > 0
      ? (inputs.cumulativeGpa * inputs.cumulativeCreditsCompleted + termPoints) / totalCumulativeCredits
      : inputs.cumulativeGpa;

  const projectedScience =
    totalScienceCredits > 0
      ? (inputs.scienceGpa * inputs.scienceCreditsCompleted + scienceTermPoints) / totalScienceCredits
      : inputs.scienceGpa;

  return {
    projectedScience,
    projectedCumulative,
    scienceCreditsThisTerm: scienceTermCredits,
    cumulativeCreditsThisTerm: termCredits,
  };
}
