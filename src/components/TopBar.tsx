import React from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Code2, 
  Cpu, 
  Wifi, 
  Battery, 
  Signal, 
  Layers
} from 'lucide-react';
import { StudentProfile } from '../types';

interface TopBarProps {
  student: StudentProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenNotifications: () => void;
  onOpenFlutterCode: () => void;
  unreadCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  student,
  darkMode,
  onToggleDarkMode,
  onOpenNotifications,
  onOpenFlutterCode,
  unreadCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-emerald-800 text-white shadow-md select-none transition-colors duration-200">
      {/* Android System Status Bar Emulation */}
      <div className="flex items-center justify-between px-4 py-1 text-xs text-emerald-100/90 font-medium tracking-wide border-b border-emerald-700/50">
        <span>০৯:৪৫</span>
        <div className="flex items-center space-x-2">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center space-x-1">
            <span className="text-[10px]">৮৮%</span>
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Material 3 App Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-800">
            <Cpu className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
                CST Connect
              </h1>
              <span className="bg-emerald-600/80 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/40 text-emerald-50">
                NPI
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 font-medium leading-none mt-0.5 truncate max-w-[200px] sm:max-w-xs">
              নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5">
          {/* Flutter Project Code Viewer Button */}
          <button
            onClick={onOpenFlutterCode}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 active:scale-95 transition-all text-xs font-medium border border-emerald-600"
            title="Flutter কোড ও Firebase আর্কিটেকচার"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden sm:inline">Flutter কোড</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 active:scale-95 transition-all text-emerald-100"
            aria-label="ডার্ক মোড টগল"
            title={darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 active:scale-95 transition-all text-emerald-100"
            aria-label="নোটিফিকেশন"
            title="নোটিফিকেশন বোর্ড"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
