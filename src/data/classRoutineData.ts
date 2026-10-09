import { RoutineItem } from '../types';

export interface RoutineMetadata {
  title: string;
  institute: string;
  department: string;
  semester: string;
  shift: string;
  academicYear: string;
}

export interface PeriodDefinition {
  periodNumber: number;
  bengaliPeriod: string;
  time: string;
  startTime: string; // 'HH:mm' 24-hr format
  endTime: string;   // 'HH:mm' 24-hr format
}

export interface TeacherDefinition {
  initial: string;
  fullName: string;
}

export interface SubjectDefinition {
  code: string;
  name: string;
  teacherInitial: string;
  teacherName: string;
}

// প্রতিষ্ঠান ও রুটিন পরিচিতি
export const ROUTINE_METADATA: RoutineMetadata = {
  title: 'CLASS ROUTINE-2026',
  institute: 'নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট',
  department: 'কম্পিউটার (CST)',
  semester: '৩য় সেমিস্টার',
  shift: '২য় শিফট',
  academicYear: '২০২৬',
};

// ক্লাসের সময়সূচি (১ম থেকে ৭ম পিরিয়ড)
export const PERIODS_INFO: Record<number, PeriodDefinition> = {
  1: { periodNumber: 1, bengaliPeriod: '১ম পিরিয়ড', time: '১:৩০–২:১৫', startTime: '13:30', endTime: '14:15' },
  2: { periodNumber: 2, bengaliPeriod: '২য় পিরিয়ড', time: '২:১৫–৩:০০', startTime: '14:15', endTime: '15:00' },
  3: { periodNumber: 3, bengaliPeriod: '৩য় পিরিয়ড', time: '৩:০০–৩:৪৫', startTime: '15:00', endTime: '15:45' },
  4: { periodNumber: 4, bengaliPeriod: '৪র্থ পিরিয়ড', time: '৩:৪৫–৪:৩০', startTime: '15:45', endTime: '16:30' },
  5: { periodNumber: 5, bengaliPeriod: '৫ম পিরিয়ড', time: '৪:৩০–৫:১৫', startTime: '16:30', endTime: '17:15' },
  6: { periodNumber: 6, bengaliPeriod: '৬ষ্ঠ পিরিয়ড', time: '৫:১৫–৬:০০', startTime: '17:15', endTime: '18:00' },
  7: { periodNumber: 7, bengaliPeriod: '৭ম পিরিয়ড', time: '৬:০০–৬:৪৫', startTime: '18:00', endTime: '18:45' },
};

// শিক্ষকদের তথ্য
export const TEACHERS_INFO: Record<string, TeacherDefinition> = {
  MMH: { initial: 'MMH', fullName: 'Md. Mahabub Hasan' },
  MEH: { initial: 'MEH', fullName: 'Md. Ekramul Haque' },
  AM:  { initial: 'AM',  fullName: 'Abdul Muhit' },
  MHS: { initial: 'MHS', fullName: 'Mahmudul Hasan Siddique' },
  JUB: { initial: 'JUB', fullName: 'Jomir Uddin Bhuiyan' },
};

// বিষয় ও কোড
export const SUBJECTS_INFO: Record<string, SubjectDefinition> = {
  '25811': {
    code: '25811',
    name: 'Social Science',
    teacherInitial: 'MHS',
    teacherName: 'Mahmudul Hasan Siddique',
  },
  '25922': {
    code: '25922',
    name: 'Physics-2',
    teacherInitial: 'AM',
    teacherName: 'Abdul Muhit',
  },
  '25931': {
    code: '25931',
    name: 'Mathematics-3',
    teacherInitial: 'AM',
    teacherName: 'Abdul Muhit',
  },
  '28531': {
    code: '28531',
    name: 'Application Development Using Python',
    teacherInitial: 'MMH',
    teacherName: 'Md. Mahabub Hasan',
  },
  '28532': {
    code: '28532',
    name: 'Computer Graphics Design-2',
    teacherInitial: 'MEH',
    teacherName: 'Md. Ekramul Haque',
  },
  '28533': {
    code: '28533',
    name: 'IT Support Services',
    teacherInitial: 'JUB',
    teacherName: 'Jomir Uddin Bhuiyan',
  },
  '26831': {
    code: '26831',
    name: 'Digital Electronics',
    teacherInitial: 'MMH',
    teacherName: 'Md. Mahabub Hasan',
  },
};

export const WEEKDAYS_WITH_CLASSES: RoutineItem['day'][] = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
];

export const ALL_WEEKDAYS: RoutineItem['day'][] = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

