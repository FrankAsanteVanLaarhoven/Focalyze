
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronRight } from 'lucide-react';

const STEPS = [
  { count: 5, sense: 'See',   colour: '#7C3AED', emoji: '👁️', prompt: 'Look around — name 5 things you can see right now.' },
  { count: 4, sense: 'Hear',  colour: '#2563EB', emoji: '👂', prompt: 'Listen carefully — name 4 sounds you can hear right now.' },
  { count: 3, sense: 'Touch', colour: '#059669', emoji: '✋', prompt: 'Feel the surfaces around you — name 3 things you can physically touch.' },
  { count: 2, sense: 'Smell', colour: '#D97706', emoji: '👃', prompt: 'Take a slow breath — name 2 things you can smell.' },
  { count: 1, sense: 'Taste', colour: '#DC2626', emoji: '👅', prompt: 'Notice your mouth — name 1 thing you can taste right now.' },
];

const GroundingExercise: React.FC = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<string[][]>(STEPS.map(s => Array(s.count).fill('')));
  const [done, setDone] = useState(false);

  const step = STEPS[stepIdx];
  const stepAnswers = answers[stepIdx];
  const allFilled = stepAnswers.every(a => a.trim() !== '');

  const updateAnswer = (i: number, val: string) => {
    setAnswers(prev => {
      const copy = prev.map(s => [...s]);
      copy[stepIdx][i] = val;
      return copy;
    });
  };

  const next = () => {
    if (stepIdx + 1 >= STEPS.length) {
      setDone(true);
      const history = JSON.parse(localStorage.getItem('focalyze_grounding') || '[]');
      localStorage.setItem('focalyze_grounding', JSON.stringify([new Date().toISOString(), ...history].slice(0, 50)));
    } else {
      setStepIdx(s => s + 1);
    }
  };

  const restart = () => {
    setStepIdx(0);
    setAnswers(STEPS.map(s => Array(s.count).fill('')));
    setDone(false);
  };

  if (done) return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle className="text-green-500" size={40} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-adhd-dark">Well done.</h3>
        <p className="text-gray-600 mt-2 max-w-sm">
          You've completed the 5-4-3-2-1 grounding exercise. Take a moment to notice how you feel now compared to when you started.
        </p>
      </div>
      <p className="text-lg italic text-gray-500">"You are here. You are safe. You are present."</p>
      <Button className="bg-adhd-primary hover:bg-adhd-secondary" onClick={restart}>Do it again</Button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto space-y-6 py-4">
      {/* Progress dots */}
      <div className="flex gap-2 justify-center">
        {STEPS.map((s, i) => (
          <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all"
            style={{ borderColor: i <= stepIdx ? s.colour : '#e5e7eb', background: i < stepIdx ? s.colour : 'white', color: i < stepIdx ? 'white' : i === stepIdx ? s.colour : '#9ca3af' }}>
            {i < stepIdx ? '✓' : s.count}
          </div>
        ))}
      </div>

      {/* Current step card */}
      <div className="rounded-2xl p-6 text-white text-center" style={{ background: step.colour }}>
        <div className="text-5xl mb-3">{step.emoji}</div>
        <h3 className="text-2xl font-bold mb-2">{step.count} things you can {step.sense}</h3>
        <p className="opacity-90 text-sm">{step.prompt}</p>
      </div>

      {/* Input fields */}
      <div className="space-y-3">
        {stepAnswers.map((ans, i) => (
          <input
            key={i}
            value={ans}
            onChange={e => updateAnswer(i, e.target.value)}
            placeholder={`${i + 1}.`}
            className="w-full border-2 rounded-xl px-4 py-3 text-base focus:outline-none transition-colors"
            style={{ borderColor: ans.trim() ? step.colour : '#e5e7eb' }}
            autoFocus={i === 0}
          />
        ))}
      </div>

      <Button
        className="w-full py-3 text-base font-semibold"
        style={{ background: step.colour, opacity: allFilled ? 1 : 0.4 }}
        disabled={!allFilled}
        onClick={next}
      >
        {stepIdx + 1 === STEPS.length ? 'Finish' : 'Next'} <ChevronRight size={18} className="ml-1" />
      </Button>
    </div>
  );
};

export default GroundingExercise;
