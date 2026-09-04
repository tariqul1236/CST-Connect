import React, { useState } from 'react';
import { 
  Code2, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Folder, 
  Flame, 
  Terminal, 
  Smartphone,
  ChevronRight,
  Info
} from 'lucide-react';
import { FLUTTER_PROJECT_FILES } from '../data/flutterProjectFiles';

export const FlutterCodeView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('lib/main.dart');
  const [copied, setCopied] = useState(false);

  const currentFileContent = FLUTTER_PROJECT_FILES[selectedFile] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    // Generate a downloadable text bundle or single file
    const blob = new Blob([currentFileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.split('/').pop() || 'file.dart';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const fileGroups = [
    {
      category: 'Core & Config',
      files: ['pubspec.yaml', 'lib/main.dart', 'lib/theme/app_theme.dart'],
    },
    {
      category: 'Screens (UI)',
      files: [
        'lib/screens/login_screen.dart',
        'lib/screens/home_screen.dart',
        'lib/screens/routine_screen.dart',
        'lib/screens/notes_screen.dart',
        'lib/screens/assignments_screen.dart',
        'lib/screens/attendance_screen.dart',
        'lib/screens/cgpa_calculator_screen.dart',
        'lib/screens/batch_chat_screen.dart',
        'lib/screens/quiz_screen.dart',
        'lib/screens/ai_assistant_screen.dart',
        'lib/screens/profile_screen.dart',
      ],
    },
    {
      category: 'Services & Firebase',
      files: [
        'lib/services/firebase_service.dart',
        'lib/services/ai_gemini_service.dart',
        'lib/services/cache_service.dart',
      ],
    },
  ];

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* হেডার */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Smartphone size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Flutter Android সোর্স কোড</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  v1.0.0
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট CST মোবাইল অ্যাপ আর্কিটেকচার
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60">
            <Flame size={14} />
            <span>Firebase Auth & Cloud</span>
          </div>
        </div>
      </div>

      {/* ফাইল ব্রাউজার ও কোড ভিউয়ার */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* টপ ফাইল ন্যাভিগেশন */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <FileCode size={16} className="text-emerald-600" />
            <span className="font-mono">{selectedFile}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-xs font-semibold flex items-center gap-1 transition"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copied ? 'কপি হয়েছে' : 'কোড কপি'}</span>
            </button>

            <button
              onClick={handleDownloadAll}
              className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 transition shadow-xs"
            >
              <Download size={13} />
              <span>ফাইল ডাউনলোড</span>
            </button>
          </div>
        </div>

        {/* ফাইল ক্যাটাগরি চিপস */}
        <div className="p-2.5 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {fileGroups.map((grp) => (
            <div key={grp.category} className="flex items-center gap-1 shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">
                {grp.category}:
              </span>
              {grp.files.map((file) => {
                const fileName = file.split('/').pop();
                const isSelected = selectedFile === file;

                return (
                  <button
                    key={file}
                    onClick={() => setSelectedFile(file)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition ${
                      isSelected
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {fileName}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* সিনট্যাক্স কোড প্রিভিউ */}
        <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[500px] overflow-y-auto leading-relaxed">
          <pre className="selection:bg-emerald-700 selection:text-white">
            {currentFileContent}
          </pre>
        </div>
      </div>

      {/* নির্দেশাবলী কার্ড */}
      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5">
        <h4 className="font-bold flex items-center gap-1.5">
          <Terminal size={15} />
          <span>Flutter প্রোজেক্ট রান করার নির্দেশিকা:</span>
        </h4>
        <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
          <li>আপনার কম্পিউটারে <code>flutter create cst_connect</code> কমান্ড দিয়ে প্রোজেক্ট তৈরি করুন।</li>
          <li>ওপরের <code>pubspec.yaml</code> এবং <code>lib/</code> ফোল্ডারের ফাইলসমূহ প্রতিস্থাপন করুন।</li>
          <li>টার্মিনালে <code>flutter pub get</code> চালিয়ে প্রয়োজনীয় লাইব্রেরি ইনস্টল করুন।</li>
          <li>ফায়ারবেসের জন্য <code>google-services.json</code> ফাইলটি <code>android/app/</code> ফোল্ডারে রাখুন।</li>
          <li><code>flutter run</code> দিলে নরসিংদী পলিটেকনিক CST অ্যাপটি অ্যান্ড্রয়েড ফোনে রান করবে!</li>
        </ol>
      </div>
    </div>
  );
};
