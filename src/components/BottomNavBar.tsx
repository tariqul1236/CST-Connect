import React from 'react';
import { Home, BookOpen, CheckSquare, User } from 'lucide-react';

export type TabType = 'home' | 'notes' | 'assignments' | 'profile';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  assignmentCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  assignmentCount = 0,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'হোম',
      icon: Home,
    },
    {
      id: 'notes' as TabType,
      label: 'নোট',
      icon: BookOpen,
    },
    {
      id: 'assignments' as TabType,
      label: 'অ্যাসাইনমেন্ট',
      icon: CheckSquare,
      badge: assignmentCount,
    },
    {
      id: 'profile' as TabType,
      label: 'প্রোফাইল',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg select-none">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center relative py-1 px-3 group focus:outline-none transition-all"
            >
              {/* Material Design 3 Active Pill */}
              <div
                className={`relative px-5 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-xs">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-xs mt-1 transition-colors ${
                  isActive
                    ? 'font-bold text-emerald-800 dark:text-emerald-300'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
