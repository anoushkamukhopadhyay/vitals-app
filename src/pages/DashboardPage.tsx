import { Link } from 'react-router-dom';
import { useAppState } from '../context/AppProvider';
import { useCategoryStats } from '../hooks/useCategoryStats';
import { getNextActions } from '../lib/recommendations';
import { PageShell } from '../components/layout/PageShell/PageShell';
import { Card } from '../components/shared/Card/Card';
import { CategoryBadge } from '../components/shared/CategoryBadge/CategoryBadge';
import { BalanceMeters } from '../components/shared/BalanceMeters/BalanceMeters';
import typography from '../styles/typography.module.css';

export function DashboardPage() {
  const { profile, entries } = useAppState();
  const stats = useCategoryStats();
  const nextActions = getNextActions(stats, 2);

  return (
    <PageShell>
      <div>
        <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
          {profile.yearInSchool?.toUpperCase()} YEAR
        </p>
        <h1 className={typography.headingL} style={{ marginTop: 4 }}>
          Your balance
        </h1>
      </div>

      {entries.length === 0 && (
        <Card>
          <p className={typography.bodyRegular}>
            No hours logged yet. Head to <Link to="/log">Log</Link> to add your first experience —
            your balance and recommendations below will update immediately.
          </p>
        </Card>
      )}

      <div>
        <h2 className={typography.headingM}>Next up</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          {nextActions.map((action, i) => (
            <Card flagged={i === 0} key={action.category}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CategoryBadge category={action.category} flagged={i === 0} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className={typography.bodyRegular}>{action.label}</p>
                  <p
                    className={typography.bodySmall}
                    style={{ color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
                  >
                    {action.detail}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className={typography.headingM}>Category balance</h2>
        <div style={{ marginTop: 16 }}>
          <BalanceMeters stats={stats} />
        </div>
      </div>
    </PageShell>
  );
}
