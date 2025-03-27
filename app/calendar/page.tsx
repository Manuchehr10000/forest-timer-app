'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const currentDate = new Date();
  const currentDay = 10; // Hardcoded for the design

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-md mx-auto px-4 pt-8">
      <div className="flex justify-between items-center mb-8">
        <ChevronLeftIcon className="w-6 h-6 text-green-900 cursor-pointer" />
        <h1 className="text-3xl font-bold text-green-900 drop-shadow-md">April</h1>
        <ChevronRightIcon className="w-6 h-6 text-green-900 cursor-pointer" />
      </div>

      <div className="bg-yellow-50/90 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-green-800"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for previous month */}
          {Array.from({ length: 1 }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10" />
          ))}

          {/* Days of current month */}
          {daysInMonth.map((day) => (
            <div
              key={day}
              className={`h-10 flex items-center justify-center relative ${
                day === currentDay
                  ? 'text-white'
                  : 'text-green-800 hover:text-green-600'
              }`}
            >
              {day === currentDay && (
                <div className="absolute inset-0 bg-green-500 rounded-full" />
              )}
              <span className="relative z-10">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 