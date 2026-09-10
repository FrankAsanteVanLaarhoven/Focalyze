
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Calendar, CheckCircle, Clock, Play, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const SelfManagement = () => {
  const currentSprint = {
    name: "Morning Routine Optimization",
    description: "Establish a consistent, science-based morning routine to optimize focus and energy",
    progress: 38,
    daysCompleted: 5,
    totalDays: 14
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-adhd-dark">
              Self-Management Module
            </h1>
            <p className="text-gray-600 mt-1">
              Leverage your ADHD-related strengths and implement science-based protocols
            </p>
          </div>
          <Button className="bg-adhd-primary hover:bg-adhd-secondary">
            Create New Sprint
          </Button>
        </div>
        
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Current Sprint: {currentSprint.name}</CardTitle>
                  <CardDescription className="mt-2">{currentSprint.description}</CardDescription>
                </div>
                <Badge className="bg-adhd-primary hover:bg-adhd-primary">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock size={20} className="mr-2 text-adhd-primary" />
                    <span className="font-medium">Day {currentSprint.daysCompleted} of {currentSprint.totalDays}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">{currentSprint.progress}% complete</span>
                    <Progress value={currentSprint.progress} className="w-40 h-2" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Today's Activities</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="p-1 rounded-full mr-2 text-green-500">
                          <CheckCircle size={16} />
                        </div>
                        <span>Morning sunlight exposure (5-10 minutes)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="p-1 rounded-full mr-2 text-green-500">
                          <CheckCircle size={16} />
                        </div>
                        <span>Take medication with protein</span>
                      </li>
                      <li className="flex items-start">
                        <div className="p-1 rounded-full mr-2 text-gray-300">
                          <CheckCircle size={16} />
                        </div>
                        <span>Review daily priorities (1-3 tasks)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="p-1 rounded-full mr-2 text-gray-300">
                          <CheckCircle size={16} />
                        </div>
                        <span>Fill water bottle for the day</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Sprint Insights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Star className="text-amber-500 mr-2 flex-shrink-0" size={16} />
                        <span className="text-sm">You're 42% more likely to complete your priority tasks when you complete your morning routine</span>
                      </li>
                      <li className="flex items-start">
                        <Star className="text-amber-500 mr-2 flex-shrink-0" size={16} />
                        <span className="text-sm">Your focus score is 28% higher on days when you get morning sunlight exposure</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-adhd-primary hover:bg-adhd-secondary mr-2">
                Review Today's Progress
              </Button>
              <Button variant="outline">Adjust Sprint</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="sprints" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sprints">Sprint Library</TabsTrigger>
            <TabsTrigger value="routines">Routines</TabsTrigger>
            <TabsTrigger value="protocols">Protocols</TabsTrigger>
            <TabsTrigger value="strengths">Strengths Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sprints" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="mr-2" size={20} />
                    Featured Sprints
                  </CardTitle>
                  <CardDescription>
                    Evidence-based 2-week improvement programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <h3 className="font-medium">Deep Work Sessions</h3>
                      <p className="text-sm text-gray-600 mt-1">Structure focused work periods with breaks based on your attention span</p>
                      <div className="flex mt-2">
                        <Badge className="bg-blue-100 text-blue-800 mr-2 hover:bg-blue-100">Productivity</Badge>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Focus</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <h3 className="font-medium">Evening Wind Down</h3>
                      <p className="text-sm text-gray-600 mt-1">Create a consistent evening routine to improve sleep quality</p>
                      <div className="flex mt-2">
                        <Badge className="bg-indigo-100 text-indigo-800 mr-2 hover:bg-indigo-100">Sleep</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Wellbeing</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <h3 className="font-medium">Task Management System</h3>
                      <p className="text-sm text-gray-600 mt-1">Implement a personalized system for tracking and completing tasks</p>
                      <div className="flex mt-2">
                        <Badge className="bg-blue-100 text-blue-800 mr-2 hover:bg-blue-100">Productivity</Badge>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Organization</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2" size={20} />
                    Completed Sprints
                  </CardTitle>
                  <CardDescription>
                    Your sprint history and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Medication Optimization</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">March 10-24, 2025</p>
                      <p className="text-sm text-green-600 mt-2">92% adherence rate</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Time Awareness Training</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">February 15-29, 2025</p>
                      <p className="text-sm text-green-600 mt-2">78% adherence rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2" size={20} />
                    Research-Based Resources
                  </CardTitle>
                  <CardDescription>
                    Evidence-based protocols for ADHD management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <a
                      href="https://www.hubermanlab.com/episode/adhd-and-how-to-improve-focus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium group-hover:text-adhd-primary transition-colors">Huberman Lab: ADHD Protocol</h3>
                        <span className="text-xs text-gray-400">External ↗</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Science-based approaches to dopamine regulation and managing ADHD focus</p>
                    </a>
                    
                    <a
                      href="https://drhallowell.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium group-hover:text-adhd-primary transition-colors">Dr. Hallowell: Strengths Approach</h3>
                        <span className="text-xs text-gray-400">External ↗</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Leveraging ADHD-related strengths using the Sheng methodology</p>
                    </a>
                    
                    <a
                      href="https://www.nice.org.uk/guidance/ng87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium group-hover:text-adhd-primary transition-colors">NICE NG87: Transition & Care Resilience</h3>
                        <span className="text-xs text-gray-400">External ↗</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">National clinical standards for young adult ADHD transition and continuity of care</p>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="routines" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Routines</CardTitle>
                <CardDescription>
                  Consistent routines to improve ADHD management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Routines content will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="protocols" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Scientific Protocols</CardTitle>
                <CardDescription>
                  Evidence-based protocols for ADHD management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Protocols content will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="strengths" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>ADHD Strengths Profile</CardTitle>
                <CardDescription>
                  Identifying and leveraging your ADHD-related strengths
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Strengths profile will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SelfManagement;
