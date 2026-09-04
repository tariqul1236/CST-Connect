import React from 'react';
import { 
  Calendar, 
  Bell, 
  CheckCircle2, 
  Calculator, 
  MessageSquare, 
  Award, 
  Sparkles, 
  Clock, 
  MapPin, 
  UserCheck, 
  ChevronRight, 
  Download, 
  FileText,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Code
} from 'lucide-react';
import { 
  StudentProfile, 
  RoutineItem, 
  Notice, 
  Assignment, 
  AttendanceSubject 
} from '../types';

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
  onOpenBatchChat: () => void;
  onOpenQuiz: () => void;
  onOpenAiAssistant: () => void;
  onOpenFlutterCode: () => void;
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
  onOpenBatchChat,
  onOpenQuiz,
  onOpenAiAssistant,
  onOpenFlutterCode,
  onNavigateToTab,
}) => {
  // Overall attendance calculation
  const totalClasses = attendance.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const attendedClasses = attendance.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const overallAttendancePercent = Math.round((attendedClasses / (totalClasses || 1)) * 100);

  // Active assignments
  const pendingAssignments = assignments.filter((a) => a.status === 'চলমান');
  const latestNotice = notices[0];

  const quickActions = [
    {
      title: 'ক্লাস রুটিন',
      subtitle: 'আজকের ও সপ্তাহের',
      icon: Calendar,
      color: 'bg-emerald-500 text-white',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      action: onOpenRoutine,
    },
    {
      title: 'নোটিশ বোর্ড',
      subtitle: 'বিভাগীয় বিজ্ঞপ্তি',
      icon: Bell,
      color: 'bg-blue-500 text-white',
      bgLight: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
      action: onOpenNotices,
    },
    {
      title: 'উপস্থিতি',
      subtitle: `${overallAttendancePercent}% উপস্থিত`,
      icon: CheckCircle2,
      color: 'bg-teal-600 text-white',
      bgLight: 'bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800',
      action: onOpenAttendance,
    },
    {
      title: 'CGPA ক্যালকুলেটর',
      subtitle: 'BTEB প্রবিধান',
      icon: Calculator,
      color: 'bg-amber-500 text-white',
      bgLight: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
      action: onOpenCgpa,
    },
    {
      title: 'ব্যাচ চ্যাট',
      subtitle: 'CST সহপাঠী গ্রুপ',
      icon: MessageSquare,
      color: 'bg-indigo-500 text-white',
      bgLight: 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800',
      action: onOpenBatchChat,
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
      title: 'AI ল্যাব সহকারী',
      subtitle: 'কোড ব্যাখ্যা ও ভাইভা',
      icon: Sparkles,
      color: 'bg-purple-600 text-white',
      bgLight: 'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800',
      action: onOpenAiAssistant,
    },
    {
      title: 'Flutter কোড',
      subtitle: 'সোর্স কোড ও জিপ',
      icon: Code,
      color: 'bg-cyan-600 text-white',
      bgLight: 'bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800',
      action: onOpenFlutterCode,
    },
  ];

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* 1. Student Identity Header Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-5 shadow-lg border border-emerald-600/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center space-x-4 relative z-10">
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-16 h-16 rounded-full border-2 border-white/80 object-cover shadow-md"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-900/60 font-semibold border border-emerald-400/30 text-emerald-200">
                {student.semester}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-medium text-white">
                {student.shift} ({student.group})
              </span>
            </div>
            <h2 className="text-lg font-bold truncate mt-1 text-white leading-snug">
              {student.name}
            </h2>
            <p className="text-xs text-emerald-100/90 flex items-center gap-2 mt-0.5">
              <span>রোল: <strong className="text-white font-mono">{student.studentId}</strong></span>
              <span>•</span>
              <span>রেজি: <strong className="text-white font-mono">{student.registrationNo}</strong></span>
            </p>
          </div>
        </div>

        {/* Quick Meta Row */}
        <div className="mt-4 pt-3 border-t border-emerald-600/50 flex items-center justify-between text-xs text-emerald-100">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>মোট উপস্থিতি: <strong className="text-white font-semibold">{overallAttendancePercent}%</strong></span>
          </div>
          <button
            onClick={onOpenAttendance}
            className="text-[11px] underline hover:text-white transition-colors"
          >
            বিস্তারিত হিসাব
          </button>
        </div>
      </div>

      {/* 2. Quick Actions Grid */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            দ্রুত অপশনসমূহ
          </h3>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">৮টি ফিচার</span>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-150 hover:shadow-md hover:scale-[1.02] active:scale-95 ${item.bgLight}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 shadow-sm ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
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
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                আজকের ক্লাস রুটিন (রবিবার)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {todayRoutine.length} টি নির্ধারিত পিরিয়ড
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

        <div className="space-y-2.5">
          {todayRoutine.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all ${
                idx === 0
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 ring-1 ring-emerald-400/40'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-700 text-white">
                      পিরিয়ড {item.period}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                      {item.time}
                    </span>
                    {item.isLab && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                        ব্যবহারিক ল্যাব
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {item.subjectName} ({item.subjectCode})
                  </h4>
                  <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-slate-400" />
                      {item.teacherName}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                      <MapPin className="w-3 h-3" />
                      {item.room}
                    </span>
                  </div>
                </div>

                {idx === 0 && (
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-600 text-white animate-pulse">
                    চলমান
                  </span>
                )}
              </div>
            </div>
          ))}
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

      {/* 6. AI Lab Assistant Promo Card */}
      <div 
        onClick={onOpenAiAssistant}
        className="rounded-2xl p-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-green-800 text-white cursor-pointer shadow-md hover:shadow-lg transition-all flex items-center justify-between group"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs border border-white/20">
            <Sparkles className="w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
              AI চালিত সহায়তা
            </span>
            <h4 className="text-sm font-bold text-white leading-tight">
              C/C++ কোড ব্যাখ্যা ও ল্যাব ভাইভা প্র্যাকটিস
            </h4>
            <p className="text-[11px] text-emerald-100 mt-0.5">
              যেকোনো কোড পেস্ট করে বাংলায় বিস্তারিত জেনে নিন
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};
