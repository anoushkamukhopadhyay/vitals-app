import { CATEGORY_META } from '../../../data/categories';
import type { CategoryId } from '../../../context/types';
import typography from '../../../styles/typography.module.css';
import styles from './CategoryBadge.module.css';

interface CategoryBadgeProps {
  category: CategoryId;
  flagged?: boolean;
}

export function CategoryBadge({ category, flagged }: CategoryBadgeProps) {
  const meta = CATEGORY_META[category];
  const classes = [styles.badge, flagged ? styles.flagged : ''].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <span className={typography.bodySmall}>{meta.abbrev}</span>
    </div>
  );
}
