'use client';

import { PencilIcon, TrashIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { formatTime } from '../utils/timeUtils';
import '../styles/timeSlotCard.css';

interface TimeSlotCardProps {
  title: string;
  description: string;
  duration: number;
  status: 'not_started' | 'doing' | 'done';
  elapsedTime: number;
  isRunning: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePlay: () => void;
}

const getStarsForDuration = (duration: number): number => {
  switch (duration) {
    case 15: return 1;
    case 30: return 2;
    case 45: return 3;
    case 60: return 4;
    case 75: return 5;
    case 90: return 6;
    case 105: return 7;
    case 120: return 8;
    default: return 1;
  }
};

const getStatusText = (status: 'not_started' | 'doing' | 'done') => {
  switch (status) {
    case 'not_started':
      return 'Not started';
    case 'doing':
      return 'In Progress';
    case 'done':
      return 'Completed! 🎉';
    default:
      return '';
  }
};

export default function TimeSlotCard({
  title,
  description,
  duration,
  status,
  elapsedTime,
  isRunning,
  onEdit,
  onDelete,
  onTogglePlay,
}: TimeSlotCardProps) {
  const stars = getStarsForDuration(duration);
  const progress = (elapsedTime / (duration * 60)) * 100;

  return (
    <div className="time-slot-card">
      <div className="card-title">
        <h3>{title}</h3>
      </div>

      <div className="card-stars">
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      <div className="card-central">
        {isRunning ? (
          <div className="timer-display">
            {formatTime(elapsedTime)}
          </div>
        ) : (
          <div className="status-text">
            {getStatusText(status)}
          </div>
        )}
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {description && (
        <div className="card-description">
          <p>{description}</p>
        </div>
      )}

      <div className="card-controls">
        <button
          onClick={onEdit}
          className="card-button"
          title="Edit"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="card-button"
          title="Delete"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
        {status !== 'done' && (
          <button
            onClick={onTogglePlay}
            className="card-button"
            title={isRunning ? "Pause" : "Start"}
          >
            {isRunning ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
} 