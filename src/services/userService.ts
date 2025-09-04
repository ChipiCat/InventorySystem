import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import type { User as FirebaseUser } from "firebase/auth";

export type UserRole = "administrador" | "vendedor";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

// Usuarios de desarrollo predefinidos
const DEV_USERS = {
  "admin@inventario.com": {
    password: "Admin123!",
    profile: {
      name: "Administrador del Sistema",
      role: "administrador" as UserRole,
      isActive: true,
    },
  },
  "vendedor@inventario.com": {
    password: "Vendedor123!",
    profile: {
      name: "Vendedor Principal",
      role: "vendedor" as UserRole,
      isActive: true,
    },
  },
};

class UserService {
  // Clave para almacenamiento local
  private readonly STORAGE_KEY = "user_session";
  private authStateListeners: ((user: FirebaseUser | null, profile: UserProfile | null) => void)[] = [];

  constructor() {
    // Escuchar cambios de autenticación
    onAuthStateChanged(auth, async (firebaseUser) => {
      let profile: UserProfile | null = null;

      if (firebaseUser) {
        profile = await this.getUserProfile(firebaseUser.uid);
        
        // Si no existe el perfil, crearlo para usuarios de desarrollo
        if (!profile && DEV_USERS[firebaseUser.email as keyof typeof DEV_USERS]) {
          profile = await this.createUserProfile(firebaseUser);
        }

        if (profile) {
          // Actualizar último login
          await this.updateLastLogin(profile.uid);
          // Almacenar sesión
          this.storeSession(profile);
        }
      } else {
        // Limpiar sesión almacenada
        this.clearStoredSession();
      }

      // Notificar a todos los listeners
      this.authStateListeners.forEach(listener => listener(firebaseUser, profile));
    });
  }

