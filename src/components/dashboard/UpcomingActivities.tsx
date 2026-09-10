
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const UpcomingActivities = () => {
  const activities = [
    {
      title: 'Therapy Session',
      time: '3:00 PM - 4:00 PM',
      date: 'Today',
      type: 'clinical'
    },
    {
      title: 'Sprint Planning',
      time: '10:00 AM - 11:00 AM',
      date: 'Tomorrow',
      type: 'management'
    },
    {
      title: 'Transition Review',
      time: '2:00 PM - 3:00 PM',
      date: 'Apr 10, 2025',
      type: 'transition'
    }
  ];
  
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'clinical':
        return 'bg-green-100 text-green-800';
      case 'management':
        return 'bg-purple-100 text-purple-800';
      case 'transition':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2" size={20} />
          Upcoming Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`p-2 rounded-md mr-4 ${getTypeStyles(activity.type)}`}>
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-medium">{activity.title}</h3>
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-xs text-gray-400">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingActivities;
