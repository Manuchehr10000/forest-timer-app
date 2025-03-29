'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateTimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    activity: string;
    description: string;
    duration: number;
    yoloMode: boolean;
  }) => void;
  initialData?: {
    activity: string;
    description: string;
    duration: number;
    yoloMode: boolean;
  };
}

const timeOptions = [
  { label: '15 minutes ★', value: 15 },
  { label: '30 minutes ★★', value: 30 },
  { label: '45 minutes ★★★', value: 45 },
  { label: '60 minutes ★★★★', value: 60 },
  { label: '75 minutes ★★★★★', value: 75 },
  { label: '90 minutes ★★★★★★', value: 90 },
  { label: '105 minutes ★★★★★★★', value: 105 },
  { label: '120 minutes ★★★★★★★★', value: 120 },
];

export default function CreateTimeSlotModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  initialData 
}: CreateTimeSlotModalProps) {
  const [activity, setActivity] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(timeOptions[0].value);
  const [yoloMode, setYoloMode] = useState(false);

  // Reset form when opening modal and set initial data if editing
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setActivity(initialData.activity);
        setDescription(initialData.description);
        setDuration(initialData.duration);
        setYoloMode(initialData.yoloMode);
      } else {
        setActivity('');
        setDescription('');
        setDuration(timeOptions[0].value);
        setYoloMode(false);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      activity,
      description,
      duration,
      yoloMode,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-xl ${
        yoloMode ? 'bg-red-900/95' : 'bg-green-100/95'
      } backdrop-blur-sm transition-colors duration-300`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className={`text-2xl font-bold mb-6 ${
          yoloMode ? 'text-red-100' : 'text-green-900'
        }`}>
          {initialData ? 'Edit Time Slot' : 'Create Time Slot'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="activity"
              className={`block text-sm font-medium mb-1 ${
                yoloMode ? 'text-red-100' : 'text-green-900'
              }`}
            >
              Activity
            </label>
            <input
              type="text"
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className={`block text-sm font-medium mb-1 ${
                yoloMode ? 'text-red-100' : 'text-green-900'
              }`}
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 160) {
                  setDescription(e.target.value);
                }
              }}
              maxLength={160}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Add a description (max 160 characters)"
            />
            <div className={`text-xs mt-1 text-right ${
              yoloMode ? 'text-red-200' : 'text-green-700'
            }`}>
              {description.length}/160
            </div>
          </div>

          <div>
            <label
              htmlFor="duration"
              className={`block text-sm font-medium mb-1 ${
                yoloMode ? 'text-red-100' : 'text-green-900'
              }`}
            >
              Duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {timeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="yoloMode"
              checked={yoloMode}
              onChange={(e) => setYoloMode(e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label
              htmlFor="yoloMode"
              className={`ml-2 text-sm font-medium ${
                yoloMode ? 'text-red-100' : 'text-green-900'
              }`}
            >
              YOLO Mode
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
              yoloMode
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {initialData ? 'Save Changes' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
} 