import {
  StudentProfile,
  RoutineItem,
  Notice,
  NoteItem,
  Assignment,
  AttendanceSubject,
  ChatMessage,
  QuizQuestion,
  AppSettings,
} from '../types';
import { OFFICIAL_ROUTINE_2026 } from './classRoutineData';

export const initialStudentProfile: StudentProfile = {
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
  avatarUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23059669"><circle cx="50" cy="50" r="50" fill="%23ecfdf5"/><path d="M50 22a18 18 0 1 0 0 36 18 18 0 0 0 0-36zm0 43c-18.2 0-33 11.2-33 25 0 2.2 1.8 4 4 4h58c2.2 0 4-1.8 4-4 0-13.8-14.8-25-33-25z" fill="%23059669"/></svg>',
  bloodGroup: '—',
};

export const initialRoutine: RoutineItem[] = OFFICIAL_ROUTINE_2026;

export const initialNotices: Notice[] = [
  {
    id: 'n-01',
    title: 'বিটিইবি ৫ম ও ৭ম সেমিস্টার বোর্ড ফাইনাল পরীক্ষার ফরম পূরণ বিজ্ঞপ্তি',
    date: '০৩ সেপ্টেম্বর ২০২৬',
    category: 'পরীক্ষা',
    publishedBy: 'পরীক্ষা নিয়ন্ত্রণ শাখা, এনপিআই',
    isImportant: true,
    content: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ডের আওতাধীন ডিপ্লোমা ইন ইঞ্জিনিয়ারিং শিক্ষাক্রমের ৫ম এবং ৭ম সেমিস্টার বোর্ড ফাইনাল পরীক্ষার নিয়মিত ও অনিয়মিত শিক্ষার্থীদের আগামী ১৫ সেপ্টেম্বরের মধ্যে অনলাইন ফি প্রদান ও ফরম পূরণ সম্পন্ন করার নির্দেশ দেওয়া হচ্ছে। নির্ধারিত সময়ের পর কোনো আবেদন গ্রহণযোগ্য হবে না।',
    attachmentName: 'form_fillup_notice_2026.pdf',
    fileSize: '১.২ মেগাবাইট',
  },
  {
    id: 'n-02',
    title: 'কম্পিউটার ডিপার্টমেন্টের ৩য় ও ৫ম সেমিস্টারের ল্যাব মিড-টার্ম ভাইভা সময়সূচি',
    date: '০১ সেপ্টেম্বর ২০২৬',
    category: 'একাডেমিক',
    publishedBy: 'বিভাগীয় প্রধান, সিএসটি বিভাগ',
    isImportant: true,
    content: 'সিএসটি ডিপার্টমেন্টের সকল শিক্ষার্থীর অবগতির জন্য জানানো যাচ্ছে যে, আগামী রবিবার থেকে সফটওয়্যার ল্যাব এবং কম্পিউটার ল্যাব-১ এ সেমিস্টার মিড-টার্মের ব্যবহারিক খাতা যাচাই ও ল্যাব ভাইভা অনুষ্ঠিত হবে। সবাইকে নির্ধারিত ল্যাব অ্যাপ্রন ও প্র্যাকটিক্যাল খাতা সাথে আনার নির্দেশ দেওয়া হলো।',
    attachmentName: 'cst_lab_viva_schedule.pdf',
    fileSize: '৮৫০ কিলোবাইট',
  },
  {
    id: 'n-03',
    title: 'পবিত্র ঈদে মিলাদুন্নবী উপলক্ষে প্রতিষ্ঠান বন্ধের বিজ্ঞপ্তি',
    date: '২৮ আগস্ট ২০২৬',
    category: 'ছুটি',
    publishedBy: 'অধ্যক্ষ মহোদয়ের কার্যালয়, নরসিংদী পলিটেকনিক',
    isImportant: false,
    content: 'সকল শিক্ষক, কর্মকর্তা, কর্মচারী ও শিক্ষার্থীদের অবগতির জন্য জানানো যাচ্ছে যে, পবিত্র ঈদে মিলাদুন্নবী (সা.) উপলক্ষে আগামী ১৬ সেপ্টেম্বর প্রতিষ্ঠান সকল প্রকার ক্লাস ও প্রশাসনিক কার্যক্রম বন্ধ থাকবে। পরবর্তী কার্যদিবসে যথারীতি প্রতিষ্ঠান চলবে।',
  },
  {
    id: 'n-04',
    title: 'জাতীয় দক্ষতা উৎসব ও প্রজেক্ট প্রদর্শনীতে অংশগ্রহণ প্রসঙ্গে',
    date: '২৫ আগস্ট ২০২৬',
    category: 'অন্যান্য',
    publishedBy: 'প্রজেক্ট সমন্বয়ক, সিএসটি',
    isImportant: false,
    content: 'সিএসটি ডিপার্টমেন্টের যেসব দল ওয়েব, মোবাইল অ্যাপ বা আইওটি (IoT) প্রজেক্টে কাজ করছ, তাদেরকে আগামী ১০ সেপ্টেম্বরের মধ্যে নিজ নিজ আইডিয়া ও ডেমো প্রজেক্ট বিভাগীয় অফিসে জমা দিতে বলা হচ্ছে। নির্বাচিত ৩টি টিম জাতীয় পর্যায়ে এনপিআই-এর প্রতিনিধিত্ব করবে।',
  },
];

