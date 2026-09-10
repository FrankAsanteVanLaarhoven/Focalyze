import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Calendar, CheckCircle, Clock, Play, Star, Plus, 
  Sparkles, CheckSquare, Zap, Shield, BookOpen, ExternalLink,
  Award, Flame, Sliders, ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface RoutineItem {
  id: string;
  title: string;
  category: 'morning' | 'afternoon' | 'evening' | 'bedtime';
  duration: string;
  completed: boolean;
  scientificReason: string;
}

const initialRoutines: RoutineItem[] = [
  {
    id: 'r1',
    title: 'Outdoor morning sunlight (low solar angle)',
    category: 'morning',
    duration: '10 min',
    completed: true,
    scientificReason: 'Triggers circadian melanopsin ganglion cells to reset dopamine and cortisol peaks'
  },
  {
    id: 'r2',
    title: 'High-protein breakfast (30g) + hydration',
    category: 'morning',
    duration: '15 min',
    completed: true,
    scientificReason: 'Provides L-tyrosine precursors for sustained prefrontal dopamine synthesis'
  },
  {
    id: 'r3',
    title: 'Prescription stimulant with cold water',
    category: 'morning',
    duration: '2 min',
    completed: true,
    scientificReason: 'Consistent timing maintains steady plasma concentration without rebound jitter'
  },
  {
    id: 'r4',
    title: 'Review 1–3 Priority Task Anchors (Not a 20-item list)',
    category: 'morning',
    duration: '5 min',
    completed: false,
    scientificReason: 'Prevents executive function paralysis by restricting working memory load'
  },
  {
    id: 'r5',
    title: '90-Minute Ultradian Deep Focus Session',
    category: 'afternoon',
    duration: '90 min',
    completed: false,
    scientificReason: 'Aligns with prefrontal cortex biological attention cycles'
  },
  {
    id: 'r6',
    title: '15-Minute Brisk Walk / Zone 2 Cardio',
    category: 'afternoon',
    duration: '15 min',
    completed: false,
    scientificReason: 'Spikes BDNF and restores vigilance after midday dopamine slump'
  },
  {
    id: 'r7',
    title: 'Digital Work Shutdown & Tab Closure Ritual',
    category: 'evening',
    duration: '10 min',
    completed: false,
    scientificReason: 'Reduces cognitive open-loop anxiety and cortisol before relaxation'
  },
  {
    id: 'r8',
    title: 'Blue Light Dimming & Phone Docking outside bedroom',
    category: 'bedtime',
    duration: '5 min',
    completed: false,
    scientificReason: 'Prevents melatonin suppression to ensure restorative deep REM cycles'
  }
];

