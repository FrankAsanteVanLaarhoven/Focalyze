
const express = require('express');
const router = express.Router();
const Patient = require('../../models/Patient');
const healthlakeService = require('../../services/HealthLakeService');
const { authenticate } = require('../middleware/auth');

// Get patient profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient profile', error: error.message });
  }
});

// Update patient profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    );
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient profile', error: error.message });
  }
});

// Record focus score with environmental factors
router.post('/focus-score', authenticate, async (req, res) => {
  try {
    const { score, notes, environmentalFactors } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const newFocusScore = {
      score,
      notes,
      timestamp: new Date(),
      environmentalFactors: environmentalFactors || {}
    };
    
    patient.focusScores.push(newFocusScore);
    
    // Generate insights using the last 10 focus scores
    if (patient.focusScores.length >= 5) {
      const recentScores = [...patient.focusScores].slice(-10);
      
      // Example insight generation (in a real app, this would be more sophisticated ML)
      const avgScore = recentScores.reduce((sum, fs) => sum + fs.score, 0) / recentScores.length;
      
      if (score > avgScore + 2) {
        patient.insights.push({
          type: 'Pattern',
          description: `Your focus score is significantly higher than your recent average. Consider what factors may have contributed to this improvement.`,
          createdAt: new Date(),
          relevantData: { currentScore: score, averageScore: avgScore }
        });
      } else if (score < avgScore - 2) {
        patient.insights.push({
          type: 'Alert',
          description: `Your focus score is lower than your recent average. Would you like to review possible factors?`,
          createdAt: new Date(),
          relevantData: { currentScore: score, averageScore: avgScore }
        });
      }
      
      // Time of day pattern detection
      const timeOfDay = new Date().getHours();
      const morningScores = recentScores.filter(fs => new Date(fs.timestamp).getHours() >= 6 && new Date(fs.timestamp).getHours() < 12);
      const afternoonScores = recentScores.filter(fs => new Date(fs.timestamp).getHours() >= 12 && new Date(fs.timestamp).getHours() < 18);
      const eveningScores = recentScores.filter(fs => new Date(fs.timestamp).getHours() >= 18 || new Date(fs.timestamp).getHours() < 6);
      
      if (morningScores.length >= 3 && afternoonScores.length >= 3) {
        const morningAvg = morningScores.reduce((sum, fs) => sum + fs.score, 0) / morningScores.length;
        const afternoonAvg = afternoonScores.reduce((sum, fs) => sum + fs.score, 0) / afternoonScores.length;
        
        if (Math.abs(morningAvg - afternoonAvg) > 2) {
          const betterTime = morningAvg > afternoonAvg ? 'morning' : 'afternoon';
          patient.insights.push({
            type: 'Pattern',
            description: `You tend to have better focus during the ${betterTime}. Consider scheduling important tasks during this time.`,
            createdAt: new Date(),
            relevantData: { morningAverage: morningAvg, afternoonAverage: afternoonAvg }
          });
        }
      }
    }
    
    await patient.save();
    
    // Sync with HealthLake
    try {
      await healthlakeService.exportFHIRData('Observation', new Date(), new Date());
    } catch (healthlakeError) {
      console.error('HealthLake sync error:', healthlakeError);
      // Continue even if HealthLake sync fails
    }
    
    res.json({ 
      message: 'Focus score recorded successfully',
      focusScore: newFocusScore,
      insights: patient.insights.slice(-3) // Return the 3 most recent insights
    });
  } catch (error) {
    res.status(500).json({ message: 'Error recording focus score', error: error.message });
  }
});

// Get focus score history
router.get('/focus-scores', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // Get query parameters for filtering
    const { startDate, endDate, limit } = req.query;
    
    let focusScores = [...patient.focusScores];
    
    // Apply date filters if provided
    if (startDate) {
      const start = new Date(startDate);
      focusScores = focusScores.filter(score => new Date(score.timestamp) >= start);
    }
    
    if (endDate) {
      const end = new Date(endDate);
      focusScores = focusScores.filter(score => new Date(score.timestamp) <= end);
    }
    
    // Sort by timestamp (most recent first)
    focusScores.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Apply limit if provided
    if (limit && !isNaN(parseInt(limit))) {
      focusScores = focusScores.slice(0, parseInt(limit));
    }
    
    res.json(focusScores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching focus scores', error: error.message });
  }
});

