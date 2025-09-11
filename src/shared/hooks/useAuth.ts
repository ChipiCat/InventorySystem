import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { setUser, clearAuth, setLoading } from '../../store/slices/authSlice';
import { UserRole } from '../types';
import type { RootState } from '../../store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const signIn = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Crear objeto de usuario para el store
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
        role: UserRole.SELLER, // Por defecto vendedor
        createdAt: new Date(),
        lastLogin: new Date(),
        isActive: true
      };
      
      dispatch(setUser(userData));
      return userCredential;
    } catch (error) {
      dispatch(setLoading(false));
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(clearAuth());
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    signIn,
    signOut: signOutUser
  };
};
