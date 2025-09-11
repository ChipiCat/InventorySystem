import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import type { User, UserRole } from "../types";

// Autenticación
export const signIn = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await updateLastLogin(userCredential.user.uid);
    return userCredential.user;
  } catch (error: unknown) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: window.location.origin + '/login',
      handleCodeInApp: false
    });
  } catch (error: unknown) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// Perfil de usuario
export const getUserProfile = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        uid: data.uid,
        email: data.email,
        name: data.name,
        role: data.role as UserRole,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate() || null,
        isActive: data.isActive || true
      };
    }
    return null;
  } catch (error: unknown) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const createUserProfile = async (userData: Omit<User, 'createdAt' | 'lastLogin'>): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', userData.uid), {
      ...userData,
      createdAt: new Date(),
      lastLogin: null
    });
  } catch (error: unknown) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const updateLastLogin = async (uid: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      lastLogin: new Date()
    });
  } catch (error: unknown) {
    console.error("Error updating last login:", error);
    // No throw aquí para no bloquear el login
  }
};

// Observer de autenticación
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
