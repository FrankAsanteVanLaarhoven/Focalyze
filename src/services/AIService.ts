
import HealthLakeService from './HealthLakeService';

interface FocusPattern {
  type: string;
  description: string;
  confidence: number;
  relatedData: any;
}

interface FocusPrediction {
  predictedScore: number;
  confidence: number;
  factors: string[];
}

interface StrengthRecommendation {
  strength: string;
  score: number;
  recommendations: string[];
}

interface AIInsight {
  type: 'Pattern' | 'Recommendation' | 'Prediction' | 'Alert';
  description: string;
  confidence: number;
  relatedData?: any;
}

class AIService {
  // Analyze focus scores to detect patterns
  analyzePatterns(focusScores: any[]): FocusPattern[] {
    if (!focusScores || focusScores.length < 5) {
      return [];
    }

    const patterns: FocusPattern[] = [];
    
    // Time of day analysis
    const morningScores = focusScores.filter(score => {
      const hour = new Date(score.timestamp).getHours();
      return hour >= 6 && hour < 12;
    });
    
    const afternoonScores = focusScores.filter(score => {
      const hour = new Date(score.timestamp).getHours();
      return hour >= 12 && hour < 18;
    });
    
    const eveningScores = focusScores.filter(score => {
      const hour = new Date(score.timestamp).getHours();
      return hour >= 18 || hour < 6;
    });
    
    // If we have enough data for each time period
    if (morningScores.length >= 3 && afternoonScores.length >= 3) {
      const morningAvg = this.calculateAverage(morningScores, 'score');
      const afternoonAvg = this.calculateAverage(afternoonScores, 'score');
      
      if (Math.abs(morningAvg - afternoonAvg) > 1.5) {
        const betterTime = morningAvg > afternoonAvg ? 'morning' : 'afternoon';
        patterns.push({
          type: 'TimeOfDay',
          description: `You typically have better focus during the ${betterTime}. Consider scheduling important tasks during this time.`,
          confidence: this.calculateConfidence(morningScores.length, afternoonScores.length),
          relatedData: { morningAvg, afternoonAvg }
        });
      }
    }
    
    // Environmental factors analysis
    const scoresByLocation: Record<string, any[]> = {};
    const scoresByNoise: Record<string, any[]> = {};
    
    focusScores.forEach(score => {
      if (score.environmentalFactors) {
        if (score.environmentalFactors.location) {
          if (!scoresByLocation[score.environmentalFactors.location]) {
            scoresByLocation[score.environmentalFactors.location] = [];
          }
          scoresByLocation[score.environmentalFactors.location].push(score);
        }
        
        if (score.environmentalFactors.noise) {
          if (!scoresByNoise[score.environmentalFactors.noise]) {
            scoresByNoise[score.environmentalFactors.noise] = [];
          }
          scoresByNoise[score.environmentalFactors.noise].push(score);
        }
      }
    });
    
    // Location analysis
    const locationEntries = Object.entries(scoresByLocation).filter(([_, scores]) => scores.length >= 3);
    if (locationEntries.length >= 2) {
      let bestLocation = '';
      let bestAvg = 0;
      
      locationEntries.forEach(([location, scores]) => {
        const avg = this.calculateAverage(scores, 'score');
        if (avg > bestAvg) {
          bestAvg = avg;
          bestLocation = location;
        }
      });
      
      if (bestLocation) {
        patterns.push({
          type: 'Location',
          description: `You tend to have better focus when working in ${bestLocation}.`,
          confidence: this.calculateConfidenceFromSampleSize(scoresByLocation[bestLocation].length),
          relatedData: { location: bestLocation, average: bestAvg }
        });
      }
    }
    
    // Noise level analysis
    const noiseEntries = Object.entries(scoresByNoise).filter(([_, scores]) => scores.length >= 3);
    if (noiseEntries.length >= 2) {
      let bestNoise = '';
      let bestAvg = 0;
      
      noiseEntries.forEach(([noise, scores]) => {
        const avg = this.calculateAverage(scores, 'score');
        if (avg > bestAvg) {
          bestAvg = avg;
          bestNoise = noise;
        }
      });
      
      if (bestNoise) {
        patterns.push({
          type: 'NoiseLevel',
          description: `You tend to focus better in ${bestNoise.toLowerCase()} noise environments.`,
          confidence: this.calculateConfidenceFromSampleSize(scoresByNoise[bestNoise].length),
          relatedData: { noiseLevel: bestNoise, average: bestAvg }
        });
      }
    }
    
    // Sleep quality correlation
    const scoresWithSleep = focusScores.filter(score => 
      score.environmentalFactors && score.environmentalFactors.sleepQuality !== undefined
    );
    
    if (scoresWithSleep.length >= 5) {
      const correlation = this.calculateCorrelation(
        scoresWithSleep.map(s => s.environmentalFactors.sleepQuality),
        scoresWithSleep.map(s => s.score)
      );
      
      if (Math.abs(correlation) > 0.5) {
        patterns.push({
          type: 'SleepQuality',
          description: `There appears to be a ${correlation > 0 ? 'positive' : 'negative'} correlation between your sleep quality and focus scores.`,
          confidence: Math.abs(correlation),
          relatedData: { correlation }
        });
      }
    }
    
    return patterns;
  }
  
