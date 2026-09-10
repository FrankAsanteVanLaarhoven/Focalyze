
import React, { useState } from 'react';

interface Zone {
  label: string;
  range: [number, number];
  color: string;
  bg: string;
  description: string;
  tips: string[];
}

const ZONES: Zone[] = [
  {
    label: 'Hyper-arousal',
    range: [7, 10],
    color: '#DC2626',
    bg: 'bg-red-50 border-red-200',
    description: 'Fight, flight or freeze. Overwhelmed, panicked, angry, or out of control.',
    tips: ['Box breathing — slow your exhale', 'Cold water on wrists or face', 'Move your body — shake, stamp, stretch', '5-4-3-2-1 grounding exercise', 'Remove yourself from the situation if safe to do so'],
  },
  {
    label: 'Window of Tolerance',
    range: [4, 6],
    color: '#059669',
    bg: 'bg-green-50 border-green-200',
    description: 'Regulated, present, and able to process emotions and experiences.',
    tips: ['Maintain your routine', 'Stay connected with safe people', 'Continue any helpful activities', 'Notice and name what you\'re feeling'],
  },
  {
    label: 'Hypo-arousal',
    range: [1, 3],
    color: '#2563EB',
    bg: 'bg-blue-50 border-blue-200',
    description: 'Shutdown, numb, disconnected, foggy or very low energy.',
    tips: ['Gentle movement — walk, stretch, dance', 'Cold shower or splashing water on face', 'Strong sensory input — smell, taste, touch', 'Connect with someone you trust', 'Mindful eating — pay attention to flavours and textures'],
  },
];

const WindowOfTolerance: React.FC = () => {
  const [value, setValue] = useState(5);

  const getZone = (v: number): Zone => {
    return ZONES.find(z => v >= z.range[0] && v <= z.range[1]) || ZONES[1];
  };

  const zone = getZone(value);
  const trackPct = ((value - 1) / 9) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-6 py-4">
      <p className="text-gray-600 text-sm">Move the slider to describe where you feel you are <em>right now</em>.</p>

      {/* Visual gauge */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>Hypo-arousal<br />(shutdown)</span>
          <span className="text-center">Window of<br />Tolerance ✅</span>
          <span className="text-right">Hyper-arousal<br />(overwhelmed)</span>
        </div>

        {/* Colour track */}
        <div className="relative h-8 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #93C5FD 0%, #6EE7B7 35%, #6EE7B7 65%, #FCA5A5 100%)' }}>
          {/* Thumb indicator */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-lg border-2 pointer-events-none transition-all"
            style={{ left: `${trackPct}%`, borderColor: zone.color }} />
        </div>

        <input
          type="range" min={1} max={10} step={1} value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-full accent-adhd-primary"
          aria-label="Nervous system state slider"
        />
        <div className="flex justify-between text-xs text-gray-400 px-1">
          {[1,2,3,4,5,6,7,8,9,10].map(n => <span key={n}>{n}</span>)}
        </div>
      </div>

      {/* Zone card */}
      <div className={`rounded-2xl border-2 p-5 space-y-4 transition-all ${zone.bg}`}>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: zone.color }} />
          <h3 className="text-lg font-bold" style={{ color: zone.color }}>{zone.label}</h3>
          <span className="text-sm text-gray-500 ml-auto font-mono">{value}/10</span>
        </div>
        <p className="text-gray-700 text-sm">{zone.description}</p>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">What might help right now</p>
          <ul className="space-y-1">
            {zone.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-lg leading-none" style={{ color: zone.color }}>·</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WindowOfTolerance;
