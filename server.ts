import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint for Cloud Run and monitoring
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required for AI features');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// 1. AI Code Explanation in Bengali (C/C++/Python)
app.post('/api/ai/explain-code', async (req, res) => {
  try {
    const { code, language = 'C/C++' } = req.body;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'কোড প্রদান করা আবশ্যক।' });
    }

    const ai = getAIClient();
    const prompt = `তুমি নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউটের কম্পিউটার সায়েন্স অ্যান্ড টেকনোলজি (CST) বিভাগের একজন দক্ষ এবং অভিজ্ঞ শিক্ষক।
নিচের ${language} কোডটি পলিটেকনিক ডিপ্লোমা শিক্ষার্থীদের জন্য প্রাঞ্জল ও সহজ বাংলায় বিস্তারিত ব্যাখ্যা করো।

কোড:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`

অনুগ্রহ করে নিচের কাঠামো অনুযায়ী উত্তর দাও:
1. **প্রোগ্রামের উদ্দেশ্য:** কোডটি কী কাজের জন্য তৈরি?
2. **লাইনভিত্তিক সরল ব্যাখ্যা:** প্রতিটি গুরুত্বপূর্ণ লাইন বা লুপ কীভাবে কাজ করছে।
3. **ইনপুট ও আউটপুট উদাহরণ:** কেমন ইনপুট দিলে কী আউটপুট আসবে।
4. **শিক্ষার্থীদের জন্য বিশেষ টিপস:** বিটিইবি (BTEB) প্র্যাকটিক্যাল বা ভাইভাতে এই কোড থেকে কী ধরনের প্রশ্ন হতে পারে।

সম্পূর্ণ উত্তর বাংলায় সুন্দর মার্কডাউন ফরম্যাটে দাও।`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return res.json({ explanation: response.text || 'কোনো ব্যাখ্যা তৈরি করা যায়নি।' });
  } catch (error: any) {
    console.error('Code explanation error:', error);
    return res.status(500).json({
      error: error.message || 'কোড ব্যাখ্যা করতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
    });
  }
});

// 2. AI PDF / Notes Summarization in Bengali
app.post(['/api/ai/summarize-notes', '/api/ai/summarize-note'], async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'নোটের বিষয়বস্তু প্রদান করা আবশ্যক।' });
    }

    const ai = getAIClient();
    const prompt = `তুমি নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউটের CST ডিপার্টমেন্টের একজন শিক্ষক।
নিচের নোট বা লেকচারের বিষয়বস্তুর একটি চমৎকার, পয়েন্টভিত্তিক ও পরীক্ষার জন্য উপযোগী বাংলা সারসংক্ষেপ তৈরি করো।

নোটের শিরোনাম: ${title || 'সাধারণ নোট'}
নোটের বিবরণ:
${content}

আউটপুট কাঠামো:
1. **মূল বিষয়বস্তু (Key Concepts):** এক নজরে মূল ধারণা।
2. **গুরুত্বপূর্ণ সংজ্ঞাসমূহ (Important Definitions):** পরীক্ষায় আসার মতো সংজ্ঞা।
3. **পয়েন্টভিত্তিক সারসংক্ষেপ:** সহজে মনে রাখার মতো বুলেট পয়েন্ট।
4. **বিটিইবি সেমিস্টার ফাইনাল পরীক্ষার জন্য সম্ভাব্য প্রশ্ন:** ২-৩টি অতিসংক্ষিপ্ত ও সংক্ষিপ্ত প্রশ্ন।

সবকিছু সাবলীল বাংলায় লেখো।`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || 'সারসংক্ষেপ তৈরি করা যায়নি।';
    return res.json({ summary: text });
  } catch (error: any) {
    console.error('Note summarization error:', error);
    return res.status(500).json({
      error: error.message || 'সারসংক্ষেপ তৈরি করতে সমস্যা হয়েছে।'
    });
  }
});

// 3. AI Polytechnic Lab Viva Practice in Bengali
app.post(['/api/ai/viva-practice', '/api/ai/viva'], async (req, res) => {
  try {
    const topic = req.body.topic || req.body.subject || 'সি প্রোগ্রামিং (C Programming)';
    const semester = req.body.semester || '৩য় পর্ব';
    const userReply = req.body.userReply || req.body.studentAnswer || '';
    const previousQuestion = req.body.previousQuestion || '';

    const ai = getAIClient();
    const systemPrompt = `তুমি নরসিংদী সরকারি পলিটেকনিক ইনস্টিটিউটের কম্পিউটার সায়েন্স ল্যাব ফাইনাল ভাইভা বোর্ডের এক্সটার্নাল পরীক্ষক।
তুমি ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (CST) শিক্ষার্থীদের সাথে বন্ধুত্বপূর্ণ কিন্তু বাস্তবসম্মত ল্যাব ভাইভা নিচ্ছ। বিষয়: ${topic} (${semester})।
শিক্ষার্থীর উত্তরের মূল্যায়ন করবে এবং ভুল হলে শুধরে দিয়ে নতুন প্রশ্ন করবে। সবসময় বাংলায় কথা বলবে।`;

    let userPrompt = '';
    if (userReply) {
      userPrompt = `${previousQuestion ? `পরীক্ষকের পূর্ববর্তী প্রশ্ন: "${previousQuestion}"\n` : ''}শিক্ষার্থীর উত্তর: "${userReply}". 
১. শিক্ষার্থীর উত্তরের জন্য ছোট মূল্যায়ন ও ফিডব্যাক দাও (প্রাপ্ত নম্বর ১০ এর মধ্যে, কী কী পয়েন্ট ভালো হয়েছে বা বাদ পড়েছে)।
২. এরপর ${topic} সম্পর্কিত পরবর্তী ১টি প্রাসঙ্গিক ভাইভা প্রশ্ন জিজ্ঞাসা করো।`;
    } else {
      userPrompt = `ল্যাব ভাইভা শুরু করো। প্রথমে শিক্ষার্থীকে স্বাগতম জানিয়ে ${topic} সম্পর্কিত প্রথম মৌলিক ও স্ট্যান্ডার্ড প্রশ্নটি বাংলায় জিজ্ঞাসা করো।`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemPrompt}\n\n${userPrompt}`,
    });

    const text = response.text || 'ভাইভা প্রশ্নের উত্তর পাওয়া যায়নি।';
    return res.json({ 
      reply: text, 
      feedback: text, 
      question: text 
    });
  } catch (error: any) {
    console.error('Viva practice error:', error);
    return res.status(500).json({
      error: error.message || 'ভাইভা শুরু করতে সমস্যা হয়েছে।'
    });
  }
});

// Vite & Static file handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CST Connect Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
