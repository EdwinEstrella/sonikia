'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { History, MusicNote, Logout, LoginOutlined } from '@mui/icons-material';

export function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className="border-b border-purple-500/10 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-105">
              <MusicNote className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Sonikia</span>
          </Link>

          {/* Navigation */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/app"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50 flex items-center gap-2"
              >
                <MusicNote fontSize="small" />
                Crear Música
              </Link>
              <Link
                href="/history"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50 flex items-center gap-2"
              >
                <History fontSize="small" />
                Historial
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-4 border-l border-purple-500/20">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.profile?.name || 'Usuario'}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/70 transition-all"
                  title="Cerrar sesión"
                >
                  <Logout fontSize="small" />
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/auth"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center gap-2"
            >
              <LoginOutlined fontSize="small" />
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