// সাপ্তাহিক অফিশিয়াল রুটিন ২০২৬ (নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউট - CST ৩য় সেমিস্টার ২য় শিফট)
export const OFFICIAL_ROUTINE_2026: RoutineItem[] = [
  // ==================== রবিবার ====================
  {
    id: 'sun-01',
    day: 'রবিবার',
    period: 1,
    startPeriod: 1,
    endPeriod: 2,
    periodSpan: '১ম–২য় পিরিয়ড',
    time: '১:৩০–৩:০০',
    startTime: '13:30',
    endTime: '15:00',
    subjectCode: '26831',
    subjectName: 'Digital Electronics',
    teacherName: 'Md. Mahabub Hasan',
    teacherInitial: 'MMH',
    room: 'Hardware Lab',
    isLab: true,
  },
  {
    id: 'sun-02',
    day: 'রবিবার',
    period: 3,
    startPeriod: 3,
    endPeriod: 4,
    periodSpan: '৩য়–৪র্থ পিরিয়ড',
    time: '৩:০০–৪:৩০',
    startTime: '15:00',
    endTime: '16:30',
    subjectCode: '25931',
    subjectName: 'Mathematics-3',
    teacherName: 'Abdul Muhit',
    teacherInitial: 'AM',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'sun-03',
    day: 'রবিবার',
    period: 5,
    startPeriod: 5,
    endPeriod: 5,
    periodSpan: '৫ম পিরিয়ড',
    time: '৪:৩০–৫:১৫',
    startTime: '16:30',
    endTime: '17:15',
    subjectCode: '28531',
    subjectName: 'Application Development Using Python',
    teacherName: 'Md. Mahabub Hasan',
    teacherInitial: 'MMH',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'sun-04',
    day: 'রবিবার',
    period: 6,
    startPeriod: 6,
    endPeriod: 6,
    periodSpan: '৬ষ্ঠ পিরিয়ড',
    time: '৫:১৫–৬:০০',
    startTime: '17:15',
    endTime: '18:00',
    subjectCode: '25922',
    subjectName: 'Physics-2',
    teacherName: 'Abdul Muhit',
    teacherInitial: 'AM',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'sun-05',
    day: 'রবিবার',
    period: 7,
    startPeriod: 7,
    endPeriod: 7,
    periodSpan: '৭ম পিরিয়ড',
    time: '৬:০০–৬:৪৫',
    startTime: '18:00',
    endTime: '18:45',
    subjectCode: '25811',
    subjectName: 'Social Science',
    teacherName: 'Mahmudul Hasan Siddique',
    teacherInitial: 'MHS',
    room: 'R-311',
    isLab: false,
  },

  // ==================== সোমবার ====================
  {
    id: 'mon-01',
    day: 'সোমবার',
    period: 1,
    startPeriod: 1,
    endPeriod: 3,
    periodSpan: '১ম–৩য় পিরিয়ড',
    time: '১:৩০–৩:৪৫',
    startTime: '13:30',
    endTime: '15:45',
    subjectCode: '28533',
    subjectName: 'IT Support Services',
    teacherName: 'Jomir Uddin Bhuiyan',
    teacherInitial: 'JUB',
    room: 'Hardware Lab',
    isLab: true,
  },
  {
    id: 'mon-02',
    day: 'সোমবার',
    period: 4,
    startPeriod: 4,
    endPeriod: 4,
    periodSpan: '৪র্থ পিরিয়ড',
    time: '৩:৪৫–৪:৩০',
    startTime: '15:45',
    endTime: '16:30',
    subjectCode: '26831',
    subjectName: 'Digital Electronics',
    teacherName: 'Md. Mahabub Hasan',
    teacherInitial: 'MMH',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'mon-03',
    day: 'সোমবার',
    period: 5,
    startPeriod: 5,
    endPeriod: 5,
    periodSpan: '৫ম পিরিয়ড',
    time: '৪:৩০–৫:১৫',
    startTime: '16:30',
    endTime: '17:15',
    subjectCode: '28531',
    subjectName: 'Application Development Using Python',
    teacherName: 'Md. Mahabub Hasan',
    teacherInitial: 'MMH',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'mon-04',
    day: 'সোমবার',
    period: 6,
    startPeriod: 6,
    endPeriod: 7,
    periodSpan: '৬ষ্ঠ–৭ম পিরিয়ড',
    time: '৫:১৫–৬:৪৫',
    startTime: '17:15',
    endTime: '18:45',
    subjectCode: '25931',
    subjectName: 'Mathematics-3',
    teacherName: 'Abdul Muhit',
    teacherInitial: 'AM',
    room: 'R-311',
    isLab: false,
  },

  // ==================== মঙ্গলবার ====================
  {
    id: 'tue-01',
    day: 'মঙ্গলবার',
    period: 1,
    startPeriod: 1,
    endPeriod: 3,
    periodSpan: '১ম–৩য় পিরিয়ড',
    time: '১:৩০–৩:৪৫',
    startTime: '13:30',
    endTime: '15:45',
    subjectCode: '28532',
    subjectName: 'Computer Graphics Design-2',
    teacherName: 'Md. Ekramul Haque',
    teacherInitial: 'MEH',
    room: 'Software Lab',
    isLab: true,
  },
  {
    id: 'tue-02',
    day: 'মঙ্গলবার',
    period: 4,
    startPeriod: 4,
    endPeriod: 6,
    periodSpan: '৪র্থ–৬ষ্ঠ পিরিয়ড',
    time: '৩:৪৫–৬:০০',
    startTime: '15:45',
    endTime: '18:00',
    subjectCode: '28533',
    subjectName: 'IT Support Services',
    teacherName: 'Jomir Uddin Bhuiyan',
    teacherInitial: 'JUB',
    room: 'Hardware Lab',
    isLab: true,
  },
  {
    id: 'tue-03',
    day: 'মঙ্গলবার',
    period: 7,
    startPeriod: 7,
    endPeriod: 7,
    periodSpan: '৭ম পিরিয়ড',
    time: '৬:০০–৬:৪৫',
    startTime: '18:00',
    endTime: '18:45',
    subjectCode: '25922',
    subjectName: 'Physics-2',
    teacherName: 'Abdul Muhit',
    teacherInitial: 'AM',
    room: 'R-311',
    isLab: false,
  },

  // ==================== বুধবার ====================
  {
    id: 'wed-00',
    day: 'বুধবার',
    period: 1,
    startPeriod: 1,
    endPeriod: 1,
    periodSpan: '১ম পিরিয়ড',
    time: '১:৩০–২:১৫',
    startTime: '13:30',
    endTime: '14:15',
    subjectCode: 'OFF',
    subjectName: 'কোনো ক্লাস নেই (ফ্রি পিরিয়ড)',
    teacherName: '-',
    teacherInitial: '-',
    room: '-',
    isLab: false,
    isFree: true,
  },
  {
    id: 'wed-01',
    day: 'বুধবার',
    period: 2,
    startPeriod: 2,
    endPeriod: 2,
    periodSpan: '২য় পিরিয়ড',
    time: '২:১৫–৩:০০',
    startTime: '14:15',
    endTime: '15:00',
    subjectCode: '25922',
    subjectName: 'Physics-2',
    teacherName: 'Abdul Muhit',
    teacherInitial: 'AM',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'wed-02',
    day: 'বুধবার',
    period: 3,
    startPeriod: 3,
    endPeriod: 3,
    periodSpan: '৩য় পিরিয়ড',
    time: '৩:০০–৩:৪৫',
    startTime: '15:00',
    endTime: '15:45',
    subjectCode: '25811',
    subjectName: 'Social Science',
    teacherName: 'Mahmudul Hasan Siddique',
    teacherInitial: 'MHS',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'wed-03',
    day: 'বুধবার',
    period: 4,
    startPeriod: 4,
    endPeriod: 5,
    periodSpan: '৪র্থ–৫ম পিরিয়ড',
    time: '৩:৪৫–৫:১৫',
    startTime: '15:45',
    endTime: '17:15',
    subjectCode: '25931',
    subjectName: 'Mathematics-3',
    teacherName: 'Abdul Muhit',
    teacherInitial: 'AM',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'wed-04',
    day: 'বুধবার',
    period: 6,
    startPeriod: 6,
    endPeriod: 6,
    periodSpan: '৬ষ্ঠ পিরিয়ড',
    time: '৫:১৫–৬:০০',
    startTime: '17:15',
    endTime: '18:00',
    subjectCode: '28533',
    subjectName: 'IT Support Services',
    teacherName: 'Jomir Uddin Bhuiyan',
    teacherInitial: 'JUB',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'wed-05',
    day: 'বুধবার',
    period: 7,
    startPeriod: 7,
    endPeriod: 7,
    periodSpan: '৭ম পিরিয়ড',
    time: '৬:০০–৬:৪৫',
    startTime: '18:00',
    endTime: '18:45',
    subjectCode: '26831',
    subjectName: 'Digital Electronics',
    teacherName: 'Md. Mahabub Hasan',
    teacherInitial: 'MMH',
    room: 'R-311',
    isLab: false,
  },

  // ==================== বৃহস্পতিবার ====================
  {
    id: 'thu-01',
    day: 'বৃহস্পতিবার',
    period: 1,
    startPeriod: 1,
    endPeriod: 3,
    periodSpan: '১ম–৩য় পিরিয়ড',
    time: '১:৩০–৩:৪৫',
    startTime: '13:30',
    endTime: '15:45',
    subjectCode: '25922',
    subjectName: 'Physics-2',
    teacherName: 'Abdul Muhit',
    teacherInitial: 'AM',
    room: 'Physics Lab',
    isLab: true,
  },
  {
    id: 'thu-02',
    day: 'বৃহস্পতিবার',
    period: 4,
    startPeriod: 4,
    endPeriod: 4,
    periodSpan: '৪র্থ পিরিয়ড',
    time: '৩:৪৫–৪:৩০',
    startTime: '15:45',
    endTime: '16:30',
    subjectCode: '28533',
    subjectName: 'IT Support Services',
    teacherName: 'Jomir Uddin Bhuiyan',
    teacherInitial: 'JUB',
    room: 'R-311',
    isLab: false,
  },
  {
    id: 'thu-03',
    day: 'বৃহস্পতিবার',
    period: 5,
    startPeriod: 5,
    endPeriod: 7,
    periodSpan: '৫ম–৭ম পিরিয়ড',
    time: '৪:৩০–৬:৪৫',
    startTime: '16:30',
    endTime: '18:45',
    subjectCode: '28531',
    subjectName: 'Application Development Using Python',
    teacherName: 'Md. Mahabub Hasan',
    teacherInitial: 'MMH',
    room: 'Software Lab',
    isLab: true,
  },
];

