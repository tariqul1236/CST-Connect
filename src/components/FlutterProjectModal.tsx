import React, { useState } from 'react';
import { 
  Code2, 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  FolderOpen, 
  Terminal, 
  Smartphone
} from 'lucide-react';
import JSZip from 'jszip';
import { FLUTTER_PROJECT_STRUCTURE, FlutterFile } from '../data/flutterProjectFiles';

interface FlutterProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterProjectModal: React.FC<FlutterProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_PROJECT_STRUCTURE[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const getCategory = (path: string) => {
    if (path.startsWith('lib/models/')) return 'Models';
    if (path.startsWith('lib/services/')) return 'Firebase Services';
    if (path.startsWith('lib/screens/')) return 'Screens & UI';
    if (path.startsWith('lib/widgets/')) return 'Widgets & Modals';
    if (path.startsWith('lib/')) return 'Core / Entry';
    return 'Config & Rules';
  };

  const getFileName = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Populate files into zip structure
      FLUTTER_PROJECT_STRUCTURE.forEach((file) => {
        zip.file(file.path, file.code);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'cst_connect_flutter_project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('ZIP generation error:', error);
      alert('জিপ ফাইল তৈরিতে ত্রুটি হয়েছে।');
    } finally {
      setIsZipping(false);
    }
  };

  const categories = ['Core / Entry', 'Firebase Services', 'Screens & UI', 'Config & Rules'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700 rounded-xl">
              <Smartphone className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">
                  CST Connect - Flutter & Firebase সোর্স প্রজেক্ট
                </h2>
                <span className="bg-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-mono">
                  v1.0.0
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90">
                Flutter 3.x + Firebase (Auth, Firestore, Storage, FCM) কমপ্লিট কোডবেস
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 transition-all text-xs font-bold shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isZipping ? 'জিপ তৈরি হচ্ছে...' : 'সম্পূর্ণ প্রজেক্ট ZIP ডাউনলোড'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-emerald-700 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Grid: Explorer + Code View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-3 overflow-y-auto shrink-0">
            <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <FolderOpen className="w-3.5 h-3.5 text-emerald-600" />
              প্রজেক্ট ডিরেক্টরি
            </h3>

            <div className="space-y-3">
              {categories.map((cat) => {
                const catFiles = FLUTTER_PROJECT_STRUCTURE.filter((f) => getCategory(f.path) === cat);
                if (catFiles.length === 0) return null;

                return (
                  <div key={cat} className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-1">
                      {cat}
                    </span>
                    <div className="space-y-0.5">
                      {catFiles.map((file) => {
                        const isSelected = selectedFile.path === file.path;

                        return (
                          <button
                            key={file.path}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-2 transition-all ${
                              isSelected
                                ? 'bg-emerald-700 text-white font-bold shadow-2xs'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0 opacity-70" />
                            <span className="truncate">{getFileName(file.path)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-slate-900 text-slate-100 overflow-hidden">
            {/* File Path & Copy Toolbar */}
            <div className="px-4 py-2 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 font-mono text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>{selectedFile.path}</span>
                <span className="text-slate-400 text-[10px]">({selectedFile.description})</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all font-mono text-[11px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>কপি সম্পন্ন!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>কোড কপি</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs leading-relaxed text-emerald-300/90 bg-slate-950/70 select-text">
              <pre className="whitespace-pre">{selectedFile.code}</pre>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>Android Studio বা VS Code এ জিপ ফাইলটি এক্সট্র্যাক্ট করে `flutter run` দিলেই অ্যাপ চলবে।</span>
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            Narsingdi Govt. Polytechnic CST
          </span>
        </div>
      </div>
    </div>
  );
};
