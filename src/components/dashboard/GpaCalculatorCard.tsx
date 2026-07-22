import { useState } from 'react';
import { useAppState, useAppDispatch } from '../../context/AppProvider';
import { LETTER_GRADES, type LetterGrade } from '../../context/types';
import { computeProjectedGpa } from '../../lib/gpaCalculator';
import { Card } from '../shared/Card/Card';
import { Button } from '../shared/Button/Button';
import typography from '../../styles/typography.module.css';

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid var(--color-text-muted)',
  background: 'transparent',
  color: 'var(--color-base-dark)',
  width: '100%',
};

const smallLabel: React.CSSProperties = { color: 'var(--color-text-muted)', fontSize: 10 };

export function GpaCalculatorCard() {
  const { gpaInputs } = useAppState();
  const dispatch = useAppDispatch();
  const projected = computeProjectedGpa(gpaInputs);

  const [newCredits, setNewCredits] = useState('3');
  const [newGrade, setNewGrade] = useState<LetterGrade>('A');
  const [newIsScience, setNewIsScience] = useState(true);

  function update(field: 'scienceGpa' | 'cumulativeGpa' | 'scienceCreditsCompleted' | 'cumulativeCreditsCompleted', value: string) {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    dispatch({ type: 'SET_GPA_INPUTS', payload: { [field]: num } });
  }

  function addClass() {
    const credits = Number(newCredits);
    if (Number.isNaN(credits) || credits <= 0) return;
    dispatch({ type: 'ADD_GPA_CLASS', payload: { credits, grade: newGrade, isScience: newIsScience } });
    setNewCredits('3');
    setNewGrade('A');
    setNewIsScience(true);
  }

  return (
    <Card>
      <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
        COURSEWORK · GPA CALCULATOR
      </p>

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className={typography.label} style={smallLabel}>
            SCIENCE GPA
          </span>
          <input
            type="number"
            step={0.01}
            min={0}
            max={4}
            value={gpaInputs.scienceGpa}
            onChange={(e) => update('scienceGpa', e.target.value)}
            className={typography.bodyRegular}
            style={inputStyle}
          />
        </label>
        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className={typography.label} style={smallLabel}>
            CUMULATIVE GPA
          </span>
          <input
            type="number"
            step={0.01}
            min={0}
            max={4}
            value={gpaInputs.cumulativeGpa}
            onChange={(e) => update('cumulativeGpa', e.target.value)}
            className={typography.bodyRegular}
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className={typography.label} style={smallLabel}>
            SCIENCE CREDITS SO FAR
          </span>
          <input
            type="number"
            min={0}
            value={gpaInputs.scienceCreditsCompleted}
            onChange={(e) => update('scienceCreditsCompleted', e.target.value)}
            className={typography.bodyRegular}
            style={inputStyle}
          />
        </label>
        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className={typography.label} style={smallLabel}>
            CUMULATIVE CREDITS SO FAR
          </span>
          <input
            type="number"
            min={0}
            value={gpaInputs.cumulativeCreditsCompleted}
            onChange={(e) => update('cumulativeCreditsCompleted', e.target.value)}
            className={typography.bodyRegular}
            style={inputStyle}
          />
        </label>
      </div>

      <p className={typography.bodySmall} style={{ color: 'var(--color-base-dark)', marginTop: 16 }}>
        This semester's classes
      </p>

      {gpaInputs.classes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
          {gpaInputs.classes.map((c) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span className={typography.bodySmall} style={{ color: 'var(--color-base-dark)' }}>
                {c.credits} cr · {c.grade}
                {c.isScience ? ' · science' : ''}
              </span>
              <button
                type="button"
                onClick={() => dispatch({ type: 'REMOVE_GPA_CLASS', payload: { id: c.id } })}
                className={typography.bodySmall}
                style={{ background: 'none', border: 'none', color: 'var(--color-accent)', padding: 0 }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 64 }}>
          <span className={typography.label} style={smallLabel}>
            CREDITS
          </span>
          <input
            type="number"
            min={1}
            value={newCredits}
            onChange={(e) => setNewCredits(e.target.value)}
            className={typography.bodyRegular}
            style={inputStyle}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 72 }}>
          <span className={typography.label} style={smallLabel}>
            GRADE
          </span>
          <select
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value as LetterGrade)}
            className={typography.bodyRegular}
            style={inputStyle}
          >
            {LETTER_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 10 }}>
          <input type="checkbox" checked={newIsScience} onChange={(e) => setNewIsScience(e.target.checked)} />
          <span className={typography.bodySmall} style={{ color: 'var(--color-text-muted)' }}>
            Science
          </span>
        </label>
        <Button variant="secondary" onClick={addClass} style={{ width: 'auto', padding: '10px 16px' }}>
          + Add class
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 16,
          paddingTop: 12,
          borderTop: '1px solid var(--color-text-muted-20)',
        }}
      >
        <span className={typography.bodySmall} style={{ color: 'var(--color-text-muted)' }}>
          Projected end of semester
        </span>
        <span className={typography.bodyRegular} style={{ color: 'var(--color-base-dark)' }}>
          Sci {projected.projectedScience.toFixed(2)} · Cum {projected.projectedCumulative.toFixed(2)}
        </span>
      </div>
    </Card>
  );
}
