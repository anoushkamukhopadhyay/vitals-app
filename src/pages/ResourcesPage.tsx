import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CATEGORY_META } from '../data/categories';
import { RESOURCES } from '../data/resources';
import type { CategoryId } from '../context/types';
import { PageShell } from '../components/layout/PageShell/PageShell';
import { Card } from '../components/shared/Card/Card';
import typography from '../styles/typography.module.css';

export function ResourcesPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!categoryId || !(categoryId in CATEGORY_META)) {
    return <Navigate to="/dashboard" replace />;
  }

  const meta = CATEGORY_META[categoryId as CategoryId];
  const ideas = RESOURCES[categoryId as CategoryId];

  return (
    <PageShell>
      <div>
        <Link to="/dashboard" className={typography.bodySmall} style={{ color: 'var(--color-text-muted)' }}>
          ← Dashboard
        </Link>
        <p className={typography.label} style={{ color: 'var(--color-text-muted)', marginTop: 16 }}>
          NEED IDEAS?
        </p>
        <h1 className={typography.headingL} style={{ marginTop: 4 }}>
          {meta.label} ideas
        </h1>
        <p className={typography.bodyRegular} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
          Common ways students build this category. Tap any card to read more.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ideas.map((idea) => {
          const isOpen = expanded === idea.title;
          return (
            <Card key={idea.title} flagged={isOpen}>
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : idea.title)}
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                }}
              >
                <span className={typography.bodyRegular} style={{ fontWeight: isOpen ? 500 : 400 }}>
                  {idea.title}
                </span>
                <span className={typography.bodyRegular} style={{ color: 'var(--color-text-muted)' }}>
                  {isOpen ? '⌄' : '›'}
                </span>
              </button>
              {isOpen && (
                <p className={typography.bodySmall} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
                  {idea.blurb}
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
