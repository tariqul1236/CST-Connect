import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { HomeTab } from './components/HomeTab';
import { NotesTab } from './components/NotesTab';
import { AssignmentsTab } from './components/AssignmentsTab';

// Modals
import { RoutineModal } from './components/RoutineModal';
import { NoticeModal } from './components/NoticeModal';
import { AttendanceModal } from './components/AttendanceModal';
import { CgpaCalculatorModal } from './components/CgpaCalculatorModal';
import { QuizModal } from './components/QuizModal';
import { FlutterProjectModal } from './components/FlutterProjectModal';
import { ApkDownloadModal } from './components/ApkDownloadModal';

// Firebase Auth Context (kept intact for backend, but UI disabled)
import { AuthProvider } from './context/AuthContext';

// Initial Datasets
import {
  initialRoutine,
  initialNotices,
  initialNotes,
  initialAssignments,
  initialAttendance,
  initialQuizzes,
  initialSettings,
} from './data/initialData';
import { getBengaliDayName, WEEKDAYS_WITH_CLASSES } from './data/classRoutineData';

import { 
  StudentProfile,
  NoteItem, 
  Assignment, 
  AppSettings
} from './types';

import { Bell, X } from 'lucide-react';

export type DashboardTab = 'home' | 'notes' | 'assignments';

