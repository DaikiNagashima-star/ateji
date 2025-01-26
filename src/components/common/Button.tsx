import React from 'react';
import { usePlatform } from '../../hooks/usePlatform';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const { platform } = usePlatform();

  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
  
  // Platform-specific styles
  const platformStyles = {
    ios: {
      primary: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-sm",
      secondary: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800"
    },
    android: {
      primary: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white elevation-2",
      secondary: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900"
    },
    desktop: {
      primary: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
      secondary: "bg-white/10 hover:bg-white/20 active:bg-white/30 text-white"
    }
  };

  const variantStyles = platformStyles[platform][variant];

  return (
    <button
      className={`${baseStyles} ${variantStyles}`}
      {...props}
    >
      {children}
    </button>
  );
}