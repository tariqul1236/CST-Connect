import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  AlertTriangle, 
  Calendar, 
  Check, 
  UserCheck, 
  Award,
  TrendingUp
} from 'lucide-react';
import { AttendanceSubject } from '../types';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendanceData: AttendanceSubject[];
  onQuickCheckIn: (subjectId: string) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  attendanceData,
  onQuickCheckIn,
}) => {
  const [selectedMonth, setSelectedMonth] = useState('আগস্ট-সেপ্টেম্বর ২০২৬');
  const [checkedToday, setCheckedToday] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const totalClasses = attendanceData.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const attendedClasses = attendanceData.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const overallPercentage = Number(((attendedClasses / (totalClasses || 1)) * 100).toFixed(1));

  const handleCheckIn = (id: string) => {
    onQuickCheckIn(id);
    setCheckedToday((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700/80 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">উপস্থিতি ট্র্যাকার</h2>
              <p className="text-[11px] text-emerald-100/90">
                সেমিস্টার ক্লাস উপস্থিতি ও রিপোর্ট
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

        {/* Overall Percentage Card */}
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex flex-col items-center justify-center border border-emerald-200 dark:border-emerald-700 shadow-xs">
              <span className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono leading-none">
                {overallPercentage}%
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 mt-1">গড় হার</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                মোট ক্লাস: {attendedClasses}/{totalClasses} টি
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {overallPercentage >= 75
                  ? 'উপস্থিতি সন্তোষজনক (বোর্ড পরীক্ষার যোগ্য)'
                  : 'সতর্কতা: বোর্ডের শর্তানুযায়ী ৭৫% উপস্থিতি আবশ্যক'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
              overallPercentage >= 80
                ? 'bg-emerald-100 text-emerald-800'
                : overallPercentage >= 70
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {overallPercentage >= 80 ? 'নিয়মিত' : 'মনোযোগ প্রয়োজন'}
            </span>
          </div>
        </div>

        {/* BTEB Rule Notice */}
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/60 flex items-center space-x-2 text-xs text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>কারিগরি বোর্ডের নিয়ম: বোর্ড পরীক্ষায় বসতে ন্যূনতম ৭৫% উপস্থিতি বাধ্যতামূলক।</span>
        </div>

        {/* Subject-wise Attendance List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {attendanceData.map((subject) => {
            const isDoneToday = checkedToday[subject.id];

            return (
              <div
                key={subject.id}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {subject.subjectCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        subject.status === 'উত্তম'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : subject.status === 'সতর্কতা'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      }`}>
                        {subject.status} ({subject.percentage}%)
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {subject.subjectName}
                    </h4>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>উপস্থিত: {subject.attendedClasses} / {subject.totalClasses} ক্লাস</span>
                      <span className="font-mono font-semibold">{subject.percentage}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-1.5 w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          subject.percentage >= 80
                            ? 'bg-emerald-500'
                            : subject.percentage >= 70
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(subject.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Today check-in button */}
                  <div className="shrink-0 flex flex-col items-center pl-2">
                    <button
                      onClick={() => handleCheckIn(subject.id)}
                      disabled={isDoneToday}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                        isDoneToday
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 cursor-default'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95 shadow-xs'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isDoneToday ? 'হাজিরা দেওয়া হয়েছে' : 'আজকের হাজিরা'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
          প্রতিদিনের হাজিরা ডিজিটাল হাজিরা খাতায় নথিভুক্ত হয়।
        </div>
      </div>
    </div>
  );
};