function AppContent() {
  // Navigation Tab (Default: direct home dashboard)
  const [currentTab, setCurrentTab] = useState<DashboardTab>('home');

  // App Data State
  const [routine, setRoutine] = useState(initialRoutine);
  const [notices, setNotices] = useState(initialNotices);
  const [notes, setNotes] = useState(initialNotes);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  // Modals Visibility
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isCgpaOpen, setIsCgpaOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isFlutterCodeOpen, setIsFlutterCodeOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);

  // Push Notification Simulation Banner
  const [activePushNotification, setActivePushNotification] = useState<{
    id: string;
    title: string;
    body: string;
  } | null>(null);

  // Unread notice count
  const [unreadCount, setUnreadCount] = useState(2);

  // Sync Dark Mode with document
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Push Notification Sender
  const triggerPushNotification = (title: string, body: string = 'ডিপার্টমেন্ট নোটিশ বোর্ডে বিস্তারিত দেখুন') => {
    setActivePushNotification({
      id: `${Date.now()}`,
      title,
      body,
    });
    setUnreadCount((prev) => prev + 1);

    setTimeout(() => {
      setActivePushNotification(null);
    }, 5000);
  };

  // Handlers
  const handleToggleAssignmentStatus = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'সম্পন্ন' ? 'চলমান' : 'সম্পন্ন';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleAddAssignment = (newAssignment: Assignment) => {
    setAssignments((prev) => [newAssignment, ...prev]);
    triggerPushNotification(
      `নতুন অ্যাসাইনমেন্ট: ${newAssignment.title}`,
      `জমা দেওয়ার শেষ তারিখ: ${newAssignment.dueDate}`
    );
  };

  const handleUploadNote = (newNote: NoteItem) => {
    setNotes((prev) => [newNote, ...prev]);
    triggerPushNotification(
      `নতুন নোট আপলোড হয়েছে: ${newNote.title}`,
      `${newNote.subjectName} (${newNote.uploaderName})`
    );
  };

  const handleQuickCheckIn = (subjectId: string) => {
    setAttendance((prev) =>
      prev.map((item) => {
        if (item.id === subjectId) {
          const newAttended = item.attendedClasses + 1;
          const newTotal = item.totalClasses + 1;
          const newPercent = Number(((newAttended / newTotal) * 100).toFixed(1));
          return {
            ...item,
            attendedClasses: newAttended,
            totalClasses: newTotal,
            percentage: newPercent,
            status: newPercent >= 80 ? 'উত্তম' : newPercent >= 70 ? 'সতর্কতা' : 'ঝুঁকিপূর্ণ',
          };
        }
        return item;
      })
    );
  };

  // Academic Student Profile with strictly zero hardcoded demo personal data
  const academicStudentProfile: StudentProfile = {
    id: 'cst-student',
    name: 'CST শিক্ষার্থী',
    studentId: '—',
    registrationNo: '—',
    semester: '৩য় সেমিস্টার',
    shift: '২য় শিফট',
    group: 'ক',
    department: 'কম্পিউটার (CST)',
    institute: 'নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট',
    session: '২০২৪-২৫',
    email: '',
    phone: '—',
    avatarUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23ecfdf5"/><path d="M50 22a18 18 0 1 0 0 36 18 18 0 0 0 0-36zm0 43c-18.2 0-33 11.2-33 25 0 2.2 1.8 4 4 4h58c2.2 0 4-1.8 4-4 0-13.8-14.8-25-33-25z" fill="%23059669"/></svg>',
    bloodGroup: '—',
  };

  // Today routine calculation (Sunday to Thursday: today; Friday/Saturday: Sunday preview)
  const todayDayName = getBengaliDayName();
  const targetDayForHome = WEEKDAYS_WITH_CLASSES.includes(todayDayName) ? todayDayName : 'রবিবার';
  const todayRoutine = routine.filter((r) => r.day === targetDayForHome);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 sm:bg-slate-100 sm:dark:bg-slate-950 flex flex-col justify-between overflow-x-hidden transition-colors duration-200">
      {/* Push Notification Simulation Floating Banner */}
      {activePushNotification && (
        <div className="fixed top-3 sm:top-14 left-3 right-3 sm:left-4 sm:right-4 z-50 max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-emerald-500 p-3 sm:p-3.5 flex items-start space-x-3 animate-slideDown">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                CST Connect • নোটিফিকেশন
              </span>
              <span className="text-[10px] text-slate-400">এখন</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate mt-0.5">
              {activePushNotification.title}
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
              {activePushNotification.body}
            </p>
          </div>
          <button
            onClick={() => setActivePushNotification(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Container constrained to Mobile/Tablet Frame */}
      <div className="w-full max-w-full sm:max-w-md mx-auto bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col shadow-none sm:shadow-2xl relative border-x-0 sm:border-x border-slate-200/80 dark:border-slate-800 overflow-x-hidden">
        {/* Top App Bar */}
        <TopBar
          student={academicStudentProfile}
          darkMode={settings.darkMode}
          onToggleDarkMode={() =>
            setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }))
          }
          onOpenNotifications={() => {
            setIsNoticeOpen(true);
            setUnreadCount(0);
          }}
          onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
          onOpenApkModal={() => setIsApkModalOpen(true)}
          unreadCount={unreadCount}
        />

        {/* Dynamic Tab Body (Direct Dashboard) */}
        <main className="flex-1 w-full max-w-full px-3.5 sm:px-4 pt-3.5 sm:pt-4 pb-6 overflow-x-hidden">
          {currentTab === 'home' && (
            <HomeTab
              student={academicStudentProfile}
              todayRoutine={todayRoutine}
              notices={notices}
              assignments={assignments}
              attendance={attendance}
              onOpenRoutine={() => setIsRoutineOpen(true)}
              onOpenNotices={() => setIsNoticeOpen(true)}
              onOpenAttendance={() => setIsAttendanceOpen(true)}
              onOpenCgpa={() => setIsCgpaOpen(true)}
              onOpenQuiz={() => setIsQuizOpen(true)}
              onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
              onOpenApkModal={() => setIsApkModalOpen(true)}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'notes' && (
            <NotesTab
              notes={notes}
              currentUserName={academicStudentProfile.name}
              onUploadNote={handleUploadNote}
              onBackToDashboard={() => setCurrentTab('home')}
            />
          )}

          {currentTab === 'assignments' && (
            <AssignmentsTab
              assignments={assignments}
              onToggleStatus={handleToggleAssignmentStatus}
              onAddAssignment={handleAddAssignment}
              onSendReminder={(title, days) =>
                triggerPushNotification(
                  `অ্যাসাইনমেন্ট রিমাইন্ডার: ${title}`,
                  `জমা দিতে আর মাত্র ${days} দিন বাকি!`
                )
              }
              onBackToDashboard={() => setCurrentTab('home')}
            />
          )}
        </main>
      </div>

      {/* Feature Modals (Educational & Routine tools) */}
      <RoutineModal
        isOpen={isRoutineOpen}
        onClose={() => setIsRoutineOpen(false)}
        routine={routine}
        semester={academicStudentProfile.semester}
        shift={academicStudentProfile.shift}
        onTriggerNotification={(title, msg) => triggerPushNotification(title, msg)}
      />

      <NoticeModal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        notices={notices}
        onSendSimulatedNotification={(title) =>
          triggerPushNotification(title, 'নরসিংদী পলিটেকনিক CST নোটিশ বোর্ড')
        }
      />

      <AttendanceModal
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
        attendanceData={attendance}
        onQuickCheckIn={handleQuickCheckIn}
      />

      <CgpaCalculatorModal
        isOpen={isCgpaOpen}
        onClose={() => setIsCgpaOpen(false)}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        quizzes={quizzes}
      />

      <FlutterProjectModal
        isOpen={isFlutterCodeOpen}
        onClose={() => setIsFlutterCodeOpen(false)}
      />

      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
