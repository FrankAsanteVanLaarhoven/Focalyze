
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';

// Define types for self-management state
interface Routine {
  id: string;
  title: string;
  description: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  activities: {
    id: string;
    title: string;
    completed: boolean;
    description?: string;
  }[];
  adherenceRate?: number;
}

interface Strategy {
  id: string;
  title: string;
  description: string;
  category: 'focus' | 'organization' | 'time-management' | 'emotional-regulation' | 'other';
  source: string;
  isFavorite: boolean;
}

interface Sprint {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  activities: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
  insights: string[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  progress: number;
  relatedStrengths: string[];
  steps: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface SelfManagementState {
  routines: Routine[];
  strategies: Strategy[];
  sprints: Sprint[];
  goals: Goal[];
  activeSprint: Sprint | null;
  progress: number;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: SelfManagementState = {
  routines: [],
  strategies: [],
  sprints: [],
  goals: [],
  activeSprint: null,
  progress: 0,
  isLoading: false,
  error: null
};

// Async thunks
export const fetchSelfManagementData = createAsyncThunk(
  'selfManagement/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, return mock data
      
      const routines: Routine[] = [
        {
          id: '1',
          title: 'Morning Routine',
          description: 'Optimize your morning for focus and productivity',
          timeOfDay: 'morning',
          activities: [
            { id: '1-1', title: 'Morning sunlight exposure (5-10 minutes)', completed: true },
            { id: '1-2', title: 'Take medication with protein', completed: true },
            { id: '1-3', title: 'Review daily priorities (1-3 tasks)', completed: false },
            { id: '1-4', title: 'Fill water bottle for the day', completed: false }
          ],
          adherenceRate: 72
        },
        {
          id: '2',
          title: 'Evening Wind Down',
          description: 'Prepare for quality sleep',
          timeOfDay: 'evening',
          activities: [
            { id: '2-1', title: 'Reduce blue light exposure', completed: false },
            { id: '2-2', title: 'Set out clothes for tomorrow', completed: true },
            { id: '2-3', title: 'Review accomplishments & plan tomorrow', completed: false },
            { id: '2-4', title: 'Relaxation technique (10 minutes)', completed: false }
          ],
          adherenceRate: 56
        }
      ];
      
      const strategies: Strategy[] = [
        {
          id: '1',
          title: 'Time Blocking',
          description: 'Allocate specific time blocks for different activities to improve focus and time awareness',
          category: 'time-management',
          source: 'Huberman Lab Protocol',
          isFavorite: true
        },
        {
          id: '2',
          title: 'Pomodoro Technique',
          description: 'Work in focused 25-minute intervals with 5-minute breaks',
          category: 'focus',
          source: 'ADHD Productivity Research',
          isFavorite: false
        },
        {
          id: '3',
          title: 'Body Doubling',
          description: 'Work alongside someone else (in person or virtually) to improve accountability and focus',
          category: 'focus',
          source: 'ADHD Coaching Techniques',
          isFavorite: true
        }
      ];
      
      const sprints: Sprint[] = [
        {
          id: '1',
          name: 'Morning Routine Optimization',
          description: 'Establish a consistent, science-based morning routine to optimize focus and energy',
          startDate: '2025-04-01',
          endDate: '2025-04-15',
          progress: 38,
          activities: [
            { id: '1-1', title: 'Morning sunlight exposure', description: 'Get 5-10 minutes of morning sunlight exposure to regulate circadian rhythm', completed: true },
            { id: '1-2', title: 'Medication timer setup', description: 'Use a timed reminder for consistent medication timing', completed: true },
            { id: '1-3', title: 'Priority task identification', description: 'Identify 1-3 most important tasks for the day', completed: false },
            { id: '1-4', title: 'Hydration and nutrition', description: 'Start day with 16oz water and protein-rich breakfast', completed: false }
          ],
          insights: [
            "You're 30% more likely to complete tasks when you expose yourself to morning sunlight",
            "Setting out clothes the night before has reduced your morning preparation time by 15 minutes"
          ]
        }
      ];
      
      const goals: Goal[] = [
        {
          id: '1',
          title: 'Improve Time Management',
          description: 'Develop better awareness of time and reduce lateness',
          deadline: '2025-06-30',
          progress: 45,
          relatedStrengths: ['Creativity', 'Problem-solving'],
          steps: [
            { id: '1-1', title: 'Select a time management system', completed: true },
            { id: '1-2', title: 'Practice time blocking for 2 weeks', completed: true },
            { id: '1-3', title: 'Use timers for all activities', completed: false },
            { id: '1-4', title: 'Evaluate and refine system', completed: false }
          ]
        },
        {
          id: '2',
          title: 'Establish Consistent Medication Routine',
          description: 'Take medication at the same time daily with appropriate food',
          deadline: '2025-05-15',
          progress: 75,
          relatedStrengths: ['Determination', 'Adaptability'],
          steps: [
            { id: '2-1', title: 'Create medication schedule', completed: true },
            { id: '2-2', title: 'Set up reminder system', completed: true },
            { id: '2-3', title: 'Track medication effects', completed: true },
            { id: '2-4', title: 'Review with provider', completed: false }
          ]
        }
      ];
      
      return {
        routines,
        strategies,
        sprints,
        goals,
        activeSprint: sprints[0]
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch self-management data');
    }
  }
);

export const updateRoutineActivity = createAsyncThunk(
  'selfManagement/updateRoutineActivity',
  async ({ routineId, activityId, completed }: { routineId: string; activityId: string; completed: boolean }, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, just return the updated activity info
      return { routineId, activityId, completed };
    } catch (error) {
      return rejectWithValue('Failed to update activity');
    }
  }
);

export const updateSprintActivity = createAsyncThunk(
  'selfManagement/updateSprintActivity',
  async ({ sprintId, activityId, completed }: { sprintId: string; activityId: string; completed: boolean }, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      return { sprintId, activityId, completed };
    } catch (error) {
      return rejectWithValue('Failed to update sprint activity');
    }
  }
);

