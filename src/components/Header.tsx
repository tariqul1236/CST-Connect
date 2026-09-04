import React from 'react';
import { 
  Bell, 
  Sparkles, 
  Moon, 
  Sun, 
  Code2, 
  Settings as SettingsIcon,
  Wifi,
  Smartphone
} from 'lucide-react';
import { StudentProfile } from '../types';

interface HeaderProps {
  student: StudentProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAI: () => void;
  onOpenSettings: () => void;
  onOpenFlutterCode: () => void;
  onOpenNotices: () => void;
  unreadNoticesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenAI,
  onOpenSettings,
  onOpenFlutterCode,
  onOpenNotices,
  unreadNoticesCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-emerald-800 dark:bg-emerald-950 text-white shadow-md transition-colors">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* লোগো ও ইনস্টিটিউট নাম */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-inner text-emerald-700 dark:text-emerald-400 font-black text-lg tracking-tighter">
            <span>CST</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold tracking-tight text-white leading-tight">
                CST Connect
              </h1>
              <span className="text-[10px] bg-emerald-700/80 text-emerald-100 px-1.5 py-0.5 rounded-full font-medium">
                NPI
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/90 leading-tight">
              নরসিংদী সরকারি পলিটেকনিক
            </p>
          </div>
        </div>

        {/* ডানপাশের বাটনসমূহ */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Flutter কোড এক্সপ্লোরার */}
          <button
            onClick={onOpenFlutterCode}
            title="Flutter সোর্স কোড ও ফায়ারবেস"
            className="p-2 rounded-full hover:bg-emerald-700/60 active:bg-emerald-700 transition text-emerald-100 flex items-center gap-1 text-xs"
          >
            <Code2 size={19} />
            <span className="hidden md:inline font-medium">Flutter কোড</span>
          </button>

          {/* AI সহকারী বাটন */}
          <button
            onClick={onOpenAI}
            title="AI সহকারী (Gemini AI)"
            className="p-2 rounded-full bg-emerald-700/80 hover:bg-emerald-600 active:scale-95 text-amber-300 transition flex items-center gap-1"
          >
            <Sparkles size={18} className="animate-pulse" />
            <span className="text-xs font-semibold hidden sm:inline text-white">AI শিক্ষক</span>
          </button>

          {/* নোটিফিকেশন বেল */}
          <button
            onClick={onOpenNotices}
            title="বিভাগীয় নোটিশ"
            className="p-2 rounded-full hover:bg-emerald-700/60 active:bg-emerald-700 transition relative text-white"
          >
            <Bell size={19} />
            {unreadNoticesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-emerald-800" />
            )}
          </button>

          {/* থিম পরিবর্তন */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
            className="p-2 rounded-full hover:bg-emerald-700/60 active:bg-emerald-700 transition text-emerald-100"
          >
            {darkMode ? <Sun size={19} className="text-amber-300" /> : <Moon size={19} />}
          </button>

          {/* সেটিংস বাটন */}
          <button
            onClick={onOpenSettings}
            title="সেটিংস"
            className="p-2 rounded-full hover:bg-emerald-700/60 active:bg-emerald-700 transition text-emerald-100"
          >
            <SettingsIcon size={19} />
          </button>
        </div>
      </div>
    </header>
  );
};
