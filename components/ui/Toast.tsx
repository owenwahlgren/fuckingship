'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  onClose: () => void
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const styles = type === 'success' 
    ? 'bg-black text-white border-black' 
    : 'bg-white text-black border-red-600'

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
      <div className={`${styles} px-5 py-3 rounded-lg border-2 shadow-lg flex items-center gap-2.5 min-w-[280px]`}>
        <span className={`text-lg ${type === 'success' ? 'text-white' : 'text-red-600'}`}>
          {type === 'success' ? '✓' : '✕'}
        </span>
        <p className="font-medium text-sm">{message}</p>
      </div>
    </div>
  )
}

