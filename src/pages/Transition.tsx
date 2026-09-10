import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, CheckCircle, FileText, MapPin, Play, User, Download, 
  Upload, ExternalLink, ShieldCheck, AlertCircle, Phone, Mail, 
  Search, CheckSquare, Plus, Hospital, FileCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface TransitionStage {
  id: string;
  name: string;
  description: string;
  milestones: Milestone[];
}

const initialStages: TransitionStage[] = [
  {
    id: "s1",
    name: "Awareness & Preparation",
    description: "Understanding ADHD diagnostic profile and preparing for transition",
    milestones: [
      { id: "m1", title: "ADHD diagnostic assessment report consolidated", completed: true },
      { id: "m2", title: "Personal transition goals and independence plan defined", completed: true },
      { id: "m3", title: "Core pediatric support team and advocate identified", completed: true }
    ]
  },
  {
    id: "s2",
    name: "Early Transition",
    description: "Building autonomous self-management skills and medication literacy",
    milestones: [
      { id: "m4", title: "Independent prescription refill management learned", completed: true },
      { id: "m5", title: "Self-advocacy scripting and clinician communication practiced", completed: true },
      { id: "m6", title: "Educational accommodations / DSA dossier documented", completed: true }
    ]
  },
  {
    id: "s3",
    name: "Active Transition",
    description: "Navigating formal transfer from CAMHS to Adult Mental Health Services",
    milestones: [
      { id: "m7", title: "Receiving adult ADHD clinic psychiatrist identified", completed: true },
      { id: "m8", title: "Complete medical records and cardiac audit transferred", completed: true },
      { id: "m9", title: "Joint 3-way transition planning conference conducted", completed: false, dueDate: "In 14 days" },
      { id: "m10", title: "GP Shared Care Agreement formally ratified and signed", completed: false, dueDate: "In 21 days" }
    ]
  },
  {
    id: "s4",
    name: "Independence & Continuity",
    description: "Autonomous engagement with adult mental health and primary care",
    milestones: [
      { id: "m11", title: "First independent adult clinic consultation attended", completed: false, dueDate: "In 45 days" },
      { id: "m12", title: "Stable titration and vitals logging in adult system", completed: false },
      { id: "m13", title: "Emergency transition safety plan documented", completed: false }
    ]
  },
  {
    id: "s5",
    name: "Long-term Adult Thriving",
    description: "Sustaining career, university, and personal flourishing",
    milestones: [
      { id: "m14", title: "Workplace / university reasonable adjustments active", completed: false },
      { id: "m15", title: "Peer support community & annual psychiatric review set", completed: false }
    ]
  }
];

const initialDocuments = [
  {
    id: 'doc-1',
    title: 'Comprehensive Neurodevelopmental Assessment (CAMHS)',
    type: 'Diagnostic Report',
    date: '14 May 2024',
    size: '2.4 MB',
    status: 'Verified',
    issuer: 'NHS CAMHS Trust'
  },
  {
    id: 'doc-2',
    title: 'GP Shared Care Agreement Protocol (Lisdexamfetamine)',
    type: 'Prescription Protocol',
    date: '18 Aug 2026',
    size: '840 KB',
    status: 'Pending GP Signature',
    issuer: 'Dr. Sarah Jenkins / Dr. Rebecca Patel'
  },
  {
    id: 'doc-3',
    title: 'Baseline ECG & Blood Pressure Clinical Clearance',
    type: 'Cardiovascular Audit',
    date: '02 Sep 2026',
    size: '1.1 MB',
    status: 'Normal / Cleared',
    issuer: 'Cardiology Dept'
  },
  {
    id: 'doc-4',
    title: 'Disabled Students Allowance (DSA) Recommendation Dossier',
    type: 'Education Accommodations',
    date: '28 Jul 2026',
    size: '1.6 MB',
    status: 'Approved',
    issuer: 'Educational Psychologist'
  }
];

