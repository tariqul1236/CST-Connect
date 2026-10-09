import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Download,
  AlertCircle
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
  const [configMessage, setConfigMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isConfigured = Boolean(
    APK_DOWNLOAD_URL &&
    APK_DOWNLOAD_URL.trim() !== '' &&
    (APK_DOWNLOAD_URL as string) !== 'YOUR_REAL_COMPILED_APK_URL_HERE' &&
    (APK_DOWNLOAD_URL as string) !== 'YOUR_DIRECT_APK_URL_HERE' &&
    (APK_DOWNLOAD_URL as string) !== 'YOUR_APK_URL_HERE'
  );

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. APK_DOWNLOAD_URL empty বা placeholder হলে কোনো ফেক ফাইল ডাউনলোড না করে স্পষ্ট বার্তা দেবে
    if (!isConfigured) {
      e.preventDefault();
      setConfigMessage(
        'APK লিংক এখনও কনফিগার করা হয়নি। GitHub Actions থেকে বিল্ড হওয়া আসল .apk লিংকটি src/config/apkConfig.ts ফাইলে বসান।'
      );
      console.warn(
        '[CST Connect] APK_DOWNLOAD_URL is empty or unconfigured. Please set YOUR_REAL_COMPILED_APK_URL_HERE with your actual direct .apk URL in src/config/apkConfig.ts'
      );
      return;
    }

    const cleanUrl = APK_DOWNLOAD_URL.trim();

    // 2. Cross-origin URL চেক: cross-origin লিঙ্কের ক্ষেত্রে শুধু HTML download অ্যাট্রিবিউট কাজ নাও করতে পারে
    const isCrossOrigin =
      cleanUrl.startsWith('http://') ||
      cleanUrl.startsWith('https://') ||
      cleanUrl.startsWith('//');

    if (isCrossOrigin) {
      // ক্রস-অরিজিন ডিরেক্ট URL-এর জন্য উইন্ডো নেভিগেশন ব্রাউজারে .apk ডাউনলোড শুরু করবে
      e.preventDefault();
      try {
        window.location.href = cleanUrl;
      } catch (err) {
        console.warn('[CST Connect] Navigation fallback to APK URL:', err);
      }
    }
    // সেইম-অরিজিন ডিরেক্ট URL (/cst_connect.apk)-এর ক্ষেত্রে <a> ট্যাগের href ও download অ্যাট্রিবিউট স্বাভাবিকভাবেই সরাসরি ডাউনলোড সম্পন্ন করবে
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
              setConfigMessage(null);
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
                  অফিশিয়াল অ্যান্ড্রয়েড অ্যাপ প্যাকেজ (.apk)
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block text-[10px] font-semibold bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded-md">
                v1.0.0
              </span>
            </div>
          </div>

          {/* Inline notification if clicked before URL configuration */}
          {configMessage && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 rounded-2xl text-xs text-amber-800 dark:text-amber-200 flex items-start space-x-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium leading-relaxed">{configMessage}</p>
              </div>
            </div>
          )}

          {/* Prominent Single APK Download Button */}
          <div>
            <a
              href={isConfigured ? APK_DOWNLOAD_URL.trim() : '#'}
              download={isConfigured ? 'CST-Connect.apk' : undefined}
              onClick={handleDownloadClick}
              className="w-full py-4 px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-base rounded-2xl flex items-center justify-center space-x-2.5 shadow-lg shadow-emerald-700/25 transition-all cursor-pointer text-center select-none"
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
              setConfigMessage(null);
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