  // Predict focus score based on current conditions
  predictFocusScore(historicalScores: any[], currentConditions: any): FocusPrediction {
    if (!historicalScores || historicalScores.length < 10) {
      return {
        predictedScore: 5, // Default middle score
        confidence: 0.1,
        factors: ['Insufficient historical data for accurate prediction']
      };
    }
    
    let matchingScores: any[] = [...historicalScores];
    const factors: string[] = [];
    
    // Filter by similar conditions if provided
    if (currentConditions) {
      if (currentConditions.timeOfDay) {
        const targetHour = currentConditions.timeOfDay;
        matchingScores = matchingScores.filter(score => {
          const scoreHour = new Date(score.timestamp).getHours();
          return Math.abs(scoreHour - targetHour) <= 2; // Within 2 hours
        });
        
        if (matchingScores.length > 0) {
          factors.push(`Time of day (around ${targetHour}:00)`);
        }
      }
      
      if (currentConditions.location) {
        const filteredByLocation = matchingScores.filter(score => 
          score.environmentalFactors && 
          score.environmentalFactors.location === currentConditions.location
        );
        
        if (filteredByLocation.length >= 3) {
          matchingScores = filteredByLocation;
          factors.push(`Location (${currentConditions.location})`);
        }
      }
      
      if (currentConditions.noise) {
        const filteredByNoise = matchingScores.filter(score => 
          score.environmentalFactors && 
          score.environmentalFactors.noise === currentConditions.noise
        );
        
        if (filteredByNoise.length >= 3) {
          matchingScores = filteredByNoise;
          factors.push(`Noise level (${currentConditions.noise})`);
        }
      }
      
      if (currentConditions.sleepQuality) {
        const targetSleepQuality = currentConditions.sleepQuality;
        const filteredBySleep = matchingScores.filter(score => 
          score.environmentalFactors && 
          score.environmentalFactors.sleepQuality !== undefined &&
          Math.abs(score.environmentalFactors.sleepQuality - targetSleepQuality) <= 1
        );
        
        if (filteredBySleep.length >= 3) {
          matchingScores = filteredBySleep;
          factors.push(`Sleep quality (${targetSleepQuality}/10)`);
        }
      }
      
      if (currentConditions.medication !== undefined) {
        const filteredByMedication = matchingScores.filter(score => 
          score.environmentalFactors && 
          score.environmentalFactors.medication === currentConditions.medication
        );
        
        if (filteredByMedication.length >= 3) {
          matchingScores = filteredByMedication;
          factors.push(`Medication (${currentConditions.medication ? 'taken' : 'not taken'})`);
        }
      }
    }
    
    // If we have enough matching scores, use them for prediction
    if (matchingScores.length >= 3) {
      const predictedScore = this.calculateAverage(matchingScores, 'score');
      const confidence = Math.min(0.9, this.calculateConfidenceFromSampleSize(matchingScores.length));
      
      return {
        predictedScore: Math.round(predictedScore * 10) / 10, // Round to 1 decimal place
        confidence,
        factors: factors.length > 0 ? factors : ['Based on overall historical average']
      };
    }
    
    // Fall back to overall average with low confidence
    const overallAverage = this.calculateAverage(historicalScores, 'score');
    return {
      predictedScore: Math.round(overallAverage * 10) / 10,
      confidence: 0.3,
      factors: ['Insufficient matching data, using overall average']
    };
  }
  