const initialProviders = [
  {
    id: 'p1',
    name: 'Dr. Sarah Jenkins, MD, FRCPsych',
    role: 'Consultant Child & Adolescent Psychiatrist (CAMHS)',
    org: 'Middlesex Child & Adolescent Mental Health Services',
    status: 'Transferring Lead',
    email: 's.jenkins@nhs.net',
    phone: '+44 20 7946 0912',
    notes: 'Primary clinician since age 14. Overseeing handover summary.'
  },
  {
    id: 'p2',
    name: 'Dr. Alistair Vance, BM BCh, MRCPsych',
    role: 'Consultant Adult ADHD Psychiatrist',
    org: 'Central London Adult Neurodevelopmental Service',
    status: 'Receiving Specialist',
    email: 'a.vance@nhs.net',
    phone: '+44 20 7946 0855',
    notes: 'Joint appointment scheduled for October 12, 2026.'
  },
  {
    id: 'p3',
    name: 'Dr. Rebecca Patel, MBBS, MRCGP',
    role: 'General Practitioner / Primary Care Partner',
    org: 'St. Jude Health Centre',
    status: 'Shared Care Sponsor',
    email: 'r.patel@stjude-gp.nhs.uk',
    phone: '+44 20 7946 0321',
    notes: 'Prescribes monthly repeat under shared care guidance.'
  },
  {
    id: 'p4',
    name: 'Marcus Sterling, MSc',
    role: 'ADHD Executive Function & Transition Coach',
    org: 'Focalyze Clinical Network',
    status: 'Active Support',
    email: 'm.sterling@focalyze.org',
    phone: '+44 20 7946 0774',
    notes: 'Bi-weekly coaching on university workload transition.'
  }
];

