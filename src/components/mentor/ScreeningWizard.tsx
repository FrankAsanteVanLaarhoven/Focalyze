
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

// ─── Screening Data ───────────────────────────────────────────────────────────

const TOOLS = {
  adhd: {
    id: 'adhd',
    label: 'ADHD Screener',
    color: 'bg-blue-100 text-blue-800',
    description: 'Based on DSM-5 inattentive & hyperactive-impulsive criteria (10 items)',
    options: ['Never', 'Sometimes', 'Often', 'Very Often'],
    questions: [
      'Fails to give close attention to details or makes careless mistakes',
      'Has difficulty sustaining attention in tasks or play activities',
      'Does not seem to listen when spoken to directly',
      'Does not follow through on instructions and fails to finish tasks',
      'Has difficulty organising tasks and activities',
      'Avoids or is reluctant to engage in tasks that require sustained mental effort',
      'Loses things necessary for tasks or activities',
      'Is easily distracted by external stimuli',
      'Is forgetful in daily activities',
      'Fidgets, squirms, or leaves seat when remaining seated is expected',
    ],
    interpret: (score: number) => {
      if (score <= 10) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50 border-green-200', message: 'Few ADHD indicators observed in this screening.' };
      if (score <= 20) return { level: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', message: 'Some ADHD indicators present. Consider discussing with a specialist.' };
      return { level: 'High', color: 'text-red-600', bg: 'bg-red-50 border-red-200', message: 'Multiple ADHD indicators observed. Professional evaluation is recommended.' };
    },
    maxScore: 30,
  },
  autism: {
    id: 'autism',
    label: 'Autism Screener',
    color: 'bg-purple-100 text-purple-800',
    description: 'Based on AQ-10 criteria — suitable for ages 12+ (10 items)',
    options: ['Definitely Disagree', 'Slightly Disagree', 'Slightly Agree', 'Definitely Agree'],
    questions: [
      'Finds it difficult to work out people\'s intentions',
      'Finds it hard to make new friends',
      'Notices patterns in things all the time',
      'Has very strong interests which cause distress if unable to pursue',
      'Does not easily "read between the lines" in conversation',
      'Finds it hard to imagine what it would be like to be someone else',
      'Prefers doing things the same way over and over again',
      'Finds social situations difficult or exhausting',
      'Tends to notice details that others do not',
      'Finds it difficult to work out what someone is feeling just by looking at their face',
    ],
    interpret: (score: number) => {
      if (score <= 6) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50 border-green-200', message: 'Few autism indicators observed in this screening.' };
      if (score <= 15) return { level: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', message: 'Some autism indicators present. A specialist conversation may be helpful.' };
      return { level: 'High', color: 'text-red-600', bg: 'bg-red-50 border-red-200', message: 'Multiple autism indicators observed. Referral to a specialist is recommended.' };
    },
    maxScore: 30,
  },
  ptsd: {
    id: 'ptsd',
    label: 'PTSD Screener',
    color: 'bg-teal-100 text-teal-800',
    description: 'Based on PCL-5 short form — for teens and adults (6 items)',
    options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
    questions: [
      'Repeated, disturbing, and unwanted memories of a stressful experience',
      'Feeling very upset when something reminded them of a stressful experience',
      'Avoiding memories, thoughts, or feelings related to a stressful experience',
      'Feeling distant or cut off from other people',
      'Difficulty experiencing positive feelings (e.g. happiness, love)',
      'Feeling jumpy or easily startled; being "on guard"',
    ],
    interpret: (score: number) => {
      if (score <= 8) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50 border-green-200', message: 'Few PTSD indicators observed in this screening.' };
      if (score <= 15) return { level: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', message: 'Some PTSD indicators present. Trauma-informed support may be beneficial.' };
      return { level: 'High', color: 'text-red-600', bg: 'bg-red-50 border-red-200', message: 'Multiple PTSD indicators observed. Trauma specialist referral is strongly recommended.' };
    },
    maxScore: 20,
  },
};

type ToolKey = keyof typeof TOOLS;

interface ScreeningResult {
  id: string;
  tool: ToolKey;
  clientName: string;
  date: string;
  score: number;
  maxScore: number;
  answers: number[];
}

// ─── Component ────────────────────────────────────────────────────────────────

const ScreeningWizard: React.FC = () => {
  const [stage, setStage] = useState<'select' | 'name' | 'questions' | 'result'>('select');
  const [selectedTool, setSelectedTool] = useState<ToolKey | null>(null);
  const [clientName, setClientName] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [savedResults, setSavedResults] = useState<ScreeningResult[]>(() => {
    try { return JSON.parse(localStorage.getItem('focalyze_screening') || '[]'); }
    catch { return []; }
  });

  const tool = selectedTool ? TOOLS[selectedTool] : null;
  const score = answers.reduce((a, b) => a + b, 0);
  const interpretation = tool ? tool.interpret(score) : null;

  const saveResult = () => {
    if (!tool || !selectedTool) return;
    const result: ScreeningResult = {
      id: crypto.randomUUID(),
      tool: selectedTool,
      clientName,
      date: new Date().toISOString(),
      score,
      maxScore: tool.maxScore,
      answers,
    };
    const updated = [result, ...savedResults];
    setSavedResults(updated);
    localStorage.setItem('focalyze_screening', JSON.stringify(updated));
  };

  const reset = () => {
    setStage('select');
    setSelectedTool(null);
    setClientName('');
    setCurrentQ(0);
    setAnswers([]);
  };

  const answerQuestion = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (tool && currentQ + 1 >= tool.questions.length) {
      saveResult();
      setStage('result');
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  // ── Select Tool ──
  if (stage === 'select') return (
    <div className="space-y-4">
      <p className="text-gray-600">Choose a screening tool to begin.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.values(TOOLS)).map(t => (
          <button
            key={t.id}
            onClick={() => { setSelectedTool(t.id as ToolKey); setStage('name'); }}
            className="text-left p-5 rounded-xl border-2 border-gray-100 hover:border-adhd-primary hover:bg-adhd-light/30 transition-all"
          >
            <Badge className={`${t.color} mb-3`}>{t.label}</Badge>
            <p className="text-sm text-gray-600">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Client Name ──
  if (stage === 'name') return (
    <div className="max-w-md space-y-4">
      <p className="text-gray-600">Who is this screening for? (use initials or a code — no full names needed)</p>
      <input
        className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-adhd-primary"
        placeholder="e.g. Client A, J.S., Session 3"
        value={clientName}
        onChange={e => setClientName(e.target.value)}
      />
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStage('select')}><ChevronLeft size={16} className="mr-1" /> Back</Button>
        <Button
          className="bg-adhd-primary hover:bg-adhd-secondary"
          disabled={!clientName.trim()}
          onClick={() => setStage('questions')}
        >
          Start Screening <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );

  // ── Questions ──
  if (stage === 'questions' && tool) {
    const progress = (currentQ / tool.questions.length) * 100;
    return (
      <div className="max-w-2xl space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{tool.label} — {clientName}</span>
          <span>Question {currentQ + 1} of {tool.questions.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <Card className="border-2">
          <CardContent className="pt-8 pb-6">
            <p className="text-lg font-medium text-adhd-dark mb-8">
              {tool.questions[currentQ]}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tool.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answerQuestion(i)}
                  className="py-3 px-2 rounded-xl border-2 border-gray-200 hover:border-adhd-primary hover:bg-adhd-light/50 text-sm font-medium transition-all text-center"
                >
                  {opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Button variant="ghost" onClick={reset} className="text-gray-500">
          <RotateCcw size={14} className="mr-1" /> Restart
        </Button>
      </div>
    );
  }

  // ── Result ──
  if (stage === 'result' && tool && interpretation) {
    const pct = Math.round((score / tool.maxScore) * 100);
    return (
      <div className="max-w-2xl space-y-6">
        <Card className={`border-2 ${interpretation.bg}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{tool.label} — Result</CardTitle>
              <Badge className={`${tool.color} text-base px-4 py-1`}>{interpretation.level} Indicators</Badge>
            </div>
            <CardDescription className="text-base">{clientName} · {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Score</span>
                <span className={`font-bold ${interpretation.color}`}>{score} / {tool.maxScore}</span>
              </div>
              <Progress value={pct} className="h-3" />
            </div>
            <p className={`font-medium ${interpretation.color}`}>{interpretation.message}</p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> This screening tool is for discussion purposes only and does not constitute a medical diagnosis. Results should be reviewed with a qualified clinician, psychologist, or psychiatrist.
          </p>
        </div>

        <div className="flex gap-3">
          <Button className="bg-adhd-primary hover:bg-adhd-secondary" onClick={reset}>
            <CheckCircle size={16} className="mr-2" /> New Screening
          </Button>
          <Button variant="outline" onClick={() => window.print()}>Print Report</Button>
        </div>
      </div>
    );
  }

  return null;
};

export default ScreeningWizard;
