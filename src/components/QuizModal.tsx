import React, { useState } from 'react';
import { 
  Award, 
  X, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Code, 
  HelpCircle,
  ChevronRight,
  Flame
} from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizzes: QuizQuestion[];
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  quizzes,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'সব' | 'C' | 'C++' | 'Python'>('সব');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const filteredQuizzes = quizzes.filter((q) => {
    if (selectedCategory === 'সব') return true;
    return q.category === selectedCategory;
  });

  const currentQuestion = filteredQuizzes[currentIndex] || filteredQuizzes[0];

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (selectedAnswers[qId] !== undefined) return; // Already answered
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentIndex(0);
  };

  // Score calculation
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = filteredQuizzes.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-rose-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-rose-800/80 rounded-xl">
              <Award className="w-5 h-5 text-rose-100" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">প্রোগ্রামিং কুইজ</h2>
              <p className="text-[11px] text-rose-100/90">
                C, C++, Python বহুনিবার্চনী প্রশ্ন ও প্রস্তুতি
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-800 active:scale-95 transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Score Bar */}
        <div className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 border-b border-rose-100 dark:border-rose-900 flex items-center justify-between text-xs">
          <div className="flex space-x-1.5">
            {(['সব', 'C', 'C++', 'Python'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
                  selectedCategory === cat
                    ? 'bg-rose-700 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 font-mono">
            <span className="text-rose-900 dark:text-rose-200 font-bold">
              স্কোর: {correctCount}/{filteredQuizzes.length}
            </span>
            <button
              onClick={resetQuiz}
              title="নতুন করে শুরু"
              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Area */}
        {currentQuestion ? (
          <div className="p-4 overflow-y-auto flex-1 space-y-4">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">
                প্রশ্ন {currentIndex + 1} / {filteredQuizzes.length}
              </span>
              <span className="font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                {currentQuestion.category} প্রোগ্রামিং
              </span>
            </div>

            {/* Question title */}
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Code Snippet if exists */}
            {currentQuestion.codeSnippet && (
              <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                <pre>{currentQuestion.codeSnippet}</pre>
              </div>
            )}

            {/* Options List */}
            <div className="space-y-2 pt-1">
              {currentQuestion.options.map((opt, optIndex) => {
                const isSelected = selectedAnswers[currentQuestion.id] === optIndex;
                const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
                const isCorrect = optIndex === currentQuestion.correctIndex;

                let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-400';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={optIndex}
                    onClick={() => handleSelectOption(currentQuestion.id, optIndex)}
                    disabled={isAnswered}
                    className={`w-full p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showExplanation[currentQuestion.id] && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1 animate-fadeIn">
                <div className="font-bold flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                  সঠিক উত্তরের ব্যাখ্যা:
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            <p>কোনো প্রশ্ন পাওয়া যায়নি।</p>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-40"
          >
            পূর্ববর্তী
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredQuizzes.length - 1}
            className="px-4 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1"
          >
            <span>পরবর্তী প্রশ্ন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
