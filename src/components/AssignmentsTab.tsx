import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  X, 
  Bell, 
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { Assignment } from '../types';

interface AssignmentsTabProps {
  assignments: Assignment[];
  onToggleStatus: (id: string) => void;
  onAddAssignment: (newAssignment: Assignment) => void;
  onSendReminder: (title: string, daysLeft: number) => void;
}

export const AssignmentsTab: React.FC<AssignmentsTabProps> = ({
  assignments,
  onToggleStatus,
  onAddAssignment,
  onSendReminder,
}) => {
  const [filter, setFilter] = useState<'সব' | 'চলমান' | 'সম্পন্ন'>('সব');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [reminderAlert, setReminderAlert] = useState<string | null>(null);

  // New Assignment Form State
  const [title, setTitle] = useState('');
  const [subjectName, setSubjectName] = useState('ডাটা স্ট্রাকচার অ্যান্ড অ্যালগরিদম');
  const [subjectCode, setSubjectCode] = useState('২৮৫৮১');
  const [teacherName, setTeacherName] = useState('প্রকৌ. মোঃ তরিকুল ইসলাম');
  const [dueDate, setDueDate] = useState('১২ সেপ্টেম্বর ২০২৬');
  const [daysRemaining, setDaysRemaining] = useState(7);
  const [description, setDescription] = useState('');
  const [maxMarks, setMaxMarks] = useState(20);

  const filteredAssignments = assignments.filter((a) => {
    if (filter === 'সব') return true;
    return a.status === filter;
  });

  const completedCount = assignments.filter((a) => a.status === 'সম্পন্ন').length;
  const totalCount = assignments.length;
  const completionPercentage = Math.round((completedCount / (totalCount || 1)) * 100);

  const handleReminderClick = (a: Assignment) => {
    onSendReminder(a.title, a.daysRemaining);
    setReminderAlert(`"${a.title}"-এর জন্য রিমাইন্ডার সেট করা হয়েছে!`);
    setTimeout(() => setReminderAlert(null), 3000);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAssignment: Assignment = {
      id: `as-${Date.now()}`,
      title,
      subjectCode,
      subjectName,
      teacherName,
      assignedDate: 'আজ',
      dueDate,
      daysRemaining,
      status: 'চলমান',
      description: description || 'ক্লাসের নির্দেশনানুযায়ী প্র্যাকটিক্যাল রিপোর্ট বা অ্যাসাইনমেন্ট জমা দিন।',
      maxMarks,
    };

    onAddAssignment(newAssignment);
    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-300" />
            অ্যাসাইনমেন্ট ট্র্যাকার
          </h2>
          <p className="text-xs text-emerald-100/90 mt-0.5">
            সময়মতো ল্যাব রিপোর্ট ও অ্যাসাইনমেন্ট সম্পন্ন করুন
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 transition-all text-xs font-bold shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>নতুন যোগ</span>
        </button>
      </div>

      {/* Progress & Reminder Toast */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            অগ্রগতি: {completedCount}/{totalCount} টি সম্পন্ন
          </span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {reminderAlert && (
        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-xl flex items-center space-x-2 border border-emerald-300 dark:border-emerald-700 animate-fadeIn">
          <Bell className="w-4 h-4 text-emerald-600" />
          <span>{reminderAlert}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex space-x-2 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl">
        {(['সব', 'চলমান', 'সম্পন্ন'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === tab
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            {tab === 'সব' ? `সকল (${assignments.length})` : tab === 'চলমান' ? `চলমান (${assignments.filter(a => a.status === 'চলমান').length})` : `সম্পন্ন (${assignments.filter(a => a.status === 'সম্পন্ন').length})`}
          </button>
        ))}
      </div>

      {/* Assignment Cards */}
      <div className="space-y-3">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-slate-400">
            <CheckSquare className="w-10 h-10 mx-auto mb-2 text-emerald-500 opacity-40" />
            <p className="text-sm font-semibold">কোনো অ্যাসাইনমেন্ট নেই।</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => {
            const isCompleted = assignment.status === 'সম্পন্ন';
            const isUrgent = assignment.daysRemaining <= 3 && !isCompleted;

            return (
              <div
                key={assignment.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-4 border transition-all ${
                  isCompleted
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : isUrgent
                    ? 'border-rose-300 dark:border-rose-800 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {assignment.subjectCode}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        {assignment.subjectName}
                      </span>
                    </div>

                    <h3
                      className={`text-xs font-bold leading-snug mt-1 ${
                        isCompleted
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {assignment.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {assignment.description}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>শিক্ষক: {assignment.teacherName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        জমা: {assignment.dueDate}
                      </span>
                      <span>•</span>
                      <span>নম্বর: {assignment.maxMarks}</span>
                    </div>
                  </div>

                  {/* Status Badge & Check */}
                  <div className="flex flex-col items-end space-y-2">
                    {isCompleted ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> সম্পন্ন
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isUrgent
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 animate-pulse'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {assignment.daysRemaining} দিন বাকি
                      </span>
                    )}

                    <button
                      onClick={() => onToggleStatus(assignment.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-600 border-slate-300 dark:border-slate-700'
                      }`}
                      title={isCompleted ? 'চলমান করুন' : 'সম্পন্ন মার্ক করুন'}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer action */}
                {!isCompleted && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">
                      নির্ধারিত তারিখের আগে ল্যাব রুমে জমা দিন
                    </span>
                    <button
                      onClick={() => handleReminderClick(assignment)}
                      className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      <Bell className="w-3 h-3" />
                      <span>রিমাইন্ডার দিন</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Assignment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">নতুন অ্যাসাইনমেন্ট যুক্ত করুন</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-emerald-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  অ্যাসাইনমেন্টের নাম / বিষয়বস্তু *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: স্ট্যাক ও কিউ বাস্তবায়ন"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    বিষয়ের নাম
                  </label>
                  <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    শিক্ষকের নাম
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    জমা দেওয়ার শেষ তারিখ
                  </label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    বাকি দিন (Days)
                  </label>
                  <input
                    type="number"
                    value={daysRemaining}
                    onChange={(e) => setDaysRemaining(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  বিবরণ
                </label>
                <textarea
                  rows={2}
                  placeholder="অ্যাসাইনমেন্টের প্রয়োজনীয় নির্দেশাবলি লিখুন..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
