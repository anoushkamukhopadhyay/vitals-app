import { CATEGORY_ORDER, CATEGORY_META } from '../data/categories';
import type { CategoryId, LogEntry } from '../context/types';

export interface CategoryStats {
  category: CategoryId;
  totalHours: number;
  goalHours: number;
  pctOfGoal: number; // capped 0-100
  entryCount: number;
}

export function computeCategoryStats(entries: LogEntry[]): CategoryStats[] {
  return CATEGORY_ORDER.map((category) => {
    const categoryEntries = entries.filter((e) => e.category === category);
    const totalHours = categoryEntries.reduce((sum, e) => sum + e.hours, 0);
    const goalHours = CATEGORY_META[category].goalHours;
    const pctOfGoal = goalHours > 0 ? Math.min(100, (totalHours / goalHours) * 100) : 0;
    return {
      category,
      totalHours,
      goalHours,
      pctOfGoal,
      entryCount: categoryEntries.length,
    };
  });
}
