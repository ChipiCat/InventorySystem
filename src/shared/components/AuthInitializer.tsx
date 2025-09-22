import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { setUser, setLoading, clearAuth } from '../../store/slices/authSlice';
import { UserRole } from '../types';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Usuario autenticado
        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          role: UserRole.SELLER, // Por defecto vendedor
          createdAt: new Date(),
          lastLogin: new Date(),
          isActive: true
        };
        dispatch(setUser(user));
      } else {
        // Usuario no autenticado
        dispatch(clearAuth());
      }
      
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
