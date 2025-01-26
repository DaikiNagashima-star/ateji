import React from 'react';
import { LogIn, LogOut, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function ProfileButton() {
  const { user, signIn, signOut, error } = useAuth();

  return (
    <div className="absolute top-4 right-4">
      {error && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-red-500/10 rounded-lg text-red-400 text-sm flex items-center gap-2 max-w-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {user ? (
        <div className="flex items-center gap-4">
          <a
            href="/profile"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profile'}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            <span>{user.displayName}</span>
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <button
          onClick={signIn}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In with Google</span>
        </button>
      )}
    </div>
  );
}