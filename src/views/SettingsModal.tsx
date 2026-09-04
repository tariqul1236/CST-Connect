import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  HelpCircle, 
  MessageSquare, 
  LogOut, 
  ShieldCheck, 
  Check, 
  ChevronRight,
  Database,
  Smartphone
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  onLogout,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState(true);
  const [currentSubView, setCurrentSubView] = useState<'main' | 'password' | 'help' | 'feedback'>('main');

  // পাসওয়ার্ড স্টেট
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // মতামত স্টেট
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setCurrentSubView('main');
      setOldPassword('');
      setNewPassword('');
    }, 1500);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setCurrentSubView('main');
      setFeedbackText('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95">
        {/* মোডাল হেডার */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {currentSubView === 'main' && 'অ্যাপ সেটিংস'}
              {currentSubView === 'password' && 'পাসওয়ার্ড পরিবর্তন'}
              {currentSubView === 'help' && 'সাহায্য ও জিজ্ঞাসা'}
              {currentSubView === 'feedback' && 'মতামত ও পরামর্শ'}
            </h3>
          </div>
          <button
            onClick={() => {
              if (currentSubView !== 'main') {
                setCurrentSubView('main');
              } else {
                onClose();
              }
            }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* কনটেন্ট বডি */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
          {/* ১. মূল সেটিংস ভিউ */}
          {currentSubView === 'main' && (
            <>
              {/* ভাষা */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                    <Globe size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">ভাষা (Language)</h4>
                    <p className="text-[11px] text-slate-500">অ্যাপের সার্বিক ডিসপ্লে ভাষা</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  বাংলা (বাংলা)
                </span>
              </div>

              {/* ডার্ক মোড */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center">
                    {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">ডার্ক মোড</h4>
                    <p className="text-[11px] text-slate-500">রাতের বেলায় চোখের স্বস্তি</p>
                  </div>
                </div>
                <button
                  onClick={onToggleDarkMode}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    darkMode ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* পুশ নোটিফিকেশন */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 flex items-center justify-center">
                    <Bell size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">পুশ নোটিফিকেশন</h4>
                    <p className="text-[11px] text-slate-500">নোটিশ ও অ্যাসাইনমেন্টের সতর্কবার্তা</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    notificationsEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                      notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* অফলাইন ক্যাশ */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-400 flex items-center justify-center">
                    <Database size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">অফলাইন ক্যাশিং</h4>
                    <p className="text-[11px] text-slate-500">রুটিন ও নোট ইন্টারনেট ছাড়া দেখুন</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <Check size={14} /> সক্রিয়
                </span>
              </div>

              {/* পাসওয়ার্ড পরিবর্তন মেনু */}
              <button
                onClick={() => setCurrentSubView('password')}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 flex items-center justify-center">
                    <Lock size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">পাসওয়ার্ড পরিবর্তন</h4>
                    <p className="text-[11px] text-slate-500">ছাত্র অ্যাকাউন্টের পিন বা পাসওয়ার্ড</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              {/* সাহায্য ও FAQ */}
              <button
                onClick={() => setCurrentSubView('help')}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-400 flex items-center justify-center">
                    <HelpCircle size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">সাহায্য ও সাধারণ জিজ্ঞাসা</h4>
                    <p className="text-[11px] text-slate-500">ব্যবহারবিধি ও গাইডলাইন</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              {/* মতামত */}
              <button
                onClick={() => setCurrentSubView('feedback')}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400 flex items-center justify-center">
                    <MessageSquare size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">মতামত ও পরামর্শ</h4>
                    <p className="text-[11px] text-slate-500">ডিপার্টমেন্টের কাছে ফিডব্যাক পাঠান</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              {/* লগ আউট */}
              <div className="pt-2">
                <button
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-900 flex items-center justify-center gap-2 transition"
                >
                  <LogOut size={16} />
                  <span>লগ আউট করুন</span>
                </button>
              </div>
            </>
          )}

          {/* ২. পাসওয়ার্ড পরিবর্তন ভিউ */}
          {currentSubView === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  বর্তমান পাসওয়ার্ড / পিন
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="বর্তমান পাসওয়ার্ড দিন"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="কমপক্ষে ৬ ডিজিটের নতুন পাসওয়ার্ড"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              {passwordSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 font-bold text-center">
                  ✓ পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold shadow-xs transition"
              >
                পাসওয়ার্ড সংরক্ষণ করুন
              </button>
            </form>
          )}

          {/* ৩. সাহায্য ও FAQ ভিউ */}
          {currentSubView === 'help' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                <h5 className="font-bold text-slate-900 dark:text-slate-100">
                  ১. ইন্টারনেট ছাড়া কি রুটিন দেখা যাবে?
                </h5>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  হ্যাঁ, CST Connect অ্যাপের ক্লাস রুটিন ও নোটিশ স্বয়ংক্রিয়ভাবে অফলাইনে ক্যাশ করা থাকে। ফলে নেট না থাকলেও আপনি সাপ্তাহিক শিডিউল দেখতে পারবেন।
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                <h5 className="font-bold text-slate-900 dark:text-slate-100">
                  ২. CGPA কিভাবে হিসাব করা হয়?
                </h5>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) এর ডিপ্লোমা ইন ইঞ্জিনিয়ারিং ২০১৬ ও ২০২২ প্রবিধানের অফিসিয়াল ওয়েটেজ অনুপাত অনুযায়ী স্বয়ংক্রিয়ভাবে CGPA হিসাব করা হয়।
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                <h5 className="font-bold text-slate-900 dark:text-slate-100">
                  ৩. AI শিক্ষক কিভাবে কাজ করে?
                </h5>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Google Gemini AI এর সাহায্যে সি ও সি++ কোড বাংলায় পয়েন্ট আকারে ভেঙে বুঝিয়ে দেয়া হয় এবং ল্যাব ভাইভার জন্য তাৎক্ষণিক প্র্যাকটিস সেশন পরিচালনা করা হয়।
                </p>
              </div>
            </div>
          )}

          {/* ৪. মতামত ও ফিডব্যাক ভিউ */}
          {currentSubView === 'feedback' && (
            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  আপনার মতামত বা পরামর্শ বাংলায় লিখুন:
                </label>
                <textarea
                  rows={5}
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="CST Connect অ্যাপকে আরও উন্নত করতে আপনার কোনো পরামর্শ বা অভিযোগ থাকলে জানান..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs leading-relaxed"
                />
              </div>

              {feedbackSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 font-bold text-center">
                  ✓ আপনার মতামত নরসিংদী পলিটেকনিক CST ডিপার্টমেন্টে পাঠানো হয়েছে!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold shadow-xs transition"
              >
                মতামত পাঠান
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
