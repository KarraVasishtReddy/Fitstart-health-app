import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import { UserProfile } from '../types';

interface AuthCtx {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateMode: (mode: UserProfile['activeMode']) => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        } else {
          const p: UserProfile = {
            uid: u.uid,
            email: u.email ?? '',
            displayName: u.displayName ?? 'User',
            photoURL: u.photoURL ?? '',
            createdAt: Date.now(),
            activeMode: 'balanced',
          };
          await setDoc(ref, { ...p, createdAt: serverTimestamp() });
          setProfile(p);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  const signIn = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const updateMode = async (mode: UserProfile['activeMode']) => {
    if (!user || !profile) return;
    const ref = doc(db, 'users', user.uid);
    await setDoc(ref, { ...profile, activeMode: mode }, { merge: true });
    setProfile({ ...profile, activeMode: mode });
  };

  return (
    <Ctx.Provider value={{ user, profile, loading, signIn, signOutUser, updateMode }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