// সহায়ক ফাংশন: বর্তমান দিন বের করা
export function getBengaliDayName(date: Date = new Date()): RoutineItem['day'] {
  const dayIndex = date.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  switch (dayIndex) {
    case 0:
      return 'রবিবার';
    case 1:
      return 'সোমবার';
    case 2:
      return 'মঙ্গলবার';
    case 3:
      return 'বুধবার';
    case 4:
      return 'বৃহস্পতিবার';
    case 5:
      return 'শুক্রবার';
    case 6:
      return 'শনিবার';
    default:
      return 'রবিবার';
  }
}

// সময় থেকে মিনিটের হিসাব (HH:mm -> minutes from midnight)
export function parseTimeToMinutes(timeStr: string): number {
  const [hh, mm] = timeStr.split(':').map(Number);
  return hh * 60 + (mm || 0);
}

// বর্তমান ও পরবর্তী ক্লাসের অবস্থা নির্ধারণ
export interface ClassStatusResult {
  ongoingClass: RoutineItem | null;
  nextClass: RoutineItem | null;
  completedClasses: RoutineItem[];
  upcomingClasses: RoutineItem[];
  isSchoolOver: boolean;
  isBeforeSchool: boolean;
  minutesToNextClass: number | null;
}

export function getClassTimingStatus(
  classes: RoutineItem[],
  customDate?: Date
): ClassStatusResult {
  const now = customDate || new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // ফিল্টার করি যেন ফ্রী পিরিয়ড ছাড়া আসল ক্লাসগুলো অগ্রাধিকার পায়
  const activeClasses = classes.filter((c) => !c.isFree);

  if (activeClasses.length === 0) {
    return {
      ongoingClass: null,
      nextClass: null,
      completedClasses: [],
      upcomingClasses: [],
      isSchoolOver: false,
      isBeforeSchool: false,
      minutesToNextClass: null,
    };
  }

  let ongoingClass: RoutineItem | null = null;
  let nextClass: RoutineItem | null = null;
  const completedClasses: RoutineItem[] = [];
  const upcomingClasses: RoutineItem[] = [];

  for (const item of activeClasses) {
    if (!item.startTime || !item.endTime) continue;
    const startMins = parseTimeToMinutes(item.startTime);
    const endMins = parseTimeToMinutes(item.endTime);

    if (currentMinutes >= startMins && currentMinutes < endMins) {
      ongoingClass = item;
    } else if (currentMinutes >= endMins) {
      completedClasses.push(item);
    } else if (currentMinutes < startMins) {
      upcomingClasses.push(item);
      if (!nextClass) {
        nextClass = item;
      }
    }
  }

  const firstClassStart = activeClasses[0]?.startTime
    ? parseTimeToMinutes(activeClasses[0].startTime)
    : 13 * 60 + 30; // 1:30 PM
  const lastClassEnd = activeClasses[activeClasses.length - 1]?.endTime
    ? parseTimeToMinutes(activeClasses[activeClasses.length - 1].endTime)
    : 18 * 60 + 45; // 6:45 PM

  const isBeforeSchool = currentMinutes < firstClassStart;
  const isSchoolOver = currentMinutes >= lastClassEnd;

  let minutesToNextClass: number | null = null;
  if (nextClass && nextClass.startTime) {
    minutesToNextClass = parseTimeToMinutes(nextClass.startTime) - currentMinutes;
  }

  return {
    ongoingClass,
    nextClass,
    completedClasses,
    upcomingClasses,
    isSchoolOver,
    isBeforeSchool,
    minutesToNextClass,
  };
}
