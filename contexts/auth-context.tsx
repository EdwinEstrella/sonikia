'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { insforge } from '@/lib/insforge';

interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  profile?: {
    name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string; requireVerification?: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data } = await insforge.auth.getCurrentUser();
      setUser(data.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await insforge.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message || 'Error al iniciar sesión' };
      }

      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al conectar con el servidor' };
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { data, error } = await insforge.auth.signUp({
        email,
        password,
        name,
      });

      if (error) {
        return { success: false, error: error.message || 'Error al registrarse' };
      }

      if (data?.requireEmailVerification) {
        return { success: false, error: 'Por favor verifica tu email', requireVerification: true };
      }

      if (data?.user) {
        setUser(data.user);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al conectar con el servidor' };
    }
  };

  const signOut = async () => {
    await insforge.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
