
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'idle';

const PHASES: { phase: Phase; label: string; duration: number }[] = [
  { phase: 'inhale', label: 'Breathe In',  duration: 4 },
  { phase: 'hold1',  label: 'Hold',         duration: 4 },
  { phase: 'exhale', label: 'Breathe Out', duration: 4 },
  { phase: 'hold2',  label: 'Hold',         duration: 4 },
];

const PHASE_COLORS: Record<Phase | 'idle', string> = {
  inhale: '#7C3AED',
  hold1:  '#A78BFA',
  exhale: '#5B21B6',
  hold2:  '#8B5CF6',
  idle:   '#D8B4FE',
};

const BoxBreathing: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhase = PHASES[phaseIdx];
  const progress = tick / currentPhase.duration;
  const boxSize = 180;

  const getBoxStyle = () => {
    const scale = currentPhase.phase === 'inhale' ? 1 + progress * 0.35
                : currentPhase.phase === 'exhale' ? 1.35 - progress * 0.35
                : currentPhase.phase === 'hold1'  ? 1.35
                : 1.0;
    return { transform: `scale(${scale})`, transition: 'transform 0.9s ease-in-out' };
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTick(t => {
        if (t + 1 >= PHASES[phaseIdx].duration) {
          setPhaseIdx(p => {
            const next = (p + 1) % PHASES.length;
            if (next === 0) setCycles(c => c + 1);
            return next;
          });
          return 0;
        }
        return t + 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, phaseIdx]);

  const reset = () => {
    setRunning(false);
    setPhaseIdx(0);
    setTick(0);
    setCycles(0);
  };

  const color = running ? PHASE_COLORS[currentPhase.phase] : PHASE_COLORS.idle;
  const remaining = currentPhase.duration - tick;

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {/* Animated box */}
      <div className="relative flex items-center justify-center" style={{ width: boxSize + 80, height: boxSize + 80 }}>
        {/* Corner dots */}
        {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y], i) => (
          <div key={i} className="absolute w-3 h-3 rounded-full transition-colors duration-700"
            style={{ background: color, top: y === -1 ? 16 : undefined, bottom: y === 1 ? 16 : undefined, left: x === -1 ? 16 : undefined, right: x === 1 ? 16 : undefined }} />
        ))}
        {/* Connecting lines */}
        <div className="absolute inset-4 border-2 rounded-sm transition-colors duration-700" style={{ borderColor: color, opacity: 0.4 }} />

        {/* Breathing square */}
        <div className="flex items-center justify-center rounded-2xl shadow-lg transition-colors duration-700" style={{ width: boxSize, height: boxSize, background: color, ...getBoxStyle() }}>
          <div className="text-center text-white select-none">
            <div className="text-4xl font-bold tabular-nums">{running ? remaining : '4'}</div>
            <div className="text-sm font-medium opacity-80 mt-1">{running ? currentPhase.label : 'Ready'}</div>
          </div>
        </div>
      </div>

      {/* Cycle counter */}
      {cycles > 0 && <p className="text-sm text-gray-500">{cycles} {cycles === 1 ? 'cycle' : 'cycles'} completed</p>}

      {/* Controls */}
      <div className="flex gap-3">
        <Button
          onClick={() => setRunning(r => !r)}
          className="bg-adhd-primary hover:bg-adhd-secondary gap-2 px-6"
        >
          {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> {cycles > 0 || tick > 0 ? 'Resume' : 'Start'}</>}
        </Button>
        <Button variant="outline" onClick={reset}><RotateCcw size={16} /></Button>
      </div>
      <p className="text-xs text-gray-400 text-center max-w-xs">
        4-4-4-4 box breathing — inhale, hold, exhale, hold, each for 4 seconds.<br />Repeat 4–6 cycles for best effect.
      </p>
    </div>
  );
};

export default BoxBreathing;
