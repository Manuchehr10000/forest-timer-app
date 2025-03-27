'use client';

import { HomeIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-green-900/80 backdrop-blur-lg border-t border-green-700">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        <Link
          href="/today"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/today') ? 'text-white' : 'text-green-300 hover:text-white'
          }`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Today</span>
        </Link>

        <Link
          href="/calendar"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/calendar') ? 'text-white' : 'text-green-300 hover:text-white'
          }`}
        >
          <CalendarIcon className="w-6 h-6" />
          <span className="text-xs">Calendar</span>
        </Link>

        <Link
          href="/progress"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/progress') ? 'text-white' : 'text-green-300 hover:text-white'
          }`}
        >
          <ChartBarIcon className="w-6 h-6" />
          <span className="text-xs">Progress</span>
        </Link>
      </div>
    </nav>
  );
} 