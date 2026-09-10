
import React, { useState } from 'react';

const STICKERS = ['⭐', '🌈', '🦋', '🐬', '🦄', '🌸', '🍭', '🎈', '🏆', '🚀', '💎', '🦁', '🌺', '🎨', '🐉'];
const MILESTONES = [5, 10, 25, 50];

interface RewardBoardProps {
  stars: number;
  onReset?: () => void;
}

const RewardBoard: React.FC<RewardBoardProps> = ({ stars, onReset }) => {
  const [celebrated, setCelebrated] = useState<number[]>([]);

  const nextMilestone = MILESTONES.find(m => m > stars);
  const toNext = nextMilestone ? nextMilestone - stars : 0;
  const earnedStickers = Math.min(stars, STICKERS.length);

  const justHitMilestone = MILESTONES.includes(stars) && !celebrated.includes(stars);
  if (justHitMilestone) setCelebrated(prev => [...prev, stars]);

  return (
    <div className="space-y-6">
      {/* Star count */}
      <div className="flex items-center gap-4 bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-5">
        <span className="text-5xl">⭐</span>
        <div>
          <p className="text-4xl font-black text-yellow-600">{stars}</p>
          <p className="text-sm text-yellow-700 font-semibold">stars earned</p>
        </div>
        {nextMilestone && (
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-400">Next reward</p>
            <p className="text-sm font-bold text-gray-600">{toNext} more ⭐</p>
            <div className="w-24 bg-gray-100 rounded-full h-2 mt-1">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(stars / nextMilestone) * 100}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Celebration banner */}
      {justHitMilestone && (
        <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white animate-fade-in">
          <p className="text-4xl mb-2">🎉 🏆 🎉</p>
          <p className="text-2xl font-black">Amazing! {stars} stars!</p>
          <p className="opacity-90">You unlocked a new sticker!</p>
        </div>
      )}

      {/* Sticker collection */}
      <div>
        <p className="text-base font-bold text-adhd-dark mb-3">My Sticker Collection</p>
        <div className="grid grid-cols-5 gap-3">
          {STICKERS.map((sticker, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-300"
              style={{
                background: i < earnedStickers ? '#F5F3FF' : '#F3F4F6',
                filter: i < earnedStickers ? 'none' : 'grayscale(1) opacity(0.3)',
                transform: i < earnedStickers ? 'scale(1)' : 'scale(0.9)',
                border: `2px solid ${i < earnedStickers ? '#A78BFA' : '#E5E7EB'}`,
              }}
            >
              {sticker}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          {earnedStickers}/{STICKERS.length} stickers collected
        </p>
      </div>

      {onReset && (
        <button onClick={onReset} className="text-xs text-gray-400 hover:text-gray-600 underline block mx-auto">
          Reset board
        </button>
      )}
    </div>
  );
};

export default RewardBoard;