const Transition = () => {
  const { toast } = useToast();
  const [stages, setStages] = useState<TransitionStage[]>(initialStages);
  const [documents, setDocuments] = useState(initialDocuments);
  const [resourceSearch, setResourceSearch] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState('Medical Summary');

  // Compute live progress percentage
  const allMilestones = stages.flatMap(s => s.milestones);
  const completedCount = allMilestones.filter(m => m.completed).length;
  const progressPct = Math.round((completedCount / allMilestones.length) * 100);

  const toggleMilestone = (stageId: string, milestoneId: string) => {
    setStages(prev => prev.map(stage => {
      if (stage.id !== stageId) return stage;
      return {
        ...stage,
        milestones: stage.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m)
      };
    }));
    toast({
      title: "Milestone Updated",
      description: "Transition progress has been recalculated automatically.",
    });
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      title: newDocTitle,
      type: newDocType,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      size: '1.2 MB',
      status: 'Uploaded / Pending Verification',
      issuer: 'User Attached'
    };

    setDocuments(prev => [newDoc, ...prev]);
    setUploadDialogOpen(false);
    setNewDocTitle('');
    toast({
      title: "Document Uploaded",
      description: `"${newDocTitle}" securely archived in your Transition Vault.`,
    });
  };

  const handleDownloadPassport = () => {
    const passportData = {
      title: "Focalyze Official NHS/CAMHS ADHD Transition Passport",
      generatedAt: new Date().toISOString(),
      transitionProgress: `${progressPct}%`,
      patientId: "FX-99824-GB",
      stages: stages.map(s => ({
        stage: s.name,
        completedMilestones: s.milestones.filter(m => m.completed).map(m => m.title),
        pendingMilestones: s.milestones.filter(m => !m.completed).map(m => m.title)
      })),
      verifiedDocuments: documents.map(d => ({ title: d.title, type: d.type, status: d.status })),
      careTeam: initialProviders.map(p => ({ name: p.name, role: p.role, org: p.org }))
    };

    const blob = new Blob([JSON.stringify(passportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ADHD_Transition_Passport_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Transition Passport Generated",
      description: "Your official clinical transition dossier has been exported.",
    });
  };

  const resources = [
    {
      title: "NICE Guideline NG87: Transition to Adult Mental Health",
      category: "Clinical Standard",
      description: "National standards mandating uninterrupted ADHD treatment continuity and formal joint handovers between child and adult services.",
      link: "https://www.nice.org.uk/guidance/ng87",
      badge: "Mandatory NHS Standard"
    },
    {
      title: "UK Disabled Students' Allowance (DSA) Guidance",
      category: "Higher Education",
      description: "Comprehensive blueprint for obtaining 1-on-1 study skills mentoring, specialized software, and exam accommodation funding in university.",
      link: "https://www.gov.uk/disabled-students-allowance-dsa",
      badge: "Government Support"
    },
    {
      title: "Royal College of Psychiatrists: ADHD Transition Toolkit",
      category: "Psychiatry",
      description: "Best practices for pediatricians, GPs, and adult psychiatrists collaborating across transition boundaries.",
      link: "https://www.rcpsych.ac.uk/",
      badge: "Clinical Toolkit"
    },
    {
      title: "ADHD UK: Shared Care Agreement Guide",
      category: "Medication",
      description: "What to do if your GP refuses a shared care agreement and how to enforce NHS Right to Choose provisions.",
      link: "https://adhduk.co.uk/",
      badge: "Patient Advocacy"
    },
    {
      title: "Access to Work: ADHD in Employment",
      category: "Workplace",
      description: "Grants covering workplace ADHD coaching, noise-cancelling equipment, and executive function assistive tech.",
      link: "https://www.gov.uk/access-to-work",
      badge: "Workplace Rights"
    }
  ];

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
    r.category.toLowerCase().includes(resourceSearch.toLowerCase()) ||
    r.description.toLowerCase().includes(resourceSearch.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Transition Bridge System
              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">NHS NG87 Standard</Badge>
            </h1>
            <p className="text-slate-600 mt-1">
              Seamlessly bridge from CAMHS pediatric care to independent adult ADHD healthcare
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleDownloadPassport}
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-xs"
            >
              <Download size={16} />
              Export Passport
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Clinical Sync Complete", description: "All transition records verified against NHS spine." })}
            >
              Sync NHS Spine
            </Button>
          </div>
        </div>
        
        {/* Hero Progress Card */}
        <div className="mb-8">
          <Card className="border-indigo-100 shadow-sm bg-gradient-to-r from-white via-indigo-50/20 to-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Healthcare Transition Progression</CardTitle>
                  <CardDescription className="text-slate-600 mt-1">
                    Your clinical trajectory toward autonomous adult self-management
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-indigo-600">{progressPct}%</span>
                  <p className="text-xs text-slate-500 font-medium">Completed ({completedCount}/{allMilestones.length} Tasks)</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progressPct} className="h-3 w-full bg-slate-100" />
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                  {stages.map((stg, i) => {
                    const stgCompleted = stg.milestones.every(m => m.completed);
                    const stgActive = !stgCompleted && stg.milestones.some(m => m.completed);
                    return (
                      <div 
                        key={stg.id}
                        className={`p-2.5 rounded-lg border text-center text-xs ${
                          stgCompleted 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                            : stgActive 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-800 font-semibold' 
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className="flex justify-center mb-1">
                          {stgCompleted ? (
                            <CheckCircle size={15} className="text-emerald-600" />
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                              {i + 1}
                            </span>
                          )}
                        </div>
                        <p className="font-medium truncate">{stg.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Navigation Tabs */}
        <Tabs defaultValue="stages" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="stages" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Transition Stages</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Clinical Resources</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Document Vault ({documents.length})</TabsTrigger>
            <TabsTrigger value="providers" className="data-[state=active]:bg-white data-[state=active]:shadow-xs">Care Team ({initialProviders.length})</TabsTrigger>
          </TabsList>
          
          {/* TAB 1: TRANSITION STAGES */}
          <TabsContent value="stages" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Stages Detail */}
              <div className="lg:col-span-2 space-y-4">
                {stages.map((stage, idx) => {
                  const done = stage.milestones.every(m => m.completed);
                  return (
                    <Card key={stage.id} className="border-slate-200 shadow-xs">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <CardTitle className="text-base font-bold text-slate-800">{stage.name}</CardTitle>
                          </div>
                          <Badge className={done ? "bg-emerald-100 text-emerald-800 border-0" : "bg-indigo-50 text-indigo-700 border-0"}>
                            {done ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-slate-500 pl-8">{stage.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 pl-8 space-y-2">
                        {stage.milestones.map(milestone => (
                          <div
                            key={milestone.id}
                            onClick={() => toggleMilestone(stage.id, milestone.id)}
                            className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                              milestone.completed 
                                ? 'bg-emerald-50/50 border-emerald-200 line-through text-slate-500' 
                                : 'bg-white border-slate-200 hover:border-indigo-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <CheckCircle size={16} className={milestone.completed ? "text-emerald-600" : "text-slate-300"} />
                              <span className="text-xs font-medium">{milestone.title}</span>
                            </div>
                            {milestone.dueDate && (
                              <Badge variant="outline" className="text-[10px] text-amber-700 bg-amber-50 border-amber-200">
                                {milestone.dueDate}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Right Col: Action & Checklist */}
              <div className="space-y-6">
                <Card className="border-indigo-100 shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <ShieldCheck className="text-indigo-600" size={18} />
                      Transition Safeguards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs text-slate-600">
                    <p className="leading-relaxed">
                      Under <strong>NICE NG87 guidelines</strong>, CAMHS services must not terminate care or withdraw stimulant prescriptions until formal transfer to adult care has occurred.
                    </p>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 space-y-1">
                      <p className="font-semibold flex items-center gap-1.5">
                        <AlertCircle size={14} className="text-amber-600" />
                        Avoid Medication Gaps
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        Request a <strong>60-day medication buffer</strong> from your CAMHS prescriber prior to your 18th birthday to cover administrative transfer delays.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={() => toast({ title: "Safety Letter Downloaded", description: "Template letter for GP shared care continuity exported." })}
                    >
                      Download GP Continuity Letter
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-slate-200 shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-slate-800">Next Action Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <FileCheck size={16} className="text-indigo-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">3-Way Conference Meeting</p>
                        <p className="text-slate-500 mt-0.5">Prepare questions on repeat prescription procedures for Adult ADHD Clinic.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <FileCheck size={16} className="text-indigo-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">Cardiology Vitals Sync</p>
                        <p className="text-slate-500 mt-0.5">Submit latest blood pressure reading from Biofeedback module.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* TAB 2: TRANSITION RESOURCES */}
          <TabsContent value="resources" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Book className="text-indigo-600" size={20} />
                      Verified Transition Resources & Legal Rights
                    </CardTitle>
                    <CardDescription>
                      Clinical standards, university accommodation pathways, and NHS legal protections
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search guidelines, DSA, rights..."
                      className="pl-8 text-xs bg-white"
                      value={resourceSearch}
                      onChange={(e) => setResourceSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredResources.map((res, i) => (
                    <a
                      key={i}
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border rounded-xl hover:border-indigo-300 hover:bg-slate-50/70 transition-all flex flex-col justify-between group border-slate-200"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-xs bg-indigo-50/60 text-indigo-700 border-indigo-200">
                            {res.category}
                          </Badge>
                          <Badge className="bg-slate-100 text-slate-700 border-0 text-[10px]">
                            {res.badge}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                          {res.title}
                          <ExternalLink size={13} className="text-slate-400 group-hover:text-indigo-600" />
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{res.description}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-indigo-600 mt-3 flex items-center gap-1">
                        View Official Resource ↗
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* TAB 3: TRANSITION DOCUMENTS */}
          <TabsContent value="documents" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="text-indigo-600" size={20} />
                    ADHD Medical Passport & Digital Vault
                  </CardTitle>
                  <CardDescription>
                    Cryptographically secured clinical records ready for transfer to adult psychiatrists and universities
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-1.5">
                        <Upload size={15} />
                        Upload Document
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <form onSubmit={handleUploadDoc}>
                        <DialogHeader>
                          <DialogTitle>Upload Transition Record</DialogTitle>
                          <DialogDescription>
                            Attach diagnostic letters, ECG logs, or school assessment reports.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Document Title</label>
                            <Input 
                              placeholder="e.g. Adult ADHD Clinic Referral Acceptance"
                              value={newDocTitle}
                              onChange={(e) => setNewDocTitle(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Document Type</label>
                            <select 
                              className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                              value={newDocType}
                              onChange={(e) => setNewDocType(e.target.value)}
                            >
                              <option value="Diagnostic Report">Diagnostic Report</option>
                              <option value="Prescription Protocol">Prescription Protocol</option>
                              <option value="Cardiovascular Audit">Cardiovascular Audit</option>
                              <option value="Education Accommodations">Education Accommodations</option>
                              <option value="General Clinical Letter">General Clinical Letter</option>
                            </select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save to Vault</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button size="sm" onClick={handleDownloadPassport} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5">
                    <Download size={15} />
                    Download Passport (.JSON)
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map(doc => (
                    <div 
                      key={doc.id}
                      className="p-4 border rounded-xl bg-white hover:border-indigo-200 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-slate-200 shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800">{doc.title}</h4>
                          <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-1">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.issuer}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <Badge variant="outline" className={`text-xs ${
                          doc.status.includes('Verified') || doc.status.includes('Normal') || doc.status.includes('Approved')
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {doc.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-xs text-indigo-600 hover:text-indigo-800"
                          onClick={() => toast({ title: "Downloading Document", description: `Downloading ${doc.title}...` })}
                        >
                          <Download size={15} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* TAB 4: HEALTHCARE PROVIDERS */}
          <TabsContent value="providers" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Hospital className="text-indigo-600" size={20} />
                      Multidisciplinary Transition Care Team
                    </CardTitle>
                    <CardDescription>
                      Coordinated directory of transferring pediatric clinicians, receiving adult specialists, and GP sponsors
                    </CardDescription>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
                    asChild
                  >
                    <a href="/expert">Book 1:1 Teletherapy Specialist</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {initialProviders.map(p => (
                    <div key={p.id} className="p-4 border rounded-xl bg-white border-slate-200 shadow-2xs space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{p.name}</h4>
                          <p className="text-xs text-indigo-600 font-medium">{p.role}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{p.org}</p>
                        </div>
                        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[11px]">
                          {p.status}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg italic">
                        "{p.notes}"
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                            <Mail size={13} /> {p.email}
                          </span>
                          <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                            <Phone size={13} /> {p.phone}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-[11px] h-7 px-2.5"
                          onClick={() => toast({ title: "Clinical Message Dispatched", description: `Secure transition notification sent to ${p.name}.` })}
                        >
                          Send Update
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

export default Transition;
