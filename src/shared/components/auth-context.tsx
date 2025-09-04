import React, { createContext, useContext, useEffect, useState } from "react"
import type { User as FirebaseUser } from "firebase/auth"
import { userService } from "../../services/userService"
import type { UserProfile } from "../../services/userService"

export type UserRole = "administrador" | "vendedor"

export interface AppUser {
  uid: string
  email: string
  role: UserRole
  displayName?: string
}

export interface AuthState {
  user: FirebaseUser | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<UserProfile>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  isAdmin: () => boolean
  isSeller: () => boolean
  hasRole: (role: UserRole) => boolean
}

const initialState: AuthState = {
  user: null,
  userProfile: null,
  loading: true,
  signIn: async () => { throw new Error("Not implemented") },
  signOut: async () => {},
  resetPassword: async () => {},
  isAdmin: () => false,
  isSeller: () => false,
  hasRole: () => false,
}

// Crear el contexto
export const AuthContext = createContext<AuthState>(initialState)

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sesión almacenada al cargar
    const storedSession = userService.getStoredSession()
    if (storedSession) {
      setUserProfile(storedSession)
    }

    // Observar cambios de autenticación
    const unsubscribe = userService.onAuthStateChange((firebaseUser, profile) => {
      setUser(firebaseUser)
      setUserProfile(profile)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<UserProfile> => {
    setLoading(true)
    try {
      const profile = await userService.signIn(email, password)
      setUserProfile(profile)
      return profile
    } finally {
      setLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    setLoading(true)
    try {
      await userService.signOut()
      setUser(null)
      setUserProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string): Promise<void> => {
    return userService.resetPassword(email)
  }

  const isAdmin = (): boolean => {
    return userService.isAdmin(userProfile)
  }

  const isSeller = (): boolean => {
    return userService.isSeller(userProfile)
  }

  const hasRole = (role: UserRole): boolean => {
    return userService.hasRole(userProfile, role)
  }

  const value: AuthState = {
    user,
    userProfile,
    loading,
    signIn,
    signOut,
    resetPassword,
    isAdmin,
    isSeller,
    hasRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