  // Generate strength-based recommendations
  generateStrengthRecommendations(strengthsAssessment: any): StrengthRecommendation[] {
    if (!strengthsAssessment) {
      return [];
    }
    
    const recommendations: StrengthRecommendation[] = [];
    
    // Hyperfocus recommendations
    if (strengthsAssessment.hyperfocus && strengthsAssessment.hyperfocus.score > 7) {
      recommendations.push({
        strength: 'Hyperfocus',
        score: strengthsAssessment.hyperfocus.score,
        recommendations: [
          'Use the Pomodoro technique to harness hyperfocus in controlled bursts',
          'Schedule complex tasks during your peak focus periods',
          'Create a "deep work" environment that minimizes distractions',
          'Use hyperfocus for creative problem-solving when tackling difficult challenges'
        ]
      });
    }
    
    // Creativity recommendations
    if (strengthsAssessment.creativity && strengthsAssessment.creativity.score > 7) {
      recommendations.push({
        strength: 'Creativity',
        score: strengthsAssessment.creativity.score,
        recommendations: [
          'Allocate time for brainstorming sessions without rigid structure',
          'Use mind-mapping tools to capture and organize creative ideas',
          'Seek opportunities where creative solutions are valued',
          'Combine interests to develop unique interdisciplinary insights'
        ]
      });
    }
    
    // Problem-solving recommendations
    if (strengthsAssessment.problemSolving && strengthsAssessment.problemSolving.score > 7) {
      recommendations.push({
        strength: 'Problem Solving',
        score: strengthsAssessment.problemSolving.score,
        recommendations: [
          'Break complex problems into smaller, manageable parts',
          'Use your ability to see unique connections to develop innovative solutions',
          'Consider roles where troubleshooting and creative solutions are valued',
          'Share your problem-solving approach with teammates who might benefit'
        ]
      });
    }
    
    // Energy level recommendations
    if (strengthsAssessment.energyLevel && strengthsAssessment.energyLevel.score > 7) {
      recommendations.push({
        strength: 'Energy Level',
        score: strengthsAssessment.energyLevel.score,
        recommendations: [
          'Channel excess energy into physical activity throughout the day',
          'Use standing or walking meetings when possible',
          'Break work into shorter, high-energy sessions',
          'Seek dynamic work environments that allow movement and variety'
        ]
      });
    }
    
    // Adaptability recommendations
    if (strengthsAssessment.adaptability && strengthsAssessment.adaptability.score > 7) {
      recommendations.push({
        strength: 'Adaptability',
        score: strengthsAssessment.adaptability.score,
        recommendations: [
          'Seek roles that involve varied responsibilities and challenges',
          'Use your adaptability to help teams navigate change',
          'Develop systems that build on your ability to switch contexts',
          'Practice transitioning between tasks efficiently'
        ]
      });
    }
    
    return recommendations;
  }
  
  // Generate insights based on recent data
  generateInsights(patient: any): AIInsight[] {
    if (!patient) {
      return [];
    }
    
    const insights: AIInsight[] = [];
    
    // Focus score insights
    if (patient.focusScores && patient.focusScores.length >= 5) {
      const recentScores = [...patient.focusScores].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ).slice(0, 10);
      
      const latestScore = recentScores[0];
      const previousScores = recentScores.slice(1);
      const avgPreviousScore = this.calculateAverage(previousScores, 'score');
      
      // Significant improvement
      if (latestScore.score > avgPreviousScore + 2) {
        insights.push({
          type: 'Pattern',
          description: 'Your recent focus score shows significant improvement. Consider what factors contributed to this positive change.',
          confidence: 0.8,
          relatedData: { current: latestScore.score, previous: avgPreviousScore }
        });
      }
      
      // Significant decline
      if (latestScore.score < avgPreviousScore - 2) {
        insights.push({
          type: 'Alert',
          description: 'Your focus score has decreased noticeably. Review recent changes in routine, medication, or environment.',
          confidence: 0.8,
          relatedData: { current: latestScore.score, previous: avgPreviousScore }
        });
      }
      
      // Analyze patterns
      const patterns = this.analyzePatterns(patient.focusScores);
      patterns.forEach(pattern => {
        if (pattern.confidence > 0.6) {
          insights.push({
            type: 'Pattern',
            description: pattern.description,
            confidence: pattern.confidence,
            relatedData: pattern.relatedData
          });
        }
      });
    }
    
