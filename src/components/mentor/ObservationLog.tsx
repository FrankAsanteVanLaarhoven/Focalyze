
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Tag } from 'lucide-react';

const TAGS = ['focus', 'sensory', 'meltdown', 'social', 'regulation', 'communication', 'sleep', 'anxiety'];
const TAG_COLORS: Record<string, string> = {
  focus: 'bg-blue-100 text-blue-700',
  sensory: 'bg-purple-100 text-purple-700',
  meltdown: 'bg-red-100 text-red-700',
  social: 'bg-green-100 text-green-700',
  regulation: 'bg-teal-100 text-teal-700',
  communication: 'bg-yellow-100 text-yellow-700',
  sleep: 'bg-indigo-100 text-indigo-700',
  anxiety: 'bg-orange-100 text-orange-700',
};

interface Observation {
  id: string;
  clientName: string;
  date: string;
  tags: string[];
  notes: string;
}

const ObservationLog: React.FC = () => {
  const [observations, setObservations] = useState<Observation[]>(() => {
    try { return JSON.parse(localStorage.getItem('focalyze_observations') || '[]'); }
    catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const toggleTag = (tag: string) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const save = () => {
    if (!clientName.trim() || !notes.trim()) return;
    const obs: Observation = {
      id: crypto.randomUUID(),
      clientName: clientName.trim(),
      date: new Date().toISOString(),
      tags: selectedTags,
      notes: notes.trim(),
    };
    const updated = [obs, ...observations];
    setObservations(updated);
    localStorage.setItem('focalyze_observations', JSON.stringify(updated));
    setClientName(''); setSelectedTags([]); setNotes(''); setShowForm(false);
  };

  const filtered = filterTag ? observations.filter(o => o.tags.includes(filterTag)) : observations;

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-500 flex items-center gap-1"><Tag size={14} /> Filter:</span>
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${filterTag === tag ? TAG_COLORS[tag] + ' border-current' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Add button */}
      {!showForm && (
        <Button className="bg-adhd-primary hover:bg-adhd-secondary" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" /> Log Observation
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <Card className="border-2 border-adhd-primary/30">
          <CardHeader><CardTitle className="text-base">New Observation</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <input
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-adhd-primary"
              placeholder="Client name or code"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
            />
            <div>
              <p className="text-xs text-gray-500 mb-2">Select relevant tags:</p>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${selectedTags.includes(tag) ? TAG_COLORS[tag] + ' border-current' : 'border-gray-200 text-gray-600'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-adhd-primary min-h-[120px] resize-none"
              placeholder="Describe what you observed — context, behaviour, response, environment..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <div className="flex gap-3">
              <Button className="bg-adhd-primary hover:bg-adhd-secondary" onClick={save} disabled={!clientName.trim() || !notes.trim()}>
                Save
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Observations list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-gray-500 text-sm py-8 text-center">No observations logged yet.</p>
        )}
        {filtered.map(obs => (
          <Card key={obs.id} className="border hover:shadow-sm transition-shadow">
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-adhd-dark">{obs.clientName}</span>
                <span className="text-xs text-gray-400">{new Date(obs.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {obs.tags.map(tag => (
                  <Badge key={tag} className={`text-xs ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-600'}`}>{tag}</Badge>
                ))}
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{obs.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ObservationLog;