// Create the slice
const selfManagementSlice = createSlice({
  name: 'selfManagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    toggleStrategyFavorite: (state, action: PayloadAction<string>) => {
      const strategy = state.strategies.find(s => s.id === action.payload);
      if (strategy) {
        strategy.isFavorite = !strategy.isFavorite;
      }
    },
    updateGoalProgress: (state, action: PayloadAction<{ goalId: string; progress: number }>) => {
      const { goalId, progress } = action.payload;
      const goal = state.goals.find(g => g.id === goalId);
      if (goal) {
        goal.progress = progress;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelfManagementData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSelfManagementData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.routines = action.payload.routines;
        state.strategies = action.payload.strategies;
        state.sprints = action.payload.sprints;
        state.goals = action.payload.goals;
        state.activeSprint = action.payload.activeSprint;
        state.progress = calculateOverallProgress(action.payload);
      })
      .addCase(fetchSelfManagementData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateRoutineActivity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRoutineActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        const { routineId, activityId, completed } = action.payload;
        
        // Update the specific activity
        const routine = state.routines.find(r => r.id === routineId);
        if (routine) {
          const activity = routine.activities.find(a => a.id === activityId);
          if (activity) {
            activity.completed = completed;
          }
          
          // Recalculate adherence rate
          const completedCount = routine.activities.filter(a => a.completed).length;
          routine.adherenceRate = (completedCount / routine.activities.length) * 100;
        }
        
        // Update overall progress
        state.progress = calculateOverallProgress(state);
      })
      .addCase(updateRoutineActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSprintActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        const { sprintId, activityId, completed } = action.payload;
        
        // Update the specific sprint activity
        const sprint = state.sprints.find(s => s.id === sprintId);
        if (sprint) {
          const activity = sprint.activities.find(a => a.id === activityId);
          if (activity) {
            activity.completed = completed;
          }
          
          // Recalculate sprint progress
          const completedCount = sprint.activities.filter(a => a.completed).length;
          sprint.progress = (completedCount / sprint.activities.length) * 100;
          
          // Update active sprint if this is the active one
          if (state.activeSprint && state.activeSprint.id === sprintId) {
            state.activeSprint = sprint;
          }
        }
        
        // Update overall progress
        state.progress = calculateOverallProgress(state);
      });
  }
});

// Helper function to calculate overall progress
const calculateOverallProgress = (state: SelfManagementState | any): number => {
  const routines = state.routines || [];
  const goals = state.goals || [];
  const sprints = state.sprints || [];
  
  // Calculate average adherence rate for routines
  const routineAdherence = routines.length > 0
    ? routines.reduce((sum: number, routine: Routine) => sum + (routine.adherenceRate || 0), 0) / routines.length
    : 0;
  
  // Calculate average progress for goals
  const goalProgress = goals.length > 0
    ? goals.reduce((sum: number, goal: Goal) => sum + goal.progress, 0) / goals.length
    : 0;
  
  // Calculate average progress for sprints
  const sprintProgress = sprints.length > 0
    ? sprints.reduce((sum: number, sprint: Sprint) => sum + sprint.progress, 0) / sprints.length
    : 0;
  
  // Combine into overall progress (weighted average)
  return Math.round((routineAdherence * 0.4) + (goalProgress * 0.3) + (sprintProgress * 0.3));
};

export const { clearError, toggleStrategyFavorite, updateGoalProgress } = selfManagementSlice.actions;

// Export selectors
export const selectSelfManagement = (state: RootState) => state.selfManagement;
export const selectRoutines = (state: RootState) => state.selfManagement.routines;
export const selectStrategies = (state: RootState) => state.selfManagement.strategies;
export const selectSprints = (state: RootState) => state.selfManagement.sprints;
export const selectActiveSprint = (state: RootState) => state.selfManagement.activeSprint;
export const selectGoals = (state: RootState) => state.selfManagement.goals;
export const selectSelfManagementProgress = (state: RootState) => state.selfManagement.progress;

export default selfManagementSlice.reducer;
