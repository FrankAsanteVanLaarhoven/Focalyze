
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Play, Star } from 'lucide-react';

const SprintOverview = () => {
  const sprintData = {
    name: "Morning Routine Optimization",
    days: {
      current: 5,
      total: 14
    },
    progress: 35,
    activities: [
      {
        title: "Morning sunlight exposure",
        description: "Get 5-10 minutes of morning sunlight exposure to regulate circadian rhythm",
        completed: true
      },
      {
        title: "Medication timer setup",
        description: "Use a timed reminder for consistent medication timing",
        completed: true
      },
      {
        title: "Priority task identification",
        description: "Identify 1-3 most important tasks for the day",
        completed: false
      },
      {
        title: "Hydration and nutrition",
        description: "Start day with 16oz water and protein-rich breakfast",
        completed: false
      }
    ],
    insights: [
      "You're 30% more likely to complete tasks when you expose yourself to morning sunlight",
      "Setting out clothes the night before has reduced your morning preparation time by 15 minutes"
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Play className="mr-2" size={20} />
              Current Sprint: {sprintData.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock size={20} className="mr-2 text-adhd-primary" />
                  <span className="font-medium">Day {sprintData.days.current} of {sprintData.days.total}</span>
                </div>
                <Progress value={sprintData.progress} className="w-1/2 h-2" />
                <span className="text-sm text-gray-500">{sprintData.progress}% complete</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Sprint Activities</h3>
                {sprintData.activities.map((activity, index) => (
                  <div key={index} className="flex items-start p-4 rounded-lg border bg-gray-50">
                    <div className={`p-1 rounded-full mr-3 ${activity.completed ? 'text-green-500' : 'text-gray-400'}`}>
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-adhd-primary hover:bg-adhd-secondary">
              Mark Today's Activities
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2" size={20} />
              Sprint Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {sprintData.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-adhd-primary mr-2">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Next Sprint Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-adhd-light cursor-pointer hover:bg-adhd-light/80 transition-colors">
                <h3 className="font-medium">Deep Work Sessions</h3>
                <p className="text-sm text-gray-600">Structure focused work periods with breaks based on your attention span</p>
              </div>
              <div className="p-3 rounded-md bg-adhd-light cursor-pointer hover:bg-adhd-light/80 transition-colors">
                <h3 className="font-medium">Evening Wind Down</h3>
                <p className="text-sm text-gray-600">Create a consistent evening routine to improve sleep quality</p>
              </div>
              <div className="p-3 rounded-md bg-adhd-light cursor-pointer hover:bg-adhd-light/80 transition-colors">
                <h3 className="font-medium">Task Management System</h3>
                <p className="text-sm text-gray-600">Implement a personalized system for tracking and completing tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sprint Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="https://www.hubermanlab.com/episode/adhd-and-how-to-improve-focus"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-md border hover:bg-gray-50 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium group-hover:text-adhd-primary transition-colors">Huberman Lab: Morning Routine Protocol</h3>
                  <span className="text-xs text-gray-400">↗</span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">Science-backed strategies for circadian rhythm and focus</p>
              </a>
              <a
                href="https://drhallowell.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-md border hover:bg-gray-50 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium group-hover:text-adhd-primary transition-colors">Dr. Hallowell: The ADHD-Friendly Morning</h3>
                  <span className="text-xs text-gray-400">↗</span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">Strength-based approaches to kickstart executive function</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SprintOverview;