export const initialNotes: NoteItem[] = [
  {
    id: 'nt-01',
    title: 'ডাটা স্ট্রাকচার ও অ্যালগরিদম হ্যান্ডনোট (অধ্যায় ১-৫)',
    subjectCode: '২৮৫৮১',
    subjectName: 'ডাটা স্ট্রাকচার অ্যান্ড অ্যালগরিদম',
    semester: '৫ম সেমিস্টার',
    uploaderName: 'প্রকৌ. মোঃ তরিকুল ইসলাম',
    uploadDate: '২৮ আগস্ট ২০২৬',
    fileSize: '৪.৫ মেগাবাইট',
    fileType: 'PDF',
    downloadCount: 348,
    category: 'হ্যান্ডনোট',
    previewContent: `অধ্যায় ১: ডাটা স্ট্রাকচারের প্রাথমিক ধারণা
- Data vs Information
- Primitive & Non-Primitive Data Structure
- Linear Data Structure (Array, Stack, Queue, Linked List)
- Non-Linear Data Structure (Tree, Graph)
- Time Complexity এবং Space Complexity (Big-O Notation)

অ্যারে ও লিংকড লিস্টের মধ্যে প্রধান পার্থক্য:
১. অ্যারের সাইজ স্ট্যাটিক বা নির্দিষ্ট, লিংকড লিস্টের সাইজ ডায়নামিক।
২. অ্যারের ইনসার্শন মেমোরি কনটিগুয়াস, লিংকড লিস্টের মেমোরি র‍্যান্ডম পয়েন্টারভিত্তিক।`,
  },
  {
    id: 'nt-02',
    title: 'জাভা ও অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং (OOP) পূর্ণাঙ্গ গাইড',
    subjectCode: '২৮৫৮৩',
    subjectName: 'জাভা প্রোগ্রামিং',
    semester: '৫ম সেমিস্টার',
    uploaderName: 'সিএসটি ডিপার্টমেন্ট',
    uploadDate: '৩০ আগস্ট ২০২৬',
    fileSize: '৬.২ মেগাবাইট',
    fileType: 'PDF',
    downloadCount: 412,
    category: 'পরীক্ষার সাজেশন',
    previewContent: `OOP-এর ৪টি মূল স্তম্ভ:
১. Encapsulation: ডাটা ও মেথডকে একটি ইউনিটের মধ্যে আবদ্ধ রাখা (যেমন: প্রাইভেট ভেরিয়েবল ও গেটার/সেটার)।
২. Inheritance: এক ক্লাসের বৈশিষ্ট্য অন্য ক্লাসে পুনর্ব্যবহার করা (extends কিওয়ার্ড)।
৩. Polymorphism: একই মেথডের ভিন্ন ভিন্ন আচরণ (Method Overloading & Overriding)।
৪. Abstraction: অভ্যন্তরীণ জটিলতা গোপন রেখে শুধু প্রয়োজনীয় ফিচার প্রদর্শন করা (abstract class & interface)।`,
  },
  {
    id: 'nt-03',
    title: 'ডাটাবেস ম্যানেজমেন্ট সিস্টেম - SQL কুয়েরি ও নরম্যালাইজেশন চিটশিট',
    subjectCode: '২৮৫৮৫',
    subjectName: 'ডাটাবেস ম্যানেজমেন্ট সিস্টেম (DBMS)',
    semester: '৫ম সেমিস্টার',
    uploaderName: 'সিএসটি স্টুডেন্ট ফোরাম',
    uploadDate: '২৫ আগস্ট ২০২৬',
    fileSize: '৩.১ মেগাবাইট',
    fileType: 'PDF',
    downloadCount: 521,
    category: 'চিটশিট',
    previewContent: `নরম্যালাইজেশন (Normalization) নিয়মাবলি:
- 1NF: কোনো কলামে মাল্টি-ভ্যালুড অ্যাট্রিবিউট বা অ্যারে থাকবে না, প্রতিটি মান হবে অ্যাটমিক।
- 2NF: রিলেশনকে 1NF হতে হবে এবং কোনো পার্শিয়াল ডিপেনডেন্সি (Partial Dependency) থাকবে না।
- 3NF: রিলেশনকে 2NF হতে হবে এবং কোনো ট্রানজিটিভ ডিপেনডেন্সি (Transitive Dependency) থাকবে না।
- BCNF: প্রতিটি ডিটারমিন্যান্ট অবশ্যই সুপার কি (Super Key) হতে হবে।`,
  },
  {
    id: 'nt-04',
    title: 'মাইক্রোপ্রসেসর ৮০৮৬ আর্কিটেকচার ও পিন ডায়াগ্রাম লেকচার নোট',
    subjectCode: '২৮৫৮৬',
    subjectName: 'মাইক্রোপ্রসেসর ও ইন্টারফেসিং',
    semester: '৫ম সেমিস্টার',
    uploaderName: 'প্রকৌ. মাহবুবুর রহমান',
    uploadDate: '২০ আগস্ট ২০২৬',
    fileSize: '৫.৮ মেগাবাইট',
    fileType: 'PDF',
    downloadCount: 290,
    category: 'লেকচার স্লাইড',
    previewContent: `8086 মাইক্রোপ্রসেসরের প্রধান ২টি অংশ:
১. BIU (Bus Interface Unit): ইনস্ট্রাকশন ফেচ করা, অ্যাড্রেস ক্যালকুলেশন এবং ডাটা রিড/রাইট নিয়ন্ত্রণ করে।
২. EU (Execution Unit): ফেচ করা ইনস্ট্রাকশন ডিকোড ও এক্সিকিউট করে (ALU, ফ্ল্যাগ রেজিস্টার ও জেনারেল রেজিস্টার অন্তর্ভুক্ত)।
- ১৬ বিট আর্কিটেকচার, ২০ বিট অ্যাড্রেস বাস (সর্বোচ্চ ১ মেগাবাইট মেমোরি অ্যাড্রেস করতে পারে)।`,
  },
];

