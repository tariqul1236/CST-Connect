import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  increment,
  writeBatch
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { AppUser, ChatConversation, ChatMessageRecord } from '../types';

// Deterministic Chat ID generator
export function getChatId(uid1: string, uid2: string): string {
  return [uid1, uid2].sort().join('_');
}

// Format time in readable Bengali / 12h format
export function formatChatTimestamp(isoString?: string): string {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const isToday = 
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;

    const banglaNumbers: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    };

    const timeStr = `${hour12}:${minutes} ${ampm}`.replace(/[0-9]/g, (w) => banglaNumbers[w] || w);

    if (isToday) {
      return timeStr;
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dateStr = `${day}/${month}`.replace(/[0-9]/g, (w) => banglaNumbers[w] || w);
    return `${dateStr} ${timeStr}`;
  } catch {
    return '';
  }
}

// Create or verify an existing chat thread
export async function createOrGetChat(
  currentUser: AppUser,
  otherUser: AppUser
): Promise<string> {
  const chatId = getChatId(currentUser.uid, otherUser.uid);
  const chatRef = doc(db, 'chats', chatId);

  try {
    const snapshot = await getDoc(chatRef);
    if (!snapshot.exists()) {
      const newChat: ChatConversation = {
        id: chatId,
        participants: [currentUser.uid, otherUser.uid],
        participantDetails: {
          [currentUser.uid]: {
            name: currentUser.name,
            studentId: currentUser.studentId,
            profileImage: currentUser.profileImage,
            semester: currentUser.semester,
            technology: currentUser.technology,
            shift: currentUser.shift,
            online: currentUser.online,
          },
          [otherUser.uid]: {
            name: otherUser.name,
            studentId: otherUser.studentId,
            profileImage: otherUser.profileImage,
            semester: otherUser.semester,
            technology: otherUser.technology,
            shift: otherUser.shift,
            online: otherUser.online,
          },
        },
        lastMessage: 'চ্যাট শুরু হয়েছে',
        lastMessageTime: new Date().toISOString(),
        lastSenderId: currentUser.uid,
        unreadCounts: {
          [currentUser.uid]: 0,
          [otherUser.uid]: 0,
        },
        updatedAt: new Date().toISOString(),
      };
      await setDoc(chatRef, newChat);
    } else {
      // Sync fresh participant names/avatars/statuses
      await updateDoc(chatRef, {
        [`participantDetails.${currentUser.uid}`]: {
          name: currentUser.name,
          studentId: currentUser.studentId,
          profileImage: currentUser.profileImage,
          semester: currentUser.semester,
          technology: currentUser.technology,
          shift: currentUser.shift,
          online: currentUser.online,
        },
        [`participantDetails.${otherUser.uid}`]: {
          name: otherUser.name,
          studentId: otherUser.studentId,
          profileImage: otherUser.profileImage,
          semester: otherUser.semester,
          technology: otherUser.technology,
          shift: otherUser.shift,
          online: otherUser.online,
        },
      });
    }
    return chatId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `chats/${chatId}`);
  }
}

// Send a chat message
export async function sendChatMessage(
  chatId: string,
  senderId: string,
  receiverId: string,
  text: string
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed) return;

  const now = new Date().toISOString();
  const messagesCol = collection(db, 'chats', chatId, 'messages');
  const chatRef = doc(db, 'chats', chatId);

  try {
    // 1. Create message doc
    const newMsgDoc = {
      chatId,
      senderId,
      receiverId,
      message: trimmed,
      timestamp: now,
      seen: false,
    };
    await addDoc(messagesCol, newMsgDoc);

    // 2. Update chat conversation metadata
    await updateDoc(chatRef, {
      lastMessage: trimmed,
      lastMessageTime: now,
      lastSenderId: senderId,
      [`unreadCounts.${receiverId}`]: increment(1),
      updatedAt: now,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `chats/${chatId}/messages`);
  }
}

// Mark messages as seen
export async function markChatAsSeen(
  chatId: string,
  currentUserId: string
): Promise<void> {
  try {
    const messagesCol = collection(db, 'chats', chatId, 'messages');
    const unseenQuery = query(
      messagesCol,
      where('receiverId', '==', currentUserId),
      where('seen', '==', false)
    );

    const snapshot = await getDocs(unseenQuery);
    if (!snapshot.empty) {
      const batch = writeBatch(db);
      snapshot.forEach((docSnap) => {
        batch.update(docSnap.ref, { seen: true });
      });
      await batch.commit();
    }

    // Reset unread count for current user
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      [`unreadCounts.${currentUserId}`]: 0,
    }).catch(() => {});
  } catch (error) {
    console.error('Failed to mark chat as seen:', error);
  }
}

// Subscribe to all chats for the user
export function subscribeToUserChats(
  currentUserId: string,
  callback: (chats: ChatConversation[]) => void
): () => void {
  const chatsCol = collection(db, 'chats');
  const q = query(
    chatsCol,
    where('participants', 'array-contains', currentUserId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const list: ChatConversation[] = [];
      snapshot.forEach((docSnap) => {
        list.push({
          ...(docSnap.data() as ChatConversation),
          id: docSnap.id,
        });
      });

      // Sort by updatedAt descending
      list.sort((a, b) => {
        const timeA = new Date(a.updatedAt || a.lastMessageTime || 0).getTime();
        const timeB = new Date(b.updatedAt || b.lastMessageTime || 0).getTime();
        return timeB - timeA;
      });

      callback(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'chats');
    }
  );
}

// Subscribe to messages in a specific chat
export function subscribeToChatMessages(
  chatId: string,
  callback: (messages: ChatMessageRecord[]) => void
): () => void {
  const messagesCol = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesCol, orderBy('timestamp', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: ChatMessageRecord[] = [];
      snapshot.forEach((docSnap) => {
        list.push({
          ...(docSnap.data() as ChatMessageRecord),
          id: docSnap.id,
        });
      });
      callback(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, `chats/${chatId}/messages`);
    }
  );
}

// Search students in users collection
export async function searchStudents(
  searchTerm: string,
  currentUserId: string
): Promise<AppUser[]> {
  try {
    const usersCol = collection(db, 'users');
    const snapshot = await getDocs(usersCol);
    const results: AppUser[] = [];
    const term = searchTerm.trim().toLowerCase();

    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as AppUser;
      if (data.uid === currentUserId) return; // Do not return current user

      const nameMatch = data.name && data.name.toLowerCase().includes(term);
      const rollMatch = data.studentId && data.studentId.includes(term);

      if (!term || nameMatch || rollMatch) {
        results.push({
          ...data,
          uid: docSnap.id,
        });
      }
    });

    return results;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'users');
  }
}
