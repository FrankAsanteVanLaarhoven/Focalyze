
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import MonitoringService from '../../services/MonitoringService';

// Define types for monitoring state
interface FocusScore {
  id: string;
  score: number;
  notes?: string;
  timestamp: string;
  environmentalFactors?: {
    location?: string;
    noise?: string;
    sleepQuality?: number;
    timeOfDay?: string;
    medication?: boolean;
  };
}

interface Insight {
  id: string;
  type: 'Pattern' | 'Recommendation' | 'Prediction' | 'Alert';
  title: string;
  message: string;
  timestamp: string;
  relevantData?: any;
  acknowledged?: boolean;
}

interface SleepData {
  date: string;
  duration: number;
  quality: number;
  deepSleepPercentage?: number;
  remSleepPercentage?: number;
}

interface ActivityData {
  date: string;
  lightMinutes: number;
  moderateMinutes: number;
  intenseMinutes: number;
  steps: number;
}

interface ScreenTimeData {
  date: string;
  totalHours: number;
  socialMediaHours?: number;
  productivityHours?: number;
  entertainmentHours?: number;
  communicationHours?: number;
  otherHours?: number;
}

interface MonitoringState {
  focusScores: FocusScore[];
  insights: Insight[];
  focusScore?: number; // Current/latest focus score
  activityData: ActivityData[];
  sleepData: SleepData[];
  screenTimeData: ScreenTimeData[];
  predictedFocusScore?: {
    score: number;
    confidence: number;
    factors: string[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: MonitoringState = {
  focusScores: [],
  insights: [],
  activityData: [],
  sleepData: [],
  screenTimeData: [],
  isLoading: false,
  error: null
};

// Async thunks for fetching and recording focus scores
export const fetchFocusScores = createAsyncThunk(
  'monitoring/fetchFocusScores',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would call the service
      // For mock data, we'll create some realistic data
      const mockScores: FocusScore[] = [
        { 
          id: '1', 
          score: 7, 
          notes: 'Felt focused after morning exercise', 
          timestamp: new Date().toISOString(),
          environmentalFactors: {
            location: 'Home',
            noise: 'Low',
            sleepQuality: 8,
            medication: true
          }
        },
        { 
          id: '2', 
          score: 5, 
          notes: 'Struggled with focus after lunch', 
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          environmentalFactors: {
            location: 'Office',
            noise: 'Medium',
            sleepQuality: 6,
            medication: true
          }
        },
        { 
          id: '3', 
          score: 8, 
          notes: 'Great focus day', 
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          environmentalFactors: {
            location: 'Library',
            noise: 'Low',
            sleepQuality: 9,
            medication: true
          }
        },
        { 
          id: '4', 
          score: 6, 
          notes: 'Moderate focus today', 
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          environmentalFactors: {
            location: 'Home',
            noise: 'Medium',
            sleepQuality: 7,
            medication: true
          }
        },
        { 
          id: '5', 
          score: 4, 
          notes: 'Difficult to concentrate', 
          timestamp: new Date(Date.now() - 345600000).toISOString(),
          environmentalFactors: {
            location: 'Café',
            noise: 'High',
            sleepQuality: 5,
            medication: false
          }
        },
        { 
          id: '6', 
          score: 7, 
          notes: 'Better focus today', 
          timestamp: new Date(Date.now() - 432000000).toISOString(),
          environmentalFactors: {
            location: 'Office',
            noise: 'Medium',
            sleepQuality: 8,
            medication: true
          }
        },
        { 
          id: '7', 
          score: 6, 
          notes: 'Average focus day', 
          timestamp: new Date(Date.now() - 518400000).toISOString(),
          environmentalFactors: {
            location: 'Home',
            noise: 'Low',
            sleepQuality: 7,
            medication: true
          }
        },
      ];
      
      // Generate insights based on the focus scores
      const insights = await MonitoringService.generateInsights(mockScores);
      
      return { 
        focusScores: mockScores, 
        insights: insights.map((insight, index) => ({
          id: (index + 1).toString(),
          type: insight.type,
          title: insight.title,
          message: insight.description,
          timestamp: insight.timestamp,
          relevantData: insight.relevantData,
          acknowledged: false
        }))
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch focus scores');
    }
  }
);

export const recordFocusScore = createAsyncThunk(
  'monitoring/recordFocusScore',
  async (
    { 
      score, 
      notes, 
      environmentalFactors 
    }: { 
      score: number; 
      notes?: string; 
      environmentalFactors?: {
        location?: string;
        noise?: string;
        sleepQuality?: number;
        medication?: boolean;
      }
    }, 
    { rejectWithValue, getState }
  ) => {
    try {
      // In a real app, this would call the service
      // Creating mock response for now
      const newScore: FocusScore = {
        id: Date.now().toString(),
        score,
        notes,
        environmentalFactors,
        timestamp: new Date().toISOString()
      };
      
      // Get current focus scores to generate new insights
      const state = getState() as RootState;
      const allScores = [...state.monitoring.focusScores, newScore];
      
      // Generate new insights based on the updated scores
      const newInsights = await MonitoringService.generateInsights(allScores);
      
      return { 
        focusScore: newScore, 
        insights: newInsights.slice(0, 3).map((insight, index) => ({
          id: `new-${index + 1}`,
          type: insight.type,
          title: insight.title,
          message: insight.description,
          timestamp: insight.timestamp,
          relevantData: insight.relevantData,
          acknowledged: false
        }))
      };
    } catch (error) {
      return rejectWithValue('Failed to record focus score');
    }
  }
);

export const acknowledgeInsight = createAsyncThunk(
  'monitoring/acknowledgeInsight',
  async (insightId: string, { rejectWithValue }) => {
    try {
      // In a real app, this would call the service
      return insightId;
    } catch (error) {
      return rejectWithValue('Failed to acknowledge insight');
    }
  }
);

export const fetchSleepData = createAsyncThunk(
  'monitoring/fetchSleepData',
  async (_, { rejectWithValue }) => {
    try {
      // Mock sleep data
      const sleepData: SleepData[] = Array.from({ length: 14 }, (_, i) => ({
        date: new Date(Date.now() - (13 - i) * 86400000).toISOString(),
        duration: Math.round((Math.random() * 3 + 5) * 10) / 10, // 5-8 hours
        quality: Math.round(Math.random() * 40 + 50), // 50-90%
        deepSleepPercentage: Math.round(Math.random() * 15 + 15), // 15-30%
        remSleepPercentage: Math.round(Math.random() * 10 + 20) // 20-30%
      }));
      
      return sleepData;
    } catch (error) {
      return rejectWithValue('Failed to fetch sleep data');
    }
  }
);

export const fetchActivityData = createAsyncThunk(
  'monitoring/fetchActivityData',
  async (_, { rejectWithValue }) => {
    try {
      // Mock activity data
      const activityData: ActivityData[] = Array.from({ length: 14 }, (_, i) => ({
        date: new Date(Date.now() - (13 - i) * 86400000).toISOString(),
        lightMinutes: Math.round(Math.random() * 60 + 30), // 30-90 minutes
        moderateMinutes: Math.round(Math.random() * 40 + 10), // 10-50 minutes
        intenseMinutes: Math.round(Math.random() * 25), // 0-25 minutes
        steps: Math.round(Math.random() * 6000 + 4000) // 4000-10000 steps
      }));
      
      return activityData;
    } catch (error) {
      return rejectWithValue('Failed to fetch activity data');
    }
  }
);

export const fetchScreenTimeData = createAsyncThunk(
  'monitoring/fetchScreenTimeData',
  async (_, { rejectWithValue }) => {
    try {
      // Mock screen time data
      const screenTimeData: ScreenTimeData[] = Array.from({ length: 14 }, (_, i) => {
        const totalHours = Math.round((Math.random() * 3 + 4) * 10) / 10; // 4-7 hours
        const socialMediaHours = Math.round((Math.random() * 1.5 + 1) * 10) / 10; // 1-2.5 hours
        const productivityHours = Math.round((Math.random() * 2 + 1) * 10) / 10; // 1-3 hours
        const entertainmentHours = Math.round((Math.random() * 1.2 + 0.5) * 10) / 10; // 0.5-1.7 hours
        const communicationHours = Math.round((Math.random() * 0.8 + 0.3) * 10) / 10; // 0.3-1.1 hours
        const otherHours = Math.round((totalHours - socialMediaHours - productivityHours - entertainmentHours - communicationHours) * 10) / 10;
        
        return {
          date: new Date(Date.now() - (13 - i) * 86400000).toISOString(),
          totalHours,
          socialMediaHours,
          productivityHours,
          entertainmentHours,
          communicationHours,
          otherHours: otherHours > 0 ? otherHours : 0.1
        };
      });
      
      return screenTimeData;
    } catch (error) {
      return rejectWithValue('Failed to fetch screen time data');
    }
  }
);

export const predictFocusScore = createAsyncThunk(
  'monitoring/predictFocusScore',
  async (
    conditions: {
      location?: string;
      noise?: string;
      sleepQuality?: number;
      timeOfDay?: string;
      medication?: boolean;
    }, 
    { rejectWithValue, getState }
  ) => {
    try {
      // In a real app, this would use a machine learning model
      // For now, we'll use a simplified prediction algorithm
      const state = getState() as RootState;
      const { focusScores } = state.monitoring;
      
      if (focusScores.length < 5) {
        return {
          score: 5,
          confidence: 0.3,
          factors: ['Insufficient data for accurate prediction']
        };
      }
      
      let matchingScores = [...focusScores];
      const factors: string[] = [];
      
      // Filter by similar conditions if provided
      if (conditions.location) {
        const locationScores = matchingScores.filter(score => 
          score.environmentalFactors?.location === conditions.location
        );
        
        if (locationScores.length >= 2) {
          matchingScores = locationScores;
          factors.push(`Location (${conditions.location})`);
        }
      }
      
      if (conditions.noise) {
        const noiseScores = matchingScores.filter(score => 
          score.environmentalFactors?.noise === conditions.noise
        );
        
        if (noiseScores.length >= 2) {
          matchingScores = noiseScores;
          factors.push(`Noise level (${conditions.noise})`);
        }
      }
      
      if (conditions.sleepQuality) {
        const sleepScores = matchingScores.filter(score => 
          score.environmentalFactors?.sleepQuality !== undefined &&
          Math.abs((score.environmentalFactors?.sleepQuality || 0) - (conditions.sleepQuality || 0)) <= 1
        );
        
        if (sleepScores.length >= 2) {
          matchingScores = sleepScores;
          factors.push(`Sleep quality (${conditions.sleepQuality}/10)`);
        }
      }
      
      if (conditions.medication !== undefined) {
        const medicationScores = matchingScores.filter(score => 
          score.environmentalFactors?.medication === conditions.medication
        );
        
        if (medicationScores.length >= 2) {
          matchingScores = medicationScores;
          factors.push(`Medication (${conditions.medication ? 'taken' : 'not taken'})`);
        }
      }
      
      if (matchingScores.length >= 3) {
        const avgScore = matchingScores.reduce((sum, s) => sum + s.score, 0) / matchingScores.length;
        const confidence = Math.min(0.9, matchingScores.length / 10);
        
        return {
          score: Number(avgScore.toFixed(1)),
          confidence,
          factors: factors.length > 0 ? factors : ['Based on overall historical average']
        };
      }
      
      // Fall back to overall average
      const overallAvg = focusScores.reduce((sum, s) => sum + s.score, 0) / focusScores.length;
      
      return {
        score: Number(overallAvg.toFixed(1)),
        confidence: 0.4,
        factors: ['Based on overall historical average']
      };
    } catch (error) {
      return rejectWithValue('Failed to predict focus score');
    }
  }
);

const monitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFocusScores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFocusScores.fulfilled, (state, action: PayloadAction<{ focusScores: FocusScore[], insights: Insight[] }>) => {
        state.isLoading = false;
        state.focusScores = action.payload.focusScores;
        state.insights = action.payload.insights;
        
        if (action.payload.focusScores.length > 0) {
          // Sort focus scores by timestamp (most recent first)
          const sorted = [...action.payload.focusScores].sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          state.focusScore = sorted[0].score;
        }
      })
      .addCase(fetchFocusScores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(recordFocusScore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(recordFocusScore.fulfilled, (state, action: PayloadAction<{ focusScore: FocusScore, insights: Insight[] }>) => {
        state.isLoading = false;
        state.focusScores.unshift(action.payload.focusScore);
        state.focusScore = action.payload.focusScore.score;
        
        // Add new insights, avoiding duplicates
        const newInsights = action.payload.insights.filter(newInsight => 
          !state.insights.some(existing => 
            existing.title === newInsight.title && 
            existing.message === newInsight.message
          )
        );
        
        state.insights = [...newInsights, ...state.insights].slice(0, 10); // Keep only the 10 most recent
      })
      .addCase(recordFocusScore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(acknowledgeInsight.fulfilled, (state, action) => {
        const insight = state.insights.find(i => i.id === action.payload);
        if (insight) {
          insight.acknowledged = true;
        }
      })
      .addCase(fetchSleepData.fulfilled, (state, action) => {
        state.sleepData = action.payload;
      })
      .addCase(fetchActivityData.fulfilled, (state, action) => {
        state.activityData = action.payload;
      })
      .addCase(fetchScreenTimeData.fulfilled, (state, action) => {
        state.screenTimeData = action.payload;
      })
      .addCase(predictFocusScore.fulfilled, (state, action) => {
        state.predictedFocusScore = action.payload;
      });
  }
});

export const { clearError } = monitoringSlice.actions;
export const selectMonitoring = (state: RootState) => state.monitoring;
export const selectFocusScores = (state: RootState) => state.monitoring.focusScores;
export const selectCurrentFocusScore = (state: RootState) => state.monitoring.focusScore;
export const selectInsights = (state: RootState) => state.monitoring.insights;
export const selectSleepData = (state: RootState) => state.monitoring.sleepData;
export const selectActivityData = (state: RootState) => state.monitoring.activityData;
export const selectScreenTimeData = (state: RootState) => state.monitoring.screenTimeData;
export const selectPredictedFocusScore = (state: RootState) => state.monitoring.predictedFocusScore;

export default monitoringSlice.reducer;
