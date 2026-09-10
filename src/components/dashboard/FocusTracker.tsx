
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { BarChart2, Plus } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useRedux';
import { recordFocusScore } from '@/store/slices/monitoringSlice';

const FocusTracker = () => {
  const [score, setScore] = useState(7);
  const [notes, setNotes] = useState('');
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleRecordFocus = () => {
    dispatch(recordFocusScore({ score, notes }));
    
    toast({
      title: "Focus score recorded",
      description: `Your focus score of ${score}/10 has been saved.`,
    });
    
    setNotes('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="mr-2" size={20} />
            Daily Focus Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border border-dashed rounded-md">
            <p className="text-gray-500">Focus scores chart will appear here</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2" size={20} />
            Record Focus Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">How focused do you feel right now?</span>
                <span className="text-2xl font-bold">{score}/10</span>
              </div>
              <Slider 
                value={[score]} 
                onValueChange={(value) => setScore(value[0])} 
                min={1} 
                max={10} 
                step={1} 
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low Focus</span>
                <span>High Focus</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <Textarea 
                placeholder="What might be affecting your focus today?" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                rows={4}
              />
            </div>
            
            <Button 
              className="w-full bg-adhd-primary hover:bg-adhd-secondary" 
              onClick={handleRecordFocus}
            >
              Record Focus Score
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FocusTracker;
