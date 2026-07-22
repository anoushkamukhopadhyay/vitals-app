import { Link } from 'react-router-dom';
import { CATEGORY_META } from '../../../data/categories';
import type { CategoryStats } from '../../../lib/categoryStats';
import typography from '../../../styles/typography.module.css';
import styles from './BalanceMeters.module.css';

interface BalanceMetersProps {
  stats: CategoryStats[];
}

/**
 * Visualizes balance across categories as a set of single-hue progress meters
 * (one row per category) rather than a radar chart — a radar distorts area
 * perception across non-adjacent axes, while a meter keeps each category's
 * progress independently and precisely readable.
 */
export function BalanceMeters({ stats }: BalanceMetersProps) {
  return (
    <div className={styles.list}>
      {stats.map((s) => {
        const meta = CATEGORY_META[s.category];
        const pct = Math.round(s.pctOfGoal);
        return (
          <div className={styles.row} key={s.category}>
            <div className={styles.rowHeader}>
              <span className={`${typography.bodyRegular} ${styles.label}`}>{meta.label}</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className={`${typography.bodySmall} ${styles.value}`}>
                  {Math.round(s.totalHours)} / {meta.goalHours} hrs
                </span>
                <Link
                  to={`/resources/${s.category}`}
                  className={typography.bodySmall}
                  style={{ color: 'var(--color-base-dark)', whiteSpace: 'nowrap' }}
                >
                  Need ideas? →
                </Link>
              </div>
            </div>
            <div
              className={styles.track}
              role="img"
              aria-label={`${meta.label}: ${Math.round(s.totalHours)} of ${meta.goalHours} hours logged, ${pct}% of goal`}
            >
              <div className={styles.fill} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
