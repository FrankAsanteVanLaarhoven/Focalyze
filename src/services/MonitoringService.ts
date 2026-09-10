
import HealthLakeService from './HealthLakeService';
import AIService from './AIService';

interface FocusScoreData {
  score: number;
  notes?: string;
  environmentalFactors?: {
    location?: string;
    noise?: string;
    sleepQuality?: number;
    timeOfDay?: string;
    medication?: boolean;
  };
}

interface InsightData {
  type: 'Pattern' | 'Recommendation' | 'Prediction' | 'Alert';
  title: string;
  description: string;
  relevantData?: any;
  timestamp: string;
}

class MonitoringService {
  // Record a new focus score
  async recordFocusScore(patientId: string, focusScoreData: FocusScoreData): Promise<any> {
    try {
      // In a real app, this would be an API call
      const response = await fetch('/api/patients/focus-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(focusScoreData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to record focus score');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error recording focus score:', error);
      throw error;
    }
  }
  
  // Get focus score history
  async getFocusScores(patientId: string): Promise<any[]> {
    try {
      // In a real app, this would be an API call
      const response = await fetch('/api/patients/focus-scores');
      
      if (!response.ok) {
        throw new Error('Failed to fetch focus scores');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching focus scores:', error);
      throw error;
    }
  }
  
  // Generate insights based on focus scores
  async generateInsights(focusScores: any[]): Promise<InsightData[]> {
    // This would normally call the AI service or backend API
    // For now, we'll simulate with some static insights
    
    if (!focusScores || focusScores.length < 5) {
      return [
        {
          type: 'Recommendation',
          title: 'More Data Needed',
          description: 'Record more focus scores to receive personalized insights.',
          timestamp: new Date().toISOString()
        }
      ];
    }
    
    // Sort by date (newest first)
    const sortedScores = [...focusScores].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Calculate average
    const average = sortedScores.reduce((sum, s) => sum + s.score, 0) / sortedScores.length;
    
    // Get latest score
    const latest = sortedScores[0];
    
    const insights: InsightData[] = [];
    
    // Trend insight
    if (sortedScores.length >= 7) {
      const recentScores = sortedScores.slice(0, 7);
      const recentAvg = recentScores.reduce((sum, s) => sum + s.score, 0) / recentScores.length;
      const olderScores = sortedScores.slice(7, 14);
      
      if (olderScores.length >= 5) {
        const olderAvg = olderScores.reduce((sum, s) => sum + s.score, 0) / olderScores.length;
        
        if (recentAvg - olderAvg > 1) {
          insights.push({
            type: 'Pattern',
            title: 'Positive Trend',
            description: `Your focus scores have improved by ${(recentAvg - olderAvg).toFixed(1)} points over the past week.`,
            relevantData: { recentAverage: recentAvg, previousAverage: olderAvg },
            timestamp: new Date().toISOString()
          });
        } else if (olderAvg - recentAvg > 1) {
          insights.push({
            type: 'Alert',
            title: 'Declining Trend',
            description: `Your focus scores have decreased by ${(olderAvg - recentAvg).toFixed(1)} points over the past week.`,
            relevantData: { recentAverage: recentAvg, previousAverage: olderAvg },
            timestamp: new Date().toISOString()
          });
        }
      }
    }
    
    // Time of day analysis
    const morningScores = sortedScores.filter(s => {
      const hour = new Date(s.timestamp).getHours();
      return hour >= 5 && hour < 12;
    });
    
    const afternoonScores = sortedScores.filter(s => {
      const hour = new Date(s.timestamp).getHours();
      return hour >= 12 && hour < 18;
    });
    
    const eveningScores = sortedScores.filter(s => {
      const hour = new Date(s.timestamp).getHours();
      return hour >= 18 || hour < 5;
    });
    
    if (morningScores.length >= 3 && afternoonScores.length >= 3) {
      const morningAvg = morningScores.reduce((sum, s) => sum + s.score, 0) / morningScores.length;
      const afternoonAvg = afternoonScores.reduce((sum, s) => sum + s.score, 0) / afternoonScores.length;
      
      if (Math.abs(morningAvg - afternoonAvg) > 1.5) {
        const betterTime = morningAvg > afternoonAvg ? 'morning' : 'afternoon';
        insights.push({
          type: 'Pattern',
          title: `${betterTime === 'morning' ? 'Morning' : 'Afternoon'} Peak`,
          description: `Your focus scores are consistently higher during the ${betterTime}. Consider scheduling important tasks during this period.`,
          relevantData: { morningAverage: morningAvg, afternoonAverage: afternoonAvg },
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Environmental factors analysis
    const locationGroups: Record<string, any[]> = {};
    const noiseGroups: Record<string, any[]> = {};
    
    for (const score of sortedScores) {
      if (score.environmentalFactors) {
        if (score.environmentalFactors.location) {
          if (!locationGroups[score.environmentalFactors.location]) {
            locationGroups[score.environmentalFactors.location] = [];
          }
          locationGroups[score.environmentalFactors.location].push(score);
        }
        
        if (score.environmentalFactors.noise) {
          if (!noiseGroups[score.environmentalFactors.noise]) {
            noiseGroups[score.environmentalFactors.noise] = [];
          }
          noiseGroups[score.environmentalFactors.noise].push(score);
        }
      }
    }
    
    // Find best location
    let bestLocation = '';
    let bestLocationAvg = 0;
    let bestLocationCount = 0;
    
    for (const [location, scores] of Object.entries(locationGroups)) {
      if (scores.length >= 3) {
        const avg = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
        if (avg > bestLocationAvg || (avg === bestLocationAvg && scores.length > bestLocationCount)) {
          bestLocationAvg = avg;
          bestLocation = location;
          bestLocationCount = scores.length;
        }
      }
    }
    
    if (bestLocation && bestLocationAvg > average + 0.5) {
      insights.push({
        type: 'Pattern',
        title: 'Optimal Location',
        description: `You tend to focus better when working in ${bestLocation.toLowerCase()}.`,
        relevantData: { location: bestLocation, average: bestLocationAvg, overallAverage: average },
        timestamp: new Date().toISOString()
      });
    }
    
    // Add a few more static insights for demonstration
    insights.push({
      type: 'Recommendation',
      title: 'Exercise Correlation',
      description: 'Days with 30+ minutes of exercise show a 24% higher average focus score.',
      timestamp: new Date().toISOString()
    });
    
    if (sortedScores.some(s => s.environmentalFactors?.medication)) {
      insights.push({
        type: 'Pattern',
        title: 'Medication Timing',
        description: 'Focus scores drop significantly 4-5 hours after medication. Consider discussing timing with your provider.',
        timestamp: new Date().toISOString()
      });
    }
    
    return insights;
  }
}

export default new MonitoringService();
