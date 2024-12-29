import React from 'react';
import { Loader2 } from 'lucide-react';

interface NameInputProps {
  name: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function NameInput({ name, isLoading, onChange, onSubmit }: NameInputProps) {
  return (
    <form onSubmit={onSubmit} className="mb-12">
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          placeholder="あなたの名前を入力してください"
          className="w-full px-6 py-4 bg-white/10 rounded-lg backdrop-blur-sm 
                   border border-white/20 text-white placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2
                   px-6 py-2 bg-red-500 hover:bg-red-600 
                   rounded-md transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            '変換'
          )}
        </button>
      </div>
    </form>
  );
}