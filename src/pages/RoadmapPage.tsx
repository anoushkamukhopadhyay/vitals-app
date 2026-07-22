import { useAppState } from '../context/AppProvider';
import { ROADMAP } from '../data/roadmap';
import { CATEGORY_META } from '../data/categories';
import { PageShell } from '../components/layout/PageShell/PageShell';
import { Card } from '../components/shared/Card/Card';
import typography from '../styles/typography.module.css';

export function RoadmapPage() {
  const { profile } = useAppState();

  return (
    <PageShell>
      <div>
        <h1 className={typography.headingL}>Four-year roadmap</h1>
        <p className={typography.bodyRegular} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
          Your current year is highlighted below.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ROADMAP.map((yearPlan) => {
          const isCurrent = yearPlan.year === profile.yearInSchool;
          return (
            <Card flagged={isCurrent} key={yearPlan.year}>
              <p
                className={typography.label}
                style={{ color: isCurrent ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
              >
                {isCurrent ? 'YOU ARE HERE' : yearPlan.year.toUpperCase()}
              </p>
              <h2 className={typography.headingS} style={{ marginTop: 4 }}>
                {yearPlan.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {Object.entries(yearPlan.focus).map(([categoryId, text]) => (
                  <p key={categoryId} className={typography.bodySmall}>
                    <strong>{CATEGORY_META[categoryId as keyof typeof CATEGORY_META].label}:</strong>{' '}
                    <span style={{ color: 'var(--color-text-muted)' }}>{text}</span>
                  </p>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
