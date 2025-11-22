'use client'

import { useState } from 'react'

interface AvatarProps {
  src?: string | null
  username: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function Avatar({ src, username, size = 'md', className = '' }: AvatarProps) {
  const [error, setError] = useState(false)

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
    xl: 'w-16 h-16 text-3xl',
  }

  if (src && !error) {
    return (
      <img 
        src={src} 
        alt={username} 
        className={`${sizeClasses[size]} rounded-full object-cover border border-black/10 ${className}`}
        onError={() => setError(true)}
      />
    )
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-white font-bold border border-black/10 ${className}`}>
      {username.charAt(0).toUpperCase()}
    </div>
  )
}
