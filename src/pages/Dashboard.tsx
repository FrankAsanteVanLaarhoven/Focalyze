
import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Brain, Calendar, CheckCircle, Clock, HeartPulse, Play, 
  TrendingUp, Users, Heart, Sparkles, Video 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import UpcomingActivities from '@/components/dashboard/UpcomingActivities';
import FocusTracker from '@/components/dashboard/FocusTracker';
import SprintOverview from '@/components/dashboard/SprintOverview';
import MilestoneProgress from '@/components/dashboard/MilestoneProgress';

const Dashboard = () => {
  const { user } = useAppSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentFocusScore] = useState(7);
  const [transitionProgress] = useState(65);
  
  const modules = [
    {
      title: "1:1 Expert Teletherapy",
      description: "Book certified NHS/GMC transition psychiatrists & coaches",
      icon: Video,
      link: "/expert",
      color: "bg-emerald-600"
    },
    {
      title: "Heart Biofeedback & HRV",
      description: "Real cardiac pulse sound & vagal coherence pacer",
      icon: Heart,
      link: "/biofeedback",
      color: "bg-rose-600"
    },
    {
      title: "3D Brain & Synapses",
      description: "Interactive WebGL fronto-striatal dopamine circuits",
      icon: Sparkles,
      link: "/neuro-3d",
      color: "bg-indigo-600"
    },
    {
      title: "AI-Powered Monitoring",
      description: "Track your focus, activity, and sleep patterns",
      icon: TrendingUp,
      link: "/monitoring",
      color: "bg-blue-500"
    },
    {
      title: "Clinical Support",
      description: "Access assessment tools and clinical pathways",
      icon: Users,
      link: "/clinical",
      color: "bg-green-500"
    },
    {
      title: "Self-Management",
      description: "Implement science-based protocols",
      icon: CheckCircle,
      link: "/self-management",
      color: "bg-purple-500"
    },
    {
      title: "Transition Bridge",
      description: "Navigate the transition between care systems",
      icon: Play,
      link: "/transition",
      color: "bg-amber-500"
    },
    {
      title: "Mentor Portal",
      description: "Screening tools and observation logs for clinicians",
      icon: Brain,
      link: "/mentor",
      color: "bg-indigo-500"
    },
    {
      title: "PTSD Support",
      description: "Grounding exercises, journal and crisis resources",
      icon: HeartPulse,
      link: "/ptsd",
      color: "bg-teal-500"
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-adhd-dark">
              Welcome back, {user?.name || 'User'}
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your Focalyze overview
            </p>
          </div>
          <Button className="bg-adhd-primary hover:bg-adhd-secondary">
            Start Today's Activities
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-500">Current Focus Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">{currentFocusScore}/10</div>
                <div className={`${currentFocusScore >= 7 ? 'text-green-500' : 'text-amber-500'} flex items-center`}>
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+5% vs last week</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-500">Current Sprint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-xl font-bold">Morning Routine Optimization</div>
                <div className="text-adhd-primary flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">Day 5 of 14</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-500">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-xl font-bold">3 sessions</div>
                <div className="text-adhd-primary flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">View Calendar</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-500">Transition Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xl font-bold">{transitionProgress}%</span>
                  <span className="text-sm text-gray-500">Stage 3/5</span>
                </div>
                <Progress value={transitionProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modules.map((module, index) => (
            <Link to={module.link} key={index}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-full ${module.color} flex items-center justify-center text-white mb-4`}>
                    <module.icon size={24} />
                  </div>
                  <CardTitle className="mb-2">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="focusTracker">Focus Tracker</TabsTrigger>
            <TabsTrigger value="currentSprint">Current Sprint</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2" size={20} />
                  Weekly Focus Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Focus trend chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            
            <UpcomingActivities />
          </TabsContent>
          
          <TabsContent value="focusTracker">
            <FocusTracker />
          </TabsContent>
          
          <TabsContent value="currentSprint">
            <SprintOverview />
          </TabsContent>
          
          <TabsContent value="milestones">
            <MilestoneProgress />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
