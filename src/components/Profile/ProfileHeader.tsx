import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function ProfileHeader() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-6 mb-8">
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || 'Profile'}
          className="w-20 h-20 rounded-full border-2 border-white/10"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
          <User className="w-10 h-10 text-gray-400" />
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold mb-1">{user.displayName}</h2>
        <p className="text-gray-400">{user.email}</p>
      </div>
    </div>
  );
}