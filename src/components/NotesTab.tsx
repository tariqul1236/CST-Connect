import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  Upload, 
  FileText, 
  Eye, 
  X, 
  Check, 
  Filter,
  User,
  Calendar,
  Layers,
  ArrowDownToLine,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { NoteItem } from '../types';

interface NotesTabProps {
  notes: NoteItem[];
  onUploadNote: (newNote: NoteItem) => void;
  onOpenAiSummary?: (title: string, content: string) => void;
  currentUserName?: string;
  onBackToDashboard?: () => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({
  notes,
  onUploadNote,
  onOpenAiSummary,
  currentUserName,
  onBackToDashboard,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [previewNote, setPreviewNote] = useState<NoteItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // New Note Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('২৮৫৮১');
  const [newSubjectName, setNewSubjectName] = useState('ডাটা স্ট্রাকচার অ্যান্ড অ্যালগরিদম');
  const [newCategory, setNewCategory] = useState('হ্যান্ডনোট');
  const [newContent, setNewContent] = useState('');
  const [fileName, setFileName] = useState('lecture_note_cst.pdf');
  const [fileSizeStr, setFileSizeStr] = useState('১.৫ মেগাবাইট');

  const categories = ['সব', 'হ্যান্ডনোট', 'পরীক্ষার সাজেশন', 'চিটশিট', 'লেকচার স্লাইড'];

  const filteredNotes = notes.filter((n) => {
    const matchesCat = selectedCategory === 'সব' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.subjectCode.includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadSuccessId(id);
    setTimeout(() => setDownloadSuccessId(null), 2500);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const banglaDigits: Record<string, string> = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
      };
      const banglaSize = `${sizeMb}`.replace(/[0-9]/g, (d) => banglaDigits[d] || d);
      setFileSizeStr(`${banglaSize} মেগাবাইট`);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const uploader = currentUserName ? `${currentUserName} (আপনি)` : 'শিক্ষার্থী (আপনি)';

    const item: NoteItem = {
      id: `nt-${Date.now()}`,
      title: newTitle.trim(),
      subjectCode: newSubjectCode.trim(),
      subjectName: newSubjectName.trim(),
      semester: '৩য় সেমিস্টার',
      uploaderName: uploader,
      uploadDate: 'আজ',
      fileSize: fileSizeStr,
      fileType: 'PDF',
      downloadCount: 1,
      category: newCategory,
      previewContent: newContent || `${newTitle} সম্পর্কিত ক্লাসের গুরুত্বপূর্ণ আলোচনা ও কোড নোট।`,
    };

    onUploadNote(item);
    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="w-full max-w-full space-y-4 pb-8 animate-fadeIn overflow-x-hidden">
      {/* Back to Dashboard Button if navigated from Home */}
      {onBackToDashboard && (
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-750 transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← ড্যাশবোর্ডে ফিরে যান</span>
        </button>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-3.5 sm:p-4 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-w-0">
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-white flex items-center gap-2 truncate">
            <BookOpen className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>নোট ও PDF লাইব্রেরি</span>
          </h2>
          <p className="text-xs text-emerald-100/90 mt-0.5 truncate">
            CST বিভাগের সকল সেমিস্টারের লেকচার নোট ও পিডিএফ
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 transition-all text-xs font-bold shadow-sm shrink-0"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>নোট আপলোড</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="নোট বা বিষয়ের নাম দিয়ে খুঁজুন (যেমন: জাভা, ডাটা স্ট্রাকচার)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex space-x-1.5 overflow-x-auto scrollbar-none pt-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto mb-2 text-emerald-500 opacity-40" />
            <p className="text-sm font-semibold">কোনো নোট বা পিডিএফ পাওয়া যায়নি।</p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isDownloaded = downloadSuccessId === note.id;

            return (
              <div
                key={note.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {note.category}
                      </span>
                      <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                        {note.subjectCode}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {note.fileType} • {note.fileSize}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {note.title}
                    </h3>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                      বিষয়: {note.subjectName}
                    </p>

                    <div className="mt-2.5 flex items-center space-x-3 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        {note.uploaderName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {note.uploadDate}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {note.downloadCount} বার ডাউনলোড
                      </span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                    <FileText className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  </div>
                </div>

                {/* Actions Row */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewNote(note)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>প্রিভিউ</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {/* Download Action */}
                    <button
                      onClick={() => handleDownload(note.id, note.title)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isDownloaded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                      }`}
                    >
                      {isDownloaded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ডাউনলোড সম্পন্ন!</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownToLine className="w-3.5 h-3.5" />
                          <span>ডাউনলোড PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Note Preview Modal */}
      {previewNote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold truncate max-w-xs">{previewNote.title}</h3>
                <p className="text-xs text-emerald-200">{previewNote.subjectName} ({previewNote.subjectCode})</p>
              </div>
              <button
                onClick={() => setPreviewNote(null)}
                className="p-1 rounded-full hover:bg-emerald-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 font-sans text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap bg-slate-50 dark:bg-slate-950">
              {previewNote.previewContent}
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => {
                  handleDownload(previewNote.id, previewNote.title);
                  setPreviewNote(null);
                }}
                className="flex items-center space-x-1 px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ডাউনলোড করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Note Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">নতুন নোট / PDF আপলোড করুন</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-full hover:bg-emerald-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  নোটের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ডাটা স্ট্রাকচার টপিক ৩ হ্যান্ডনোট"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    বিষয় কোড
                  </label>
                  <input
                    type="text"
                    value={newSubjectCode}
                    onChange={(e) => setNewSubjectCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="হ্যান্ডনোট">হ্যান্ডনোট</option>
                    <option value="পরীক্ষার সাজেশন">পরীক্ষার সাজেশন</option>
                    <option value="চিটশিট">চিটশিট</option>
                    <option value="লেকচার স্লাইড">লেকচার স্লাইড</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  বিষয়ের নাম
                </label>
                <input
                  type="text"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  নোটের সারসংক্ষেপ বা লেখার বিবরণ
                </label>
                <textarea
                  rows={3}
                  placeholder="নোটের ভেতরের মূল মূল পয়েন্টগুলো লিখুন..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                <div className="min-w-0 flex-1 mr-2">
                  <span className="font-semibold block truncate">{fileName}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{fileSizeStr}</span>
                </div>
                <label className="cursor-pointer px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shrink-0">
                  <span>ফাইল বদলান</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm"
                >
                  আপলোড নিশ্চিত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
