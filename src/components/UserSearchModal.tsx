import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  MessageSquare, 
  UserCheck, 
  GraduationCap, 
  Sparkles, 
  Loader2,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { searchStudents } from '../services/chatService';
import { AppUser } from '../types';

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (otherUser: AppUser) => void;
}

export const UserSearchModal: React.FC<UserSearchModalProps> = ({
  isOpen,
  onClose,
  onStartChat,
}) => {
  const { userProfile, currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      loadStudents(searchTerm);
    }
  }, [isOpen, searchTerm, currentUser]);

  const loadStudents = async (query: string) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const list = await searchStudents(query, currentUser.uid);
      setResults(list);
    } catch (err) {
      console.error('Failed to search students:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <Users className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">শিক্ষার্থী খুঁজুন</h2>
              <p className="text-[11px] text-emerald-100/80">
                নাম অথবা Student ID / রোল দিয়ে সহপাঠী খুঁজুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="শিক্ষার্থীর নাম বা রোল নম্বর লিখুন..."
              className="w-full pl-10 pr-9 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100 shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Students Result List */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
              <span className="text-xs">সহপাঠীদের তালিকা লোড হচ্ছে...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {searchTerm ? 'কোনো শিক্ষার্থী পাওয়া যায়নি' : 'খুঁজতে নাম বা রোল টাইপ করুন'}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {searchTerm
                  ? `"${searchTerm}" দিয়ে নিবন্ধিত কোনো শিক্ষার্থী পাওয়া যায়নি।`
                  : 'অন্যান্য শিক্ষার্থীরা সাইন আপ বা অ্যাকাউন্ট তৈরি করলে তাদের এখানে দেখতে পাবেন।'}
              </p>
            </div>
          ) : (
            results.map((student) => {
              const avatar =
                student.profileImage ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(student.name)}`;

              return (
                <div
                  key={student.uid}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 flex items-center justify-between shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={avatar}
                        alt={student.name}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                      />
                      {student.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          {student.name}
                        </h4>
                        {student.online ? (
                          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded-full">
                            অনলাইন
                          </span>
                        ) : null}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="font-medium text-emerald-700 dark:text-emerald-400">
                          রোল: {student.studentId}
                        </span>
                        <span>•</span>
                        <span>{student.semester || '৩য় সেমিস্টার'}</span>
                        <span>•</span>
                        <span>{student.shift || '২য় শিফট'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onStartChat(student);
                      onClose();
                    }}
                    className="shrink-0 ml-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>চ্যাট করুন</span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 text-center">
          নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট • CST কমিউনিটি
        </div>
      </div>
    </div>
  );
};
