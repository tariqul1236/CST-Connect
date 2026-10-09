import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Check, 
  CheckCheck, 
  Clock, 
  Circle, 
  Smile, 
  User, 
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  AppUser, 
  ChatMessageRecord 
} from '../types';
import { 
  getChatId, 
  createOrGetChat, 
  sendChatMessage, 
  subscribeToChatMessages, 
  markChatAsSeen,
  formatChatTimestamp
} from '../services/chatService';

interface DirectChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: AppUser | null;
}

const QUICK_PROMPTS = [
  'আসসালামু আলাইকুম 👋',
  'আজকের ল্যাব ক্লাস কোন রুমে?',
  'নোট কি পেয়েছো?',
  'অ্যাসাইনমেন্ট সাবমিট করেছো?',
  'রুটিনের সময়সূচি ঠিক আছে তো?',
];

export const DirectChatModal: React.FC<DirectChatModalProps> = ({
  isOpen,
  onClose,
  targetUser,
}) => {
  const { userProfile, currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessageRecord[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize Chat & Listen to Realtime Messages
  useEffect(() => {
    if (!isOpen || !targetUser || !userProfile || !currentUser) return;

    let unsubscribeMessages: (() => void) | undefined;

    const setupChat = async () => {
      try {
        const id = await createOrGetChat(userProfile, targetUser);
        setChatId(id);

        // Mark unread messages as seen
        await markChatAsSeen(id, currentUser.uid);

        // Subscribe to real-time messages
        unsubscribeMessages = subscribeToChatMessages(id, (fetched) => {
          setMessages(fetched);
          // Mark seen again if new messages arrive while open
          markChatAsSeen(id, currentUser.uid).catch(() => {});
        });
      } catch (err) {
        console.error('Failed to setup chat:', err);
      }
    };

    setupChat();

    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
    };
  }, [isOpen, targetUser, userProfile, currentUser]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen || !targetUser || !userProfile || !currentUser) return null;

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || !chatId || sending) return;

    setSending(true);
    try {
      await sendChatMessage(chatId, currentUser.uid, targetUser.uid, textToSend);
      if (!customText) setInputText('');
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  const avatar =
    targetUser.profileImage ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(targetUser.name)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-3.5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-2.5 min-w-0">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white -ml-1 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="relative shrink-0">
              <img
                src={avatar}
                alt={targetUser.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-emerald-900 ${
                  targetUser.online ? 'bg-emerald-400' : 'bg-slate-400'
                }`}
              ></span>
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-white truncate">
                {targetUser.name}
              </h3>
              <div className="flex items-center space-x-1.5 text-[10px] text-emerald-100/90">
                <span>রোল: {targetUser.studentId}</span>
                <span>•</span>
                {targetUser.online ? (
                  <span className="text-emerald-300 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    অনলাইন
                  </span>
                ) : (
                  <span>
                    সর্বশেষ: {formatChatTimestamp(targetUser.lastSeen) || 'কিছুক্ষণ আগে'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/40">
          <div className="text-center my-2">
            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full font-medium">
              এন্ড-টু-এন্ড রিয়েল-টাইম এনক্রিপ্টেড চ্যাট • নরসিংদী পলিটেকনিক
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-14 text-slate-400 space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                <Smile className="w-6 h-6" />
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {targetUser.name}-এর সাথে এখনও কোনো বার্তা বিনিময় হয়নি।
              </p>
              <p className="text-[11px] text-slate-400">
                নিচের কুইক প্রম্পট বেছে নিয়ে বা টাইপ করে প্রথম বার্তা পাঠান!
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === currentUser.uid;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs shadow-xs transition-all ${
                      isMe
                        ? 'bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words leading-relaxed">
                      {msg.message}
                    </p>
                    <div
                      className={`flex items-center justify-end space-x-1 text-[9px] mt-1 ${
                        isMe ? 'text-emerald-100/90' : 'text-slate-400'
                      }`}
                    >
                      <span>{formatChatTimestamp(msg.timestamp)}</span>
                      {isMe && (
                        <span>
                          {msg.seen ? (
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-200" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-emerald-200/70" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-1.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 px-2.5 py-1 text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-emerald-300 rounded-full transition-all border border-slate-200 dark:border-slate-700 font-medium whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="একটি বার্তা লিখুন..."
              className="flex-1 px-4 py-2.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || sending}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
