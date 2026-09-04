import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNavBar, TabType } from './components/BottomNavBar';
import { HomeTab } from './components/HomeTab';
import { NotesTab } from './components/NotesTab';
import { AssignmentsTab } from './components/AssignmentsTab';
import { ProfileTab } from './components/ProfileTab';

// Modals
import { RoutineModal } from './components/RoutineModal';
import { NoticeModal } from './components/NoticeModal';
import { AttendanceModal } from './components/AttendanceModal';
import { CgpaCalculatorModal } from './components/CgpaCalculatorModal';
import { BatchChatModal } from './components/BatchChatModal';
import { QuizModal } from './components/QuizModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { FlutterProjectModal } from './components/FlutterProjectModal';

// Initial Mock Datasets
import {
  initialStudentProfile,
  initialRoutine,
  initialNotices,
  initialNotes,
  initialAssignments,
  initialAttendance,
  initialChatMessages,
  initialQuizzes,
  initialSettings,
} from './data/initialData';

import { 
  NoteItem, 
  Assignment, 
  ChatMessage, 
  AppSettings,
  Notice 
} from './types';

import { Bell, Check, X } from 'lucide-react';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // App Data State
  const [student, setStudent] = useState(initialStudentProfile);
  const [routine, setRoutine] = useState(initialRoutine);
  const [notices, setNotices] = useState(initialNotices);
  const [notes, setNotes] = useState(initialNotes);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  // Modals Visibility
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isCgpaOpen, setIsCgpaOpen] = useState(false);
  const [isBatchChatOpen, setIsBatchChatOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isFlutterCodeOpen, setIsFlutterCodeOpen] = useState(false);

  // AI Assistant Parameters
  const [aiAssistantTab, setAiAssistantTab] = useState<'code' | 'summary' | 'viva'>('code');
  const [aiSummaryTitle, setAiSummaryTitle] = useState('');
  const [aiSummaryContent, setAiSummaryContent] = useState('');

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

  const handleSendMessage = (msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  const handleOpenAiSummaryForNote = (title: string, content: string) => {
    setAiSummaryTitle(title);
    setAiSummaryContent(content);
    setAiAssistantTab('summary');
    setIsAiAssistantOpen(true);
  };

  // Today routine (e.g. Sunday/রবিবার classes)
  const todayRoutine = routine.filter((r) => r.day === 'রবিবার');

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col justify-between transition-colors duration-200">
      {/* Push Notification Simulation Floating Banner */}
      {activePushNotification && (
        <div className="fixed top-14 left-4 right-4 z-50 max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-emerald-500 p-3.5 flex items-start space-x-3 animate-slideDown">
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

      {/* Main Container constrained to Mobile/Tablet Android Frame */}
      <div className="w-full max-w-md mx-auto bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col shadow-2xl relative border-x border-slate-200/80 dark:border-slate-800">
        {/* Top App Bar */}
        <TopBar
          student={student}
          darkMode={settings.darkMode}
          onToggleDarkMode={() =>
            setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }))
          }
          onOpenNotifications={() => {
            setIsNoticeOpen(true);
            setUnreadCount(0);
          }}
          onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
          unreadCount={unreadCount}
        />

        {/* Dynamic Tab Body */}
        <main className="flex-1 px-4 pt-4 overflow-x-hidden">
          {currentTab === 'home' && (
            <HomeTab
              student={student}
              todayRoutine={todayRoutine}
              notices={notices}
              assignments={assignments}
              attendance={attendance}
              onOpenRoutine={() => setIsRoutineOpen(true)}
              onOpenNotices={() => setIsNoticeOpen(true)}
              onOpenAttendance={() => setIsAttendanceOpen(true)}
              onOpenCgpa={() => setIsCgpaOpen(true)}
              onOpenBatchChat={() => setIsBatchChatOpen(true)}
              onOpenQuiz={() => setIsQuizOpen(true)}
              onOpenAiAssistant={() => {
                setAiAssistantTab('code');
                setIsAiAssistantOpen(true);
              }}
              onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'notes' && (
            <NotesTab
              notes={notes}
              onUploadNote={handleUploadNote}
              onOpenAiSummary={handleOpenAiSummaryForNote}
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
            />
          )}

          {currentTab === 'profile' && (
            <ProfileTab
              student={student}
              settings={settings}
              onUpdateSettings={(newSettings) => setSettings(newSettings)}
              onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          assignmentCount={assignments.filter((a) => a.status === 'চলমান').length}
        />
      </div>

      {/* Feature Modals */}
      <RoutineModal
        isOpen={isRoutineOpen}
        onClose={() => setIsRoutineOpen(false)}
        routine={routine}
        semester={student.semester}
        shift={student.shift}
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

      <BatchChatModal
        isOpen={isBatchChatOpen}
        onClose={() => setIsBatchChatOpen(false)}
        messages={chatMessages}
        student={student}
        onSendMessage={handleSendMessage}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        quizzes={quizzes}
      />

      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        initialTab={aiAssistantTab}
        initialSummaryTitle={aiSummaryTitle}
        initialSummaryContent={aiSummaryContent}
      />

      <FlutterProjectModal
        isOpen={isFlutterCodeOpen}
        onClose={() => setIsFlutterCodeOpen(false)}
      />
    </div>
  );
}
