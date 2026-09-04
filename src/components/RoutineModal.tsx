import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  X, 
  Download, 
  WifiOff, 
  Check, 
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { RoutineItem } from '../types';

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine: RoutineItem[];
  semester: string;
  shift: string;
}

const DAYS: RoutineItem['day'][] = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
];

export const RoutineModal: React.FC<RoutineModalProps> = ({
  isOpen,
  onClose,
  routine,
  semester,
  shift,
}) => {
  const [selectedDay, setSelectedDay] = useState<RoutineItem['day']>('রবিবার');
  const [filterLabOnly, setFilterLabOnly] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredRoutine = routine.filter((r) => {
    if (r.day !== selectedDay) return false;
    if (filterLabOnly && !r.isLab) return false;
    return true;
  });

  const handleDownloadOffline = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700/80 rounded-xl">
              <Calendar className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">ক্লাস রুটিন</h2>
              <p className="text-[11px] text-emerald-100/90">
                {semester} • {shift} • নরসিংদী পলিটেকনিক
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-700 active:scale-95 transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline Badge & Controls */}
        <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-300 font-medium">
            <WifiOff className="w-3.5 h-3.5" />
            <span>অফলাইন ক্যাশড মোড (নেট ছাড়াই দেখা যাবে)</span>
          </div>
          <button
            onClick={handleDownloadOffline}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-all text-[11px]"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3 h-3 text-emerald-200" />
                <span>সংরক্ষিত!</span>
              </>
            ) : (
              <>
                <Download className="w-3 h-3" />
                <span>PDF সেভ</span>
              </>
            )}
          </button>
        </div>

        {/* Day Switcher Tab */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 overflow-x-auto scrollbar-none">
          <div className="flex space-x-2">
            {DAYS.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
          <span className="font-medium">
            {selectedDay}-এর মোট {filteredRoutine.length} টি ক্লাস
          </span>
          <button
            onClick={() => setFilterLabOnly(!filterLabOnly)}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded-md border text-[11px] transition-colors ${
              filterLabOnly
                ? 'bg-amber-100 dark:bg-amber-950 border-amber-300 text-amber-900 dark:text-amber-200 font-bold'
                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>শুধু প্র্যাকটিক্যাল ল্যাব</span>
          </button>
        </div>

        {/* Routine Schedule List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredRoutine.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Calendar className="w-10 h-10 mx-auto mb-2 opacity-40 text-emerald-600" />
              <p className="text-sm">এই দিনে কোনো ক্লাস নেই অথবা ফিল্টার অনুযায়ী তথ্য মেলেনি।</p>
            </div>
          ) : (
            filteredRoutine.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      পিরিয়ড {item.period}
                    </span>
                    <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                  {item.isLab ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                      ল্যাব
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      থিওরি
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2 leading-snug">
                  {item.subjectName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  বিষয় কোড: {item.subjectCode}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.teacherName} ({item.teacherInitial})</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.room}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
          রুটিন সংক্রান্ত যেকোনো পরিবর্তনের জন্য বিভাগীয় প্রধান মহোদয়ের কার্যালয়ে যোগাযোগ করুন।
        </div>
      </div>
    </div>
  );
};
