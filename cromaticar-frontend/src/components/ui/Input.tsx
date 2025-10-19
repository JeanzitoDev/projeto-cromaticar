import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  loading?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  loading = false,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-2.5 bg-white border border-border rounded-lg text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
