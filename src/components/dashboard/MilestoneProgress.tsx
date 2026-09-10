
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, Play } from 'lucide-react';

const MilestoneProgress = () => {
  const transitionStages = [
    {
      name: "Awareness & Preparation",
      description: "Understanding ADHD and preparing for transition",
      status: "completed",
      milestones: [
        { title: "ADHD self-assessment completed", status: "completed" },
        { title: "Personal transition goals defined", status: "completed" },
        { title: "Core support team identified", status: "completed" }
      ]
    },
    {
      name: "Early Transition",
      description: "Building skills for independence",
      status: "completed",
      milestones: [
        { title: "Medication management plan established", status: "completed" },
        { title: "Self-advocacy skills developed", status: "completed" },
        { title: "Educational accommodations documented", status: "completed" }
      ]
    },
    {
      name: "Active Transition",
      description: "Navigating healthcare system changes",
      status: "in-progress",
      milestones: [
        { title: "Adult provider identified", status: "completed" },
        { title: "Medical records transferred", status: "completed" },
        { title: "Initial adult provider appointment", status: "pending" },
        { title: "Treatment plan continuity established", status: "pending" }
      ]
    },
    {
      name: "Independence",
      description: "Managing ADHD independently",
      status: "pending",
      milestones: [
        { title: "Independent medication management", status: "pending" },
        { title: "Consistent appointment attendance", status: "pending" },
        { title: "Self-monitoring system established", status: "pending" }
      ]
    },
    {
      name: "Long-term Success",
      description: "Thriving with ADHD in adult life",
      status: "pending",
      milestones: [
        { title: "Work/education accommodations secured", status: "pending" },
        { title: "Long-term support network established", status: "pending" },
        { title: "Personal strengths leveraged regularly", status: "pending" }
      ]
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case "pending":
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2" size={20} />
            Transition Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-8 before:absolute before:left-3 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
            {transitionStages.map((stage, stageIndex) => (
              <div key={stageIndex} className="mb-8 relative">
                <div 
                  className={`absolute left-[-29px] w-6 h-6 rounded-full flex items-center justify-center ${
                    stage.status === "completed" ? "bg-green-500" : 
                    stage.status === "in-progress" ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {stage.status === "completed" && <CheckCircle size={14} className="text-white" />}
                  {stage.status === "in-progress" && <Play size={14} className="text-white" />}
                </div>
                <div className="mb-2">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold mr-2">{stage.name}</h3>
                    {getStatusBadge(stage.status)}
                  </div>
                  <p className="text-gray-600 text-sm">{stage.description}</p>
                </div>
                <div className="space-y-2 mt-3">
                  {stage.milestones.map((milestone, milestoneIndex) => (
                    <div key={milestoneIndex} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${
                        milestone.status === "completed" ? "bg-green-200" : "bg-gray-200"
                      }`}>
                        {milestone.status === "completed" && (
                          <CheckCircle size={16} className="text-green-600" />
                        )}
                      </div>
                      <span className={milestone.status === "completed" ? "text-green-800" : "text-gray-600"}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
                {stage.status === "in-progress" && (
                  <Button className="mt-3 bg-adhd-primary hover:bg-adhd-secondary">
                    Work on Next Milestone
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MilestoneProgress;
