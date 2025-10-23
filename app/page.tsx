'use client'

import { useEffect, useState } from 'react'
import { ConnectButton } from '@/components/ConnectButton'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Check for OAuth errors in URL
    const params = new URLSearchParams(window.location.search)
    const oauthError = params.get('error')
    if (oauthError === 'OAuthAccountNotLinked') {
      setError('This account is already linked to another user. Please use a different account or sign out and try again.')
    }
    
    async function checkSession() {
      try {
        const sessionRefresh = await fetch('/api/session/refresh', {
          cache: 'no-store' // Force fresh data
        })
        if (sessionRefresh.ok) {
          const freshData = await sessionRefresh.json()
          setUser(freshData)
          
          // If admin with Twitter, redirect to admin (GitHub not required for admins)
          if (freshData.role === 'ADMIN' && freshData.hasTwitter) {
            router.push('/admin')
            return
          }
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setLoading(false)
      }
    }
    checkSession()
    
    // Also refresh on focus (when user returns from OAuth)
    const handleFocus = () => {
      checkSession()
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [router])

  const bothConnected = user?.hasTwitter && user?.hasGithub

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full space-y-12">
          {/* Sign Out - Top Right (only if logged in) */}
          {user && (
            <div className="flex justify-end -mt-6 mb-6">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/api/signout'}
                className="text-xs sm:text-sm px-3 sm:px-4"
              >
                Sign Out
              </Button>
            </div>
          )}

          {/* Brand */}
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-black tracking-tight leading-tight">
              f<span className="animate-flip">🔻</span>ckingship
            </h1>
            <Link href="/about" className="text-sm text-black/50 hover:text-black underline inline-block transition-colors">
              Learn more →
            </Link>
          </div>

        {/* Connection Status */}
        {user && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-black mb-4">Connected Accounts</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black/70">X (Twitter)</span>
                <span className={`text-sm font-medium ${user.hasTwitter ? 'text-green-600' : 'text-gray-400'}`}>
                  {user.hasTwitter ? `✓ ${user.twitterHandle ? `@${user.twitterHandle}` : 'Connected'}` : 'Not connected'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-black/70">GitHub</span>
                <span className={`text-sm font-medium ${user.hasGithub ? 'text-green-600' : 'text-gray-400'}`}>
                  {user.hasGithub ? `✓ ${user.githubHandle || 'Connected'}` : 'Not connected'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Auth Section */}
        <div className="space-y-8">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-5 py-4 rounded-lg text-sm leading-relaxed">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              {!user?.hasTwitter && (
                <ConnectButton provider="twitter" />
              )}
              
              {user?.hasTwitter && !user?.hasGithub && (
                <ConnectButton provider="github" />
              )}

              {bothConnected && (
                <Button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full"
                >
                  Continue to Application →
                </Button>
              )}
            </div>
            
            {!bothConnected && (
              <p className="text-xs text-black/40 text-center leading-relaxed">
                X and GitHub accounts are required to apply
              </p>
            )}
          </div>

          </div>
        </div>
      </div>

      {/* Footer - Bottom of viewport */}
      <div className="pb-6 text-center flex items-center justify-center gap-4">
        <a 
          href="https://x.com/freakingship"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-black/40 hover:text-black/60 underline transition-colors"
        >
          @freakingship
        </a>
        <span className="text-xs text-black/20">•</span>
        <Link 
          href="/disclaimer"
          className="text-xs text-black/40 hover:text-black/60 underline transition-colors"
        >
          Disclaimer
        </Link>
      </div>
    </div>
  )
}
