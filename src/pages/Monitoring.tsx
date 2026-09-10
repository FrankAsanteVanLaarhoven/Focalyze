import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, BarChart, BarChart2, Brain, Calendar, Clock, Info, Moon, PieChart, Smartphone, Sparkles, TrendingUp } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchFocusScores, recordFocusScore } from '@/store/slices/monitoringSlice';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';
import { format, subDays, parse } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const Monitoring = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { focusScores, isLoading, error } = useAppSelector(state => state.monitoring);
  
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);
  const [newScore, setNewScore] = useState(7);
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [noiseLevel, setNoiseLevel] = useState('');
  const [sleepQuality, setSleepQuality] = useState(7);
  const [medication, setMedication] = useState(true);
  
  const [focusInsights, setFocusInsights] = useState([
    {
      id: '1',
      type: 'Pattern',
      title: 'Morning Peak',
      description: 'Your focus scores are consistently higher between 9-11 AM. Consider scheduling important tasks during this window.'
    },
    {
      id: '2',
      type: 'Recommendation',
      title: 'Exercise Correlation',
      description: 'Days with 30+ minutes of exercise show a 24% higher average focus score.'
    },
    {
      id: '3',
      type: 'Alert',
      title: 'Medication Timing',
      description: 'Focus scores drop significantly 4-5 hours after medication. Consider discussing timing with your provider.'
    }
  ]);
  
  useEffect(() => {
    dispatch(fetchFocusScores());
  }, [dispatch]);
  
  const handleRecordFocusScore = async () => {
    const focusScoreData = {
      score: newScore,
      notes,
      environmentalFactors: {
        location,
        noise: noiseLevel,
        sleepQuality,
        medication
      }
    };
    
    await dispatch(recordFocusScore(focusScoreData));
    
    setIsRecordDialogOpen(false);
    setNotes('');
    
    toast({
      title: "Focus score recorded",
      description: "Your focus score has been saved successfully.",
    });
  };
  
  const formatFocusScoresForChart = () => {
    if (!focusScores || focusScores.length === 0) {
      return Array.from({ length: 7 }, (_, i) => ({
        date: format(subDays(new Date(), 6 - i), 'MMM dd'),
        score: Math.floor(Math.random() * 4) + 6
      }));
    }
    
    const sortedScores = [...focusScores]
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(-7);
    
    return sortedScores.map(score => ({
      date: format(new Date(score.timestamp), 'MMM dd'),
      score: score.score
    }));
  };
  
  const formatScoresByTimeOfDay = () => {
    if (!focusScores || focusScores.length === 0) {
      return [
        { name: 'Morning', average: 7.8 },
        { name: 'Afternoon', average: 6.5 },
        { name: 'Evening', average: 5.9 }
      ];
    }
    
    const morning = [];
    const afternoon = [];
    const evening = [];
    
    focusScores.forEach(score => {
      const hour = new Date(score.timestamp).getHours();
      
      if (hour >= 5 && hour < 12) {
        morning.push(score);
      } else if (hour >= 12 && hour < 18) {
        afternoon.push(score);
      } else {
        evening.push(score);
      }
    });
    
    const calculateAverage = (scores) => {
      if (scores.length === 0) return 0;
      return scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
    };
    
    return [
      { name: 'Morning', average: Number(calculateAverage(morning).toFixed(1)) || 7.8 },
      { name: 'Afternoon', average: Number(calculateAverage(afternoon).toFixed(1)) || 6.5 },
      { name: 'Evening', average: Number(calculateAverage(evening).toFixed(1)) || 5.9 }
    ];
  };
  
  const appUsageData = [
    { name: 'Social Media', value: 35 },
    { name: 'Productivity', value: 25 },
    { name: 'Entertainment', value: 20 },
    { name: 'Communication', value: 15 },
    { name: 'Other', value: 5 },
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-adhd-dark">
              AI-Powered Monitoring
            </h1>
            <p className="text-gray-600 mt-1">
              Track and analyze your focus, activity, and behavior patterns
            </p>
          </div>
          <Button 
            className="bg-adhd-primary hover:bg-adhd-secondary"
            onClick={() => setIsRecordDialogOpen(true)}
          >
            Record New Data
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-500">Focus Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">7.2/10</div>
                <div className="text-green-500 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+0.8 pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-500">Sleep Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">68%</div>
                <div className="text-amber-500 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">-5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-500">Activity Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">Medium</div>
                <div className="text-blue-500 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">Today</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-500">Screen Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">5.2 hrs</div>
                <div className="text-green-500 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">-0.5 hrs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="focus" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="focus">Focus Analysis</TabsTrigger>
            <TabsTrigger value="sleep">Sleep Patterns</TabsTrigger>
            <TabsTrigger value="activity">Activity Tracking</TabsTrigger>
            <TabsTrigger value="screen">Screen Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="focus" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2" size={20} />
                    Focus Patterns
                  </CardTitle>
                  <CardDescription>
                    Your focus patterns over the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={formatFocusScoresForChart()}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                          name="Focus Score"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="h-64 mt-6">
                    <CardTitle className="text-base mb-4">Focus Score by Time of Day</CardTitle>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={formatScoresByTimeOfDay()}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" fill="#82ca9d" name="Average Focus Score" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>
                    Patterns detected in your focus data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {focusInsights.map(insight => (
                      <div key={insight.id} className={`p-3 border rounded-md ${
                        insight.type === 'Pattern' ? 'border-blue-200 bg-blue-50' :
                        insight.type === 'Recommendation' ? 'border-green-200 bg-green-50' :
                        'border-amber-200 bg-amber-50'
                      }`}>
                        <h3 className={`font-medium mb-1 flex items-center ${
                          insight.type === 'Pattern' ? 'text-blue-700' :
                          insight.type === 'Recommendation' ? 'text-green-700' :
                          'text-amber-700'
                        }`}>
                          {insight.type === 'Pattern' ? <Info size={16} className="mr-2" /> :
                           insight.type === 'Recommendation' ? <Sparkles size={16} className="mr-2" /> :
                           <AlertTriangle size={16} className="mr-2" />}
                          {insight.title}
                        </h3>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    ))}
                    
                    <div className="p-3 border border-dashed rounded-md border-gray-300">
                      <h3 className="text-gray-600 font-medium mb-1 flex items-center">
                        <Sparkles size={16} className="mr-2" />
                        Enhanced AI Insights
                      </h3>
                      <p className="text-sm text-gray-500">The more data you record, the more personalized insights you'll receive.</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={() => setIsRecordDialogOpen(true)}
                      >
                        Record New Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sleep" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Moon className="mr-2" size={20} />
                    Sleep Patterns
                  </CardTitle>
                  <CardDescription>
                    Your sleep quality and duration over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={Array.from({ length: 7 }, (_, i) => ({
                          date: format(subDays(new Date(), 6 - i), 'MMM dd'),
                          duration: Math.floor(Math.random() * 3) + 6,
                          quality: Math.floor(Math.random() * 30) + 60
                        }))}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="duration" 
                          stroke="#8884d8" 
                          name="Hours"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="quality" 
                          stroke="#82ca9d" 
                          name="Quality %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sleep Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Average Duration</span>
                        <span className="text-sm">6.8 hrs</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Target: 8-9 hrs</span>
                        <span>Current: 6.8 hrs</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Sleep Quality</span>
                        <span className="text-sm">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Consistent Schedule</span>
                        <span className="text-sm">54%</span>
                      </div>
                      <Progress value={54} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Recommendations</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-start">
                          <span className="text-adhd-primary mr-2">•</span>
                          <span>Aim for a consistent bedtime (10:30 PM suggested)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-adhd-primary mr-2">•</span>
                          <span>Reduce screen time 1 hour before bed</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-adhd-primary mr-2">•</span>
                          <span>Consider discussing sleep issues with your provider</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2" size={20} />
                  Activity Patterns
                </CardTitle>
                <CardDescription>
                  Physical activity tracking and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={Array.from({ length: 7 }, (_, i) => ({
                        day: format(subDays(new Date(), 6 - i), 'EEE'),
                        light: Math.floor(Math.random() * 40) + 20,
                        moderate: Math.floor(Math.random() * 30) + 10,
                        intense: Math.floor(Math.random() * 20)
                      }))}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="light" stackId="a" fill="#82ca9d" name="Light Activity" />
                      <Bar dataKey="moderate" stackId="a" fill="#8884d8" name="Moderate Activity" />
                      <Bar dataKey="intense" stackId="a" fill="#ff8042" name="Intense Activity" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-medium">Activity Insights</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="font-medium text-green-800 mb-2">Focus Correlation</h4>
                      <p className="text-sm text-gray-700">Days with at least 30 minutes of moderate activity show 22% higher focus scores on average.</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2">Sleep Impact</h4>
                      <p className="text-sm text-gray-700">Moderate exercise before 7pm appears to improve your sleep quality by approximately 15%.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="screen" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2" size={20} />
                  Screen Time Analysis
                </CardTitle>
                <CardDescription>
                  Tracking your digital device usage patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Daily Usage</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={Array.from({ length: 7 }, (_, i) => ({
                            date: format(subDays(new Date(), 6 - i), 'MMM dd'),
                            hours: (Math.random() * 3 + 4).toFixed(1)
                          }))}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 10]} label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="hours" stroke="#8884d8" name="Screen Time" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">App Usage Distribution</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Tooltip />
                          <Legend />
                          <Pie
                            data={appUsageData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">AI Recommendations</h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <h4 className="font-medium text-amber-800 mb-2">Potential Focus Impact</h4>
                      <p className="text-sm text-gray-700">Your focus scores tend to be lower on days with over 6 hours of screen time. Consider implementing screen breaks.</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2">Evening Usage</h4>
                      <p className="text-sm text-gray-700">Screen usage after 9pm correlates with lower sleep quality. Try enabling night mode or reducing evening screen time.</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="font-medium text-green-800 mb-2">Productivity Tools</h4>
                      <p className="text-sm text-gray-700">Consider using focus mode and screen time management apps to help maintain productivity.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Record New Focus Score</DialogTitle>
            <DialogDescription>
              Rate your current focus level and provide contextual information to improve AI insights.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="focus-score">Focus Score (1-10)</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">1</span>
                <Input
                  id="focus-score"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={newScore}
                  onChange={(e) => setNewScore(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">10</span>
                <span className="ml-2 w-8 text-center font-bold">{newScore}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="What factors might be affecting your focus today?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="School">School</SelectItem>
                    <SelectItem value="Café">Café</SelectItem>
                    <SelectItem value="Library">Library</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="noise-level">Noise Level</Label>
                <Select value={noiseLevel} onValueChange={setNoiseLevel}>
                  <SelectTrigger id="noise-level">
                    <SelectValue placeholder="Select noise level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sleep-quality">Sleep Quality (1-10)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="sleep-quality"
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="ml-2 w-8 text-center font-bold">{sleepQuality}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medication">Medication Today?</Label>
                <Select 
                  value={medication ? "yes" : "no"} 
                  onValueChange={(value) => setMedication(value === "yes")}
                >
                  <SelectTrigger id="medication">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRecordDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRecordFocusScore}>Save Focus Score</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Monitoring;