export const initialAssignments: Assignment[] = [
  {
    id: 'as-01',
    title: 'ডাটা স্ট্রাকচারে স্ট্যাক ও কিউ বাস্তবায়ন (C++ বা জাভা)',
    subjectCode: '২৮৫৮১',
    subjectName: 'ডাটা স্ট্রাকচার অ্যান্ড অ্যালগরিদম',
    teacherName: 'প্রকৌ. মোঃ তরিকুল ইসলাম',
    assignedDate: '২৮ আগস্ট ২০২৬',
    dueDate: '০৭ সেপ্টেম্বর ২০২৬',
    daysRemaining: 3,
    status: 'চলমান',
    description: 'লিংকড লিস্ট অথবা অ্যারে ব্যবহার করে Stack (Push, Pop, Peek) এবং Circular Queue-এর পূর্ণ কোড লিখে তার আউটপুট স্ক্রিনশটসহ প্র্যাকটিক্যাল খাতায় উপস্থাপন করতে হবে।',
    maxMarks: 20,
  },
  {
    id: 'as-02',
    title: 'রেসপনসিভ পলিটেকনিক স্টুডেন্ট পোর্টাল UI ডিজাইন',
    subjectCode: '২৮৫৮২',
    subjectName: 'ওয়েব ডেভেলপমেন্ট ফান্ডামেন্টালস',
    teacherName: 'মোসাঃ নাসরিন আক্তার',
    assignedDate: '০১ সেপ্টেম্বর ২০২৬',
    dueDate: '১০ সেপ্টেম্বর ২০২৬',
    daysRemaining: 6,
    status: 'চলমান',
    description: 'এইচটিএমএল৫, সিএসএস৩ এবং জাভাস্ক্রিপ্ট অথবা টেলউইন্ড ব্যবহার করে একটি পূর্ণাঙ্গ রেসপনসিভ ড্যাশবোর্ড তৈরি করে গিটহাব রিপোজিটরির লিংক ল্যাব ফর্মে সাবমিট করতে হবে।',
    maxMarks: 25,
  },
  {
    id: 'as-03',
    title: 'লাইব্রেরি ম্যানেজমেন্ট সিস্টেমের জন্য ER ডায়াগ্রাম ও স্কিমা ডিজাইন',
    subjectCode: '২৮৫৮৫',
    subjectName: 'ডাটাবেস ম্যানেজমেন্ট সিস্টেম (DBMS)',
    teacherName: 'প্রকৌ. ফারহানা জামান',
    assignedDate: '২০ আগস্ট ২০২৬',
    dueDate: '৩০ আগস্ট ২০২৬',
    daysRemaining: 0,
    status: 'সম্পন্ন',
    description: 'নরসসিংদী পলিটেকনিকের সেন্ট্রাল লাইব্রেরির জন্য স্টুডেন্ট, বুক, লোন ও ফাইন টেবিলের ER ডায়াগ্রাম এঁকে 3NF পর্যন্ত নরমালাইজ করতে হবে।',
    maxMarks: 15,
  },
  {
    id: 'as-04',
    title: '৮০৮৬ অ্যাসেম্বলি ল্যাঙ্গুয়েজে দুটি ১৬-বিট সংখ্যার যোগ ও বিয়োগ',
    subjectCode: '২৮৫৮৬',
    subjectName: 'মাইক্রোপ্রসেসর ও ইন্টারফেসিং',
    teacherName: 'প্রকৌ. মাহবুবুর রহমান',
    assignedDate: '০২ সেপ্টেম্বর ২০২৬',
    dueDate: '১২ সেপ্টেম্বর ২০২৬',
    daysRemaining: 8,
    status: 'চলমান',
    description: 'EMU8086 এমুলেটরে অ্যাসেম্বলি প্রোগ্রাম রান করে রেজিস্টারের ফ্ল্যাগ পরিবর্তন পর্যবেক্ষণ করো এবং রিপোর্ট লিখে আনো।',
    maxMarks: 20,
  },
];

