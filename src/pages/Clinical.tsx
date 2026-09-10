import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertCircle, CheckCircle, FileText, Stethoscope, Users, 
  Activity, ShieldAlert, ArrowRight, Clock, Plus, Phone, 
  Mail, Calendar, ExternalLink, Sparkles, CheckSquare, Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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

interface ClinicalAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  actionRequired: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

const initialAlerts: ClinicalAlert[] = [
  {
    id: 'alt-1',
    severity: 'warning',
    title: 'Resting Pulse Elevation (>98 bpm) Detected',
    description: 'Autonomous Biofeedback module recorded elevated resting heart rate post-stimulant morning dose.',
    timestamp: 'Today, 10:45 AM',
    actionRequired: 'Verify hydration, delay caffeine, check blood pressure before evening dose.',
    status: 'active'
  },
  {
    id: 'alt-2',
    severity: 'critical',
    title: 'GP Shared Care Protocol Renewal in 24 Days',
    description: 'NHS secondary care guidance requires annual shared care confirmation from Adult Psychiatrist.',
    timestamp: 'Yesterday, 02:30 PM',
    actionRequired: 'Submit transition health passport to Dr. Alistair Vance for signature.',
    status: 'active'
  },
  {
    id: 'alt-3',
    severity: 'info',
    title: 'Sleep Latency Extension (+42 mins)',
    description: 'Delayed sleep onset noticed on days with afternoon booster administration after 3:30 PM.',
    timestamp: '3 days ago',
    actionRequired: 'Shift afternoon booster 90 minutes earlier (before 2:00 PM).',
    status: 'acknowledged'
  }
];

const clinicalPhases = [
  {
    phase: 1,
    title: "Pediatric Baseline & DSM-5 Evaluation",
    status: "Completed",
    period: "Age 14–16",
    clinician: "Dr. Sarah Jenkins (CAMHS)",
    summary: "Comprehensive neuropsychological profiling, DIVA 5.0 diagnostic interview, and cardiac baseline clearance established.",
    keyMilestones: [
      "DSM-5 Inattentive/Hyperactive clinical criteria mapped",
      "Baseline 12-lead ECG confirmed normal QT interval",
      "Titration to stable lisdexamfetamine 50mg"
    ]
  },
  {
    phase: 2,
    title: "Transition Readiness & Psychoeducation",
    status: "Completed",
    period: "Age 16–17",
    clinician: "CAMHS Transition Nurse Lead",
    summary: "Medication autonomy training, prescription refill responsibility, and educational disability accommodations filed.",
    keyMilestones: [
      "Patient assumes responsibility for daily dosing schedule",
      "Disabled Students Allowance (DSA) evidence dossier formulated",
      "Executive functioning coaching initiated"
    ]
  },
  {
    phase: 3,
    title: "Joint Transfer & Shared Care Ratification",
    status: "Active (Current Phase)",
    period: "Age 17.5–18",
    clinician: "Dr. Sarah Jenkins & Dr. Alistair Vance",
    summary: "Three-way clinical handover conference to ratify GP Shared Care Protocol under NICE NG87 standards.",
    keyMilestones: [
      "Medical Passport exported to adult mental health trust",
      "GP Shared Care Agreement signed by primary care physician",
      "First adult service clinic appointment booked"
    ]
  },
  {
    phase: 4,
    title: "Adult ADHD Intake & University Consolidation",
    status: "Scheduled",
    period: "Age 18–19",
    clinician: "Dr. Alistair Vance (Adult ADHD Lead)",
    summary: "First independent adult psychiatric review, university exam accommodation audit, and annual vitals monitoring.",
    keyMilestones: [
      "Independent intake interview at adult service",
      "Annual blood pressure, weight, and pulse audit",
      "Adjustment of study workload strategies"
    ]
  }
];

