'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  duration: number;
  status: 'not_started' | 'doing' | 'done';
}

export default function TodayPage() {
  const [tasks] = useState<Task[]>([
    { id: '1', title: 'Reading', duration: 45, status: 'not_started' },
    { id: '2', title: 'Workout', duration: 60, status: 'doing' },
    { id: '3', title: 'Tutorials', duration: 15, status: 'done' },
  ]);

  const getProgressColor = (status: Task['status']) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-200';
      case 'doing':
        return 'bg-teal-500';
      case 'done':
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'not_started':
        return 'Not started';
      case 'doing':
        return 'Doing';
      case 'done':
        return 'Done';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold text-center text-green-900 drop-shadow-md mb-8">Today</h1>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-yellow-50/90 rounded-xl p-4 shadow-lg backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-green-900">{task.title}</h3>
              <span className="text-green-700">{task.duration} minutes</span>
            </div>
            
            <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${getProgressColor(
                  task.status
                )} transition-all duration-300 ease-in-out ${
                  task.status === 'done'
                    ? 'w-full'
                    : task.status === 'doing'
                    ? 'w-1/2'
                    : 'w-0'
                }`}
              />
            </div>
            
            <div className="mt-2 text-sm text-green-800">
              {getStatusText(task.status)}
            </div>
          </div>
        ))}
      </div>

      <button className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-200">
        Create time slot
      </button>
    </div>
  );
} 