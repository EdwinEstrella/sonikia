'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { insforge, getInsforgeAccessToken } from '@/lib/insforge';

interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  profile: {
    name?: string;
    avatar_url?: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  /** JWT para llamadas a rutas API de Next que reenvían a InsForge (sincronizado tras sesión). */
  accessToken: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string; requireVerification?: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const response = await insforge.auth.getCurrentUser();
      console.log('🔐 getCurrentUser full response:', response);

      if (response.data?.user) {
        console.log('🔐 Setting user from response.data.user:', response.data.user);
        setUser(response.data.user);
        setAccessToken(getInsforgeAccessToken());
      } else {
        console.warn('⚠️ No user found in getCurrentUser response');
        setUser(null);
        setAccessToken(null);
      }
    } catch (error) {
      console.error('❌ Error checking user:', error);
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await insforge.auth.signInWithPassword({
        email,
        password,
      });

      console.log('🔐 signIn response:', response);

      if (response.error) {
        return { success: false, error: response.error.message || 'Error al iniciar sesión' };
      }

      if (response.data?.user) {
        console.log('🔐 Setting user after signIn:', response.data.user);
        setUser(response.data.user);
      }
      setAccessToken(
        response.data?.accessToken ?? getInsforgeAccessToken()
      );

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
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
      } else {
        setAccessToken(getInsforgeAccessToken());
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al conectar con el servidor' };
    }
  };

  const signOut = async () => {
    await insforge.auth.signOut();
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, signIn, signUp, signOut }}>
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
