import { createContext } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import type { UserProfile } from "../../services/userService";

export type UserRole = "administrador" | "vendedor";

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
}

export interface AuthState {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserProfile>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: () => boolean;
  isSeller: () => boolean;
  hasRole: (role: UserRole) => boolean;
}

const initialState: AuthState = {
  user: null,
  userProfile: null,
  loading: true,
  signIn: async () => { throw new Error("Not implemented"); },
  signOut: async () => {},
  resetPassword: async () => {},
  isAdmin: () => false,
  isSeller: () => false,
  hasRole: () => false,
};

// Crear el contexto
export const AuthContext = createContext<AuthState>(initialState);
