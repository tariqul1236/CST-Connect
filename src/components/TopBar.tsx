import React from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Cpu, 
  Smartphone
} from 'lucide-react';
import { StudentProfile } from '../types';

interface TopBarProps {
  student: StudentProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenNotifications: () => void;
  onOpenFlutterCode?: () => void;
  unreadCount: number;
  onOpenApkModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  student,
  darkMode,
  onToggleDarkMode,
  onOpenNotifications,
  onOpenApkModal,
  unreadCount,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full max-w-full bg-emerald-800 text-white shadow-md select-none transition-colors duration-200 overflow-hidden">
      {/* Main Material 3 App Bar */}
      <div className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between min-w-0">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1 mr-1 sm:mr-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-800 shrink-0">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1.5 min-w-0">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight truncate">
                CST Connect
              </h1>
              <span className="bg-emerald-600/80 text-[10px] font-semibold px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full border border-emerald-400/40 text-emerald-50 shrink-0">
                NPI
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-emerald-100 font-medium leading-none mt-0.5 truncate max-w-[140px] xs:max-w-[200px] sm:max-w-xs">
              নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
          {/* App Install Button */}
          <button
            onClick={onOpenApkModal}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all text-xs font-bold border border-emerald-400/40 shadow-xs text-white shrink-0"
            title="অ্যাপ ইনস্টলেশন ও Android APK"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-100" />
            <span>ইন্সটল</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 sm:p-2 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 active:scale-95 transition-all text-emerald-100 shrink-0"
            aria-label="ডার্ক মোড টগল"
            title={darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 sm:p-2 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 active:scale-95 transition-all text-emerald-100 shrink-0"
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
