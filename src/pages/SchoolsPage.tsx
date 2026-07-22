import { Link } from 'react-router-dom';
import { useCategoryStats } from '../hooks/useCategoryStats';
import { matchSchools } from '../lib/schoolMatch';
import { PageShell } from '../components/layout/PageShell/PageShell';
import { Card } from '../components/shared/Card/Card';
import typography from '../styles/typography.module.css';

export function SchoolsPage() {
  const stats = useCategoryStats();
  const matches = matchSchools(stats);

  return (
    <PageShell>
      <div>
        <h1 className={typography.headingL}>Matched schools</h1>
        <p className={typography.bodyRegular} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
          Matches are computed from your logged hours, not a static list.
        </p>
      </div>

      {matches.length === 0 ? (
        <Card>
          <p className={typography.bodyRegular}>
            Log some experience on the <Link to="/log">Log</Link> tab to see schools matched to your
            profile.
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {matches.map(({ school, rationale }) => (
            <Card key={school.id}>
              <h2 className={typography.headingS}>{school.name}</h2>
              <p className={typography.bodySmall} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
                {rationale}
              </p>
              <p className={typography.bodySmall} style={{ color: 'var(--color-base-dark)', marginTop: 8 }}>
                {school.tagline}
              </p>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}
