'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import CreateTimeSlotModal from '../components/CreateTimeSlotModal';
import { formatTime } from '../utils/timeUtils';
import TimeSlotCard from '../components/TimeSlotCard';

interface Task {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: 'not_started' | 'doing' | 'done';
  yoloMode?: boolean;
  elapsedTime?: number;
  isRunning?: boolean;
}

export default function TodayPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(currentTasks => 
        currentTasks.map(task => {
          if (!task.isRunning) return task;
          
          const newElapsedTime = (task.elapsedTime || 0) + 1;
          const targetTime = task.duration * 60;
          
          if (newElapsedTime >= targetTime) {
            return {
              ...task,
              elapsedTime: targetTime,
              isRunning: false,
              status: 'done'
            };
          }
          
          return {
            ...task,
            elapsedTime: newElapsedTime,
            status: 'doing'
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateTask = (data: { activity: string; description: string; duration: number; yoloMode: boolean }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.activity,
      description: data.description,
      duration: data.duration,
      status: 'not_started',
      yoloMode: data.yoloMode,
      elapsedTime: 0,
      isRunning: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (data: { activity: string; description: string; duration: number; yoloMode: boolean }) => {
    if (!editingTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === editingTask.id 
        ? {
            ...task,
            title: data.activity,
            description: data.description,
            duration: data.duration,
            yoloMode: data.yoloMode,
          }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this time slot?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleStartTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, isRunning: true, status: 'doing' }
        : task
    ));
  };

  const handlePauseTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, isRunning: false }
        : task
    ));
  };

  const getProgressColor = (status: Task['status'], yoloMode?: boolean) => {
    if (yoloMode) {
      switch (status) {
        case 'not_started':
          return 'bg-red-200';
        case 'doing':
          return 'bg-red-500';
        case 'done':
          return 'bg-red-800';
        default:
          return 'bg-red-200';
      }
    }
    
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
    <div className="min-h-[calc(100vh-4rem)] p-4">
      <h1 className="text-3xl font-bold text-center text-green-900 drop-shadow-md mb-8">Today</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TimeSlotCard
              key={task.id}
              title={task.title}
              description={task.description}
              duration={task.duration}
              status={task.status}
              elapsedTime={task.elapsedTime || 0}
              isRunning={task.isRunning || false}
              onEdit={() => setEditingTask(task)}
              onDelete={() => handleDeleteTask(task.id)}
              onTogglePlay={() => 
                task.isRunning 
                  ? handlePauseTask(task.id)
                  : handleStartTask(task.id)
              }
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-200 z-20"
      >
        Create time slot
      </button>

      <CreateTimeSlotModal
        isOpen={isModalOpen || editingTask !== null}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleEditTask : handleCreateTask}
        initialData={editingTask ? {
          activity: editingTask.title,
          description: editingTask.description,
          duration: editingTask.duration,
          yoloMode: editingTask.yoloMode || false,
        } : undefined}
      />
    </div>
  );
} 