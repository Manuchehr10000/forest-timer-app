'use client';

import React, { useState } from 'react';
import TimeSlotCard from './components/TimeSlotCard';
import './styles/timeSlotCard.css';

interface TimeSlot {
  id: number;
  title: string;
  description: string;
  duration: number;
  status: 'not_started' | 'doing' | 'done';
  elapsedTime: number;
  isRunning: boolean;
}

export default function Home() {
  const [selectedTime, setSelectedTime] = useState(25); // Default 25 minutes
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { 
      id: 1, 
      title: 'Focus Session',
      description: 'Deep work session',
      duration: selectedTime,
      status: 'not_started',
      elapsedTime: 0,
      isRunning: false 
    },
    { 
      id: 2, 
      title: 'Study Session',
      description: 'Learning new concepts',
      duration: selectedTime,
      status: 'not_started',
      elapsedTime: 0,
      isRunning: false 
    },
    { 
      id: 3, 
      title: 'Break Time',
      description: 'Short break',
      duration: selectedTime,
      status: 'not_started',
      elapsedTime: 0,
      isRunning: false 
    },
  ]);

  const handleStartPause = (slotId: number) => {
    setTimeSlots(slots =>
      slots.map(slot =>
        slot.id === slotId
          ? { 
              ...slot, 
              isRunning: !slot.isRunning,
              status: slot.status === 'not_started' ? 'doing' : slot.status
            }
          : slot
      )
    );
  };

  const handleDelete = (slotId: number) => {
    if (confirm('Are you sure you want to delete this time slot?')) {
      setTimeSlots(slots => slots.filter(slot => slot.id !== slotId));
    }
  };

  // Timer effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeSlots(slots => 
        slots.map(slot => {
          if (!slot.isRunning) return slot;
          
          const newElapsedTime = slot.elapsedTime + 1;
          const targetTime = slot.duration * 60;
          
          if (newElapsedTime >= targetTime) {
            return {
              ...slot,
              elapsedTime: targetTime,
              isRunning: false,
              status: 'done'
            };
          }
          
          return {
            ...slot,
            elapsedTime: newElapsedTime
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Timer Collection
          </h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <label htmlFor="timeSelect" className="text-lg text-yellow-400">
              Select Time:
            </label>
            <select
              id="timeSelect"
              value={selectedTime}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
              className="bg-black/50 text-yellow-400 border border-yellow-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="15">15 minutes ★</option>
              <option value="30">30 minutes ★★</option>
              <option value="45">45 minutes ★★★</option>
              <option value="60">60 minutes ★★★★</option>
              <option value="75">75 minutes ★★★★★</option>
              <option value="90">90 minutes ★★★★★★</option>
              <option value="105">105 minutes ★★★★★★★</option>
              <option value="120">120 minutes ★★★★★★★★</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timeSlots.map((slot) => (
              <TimeSlotCard
                key={slot.id}
                title={slot.title}
                description={slot.description}
                duration={slot.duration}
                status={slot.status}
                elapsedTime={slot.elapsedTime}
                isRunning={slot.isRunning}
                onEdit={() => {}}
                onDelete={() => handleDelete(slot.id)}
                onTogglePlay={() => handleStartPause(slot.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 