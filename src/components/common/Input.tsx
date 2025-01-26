import React from 'react';
import { usePlatform } from '../../hooks/usePlatform';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  const { platform } = usePlatform();

  const baseStyles = "w-full px-4 py-2 rounded-lg transition-colors";
  
  const platformStyles = {
    ios: "bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
    android: "bg-white elevation-1 focus:elevation-2 border-b-2 border-gray-300 focus:border-green-500",
    desktop: "bg-white/10 border border-white/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${platformStyles[platform]}`}
        {...props}
      />
    </div>
  );
}