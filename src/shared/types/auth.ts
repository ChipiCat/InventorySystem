export const UserRole = {
  ADMIN: "administrador",
  SELLER: "vendedor"
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date | null;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
