import type { Action, AppState } from './types';

export const initialState: AppState = {
  profile: {
    yearInSchool: null,
    onboarded: false,
    startingContext: [],
  },
  entries: [],
};

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
    default:
      return state;
  }
}
