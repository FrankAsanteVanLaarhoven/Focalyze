
import React, { useState } from 'react';

const FACES = [
  { emoji: '😄', label: 'Amazing',  color: '#22C55E', bg: '#DCFCE7' },
  { emoji: '😊', label: 'Good',     color: '#84CC16', bg: '#F7FEE7' },
  { emoji: '😐', label: 'Okay',     color: '#EAB308', bg: '#FEFCE8' },
  { emoji: '😟', label: 'Worried',  color: '#F97316', bg: '#FFF7ED' },
  { emoji: '😢', label: 'Sad',      color: '#3B82F6', bg: '#EFF6FF' },
];

interface EmotionEntry {
  date: string;
  face: string;
  label: string;
  color: string;
}

const EmotionCheckin: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const recent: EmotionEntry[] = (() => {
    try { return JSON.parse(localStorage.getItem('focalyze_emotions') || '[]').slice(0, 5); }
    catch { return []; }
  })();

  const handleSelect = (i: number) => {
    setSelected(i);
    setSaved(false);
  };

  const handleSave = () => {
    if (selected === null) return;
    const face = FACES[selected];
    const entry: EmotionEntry = { date: new Date().toISOString(), face: face.emoji, label: face.label, color: face.color };
    const prev: EmotionEntry[] = (() => { try { return JSON.parse(localStorage.getItem('focalyze_emotions') || '[]'); } catch { return []; } })();
    localStorage.setItem('focalyze_emotions', JSON.stringify([entry, ...prev].slice(0, 50)));
    setSaved(true);
    setSelected(null);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-2xl font-bold text-adhd-dark text-center">How are you feeling right now?</p>

      {/* Face buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        {FACES.map((f, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className="flex flex-col items-center gap-2 p-4 rounded-3xl border-4 transition-all duration-200"
            style={{
              borderColor: selected === i ? f.color : 'transparent',
              background: selected === i ? f.bg : '#f9fafb',
              transform: selected === i ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            <span className="text-6xl select-none">{f.emoji}</span>
            <span className="text-sm font-bold" style={{ color: f.color }}>{f.label}</span>
          </button>
        ))}
      </div>

      {selected !== null && !saved && (
        <button
          onClick={handleSave}
          className="text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transition-all active:scale-95"
          style={{ background: FACES[selected].color }}
        >
          ✅ That's how I feel!
        </button>
      )}

      {saved && (
        <div className="text-center animate-fade-in">
          <p className="text-4xl">🌟</p>
          <p className="text-xl font-bold text-green-600 mt-2">Thank you for sharing!</p>
        </div>
      )}

      {/* Recent check-ins */}
      {recent.length > 0 && (
        <div className="w-full max-w-xs">
          <p className="text-sm text-gray-500 text-center mb-3">Recent check-ins</p>
          <div className="flex justify-center gap-3">
            {recent.map((e, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl">{e.face}</span>
                <span className="text-xs text-gray-400">{new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionCheckin;