// Get patient insights
router.get('/insights', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const { type, limit, acknowledged } = req.query;
    
    let insights = [...patient.insights];
    
    // Apply filters if provided
    if (type) {
      insights = insights.filter(insight => insight.type === type);
    }
    
    if (acknowledged !== undefined) {
      const isAcknowledged = acknowledged === 'true';
      insights = insights.filter(insight => insight.acknowledged === isAcknowledged);
    }
    
    // Sort by createdAt (most recent first)
    insights.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Apply limit if provided
    if (limit && !isNaN(parseInt(limit))) {
      insights = insights.slice(0, parseInt(limit));
    }
    
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insights', error: error.message });
  }
});

// Acknowledge insight
router.put('/insights/:insightId/acknowledge', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const insight = patient.insights.id(req.params.insightId);
    
    if (!insight) {
      return res.status(404).json({ message: 'Insight not found' });
    }
    
    insight.acknowledged = true;
    await patient.save();
    
    res.json({ message: 'Insight acknowledged successfully', insight });
  } catch (error) {
    res.status(500).json({ message: 'Error acknowledging insight', error: error.message });
  }
});

// Update goals
router.post('/goals', authenticate, async (req, res) => {
  try {
    const { goals } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patient.goals = goals;
    await patient.save();
    
    res.json({ message: 'Goals updated successfully', goals: patient.goals });
  } catch (error) {
    res.status(500).json({ message: 'Error updating goals', error: error.message });
  }
});

// Add a new goal
router.post('/goals/add', authenticate, async (req, res) => {
  try {
    const { description, targetDate, difficulty, relatedStrength, contextualTriggers } = req.body;
    
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const newGoal = {
      description,
      targetDate: new Date(targetDate),
      status: 'Pending',
      difficulty: difficulty || 'Medium',
      progress: 0,
      relatedStrength,
      contextualTriggers: contextualTriggers || []
    };
    
    patient.goals.push(newGoal);
    await patient.save();
    
    res.json({ message: 'Goal added successfully', goal: newGoal });
  } catch (error) {
    res.status(500).json({ message: 'Error adding goal', error: error.message });
  }
});

// Update goal progress
router.put('/goals/:goalId/progress', authenticate, async (req, res) => {
  try {
    const { progress } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const goal = patient.goals.id(req.params.goalId);
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    goal.progress = progress;
    
    // Automatically update status based on progress
    if (progress >= 100) {
      goal.status = 'Completed';
    } else if (progress > 0) {
      goal.status = 'In Progress';
    }
    
    await patient.save();
    
    res.json({ message: 'Goal progress updated successfully', goal });
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal progress', error: error.message });
  }
});

// Update transition status
router.post('/transition-status', authenticate, async (req, res) => {
  try {
    const { currentPhase, progress, currentProvider, targetProvider, milestones } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patient.transitionStatus = {
      currentPhase: currentPhase || patient.transitionStatus?.currentPhase,
      progress: progress !== undefined ? progress : patient.transitionStatus?.progress,
      currentProvider: currentProvider || patient.transitionStatus?.currentProvider,
      targetProvider: targetProvider || patient.transitionStatus?.targetProvider,
      milestones: milestones || patient.transitionStatus?.milestones || [],
      careTransferDocuments: patient.transitionStatus?.careTransferDocuments || []
    };
    
    await patient.save();
    
    // Sync with HealthLake if providers have changed
    if (currentProvider || targetProvider) {
      try {
        await healthlakeService.exportFHIRData('CareTeam', new Date(), new Date());
      } catch (healthlakeError) {
        console.error('HealthLake sync error:', healthlakeError);
        // Continue even if HealthLake sync fails
      }
    }
    
    res.json({ message: 'Transition status updated successfully', transitionStatus: patient.transitionStatus });
  } catch (error) {
    res.status(500).json({ message: 'Error updating transition status', error: error.message });
  }
});

