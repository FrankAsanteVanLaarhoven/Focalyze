
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, CheckCircle, FileText, MapPin, Play, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Transition = () => {
  const transitionProgress = 65;
  
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-adhd-dark">
              Transition Bridge System
            </h1>
            <p className="text-gray-600 mt-1">
              Navigate the transition from pediatric to adult ADHD care
            </p>
          </div>
          <Button className="bg-adhd-primary hover:bg-adhd-secondary">
            Update Transition Plan
          </Button>
        </div>
        
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Transition Progress</CardTitle>
              <CardDescription>
                Your journey from pediatric to adult ADHD care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Current Stage: Active Transition</h3>
                  <div className="text-right">
                    <span className="text-lg font-bold">{transitionProgress}%</span>
                    <span className="text-sm text-gray-500 ml-2">Overall Progress</span>
                  </div>
                </div>
                
                <Progress value={transitionProgress} className="h-2.5" />
                
                <div className="grid grid-cols-5 gap-2 text-center text-sm">
                  {transitionStages.map((stage, index) => (
                    <div key={index} className="space-y-1">
                      <div className={`h-1.5 w-full rounded-full ${
                        stage.status === "completed" ? "bg-green-500" : 
                        stage.status === "in-progress" ? "bg-blue-500" : "bg-gray-300"
                      }`}></div>
                      <p className={`text-xs truncate ${
                        stage.status === "completed" ? "text-green-700" : 
                        stage.status === "in-progress" ? "text-blue-700" : "text-gray-500"
                      }`}>
                        {stage.name}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border rounded-lg bg-blue-50 mt-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-700 mr-4">
                      <Play size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">Next Milestone: Initial Adult Provider Appointment</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Schedule your first appointment with your new adult ADHD specialist, Dr. Sarah Johnson.
                      </p>
                      <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                        Schedule Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="journey" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="journey">Transition Journey</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journey" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2" size={20} />
                    Transition Milestones
                  </CardTitle>
                  <CardDescription>
                    Your personalized transition pathway
                  </CardDescription>
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
                            {stage.status === "completed" && (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                            )}
                            {stage.status === "in-progress" && (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
                            )}
                            {stage.status === "pending" && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">Pending</Badge>
                            )}
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
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2" size={20} />
                      Your Transition Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <h3 className="font-medium">Dr. Emily Chen</h3>
                        <p className="text-xs text-gray-500">Pediatric ADHD Specialist</p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Current</Badge>
                          <Button size="sm" variant="ghost">Contact</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <h3 className="font-medium">Dr. Sarah Johnson</h3>
                        <p className="text-xs text-gray-500">Adult ADHD Specialist</p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Future</Badge>
                          <Button size="sm" variant="ghost">Contact</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <h3 className="font-medium">James Wilson</h3>
                        <p className="text-xs text-gray-500">Transition Care Coordinator</p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                          <Button size="sm" variant="ghost">Contact</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Book className="mr-2" size={20} />
                      Upcoming Transition Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border rounded-md">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                          <Play size={14} />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Schedule adult provider appointment</h3>
                          <p className="text-xs text-gray-500">Due in 7 days</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 border rounded-md">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                          <FileText size={14} />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Complete transition readiness assessment</h3>
                          <p className="text-xs text-gray-500">Due in 14 days</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 border rounded-md">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                          <User size={14} />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Participate in joint provider meeting</h3>
                          <p className="text-xs text-gray-500">Due in 21 days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transition Resources</CardTitle>
                <CardDescription>
                  Helpful resources for navigating the transition period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Transition resources will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transition Documents</CardTitle>
                <CardDescription>
                  Important documents for your healthcare transition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Transition documents will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="providers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Healthcare Providers</CardTitle>
                <CardDescription>
                  Your current and future healthcare providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Provider information will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Transition;
