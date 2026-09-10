
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, TrendingUp } from 'lucide-react';

interface ScreeningResult {
  id: string;
  tool: string;
  clientName: string;
  date: string;
  score: number;
  maxScore: number;
}

const TOOL_LABELS: Record<string, string> = {
  adhd: 'ADHD',
  autism: 'Autism',
  ptsd: 'PTSD',
};

const TOOL_COLORS: Record<string, string> = {
  adhd: 'bg-blue-100 text-blue-800',
  autism: 'bg-purple-100 text-purple-800',
  ptsd: 'bg-teal-100 text-teal-800',
};

const getLevelBadge = (score: number, maxScore: number) => {
  const pct = (score / maxScore) * 100;
  if (pct <= 33) return { label: 'Low', className: 'bg-green-100 text-green-700' };
  if (pct <= 66) return { label: 'Moderate', className: 'bg-amber-100 text-amber-700' };
  return { label: 'High', className: 'bg-red-100 text-red-700' };
};

const ResultsDashboard: React.FC = () => {
  const [results, setResults] = useState<ScreeningResult[]>(() => {
    try { return JSON.parse(localStorage.getItem('focalyze_screening') || '[]'); }
    catch { return []; }
  });
  const [filterTool, setFilterTool] = useState<string | null>(null);

  const deleteResult = (id: string) => {
    const updated = results.filter(r => r.id !== id);
    setResults(updated);
    localStorage.setItem('focalyze_screening', JSON.stringify(updated));
  };

  const filtered = filterTool ? results.filter(r => r.tool === filterTool) : results;

  // Stats
  const highCount = results.filter(r => (r.score / r.maxScore) > 0.66).length;
  const modCount  = results.filter(r => { const p = r.score / r.maxScore; return p > 0.33 && p <= 0.66; }).length;

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-5 pb-5">
            <div className="text-3xl font-bold text-adhd-primary">{results.length}</div>
            <div className="text-xs text-gray-500 mt-1">Total Screenings</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-5 pb-5">
            <div className="text-3xl font-bold text-amber-500">{modCount}</div>
            <div className="text-xs text-gray-500 mt-1">Moderate Indicators</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-5 pb-5">
            <div className="text-3xl font-bold text-red-500">{highCount}</div>
            <div className="text-xs text-gray-500 mt-1">High — Referral Flagged</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['adhd', 'autism', 'ptsd'].map(tool => (
          <button
            key={tool}
            onClick={() => setFilterTool(filterTool === tool ? null : tool)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${filterTool === tool ? TOOL_COLORS[tool] + ' border-current' : 'border-gray-200 text-gray-600'}`}
          >
            {TOOL_LABELS[tool]}
          </button>
        ))}
      </div>

      {/* Results list */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-500">No screening results yet. Run a screening to see results here.</p>
        </div>
      )}
      <div className="space-y-3">
        {filtered.map(r => {
          const level = getLevelBadge(r.score, r.maxScore);
          const pct = Math.round((r.score / r.maxScore) * 100);
          return (
            <Card key={r.id} className="border hover:shadow-sm transition-shadow">
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <div className="flex gap-2 items-center flex-wrap">
                      <Badge className={TOOL_COLORS[r.tool] || 'bg-gray-100 text-gray-700'}>{TOOL_LABELS[r.tool] || r.tool}</Badge>
                      <Badge className={level.className}>{level.label} Indicators</Badge>
                      <span className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString('en-GB')}</span>
                    </div>
                    <p className="font-medium text-adhd-dark">{r.clientName}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${pct > 66 ? 'bg-red-400' : pct > 33 ? 'bg-amber-400' : 'bg-green-400'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{r.score}/{r.maxScore}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteResult(r.id)}
                    className="ml-4 text-gray-300 hover:text-red-400 transition-colors"
                    aria-label="Delete result"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsDashboard;
