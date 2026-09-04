import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Smile, 
  Paperclip, 
  User, 
  Clock, 
  CheckCheck,
  ShieldCheck
} from 'lucide-react';
import { ChatMessage, StudentProfile } from '../types';

interface BatchChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  student: StudentProfile;
  onSendMessage: (msg: ChatMessage) => void;
}

export const BatchChatModal: React.FC<BatchChatModalProps> = ({
  isOpen,
  onClose,
  messages,
  student,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickReplies = [
    'আজকের ল্যাব রিপোর্ট কি জমা দিতে হবে?',
    'ক্লাস কি ৩১৪ নম্বর কম্পিউটার ল্যাবে?',
    'আমি নোট সেকশনে হ্যান্ডনোট দিয়েছি!',
    'ভাইভা পরীক্ষার জন্য কোন অধ্যায় গুরুত্বপূর্ণ?',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: `${student.name} (আপনি)`,
      senderRoll: student.studentId,
      senderAvatar: student.avatarUrl,
      timestamp: 'এখন',
      text: text.trim(),
      isCurrentUser: true,
    };

    onSendMessage(newMsg);
    if (!textToSend) setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-700/80 rounded-xl relative">
              <MessageSquare className="w-5 h-5 text-emerald-100" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-800 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-sm font-bold text-white">CST ব্যাচ গ্রুপ চ্যাট</h2>
                <span className="bg-emerald-600/80 text-[10px] px-1.5 py-0.2 rounded text-emerald-100 flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" /> ভেরিফায়েড
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90">
                ৫ম সেমিস্টার • ১য় শিফট • ৪২ জন অনলাইন
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

        {/* Notice Info Bar */}
        <div className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
          <span>শুধুমাত্র নরসিংদী পলিটেকনিক CST শিক্ষার্থীদের জন্য উন্মুক্ত চ্যাটরুম।</span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950/60">
          {messages.map((msg) => {
            const isMe = msg.isCurrentUser;

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isMe ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full border border-emerald-300 dark:border-emerald-700 object-cover shrink-0 mt-0.5"
                />

                <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center space-x-1.5 mb-1 px-1">
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                      {msg.senderName}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      ({msg.senderRoll})
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-emerald-700 text-white rounded-tr-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  <div className="flex items-center space-x-1 mt-1 px-1 text-[9px] text-slate-400">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex space-x-1.5 overflow-x-auto scrollbar-none">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSend(reply)}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-medium whitespace-nowrap hover:bg-emerald-50 active:scale-95 transition-all shadow-2xs"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            placeholder="একটি মেসেজ লিখুন..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white transition-all active:scale-95 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
