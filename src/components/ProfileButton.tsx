import React from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileButtonProps {
  onProfileClick: () => void;
}

export function ProfileButton({ onProfileClick }: ProfileButtonProps) {
  const { user, signIn, signOut, error } = useAuth();

  return (
    <div>
      {error && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-red-500/10 rounded-lg text-red-400 text-sm flex items-center gap-2 max-w-xs">
          <span>{error}</span>
        </div>
      )}
      
      {user ? (
        <div className="flex items-center gap-4">
          <button
            onClick={onProfileClick}
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
          </button>
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
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In with Google</span>
        </button>
      )}
    </div>
  );
}