const SelfManagement = () => {
  const { toast } = useToast();
  const [sprintDialogOpen, setSprintDialogOpen] = useState(false);
  const [routineDialogOpen, setRoutineDialogOpen] = useState(false);

  // Active sprint state
  const [currentSprint, setCurrentSprint] = useState({
    name: "Morning Routine & Dopamine Regulation",
    description: "Establish a consistent, science-based morning protocol to maximize prefrontal focus and minimize afternoon burnout",
    progress: 45,
    daysCompleted: 6,
    totalDays: 14,
    activities: [
      { id: 'a1', text: 'Morning sunlight exposure (5-10 minutes outdoors)', completed: true },
      { id: 'a2', text: 'Take medication with protein-rich food', completed: true },
      { id: 'a3', text: 'Review daily top 2 priorities before opening email/chat', completed: false },
      { id: 'a4', text: 'Drink 500ml electrolyte water before 10 AM', completed: true },
    ]
  });

  // Form states for new sprint
  const [newSprintName, setNewSprintName] = useState('');
  const [newSprintDesc, setNewSprintDesc] = useState('');
  const [newSprintDays, setNewSprintDays] = useState('14');

  // Routines state
  const [routines, setRoutines] = useState<RoutineItem[]>(initialRoutines);
  const [newRoutineTitle, setNewRoutineTitle] = useState('');
  const [newRoutineCategory, setNewRoutineCategory] = useState<'morning' | 'afternoon' | 'evening' | 'bedtime'>('morning');
  const [newRoutineDuration, setNewRoutineDuration] = useState('10 min');

  // Strengths assessment state (1-10)
  const [strengths, setStrengths] = useState({
    hyperfocus: 9,
    divergentThinking: 9,
    crisisComposure: 8,
    spontaneity: 8,
    empathy: 7
  });

  // Protocols checklist state
  const [protocolChecks, setProtocolChecks] = useState<Record<string, boolean>>({
    'huberman-1': true,
    'huberman-2': true,
    'huberman-3': false,
    'huberman-4': false,
    'hallowell-1': true,
    'hallowell-2': false,
    'hallowell-3': false,
    'nice-1': true,
    'nice-2': true,
    'nice-3': false
  });

  const toggleActivity = (id: string) => {
    setCurrentSprint(prev => {
      const updated = prev.activities.map(a => a.id === id ? { ...a, completed: !a.completed } : a);
      const completedCount = updated.filter(a => a.completed).length;
      const newProgress = Math.round((completedCount / updated.length) * 100);
      return { ...prev, activities: updated, progress: newProgress };
    });
    toast({
      title: "Sprint Activity Updated",
      description: "Progress recalculated for today's active sprint.",
    });
  };

  const toggleRoutine = (id: string) => {
    setRoutines(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    toast({
      title: "Routine Checked",
      description: "Habit tracker updated.",
    });
  };

  const handleCreateSprint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSprintName.trim()) return;

    setCurrentSprint({
      name: newSprintName,
      description: newSprintDesc || "Targeted executive functioning protocol",
      progress: 0,
      daysCompleted: 1,
      totalDays: parseInt(newSprintDays) || 14,
      activities: [
        { id: 'n1', text: 'Daily Core Anchor Goal', completed: false },
        { id: 'n2', text: 'Energy & Focus Check-in', completed: false },
        { id: 'n3', text: 'Evening Shutdown & Reflection', completed: false }
      ]
    });

    setSprintDialogOpen(false);
    setNewSprintName('');
    setNewSprintDesc('');
    toast({
      title: "New Sprint Launched!",
      description: `Activated "${newSprintName}" (${newSprintDays} days).`,
    });
  };

  const handleAddRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoutineTitle.trim()) return;

    const newItem: RoutineItem = {
      id: `r-${Date.now()}`,
      title: newRoutineTitle,
      category: newRoutineCategory,
      duration: newRoutineDuration,
      completed: false,
      scientificReason: 'Custom user-tailored ADHD executive routine'
    };

    setRoutines(prev => [...prev, newItem]);
    setRoutineDialogOpen(false);
    setNewRoutineTitle('');
    toast({
      title: "Routine Added",
      description: `Added "${newRoutineTitle}" to your ${newRoutineCategory} schedule.`,
    });
  };

  const toggleProtocol = (key: string) => {
    setProtocolChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedRoutines = routines.filter(r => r.completed).length;
  const routinePct = Math.round((completedRoutines / routines.length) * 100);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Self-Management Engine
              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Science-Backed</Badge>
            </h1>
            <p className="text-slate-600 mt-1">
              Harness hyperfocus, optimize neurotransmitter dynamics, and sustain daily momentum
            </p>
          </div>
          
          <Dialog open={sprintDialogOpen} onOpenChange={setSprintDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-2">
                <Plus size={18} />
                Create New Sprint
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <form onSubmit={handleCreateSprint}>
                <DialogHeader>
                  <DialogTitle>Launch 14-Day Focus Sprint</DialogTitle>
                  <DialogDescription>
                    Structured, low-friction micro-sprints designed specifically for ADHD dopamine loops.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Sprint Goal / Title</label>
                    <Input 
                      placeholder="e.g. Deep Work Blocks & Dissertation Sprint" 
                      value={newSprintName}
                      onChange={(e) => setNewSprintName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Clinical Objective</label>
                    <Textarea 
                      placeholder="Describe what specific hurdle or habit you are mastering over this cycle..."
                      value={newSprintDesc}
                      onChange={(e) => setNewSprintDesc(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Sprint Duration</label>
                    <select 
                      className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                      value={newSprintDays}
                      onChange={(e) => setNewSprintDays(e.target.value)}
                    >
                      <option value="7">7 Days (Rapid Kickstart)</option>
                      <option value="14">14 Days (Standard Habit Window)</option>
                      <option value="21">21 Days (Consolidation Cycle)</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setSprintDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Start Sprint</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Active Sprint Banner */}
        <div className="mb-8">
          <Card className="border-indigo-100 shadow-sm bg-gradient-to-r from-white via-indigo-50/20 to-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl font-bold text-slate-900">Current Sprint: {currentSprint.name}</CardTitle>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Active</Badge>
                  </div>
                  <CardDescription className="mt-2 text-slate-600 max-w-2xl">{currentSprint.description}</CardDescription>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sprint Health</span>
                  <p className="text-xl font-bold text-indigo-600">On Track</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center">
                    <Clock size={20} className="mr-2 text-indigo-600" />
                    <span className="font-semibold text-slate-800">Day {currentSprint.daysCompleted} of {currentSprint.totalDays}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600">{currentSprint.progress}% complete</span>
                    <Progress value={currentSprint.progress} className="w-36 h-2.5" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-xs">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <CheckSquare size={17} className="text-indigo-600" />
                        Today's Sprint Tasks (Interactive)
                      </h3>
                      <span className="text-xs text-slate-500">Tap to complete</span>
                    </div>
                    <ul className="space-y-2.5">
                      {currentSprint.activities.map(activity => (
                        <li 
                          key={activity.id}
                          onClick={() => toggleActivity(activity.id)}
                          className={`flex items-start p-2 rounded-lg cursor-pointer transition-all border ${
                            activity.completed 
                              ? 'bg-emerald-50/70 border-emerald-200 text-slate-700 line-through opacity-80' 
                              : 'bg-white border-slate-100 hover:border-indigo-200 text-slate-800'
                          }`}
                        >
                          <div className={`p-0.5 rounded-full mr-2.5 mt-0.5 ${activity.completed ? 'text-emerald-600' : 'text-slate-300'}`}>
                            <CheckCircle size={17} />
                          </div>
                          <span className="text-sm font-medium select-none">{activity.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-xs">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Zap size={17} className="text-amber-500" />
                      Executive Function Insights
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Star className="text-amber-500 mr-2.5 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-slate-600">
                          <strong>Dopamine Momentum:</strong> You are <strong>42% more likely</strong> to complete priority tasks when morning anchors are finished before 10:00 AM.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Star className="text-amber-500 mr-2.5 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-slate-600">
                          <strong>Natural Alertness:</strong> Your sustained focus score averages <strong>8.2/10</strong> on days with 10min morning outdoor sunlight.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Star className="text-amber-500 mr-2.5 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-slate-600">
                          <strong>Transition Bridge:</strong> Shared care medication consistency score is at <strong>94%</strong> over the past 30 days.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => toast({
                  title: "Today's Review Saved",
                  description: `Sprint progress updated to ${currentSprint.progress}%. Well done on maintaining focus!`,
                })}
              >
                Save Daily Sprint Review
              </Button>
              <Button variant="outline" onClick={() => setSprintDialogOpen(true)}>
                Customize Sprint Goals
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Navigation Tabs */}
        <Tabs defaultValue="sprints" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="sprints" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Sprint Library</TabsTrigger>
            <TabsTrigger value="routines" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Daily Routines ({completedRoutines}/{routines.length})</TabsTrigger>
            <TabsTrigger value="protocols" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Scientific Protocols</TabsTrigger>
            <TabsTrigger value="strengths" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Strengths Profile</TabsTrigger>
          </TabsList>
          
          {/* TAB 1: SPRINT LIBRARY */}
          <TabsContent value="sprints" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Play className="mr-2 text-indigo-600" size={20} />
                    Featured ADHD Sprints
                  </CardTitle>
                  <CardDescription>
                    Pre-calibrated 14-day neurological momentum cycles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div 
                      onClick={() => {
                        setCurrentSprint({
                          name: "Deep Work Sessions",
                          description: "Structure focused 90-minute blocks separated by vagal reset breathing periods",
                          progress: 10,
                          daysCompleted: 1,
                          totalDays: 14,
                          activities: [
                            { id: 'dw1', text: 'Set physical timer to 90 min', completed: false },
                            { id: 'dw2', text: 'Full screen / noise cancelling mode', completed: false },
                            { id: 'dw3', text: '5 min breathing coherence break', completed: false },
                          ]
                        });
                        toast({ title: "Sprint Loaded", description: "Deep Work Sessions is now active." });
                      }}
                      className="p-3.5 border rounded-lg hover:bg-indigo-50/50 cursor-pointer transition-colors border-slate-200"
                    >
                      <h3 className="font-semibold text-slate-800">Deep Work Sessions</h3>
                      <p className="text-xs text-slate-600 mt-1">Structure focused work periods matched to your prefrontal endurance</p>
                      <div className="flex gap-1.5 mt-2">
                        <Badge variant="secondary" className="text-xs bg-indigo-50 text-indigo-700">Productivity</Badge>
                        <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700">Focus</Badge>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => {
                        setCurrentSprint({
                          name: "Evening Wind Down & Sleep Reset",
                          description: "Circadian rhythm stabilization protocol to lower cortisol and induce restorative delta sleep",
                          progress: 0,
                          daysCompleted: 1,
                          totalDays: 14,
                          activities: [
                            { id: 'ew1', text: 'No screens 60m before bed', completed: false },
                            { id: 'ew2', text: 'Magnesium L-threonate + warm tea', completed: false },
                            { id: 'ew3', text: '5-minute brain dump journal', completed: false },
                          ]
                        });
                        toast({ title: "Sprint Loaded", description: "Evening Wind Down sprint is now active." });
                      }}
                      className="p-3.5 border rounded-lg hover:bg-indigo-50/50 cursor-pointer transition-colors border-slate-200"
                    >
                      <h3 className="font-semibold text-slate-800">Evening Wind Down</h3>
                      <p className="text-xs text-slate-600 mt-1">Lower sympathetic arousal to eliminate delayed sleep phase syndrome</p>
                      <div className="flex gap-1.5 mt-2">
                        <Badge variant="secondary" className="text-xs bg-cyan-50 text-cyan-700">Sleep</Badge>
                        <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-700">Recovery</Badge>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => {
                        setCurrentSprint({
                          name: "Transition Passport Filing",
                          description: "Complete healthcare handoff milestones between CAMHS, GP, and Adult Psychiatric Services",
                          progress: 30,
                          daysCompleted: 3,
                          totalDays: 14,
                          activities: [
                            { id: 'tp1', text: 'Confirm GP Shared Care Agreement is signed', completed: true },
                            { id: 'tp2', text: 'Request 60-day repeat prescription buffer', completed: false },
                            { id: 'tp3', text: 'Submit university DSA accommodation form', completed: false },
                          ]
                        });
                        toast({ title: "Sprint Loaded", description: "Transition Passport Filing is now active." });
                      }}
                      className="p-3.5 border rounded-lg hover:bg-indigo-50/50 cursor-pointer transition-colors border-slate-200"
                    >
                      <h3 className="font-semibold text-slate-800">Transition Passport Filing</h3>
                      <p className="text-xs text-slate-600 mt-1">Safeguard stimulant prescription continuity when transferring to university/adult care</p>
                      <div className="flex gap-1.5 mt-2">
                        <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-700">NICE NG87</Badge>
                        <Badge variant="secondary" className="text-xs bg-rose-50 text-rose-700">Continuity</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 text-emerald-600" size={20} />
                    Completed Sprint History
                  </CardTitle>
                  <CardDescription>
                    Your neuroplasticity streak and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3.5 border rounded-lg bg-slate-50/60 border-slate-200">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-800">Medication Optimization</h3>
                        <Badge className="bg-emerald-100 text-emerald-800 border-0">Completed</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">14-Day Protocol • Completed Oct 2026</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 text-xs">
                        <span className="text-slate-600">Adherence Score</span>
                        <span className="font-bold text-emerald-600">92%</span>
                      </div>
                    </div>
                    
                    <div className="p-3.5 border rounded-lg bg-slate-50/60 border-slate-200">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-800">Time Blindness Mitigation</h3>
                        <Badge className="bg-emerald-100 text-emerald-800 border-0">Completed</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">14-Day Protocol • Completed Sep 2026</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 text-xs">
                        <span className="text-slate-600">Time Buffer Accuracy</span>
                        <span className="font-bold text-emerald-600">84%</span>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg bg-indigo-50/40 border-indigo-100 text-center">
                      <Flame className="mx-auto text-amber-500 mb-1" size={24} />
                      <p className="text-xs font-semibold text-slate-800">Total Consistency Record</p>
                      <p className="text-2xl font-black text-indigo-600">28 Days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="mr-2 text-indigo-600" size={20} />
                    Peer-Reviewed Foundations
                  </CardTitle>
                  <CardDescription>
                    Direct verified clinical and academic references
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a
                      href="https://www.hubermanlab.com/episode/adhd-and-how-to-improve-focus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group border-slate-200"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-sm group-hover:text-indigo-600 transition-colors">Huberman Lab: ADHD Protocols</h3>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Photoperiod timing, dopamine baseline dynamics, and ultradian work cadences.</p>
                    </a>
                    
                    <a
                      href="https://drhallowell.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group border-slate-200"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-sm group-hover:text-indigo-600 transition-colors">Dr. Hallowell: VAST & Strengths</h3>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Variable Attention Stimulus Trait and the 5-step Cycle of Excellence model.</p>
                    </a>
                    
                    <a
                      href="https://www.nice.org.uk/guidance/ng87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group border-slate-200"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-sm group-hover:text-indigo-600 transition-colors">NICE NG87: Transition Standards</h3>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <p className="text-xs text-slate-600 mt-1">UK National clinical guideline for continuous young adult ADHD care pathway.</p>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* TAB 2: DAILY ROUTINES (WIRED & INTERACTIVE) */}
          <TabsContent value="routines" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="text-indigo-600" size={20} />
                    ADHD Circadian Routine Architecture
                  </CardTitle>
                  <CardDescription>
                    Low-friction sequential anchor habits calibrated to prefrontal dopamine cycles
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Today's Progress</span>
                    <p className="font-bold text-indigo-600">{routinePct}% ({completedRoutines}/{routines.length})</p>
                  </div>
                  <Dialog open={routineDialogOpen} onOpenChange={setRoutineDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5">
                        <Plus size={16} />
                        Add Habit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <form onSubmit={handleAddRoutine}>
                        <DialogHeader>
                          <DialogTitle>Add Daily Routine Habit</DialogTitle>
                          <DialogDescription>
                            Create a specific, friction-free micro-habit.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Habit Description</label>
                            <Input 
                              placeholder="e.g. 5-min RSA box breathing reset"
                              value={newRoutineTitle}
                              onChange={(e) => setNewRoutineTitle(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Time Window</label>
                            <select 
                              className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                              value={newRoutineCategory}
                              onChange={(e) => setNewRoutineCategory(e.target.value as any)}
                            >
                              <option value="morning">Morning Anchor (07:00 - 10:00)</option>
                              <option value="afternoon">Afternoon Focus (12:00 - 16:00)</option>
                              <option value="evening">Evening Shutdown (17:00 - 20:00)</option>
                              <option value="bedtime">Night Sleep Hygiene (21:00 - 23:00)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Estimated Duration</label>
                            <Input 
                              placeholder="e.g. 5 min"
                              value={newRoutineDuration}
                              onChange={(e) => setNewRoutineDuration(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setRoutineDialogOpen(false)}>Cancel</Button>
                          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Habit</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {(['morning', 'afternoon', 'evening', 'bedtime'] as const).map(cat => {
                  const items = routines.filter(r => r.category === cat);
                  const titles = {
                    morning: 'Morning Anchor Protocol (07:00 – 10:00)',
                    afternoon: 'Afternoon Sustained Focus & Movement (12:00 – 16:00)',
                    evening: 'Evening Digital Shutdown & Unwind (17:00 – 20:00)',
                    bedtime: 'Night Sleep Preparation & Delta Recovery (21:00 – 23:00)'
                  };
                  return (
                    <div key={cat} className="border border-slate-100 rounded-xl p-4 bg-slate-50/40">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-slate-800 text-sm capitalize flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                          {titles[cat]}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">
                          {items.filter(i => i.completed).length} / {items.length} Done
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        {items.map(item => (
                          <div 
                            key={item.id}
                            onClick={() => toggleRoutine(item.id)}
                            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                              item.completed 
                                ? 'bg-emerald-50/60 border-emerald-200 opacity-80' 
                                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-0.5 rounded-full ${item.completed ? 'text-emerald-600' : 'text-slate-300'}`}>
                                <CheckCircle size={19} />
                              </div>
                              <div>
                                <p className={`text-sm font-medium ${item.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                                  {item.title}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">{item.scientificReason}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs text-slate-600 shrink-0 ml-2">
                              {item.duration}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* TAB 3: SCIENTIFIC PROTOCOLS */}
          <TabsContent value="protocols" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Protocol 1: Huberman */}
              <Card className="border-indigo-100 shadow-sm flex flex-col justify-between">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Neuroscience</Badge>
                    <span className="text-xs text-slate-500">Stanford SOM</span>
                  </div>
                  <CardTitle className="text-lg mt-2">Huberman Dopamine Anchor</CardTitle>
                  <CardDescription className="text-xs">
                    Optimizes baseline vs. peak dopamine kinetics to prevent post-stimulant crash.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { id: 'huberman-1', title: '10–15m Morning Outdoor Light', desc: 'Resets central circadian master clock (SCN) via melanopsin pathways' },
                    { id: 'huberman-2', title: 'Delay Caffeine by 90 Minutes', desc: 'Allows natural clearance of adenosine to prevent the 2:00 PM slump' },
                    { id: 'huberman-3', title: '90-Minute Ultradian Focus Cycle', desc: 'Limit intense cognitive effort to natural 90m prefrontal windows' },
                    { id: 'huberman-4', title: '10m Non-Sleep Deep Rest (NSDR)', desc: 'Restores striatal dopamine pools and reduces autonomic tension' }
                  ].map(step => (
                    <div 
                      key={step.id}
                      onClick={() => toggleProtocol(step.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        protocolChecks[step.id] ? 'bg-indigo-50/70 border-indigo-200' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle size={16} className={protocolChecks[step.id] ? 'text-indigo-600' : 'text-slate-300'} />
                        <span className="text-xs font-semibold text-slate-800">{step.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-6">{step.desc}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full text-xs"
                    onClick={() => toast({ title: "Protocol Timer Ready", description: "90-minute focus session initialized with 5-minute warm-up." })}
                  >
                    Start 90m Focus Session
                  </Button>
                </CardFooter>
              </Card>

              {/* Protocol 2: Hallowell */}
              <Card className="border-indigo-100 shadow-sm flex flex-col justify-between">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">Psychology</Badge>
                    <span className="text-xs text-slate-500">Harvard Medical</span>
                  </div>
                  <CardTitle className="text-lg mt-2">Hallowell Strengths Cycle</CardTitle>
                  <CardDescription className="text-xs">
                    Transforms ADHD from a deficit pathology into a superpower through connection.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { id: 'hallowell-1', title: '1. Human Connection', desc: 'Engage with a supportive peer, mentor, or teletherapy specialist' },
                    { id: 'hallowell-2', title: '2. Low-Stakes Play', desc: 'Unconstrained brainstorming and prototype building without grading fear' },
                    { id: 'hallowell-3', title: '3. Repetitive Deliberate Practice', desc: 'Apply hyperfocus to one specific craft or clinical competency' },
                    { id: 'hallowell-4', title: '4. Mastery & Recognition', desc: 'Validate small wins to satisfy the neurological dopamine reward circuit' }
                  ].map(step => (
                    <div 
                      key={step.id}
                      onClick={() => toggleProtocol(step.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        protocolChecks[step.id] ? 'bg-purple-50/70 border-purple-200' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle size={16} className={protocolChecks[step.id] ? 'text-purple-600' : 'text-slate-300'} />
                        <span className="text-xs font-semibold text-slate-800">{step.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-6">{step.desc}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full text-xs"
                    onClick={() => toast({ title: "Mastery Anchor Set", description: "Your daily strength win has been recorded in your profile." })}
                  >
                    Log Daily Strength Win
                  </Button>
                </CardFooter>
              </Card>

              {/* Protocol 3: NICE NG87 */}
              <Card className="border-indigo-100 shadow-sm flex flex-col justify-between">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Clinical Guideline</Badge>
                    <span className="text-xs text-slate-500">NHS UK Standard</span>
                  </div>
                  <CardTitle className="text-lg mt-2">NICE NG87 Continuity Protocol</CardTitle>
                  <CardDescription className="text-xs">
                    Mandatory clinical standards for young adult transition from CAMHS to Adult ADHD.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { id: 'nice-1', title: '1. Diagnostic Record Dossier', desc: 'Consolidate baseline DSM-5 / ICD-11 neuropsychological reports' },
                    { id: 'nice-2', title: '2. Formal Handover Meeting', desc: 'Coordinated meeting between pediatrician and adult psychiatrist' },
                    { id: 'nice-3', title: '3. Signed GP Shared Care', desc: 'Secures ongoing prescription funding without adult waitlist drop-off' },
                    { id: 'nice-4', title: '4. Annual Cardiovascular Audit', desc: 'Monitor blood pressure, resting pulse, and ECG parameters' }
                  ].map(step => (
                    <div 
                      key={step.id}
                      onClick={() => toggleProtocol(step.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        protocolChecks[step.id] ? 'bg-emerald-50/70 border-emerald-200' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle size={16} className={protocolChecks[step.id] ? 'text-emerald-600' : 'text-slate-300'} />
                        <span className="text-xs font-semibold text-slate-800">{step.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-6">{step.desc}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full text-xs"
                    onClick={() => toast({ title: "Clinical Passport Updated", description: "Audit criteria synced with clinical transition page." })}
                  >
                    Sync with Medical Passport
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* TAB 4: ADHD STRENGTHS PROFILE */}
          <TabsContent value="strengths" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Award className="text-amber-500" size={22} />
                      ADHD Neurodivergent Superpowers Matrix
                    </CardTitle>
                    <CardDescription>
                      Empirical evidence shows ADHD brains excel dramatically in non-linear environments. Calibrate your traits below.
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => toast({ title: "Strengths Dossier Exported", description: "Downloaded strengths matrix summary for DSA/workplace adjustments." })}
                  >
                    Export Strengths Summary
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Interactive Sliders */}
                  <div className="space-y-5 bg-slate-50/70 p-5 rounded-xl border border-slate-100">
                    <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                      <Sliders size={16} className="text-indigo-600" />
                      Self-Calibrated Trait Intensity
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700">Hyperfocus & Deep Absorption</span>
                        <span className="text-indigo-600 font-bold">{strengths.hyperfocus}/10</span>
                      </div>
                      <Slider 
                        value={[strengths.hyperfocus]} 
                        onValueChange={(val) => setStrengths(s => ({ ...s, hyperfocus: val[0] }))}
                        min={1} max={10} step={1}
                      />
                      <p className="text-[11px] text-slate-500">Exceptional ability to immerse in intrinsically motivating, high-complexity tasks.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700">Divergent & Lateral Problem-Solving</span>
                        <span className="text-indigo-600 font-bold">{strengths.divergentThinking}/10</span>
                      </div>
                      <Slider 
                        value={[strengths.divergentThinking]} 
                        onValueChange={(val) => setStrengths(s => ({ ...s, divergentThinking: val[0] }))}
                        min={1} max={10} step={1}
                      />
                      <p className="text-[11px] text-slate-500">Uncanny capability to spot connections across distant domains that linear thinkers miss.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700">Crisis Resilience & High-Arousal Composure</span>
                        <span className="text-indigo-600 font-bold">{strengths.crisisComposure}/10</span>
                      </div>
                      <Slider 
                        value={[strengths.crisisComposure]} 
                        onValueChange={(val) => setStrengths(s => ({ ...s, crisisComposure: val[0] }))}
                        min={1} max={10} step={1}
                      />
                      <p className="text-[11px] text-slate-500">Under high pressure, under-aroused ADHD baseline reaches optimal Yerkes-Dodson arousal.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700">Spontaneous Drive & Rapid Iteration</span>
                        <span className="text-indigo-600 font-bold">{strengths.spontaneity}/10</span>
                      </div>
                      <Slider 
                        value={[strengths.spontaneity]} 
                        onValueChange={(val) => setStrengths(s => ({ ...s, spontaneity: val[0] }))}
                        min={1} max={10} step={1}
                      />
                      <p className="text-[11px] text-slate-500">Bias toward immediate execution and building functional prototypes quickly.</p>
                    </div>
                  </div>

                  {/* Right Column: Tailored Career & Study Strategies */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-500" />
                      Optimized Environments & Adaptations
                    </h3>

                    <div className="p-4 border border-indigo-100 rounded-xl bg-indigo-50/30">
                      <h4 className="font-semibold text-sm text-indigo-900">Career & University Task Matching</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Thrives in: Software architecture, emergency medicine, venture building, creative direction, investigative research.
                      </p>
                      <p className="text-xs text-slate-500 mt-2 italic">
                        Caution: High risk of executive burnout in repetitive bureaucratic data entry without immediate feedback loops.
                      </p>
                    </div>

                    <div className="p-4 border border-emerald-100 rounded-xl bg-emerald-50/30">
                      <h4 className="font-semibold text-sm text-emerald-900">Recommended Daily Accommodations</h4>
                      <ul className="text-xs text-slate-600 mt-2 space-y-1.5 list-disc pl-4">
                        <li>Asynchronous communication over continuous Slack/Teams pings</li>
                        <li>Deliverable-based deadlines rather than 9-to-5 seat warming</li>
                        <li>Noise-cancelling audio environments with 40Hz binaural beats</li>
                        <li>Body doubling (virtual or in-person study partners)</li>
                      </ul>
                    </div>

                    <div className="p-4 border border-amber-100 rounded-xl bg-amber-50/30 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm text-amber-900">Need Guidance on Your Strengths?</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Discuss accommodations with a certified ADHD specialist.</p>
                      </div>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white shrink-0 ml-3" asChild>
                        <a href="/expert">Talk to Expert</a>
                      </Button>
                    </div>
                  </div>
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
