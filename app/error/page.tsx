'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

function ErrorContent() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const errorType = searchParams.get('error')
    
    const errorMessages: Record<string, string> = {
      'Configuration': 'There was a problem with the authentication configuration. Please try again later.',
      'AccessDenied': 'Access was denied. You may have cancelled the login or do not have permission.',
      'Verification': 'The verification link has expired or has already been used.',
      'OAuthAccountNotLinked': 'This account is already connected to a different user. Please use another account.',
      'OAuthCallback': 'There was an error during the authentication callback. Please try again.',
      'OAuthCreateAccount': 'Could not create your account. Please try again.',
      'EmailCreateAccount': 'Could not create your account with this email.',
      'Callback': 'There was an error in the authentication callback.',
      'OAuthSignin': 'Error trying to sign in with OAuth provider.',
      'SessionRequired': 'Please sign in to access this page.',
      'Default': 'An unexpected error occurred during authentication.',
    }

    setError(errorMessages[errorType || 'Default'] || errorMessages['Default'])
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-3xl font-bold text-black mb-4">Authentication Error</h1>
          <p className="text-lg text-black/70 leading-relaxed">{error}</p>
        </div>

        <div className="pt-4 space-y-3">
          <Link href="/" className="block">
            <Button className="w-full">
              Try Again
            </Button>
          </Link>
          
          <p className="text-sm text-black/50">
            If this problem persists, please contact support or try a different account.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <Link href="/about" className="text-sm text-black/60 hover:text-black underline">
            Learn more about fuckingship
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <p className="text-black text-xl">Loading...</p>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}

