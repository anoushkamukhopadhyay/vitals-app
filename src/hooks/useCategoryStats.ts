import { useMemo } from 'react';
import { useAppState } from '../context/AppProvider';
import { computeCategoryStats, type CategoryStats } from '../lib/categoryStats';

export function useCategoryStats(): CategoryStats[] {
  const { entries } = useAppState();
  return useMemo(() => computeCategoryStats(entries), [entries]);
}
