import React from 'react';
import { 
  Calendar, 
  Bell, 
  CheckCircle2, 
  Calculator, 
  Award, 
  Clock, 
  MapPin, 
  UserCheck, 
  ChevronRight, 
  FileText,
  BookOpen,
  CheckSquare,
  Code,
  Smartphone,
  School
} from 'lucide-react';
import { 
  StudentProfile, 
  RoutineItem, 
  Notice, 
  Assignment, 
  AttendanceSubject 
} from '../types';
import { 
  getBengaliDayName, 
  getClassTimingStatus, 
  ROUTINE_METADATA, 
  WEEKDAYS_WITH_CLASSES 
} from '../data/classRoutineData';

interface HomeTabProps {
  student: StudentProfile;
  todayRoutine: RoutineItem[];
  notices: Notice[];
  assignments: Assignment[];
  attendance: AttendanceSubject[];
  onOpenRoutine: () => void;
  onOpenNotices: () => void;
  onOpenAttendance: () => void;
  onOpenCgpa: () => void;
  onOpenQuiz: () => void;
  onOpenFlutterCode: () => void;
  onOpenApkModal: () => void;
  onNavigateToTab: (tab: 'notes' | 'assignments') => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  student,
  todayRoutine,
  notices,
  assignments,
  attendance,
  onOpenRoutine,
  onOpenNotices,
  onOpenAttendance,
  onOpenCgpa,
  onOpenQuiz,
  onOpenFlutterCode,
  onOpenApkModal,
  onNavigateToTab,
}) => {
  // Overall attendance calculation
  const totalClasses = attendance.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const attendedClasses = attendance.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const overallAttendancePercent = Math.round((attendedClasses / (totalClasses || 1)) * 100);

  // Active assignments
  const pendingAssignments = assignments.filter((a) => a.status === 'চলমান');
  const latestNotice = notices[0];

  // Timing status for today's classes
  const currentDayName = getBengaliDayName();
  const isWeekend = !WEEKDAYS_WITH_CLASSES.includes(currentDayName);
  const timingStatus = getClassTimingStatus(todayRoutine);

  const quickActions = [
    {
      title: 'ক্লাস রুটিন',
      subtitle: 'আজকের ও সপ্তাহের',
      icon: Calendar,
      color: 'bg-emerald-600 text-white',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      action: onOpenRoutine,
    },
    {
      title: 'নোটিশ বোর্ড',
      subtitle: 'বিভাগীয় বিজ্ঞপ্তি',
      icon: Bell,
      color: 'bg-blue-600 text-white',
      bgLight: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
      action: onOpenNotices,
    },
    {
      title: 'নোটস ও বই',
      subtitle: 'বিষয়ভিত্তিক PDF',
      icon: BookOpen,
      color: 'bg-teal-600 text-white',
      bgLight: 'bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800',
      action: () => onNavigateToTab('notes'),
    },
    {
      title: 'অ্যাসাইনমেন্ট',
      subtitle: 'কাজ ও জমা ট্র্যাকার',
      icon: CheckSquare,
      color: 'bg-amber-600 text-white',
      bgLight: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
      action: () => onNavigateToTab('assignments'),
    },
    {
      title: 'উপস্থিতি',
      subtitle: `${overallAttendancePercent}% উপস্থিত`,
      icon: CheckCircle2,
      color: 'bg-emerald-500 text-white',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      action: onOpenAttendance,
    },
    {
      title: 'CGPA ক্যালকুলেটর',
      subtitle: 'BTEB প্রবিধান',
      icon: Calculator,
      color: 'bg-indigo-600 text-white',
      bgLight: 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800',
      action: onOpenCgpa,
    },
    {
      title: 'প্রোগ্রামিং কুইজ',
      subtitle: 'C, C++, Python',
      icon: Award,
      color: 'bg-rose-500 text-white',
      bgLight: 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800',
      action: onOpenQuiz,
    },
    {
      title: 'অ্যাপ ডাউনলোড',
      subtitle: 'অ্যান্ড্রয়েড APK',
      icon: Smartphone,
      color: 'bg-teal-600 text-white',
      bgLight: 'bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800',
      action: onOpenApkModal,
    },
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-5 pb-8 animate-fadeIn overflow-x-hidden">
      {/* 1. Academic Dashboard Header Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-3.5 sm:p-5 shadow-lg border border-emerald-600/30 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center space-x-3 sm:space-x-3.5 relative z-10 min-w-0">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
            <School className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-200" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1 sm:space-x-1.5 flex-wrap gap-y-1">
              <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-900/70 font-semibold border border-emerald-400/30 text-emerald-200">
                কম্পিউটার (CST)
              </span>
              <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-white/20 font-medium text-white">
                ১ম ও ২য় শিফট
              </span>
              <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/30 font-medium text-emerald-100">
                ৩য় সেমিস্টার
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold truncate mt-1 text-white leading-snug">
              CST Connect ড্যাশবোর্ড
            </h2>
            <p className="text-[10px] sm:text-xs text-emerald-100/90 mt-0.5 truncate">
              নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট • বিটিইবি ডিপ্লোমা
            </p>
          </div>
        </div>

        {/* Quick Meta Row with Attendance and Schedule Status */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-emerald-600/50 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-emerald-100">
          <div className="flex items-center space-x-1.5 min-w-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="truncate">গড় উপস্থিতি: <strong className="text-white font-semibold">{overallAttendancePercent}%</strong></span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] sm:text-[11px] bg-white/15 px-2 py-0.5 rounded-lg text-emerald-100 shrink-0">
            <Clock className="w-3 h-3 text-emerald-300" />
            <span>{currentDayName}: {isWeekend ? 'সাপ্তাহিক ছুটি' : `${todayRoutine.filter(r => !r.isFree).length}টি ক্লাস`}</span>
          </div>
        </div>
      </div>

      {/* Android APK & Mobile Installation Banner */}
      <div 
        onClick={onOpenApkModal}
        className="rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all group border border-emerald-400/30 min-w-0"
      >
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 flex-1 mr-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-xs shrink-0">
            <Smartphone className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1.5 flex-wrap">
              <h4 className="text-xs font-bold text-white truncate">
                Android APK ডাউনলোড ও ফোনে ইনস্টল
              </h4>
              <span className="bg-amber-400 text-slate-900 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full shrink-0">
                NEW
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-emerald-100/90 mt-0.5 line-clamp-1">
              অ্যান্ড্রয়েড .APK ডাউনলোড ও ডিভাইসে সরাসরি ইনস্টল
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform shrink-0" />
      </div>

      {/* 2. Quick Actions Grid */}
      <section className="w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between mb-2 sm:mb-2.5">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
            দ্রুত অপশনসমূহ
          </h3>
          <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">৮টি ফিচার</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 w-full">
          {quickActions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className={`flex flex-col items-center justify-center p-1 sm:p-2.5 rounded-xl border text-center transition-all duration-150 hover:shadow-md hover:scale-[1.02] active:scale-95 min-w-0 w-full overflow-hidden ${item.bgLight}`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-1 sm:mb-1.5 shadow-sm shrink-0 ${item.color}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 truncate w-full block text-center">
                  {item.title}
                </span>
                <span className="text-[8.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate w-full block text-center mt-0.5">
                  {item.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Today's Class Routine */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  আজকের ক্লাস রুটিন ({todayRoutine[0]?.day || currentDayName})
                </h3>
                {isWeekend && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-300/40">
                    ছুটি
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isWeekend 
                  ? 'আজ সাপ্তাহিক ছুটি • আগামী রবিবারের রুটিন প্রদর্শিত হচ্ছে'
                  : `${todayRoutine.filter(r => !r.isFree).length} টি নির্ধারিত ক্লাস • ${ROUTINE_METADATA.shift}`}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenRoutine}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center hover:underline"
          >
            সব রুটিন <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Live Ongoing Class Banner if currently active */}
        {timingStatus.ongoingClass && (
          <div className="mb-3 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between text-xs shadow-xs animate-fadeIn">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <div>
                <span className="font-extrabold uppercase tracking-wide text-[10px] bg-white/20 px-1.5 py-0.2 rounded mr-1.5">
                  এখন চলছে
                </span>
                <span className="font-bold">{timingStatus.ongoingClass.subjectName}</span>
              </div>
            </div>
            <span className="font-mono text-[11px] font-semibold bg-emerald-800/60 px-2 py-0.5 rounded-md">
              {timingStatus.ongoingClass.room}
            </span>
          </div>
        )}

        {/* Weekend Notice if today is Friday or Saturday */}
        {isWeekend && (
          <div className="mb-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center space-x-2">
              <span className="text-base">☕</span>
              <span>আজকের দিনটি সাপ্তাহিক ছুটি (শুক্রবার/শনিবার)। নিচে আগামী রবিবার-এর ক্লাসের প্রস্তুতি তালিকা দেওয়া হলো।</span>
            </div>
          </div>
        )}

        <div className="space-y-2.5">
          {todayRoutine.map((item) => {
            const isOngoing = timingStatus.ongoingClass?.id === item.id;
            const isNext = timingStatus.nextClass?.id === item.id;

            if (item.isFree) {
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs min-w-0"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1 mr-2">
                    <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0">
                      {item.periodSpan || `পিরিয়ড ${item.period}`}
                    </span>
                    <span className="font-mono text-slate-400 shrink-0">{item.time}</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium truncate">
                      {item.subjectName}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium shrink-0">
                    অবসর
                  </span>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-all min-w-0 ${
                  isOngoing
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-400/40 shadow-xs'
                    : isNext
                    ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between min-w-0">
                  <div className="flex-1 pr-2 min-w-0">
                    <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1 flex-wrap gap-y-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        isOngoing ? 'bg-emerald-700 text-white' : 'bg-emerald-700 text-white'
                      }`}>
                        {item.periodSpan || `পিরিয়ড ${item.period}`}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                        {item.time}
                      </span>
                      {item.isLab ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shrink-0">
                          ব্যবহারিক ল্যাব
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                          তত্ত্বীয়
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-1">
                      {item.subjectName} ({item.subjectCode})
                    </h4>
                    <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-2 sm:gap-x-3 text-[11px] text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-medium truncate">
                        <UserCheck className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.teacherName} ({item.teacherInitial})</span>
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{item.room}</span>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isOngoing && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>এখন চলছে</span>
                      </span>
                    )}
                    {isNext && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                        <span>পরবর্তী</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Department Notice Preview */}
      {latestNotice && (
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                বিভাগীয় নোটিশ বোর্ড
              </h3>
            </div>
            <button
              onClick={onOpenNotices}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center hover:underline"
            >
              সকল নোটিশ <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                {latestNotice.category}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {latestNotice.date}
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {latestNotice.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
              {latestNotice.content}
            </p>
            <div className="mt-2.5 pt-2 border-t border-blue-200 dark:border-blue-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                প্রকাশক: {latestNotice.publishedBy}
              </span>
              <button
                onClick={onOpenNotices}
                className="text-xs font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1 hover:underline"
              >
                বিস্তারিত পড়ুন
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. Upcoming Assignments */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                আসন্ন অ্যাসাইনমেন্ট
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {pendingAssignments.length} টি কাজ জমা দেওয়া বাকি
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab('assignments')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center hover:underline"
          >
            অ্যাসাইনমেন্ট ট্র্যাকার <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="space-y-2">
          {pendingAssignments.slice(0, 2).map((assignment) => (
            <div
              key={assignment.id}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between"
            >
              <div className="flex-1 pr-2">
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  {assignment.subjectName}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1 mt-0.5">
                  {assignment.title}
                </h4>
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>শিক্ষক: {assignment.teacherName}</span>
                  <span>•</span>
                  <span>জমা: {assignment.dueDate}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  assignment.daysRemaining <= 3
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                }`}>
                  {assignment.daysRemaining} দিন বাকি
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
