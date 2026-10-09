import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { AppUser } from '../types';
import { uploadProfileImageToStorage } from '../services/storageService';

interface RegisterData {
  name: string;
  studentId: string;
  email: string;
  password: string;
  semester: string;
  technology: string;
  shift: string;
  profileImage?: string;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: AppUser | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<AppUser>) => Promise<void>;
  createDemoUser?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Monitor auth state changes
  useEffect(() => {
    let unsubscribeDoc: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Listen to user profile document in real-time
        const userRef = doc(db, 'users', user.uid);
        unsubscribeDoc = onSnapshot(
          userRef,
          async (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data() as AppUser;
              setUserProfile({
                ...data,
                uid: user.uid,
              });
            } else {
              // If auth exists but Firestore doc doesn't yet, build default from user info
              const fallbackProfile: AppUser = {
                uid: user.uid,
                name: user.displayName || 'শিক্ষার্থী',
                studentId: '',
                email: user.email || '',
                semester: '৩য় সেমিস্টার',
                technology: 'কম্পিউটার (CST)',
                shift: '২য় শিফট',
                profileImage: user.photoURL || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23059669"><circle cx="50" cy="50" r="50" fill="%23ecfdf5"/><path d="M50 22a18 18 0 1 0 0 36 18 18 0 0 0 0-36zm0 43c-18.2 0-33 11.2-33 25 0 2.2 1.8 4 4 4h58c2.2 0 4-1.8 4-4 0-13.8-14.8-25-33-25z" fill="%23059669"/></svg>',
                createdAt: new Date().toISOString(),
                lastSeen: new Date().toISOString(),
                online: true,
              };

              try {
                await setDoc(userRef, fallbackProfile, { merge: true });
                setUserProfile(fallbackProfile);
              } catch (e) {
                console.error('Failed to create fallback profile doc:', e);
              }
            }
            setLoading(false);
          },
          (err) => {
            console.error('Error fetching user profile snapshot:', err);
            setLoading(false);
          }
        );

        // Mark online
        try {
          await setDoc(
            userRef,
            {
              online: true,
              lastSeen: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.error('Failed to set online status:', err);
        }
      } else {
        if (unsubscribeDoc) unsubscribeDoc();
        setUserProfile(null);
        setLoading(false);
      }
    });

    // Window unload to set offline
    const handleBeforeUnload = () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        setDoc(
          userRef,
          {
            online: false,
            lastSeen: new Date().toISOString(),
          },
          { merge: true }
        ).catch(() => {});
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Registration handler
  const register = async (data: RegisterData) => {
    // 1. Firebase Authentication account creation
    const userCredential = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password);
    const user = userCredential.user;

    let profileImage = data.profileImage;
    if (profileImage && profileImage.startsWith('data:image')) {
      try {
        const response = await fetch(profileImage);
        const blob = await response.blob();
        profileImage = await uploadProfileImageToStorage(user.uid, blob);
      } catch (err) {
        console.warn('Storage upload fallback:', err);
      }
    }

    if (!profileImage) {
      profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name || user.uid)}`;
    }

    const newProfile: AppUser = {
      uid: user.uid,
      name: data.name.trim(),
      studentId: data.studentId.trim(),
      email: data.email.trim(),
      semester: data.semester,
      technology: data.technology,
      shift: data.shift,
      profileImage,
      createdAt: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      online: true,
    };

    // 2. Firestore Document creation
    try {
      await setDoc(doc(db, 'users', user.uid), newProfile);
      setUserProfile(newProfile);
    } catch (fsError) {
      handleFirestoreError(fsError, OperationType.CREATE, 'users');
    }
  };

  // Login handler
  const login = async (email: string, password: string) => {
    // 1. Firebase Authentication sign in
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;
    
    // 2. Firestore online update
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          online: true,
          lastSeen: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (fsError) {
      handleFirestoreError(fsError, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  // Logout handler
  const logout = async () => {
    if (currentUser) {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(
          userRef,
          {
            online: false,
            lastSeen: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch {
        // Continue logout even if offline flag update fails
      }
    }
    await signOut(auth);
    setUserProfile(null);
  };

  // Update profile
  const updateUserProfile = async (data: Partial<AppUser>) => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const updated = {
        ...data,
        lastSeen: new Date().toISOString(),
      };
      await setDoc(userRef, updated, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  // Password reset handler
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  // Demo user helper (disabled)
  const createDemoUser = async () => {
    // Demo accounts removed
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        register,
        login,
        logout,
        resetPassword,
        updateUserProfile,
        createDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
