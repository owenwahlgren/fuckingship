import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-white text-black border-2 border-white focus:border-primary outline-none transition-colors ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-primary">{error}</p>}
    </div>
  )
}

