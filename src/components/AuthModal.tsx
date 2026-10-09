import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Clock, 
  Image as ImageIcon, 
  Eye, 
  EyeOff, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  canClose?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  canClose = false 
}) => {
  const { register, login, resetPassword } = useAuth();
  
  // View mode: 'login' | 'register' | 'forgot_password'
  const [mode, setMode] = useState<'login' | 'register' | 'forgot_password'>('login');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Registration Form Fields (Initial values strictly empty, no demo data)
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [semester, setSemester] = useState('');
  const [shift, setShift] = useState('');
  const [technology, setTechnology] = useState('কম্পিউটার (CST)');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');

  // File input ref for selecting photo from gallery
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Process image from gallery and compress for quick Firestore saving
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('অনুগ্রহ করে শুধুমাত্র ছবি ফাইল নির্বাচন করুন।');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setProfileImage(compressedDataUrl);
          setErrorMessage('');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemovePhoto = () => {
    setProfileImage('');
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // 1. FORGOT PASSWORD FLOW
    if (mode === 'forgot_password') {
      if (!email.trim()) {
        setErrorMessage('আপনার ইমেইল লিখুন');
        return;
      }
      setLoading(true);
      try {
        await resetPassword(email.trim());
        setSuccessMessage('পাসওয়ার্ড রিসেট করার লিংক আপনার ইমেইলে পাঠানো হয়েছে! ইনবক্স চেক করুন।');
      } catch (err: any) {
        const raw = err?.message || String(err);
        if (raw.includes('auth/user-not-found')) {
          setErrorMessage('এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট খুঁজে পাওয়া যায়নি');
        } else if (raw.includes('auth/invalid-email')) {
          setErrorMessage('সঠিক ইমেইল ঠিকানা দিন');
        } else {
          setErrorMessage('পাসওয়ার্ড রিসেট লিংক পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    // 2. LOGIN FLOW
    if (mode === 'login') {
      if (!email.trim()) {
        setErrorMessage('আপনার ইমেইল লিখুন');
        return;
      }
      if (!password) {
        setErrorMessage('আপনার পাসওয়ার্ড লিখুন');
        return;
      }

      setLoading(true);
      try {
        await login(email.trim(), password);
        setSuccessMessage('লগইন সফল হয়েছে! ড্যাশবোর্ডে স্বাগতম।');
        if (onClose) {
          setTimeout(() => onClose(), 600);
        }
      } catch (err: any) {
        const raw = err?.message || String(err);
        if (raw.includes('auth/operation-not-allowed')) {
          setErrorMessage('Firebase Console-এ Email/Password প্রোভাইডার চালু করতে হবে (Authentication > Sign-in method > Email/Password > Enable)।');
        } else if (raw.includes('auth/wrong-password') || raw.includes('auth/invalid-credential')) {
          setErrorMessage('ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে');
        } else if (raw.includes('auth/user-not-found')) {
          setErrorMessage('এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট খুঁজে পাওয়া যায়নি');
        } else if (raw.includes('auth/invalid-email')) {
          setErrorMessage('সঠিক ইমেইল ঠিকানা দিন');
        } else if (raw.includes('auth/too-many-requests')) {
          setErrorMessage('অতিরিক্ত ভুল চেষ্টার কারণে অ্যাকাউন্ট সাময়িক স্থগিত। কিছুক্ষণ পর চেষ্টা করুন।');
        } else {
          setErrorMessage('লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করে পুনরায় চেষ্টা করুন।');
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    // 3. MANUAL REGISTRATION FLOW (Strict Bengali Validations)
    if (mode === 'register') {
      if (!name.trim()) {
        setErrorMessage('আপনার নাম লিখুন');
        return;
      }
      if (!studentId.trim()) {
        setErrorMessage('আপনার Student ID / রোল নম্বর লিখুন');
        return;
      }
      if (!semester) {
        setErrorMessage('আপনার সেমিস্টার নির্বাচন করুন');
        return;
      }
      if (!shift) {
        setErrorMessage('আপনার শিফট নির্বাচন করুন');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('সঠিক ইমেইল ঠিকানা দিন');
        return;
      }
      if (!password) {
        setErrorMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('পাসওয়ার্ড দুটি একই নয়');
        return;
      }

      setLoading(true);
      try {
        await register({
          name: name.trim(),
          studentId: studentId.trim(),
          email: email.trim(),
          password,
          semester,
          technology: technology || 'কম্পিউটার (CST)',
          shift,
          profileImage: profileImage || undefined,
        });

        setSuccessMessage('অভিনন্দন! আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।');
        if (onClose) {
          setTimeout(() => onClose(), 700);
        }
      } catch (err: any) {
        const raw = err?.message || String(err);
        if (raw.includes('auth/email-already-in-use')) {
          setErrorMessage('এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট রয়েছে');
        } else if (raw.includes('auth/invalid-email')) {
          setErrorMessage('সঠিক ইমেইল ঠিকানা দিন');
        } else if (raw.includes('auth/weak-password')) {
          setErrorMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
        } else if (raw.includes('auth/operation-not-allowed')) {
          setErrorMessage('Firebase Console-এ Email/Password প্রোভাইডার চালু করতে হবে (Authentication > Sign-in method > Email/Password > Enable)।');
        } else {
          setErrorMessage('রেজিস্ট্রেশন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-fadeIn">
      {/* Hidden File Input for Gallery Photo Selection */}
      <input
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Modal Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-5 relative shrink-0">
          {canClose && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <GraduationCap className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold">CST Connect</h2>
                <span className="bg-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 font-medium">
                  নরসিংদী পলিটেকনিক
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                {mode === 'forgot_password'
                  ? 'পাসওয়ার্ড পুনরুদ্ধার'
                  : mode === 'register'
                  ? 'ম্যানুয়াল শিক্ষার্থী রেজিস্ট্রেশন'
                  : 'শিক্ষার্থী লগইন'}
              </p>
            </div>
          </div>

          {/* Tab Switcher (Visible in Login & Register modes) */}
          {mode !== 'forgot_password' && (
            <div className="grid grid-cols-2 bg-emerald-950/40 p-1 rounded-xl mt-4 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                লগইন
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'register'
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                নতুন রেজিস্ট্রেশন
              </button>
            </div>
          )}

          {/* Back button for Forgot Password mode */}
          {mode === 'forgot_password' && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>লগইন স্ক্রিনে ফিরে যান</span>
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs animate-fadeIn flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-2.5 text-emerald-700 dark:text-emerald-300 text-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-semibold">{successMessage}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* 1. FORGOT PASSWORD VIEW                                  */}
          {/* ========================================================= */}
          {mode === 'forgot_password' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                <KeyRound className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  আপনার নিবন্ধিত ইমেইল ঠিকানা লিখুন। পাসওয়ার্ড পরিবর্তনের নিরাপদ লিংক আপনার ইমেইলে পাঠানো হবে।
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ইমেইল ঠিকানা *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>অপেক্ষা করুন...</span>
                ) : (
                  <>
                    <span>পাসওয়ার্ড রিসেট লিংক পাঠান</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ========================================================= */}
          {/* 2. LOGIN VIEW (Email, Password, Login Button, Links)     */}
          {/* ========================================================= */}
          {mode === 'login' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ইমেইল ঠিকানা */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল লিখুন"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* পাসওয়ার্ড */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    পাসওয়ার্ড
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot_password');
                      setErrorMessage('');
                      setSuccessMessage('');
                    }}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                    title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* লগইন বাটন */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>যাচাই করা হচ্ছে...</span>
                ) : (
                  <>
                    <span>লগইন করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* নতুন অ্যাকাউন্ট তৈরির লিংক */}
              <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
                >
                  অ্যাকাউন্ট নেই? <strong className="text-emerald-600 dark:text-emerald-400 font-bold underline ml-1">নতুন অ্যাকাউন্ট তৈরি করুন</strong>
                </button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* 3. MANUAL REGISTRATION VIEW                              */}
          {/* ========================================================= */}
          {mode === 'register' && (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* ১. পুরো নাম * */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  পুরো নাম *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* ২. Student ID / রোল নম্বর * */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Student ID / রোল নম্বর *
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="আপনার Student ID / রোল নম্বর লিখুন"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              {/* ৩. সেমিস্টার * & ৪. শিফট * (Grid) */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* ৩. সেমিস্টার * */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    সেমিস্টার *
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full pl-9 pr-2 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
                    >
                      <option value="">আপনার সেমিস্টার নির্বাচন করুন</option>
                      <option value="১ম সেমিস্টার">১ম সেমিস্টার</option>
                      <option value="২য় সেমিস্টার">২য় সেমিস্টার</option>
                      <option value="৩য় সেমিস্টার">৩য় সেমিস্টার</option>
                      <option value="৪র্থ সেমিস্টার">৪র্থ সেমিস্টার</option>
                      <option value="৫ম সেমিস্টার">৫ম সেমিস্টার</option>
                      <option value="৬ষ্ঠ সেমিস্টার">৬ষ্ঠ সেমিস্টার</option>
                      <option value="৭ম সেমিস্টার">৭ম সেমিস্টার</option>
                      <option value="৮ম সেমিস্টার">৮ম সেমিস্টার</option>
                    </select>
                  </div>
                </div>

                {/* ৪. শিফট * */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    শিফট *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <select
                      value={shift}
                      onChange={(e) => setShift(e.target.value)}
                      className="w-full pl-9 pr-2 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
                    >
                      <option value="">আপনার শিফট নির্বাচন করুন</option>
                      <option value="১ম শিফট">১ম শিফট</option>
                      <option value="২য় শিফট">২য় শিফট</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ৫. টেকনোলজি * */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  টেকনোলজি *
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <select
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    className="w-full pl-9 pr-2 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
                  >
                    <option value="কম্পিউটার (CST)">কম্পিউটার (CST)</option>
                  </select>
                </div>
              </div>

              {/* ৬. প্রোফাইল ছবি (Gallery File Picker, No Demo Photo) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  প্রোফাইল ছবি (ঐচ্ছিক)
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  {profileImage ? (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-500 shrink-0">
                      <img
                        src={profileImage}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        title="ছবি মুছুন"
                      >
                        <Trash2 className="w-4 h-4 text-red-300" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 text-slate-400">
                      <User className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-650 transition-colors shadow-xs"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>প্রোফাইল ছবি নির্বাচন করুন</span>
                    </button>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      গ্যালারি থেকে নিজের ছবি নির্বাচন করতে পারেন।
                    </p>
                  </div>
                </div>
              </div>

              {/* ৭. ইমেইল * */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ইমেইল *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* ৮. পাসওয়ার্ড * */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  পাসওয়ার্ড *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন"
                    className="w-full pl-9 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                    title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* ৯. পাসওয়ার্ড আবার লিখুন * */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  পাসওয়ার্ড আবার লিখুন *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পাসওয়ার্ডটি আবার লিখুন"
                    className="w-full pl-9 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                    title={showConfirmPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
                ) : (
                  <>
                    <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন লিংক */}
              <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
                >
                  ইতোমধ্যে অ্যাকাউন্ট আছে? <strong className="text-emerald-600 dark:text-emerald-400 font-bold underline ml-1">লগইন করুন</strong>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
