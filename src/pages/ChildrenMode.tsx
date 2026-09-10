
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmotionCheckin from '@/components/children/EmotionCheckin';
import VisualSchedule from '@/components/children/VisualSchedule';
import RewardBoard from '@/components/children/RewardBoard';
import FocalyzeLogo from '@/components/FocalyzeLogo';
import { Link } from 'react-router-dom';

const ChildrenMode: React.FC = () => {
  const [stars, setStars] = useState<number>(() => {
    try { return Number(localStorage.getItem('focalyze_stars') || '0'); }
    catch { return 0; }
  });

  const addStar = () => {
    const newStars = stars + 1;
    setStars(newStars);
    localStorage.setItem('focalyze_stars', String(newStars));
  };

  const resetStars = () => {
    setStars(0);
    localStorage.setItem('focalyze_stars', '0');
  };

  return (
    // Low-sensory design: soft background, no sharp animations, large text
    <div className="min-h-screen" style={{ background: '#F5F3FF', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <FocalyzeLogo size={36} />
        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2">
          <span className="text-xl">⭐</span>
          <span className="text-lg font-black text-yellow-600">{stars}</span>
        </div>
        <Link to="/" className="text-sm text-adhd-primary hover:underline">← Back</Link>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Tabs defaultValue="howami">
          <TabsList className="grid grid-cols-3 w-full mb-8 h-14 rounded-2xl">
            <TabsTrigger value="howami" className="text-base rounded-xl h-full">
              😊 How Am I?
            </TabsTrigger>
            <TabsTrigger value="myday" className="text-base rounded-xl h-full">
              📅 My Day
            </TabsTrigger>
            <TabsTrigger value="stars" className="text-base rounded-xl h-full">
              ⭐ My Stars
            </TabsTrigger>
          </TabsList>

          <TabsContent value="howami" className="bg-white rounded-3xl p-6 shadow-sm">
            <EmotionCheckin />
          </TabsContent>

          <TabsContent value="myday" className="bg-white rounded-3xl p-6 shadow-sm">
            <VisualSchedule onStarEarned={addStar} />
          </TabsContent>

          <TabsContent value="stars" className="bg-white rounded-3xl p-6 shadow-sm">
            <RewardBoard stars={stars} onReset={resetStars} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChildrenMode;
