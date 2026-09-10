
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Lock, Trash2 } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  trigger: string;
  sensation: string;
  coping: string;
  rating: number;
}

const SENSATION_OPTIONS = ['Chest tightness', 'Racing heart', 'Shaking', 'Nausea', 'Headache', 'Numbness', 'Sweating', 'Difficulty breathing'];
const COPING_OPTIONS    = ['Deep breathing', 'Grounding (5-4-3-2-1)', 'Box breathing', 'Called someone', 'Went for a walk', 'Journalling', 'Music', 'Left the situation'];

const TriggerJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem('focalyze_trigger_journal') || '[]'); }
    catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [trigger, setTrigger]   = useState('');
  const [sensation, setSensation] = useState('');
  const [coping, setCoping]     = useState('');
  const [rating, setRating]     = useState(5);

  const save = () => {
    if (!trigger.trim()) return;
    const entry: JournalEntry = { id: crypto.randomUUID(), date: new Date().toISOString(), trigger, sensation, coping, rating };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('focalyze_trigger_journal', JSON.stringify(updated));
    setTrigger(''); setSensation(''); setCoping(''); setRating(5); setShowForm(false);
  };

  const remove = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('focalyze_trigger_journal', JSON.stringify(updated));
  };

  const getRatingColor = (r: number) => r <= 3 ? 'text-green-600' : r <= 6 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="space-y-6">
      {/* Privacy notice */}
      <div className="flex items-start gap-3 bg-teal-50 border border-teal-200 rounded-xl p-4">
        <Lock className="text-teal-600 flex-shrink-0 mt-0.5" size={16} />
        <p className="text-sm text-teal-800">
          <strong>Private & local only.</strong> This journal is stored only on your device and never synced or shared.
        </p>
      </div>

      {!showForm && (
        <Button className="bg-adhd-primary hover:bg-adhd-secondary" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" /> Log an entry
        </Button>
      )}

      {showForm && (
        <Card className="border-2 border-adhd-primary/30">
          <CardHeader><CardTitle className="text-base">New Journal Entry</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">What triggered this feeling?</label>
              <textarea
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-adhd-primary min-h-[80px] resize-none"
                placeholder="Describe the trigger — a situation, sound, person, memory..."
                value={trigger}
                onChange={e => setTrigger(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Body sensation</label>
              <div className="flex flex-wrap gap-2">
                {SENSATION_OPTIONS.map(s => (
                  <button key={s} onClick={() => setSensation(s === sensation ? '' : s)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all ${sensation === s ? 'bg-adhd-primary text-white border-adhd-primary' : 'border-gray-200 text-gray-600'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Coping strategy used</label>
              <div className="flex flex-wrap gap-2">
                {COPING_OPTIONS.map(c => (
                  <button key={c} onClick={() => setCoping(c === coping ? '' : c)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all ${coping === c ? 'bg-teal-600 text-white border-teal-600' : 'border-gray-200 text-gray-600'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Distress level: <span className={`font-bold ${getRatingColor(rating)}`}>{rating}/10</span>
              </label>
              <input type="range" min={1} max={10} value={rating} onChange={e => setRating(Number(e.target.value))}
                className="w-full accent-adhd-primary" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Calm</span><span>Moderate</span><span>Intense</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-adhd-primary hover:bg-adhd-secondary" onClick={save} disabled={!trigger.trim()}>Save</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entries */}
      <div className="space-y-3">
        {entries.length === 0 && <p className="text-gray-500 text-sm py-6 text-center">No entries yet. Your journal is private and safe.</p>}
        {entries.map(e => (
          <Card key={e.id} className="border">
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-400">{new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className={`text-xs font-bold ${getRatingColor(e.rating)}`}>Distress: {e.rating}/10</span>
                  </div>
                  <p className="text-sm text-gray-800">{e.trigger}</p>
                  <div className="flex flex-wrap gap-1">
                    {e.sensation && <Badge className="bg-purple-100 text-purple-700 text-xs">{e.sensation}</Badge>}
                    {e.coping && <Badge className="bg-teal-100 text-teal-700 text-xs">{e.coping}</Badge>}
                  </div>
                </div>
                <button onClick={() => remove(e.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TriggerJournal;
