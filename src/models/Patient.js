
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  // FHIR Patient resource fields
  resourceType: {
    type: String,
    default: 'Patient',
    required: true
  },
  identifier: [{
    system: String,
    value: String
  }],
  active: {
    type: Boolean,
    default: true
  },
  name: [{
    use: String,
    family: String,
    given: [String]
  }],
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'unknown']
  },
  birthDate: Date,
  // Custom fields for ADHD management
  diagnosis: {
    type: String,
    enum: ['ADHD', 'ADD', 'Other']
  },
  severity: {
    type: String,
    enum: ['Mild', 'Moderate', 'Severe']
  },
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    effectiveness: {
      type: Number,
      min: 1,
      max: 10
    },
    sideEffects: [String]
  }],
  // Monitoring data
  focusScores: [{
    score: Number,
    timestamp: Date,
    notes: String,
    environmentalFactors: {
      location: String,
      noise: {
        type: String,
        enum: ['Low', 'Medium', 'High']
      },
      timeOfDay: String,
      sleepQuality: {
        type: Number,
        min: 1,
        max: 10
      },
      medication: Boolean
    }
  }],
  // AI-generated insights
  insights: [{
    type: {
      type: String,
      enum: ['Pattern', 'Recommendation', 'Prediction', 'Alert']
    },
    description: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    relevantData: Object,
    acknowledged: {
      type: Boolean,
      default: false
    }
  }],
  // Strengths-based assessment
  strengthsAssessment: {
    hyperfocus: {
      score: Number,
      examples: [String]
    },
    creativity: {
      score: Number,
      examples: [String]
    },
    problemSolving: {
      score: Number,
      examples: [String]
    },
    energyLevel: {
      score: Number,
      examples: [String]
    },
    resilience: {
      score: Number,
      examples: [String]
    },
    adaptability: {
      score: Number,
      examples: [String]
    }
  },
  // Self-management data
  goals: [{
    description: String,
    targetDate: Date,
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed']
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Adaptive']
    },
    progress: Number,
    relatedStrength: String,
    contextualTriggers: [String]
  }],
  // Transition data
  transitionStatus: {
    currentPhase: String,
    progress: Number,
    currentProvider: {
      name: String,
      type: String,
      contactInfo: String
    },
    targetProvider: {
      name: String,
      type: String,
      contactInfo: String
    },
    milestones: [{
      description: String,
      completed: Boolean,
      date: Date,
      notes: String,
      responsibleParty: String
    }],
    careTransferDocuments: [{
      title: String,
      uploadDate: Date,
      sharedWith: [String],
      documentType: String
    }]
  },
  // Environmental optimization
  environmentPreferences: {
    optimalNoiseLevel: String,
    optimalLightingLevel: String,
    preferredWorkEnvironments: [String],
    distractionTriggers: [String],
    supportiveAccommodations: [String]
  },
  // Mental health resources
  personalizedResources: [{
    title: String,
    type: {
      type: String,
      enum: ['Article', 'Video', 'Exercise', 'Community', 'Service']
    },
    url: String,
    tags: [String],
    aiRecommended: Boolean,
    engagementLevel: Number,
    effectiveness: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', PatientSchema);
