'use client'

import { useEffect, useState } from 'react'
import { ApplicationForm } from '@/components/application/application-form'
import { ApplicationStatus } from '@/components/application/application-status'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch fresh session data from database
        const sessionRefresh = await fetch('/api/session/refresh')
        if (sessionRefresh.ok) {
          const freshData = await sessionRefresh.json()
          setUser(freshData)
        } else {
          // Fallback to regular session
          const sessionRes = await fetch('/api/auth/session')
          const sessionData = await sessionRes.json()
          setUser(sessionData.user)
        }

        // Fetch application
        const appRes = await fetch('/api/application')
        const appData = await appRes.json()
        setApplication(appData.application)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSignOut = () => {
    window.location.href = '/api/signout'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-black text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-4xl font-bold text-black tracking-tight">f🔻ckingship</h1>
                {!application && (
                  <Link
                    href="/about"
                    className="text-sm text-black/50 hover:text-black underline transition-colors"
                  >
                    About
                  </Link>
                )}
              </div>
              {user && (
                <p className="text-gray-600 text-sm mt-2">
                  {user.twitterHandle && `@${user.twitterHandle}`}
                  {user.twitterHandle && user.githubHandle && ' • '}
                  {user.githubHandle && `${user.githubHandle}`}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {user?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="text-xs sm:text-sm text-black/60 hover:text-black underline transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-xs sm:text-sm px-3 sm:px-4"
              >
                Sign Out
              </Button>
            </div>
          </div>
          {application && (
            <Link
              href="/about"
              className="text-sm text-black/50 hover:text-black underline transition-colors"
            >
              About
            </Link>
          )}
        </div>

        {application && !isEditing ? (
          <ApplicationStatus application={application} onEdit={() => setIsEditing(true)} />
        ) : (
          <ApplicationForm
            initialData={application}
            isEdit={!!application}
            githubHandle={user?.githubHandle}
          />
        )}
      </div>
    </div>
  )
}