// Add care transfer document
router.post('/transition-status/documents', authenticate, async (req, res) => {
  try {
    const { title, documentType, sharedWith } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    if (!patient.transitionStatus) {
      patient.transitionStatus = {
        currentPhase: 'Not Started',
        progress: 0,
        milestones: [],
        careTransferDocuments: []
      };
    }
    
    const newDocument = {
      title,
      documentType,
      uploadDate: new Date(),
      sharedWith: sharedWith || []
    };
    
    if (!patient.transitionStatus.careTransferDocuments) {
      patient.transitionStatus.careTransferDocuments = [];
    }
    
    patient.transitionStatus.careTransferDocuments.push(newDocument);
    await patient.save();
    
    res.json({ 
      message: 'Care transfer document added successfully', 
      document: newDocument 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error adding care transfer document', 
      error: error.message 
    });
  }
});

// Get strengths assessment
router.get('/strengths-assessment', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient.strengthsAssessment || {});
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching strengths assessment', 
      error: error.message 
    });
  }
});

// Update strengths assessment
router.put('/strengths-assessment', authenticate, async (req, res) => {
  try {
    const { strengthsAssessment } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patient.strengthsAssessment = strengthsAssessment;
    await patient.save();
    
    res.json({ 
      message: 'Strengths assessment updated successfully', 
      strengthsAssessment: patient.strengthsAssessment 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating strengths assessment', 
      error: error.message 
    });
  }
});

// Update environmental preferences
router.put('/environment-preferences', authenticate, async (req, res) => {
  try {
    const { environmentPreferences } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patient.environmentPreferences = {
      ...patient.environmentPreferences,
      ...environmentPreferences
    };
    
    await patient.save();
    
    res.json({ 
      message: 'Environment preferences updated successfully', 
      environmentPreferences: patient.environmentPreferences 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating environment preferences', 
      error: error.message 
    });
  }
});

// Get personalized resources
router.get('/resources', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const { type, aiRecommended, limit } = req.query;
    
    let resources = [...(patient.personalizedResources || [])];
    
    // Apply filters if provided
    if (type) {
      resources = resources.filter(resource => resource.type === type);
    }
    
    if (aiRecommended !== undefined) {
      const isAiRecommended = aiRecommended === 'true';
      resources = resources.filter(resource => resource.aiRecommended === isAiRecommended);
    }
    
    // Sort by effectiveness (highest first)
    resources.sort((a, b) => (b.effectiveness || 0) - (a.effectiveness || 0));
    
    // Apply limit if provided
    if (limit && !isNaN(parseInt(limit))) {
      resources = resources.slice(0, parseInt(limit));
    }
    
    res.json(resources);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching personalized resources', 
      error: error.message 
    });
  }
});

// Add personalized resource
router.post('/resources', authenticate, async (req, res) => {
  try {
    const { title, type, url, tags, aiRecommended } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    if (!patient.personalizedResources) {
      patient.personalizedResources = [];
    }
    
    const newResource = {
      title,
      type,
      url,
      tags: tags || [],
      aiRecommended: aiRecommended || false,
      engagementLevel: 0,
      effectiveness: 0
    };
    
    patient.personalizedResources.push(newResource);
    await patient.save();
    
    res.json({ 
      message: 'Personalized resource added successfully', 
      resource: newResource 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error adding personalized resource', 
      error: error.message 
    });
  }
});

// Rate resource effectiveness
router.put('/resources/:resourceId/rate', authenticate, async (req, res) => {
  try {
    const { effectiveness, engagementLevel } = req.body;
    const patient = await Patient.findById(req.user.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    if (!patient.personalizedResources) {
      return res.status(404).json({ message: 'No resources found' });
    }
    
    const resource = patient.personalizedResources.id(req.params.resourceId);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    if (effectiveness !== undefined) {
      resource.effectiveness = effectiveness;
    }
    
    if (engagementLevel !== undefined) {
      resource.engagementLevel = engagementLevel;
    }
    
    await patient.save();
    
    res.json({ 
      message: 'Resource rating updated successfully', 
      resource 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error rating resource', 
      error: error.message 
    });
  }
});

module.exports = router;