export const initialAttendance: AttendanceSubject[] = [
  {
    id: 'att-01',
    subjectCode: '26831',
    subjectName: 'Digital Electronics',
    totalClasses: 22,
    attendedClasses: 20,
    percentage: 90.9,
    status: 'উত্তম',
  },
  {
    id: 'att-02',
    subjectCode: '25931',
    subjectName: 'Mathematics-3',
    totalClasses: 26,
    attendedClasses: 24,
    percentage: 92.3,
    status: 'উত্তম',
  },
  {
    id: 'att-03',
    subjectCode: '28531',
    subjectName: 'Application Development Using Python',
    totalClasses: 24,
    attendedClasses: 22,
    percentage: 91.7,
    status: 'উত্তম',
  },
  {
    id: 'att-04',
    subjectCode: '25922',
    subjectName: 'Physics-2',
    totalClasses: 20,
    attendedClasses: 18,
    percentage: 90.0,
    status: 'উত্তম',
  },
  {
    id: 'att-05',
    subjectCode: '25811',
    subjectName: 'Social Science',
    totalClasses: 16,
    attendedClasses: 14,
    percentage: 87.5,
    status: 'উত্তম',
  },
  {
    id: 'att-06',
    subjectCode: '28533',
    subjectName: 'IT Support Services',
    totalClasses: 22,
    attendedClasses: 19,
    percentage: 86.4,
    status: 'উত্তম',
  },
  {
    id: 'att-07',
    subjectCode: '28532',
    subjectName: 'Computer Graphics Design-2',
    totalClasses: 18,
    attendedClasses: 16,
    percentage: 88.9,
    status: 'উত্তম',
  },
];

