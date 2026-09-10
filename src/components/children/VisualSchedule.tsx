
import React, { useState } from 'react';

interface ScheduleItem {
  id: string;
  emoji: string;
  label: string;
  done: boolean;
}

const DEFAULT_SCHEDULE: ScheduleItem[] = [
  { id: '1', emoji: '☀️', label: 'Wake Up',     done: false },
  { id: '2', emoji: '🥣', label: 'Breakfast',   done: false },
  { id: '3', emoji: '🎒', label: 'Get Ready',   done: false },
  { id: '4', emoji: '📚', label: 'School',      done: false },
  { id: '5', emoji: '🍎', label: 'Snack',       done: false },
  { id: '6', emoji: '🏃', label: 'Play / Break',done: false },
  { id: '7', emoji: '✏️', label: 'Homework',    done: false },
  { id: '8', emoji: '🍽️', label: 'Dinner',      done: false },
  { id: '9', emoji: '🛁', label: 'Bath / Wash', done: false },
  { id: '10', emoji: '📖', label: 'Reading',    done: false },
  { id: '11', emoji: '🌙', label: 'Bedtime',    done: false },
];

const VisualSchedule: React.FC<{ onStarEarned?: () => void }> = ({ onStarEarned }) => {
  const [items, setItems] = useState<ScheduleItem[]>(() => {
    try {
      const saved = localStorage.getItem('focalyze_schedule');
      return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
    } catch { return DEFAULT_SCHEDULE; }
  });

  const toggle = (id: string) => {
    const wasntDone = items.find(i => i.id === id && !i.done);
    const updated = items.map(item => item.id === id ? { ...item, done: !item.done } : item);
    setItems(updated);
    localStorage.setItem('focalyze_schedule', JSON.stringify(updated));
    if (wasntDone && onStarEarned) onStarEarned();
  };

  const resetAll = () => {
    const reset = items.map(i => ({ ...i, done: false }));
    setItems(reset);
    localStorage.setItem('focalyze_schedule', JSON.stringify(reset));
  };

  const doneCount = items.filter(i => i.done).length;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-bold text-adhd-dark">My Day</p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{doneCount}/{items.length} done</span>
          <button onClick={resetAll} className="text-xs text-gray-400 hover:text-gray-600 underline">Reset</button>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3">
        <div className="bg-green-400 h-3 rounded-full transition-all duration-500" style={{ width: `${(doneCount / items.length) * 100}%` }} />
      </div>

      {/* Schedule grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className="relative flex flex-col items-center justify-center gap-2 p-5 rounded-3xl border-3 transition-all duration-200 min-h-[110px] select-none"
            style={{
              background: item.done ? '#DCFCE7' : '#F9FAFB',
              borderColor: item.done ? '#22C55E' : '#E5E7EB',
              border: `3px solid ${item.done ? '#22C55E' : '#E5E7EB'}`,
              transform: item.done ? 'scale(0.97)' : 'scale(1)',
            }}
          >
            {item.done && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">✓</div>
            )}
            <span className="text-4xl">{item.emoji}</span>
            <span className={`text-sm font-bold ${item.done ? 'text-green-700 line-through' : 'text-gray-700'}`}>{item.label}</span>
          </button>
        ))}
      </div>

      {doneCount === items.length && (
        <div className="text-center py-6 animate-fade-in">
          <p className="text-5xl mb-2">🎉</p>
          <p className="text-xl font-bold text-green-600">You finished everything today!</p>
        </div>
      )}
    </div>
  );
};

export default VisualSchedule;
