export interface FlutterFile {
  path: string;
  description: string;
  code: string;
}

export const FLUTTER_PROJECT_STRUCTURE: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    description: 'Flutter ডিপেন্ডেন্সি ও কনফিগারেশন ফাইল',
    code: `name: cst_connect
description: "A modern Android app for Computer Science & Technology (CST) students of Narsingdi Government Polytechnic Institute."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter

  # Firebase Suite
  firebase_core: ^3.6.0
  firebase_auth: ^5.3.1
  cloud_firestore: ^5.4.4
  firebase_storage: ^12.3.2
  firebase_messaging: ^15.1.3
  flutter_local_notifications: ^17.2.2

  # UI & Styling (Material 3 & Green/White Theme)
  google_fonts: ^6.2.1
  flutter_staggered_animations: ^1.1.1
  cupertino_icons: ^1.0.8
  font_awesome_flutter: ^10.7.0

  # State Management & Storage
  provider: ^6.1.2
  shared_preferences: ^2.3.2
  hive: ^2.2.3
  hive_flutter: ^1.1.0

  # Utilities & Networking
  http: ^1.2.2
  intl: ^0.19.0
  file_picker: ^8.1.2
  url_launcher: ^6.3.0
  percent_indicator: ^4.2.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
`,
  },
  {
    path: 'lib/main.dart',
    description: 'অ্যাপের মূল এন্ট্রি পয়েন্ট এবং থিমিং (Material 3, সবুজ ও সাদা কালার প্যালেট)',
    code: `import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'firebase_options.dart';
import 'providers/auth_provider.dart';
import 'providers/theme_provider.dart';
import 'screens/splash_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
      ],
      child: const CSTConnectApp(),
    ),
  );
}

class CSTConnectApp extends StatelessWidget {
  const CSTConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return MaterialApp(
      title: 'CST Connect - NPI',
      debugShowCheckedModeBanner: false,
      themeMode: themeProvider.isDarkMode ? ThemeMode.dark : ThemeMode.light,
      // লাইট থিম: আধুনিক মেটেরিয়াল ৩, সবুজ ও সতেজ সাদা টোন
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF15803D), // ইসলামিক ডিপ গ্রিন
          primary: const Color(0xFF15803D),
          secondary: const Color(0xFF22C55E),
          surface: const Color(0xFFF8FAFC),
          background: const Color(0xFFFFFFFF),
          brightness: Brightness.light,
        ),
        textTheme: GoogleFonts.hindSiliguriTextTheme(ThemeData.light().textTheme),
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
          backgroundColor: Color(0xFF15803D),
          foregroundColor: Colors.white,
        ),
        cardTheme: CardTheme(
          elevation: 1,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          color: Colors.white,
        ),
      ),
      // ডার্ক থিম
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF22C55E),
          primary: const Color(0xFF22C55E),
          secondary: const Color(0xFF16A34A),
          surface: const Color(0xFF1E293B),
          background: const Color(0xFF0F172A),
          brightness: Brightness.dark,
        ),
        textTheme: GoogleFonts.hindSiliguriTextTheme(ThemeData.dark().textTheme),
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
          backgroundColor: Color(0xFF1E293B),
          foregroundColor: Colors.white,
        ),
        cardTheme: CardTheme(
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          color: const Color(0xFF1E293B),
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/main_navigation_screen.dart',
    description: 'Bottom Navigation Bar (হোম | নোট | অ্যাসাইনমেন্ট | প্রোফাইল)',
    code: `import 'package:flutter/material.dart';
import 'home_screen.dart';
import 'notes_screen.dart';
import 'assignment_screen.dart';
import 'profile_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    NotesScreen(),
    AssignmentScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: NavigationBar(
          selectedIndex: _selectedIndex,
          elevation: 4,
          backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
          indicatorColor: const Color(0xFF15803D).withOpacity(0.18),
          onDestinationSelected: (int index) {
            setState(() {
              _selectedIndex = index;
            });
          },
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.home_outlined),
              selectedIcon: Icon(Icons.home, color: Color(0xFF15803D)),
              label: 'হোম',
            ),
            NavigationDestination(
              icon: Icon(Icons.menu_book_outlined),
              selectedIcon: Icon(Icons.menu_book, color: Color(0xFF15803D)),
              label: 'নোট',
            ),
            NavigationDestination(
              icon: Icon(Icons.assignment_outlined),
              selectedIcon: Icon(Icons.assignment, color: Color(0xFF15803D)),
              label: 'অ্যাসাইনমেন্ট',
            ),
            NavigationDestination(
              icon: Icon(Icons.person_outline),
              selectedIcon: Icon(Icons.person, color: Color(0xFF15803D)),
              label: 'প্রোফাইল',
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/home_screen.dart',
    description: 'হোম ড্যাশবোর্ড: আজকের ক্লাস রুটিন, কুইক অ্যাকশন, নোটিশ ও আপকামিং কাজ',
    code: `import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../widgets/quick_action_card.dart';
import '../widgets/routine_today_card.dart';
import '../widgets/latest_notice_banner.dart';
import 'routine_screen.dart';
import 'attendance_screen.dart';
import 'cgpa_calculator_screen.dart';
import 'batch_chat_screen.dart';
import 'quiz_screen.dart';
import 'ai_assistant_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.school, color: Color(0xFF15803D), size: 22),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('CST Connect', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                Text('নরসিংদী সরকারি পলিটেকনিক', style: TextStyle(fontSize: 11, color: Colors.white70)),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.auto_awesome, color: Color(0xFFFDE047)),
            tooltip: 'AI অ্যাসিস্ট্যান্ট',
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const AIAssistantScreen()));
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {},
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // শুভেচ্ছা ও পর্ব পরিচিতি
              _buildStudentHeader(context),
              const SizedBox(height: 16),

              // দ্রুত অপশন (Quick Actions Grid)
              const Text(
                'দ্রুত অপশন',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              _buildQuickActionsGrid(context),
              const SizedBox(height: 20),

              // আজকের ক্লাস রুটিন
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'আজকের ক্লাস রুটিন (শনিবার)',
                    style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.push(context, MaterialPageRoute(builder: (_) => const RoutineScreen()));
                    },
                    child: const Text('সম্পূর্ণ রুটিন >', style: TextStyle(color: Color(0xFF15803D))),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              const RoutineTodayCard(),
              const SizedBox(height: 20),

              // ডিপার্টমেন্ট নোটিশ বোর্ড
              const LatestNoticeBanner(),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStudentHeader(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF15803D), Color(0xFF16A34A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      child: const Row(
        children: [
          CircleAvatar(
            radius: 26,
            backgroundColor: Colors.white24,
            child: Icon(Icons.person, color: Colors.white, size: 30),
          ),
          SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('স্বাগতম, তানভীর আহমেদ', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                Text('রোল: ৬০৪৫২১ • ৫ম পর্ব (১ম শিফট)', style: TextStyle(color: Colors.white70, fontSize: 13)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionsGrid(BuildContext context) {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 3,
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      children: [
        QuickActionCard(
          icon: Icons.calendar_month,
          title: 'রুটিন',
          color: const Color(0xFF15803D),
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const RoutineScreen())),
        ),
        QuickActionCard(
          icon: Icons.how_to_reg,
          title: 'উপস্থিতি',
          color: Colors.teal,
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const AttendanceScreen())),
        ),
        QuickActionCard(
          icon: Icons.calculate,
          title: 'CGPA ক্যালকুলেটর',
          color: Colors.indigo,
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const CGPACalculatorScreen())),
        ),
        QuickActionCard(
          icon: Icons.forum,
          title: 'ব্যাচ চ্যাট',
          color: Colors.orange.shade800,
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const BatchChatScreen())),
        ),
        QuickActionCard(
          icon: Icons.quiz,
          title: 'কুইজ',
          color: Colors.deepPurple,
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const QuizScreen())),
        ),
        QuickActionCard(
          icon: Icons.smart_toy,
          title: 'AI শিক্ষক',
          color: const Color(0xFF047857),
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const AIAssistantScreen())),
        ),
      ],
    );
  }
}
`,
  },
  {
    path: 'lib/screens/routine_screen.dart',
    description: 'সপ্তাহভিত্তিক অফলাইন ক্লাস রুটিন (শনি-বৃহস্পতি, রুম ও শিক্ষকসহ)',
    code: `import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RoutineScreen extends StatefulWidget {
  const RoutineScreen({super.key});

  @override
  State<RoutineScreen> createState() => _RoutineScreenState();
}

class _RoutineScreenState extends State<RoutineScreen> {
  final List<String> days = ['শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার'];
  String selectedDay = 'শনিবার';
  String selectedShift = '১ম শিফট';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ক্লাস রুটিন'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(50),
          child: Container(
            color: Theme.of(context).cardColor,
            height: 50,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 8),
              itemCount: days.length,
              itemBuilder: (context, index) {
                final day = days[index];
                final isSelected = day == selectedDay;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: ChoiceChip(
                    label: Text(day),
                    selected: isSelected,
                    selectedColor: const Color(0xFF15803D),
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : Colors.black87,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    ),
                    onSelected: (val) {
                      if (val) setState(() => selectedDay = day);
                    },
                  ),
                );
              },
            ),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Row(
            children: [
              const Icon(Icons.offline_pin, color: Color(0xFF16A34A), size: 18),
              const SizedBox(width: 6),
              const Text(
                'রুটিনটি অফলাইনে ক্যাশ করা আছে',
                style: TextStyle(fontSize: 12, color: Colors.grey),
              ),
              const Spacer(),
              DropdownButton<String>(
                value: selectedShift,
                underline: const SizedBox(),
                items: const [
                  DropdownMenuItem(value: '১ম শিফট', child: Text('১ম শিফট')),
                  DropdownMenuItem(value: '২য় শিফট', child: Text('২য় শিফট')),
                ],
                onChanged: (val) {
                  if (val != null) setState(() => selectedShift = val);
                },
              ),
            ],
          ),
          const SizedBox(height: 10),
          // রুটিন কার্ড লিস্ট
          _buildRoutineCard('০১', '০৮:০০ - ০৯:৩০', 'অপারেটিং সিস্টেম অ্যান্ড অ্যাপ্লিকেশনস', '২৮৫৮১', 'ল্যাব-৪০২ (CST Lab 1)', 'প্রকৌ. মোস্তাফিজুর রহমান', 'ব্যবহারিক'),
          _buildRoutineCard('০২', '০৯:৩০ - ১০:১৫', 'জাভা ও অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং', '২৮৫৮২', 'রুম-৩০৪ (একাডেমিক ভবন)', 'তানজিলা তাসনিম ম্যাম', 'তত্ত্বীয়'),
          _buildRoutineCard('০৩', '১০:৪৫ - ১২:১৫', 'ওয়েব ডেভেলপমেন্ট অ্যান্ড ফ্রেমওয়ার্ক', '২৮৫৮৩', 'ল্যাব-৪০৩ (সফটওয়্যার ল্যাব)', 'প্রকৌ. শফিকুল ইসলাম', 'ব্যবহারিক'),
        ],
      ),
    );
  }

  Widget _buildRoutineCard(String period, String time, String subject, String code, String room, String teacher, String type) {
    final isPractical = type.contains('ব্যবহারিক');
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
              decoration: BoxDecoration(
                color: isPractical ? const Color(0xFF15803D).withOpacity(0.12) : Colors.blue.withOpacity(0.12),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                children: [
                  Text(period, style: TextStyle(fontWeight: FontWeight.bold, color: isPractical ? const Color(0xFF15803D) : Colors.blue.shade800)),
                  const SizedBox(height: 2),
                  Text(type, style: TextStyle(fontSize: 10, color: isPractical ? const Color(0xFF15803D) : Colors.blue.shade800)),
                ],
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(subject, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.access_time, size: 14, color: Colors.grey),
                      const SizedBox(width: 4),
                      Text(time, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                      const SizedBox(width: 12),
                      const Icon(Icons.meeting_room, size: 14, color: Colors.grey),
                      const SizedBox(width: 4),
                      Text(room, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.person, size: 14, color: Color(0xFF15803D)),
                      const SizedBox(width: 4),
                      Text(teacher, style: const TextStyle(fontSize: 13, color: Color(0xFF15803D))),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/notes_screen.dart',
    description: 'নোট ও PDF লাইব্রেরি: সার্চ, ডাউনলোড ও AI সারসংক্ষেপ',
    code: `import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class NotesScreen extends StatefulWidget {
  const NotesScreen({super.key});

  @override
  State<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  String searchQuery = '';
  String selectedSemester = 'সব পর্ব';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('নোট ও PDF লাইব্রেরি'),
        actions: [
          IconButton(
            icon: const Icon(Icons.upload_file),
            tooltip: 'PDF নোট আপলোড',
            onPressed: () => _uploadPdfModal(context),
          ),
        ],
      ),
      body: Column(
        children: [
          // সার্চ বার
          Padding(
            padding: const EdgeInsets.all(12),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'বিষয় বা নোটের নাম দিয়ে খুঁজুন...',
                prefixIcon: const Icon(Icons.search, color: Color(0xFF15803D)),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                filled: true,
                fillColor: Theme.of(context).cardColor,
                contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
              ),
              onChanged: (val) => setState(() => searchQuery = val),
            ),
          ),
          // নোটের লিস্ট
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              children: [
                _buildNoteCard('C প্রোগ্রামিং: পয়েন্টার ও মেমোরি হ্যান্ডবুক', '২৮৫৮০', '৩য় পর্ব', 'প্রকৌ. শফিকুল ইসলাম', '৩.৪ MB'),
                _buildNoteCard('C++ অবজেক্ট ওরিয়েন্টেড (OOP) এর ৪টি মূল স্তম্ভ', '২৮৫৮২', '৫ম পর্ব', 'তানজিলা তাসনিম ম্যাম', '২.৮ MB'),
                _buildNoteCard('পাইথন ডিকশনারি ও ফাইল হ্যান্ডলিং গাইড', '২৮৫৮৮', '৪র্থ পর্ব', 'আফসানা চৌধুরী ম্যাম', '১.৯ MB'),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: const Color(0xFF15803D),
        onPressed: () => _uploadPdfModal(context),
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('নোট আপলোড', style: TextStyle(color: Colors.white)),
      ),
    );
  }

  Widget _buildNoteCard(String title, String code, String sem, String author, String size) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.picture_as_pdf, color: Colors.red, size: 28),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      Text('কোড: $code • $sem', style: const TextStyle(fontSize: 12, color: Colors.grey)),
                    ],
                  ),
                ),
              ],
            ),
            const Divider(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('আপলোডকারী: $author ($size)', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF15803D),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  ),
                  onPressed: () {},
                  icon: const Icon(Icons.download, size: 16),
                  label: const Text('ডাউনলোড', style: TextStyle(fontSize: 12)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _uploadPdfModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('নতুন PDF নোট আপলোড করুন', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            OutlinedButton.icon(
              onPressed: () async {
                FilePickerResult? result = await FilePicker.platform.pickFiles(type: FileType.custom, allowedExtensions: ['pdf']);
                if (result != null) {
                  // Firebase Storage এ আপলোড লজিক
                }
              },
              icon: const Icon(Icons.attach_file, color: Color(0xFF15803D)),
              label: const Text('PDF ফাইল নির্বাচন করুন'),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF15803D), foregroundColor: Colors.white),
              onPressed: () => Navigator.pop(context),
              child: const Text('আপলোড সম্পূর্ণ করুন'),
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/cgpa_calculator_screen.dart',
    description: 'BTEB ডিপ্লোমা ইন ইঞ্জিনিয়ারিং CGPA ক্যালকুলেটর (২০১৬ ও ২০২২ প্রবিধান)',
    code: `import 'package:flutter/material.dart';

class CGPACalculatorScreen extends StatefulWidget {
  const CGPACalculatorScreen({super.key});

  @override
  State<CGPACalculatorScreen> createState() => _CGPACalculatorScreenState();
}

class _CGPACalculatorScreenState extends State<CGPACalculatorScreen> {
  String selectedRegulation = '2022'; // '2016' or '2022'
  final List<TextEditingController> _controllers = List.generate(8, (_) => TextEditingController());
  double finalCGPA = 0.0;

  // BTEB প্রবিধান অনুযায়ী শতকরা হার
  final Map<String, List<double>> weights = {
    '2016': [5, 5, 5, 10, 15, 20, 25, 15],
    '2022': [5, 5, 10, 10, 15, 20, 20, 15],
  };

  void calculate() {
    double totalWeighted = 0;
    double totalWeight = 0;
    final wList = weights[selectedRegulation]!;

    for (int i = 0; i < 8; i++) {
      final text = _controllers[i].text.trim();
      if (text.isNotEmpty) {
        final val = double.tryParse(text) ?? 0.0;
        if (val > 0) {
          totalWeighted += (val * wList[i]);
          totalWeight += wList[i];
        }
      }
    }

    setState(() {
      finalCGPA = totalWeight > 0 ? totalWeighted / totalWeight : 0.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('BTEB CGPA ক্যালকুলেটর')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // রেজাল্ট কার্ড
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF15803D), Color(0xFF16A34A)],
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  const Text('আপনার সামগ্রিক CGPA', style: TextStyle(color: Colors.white70, fontSize: 14)),
                  const SizedBox(height: 6),
                  Text(finalCGPA.toStringAsFixed(2), style: const TextStyle(color: Colors.white, fontSize: 38, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 6),
                  Text(
                    finalCGPA >= 3.8 ? 'অসাধারণ (Distinction)!' : (finalCGPA >= 3.0 ? 'খুব ভালো ফলাফল' : 'নিয়মিত পড়াশোনা করুন'),
                    style: const TextStyle(color: Colors.white, fontSize: 13),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            // প্রবিধান সিলেক্টর
            SegmentedButton<String>(
              segments: const [
                ButtonSegment(value: '2022', label: Text('২০২২ প্রবিধান')),
                ButtonSegment(value: '2016', label: Text('২০১৬ প্রবিধান')),
              ],
              selected: {selectedRegulation},
              onSelectionChanged: (set) {
                setState(() => selectedRegulation = set.first);
                calculate();
              },
            ),
            const SizedBox(height: 16),
            // সেমিস্টার ইনপুট ফিল্ডস
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: 8,
              itemBuilder: (context, i) {
                final w = weights[selectedRegulation]![i];
                return Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: Row(
                    children: [
                      Expanded(
                        flex: 2,
                        child: Text('\${i + 1}ম পর্ব (\${w.toInt()}%)', style: const TextStyle(fontWeight: FontWeight.w600)),
                      ),
                      Expanded(
                        flex: 3,
                        child: TextField(
                          controller: _controllers[i],
                          keyboardType: const TextInputType.numberWithOptions(decimal: true),
                          decoration: const InputDecoration(
                            hintText: 'GPA (যেমন: ৩.৮৫)',
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          ),
                          onChanged: (_) => calculate(),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/ai_assistant_screen.dart',
    description: 'AI ফিচার: C/C++ কোড ব্যাখ্যা, নোটের সারসংক্ষেপ ও ল্যাব ভাইভা অনুশীলন',
    code: `import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AIAssistantScreen extends StatefulWidget {
  const AIAssistantScreen({super.key});

  @override
  State<AIAssistantScreen> createState() => _AIAssistantScreenState();
}

class _AIAssistantScreenState extends State<AIAssistantScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _codeController = TextEditingController();
  final TextEditingController _noteController = TextEditingController();
  final TextEditingController _vivaController = TextEditingController();

  String codeExplanation = '';
  String noteSummary = '';
  String vivaResponse = '';
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  // Gemini API ব্যাকএন্ড কল
  Future<void> explainCode() async {
    setState(() => isLoading = true);
    try {
      final res = await http.post(
        Uri.parse('https://your-api-domain.com/api/ai/explain-code'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'code': _codeController.text, 'language': 'c'}),
      );
      final data = jsonDecode(res.body);
      setState(() => codeExplanation = data['explanation'] ?? 'কোনো ফলাফল পাওয়া যায়নি');
    } catch (e) {
      setState(() => codeExplanation = 'ত্রুটি ঘটেছে: \$e');
    } finally {
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('CST AI সহকারী'),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: Colors.white,
          labelColor: Colors.white,
          tabs: const [
            Tab(text: 'কোড ব্যাখ্যা'),
            Tab(text: 'নোট সারসংক্ষেপ'),
            Tab(text: 'ল্যাব ভাইভা'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildCodeExplainerTab(),
          _buildNoteSummarizerTab(),
          _buildVivaTab(),
        ],
      ),
    );
  }

  Widget _buildCodeExplainerTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('C অথবা C++ কোড পেস্ট করুন:', style: TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          TextField(
            controller: _codeController,
            maxLines: 8,
            style: const TextStyle(fontFamily: 'monospace', fontSize: 13),
            decoration: const InputDecoration(
              hintText: '#include <stdio.h>\\nint main() {\\n  int *p;\\n  return 0;\\n}',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF15803D), foregroundColor: Colors.white),
            onPressed: isLoading ? null : explainCode,
            icon: isLoading ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Icon(Icons.auto_awesome),
            label: const Text('বাংলায় ব্যাখ্যা করো'),
          ),
          const SizedBox(height: 16),
          if (codeExplanation.isNotEmpty)
            Card(
              color: Colors.green.shade50,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(codeExplanation, style: const TextStyle(fontSize: 14, height: 1.5, color: Colors.black87)),
              ),
            ),
        ],
      ),
    );
  }

  // নোটের সারসংক্ষেপ ব্যাকএন্ড কল
  Future<void> summarizeNote() async {
    setState(() => isLoading = true);
    try {
      final res = await http.post(
        Uri.parse('https://your-api-domain.com/api/ai/summarize-note'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'title': 'লেকচার নোট', 'content': _noteController.text}),
      );
      final data = jsonDecode(res.body);
      setState(() => noteSummary = data['summary'] ?? 'কোনো সারসংক্ষেপ পাওয়া যায়নি');
    } catch (e) {
      setState(() => noteSummary = 'ত্রুটি ঘটেছে: \$e');
    } finally {
      setState(() => isLoading = false);
    }
  }

  // ল্যাব ভাইভা মূল্যায়ন ব্যাকএন্ড কল
  Future<void> evaluateViva() async {
    setState(() => isLoading = true);
    try {
      final res = await http.post(
        Uri.parse('https://your-api-domain.com/api/ai/viva'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'subject': 'সি প্রোগ্রামিং',
          'semester': '৩য় পর্ব',
          'previousQuestion': 'পয়েন্টার কাকে বলে? পয়েন্টার দিয়ে কীভাবে মেমোরি অ্যাক্সেস করা যায়?',
          'studentAnswer': _vivaController.text,
          'mode': 'evaluate'
        }),
      );
      final data = jsonDecode(res.body);
      setState(() => vivaResponse = data['feedback'] ?? 'মূল্যায়ন পাওয়া যায়নি');
    } catch (e) {
      setState(() => vivaResponse = 'ত্রুটি ঘটেছে: \$e');
    } finally {
      setState(() => isLoading = false);
    }
  }

  Widget _buildNoteSummarizerTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('পিডিএফ বা লেকচার নোটের টেক্সট দিন:', style: TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          TextField(
            controller: _noteController,
            maxLines: 6,
            decoration: const InputDecoration(
              hintText: 'এখানে ক্লাসের নোট পেস্ট করুন...',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF15803D), foregroundColor: Colors.white),
            onPressed: isLoading ? null : summarizeNote,
            icon: isLoading ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Icon(Icons.summarize),
            label: const Text('বাংলায় সারসংক্ষেপ করো'),
          ),
          const SizedBox(height: 16),
          if (noteSummary.isNotEmpty)
            Card(
              color: Colors.teal.shade50,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(noteSummary, style: const TextStyle(fontSize: 14, height: 1.5, color: Colors.black87)),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildVivaTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Card(
            color: Colors.emerald.shade50,
            child: const Padding(
              padding: EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('ভাইভা পরীক্ষকের প্রশ্ন (নমুনা):', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF15803D))),
                  SizedBox(height: 6),
                  Text('পয়েন্টার কাকে বলে? পয়েন্টার এবং সাধারণ ভেরিয়েবলের মধ্যে মূল পার্থক্য কী? ডাইনামিক মেমোরিতে malloc() এর কাজ কী?'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          const Text('আপনার উত্তর বাংলায় লিখুন:', style: TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          TextField(
            controller: _vivaController,
            maxLines: 4,
            decoration: const InputDecoration(
              hintText: 'ভাইভা বোর্ডে যেভাবে উত্তর দিতেন...',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF15803D), foregroundColor: Colors.white),
            onPressed: isLoading ? null : evaluateViva,
            icon: isLoading ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Icon(Icons.school),
            label: const Text('উত্তর যাচাই করো ও ফিডব্যাক দাও'),
          ),
          const SizedBox(height: 16),
          if (vivaResponse.isNotEmpty)
            Card(
              color: Colors.amber.shade50,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(vivaResponse, style: const TextStyle(fontSize: 14, height: 1.5, color: Colors.black87)),
              ),
            ),
        ],
      ),
    );
  }
}
`,
  },
  {
    path: 'firestore.rules',
    description: 'Cloud Firestore সিকিউরিটি রুলস (CST NPI ডাটা সিকিউরিটি)',
    code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // শুধুমাত্র ভেরিফাইড CST শিক্ষার্থীরাই নিজেদের প্রোফাইল এডিট করতে পারবে
    match /students/{studentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == studentId;
    }

    // ক্লাস রুটিন - সবাই পড়তে পারবে, শুধুমাত্র ডিপার্টমেন্ট শিক্ষক বা অ্যাডমিন লিখতে পারবে
    match /routines/{routineId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'teacher';
    }

    // ডিপার্টমেন্ট নোটিশ বোর্ড
    match /notices/{noticeId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'teacher';
    }

    // নোট ও লাইব্রেরি ফাইল
    match /notes/{noteId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.uploaderId;
    }

    // ব্যাচ চ্যাট (রিয়েলটাইম মেসেজিং)
    match /batch_chats/{batchId}/messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }

    // অ্যাসাইনমেন্ট ট্র্যাকার
    match /assignments/{assignmentId} {
      allow read, write: if request.auth != null;
    }
  }
}
`,
  },
  {
    path: 'firebase_options.dart',
    description: 'Firebase কনফিগারেশন ফাইল (Android ও Web)',
    code: `// File generated by FlutterFire CLI.
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart' show defaultTargetPlatform, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      default:
        return android;
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyExampleKey-CSTConnect-NPI',
    appId: '1:282933617615:android:cstconnectnpi',
    messagingSenderId: '282933617615',
    projectId: 'cst-connect-npi',
    storageBucket: 'cst-connect-npi.appspot.com',
  );
}
`,
  },
];

export const FLUTTER_PROJECT_FILES: Record<string, string> = FLUTTER_PROJECT_STRUCTURE.reduce((acc, f) => {
  acc[f.path] = f.code;
  return acc;
}, {} as Record<string, string>);