const Clinical = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<ClinicalAlert[]>(initialAlerts);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [assessmentDialogOpen, setAssessmentDialogOpen] = useState(false);

  // New report form state
  const [symptomTitle, setSymptomTitle] = useState('');
  const [symptomDesc, setSymptomDesc] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState<'critical' | 'warning' | 'info'>('warning');

  // Interactive assessment form state (mini ASRS 6-item)
  const [asrsScore, setAsrsScore] = useState(16);
  const [asrsAnswers, setAsrsAnswers] = useState<Record<number, number>>({
    0: 3, 1: 2, 2: 3, 3: 3, 4: 2, 5: 3
  });

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'acknowledged' } : a));
    toast({
      title: "Alert Acknowledged",
      description: "Clinical alert marked as acknowledged in your electronic health log.",
    });
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Alert Resolved",
      description: "Item archived to clinical history.",
    });
  };

  const handleReportSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomTitle.trim()) return;

    const newAlert: ClinicalAlert = {
      id: `alt-${Date.now()}`,
      severity: symptomSeverity,
      title: symptomTitle,
      description: symptomDesc || "Patient reported symptom via self-management bridge.",
      timestamp: 'Just now',
      actionRequired: 'Review by on-call clinical team within 24–48 hours.',
      status: 'active'
    };

    setAlerts(prev => [newAlert, ...prev]);
    setReportDialogOpen(false);
    setSymptomTitle('');
    setSymptomDesc('');

    toast({
      title: "Clinical Report Dispatched",
      description: "Your care team has been notified of the adverse symptom report.",
    });
  };

  const handleSaveAssessment = () => {
    const total = Object.values(asrsAnswers).reduce((a, b) => a + b, 0);
    setAsrsScore(total);
    setAssessmentDialogOpen(false);
    toast({
      title: "Assessment Recorded",
      description: `New ASRS-v1.1 score of ${total}/24 logged to your clinical profile.`,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Clinical Decision Support & Pathways
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">GMC / NICE Compliant</Badge>
            </h1>
            <p className="text-slate-600 mt-1">
              Evidence-based psychiatric assessments, real-time safety red flags, and transition care pathways
            </p>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50 gap-2">
                  <ShieldAlert size={16} />
                  Report Adverse Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[460px]">
                <form onSubmit={handleReportSymptom}>
                  <DialogHeader>
                    <DialogTitle>Report Adverse Symptom or Concern</DialogTitle>
                    <DialogDescription>
                      Dispatches an automated flag to your clinical care coordinator and updates your red flag feed.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Symptom / Event Summary</label>
                      <Input 
                        placeholder="e.g. Palpitations, sudden insomnia, mood drop"
                        value={symptomTitle}
                        onChange={(e) => setSymptomTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Severity Level</label>
                      <select 
                        className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                        value={symptomSeverity}
                        onChange={(e) => setSymptomSeverity(e.target.value as any)}
                      >
                        <option value="critical">Critical (Immediate Clinician Triage)</option>
                        <option value="warning">Warning (Requires Review / Dose Check)</option>
                        <option value="info">Informational (Self-Monitored Pattern)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Clinical Details / Context</label>
                      <Textarea 
                        placeholder="Detail the time of occurrence, recent dosage, and any co-occurring stressors..."
                        value={symptomDesc}
                        onChange={(e) => setSymptomDesc(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setReportDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white">Transmit Report</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2" asChild>
              <a href="/expert">
                <Users size={16} />
                Connect with Clinician
              </a>
            </Button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <Tabs defaultValue="assessments" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="assessments" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Psychiatric Assessments</TabsTrigger>
            <TabsTrigger value="pathway" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Clinical Pathway</TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-white data-[state=active]:shadow-xs flex items-center gap-1.5">
              Red Flag Alerts
              {alerts.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Care Team</TabsTrigger>
          </TabsList>
          
          {/* TAB 1: ASSESSMENTS */}
          <TabsContent value="assessments" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-slate-200 shadow-xs">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center text-lg font-bold text-slate-900">
                          <FileText className="mr-2 text-indigo-600" size={20} />
                          Recent Standardized Assessments
                        </CardTitle>
                        <CardDescription>
                          Validated clinical rating scales tracking symptom trajectories and functional outcomes
                        </CardDescription>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800 border-0">Updated This Month</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-xl bg-slate-50/60 border-slate-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900">ASRS-v1.1 (Adult ADHD Self-Report Scale)</h3>
                            <Badge variant="outline" className="text-[10px] bg-indigo-50 text-indigo-700">Screening</Badge>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">WHO Standardized 6-Question Screener • Completed Today</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-indigo-600">{asrsScore}/24</div>
                          <div className="text-xs text-emerald-600 font-semibold">-4 pts vs 3-month baseline</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-xl bg-slate-50/60 border-slate-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900">WFIRS (Weiss Functional Impairment Scale)</h3>
                            <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-700">Functional</Badge>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Life Domains Assessment • Completed 2 weeks ago</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-amber-600">0.7 / 3.0</div>
                          <div className="text-xs text-amber-600 font-medium">Mild executive impact</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-xl bg-slate-50/60 border-slate-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900">PHQ-9 (Patient Health Questionnaire)</h3>
                            <Badge variant="outline" className="text-[10px] bg-cyan-50 text-cyan-700">Affective</Badge>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Depression Screening • Completed 3 weeks ago</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-slate-700">5 / 27</div>
                          <div className="text-xs text-emerald-600 font-medium">Minimal depressive symptoms</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Dialog open={assessmentDialogOpen} onOpenChange={setAssessmentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          Complete New ASRS Assessment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>ASRS-v1.1 ADHD Self-Report Screener</DialogTitle>
                          <DialogDescription>
                            World Health Organization (WHO) 6-question screener for adult ADHD attention and hyperactivity.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-3 max-h-[60vh] overflow-y-auto pr-1">
                          {[
                            "1. How often do you have trouble wrapping up final details of a project?",
                            "2. How often do you have difficulty getting things in order when you have to do a task?",
                            "3. How often do you have problems remembering appointments or obligations?",
                            "4. When you have a task that requires a lot of thought, how often do you avoid or delay?",
                            "5. How often do you fidget or squirm with your hands or feet when you sit for long periods?",
                            "6. How often do you feel overly active and compelled to do things as if driven by a motor?"
                          ].map((q, idx) => (
                            <div key={idx} className="p-3 border rounded-lg bg-slate-50 text-xs space-y-2">
                              <p className="font-semibold text-slate-800">{q}</p>
                              <div className="flex justify-between gap-1">
                                {['Never (0)', 'Rarely (1)', 'Sometimes (2)', 'Often (3)', 'Very Often (4)'].map((opt, val) => (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAsrsAnswers(prev => ({ ...prev, [idx]: val }))}
                                    className={`px-2 py-1 text-[10px] rounded border transition-all ${
                                      asrsAnswers[idx] === val 
                                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold' 
                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                    }`}
                                  >
                                    {val}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setAssessmentDialogOpen(false)}>Cancel</Button>
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSaveAssessment}>
                            Submit & Calculate Score
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="outline"
                      onClick={() => toast({ title: "Clinical History Dossier", description: "Exporting longitudinal 12-month psychometric trends." })}
                    >
                      Export Longitudinal History
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-slate-200 shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="text-amber-500" size={18} />
                      Algorithmic Clinical Observations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="p-3.5 border rounded-xl bg-emerald-50/70 border-emerald-200">
                      <h4 className="font-semibold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle size={15} className="text-emerald-700" />
                        Sustained Treatment Response (+28%)
                      </h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Cross-referencing your ASRS ratings with Biofeedback HRV data demonstrates stable therapeutic benefit with minimal autonomic side-effects on current lisdexamfetamine 50mg regimen.
                      </p>
                    </div>

                    <div className="p-3.5 border rounded-xl bg-indigo-50/70 border-indigo-200">
                      <h4 className="font-semibold text-indigo-900 flex items-center gap-1.5">
                        <Activity size={15} className="text-indigo-700" />
                        Cardiovascular Stability
                      </h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Resting blood pressure averages 118/76 mmHg over the past 30 days, adhering to NICE NG87 cardiovascular safety thresholds for central nervous system stimulants.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="border-slate-200 shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-slate-900">Assessment Battery</CardTitle>
                    <CardDescription className="text-xs">
                      Tools deployed throughout transition care
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {[
                      { name: 'ASRS-v1.1', desc: 'WHO Adult ADHD Screener', badge: 'Active Screener' },
                      { name: 'DIVA 5.0', desc: 'Diagnostic Interview for ADHD in Adults', badge: 'Clinical Gold Standard' },
                      { name: 'WFIRS', desc: 'Weiss Functional Impairment Rating Scale', badge: 'Functional Life Review' },
                      { name: 'GAD-7', desc: 'General Anxiety Disorder Screener', badge: 'Co-morbidity Check' },
                      { name: 'PHQ-9', desc: 'Patient Health Questionnaire Depression', badge: 'Affective Check' }
                    ].map(tool => (
                      <div key={tool.name} className="p-2.5 border rounded-lg hover:bg-slate-50 transition-colors border-slate-200 text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-slate-800">{tool.name}</span>
                          <span className="text-[10px] text-indigo-600 font-medium bg-indigo-50 px-1.5 py-0.5 rounded">{tool.badge}</span>
                        </div>
                        <p className="text-slate-500 mt-0.5 text-[11px]">{tool.desc}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card className="border-slate-200 shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Calendar size={17} className="text-indigo-600" />
                      Next Review Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="flex justify-between items-center p-2.5 border-b border-slate-100">
                      <div>
                        <p className="font-semibold text-slate-800">ASRS-v1.1 Monthly Log</p>
                        <p className="text-[11px] text-slate-500">Every 30 days</p>
                      </div>
                      <Badge variant="outline" className="text-emerald-700 bg-emerald-50 text-[10px]">Up to Date</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2.5 border-b border-slate-100">
                      <div>
                        <p className="font-semibold text-slate-800">Cardiovascular Vitals Audit</p>
                        <p className="text-[11px] text-slate-500">Bi-weekly ECG/HRV sync</p>
                      </div>
                      <span className="text-indigo-600 font-semibold text-[11px]">Due in 4 days</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5">
                      <div>
                        <p className="font-semibold text-slate-800">Adult Consultant Review</p>
                        <p className="text-[11px] text-slate-500">Joint Handover Clinic</p>
                      </div>
                      <span className="text-indigo-600 font-semibold text-[11px]">In 21 days</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* TAB 2: CLINICAL CARE PATHWAY (WIRED & COMPLETE) */}
          <TabsContent value="pathway" className="mt-6 space-y-6">
            <Card className="border-slate-200 shadow-xs">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Stethoscope className="text-indigo-600" size={22} />
                      ADHD Longitudinal Clinical Pathway (NICE NG87)
                    </CardTitle>
                    <CardDescription>
                      End-to-end clinical timeline from pediatric diagnosis to autonomous adult care continuity
                    </CardDescription>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Phase 3 Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 border-indigo-200 ml-4 pl-6 space-y-8 py-2">
                  {clinicalPhases.map((phase) => {
                    const isDone = phase.status === "Completed";
                    const isActive = phase.status.includes("Active");
                    return (
                      <div key={phase.phase} className="relative">
                        {/* Dot indicator on vertical line */}
                        <div className={`absolute -left-[31px] top-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${
                          isDone 
                            ? 'bg-emerald-600 text-white' 
                            : isActive 
                              ? 'bg-indigo-600 text-white animate-pulse' 
                              : 'bg-slate-300 text-slate-600'
                        }`}>
                          {phase.phase}
                        </div>

                        <div className={`p-4 rounded-xl border transition-all ${
                          isActive 
                            ? 'bg-indigo-50/50 border-indigo-200 shadow-xs' 
                            : isDone 
                              ? 'bg-white border-slate-200' 
                              : 'bg-slate-50/50 border-slate-200 opacity-75'
                        }`}>
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                            <div>
                              <h3 className="font-bold text-base text-slate-900">{phase.title}</h3>
                              <p className="text-xs text-indigo-600 font-medium">{phase.clinician} • {phase.period}</p>
                            </div>
                            <Badge className={
                              isDone 
                                ? 'bg-emerald-100 text-emerald-800 border-0 self-start sm:self-auto' 
                                : isActive 
                                  ? 'bg-indigo-600 text-white self-start sm:self-auto' 
                                  : 'bg-slate-100 text-slate-600 border-0 self-start sm:self-auto'
                            }>
                              {phase.status}
                            </Badge>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed mb-3">{phase.summary}</p>

                          <div className="border-t border-slate-200/70 pt-2.5 space-y-1.5">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Clinical Criteria:</span>
                            {phase.keyMilestones.map((km, ki) => (
                              <div key={ki} className="flex items-center gap-2 text-xs text-slate-700">
                                <CheckCircle size={14} className={isDone || isActive ? "text-emerald-600 shrink-0" : "text-slate-300 shrink-0"} />
                                <span>{km}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* TAB 3: RED FLAG SYSTEM (WIRED & INTERACTIVE) */}
          <TabsContent value="alerts" className="mt-6 space-y-6">
            <Card className="border-slate-200 shadow-xs">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <AlertCircle className="text-rose-600" size={22} />
                      Clinical Safety & Red Flag Surveillance
                    </CardTitle>
                    <CardDescription>
                      Automated risk surveillance monitoring heart rate thresholds, prescription continuity, and adverse symptoms
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-rose-600 hover:bg-rose-700 text-white gap-1.5"
                    onClick={() => setReportDialogOpen(true)}
                  >
                    <ShieldAlert size={15} />
                    Report New Incident
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {alerts.length > 0 ? (
                  <div className="space-y-3">
                    {alerts.map(alert => (
                      <div 
                        key={alert.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row justify-between md:items-center gap-4 ${
                          alert.severity === 'critical'
                            ? 'bg-rose-50/70 border-rose-200'
                            : alert.severity === 'warning'
                              ? 'bg-amber-50/70 border-amber-200'
                              : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                            alert.severity === 'critical' 
                              ? 'bg-rose-100 text-rose-700' 
                              : alert.severity === 'warning' 
                                ? 'bg-amber-100 text-amber-700' 
                                : 'bg-slate-200 text-slate-700'
                          }`}>
                            <AlertCircle size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                              <Badge className={`text-[10px] uppercase font-bold border-0 ${
                                alert.severity === 'critical' ? 'bg-rose-600 text-white' : alert.severity === 'warning' ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white'
                              }`}>
                                {alert.severity}
                              </Badge>
                              <span className="text-[11px] text-slate-400">• {alert.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.description}</p>
                            <div className="mt-2 text-xs font-medium text-slate-800 bg-white/70 p-2 rounded-lg border border-slate-200/50">
                              <strong className="text-indigo-600">Recommended Action:</strong> {alert.actionRequired}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          {alert.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs h-8 bg-white hover:bg-slate-100"
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                            >
                              Acknowledge
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            className="text-xs h-8 bg-slate-900 hover:bg-slate-800 text-white"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Mark Resolved
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center border border-dashed rounded-xl text-slate-500">
                    <CheckCircle className="mx-auto text-emerald-600 mb-2" size={32} />
                    <p className="font-semibold text-slate-800">All Clinical Red Flags Clear</p>
                    <p className="text-xs text-slate-500 mt-1">No outstanding safety alerts or vital signs anomalies detected.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* TAB 4: CARE TEAM (WIRED) */}
          <TabsContent value="team" className="mt-6 space-y-6">
            <Card className="border-slate-200 shadow-xs">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Users className="text-indigo-600" size={22} />
                      Connected Clinical Multidisciplinary Team (MDT)
                    </CardTitle>
                    <CardDescription>
                      Accredited NHS psychiatrists, GPs, and specialized neurodevelopmental clinicians
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
                    asChild
                  >
                    <a href="/expert">Book 1:1 Teletherapy Session</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Dr. Sarah Jenkins, MD, FRCPsych",
                      role: "CAMHS Consultant Psychiatrist (Pediatric Transfer Lead)",
                      trust: "Middlesex Child & Adolescent Mental Health Services",
                      gmc: "GMC #4829104",
                      email: "s.jenkins@nhs.net",
                      phone: "+44 20 7946 0912",
                      status: "Active Handover Lead"
                    },
                    {
                      name: "Dr. Alistair Vance, BM BCh, MRCPsych",
                      role: "Adult Neurodevelopmental & ADHD Consultant",
                      trust: "Central London Adult Mental Health Trust",
                      gmc: "GMC #6104822",
                      email: "a.vance@nhs.net",
                      phone: "+44 20 7946 0855",
                      status: "Receiving Specialist"
                    },
                    {
                      name: "Dr. Rebecca Patel, MBBS, MRCGP",
                      role: "General Practitioner / Primary Care Shared Care Lead",
                      trust: "St. Jude Primary Health Centre",
                      gmc: "GMC #7209144",
                      email: "r.patel@stjude-gp.nhs.uk",
                      phone: "+44 20 7946 0321",
                      status: "Shared Care Signatory"
                    },
                    {
                      name: "Marcus Sterling, MSc, HCPC",
                      role: "Senior ADHD Occupational Therapist & Executive Coach",
                      trust: "Focalyze Specialized Neurotech Network",
                      gmc: "HCPC #OT38921",
                      email: "m.sterling@focalyze.org",
                      phone: "+44 20 7946 0774",
                      status: "Weekly Executive Coach"
                    }
                  ].map(clinician => (
                    <div key={clinician.name} className="p-4 border rounded-xl bg-white border-slate-200 shadow-2xs space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{clinician.name}</h4>
                          <p className="text-xs text-indigo-600 font-medium mt-0.5">{clinician.role}</p>
                          <p className="text-xs text-slate-500">{clinician.trust}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] text-indigo-700 bg-indigo-50 border-indigo-200">
                          {clinician.gmc}
                        </Badge>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <div className="space-y-1">
                          <p className="flex items-center gap-1.5"><Mail size={13} className="text-slate-400" /> {clinician.email}</p>
                          <p className="flex items-center gap-1.5"><Phone size={13} className="text-slate-400" /> {clinician.phone}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs h-8"
                          onClick={() => toast({ title: "Connecting Clinician", description: `Opening secure teletherapy bridge to ${clinician.name}.` })}
                          asChild
                        >
                          <a href="/expert">Consult</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Clinical;
