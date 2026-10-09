import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Bell,
  BellRing,
  Coffee,
  BookOpen,
  Info,
  CheckCircle2,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { RoutineItem } from '../types';
import { 
  WEEKDAYS_WITH_CLASSES, 
  ROUTINE_METADATA, 
  TEACHERS_INFO, 
  SUBJECTS_INFO, 
  PERIODS_INFO,
  getBengaliDayName, 
  getClassTimingStatus 
} from '../data/classRoutineData';

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine: RoutineItem[];
  semester?: string;
  shift?: string;
  onTriggerNotification?: (title: string, message: string) => void;
}

export const RoutineModal: React.FC<RoutineModalProps> = ({
  isOpen,
  onClose,
  routine,
  semester = ROUTINE_METADATA.semester,
  shift = ROUTINE_METADATA.shift,
  onTriggerNotification,
}) => {
  const todayBengali = getBengaliDayName();
  // Default to today if it's a class day; otherwise default to Sunday
  const initialDay: RoutineItem['day'] = WEEKDAYS_WITH_CLASSES.includes(todayBengali) 
    ? todayBengali 
    : 'রবিবার';

  const [selectedDay, setSelectedDay] = useState<RoutineItem['day']>(initialDay);
  const [filterLabOnly, setFilterLabOnly] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeView, setActiveView] = useState<'schedule' | 'teachers'>('schedule');
  
  // Notification Reminder State
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderMinutes, setReminderMinutes] = useState<number>(10);
  const [reminderSavedToast, setReminderSavedToast] = useState(false);

  // Time simulation / test mode for demoing "now ongoing" and "next class"
  const [simulatedTime, setSimulatedTime] = useState<string>('real');

  // Clock updates every minute
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  // Determine effective date/time based on simulated mode
  const effectiveDate = new Date(currentTime);
  if (simulatedTime === '14:00') {
    effectiveDate.setHours(14, 0, 0); // 2:00 PM (Period 1 ongoing)
  } else if (simulatedTime === '15:15') {
    effectiveDate.setHours(15, 15, 0); // 3:15 PM (Period 3 ongoing)
  } else if (simulatedTime === '16:45') {
    effectiveDate.setHours(16, 45, 0); // 4:45 PM (Period 5 ongoing)
  } else if (simulatedTime === '17:30') {
    effectiveDate.setHours(17, 30, 0); // 5:30 PM (Period 6 ongoing)
  }

  const isTodaySelected = selectedDay === todayBengali;
  const dayRoutine = routine.filter((r) => r.day === selectedDay);

  const filteredRoutine = dayRoutine.filter((r) => {
    if (filterLabOnly && !r.isLab) return false;
    return true;
  });

  // Calculate live timing status for the selected day (only active if it's today or simulation is on)
  const timingStatus = getClassTimingStatus(dayRoutine, effectiveDate);

  const handleDownloadOffline = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleTestReminderNotification = () => {
    setReminderSavedToast(true);
    setTimeout(() => setReminderSavedToast(false), 3000);

    const targetClass = timingStatus.ongoingClass || timingStatus.nextClass || dayRoutine[0];
    const notifTitle = targetClass 
      ? `ক্লাস রিমাইন্ডার (${targetClass.periodSpan || 'পিরিয়ড ' + targetClass.period})` 
      : 'CST ক্লাস রিমাইন্ডার';
    const notifMsg = targetClass
      ? `${targetClass.subjectName} (${targetClass.subjectCode}) • শিক্ষক: ${targetClass.teacherName} • রুম: ${targetClass.room} এ ক্লাস শুরু হবে।`
      : 'আপনার পরবর্তী ক্লাসের রিমাইন্ডার চালু আছে।';

    if (onTriggerNotification) {
      onTriggerNotification(notifTitle, notifMsg);
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notifTitle, {
          body: notifMsg,
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.log(e);
      }
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600/80 rounded-2xl border border-emerald-400/30 shadow-xs">
              <Calendar className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">
                  {ROUTINE_METADATA.title}
                </h2>
                <span className="bg-emerald-500/80 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-300/30">
                  {shift}
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90 mt-0.5">
                {ROUTINE_METADATA.department} • {semester} • {ROUTINE_METADATA.institute}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-600/60 active:scale-95 transition-all text-white"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Bar & Offline Controls */}
        <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveView('schedule')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                activeView === 'schedule'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              সাপ্তাহিক রুটিন
            </button>
            <button
              onClick={() => setActiveView('teachers')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                activeView === 'teachers'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              শিক্ষক ও বিষয় তালিকা
            </button>
          </div>

          <button
            onClick={handleDownloadOffline}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100/60 text-[11px] font-semibold transition-all shadow-xs"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>সংরক্ষিত হয়েছে!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>রুটিন PDF সেভ</span>
              </>
            )}
          </button>
        </div>

        {activeView === 'schedule' && (
          <>
            {/* Day Switcher Tab (Sunday to Thursday + Weekend Option) */}
            <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 overflow-x-auto scrollbar-none">
              <div className="flex space-x-1.5 min-w-max">
                {WEEKDAYS_WITH_CLASSES.map((day) => {
                  const isSelected = selectedDay === day;
                  const isToday = todayBengali === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`relative px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/50 scale-[1.02]'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span>{day}</span>
                      {isToday && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                          isSelected ? 'bg-amber-300 text-slate-900' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        }`}>
                          আজ
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Weekend Button (Friday & Saturday) */}
                <button
                  onClick={() => setSelectedDay('শুক্রবার')}
                  className={`px-3 py-2 rounded-2xl text-xs font-medium transition-all ${
                    selectedDay === 'শুক্রবার' || selectedDay === 'শনিবার'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  শুক্র ও শনি (ছুটি)
                </button>
              </div>
            </div>

            {/* Notification Reminder Bar & Timing Status Strip */}
            {selectedDay !== 'শুক্রবার' && selectedDay !== 'শনিবার' && (
              <div className="px-4 py-2 bg-gradient-to-r from-slate-50 to-emerald-50/40 dark:from-slate-900 dark:to-emerald-950/20 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                
                {/* Live Class Indicator */}
                <div className="flex items-center space-x-2">
                  {timingStatus.ongoingClass ? (
                    <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-300 dark:border-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>এখন চলছে: {timingStatus.ongoingClass.subjectName}</span>
                    </div>
                  ) : timingStatus.nextClass ? (
                    <div className="flex items-center space-x-1.5 text-blue-700 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-xl border border-blue-200 dark:border-blue-900">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        পরবর্তী ক্লাস: {timingStatus.nextClass.subjectName} ({timingStatus.nextClass.time})
                      </span>
                    </div>
                  ) : timingStatus.isSchoolOver ? (
                    <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>আজকের সকল নির্ধারিত পিরিয়ড শেষ</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ক্লাস সময়: দুপুর ১:৩০ – সন্ধ্যা ৬:৪৫</span>
                    </div>
                  )}
                </div>

                {/* Reminder Setting Trigger */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleTestReminderNotification}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-[11px] shadow-xs transition-all"
                    title="ক্লাস শুরুর আগে রিমাইন্ডার পাঠানোর টেস্ট করুন"
                  >
                    <BellRing className="w-3 h-3 text-emerald-100" />
                    <span>{reminderMinutes} মি. আগে রিমাইন্ডার</span>
                  </button>
                  <button
                    onClick={() => setFilterLabOnly(!filterLabOnly)}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-xl border text-[11px] transition-colors ${
                      filterLabOnly
                        ? 'bg-amber-100 dark:bg-amber-950 border-amber-300 text-amber-900 dark:text-amber-200 font-bold'
                        : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Filter className="w-3 h-3" />
                    <span>শুধু ল্যাব</span>
                  </button>
                </div>
              </div>
            )}

            {/* Time Simulation Selector (To test Live Ongoing / Next Class) */}
            <div className="px-4 py-1.5 bg-slate-100/70 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>লাইভ টাইম ট্র্যাকিং:</span>
              </span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setSimulatedTime('real')}
                  className={`px-2 py-0.5 rounded-lg font-semibold transition-all ${
                    simulatedTime === 'real'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  রিয়েল টাইম
                </button>
                <button
                  onClick={() => setSimulatedTime('14:00')}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    simulatedTime === '14:00'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                  title="দুপুর ২:০০ টার টেস্ট মোড"
                >
                  ২:০০ টা
                </button>
                <button
                  onClick={() => setSimulatedTime('15:15')}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    simulatedTime === '15:15'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                  title="দুপুর ৩:১৫ এর টেস্ট মোড"
                >
                  ৩:১৫ টা
                </button>
                <button
                  onClick={() => setSimulatedTime('17:30')}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    simulatedTime === '17:30'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                  title="বিকেল ৫:৩০ এর টেস্ট মোড"
                >
                  ৫:৩০ টা
                </button>
              </div>
            </div>

            {/* Notification Toast Confirmation */}
            {reminderSavedToast && (
              <div className="mx-4 mt-3 p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ক্লাস শুরুর {reminderMinutes} মিনিট আগের রিমাইন্ডার অ্যালার্ট সক্রিয় করা হয়েছে!</span>
                </div>
              </div>
            )}

            {/* Routine Schedule List */}
            <div className="p-4 overflow-y-auto space-y-3.5 flex-1">
              
              {/* Weekend Holiday View */}
              {(selectedDay === 'শুক্রবার' || selectedDay === 'শনিবার') ? (
                <div className="text-center py-12 px-4 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center shadow-xs">
                    <Coffee className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      শুক্রবার ও শনিবার — সাপ্তাহিক ছুটি
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                      নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউটের কম্পিউটার ডিপার্টমেন্টের ৩য় সেমিস্টারের কোনো ক্লাস নেই।
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDay('রবিবার')}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-all inline-flex items-center space-x-1.5"
                  >
                    <span>রবিবার-এর রুটিন দেখুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : filteredRoutine.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Calendar className="w-10 h-10 mx-auto mb-2 opacity-40 text-emerald-600" />
                  <p className="text-sm">এই দিনে ফিল্টার অনুযায়ী কোনো ক্লাস মেলেনি।</p>
                </div>
              ) : (
                filteredRoutine.map((item) => {
                  const isOngoing = timingStatus.ongoingClass?.id === item.id;
                  const isNext = timingStatus.nextClass?.id === item.id;

                  if (item.isFree) {
                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs">
                            {item.periodSpan || `পিরিয়ড ${item.period}`}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              {item.subjectName}
                            </span>
                            <div className="text-[11px] font-mono text-slate-400">
                              {item.time} (ফ্রি পিরিয়ড / অবসর সময়)
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                          ক্লাস নেই
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      className={`relative p-4 rounded-3xl border transition-all duration-200 ${
                        isOngoing
                          ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-slate-800/90 border-emerald-500 dark:border-emerald-600 ring-2 ring-emerald-500/30 shadow-md'
                          : isNext
                          ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600/80 shadow-xs ring-1 ring-blue-400/30'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-xs'
                      }`}
                    >
                      {/* Top Badges (Period Span, Time, Status) */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center flex-wrap gap-1.5">
                          {/* Period Span */}
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg shadow-2xs ${
                            isOngoing
                              ? 'bg-emerald-700 text-white'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          }`}>
                            {item.periodSpan || `পিরিয়ড ${item.period}`}
                          </span>

                          {/* Time */}
                          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            {item.time}
                          </span>

                          {/* Theory vs Lab */}
                          {item.isLab ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300/80 dark:border-amber-700">
                              ব্যবহারিক ল্যাব
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              তত্ত্বীয় (থিওরি)
                            </span>
                          )}
                        </div>

                        {/* Live Badges */}
                        <div>
                          {isOngoing && (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              <span>এখন চলছে</span>
                            </span>
                          )}
                          {isNext && (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-xs">
                              <Clock className="w-2.5 h-2.5 text-blue-200" />
                              <span>পরবর্তী ক্লাস</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subject Name & Code */}
                      <div className="mt-1">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {item.subjectName}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          বিষয় কোড: <span className="font-semibold text-emerald-700 dark:text-emerald-400">{item.subjectCode}</span>
                        </p>
                      </div>

                      {/* Footer: Teacher & Room */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                        {/* Teacher with Initial */}
                        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                          <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px]">
                            {item.teacherInitial}
                          </div>
                          <div>
                            <span className="font-semibold">{item.teacherName}</span>
                            <span className="text-[10px] text-slate-400 ml-1">({item.teacherInitial})</span>
                          </div>
                        </div>

                        {/* Classroom / Lab */}
                        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 font-semibold text-emerald-700 dark:text-emerald-300 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{item.room}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Teachers and Subject Directory View */}
        {activeView === 'teachers' && (
          <div className="p-4 overflow-y-auto space-y-4 flex-1">
            {/* Meta info card */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span>ডিপার্টমেন্ট পরিচিতি ও সেমিস্টার তথ্য</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                <div><strong>প্রতিষ্ঠান:</strong> {ROUTINE_METADATA.institute}</div>
                <div><strong>টেকনোলজি:</strong> {ROUTINE_METADATA.department}</div>
                <div><strong>সেমিস্টার:</strong> {ROUTINE_METADATA.semester}</div>
                <div><strong>শিফট:</strong> {ROUTINE_METADATA.shift}</div>
              </div>
            </div>

            {/* Teacher Dictionary */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                <User className="w-4 h-4 text-emerald-600" />
                <span>সম্মানিত শিক্ষকবৃন্দের তালিকা (সংক্ষিপ্ত নাম ও পূর্ণ নাম)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.values(TEACHERS_INFO).map((t) => (
                  <div
                    key={t.initial}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-2xs flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {t.fullName}
                      </h5>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        সংক্ষিপ্ত নাম: {t.initial}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects and Codes */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>বিষয় ও বিষয় কোড তালিকা (৩য় সেমিস্টার)</span>
              </h4>
              <div className="space-y-2">
                {Object.values(SUBJECTS_INFO).map((sub) => (
                  <div
                    key={sub.code}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-2xs flex items-center justify-between"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {sub.name}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        শিক্ষক: {sub.teacherName} ({sub.teacherInitial})
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                      {sub.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Periods Info */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>পিরিয়ডের সময়সূচি (২য় শিফট)</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.values(PERIODS_INFO).map((p) => (
                  <div key={p.periodNumber} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{p.bengaliPeriod}:</span>
                    <span className="ml-1.5 font-mono text-slate-700 dark:text-slate-300">{p.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span className="font-medium">
            {ROUTINE_METADATA.institute} • {ROUTINE_METADATA.title}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-all"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
