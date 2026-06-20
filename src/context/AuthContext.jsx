// Admin autentifikatsiya — faqat role:"admin" foydalanuvchilar kira oladi.
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (uid) => {
    try {
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) setProfile({ uid, ...snap.data() });
      else setProfile(null);
    } catch {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) await loadProfile(u.uid);
      else setProfile(null);
      setLoading(false);
    });
    return () => unsub();
  }, [loadProfile]);

  const login = async ({ email, password }) => {
    const { user: u } = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", u.uid));
    if (snap.data()?.role !== "admin") {
      await signOut(auth);
      throw new Error("Bu hisob admin emas. Faqat administratorlar kira oladi.");
    }
    await loadProfile(u.uid);
    return u;
  };

  const logout = () => signOut(auth);

  const isAdmin = profile?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
