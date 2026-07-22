import { useState, type FormEvent } from 'react';
import { useAppState, useAppDispatch } from '../context/AppProvider';
import type { CategoryId } from '../context/types';
import { CATEGORY_LIST, CATEGORY_META } from '../data/categories';
import { PageShell } from '../components/layout/PageShell/PageShell';
import { Card } from '../components/shared/Card/Card';
import { SelectableChip } from '../components/shared/SelectableChip/SelectableChip';
import { Button } from '../components/shared/Button/Button';
import typography from '../styles/typography.module.css';

export function LogEntryPage() {
  const { entries } = useAppState();
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<CategoryId | null>(null);
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const hoursNum = Number(hours);
  const canSubmit = category !== null && hoursNum > 0 && description.trim().length > 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || !category) return;
    dispatch({ type: 'ADD_ENTRY', payload: { category, hours: hoursNum, description: description.trim() } });
    setConfirmation(`Logged ${hoursNum} hrs of ${CATEGORY_META[category].label}. Check the Dashboard and Schools tabs.`);
    setCategory(null);
    setHours('');
    setDescription('');
  }

  const recent = [...entries].reverse().slice(0, 5);

  return (
    <PageShell>
      <div>
        <h1 className={typography.headingL}>Log an experience</h1>
        <p className={typography.bodyRegular} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
          This updates your balance and recommendations right away.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p className={typography.label} style={{ color: 'var(--color-text-muted)', marginBottom: 12 }}>
            CATEGORY
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {CATEGORY_LIST.map((cat) => (
              <SelectableChip
                key={cat.id}
                label={cat.label}
                selected={category === cat.id}
                onClick={() => setCategory(cat.id)}
              />
            ))}
          </div>
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
            HOURS
          </span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g. 4"
            className={typography.bodyRegular}
            style={{
              padding: '14px 16px',
              borderRadius: 10,
              border: '1px solid var(--color-text-muted)',
              background: 'transparent',
              color: 'var(--color-base-dark)',
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
            DESCRIPTION
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you do?"
            rows={3}
            className={typography.bodyRegular}
            style={{
              padding: '14px 16px',
              borderRadius: 10,
              border: '1px solid var(--color-text-muted)',
              background: 'transparent',
              color: 'var(--color-base-dark)',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </label>

        <Button type="submit" disabled={!canSubmit}>
          Add entry
        </Button>

        {confirmation && (
          <Card>
            <p className={typography.bodySmall}>{confirmation}</p>
          </Card>
        )}
      </form>

      {recent.length > 0 && (
        <div>
          <h2 className={typography.headingM}>Recent entries</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            {recent.map((entry) => (
              <Card key={entry.id}>
                <p className={typography.bodyRegular}>
                  {entry.hours} hrs · {CATEGORY_META[entry.category].label}
                </p>
                <p className={typography.bodySmall} style={{ color: 'var(--color-text-muted)', marginTop: 4 }}>
                  {entry.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
