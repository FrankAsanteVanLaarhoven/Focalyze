
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate?: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'pdf' | 'contact';
}

interface TransitionPlan {
  id: string;
  name: string;
  current_stage: string;
  completion_percentage: number;
  milestones: Milestone[];
}

interface TransitionState {
  transitionPlan: TransitionPlan | null;
  currentStage: string | null;
  milestones: Milestone[];
  completedMilestones: Milestone[];
  pendingMilestones: Milestone[];
  transitionProgress: number;
  resources: Resource[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TransitionState = {
  transitionPlan: null,
  currentStage: null,
  milestones: [],
  completedMilestones: [],
  pendingMilestones: [],
  transitionProgress: 0,
  resources: [],
  isLoading: false,
  error: null,
};

const transitionSlice = createSlice({
  name: 'transition',
  initialState,
  reducers: {
    fetchTransitionPlanStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTransitionPlanSuccess: (state, action: PayloadAction<TransitionPlan>) => {
      state.isLoading = false;
      state.transitionPlan = action.payload;
      state.currentStage = action.payload.current_stage;
      state.milestones = action.payload.milestones || [];
      state.completedMilestones = state.milestones.filter(m => m.status === 'completed');
      state.pendingMilestones = state.milestones.filter(m => m.status === 'pending');
      state.transitionProgress = action.payload.completion_percentage || 0;
      state.error = null;
    },
    fetchTransitionPlanFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearTransitionData: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  fetchTransitionPlanStart,
  fetchTransitionPlanSuccess,
  fetchTransitionPlanFailure,
  clearTransitionData,
} = transitionSlice.actions;

export const selectTransition = (state: RootState) => state.transition;
export const selectTransitionPlan = (state: RootState) => state.transition.transitionPlan;
export const selectMilestones = (state: RootState) => state.transition.milestones;
export const selectTransitionProgress = (state: RootState) => state.transition.transitionProgress;

export default transitionSlice.reducer;
