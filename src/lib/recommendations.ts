import { CATEGORY_ORDER, CATEGORY_META } from '../data/categories';
import type { CategoryStats } from './categoryStats';
import type { CategoryId } from '../context/types';

export interface NextAction {
  category: CategoryId;
  label: string;
  detail: string;
}

/**
 * Returns the 1-2 categories furthest behind their goal, in deterministic order.
 * Ties are broken by CATEGORY_ORDER (declared display order), never by sort stability alone.
 */
export function getNextActions(stats: CategoryStats[], count = 2): NextAction[] {
  const orderIndex = (id: CategoryId) => CATEGORY_ORDER.indexOf(id);

  const sorted = [...stats].sort((a, b) => {
    if (a.pctOfGoal !== b.pctOfGoal) return a.pctOfGoal - b.pctOfGoal;
    return orderIndex(a.category) - orderIndex(b.category);
  });

  return sorted.slice(0, count).map((s) => {
    const meta = CATEGORY_META[s.category];
    const label =
      s.entryCount === 0
        ? `Start logging ${meta.label}`
        : `Log more ${meta.label}`;
    const detail =
      s.entryCount === 0
        ? `You haven't logged any hours yet — goal is ${meta.goalHours} hrs.`
        : `${Math.round(s.totalHours)} of ${meta.goalHours} hrs logged (${Math.round(s.pctOfGoal)}%).`;
    return { category: s.category, label, detail };
  });
}
