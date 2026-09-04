export interface StudentProfile {
  name: string;
  roll: string;
  regNo: string;
  session: string;
  semester: string; // যেমন: "৫ম পর্ব"
  shift: '১ম শিফট' | '২য় শিফট';
  group: 'A' | 'B';
  department: string; // "কম্পিউটার সায়েন্স অ্যান্ড টেকনোলজি (CST)"
  institute: string; // "নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট"
  email: string;
  phone: string;
  bloodGroup: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
}

export interface ClassRoutineItem {
  id: string;
  day: 'শনিবার' | 'রবিবার' | 'সোমবার' | 'মঙ্গলবার' | 'বুধবার' | 'বৃহস্পতিবার';
  period: number;
  time: string; // যেমন: "০৮:০০ - ০৯:৩০"
  subjectCode: string;
  subjectName: string;
  roomNo: string;
  teacherName: string;
  teacherDesignation: string;
  type: 'তত্ত্বীয় (Theory)' | 'ব্যবহারিক (Practical)';
  semester: string;
  shift: '১ম শিফট' | '২য় শিফট';
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: 'একাডেমিক' | 'পরীক্ষা' | 'ক্লাস রুটিন' | 'বৃত্তি/উপবৃত্তি' | 'সাধারণ';
  content: string;
  issuedBy: string;
  isPinned?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  subjectName: string;
  subjectCode: string;
  semester: string;
  uploaderName: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'DOC' | 'TXT';
  downloadCount: number;
  contentSample: string; // Text content for AI summarizer
  tags: string[];
}

export interface AssignmentItem {
  id: string;
  title: string;
  subjectName: string;
  deadline: string; // "২০২৬-০৯-১৫"
  daysRemaining: number;
  teacherName: string;
  description: string;
  isCompleted: boolean;
  reminderEnabled: boolean;
  totalMarks?: number;
}

export interface AttendanceSubject {
  id: string;
  subjectName: string;
  subjectCode: string;
  totalClasses: number;
  attendedClasses: number;
  lastUpdated: string;
}

export interface QuizQuestion {
  id: string;
  category: 'C' | 'C++' | 'Python';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRoll: string;
  senderShift: string;
  text: string;
  timestamp: string;
  isMe?: boolean;
  avatarColor?: string;
}

export interface SemesterCGPA {
  semesterName: string;
  weight2016: number; // percentage e.g. 5
  weight2022: number;
  gpa: number; // 0.00 to 4.00
}
