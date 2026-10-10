import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  Download,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { APK_DOWNLOAD_URL } from '../config/apkConfig';

export { APK_DOWNLOAD_URL };

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFlutterProject?: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isReleaseLive, setIsReleaseLive] = useState<boolean | null>(null);
  const [checking, setChecking] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setChecking(true);
    setErrorMessage(null);

    // Verify if GitHub Release asset is published
    fetch('https://api.github.com/repos/tariqul1236/CST-Connect/releases')
      .then((res) => {
        if (!res.ok) throw new Error('No release found');
        return res.json();
      })
      .then((releases) => {
        if (!isMounted) return;
        if (Array.isArray(releases) && releases.length > 0) {
          const hasApkAsset = releases.some((rel: { assets?: Array<{ name: string }> }) =>
            rel.assets?.some((asset) => asset.name === 'CST-Connect.apk')
          );
          setIsReleaseLive(hasApkAsset);
        } else {
          setIsReleaseLive(false);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setIsReleaseLive(false);
      })
      .finally(() => {
        if (isMounted) setChecking(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Release তৈরি হওয়ার আগে website-এ fake success দেখাবে না।
    if (isReleaseLive === false) {
      e.preventDefault();
      setErrorMessage('APK এখনও প্রকাশ করা হয়নি।');
      return;
    }

    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-700/80 rounded-2xl shadow-xs border border-emerald-600/40">
              <Smartphone className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Android APK ডাউনলোড
              </h2>
              <p className="text-[11px] text-emerald-100/90 leading-tight mt-0.5">
                নরসিংদী সরকারি পলিটেকনিক • CST
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setErrorMessage(null);
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-emerald-700 text-white transition-colors cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-slate-800 dark:text-slate-200">
          {/* CST Connect Android App Card */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/50 flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                CST
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-100 truncate">
                  CST Connect Android App
                </h3>
                <p className="text-xs text-emerald-800/90 dark:text-emerald-300/90 mt-0.5">
                  Package: com.cstconnect.app
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block text-[10px] font-semibold bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded-md">
                v1.0.0
              </span>
            </div>
          </div>

          {/* Release status notification */}
          {checking ? (
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600 shrink-0" />
              <span>APK রিলিজ স্ট্যাটাস পরীক্ষা করা হচ্ছে...</span>
            </div>
          ) : isReleaseLive === false ? (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 rounded-2xl text-xs text-amber-800 dark:text-amber-200 flex items-start space-x-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold">APK এখনও প্রকাশ করা হয়নি।</p>
                <p className="text-[11px] text-amber-700 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                  GitHub Actions-এ বিল্ড সম্পন্ন হয়ে v1.0.0 রিলিজ প্রকাশ হওয়া মাত্রই এই বাটন সরাসরি APK ডাউনলোড করবে।
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 rounded-2xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">অফিশিয়াল v1.0.0 APK ডাউনলোড প্রস্তুত!</span>
            </div>
          )}

          {/* User clicked before release is live */}
          {errorMessage && (
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 rounded-xl text-xs text-rose-700 dark:text-rose-300 font-semibold text-center animate-fadeIn">
              {errorMessage}
            </div>
          )}

          {/* Prominent Single APK Download Button - Direct link */}
          <div>
            <a
              href={isReleaseLive ? APK_DOWNLOAD_URL : '#'}
              download="CST-Connect.apk"
              target={isReleaseLive ? '_blank' : undefined}
              rel={isReleaseLive ? 'noopener noreferrer' : undefined}
              onClick={handleDownloadClick}
              className={`w-full py-4 px-5 font-bold text-base rounded-2xl flex items-center justify-center space-x-2.5 shadow-lg transition-all text-center select-none ${
                isReleaseLive === false
                  ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white shadow-emerald-700/25 cursor-pointer'
              }`}
            >
              <Download className="w-5 h-5 shrink-0" />
              <span>📥 APK ডাউনলোড করুন</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 shrink-0">
          <span className="font-medium text-[11px]">Android 6.0+ সমর্থিত</span>
          <button
            onClick={() => {
              setErrorMessage(null);
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-all cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
