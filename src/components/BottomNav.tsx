import React from 'react';
import { Home, BookOpen, CheckSquare, User } from 'lucide-react';

export type TabType = 'home' | 'notes' | 'assignments' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  pendingAssignmentsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  pendingAssignmentsCount = 0,
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
      badge: pendingAssignmentsCount > 0 ? pendingAssignmentsCount : undefined,
    },
    {
      id: 'profile' as TabType,
      label: 'প্রোফাইল',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] w-full max-w-full sm:max-w-md mx-auto overflow-x-hidden">
      <div className="flex items-center justify-around px-2 py-1.5 safe-area-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center transition-all duration-200 group relative"
            >
              {/* Material 3 Active Pill Indicator */}
              <div
                className={`relative px-5 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
                }`}
              >
                <Icon size={20} className={isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'} />

                {/* ব্যাজ */}
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-[10px] font-bold bg-emerald-600 text-white rounded-full flex items-center justify-center px-1 ring-2 ring-white dark:ring-slate-900">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* লেবেল */}
              <span
                className={`text-[11px] mt-0.5 tracking-tight transition-colors ${
                  isActive
                    ? 'font-bold text-emerald-800 dark:text-emerald-400'
                    : 'font-medium text-slate-500 dark:text-slate-400'
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
