import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  HelpCircle, 
  MessageSquareHeart, 
  LogOut, 
  Shield, 
  Award, 
  Check, 
  X, 
  Code2, 
  Download, 
  Smartphone,
  ChevronRight,
  School,
  Mail,
  Phone,
  Droplet
} from 'lucide-react';
import { StudentProfile, AppSettings } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProfileTabProps {
  student: StudentProfile;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onOpenFlutterCode: () => void;
  onOpenApkModal: () => void;
  onOpenAuthModal?: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  student,
  settings,
  onUpdateSettings,
  onOpenFlutterCode,
  onOpenApkModal,
  onOpenAuthModal,
}) => {
  const { logout, userProfile, currentUser } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert('নতুন পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }
    setIsPasswordModalOpen(false);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    triggerToast('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setIsFeedbackModalOpen(false);
    setFeedbackText('');
    triggerToast('আপনার মূল্যবান মতামতের জন্য ধন্যবাদ!');
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3 bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-md">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            {toastMessage}
          </span>
          <button onClick={() => setToastMessage(null)}>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Profile ID Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-18 h-18 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-white">
              CST
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              শিক্ষার্থী প্রোফাইল
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1 truncate">
              {student.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {student.department}
            </p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              {student.institute}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 block">বোর্ড রোল নম্বর</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              {student.studentId}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 block">রেজিস্ট্রেশন নম্বর</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              {student.registrationNo}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 block">সেমিস্টার ও শিফট</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {student.semester} ({student.shift})
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 block">গ্রুপ ও রক্ত</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              গ্রুপ {student.group} • {student.bloodGroup}
            </span>
          </div>
        </div>
      </div>

      {/* Android APK & Install Banner */}
      <div 
        onClick={onOpenApkModal}
        className="rounded-2xl p-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all group border border-emerald-500/40"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center shadow-xs">
            <Smartphone className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-bold text-white">
                Android APK ও মোবাইল ইনস্টলেশন
              </h4>
              <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                APK Ready
              </span>
            </div>
            <p className="text-[11px] text-emerald-100">
              অফিশিয়াল .APK ফাইল ডাউনলোড ও ডিভাইসে সরাসরি ইনস্টল
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-white/80" />
      </div>

      {/* Developer / Project Source Code Banner */}
      <div 
        onClick={onOpenFlutterCode}
        className="rounded-2xl p-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all group border border-slate-700"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Code2 className="w-5 h-5 text-emerald-300 group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">
              Flutter ও Firebase আর্কিটেকচার কোড
            </h4>
            <p className="text-[11px] text-emerald-100">
              সম্পূর্ণ সোর্স কোড দেখুন ও সরাসরি জিপ (.ZIP) ডাউনলোড করুন
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-white/80" />
      </div>

      {/* Settings Section (সম্পূর্ণ বাংলায়) */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-600" />
          অ্যাপ সেটিংস (বাংলায়)
        </h3>

        {/* 1. Language */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">ভাষা (Language)</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">অ্যাপের প্রধান ভাষা</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            বাংলা
          </span>
        </div>

        {/* 2. Dark Mode Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            {settings.darkMode ? (
              <Moon className="w-4 h-4 text-amber-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            <div>
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">ডার্ক মোড</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {settings.darkMode ? 'ডার্ক থিম সক্রিয়' : 'লাইট থিম সক্রিয়'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onUpdateSettings({ ...settings, darkMode: !settings.darkMode })}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              settings.darkMode ? 'bg-emerald-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-xs"></div>
          </button>
        </div>

        {/* 3. Notification Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <Bell className="w-4 h-4 text-blue-500" />
            <div>
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                নোটিফিকেশন ও অ্যালার্ট
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                নোটিশ ও অ্যাসাইনমেন্টের রিমাইন্ডার
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onUpdateSettings({
                ...settings,
                notificationsEnabled: !settings.notificationsEnabled,
              })
            }
            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              settings.notificationsEnabled
                ? 'bg-emerald-600 justify-end'
                : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-xs"></div>
          </button>
        </div>

        {/* 4. Change Password */}
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-1 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            <div>
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                পাসওয়ার্ড পরিবর্তন
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                অ্যাকাউন্টের নিরাপত্তা আপডেট করুন
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* 5. Help & Guide */}
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-1 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <div>
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">সাহায্য ও গাইড</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                অ্যাপ ব্যবহারের নিয়ম ও FAQ
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* 6. Feedback */}
        <button
          onClick={() => setIsFeedbackModalOpen(true)}
          className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-1 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <MessageSquareHeart className="w-4 h-4 text-rose-500" />
            <div>
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">মতামত ও পরামর্শ</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                বিভাগীয় অ্যাডমিনের কাছে বার্তা পাঠান
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* 7. Auth disabled */}
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">পাসওয়ার্ড পরিবর্তন করুন</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 rounded-full hover:bg-emerald-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  বর্তমান পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  নতুন পাসওয়ার্ড পুনরায় লিখুন
                </label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                >
                  পাসওয়ার্ড পরিবর্তন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[85vh]">
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">সাহায্য ও নির্দেশনা</h3>
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="p-1 rounded-full hover:bg-emerald-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                  ১. অফলাইনে রুটিন কীভাবে দেখা যাবে?
                </h4>
                <p>রুটিন একবার লোড হলে তা অ্যাপের লোকাল ক্যাশে সেভ হয়ে থাকে, ইন্টারনেট সংযোগ না থাকলেও রুটিন খোলা যাবে।</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                  ২. বিটিইবি CGPA কীভাবে হিসাব করা হয়?
                </h4>
                <p>পলিটেকনিকের ২০১৬ ও ২০২২ প্রবিধান অনুযায়ী ১ম থেকে ৮ম সেমিস্টারের ওয়েটেজ (৫%, ৫%, ৫%, ১০%, ১৫%, ২০%, ২৫%, ১৫%) স্বয়ংক্রিয়ভাবে গুণ করে চূড়ান্ত CGPA বের করা হয়।</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                  ৩. AI ল্যাব সহকারী কীভাবে ব্যবহার করবেন?
                </h4>
                <p>যেকোনো সি বা সি++ কোড পেস্ট করে "কোড ব্যাখ্যা" চাপলে বাংলায় আউটপুট ও অ্যালগরিদমের সহজ বিশ্লেষণ পাওয়া যাবে।</p>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-right">
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold"
              >
                বুঝেছি
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">মতামত ও অভিযোগ বক্স</h3>
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="p-1 rounded-full hover:bg-emerald-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="p-4 space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                অ্যাপে কোনো সমস্যা লক্ষ্য করলে বা নতুন কোনো ফিচারের প্রস্তাবনা থাকলে এখানে লিখুন:
              </p>
              <textarea
                rows={4}
                required
                placeholder="আপনার মতামত বা সমস্যা বিস্তারিত লিখুন..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />

              <div className="flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                >
                  মতামত পাঠান
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
