import type { Action, AppState, ApplicationStage } from './types';
import { PS_STAGES } from './types';

export const initialState: AppState = {
  profile: {
    yearInSchool: null,
    onboarded: false,
    startingContext: [],
  },
  entries: [],
  application: {
    personalStatementStage: 'notStarted',
    interviewInvites: 0,
    mockInterviewsLogged: 0,
    schoolStages: {},
  },
  gpaInputs: {
    scienceGpa: 3.5,
    cumulativeGpa: 3.5,
    creditsCompleted: 90,
    creditsRemaining: 30,
  },
};

const STAGE_ORDER: ApplicationStage[] = ['primary', 'secondary', 'interview', 'decision'];

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        profile: {
          yearInSchool: action.payload.yearInSchool,
          onboarded: true,
          startingContext: action.payload.startingContext,
        },
      };
    case 'ADD_ENTRY': {
      const newEntry = {
        id: crypto.randomUUID(),
        category: action.payload.category,
        hours: action.payload.hours,
        description: action.payload.description,
        date: new Date().toISOString(),
      };
      return {
        ...state,
        entries: [...state.entries, newEntry],
      };
    }
    case 'ADVANCE_PS_STAGE': {
      const currentIndex = PS_STAGES.indexOf(state.application.personalStatementStage);
      const nextIndex = Math.min(currentIndex + 1, PS_STAGES.length - 1);
      return {
        ...state,
        application: { ...state.application, personalStatementStage: PS_STAGES[nextIndex] },
      };
    }
    case 'ADD_INTERVIEW_INVITE':
      return {
        ...state,
        application: { ...state.application, interviewInvites: state.application.interviewInvites + 1 },
      };
    case 'LOG_MOCK_INTERVIEW':
      return {
        ...state,
        application: {
          ...state.application,
          mockInterviewsLogged: state.application.mockInterviewsLogged + 1,
        },
      };
    case 'ADVANCE_SCHOOL_STAGE': {
      const current = state.application.schoolStages[action.payload.schoolId] ?? 'primary';
      const currentIndex = STAGE_ORDER.indexOf(current);
      const nextIndex = Math.min(currentIndex + 1, STAGE_ORDER.length - 1);
      return {
        ...state,
        application: {
          ...state.application,
          schoolStages: {
            ...state.application.schoolStages,
            [action.payload.schoolId]: STAGE_ORDER[nextIndex],
          },
        },
      };
    }
    case 'SET_GPA_INPUTS':
      return {
        ...state,
        gpaInputs: { ...state.gpaInputs, ...action.payload },
      };
    default:
      return state;
  }
}
