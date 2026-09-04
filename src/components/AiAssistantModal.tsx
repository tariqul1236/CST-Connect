import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Code, 
  FileText, 
  MessageSquare, 
  Send, 
  Loader2, 
  Check, 
  HelpCircle,
  Copy,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'code' | 'summary' | 'viva';
  initialSummaryTitle?: string;
  initialSummaryContent?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'code',
  initialSummaryTitle = '',
  initialSummaryContent = '',
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'summary' | 'viva'>(initialTab);

  // 1. Code Explain State
  const sampleCode = `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x = %d, y = %d\\n", x, y);
    return 0;
}`;

  const [codeSnippet, setCodeSnippet] = useState(sampleCode);
  const [codeLanguage, setCodeLanguage] = useState<'C' | 'C++'>('C');
  const [codeExplanation, setCodeExplanation] = useState<string>('');
  const [isExplaining, setIsExplaining] = useState(false);

  // 2. Note Summary State
  const [noteTitle, setNoteTitle] = useState(initialSummaryTitle || 'ডাটা স্ট্রাকচার ও অ্যালগরিদম অধ্যায় ১');
  const [noteContent, setNoteContent] = useState(
    initialSummaryContent ||
      `ডাটা স্ট্রাকচার হলো কম্পিউটারে ডাটা সংরক্ষণ এবং বিন্যাস করার বিশেষ গাণিতিক পদ্ধতি যাতে সহজে তা ব্যবহার ও প্রক্রিয়াকরণ করা যায়।
প্রধানত দুই প্রকার:
১. রৈখিক (Linear): অ্যারে, স্ট্যাক, কিউ, লিংকড লিস্ট।
২. অরৈখিক (Non-Linear): ট্রি এবং গ্রাফ।
বিগ-ও (Big-O) নোটেশনের মাধ্যমে একটি অ্যালগরিদমের সময় ও মেমোরি দক্ষতা পরিমাপ করা হয়। যেমন বাইনারি সার্চের কমপ্লেক্সিটি O(log n) এবং লিনিয়ার সার্চের কমপ্লেক্সিটি O(n)।`
  );
  const [noteSummaryResult, setNoteSummaryResult] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // 3. Viva Practice State
  const [vivaTopic, setVivaTopic] = useState('সি প্রোগ্রামিং ও পয়েন্টার');
  const [vivaMessages, setVivaMessages] = useState<Array<{ sender: 'examiner' | 'student'; text: string }>>([
    {
      sender: 'examiner',
      text: 'স্বাগতম! আমি তোমার পলিটেকনিক ল্যাব ফাইনাল ভাইভা বোর্ডের পরীক্ষক। তুমি কি প্রস্তুত? বলতো, পয়েন্টার (Pointer) কী এবং এটি সাধারণ ভেরিয়েবল থেকে কেন আলাদা?',
    },
  ]);
  const [studentVivaAnswer, setStudentVivaAnswer] = useState('');
  const [isVivaLoading, setIsVivaLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Handle Code Explanation Call
  const handleExplainCode = async () => {
    if (!codeSnippet.trim()) return;
    setIsExplaining(true);
    setCodeExplanation('');

    try {
      const response = await fetch('/api/ai/explain-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeSnippet, language: codeLanguage }),
      });
      const data = await response.json();
      if (data.explanation) {
        setCodeExplanation(data.explanation);
      } else {
        setCodeExplanation(data.error || 'কোড ব্যাখ্যা করতে সমস্যা হয়েছে।');
      }
    } catch (err: any) {
      setCodeExplanation('নেটওয়ার্ক বা সার্ভার ত্রুটি: ' + err.message);
    } finally {
      setIsExplaining(false);
    }
  };

  // Handle Note Summarization Call
  const handleSummarizeNote = async () => {
    if (!noteContent.trim()) return;
    setIsSummarizing(true);
    setNoteSummaryResult('');

    try {
      const response = await fetch('/api/ai/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: noteTitle, content: noteContent }),
      });
      const data = await response.json();
      if (data.summary) {
        setNoteSummaryResult(data.summary);
      } else {
        setNoteSummaryResult(data.error || 'সারসংক্ষেপ তৈরি ব্যর্থ হয়েছে।');
      }
    } catch (err: any) {
      setNoteSummaryResult('সার্ভার ত্রুটি: ' + err.message);
    } finally {
      setIsSummarizing(false);
    }
  };

  // Handle Viva Practice Reply
  const handleSendVivaReply = async () => {
    if (!studentVivaAnswer.trim()) return;

    const answer = studentVivaAnswer.trim();
    const updatedHistory = [...vivaMessages, { sender: 'student' as const, text: answer }];
    setVivaMessages(updatedHistory);
    setStudentVivaAnswer('');
    setIsVivaLoading(true);

    try {
      const response = await fetch('/api/ai/viva-practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: vivaTopic,
          userReply: answer,
        }),
      });
      const data = await response.json();
      if (data.reply) {
        setVivaMessages([...updatedHistory, { sender: 'examiner' as const, text: data.reply }]);
      }
    } catch (err: any) {
      setVivaMessages([
        ...updatedHistory,
        { sender: 'examiner' as const, text: 'দুঃখিত, সংযোগে সমস্যা হয়েছে।' },
      ]);
    } finally {
      setIsVivaLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-purple-700/80 rounded-xl">
              <Sparkles className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI ল্যাব সহকারী</h2>
              <p className="text-[11px] text-purple-200">
                বাংলায় কোড ব্যাখ্যা, নোট সারসংক্ষেপ ও ভাইভা অনুশীলন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-purple-700 active:scale-95 transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-2 bg-purple-50 dark:bg-purple-950/40 border-b border-purple-100 dark:border-purple-900 flex space-x-1">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/60'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>C/C++ কোড ব্যাখ্যা</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'summary'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>নোট সারসংক্ষেপ</span>
          </button>

          <button
            onClick={() => setActiveTab('viva')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'viva'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ল্যাব ভাইভা</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {/* TAB 1: Code Explanation */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  C বা C++ কোড পেস্ট করুন:
                </label>
                <div className="flex space-x-1">
                  {(['C', 'C++'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLanguage(lang)}
                      className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold ${
                        codeLanguage === lang
                          ? 'bg-purple-700 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700">
                <textarea
                  rows={6}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 focus:outline-none"
                  placeholder="এখানে কোড লিখুন..."
                />
              </div>

              <button
                onClick={handleExplainCode}
                disabled={isExplaining || !codeSnippet.trim()}
                className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isExplaining ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>বাংলায় ব্যাখ্যা তৈরি হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>বাংলায় কোডের বিস্তারিত ব্যাখ্যা পান</span>
                  </>
                )}
              </button>

              {codeExplanation && (
                <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-800 pb-2">
                    <span className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      বাংলায় কোড বিশ্লেষণ:
                    </span>
                    <button
                      onClick={() => handleCopy(codeExplanation)}
                      className="text-xs text-purple-700 dark:text-purple-300 flex items-center gap-1 hover:underline"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                    </button>
                  </div>
                  <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans">
                    {codeExplanation}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Notes Summarization */}
          {activeTab === 'summary' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  নোটের শিরোনাম:
                </label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  নোটের বিবরণ / টেক্সট:
                </label>
                <textarea
                  rows={6}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="নোটের ভেতরের মূল টেক্সট পেস্ট করুন..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                onClick={handleSummarizeNote}
                disabled={isSummarizing || !noteContent.trim()}
                className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isSummarizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>বাংলা সারসংক্ষেপ তৈরি হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>পরীক্ষার উপযোগী বাংলা সারসংক্ষেপ দেখুন</span>
                  </>
                )}
              </button>

              {noteSummaryResult && (
                <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-800 pb-2">
                    <span className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      সারসংক্ষেপ ফলাফল:
                    </span>
                    <button
                      onClick={() => handleCopy(noteSummaryResult)}
                      className="text-xs text-purple-700 dark:text-purple-300 flex items-center gap-1 hover:underline"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'কপি হয়েছে!' : 'কপি'}</span>
                    </button>
                  </div>
                  <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans">
                    {noteSummaryResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Viva Practice */}
          {activeTab === 'viva' && (
            <div className="space-y-3 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  ভাইভার বিষয়:
                </span>
                <select
                  value={vivaTopic}
                  onChange={(e) => setVivaTopic(e.target.value)}
                  className="px-2.5 py-1 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="সি প্রোগ্রামিং ও পয়েন্টার">সি প্রোগ্রামিং ও পয়েন্টার</option>
                  <option value="C++ ও অবজেক্ট ওরিয়েন্টেড (OOP)">C++ ও অবজেক্ট ওরিয়েন্টেড (OOP)</option>
                  <option value="ডাটা স্ট্রাকচার (স্ট্যাক, কিউ, ট্রি)">ডাটা স্ট্রাকচার (স্ট্যাক, কিউ, ট্রি)</option>
                  <option value="ডাটাবেস ম্যানেজমেন্ট (DBMS ও SQL)">ডাটাবেস ম্যানেজমেন্ট (DBMS ও SQL)</option>
                  <option value="৮০৮৬ মাইক্রোপ্রসেসর">৮০৮৬ মাইক্রোপ্রসেসর</option>
                </select>
              </div>

              {/* Chat Stream */}
              <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-2xl space-y-2.5 max-h-64 overflow-y-auto">
                {vivaMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start space-x-2 ${
                      msg.sender === 'student' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        msg.sender === 'examiner'
                          ? 'bg-purple-700 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {msg.sender === 'examiner' ? 'পরীক্ষক' : 'আপনি'}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
                        msg.sender === 'examiner'
                          ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-purple-200 dark:border-purple-900/50'
                          : 'bg-emerald-700 text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isVivaLoading && (
                  <div className="flex items-center space-x-2 text-xs text-purple-700 dark:text-purple-300">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>পরীক্ষক আপনার উত্তর মূল্যায়ন করছেন...</span>
                  </div>
                )}
              </div>

              {/* Viva Answer Input */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  placeholder="আপনার উত্তর বাংলায় লিখুন..."
                  value={studentVivaAnswer}
                  onChange={(e) => setStudentVivaAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendVivaReply();
                  }}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendVivaReply}
                  disabled={!studentVivaAnswer.trim() || isVivaLoading}
                  className="p-2 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-xl active:scale-95 transition-all shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
