import { useState } from 'react';
import { useAppState, useAppDispatch } from '../context/AppProvider';
import { PS_STAGES, PS_STAGE_LABELS, APPLICATION_STAGES, APPLICATION_STAGE_LABELS } from '../context/types';
import type { ApplicationStage } from '../context/types';
import { SCHOOLS } from '../data/schools';
import { PageShell } from '../components/layout/PageShell/PageShell';
import { Card } from '../components/shared/Card/Card';
import { Button } from '../components/shared/Button/Button';
import typography from '../styles/typography.module.css';

function stageOf(schoolStages: Record<string, ApplicationStage>, schoolId: string): ApplicationStage {
  return schoolStages[schoolId] ?? 'primary';
}

export function PathPage() {
  const { application } = useAppState();
  const dispatch = useAppDispatch();
  const [view, setView] = useState<'stage' | 'school'>('stage');

  const psIndex = PS_STAGES.indexOf(application.personalStatementStage);
  const secondariesSubmitted = SCHOOLS.filter(
    (s) => APPLICATION_STAGES.indexOf(stageOf(application.schoolStages, s.id)) >= 1,
  ).length;
  const interviewsScheduled = SCHOOLS.filter(
    (s) => APPLICATION_STAGES.indexOf(stageOf(application.schoolStages, s.id)) >= 2,
  ).length;

  return (
    <PageShell>
      <div>
        <h1 className={typography.headingL}>Application tracker</h1>
      </div>

      <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 10, background: 'var(--color-text-muted-20)' }}>
        {(['stage', 'school'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={typography.bodySmall}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 8,
              border: 'none',
              background: view === v ? 'var(--color-base-dark)' : 'transparent',
              color: view === v ? 'var(--color-surface-bg)' : 'var(--color-text-muted)',
              fontWeight: view === v ? 500 : 400,
            }}
          >
            By {v === 'stage' ? 'Stage' : 'School'}
          </button>
        ))}
      </div>

      <Card>
        <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
          PERSONAL STATEMENT
        </p>
        <p className={typography.bodyRegular} style={{ marginTop: 8 }}>
          {PS_STAGE_LABELS[application.personalStatementStage]}
        </p>
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
          {PS_STAGES.map((stage, i) => (
            <div
              key={stage}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: i <= psIndex ? 'var(--color-base-dark)' : 'var(--color-text-muted-20)',
              }}
            />
          ))}
        </div>
        <p className={typography.bodySmall} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
          {PS_STAGES.map((s) => PS_STAGE_LABELS[s]).join(' · ')}
        </p>
        <Button
          variant="secondary"
          style={{ marginTop: 12 }}
          disabled={psIndex === PS_STAGES.length - 1}
          onClick={() => dispatch({ type: 'ADVANCE_PS_STAGE' })}
        >
          Advance stage
        </Button>
      </Card>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Card>
          <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
            SECONDARIES
          </p>
          <p className={typography.bodySmall} style={{ marginTop: 8 }}>
            {secondariesSubmitted} of {SCHOOLS.length} submitted
          </p>
        </Card>
        <Card>
          <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
            INTERVIEWS
          </p>
          <p className={typography.bodySmall} style={{ marginTop: 8 }}>
            {interviewsScheduled} scheduled · {application.interviewInvites} invites
          </p>
          <Button variant="secondary" style={{ marginTop: 10 }} onClick={() => dispatch({ type: 'ADD_INTERVIEW_INVITE' })}>
            + Log invite
          </Button>
        </Card>
        <Card>
          <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
            INTERVIEW PREP
          </p>
          <p className={typography.bodySmall} style={{ marginTop: 8 }}>
            {application.mockInterviewsLogged} mock interviews logged
          </p>
          <Button variant="secondary" style={{ marginTop: 10 }} onClick={() => dispatch({ type: 'LOG_MOCK_INTERVIEW' })}>
            + Log mock interview
          </Button>
        </Card>
      </div>

      {view === 'stage' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {APPLICATION_STAGES.map((stage) => {
            const schoolsInStage = SCHOOLS.filter((s) => stageOf(application.schoolStages, s.id) === stage);
            return (
              <div key={stage}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
                    {APPLICATION_STAGE_LABELS[stage].toUpperCase()}
                  </p>
                  <p className={typography.bodySmall} style={{ color: 'var(--color-text-muted)' }}>
                    {schoolsInStage.length}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                  {schoolsInStage.length === 0 ? (
                    <p className={typography.bodySmall} style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
                      No schools here yet
                    </p>
                  ) : (
                    schoolsInStage.map((s) => (
                      <Card key={s.id}>
                        <p className={typography.bodyRegular}>{s.name}</p>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SCHOOLS.map((s) => {
            const stage = stageOf(application.schoolStages, s.id);
            const stageIndex = APPLICATION_STAGES.indexOf(stage);
            return (
              <Card key={s.id}>
                <p className={typography.bodyRegular}>{s.name}</p>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  {APPLICATION_STAGES.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        background: i <= stageIndex ? 'var(--color-base-dark)' : 'var(--color-text-muted-20)',
                      }}
                    />
                  ))}
                </div>
                <p className={typography.bodySmall} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
                  {APPLICATION_STAGES.map((s2) => APPLICATION_STAGE_LABELS[s2]).join(' · ')}
                </p>
                <Button
                  variant="secondary"
                  style={{ marginTop: 12 }}
                  disabled={stageIndex === APPLICATION_STAGES.length - 1}
                  onClick={() => dispatch({ type: 'ADVANCE_SCHOOL_STAGE', payload: { schoolId: s.id } })}
                >
                  Advance to {APPLICATION_STAGE_LABELS[APPLICATION_STAGES[Math.min(stageIndex + 1, APPLICATION_STAGES.length - 1)]]}
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