  // Registrar listener para cambios de estado
  onAuthStateChange(callback: (user: FirebaseUser | null, profile: UserProfile | null) => void) {
    this.authStateListeners.push(callback);
    
    // Retornar función para limpiar el listener
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  // Iniciar sesión
  async signIn(email: string, password: string): Promise<UserProfile> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let profile = await this.getUserProfile(user.uid);

      // Si no existe el perfil, crearlo para usuarios de desarrollo
      if (!profile && DEV_USERS[email as keyof typeof DEV_USERS]) {
        profile = await this.createUserProfile(user);
      }

      if (!profile) {
        throw new Error("Perfil de usuario no encontrado");
      }

      if (!profile.isActive) {
        throw new Error("Usuario inactivo");
      }

      // Registrar evento de auditoría
      await this.logAuditEvent(profile.uid, "LOGIN", {
        email: user.email,
        timestamp: new Date(),
      });

      return profile;
    } catch (error: unknown) {
      // Registrar intento fallido
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      await this.logAuditEvent(null, "LOGIN_FAILED", {
        email,
        error: errorMessage,
        timestamp: new Date(),
      });
      throw error;
    }
  }

  // Cerrar sesión
  async signOut(): Promise<void> {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const profile = await this.getUserProfile(currentUser.uid);
      if (profile) {
        await this.logAuditEvent(profile.uid, "LOGOUT", {
          timestamp: new Date(),
        });
      }
    }

    await signOut(auth);
    this.clearStoredSession();
  }

    // Restablecer contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      console.log("Enviando correo de recuperación a:", email);
      
      // Configuración simple para que funcione con Firebase por defecto
      const actionCodeSettings = {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false, // Usar el sistema estándar de Firebase
      };
      
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      
      console.log("✅ Correo enviado exitosamente");

      // Registrar el evento
      await this.logAuditEvent(null, "PASSWORD_RESET_REQUEST", {
        email,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
      });
    } catch (error: unknown) {
      // Registrar el fallo con más detalles
      const firebaseError = error as any;
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const errorCode = firebaseError?.code || "unknown";
      
      console.error("❌ Error enviando correo de recuperación:");
      console.error("Código de error:", errorCode);
      console.error("Mensaje:", errorMessage);
      console.error("Email:", email);
      
      await this.logAuditEvent(null, "PASSWORD_RESET_FAILED", {
        email,
        error: errorMessage,
        errorCode,
        timestamp: new Date(),
      });
      
      // Proporcionar mensajes de error más específicos
      if (errorCode === "auth/user-not-found") {
        throw new Error("No existe una cuenta con este correo electrónico");
      } else if (errorCode === "auth/invalid-email") {
        throw new Error("El correo electrónico no es válido");
      } else if (errorCode === "auth/too-many-requests") {
        throw new Error("Demasiados intentos. Intenta de nuevo más tarde");
      } else {
        throw new Error(`Error al enviar correo: ${errorMessage}`);
      }
    }
  }

  // Función para invalidar todas las sesiones del usuario
  async invalidateAllSessions(uid: string): Promise<void> {
    try {
      // Registrar la invalidación de sesiones
      await this.logAuditEvent(uid, "ALL_SESSIONS_INVALIDATED", {
        timestamp: new Date(),
        reason: "PASSWORD_CHANGE",
      });

      // Actualizar el timestamp de invalidación de sesiones en Firestore
      const userRef = doc(db, "users", uid);
      await setDoc(
        userRef,
        { 
          sessionInvalidatedAt: serverTimestamp(),
          lastPasswordChange: serverTimestamp()
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error invalidating sessions:", error);
    }
  }

  // Crear usuario (solo para administradores)
  async createUser(
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<UserProfile> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const profile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      name,
      role,
      createdAt: new Date(),
      isActive: true,
    };

    await setDoc(doc(db, "users", user.uid), {
      ...profile,
      createdAt: serverTimestamp(),
    });

    return profile;
  }

  // Obtener perfil de usuario
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          uid,
          email: data.email,
          name: data.name,
          role: data.role,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLogin: data.lastLogin?.toDate(),
          isActive: data.isActive ?? true,
        };
      }

      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  }

  // Crear perfil de usuario para usuarios de desarrollo
  private async createUserProfile(firebaseUser: FirebaseUser): Promise<UserProfile | null> {
    const email = firebaseUser.email;
    if (!email || !DEV_USERS[email as keyof typeof DEV_USERS]) {
      return null;
    }

    const devUser = DEV_USERS[email as keyof typeof DEV_USERS];
    const profile: UserProfile = {
      uid: firebaseUser.uid,
      email,
      name: devUser.profile.name,
      role: devUser.profile.role,
      createdAt: new Date(),
      isActive: devUser.profile.isActive,
    };

    await setDoc(doc(db, "users", firebaseUser.uid), {
      ...profile,
      createdAt: serverTimestamp(),
    });

    return profile;
  }

  // Actualizar último login
  private async updateLastLogin(uid: string): Promise<void> {
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(
        userRef,
        { lastLogin: serverTimestamp() },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating last login:", error);
    }
  }

  // Funciones de utilidad para roles
  isAdmin(profile: UserProfile | null): boolean {
    return profile?.role === "administrador";
  }

  isSeller(profile: UserProfile | null): boolean {
    return profile?.role === "vendedor";
  }

  hasRole(profile: UserProfile | null, role: UserRole): boolean {
    return profile?.role === role || this.isAdmin(profile);
  }

  // Gestión de sesión local
  storeSession(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error("Error storing session:", error);
    }
  }

  getStoredSession(): UserProfile | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          lastLogin: parsed.lastLogin ? new Date(parsed.lastLogin) : undefined,
        };
      }
    } catch (error) {
      console.error("Error getting stored session:", error);
    }
    return null;
  }

  clearStoredSession(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing stored session:", error);
    }
  }

  // Auditoría
  private async logAuditEvent(
    userId: string | null,
    action: string,
    details: Record<string, unknown>
  ): Promise<void> {
    try {
      await addDoc(collection(db, "audit_logs"), {
        userId,
        action,
        details,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        ip: "client", // En producción podrías obtener la IP real
      });
    } catch (error) {
      console.error("Error logging audit event:", error);
    }
  }
}

// Exportar instancia singleton
export const userService = new UserService();