    // Goal insights
    if (patient.goals && patient.goals.length > 0) {
      // Stalled goals
      const stalledGoals = patient.goals.filter(goal => 
        goal.status === 'In Progress' && 
        goal.progress < 50 && 
        new Date(goal.targetDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Within a week of target
      );
      
      if (stalledGoals.length > 0) {
        insights.push({
          type: 'Alert',
          description: `You have ${stalledGoals.length} goal(s) at risk of not being completed on time. Consider adjusting timelines or breaking these down into smaller steps.`,
          confidence: 0.7,
          relatedData: { goals: stalledGoals }
        });
      }
      
      // Almost completed goals
      const nearlyCompleteGoals = patient.goals.filter(goal => 
        goal.status === 'In Progress' && 
        goal.progress >= 75 && 
        goal.progress < 100
      );
      
      if (nearlyCompleteGoals.length > 0) {
        insights.push({
          type: 'Recommendation',
          description: `You're close to completing ${nearlyCompleteGoals.length} goal(s)! A final push could help you reach these achievements.`,
          confidence: 0.9,
          relatedData: { goals: nearlyCompleteGoals }
        });
      }
    }
    
    // Medication insights
    if (patient.medications && patient.medications.length > 0 && patient.focusScores && patient.focusScores.length >= 10) {
      // TODO: More sophisticated medication effectiveness analysis
      const medicationTaken = patient.focusScores.filter(score => 
        score.environmentalFactors && score.environmentalFactors.medication === true
      );
      
      const medicationNotTaken = patient.focusScores.filter(score => 
        score.environmentalFactors && score.environmentalFactors.medication === false
      );
      
      if (medicationTaken.length >= 5 && medicationNotTaken.length >= 5) {
        const avgWithMed = this.calculateAverage(medicationTaken, 'score');
        const avgWithoutMed = this.calculateAverage(medicationNotTaken, 'score');
        
        if (avgWithMed - avgWithoutMed > 2) {
          insights.push({
            type: 'Pattern',
            description: 'Your focus scores are significantly higher when medication is taken. Consider discussing the effectiveness with your healthcare provider.',
            confidence: 0.8,
            relatedData: { withMedication: avgWithMed, withoutMedication: avgWithoutMed }
          });
        } else if (avgWithoutMed - avgWithMed > 1) {
          insights.push({
            type: 'Alert',
            description: 'Your focus scores appear to be better without medication. This unusual pattern should be discussed with your healthcare provider.',
            confidence: 0.7,
            relatedData: { withMedication: avgWithMed, withoutMedication: avgWithoutMed }
          });
        } else if (Math.abs(avgWithMed - avgWithoutMed) < 0.5) {
          insights.push({
            type: 'Alert',
            description: 'Your medication may not be significantly impacting your focus scores. Consider reviewing this with your healthcare provider.',
            confidence: 0.6,
            relatedData: { withMedication: avgWithMed, withoutMedication: avgWithoutMed }
          });
        }
      }
    }
    
    // Transition insights
    if (patient.transitionStatus) {
      const { progress, milestones } = patient.transitionStatus;
      
      if (progress < 30 && (!milestones || milestones.filter(m => m.completed).length === 0)) {
        insights.push({
          type: 'Recommendation',
          description: 'Your transition process is in the early stages. Setting up an initial meeting with both your current and future healthcare providers could help smooth the process.',
          confidence: 0.8,
          relatedData: { transitionProgress: progress }
        });
      }
      
      if (progress >= 30 && progress < 70) {
        insights.push({
          type: 'Recommendation',
          description: 'You\'re making progress in your transition journey. Now is a good time to ensure all your medical records are being transferred appropriately.',
          confidence: 0.8,
          relatedData: { transitionProgress: progress }
        });
      }
      
      if (progress >= 70) {
        insights.push({
          type: 'Recommendation',
          description: 'Your transition is nearing completion. Consider scheduling a follow-up with your new provider to ensure continuity of care.',
          confidence: 0.9,
          relatedData: { transitionProgress: progress }
        });
      }
    }
    
    return insights;
  }
  
  // Helper methods
  private calculateAverage(items: any[], property: string): number {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + item[property], 0) / items.length;
  }
  
  private calculateConfidence(sample1Size: number, sample2Size: number): number {
    // Simple confidence calculation based on sample sizes
    const totalSamples = sample1Size + sample2Size;
    return Math.min(0.9, totalSamples / 20); // Cap at 0.9
  }
  
  private calculateConfidenceFromSampleSize(sampleSize: number): number {
    return Math.min(0.9, sampleSize / 10); // Cap at 0.9
  }
  
  private calculateCorrelation(xValues: number[], yValues: number[]): number {
    if (xValues.length !== yValues.length || xValues.length === 0) {
      return 0;
    }
    
    const n = xValues.length;
    
    // Calculate means
    const xMean = xValues.reduce((sum, x) => sum + x, 0) / n;
    const yMean = yValues.reduce((sum, y) => sum + y, 0) / n;
    
    // Calculate the numerator and denominators
    let numerator = 0;
    let xDenominator = 0;
    let yDenominator = 0;
    
    for (let i = 0; i < n; i++) {
      const xDiff = xValues[i] - xMean;
      const yDiff = yValues[i] - yMean;
      numerator += xDiff * yDiff;
      xDenominator += xDiff * xDiff;
      yDenominator += yDiff * yDiff;
    }
    
    // Calculate the correlation coefficient
    if (xDenominator === 0 || yDenominator === 0) {
      return 0;
    }
    
    return numerator / (Math.sqrt(xDenominator) * Math.sqrt(yDenominator));
  }
}

export default new AIService();
