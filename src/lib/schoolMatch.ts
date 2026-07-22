import { CATEGORY_META } from '../data/categories';
import { SCHOOLS, type School } from '../data/schools';
import type { CategoryStats } from './categoryStats';
import type { CategoryId } from '../context/types';

export interface DominantCategoryResult {
  category: CategoryId;
  totalHours: number;
  totalLoggedHours: number;
  pctOfTotal: number;
}

/** Returns the category with the most logged hours, or null if nothing has been logged yet. */
export function getDominantCategory(stats: CategoryStats[]): DominantCategoryResult | null {
  const totalLoggedHours = stats.reduce((sum, s) => sum + s.totalHours, 0);
  if (totalLoggedHours === 0) return null;

  const top = stats.reduce((best, s) => (s.totalHours > best.totalHours ? s : best), stats[0]);
  if (top.totalHours === 0) return null;

  return {
    category: top.category,
    totalHours: top.totalHours,
    totalLoggedHours,
    pctOfTotal: (top.totalHours / totalLoggedHours) * 100,
  };
}

export interface SchoolMatch {
  school: School;
  rationale: string;
}

/**
 * Surfaces schools whose emphasis matches the user's dominant logged category,
 * with a rationale string built from real numbers. Returns [] if nothing logged yet —
 * callers should render an explicit empty state rather than a misleading rationale.
 */
export function matchSchools(stats: CategoryStats[], schools: School[] = SCHOOLS): SchoolMatch[] {
  const dominant = getDominantCategory(stats);
  if (!dominant) return [];

  const matched = schools.filter((s) => s.emphasis === dominant.category);
  const meta = CATEGORY_META[dominant.category];
  const pct = Math.round(dominant.pctOfTotal);
  const hoursRounded = Math.round(dominant.totalHours * 10) / 10;
  const totalRounded = Math.round(dominant.totalLoggedHours * 10) / 10;

  const rationale = `Shown because your profile is ${meta.label.toLowerCase()}-heavy — ${pct}% of your logged hours (${hoursRounded} / ${totalRounded}) are in ${meta.label}.`;

  return matched.map((school) => ({ school, rationale }));
}
