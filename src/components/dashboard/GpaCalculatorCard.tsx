import { useAppState, useAppDispatch } from '../../context/AppProvider';
import { computeGpaScenarios } from '../../lib/gpaCalculator';
import { Card } from '../shared/Card/Card';
import typography from '../../styles/typography.module.css';

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid var(--color-text-muted)',
  background: 'transparent',
  color: 'var(--color-base-dark)',
  width: '100%',
};

export function GpaCalculatorCard() {
  const { gpaInputs } = useAppState();
  const dispatch = useAppDispatch();
  const scenarios = computeGpaScenarios(gpaInputs);

  function update(field: keyof typeof gpaInputs, value: string) {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    dispatch({ type: 'SET_GPA_INPUTS', payload: { [field]: num } });
  }

  return (
    <Card>
      <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
        COURSEWORK · GPA CALCULATOR
      </p>

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className={typography.label} style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>
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
          <span className={typography.label} style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>
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
          <span className={typography.label} style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>
            CREDITS COMPLETED
          </span>
          <input
            type="number"
            min={0}
            value={gpaInputs.creditsCompleted}
            onChange={(e) => update('creditsCompleted', e.target.value)}
            className={typography.bodyRegular}
            style={inputStyle}
          />
        </label>
        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className={typography.label} style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>
            CREDITS REMAINING
          </span>
          <input
            type="number"
            min={0}
            value={gpaInputs.creditsRemaining}
            onChange={(e) => update('creditsRemaining', e.target.value)}
            className={typography.bodyRegular}
            style={inputStyle}
          />
        </label>
      </div>

      <p className={typography.bodySmall} style={{ color: 'var(--color-base-dark)', marginTop: 16 }}>
        If your remaining credits average…
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
        {scenarios.map((s) => (
          <div
            key={s.label}
            style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}
          >
            <span className={typography.bodySmall} style={{ color: 'var(--color-text-muted)' }}>
              {s.label}
            </span>
            <span className={typography.bodySmall} style={{ color: 'var(--color-base-dark)' }}>
              Sci {s.projectedScience.toFixed(2)} · Cum {s.projectedCumulative.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
