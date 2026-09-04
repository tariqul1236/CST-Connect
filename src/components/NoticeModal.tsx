import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Download, 
  Calendar, 
  Tag, 
  Search, 
  FileText, 
  Send, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { Notice } from '../types';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  notices: Notice[];
  onSendSimulatedNotification: (title: string) => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  notices,
  onSendSimulatedNotification,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['সব', 'একাডেমিক', 'পরীক্ষা', 'ছুটি', 'অন্যান্য'];

  const filteredNotices = notices.filter((n) => {
    const matchesCat = selectedCategory === 'সব' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleTestNotification = () => {
    onSendSimulatedNotification('বিটিইবি ডিপ্লোমা ইন ইঞ্জিনিয়ারিং বোর্ড ফাইনাল পরীক্ষার বিজ্ঞপ্তি প্রকাশিত হয়েছে!');
    setToastMessage('পুশ নোটিফিকেশন সফলভাবে পাঠানো হয়েছে!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-700/80 rounded-xl">
              <Bell className="w-5 h-5 text-blue-100" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">ডিপার্টমেন্ট নোটিশ বোর্ড</h2>
              <p className="text-[11px] text-blue-100/90">
                কম্পিউটার টেকনোলজি বিভাগ • নরসিংদী পলিটেকনিক
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-blue-700 active:scale-95 transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Push Notification Test Bar */}
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900 flex items-center justify-between text-xs">
          <span className="text-blue-900 dark:text-blue-200 font-medium">
            নতুন নোটিশ আসলে স্বয়ংক্রিয় নোটিফিকেশন পাবেন
          </span>
          <button
            onClick={handleTestNotification}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-all text-[11px]"
          >
            <Send className="w-3 h-3" />
            <span>পুশ টেস্ট</span>
          </button>
        </div>

        {toastMessage && (
          <div className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center space-x-1">
            <Check className="w-3.5 h-3.5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Search & Category Filter */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50 dark:bg-slate-900/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="নোটিশ খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-1.5 overflow-x-auto scrollbar-none pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notice List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                notice.isImportant
                  ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 ring-1 ring-blue-300/50'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-700 text-white">
                    {notice.category}
                  </span>
                  {notice.isImportant && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white flex items-center gap-0.5">
                      <AlertTriangle className="w-3 h-3" /> জরুরি
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" />
                  {notice.date}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {notice.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {notice.content}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {notice.publishedBy}
                </span>

                {notice.attachmentName && (
                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-all"
                  >
                    <Download className="w-3 h-3" />
                    <span>সংযুক্তি ({notice.fileSize})</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Notice PDF Preview Modal */}
        {selectedNotice && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border-t border-emerald-300 dark:border-emerald-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {selectedNotice.attachmentName}
                </p>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  সাইজ: {selectedNotice.fileSize} • ডাউনলোড প্রস্তুত
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  alert(`"${selectedNotice.attachmentName}" ডাউনলোড শুরু হয়েছে!`);
                  setSelectedNotice(null);
                }}
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl"
              >
                ডাউনলোড
              </button>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