const DEFAULT_STUDENT_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23059669"><circle cx="50" cy="50" r="50" fill="%23ecfdf5"/><path d="M50 22a18 18 0 1 0 0 36 18 18 0 0 0 0-36zm0 43c-18.2 0-33 11.2-33 25 0 2.2 1.8 4 4 4h58c2.2 0 4-1.8 4-4 0-13.8-14.8-25-33-25z" fill="%23059669"/></svg>';

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-01',
    senderName: 'সহপাঠী শিক্ষার্থী',
    senderRoll: '৫৮৯২০১',
    senderAvatar: DEFAULT_STUDENT_AVATAR,
    timestamp: 'সকাল ০৯:১৫',
    text: 'বন্ধুরা, আজকের ক্লাসে ল্যাবের প্র্যাকটিক্যাল জমা দেওয়ার নিয়ম কী?',
    isCurrentUser: false,
    tag: 'প্রশ্ন',
  },
  {
    id: 'msg-02',
    senderName: 'সিএসটি সহপাঠী',
    senderRoll: '৫৮৯২১৫',
    senderAvatar: DEFAULT_STUDENT_AVATAR,
    timestamp: 'সকাল ০৯:১৭',
    text: 'হ্যাঁ, অ্যাসাইনমেন্টটা আগামী সোমবারের মধ্যে জমা নিতে চেয়েছেন। খাতার সাথে কোড প্রিন্ট করতে হবে।',
    isCurrentUser: false,
  },
  {
    id: 'msg-03',
    senderName: 'আপনি',
    senderRoll: '—',
    senderAvatar: DEFAULT_STUDENT_AVATAR,
    timestamp: 'সকাল ০৯:২০',
    text: 'আমি নোট সেকশনে হ্যান্ডনোট আর কোডের পিডিএফ আপলোড করে রেখেছি। সবাই ডাউনলোড করে নিতে পারো!',
    isCurrentUser: true,
  },
  {
    id: 'msg-04',
    senderName: 'সহপাঠী',
    senderRoll: '৫৮৯২২০',
    senderAvatar: DEFAULT_STUDENT_AVATAR,
    timestamp: 'সকাল ০৯:২২',
    text: 'ধন্যবাদ! আজকের ল্যাব ক্লাস নির্দিষ্ট ল্যাবেই অনুষ্ঠিত হবে।',
    isCurrentUser: false,
  },
];

