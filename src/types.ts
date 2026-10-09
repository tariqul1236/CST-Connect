export interface StudentProfile {
  id: string;
  name: string;
  studentId: string; // Roll number e.g. 542109
  registrationNo: string; // Reg e.g. 1502189402
  semester: string; // e.g. "৫ম সেমিস্টার"
  shift: string; // "১ম শিফট" | "২য় শিফট"
  group: string; // "ক" | "খ"
  department: string; // "কম্পিউটার সায়েন্স অ্যান্ড টেকনোলজি (CST)"
  institute: string; // "নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট"
  session: string; // "২০২১-২২"
  email: string;
  phone: string;
  avatarUrl: string;
  bloodGroup: string;
}

export interface RoutineItem {
  id: string;
  day: 'রবিবার' | 'সোমবার' | 'মঙ্গলবার' | 'বুধবার' | 'বৃহস্পতিবার' | 'শুক্রবার' | 'শনিবার';
  period: number;
  periodSpan?: string;
  startPeriod?: number;
  endPeriod?: number;
  time: string;
  startTime?: string;
  endTime?: string;
  subjectCode: string;
  subjectName: string;
  teacherName: string;
  teacherInitial: string;
  room: string;
  isLab: boolean;
  isFree?: boolean;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'একাডেমিক' | 'পরীক্ষা' | 'ছুটি' | 'অন্যান্য';
  content: string;
  publishedBy: string;
  isImportant: boolean;
  attachmentName?: string;
  fileSize?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  semester: string;
  uploaderName: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'DOC' | 'PPT';
  downloadCount: number;
  previewContent: string;
  category: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  daysRemaining: number;
  status: 'চলমান' | 'সম্পন্ন' | 'বিলম্বিত';
  description: string;
  maxMarks: number;
}

export interface AttendanceSubject {
  id: string;
  subjectCode: string;
  subjectName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: 'উত্তম' | 'সতর্কতা' | 'ঝুঁকিপূর্ণ';
}

export interface SemesterResult {
  semester: number;
  name: string;
  gpa: number;
  weight: number; // percentage in BTEB regulation
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRoll: string;
  senderAvatar: string;
  timestamp: string;
  text: string;
  isCurrentUser: boolean;
  tag?: string;
}

export interface QuizQuestion {
  id: string;
  category: 'C' | 'C++' | 'Python';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AppSettings {
  language: 'বাংলা';
  darkMode: boolean;
  notificationsEnabled: boolean;
  routineAlerts: boolean;
  soundEnabled: boolean;
}

export interface AppUser {
  uid: string;
  name: string;
  studentId: string;
  email: string;
  semester: string;
  technology: string;
  shift: string;
  profileImage?: string;
  createdAt: string;
  lastSeen: string;
  online: boolean;
}

export interface ChatConversation {
  id: string;
  participants: string[];
  participantDetails?: {
    [uid: string]: {
      name: string;
      studentId: string;
      profileImage?: string;
      semester?: string;
      technology?: string;
      shift?: string;
      online?: boolean;
    };
  };
  lastMessage: string;
  lastMessageTime: string;
  lastSenderId?: string;
  unreadCounts?: {
    [uid: string]: number;
  };
  updatedAt?: string;
}

export interface ChatMessageRecord {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

