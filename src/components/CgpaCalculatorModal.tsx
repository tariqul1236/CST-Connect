import React, { useState } from 'react';
import { 
  Calculator, 
  X, 
  RotateCcw, 
  Award, 
  Info, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface CgpaCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SemesterData {
  id: number;
  name: string;
  weight: number; // in percentage e.g. 5, 10, 15, 20, 25
  gpa: string;
}

export const CgpaCalculatorModal: React.FC<CgpaCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [regulation, setRegulation] = useState<'2016' | '2022'>('2016');

  // BTEB 2016 Regulation Standard Weights:
  // 1st: 5%, 2nd: 5%, 3rd: 5%, 4th: 10%, 5th: 15%, 6th: 20%, 7th: 25%, 8th: 15% = 100%
  const defaultSemesters: SemesterData[] = [
    { id: 1, name: '১ম সেমিস্টার', weight: 5, gpa: '3.65' },
    { id: 2, name: '২য় সেমিস্টার', weight: 5, gpa: '3.72' },
    { id: 3, name: '৩য় সেমিস্টার', weight: 5, gpa: '3.80' },
    { id: 4, name: '৪র্থ সেমিস্টার', weight: 10, gpa: '3.68' },
    { id: 5, name: '৫ম সেমিস্টার (চলমান)', weight: 15, gpa: '' },
    { id: 6, name: '৬ষ্ঠ সেমিস্টার', weight: 20, gpa: '' },
    { id: 7, name: '৭ম সেমিস্টার', weight: 25, gpa: '' },
    { id: 8, name: '৮ম সেমিস্টার (ইন্ডাস্ট্রিয়াল)', weight: 15, gpa: '' },
  ];

  const [semesters, setSemesters] = useState<SemesterData[]>(defaultSemesters);
  const [calculatedCgpa, setCalculatedCgpa] = useState<number | null>(null);
  const [totalWeightCompleted, setTotalWeightCompleted] = useState<number>(0);

  if (!isOpen) return null;

  const handleGpaChange = (index: number, val: string) => {
    const updated = [...semesters];
    updated[index].gpa = val;
    setSemesters(updated);
  };

  const calculateCGPA = () => {
    let totalScore = 0;
    let completedWeight = 0;

    semesters.forEach((sem) => {
      const gpaNum = parseFloat(sem.gpa);
      if (!isNaN(gpaNum) && gpaNum > 0 && gpaNum <= 4.0) {
        totalScore += gpaNum * sem.weight;
        completedWeight += sem.weight;
      }
    });

    if (completedWeight > 0) {
      const finalCgpa = totalScore / completedWeight;
      setCalculatedCgpa(Number(finalCgpa.toFixed(2)));
      setTotalWeightCompleted(completedWeight);
    } else {
      setCalculatedCgpa(null);
      setTotalWeightCompleted(0);
    }
  };

  const resetAll = () => {
    setSemesters(defaultSemesters.map((s) => ({ ...s, gpa: '' })));
    setCalculatedCgpa(null);
    setTotalWeightCompleted(0);
  };

  const getLetterGrade = (cgpa: number) => {
    if (cgpa === 4.0) return { grade: 'A+', color: 'text-emerald-700 dark:text-emerald-400' };
    if (cgpa >= 3.75) return { grade: 'A', color: 'text-emerald-600 dark:text-emerald-400' };
    if (cgpa >= 3.5) return { grade: 'A-', color: 'text-teal-600 dark:text-teal-400' };
    if (cgpa >= 3.25) return { grade: 'B+', color: 'text-blue-600 dark:text-blue-400' };
    if (cgpa >= 3.0) return { grade: 'B', color: 'text-amber-600 dark:text-amber-400' };
    if (cgpa >= 2.5) return { grade: 'C', color: 'text-orange-600 dark:text-orange-400' };
    if (cgpa >= 2.0) return { grade: 'D', color: 'text-rose-500' };
    return { grade: 'F', color: 'text-red-700' };
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700/80 rounded-xl">
              <Calculator className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">পলিটেকনিক CGPA ক্যালকুলেটর</h2>
              <p className="text-[11px] text-emerald-100/90">
                বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) প্রবিধান
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-700 active:scale-95 transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Regulation Banner */}
        <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">প্রবিধান:</span>
            <div className="flex space-x-1">
              <button
                onClick={() => setRegulation('2016')}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                  regulation === '2016'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                ২০১৬ প্রবিধান
              </button>
              <button
                onClick={() => setRegulation('2022')}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                  regulation === '2022'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                ২০২২ প্রবিধান
              </button>
            </div>
          </div>

          <button
            onClick={resetAll}
            className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1 hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            রিসেট
          </button>
        </div>

        {/* Result Highlight Card */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              অর্জিত গড় CGPA (সর্বোচ্চ ৪.০০ এর মধ্যে)
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-300 font-mono">
                {calculatedCgpa !== null ? calculatedCgpa.toFixed(2) : '০.০০'}
              </span>
              {calculatedCgpa !== null && (
                <span className={`text-base font-bold ${getLetterGrade(calculatedCgpa).color}`}>
                  গ্রেড: {getLetterGrade(calculatedCgpa).grade}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {totalWeightCompleted}% মোট ওয়েটেজ হিসাব করা হয়েছে
            </p>
          </div>

          <button
            onClick={calculateCGPA}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm active:scale-95 transition-all"
          >
            হিসাব করুন
          </button>
        </div>

        {/* Semester GPA Inputs List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
            <span>সেমিস্টার নাম</span>
            <div className="flex items-center space-x-6">
              <span>ওয়েট</span>
              <span className="w-20 text-center">GPA (১.০০ - ৪.০০)</span>
            </div>
          </div>

          {semesters.map((sem, idx) => (
            <div
              key={sem.id}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex items-center justify-between shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
            >
              <div className="flex-1 pr-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {sem.name}
                </h4>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {sem.weight}%
                </span>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  placeholder="যেমন: ৩.৭৫"
                  value={sem.gpa}
                  onChange={(e) => handleGpaChange(idx, e.target.value)}
                  className="w-20 px-2 py-1 text-xs text-center font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            ওয়েটেজ: ১ম-৩য় (৫%), ৪র্থ (১০%), ৫ম (১৫%), ৬ষ্ঠ (২০%), ৭ম (২৫%), ৮ম (১৫%)
          </span>
        </div>
      </div>
    </div>
  );
};