export const initialQuizzes: QuizQuestion[] = [
  {
    id: 'q-c-1',
    category: 'C',
    question: 'সি (C) প্রোগ্রামে ডায়নামিক মেমোরি অ্যালোকেশনের জন্য কোন ফাংশনটি মেমোরি জিরো (০) দ্বারা ইনিশিয়ালাইজ করে?',
    options: ['malloc()', 'calloc()', 'realloc()', 'free()'],
    correctIndex: 1,
    explanation: 'calloc() মেমোরি ব্লক বরাদ্দ করার পর প্রতিটি বাইটকে 0 দ্বারা ইনিশিয়ালাইজ করে, যেখানে malloc() মেমোরিতে গারবেজ ভ্যালু রাখে।',
  },
  {
    id: 'q-c-2',
    category: 'C',
    question: 'নিচের কোড সেগমেন্টটির আউটপুট কী হবে?\nint x = 5;\nprintf("%d %d", x++, ++x);',
    codeSnippet: 'int x = 5;\nprintf("%d %d", ++x, x++);',
    options: ['7 5', '6 6', 'অনির্ধারিত (Undefined Behavior)', '6 5'],
    correctIndex: 2,
    explanation: 'একই স্টেটমেন্টে একটি ভেরিয়েবলের ওপর একাধিক ইনক্রিমেন্ট সি স্ট্যান্ডার্ডে Undefined Behavior তৈরি করে, যা কম্পাইলার ভেদে ভিন্ন হতে পারে।',
  },
  {
    id: 'q-cpp-1',
    category: 'C++',
    question: 'C++ এ রান-টাইম পলিমরফিজম (Runtime Polymorphism) অর্জনের জন্য নিচের কোনটি ব্যবহার করা হয়?',
    options: ['Function Overloading', 'Virtual Functions', 'Operator Overloading', 'Templates'],
    correctIndex: 1,
    explanation: 'ভার্চুয়াল ফাংশন এবং বেস ক্লাস পয়েন্টার ব্যবহার করে রান-টাইমে মেথড বাইন্ডিং সম্পন্ন হয়, যা রান-টাইম পলিমরফিজম নিশ্চিত করে।',
  },
  {
    id: 'q-cpp-2',
    category: 'C++',
    question: 'C++ এ কোন ক্লাসের অবজেক্ট তৈরি করা যায় না যদি সেটিতে কমপক্ষে একটি কী থাকে?',
    options: ['Friend Function', 'Pure Virtual Function', 'Static Member', 'Copy Constructor'],
    correctIndex: 1,
    explanation: 'যে ক্লাসে অন্তত একটি Pure Virtual Function (virtual void func() = 0;) থাকে তাকে Abstract Class বলে, এর সরাসরি অবজেক্ট তৈরি সম্ভব নয়।',
  },
  {
    id: 'q-py-1',
    category: 'Python',
    question: 'পাইথনে নিচের কোন ডাটা টাইপটি মিউটেবল (Mutable বা পরিবর্তনযোগ্য)?',
    options: ['Tuple', 'String', 'List', 'FrozenSet'],
    correctIndex: 2,
    explanation: 'পাইথনে List এবং Dictionary পরিবর্তনযোগ্য (Mutable), কিন্তু Tuple এবং String অপরিবর্তনযোগ্য (Immutable)।',
  },
  {
    id: 'q-py-2',
    category: 'Python',
    question: 'নিচের পাইথন কোডের ফলাফল কী হবে?\nprint(type(lambda x: x*2))',
    codeSnippet: 'f = lambda x: x * 2\nprint(type(f).__name__)',
    options: ['int', 'function', 'lambda', 'generator'],
    correctIndex: 1,
    explanation: 'পাইথনে লাম্বডা (Lambda) এক্সপ্রেশন আসলে অ্যানোনিমাস ফাংশন তৈরি করে, যার টাইপ হলো function।',
  },
];

export const initialSettings: AppSettings = {
  language: 'বাংলা',
  darkMode: false,
  notificationsEnabled: true,
  routineAlerts: true,
  soundEnabled: true,
};
