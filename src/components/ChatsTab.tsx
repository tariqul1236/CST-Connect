import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Users, 
  Clock, 
  Check, 
  CheckCheck, 
  Circle, 
  Plus,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChatConversation, AppUser } from '../types';
import { 
  subscribeToUserChats, 
  formatChatTimestamp 
} from '../services/chatService';

interface ChatsTabProps {
  onOpenSearch: () => void;
  onOpenDirectChat: (targetUser: AppUser) => void;
}

export const ChatsTab: React.FC<ChatsTabProps> = ({
  onOpenSearch,
  onOpenDirectChat,
}) => {
  const { userProfile, currentUser } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setConversations([]);
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToUserChats(currentUser.uid, (chats) => {
      setConversations(chats);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleSelectConversation = (chat: ChatConversation) => {
    if (!currentUser) return;
    const otherUid = chat.participants.find((p) => p !== currentUser.uid);
    if (!otherUid) return;

    const details = chat.participantDetails?.[otherUid];
    const targetUser: AppUser = {
      uid: otherUid,
      name: details?.name || 'সহপাঠী শিক্ষার্থী',
      studentId: details?.studentId || 'N/A',
      email: '',
      semester: details?.semester || '৩য় সেমিস্টার',
      technology: details?.technology || 'কম্পিউটার',
      shift: details?.shift || '২য় শিফট',
      profileImage: details?.profileImage,
      createdAt: '',
      lastSeen: new Date().toISOString(),
      online: details?.online || false,
    };

    onOpenDirectChat(targetUser);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Search & Actions Top Card */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-4 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-emerald-200 uppercase bg-emerald-700/50 px-2 py-0.5 rounded-full">
                রিয়েল-টাইম চ্যাটরুম
              </span>
              <h2 className="text-lg font-black text-white mt-1">
                সহপাঠী মেসেঞ্জার
              </h2>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <MessageSquare className="w-5 h-5 text-emerald-200" />
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed mb-3.5">
            নরসিংদী পলিটেকনিকের যে কোনো সহপাঠীর নাম বা রোল দিয়ে খুঁজে নিয়ে সরাসরি ওয়ান-টু-ওয়ান কথা বলুন।
          </p>

          <button
            onClick={onOpenSearch}
            className="w-full py-2.5 px-4 bg-white hover:bg-emerald-50 text-emerald-900 font-bold rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all active:scale-[0.99]"
          >
            <Search className="w-4 h-4 text-emerald-700" />
            <span>নতুন শিক্ষার্থী খুঁজুন ও চ্যাট করুন</span>
          </button>
        </div>

        {/* Background glow decoration */}
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl"></div>
      </div>

      {/* Conversations Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span>সক্রিয় চ্যাটসমূহ</span>
            {conversations.length > 0 && (
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] px-2 py-0.2 rounded-full font-bold">
                {conversations.length}
              </span>
            )}
          </h3>
          <button
            onClick={onOpenSearch}
            className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>নতুন চ্যাট</span>
          </button>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 text-center text-slate-400 text-xs">
            চ্যাট লোড হচ্ছে...
          </div>
        ) : conversations.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 text-center shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              এখনও কোনো চ্যাট শুরু করা হয়নি
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-4 leading-relaxed">
              আপনার ব্যাচের বা অন্য শিফটের সহপাঠীদের সাথে কথা বলতে "শিক্ষার্থী খুঁজুন" বাটনে ক্লিক করুন।
            </p>
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>সহপাঠী খুঁজুন</span>
            </button>
          </div>
        ) : (
          conversations.map((chat) => {
            if (!currentUser) return null;
            const otherUid = chat.participants.find((p) => p !== currentUser.uid);
            if (!otherUid) return null;

            const otherUser = chat.participantDetails?.[otherUid];
            const unreadCount = chat.unreadCounts?.[currentUser.uid] || 0;
            const avatar =
              otherUser?.profileImage ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(otherUser?.name || otherUid)}`;

            return (
              <div
                key={chat.id}
                onClick={() => handleSelectConversation(chat)}
                className={`bg-white dark:bg-slate-800 border rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all shadow-xs hover:border-emerald-500 ${
                  unreadCount > 0
                    ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={avatar}
                      alt={otherUser?.name || 'User'}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                    />
                    {otherUser?.online ? (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                    ) : (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-slate-400 border-2 border-white dark:border-slate-800 rounded-full"></span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {otherUser?.name || 'সহপাঠী শিক্ষার্থী'}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                        {formatChatTimestamp(chat.lastMessageTime || chat.updatedAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-0.5">
                      <p
                        className={`text-[11px] truncate ${
                          unreadCount > 0
                            ? 'font-bold text-slate-900 dark:text-slate-100'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {chat.lastSenderId === currentUser.uid ? 'আপনি: ' : ''}
                        {chat.lastMessage || 'কোনো বার্তা নেই'}
                      </p>

                      {unreadCount > 0 && (
                        <span className="ml-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0 shadow-xs">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
