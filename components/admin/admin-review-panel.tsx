'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Application {
  id: string
  user: {
    twitterHandle: string | null
    githubHandle: string | null
  }
  githubHandle: string
  whatYouShipped: string
  proofOfWork: string
  whatYouWillBuild: string
  role: string
  whyAvalanche: string
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedAt: string | null
  createdAt: string
}

interface AdminReviewPanelProps {
  applications: Application[]
}

export function AdminReviewPanel({ applications }: AdminReviewPanelProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL')

  const handleReview = async (applicationId: string, status: 'APPROVED' | 'REJECTED') => {
    setLoading(applicationId)
    try {
      const response = await fetch('/api/application/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, status }),
      })

      if (!response.ok) {
        throw new Error('Failed to review application')
      }

      window.location.reload()
    } catch (error) {
      console.error('Error reviewing application:', error)
      alert('Failed to review application')
    } finally {
      setLoading(null)
    }
  }

  const filteredApplications = applications.filter(app => 
    filter === 'ALL' || app.status === filter
  )

  const statusCounts = {
    PENDING: applications.filter(a => a.status === 'PENDING').length,
    APPROVED: applications.filter(a => a.status === 'APPROVED').length,
    REJECTED: applications.filter(a => a.status === 'REJECTED').length,
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === 'ALL' ? 'primary' : 'outline'}
            onClick={() => setFilter('ALL')}
          >
            All ({applications.length})
          </Button>
          <Button 
            variant={filter === 'PENDING' ? 'primary' : 'outline'}
            onClick={() => setFilter('PENDING')}
          >
            Pending ({statusCounts.PENDING})
          </Button>
          <Button 
            variant={filter === 'APPROVED' ? 'primary' : 'outline'}
            onClick={() => setFilter('APPROVED')}
          >
            Approved ({statusCounts.APPROVED})
          </Button>
          <Button 
            variant={filter === 'REJECTED' ? 'primary' : 'outline'}
            onClick={() => setFilter('REJECTED')}
          >
            Rejected ({statusCounts.REJECTED})
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <Card className="border-gray-200">
            <div className="p-12 text-center">
              <p className="text-black/60">No applications found</p>
            </div>
          </Card>
        ) : (
          filteredApplications.map((app) => (
            <Card key={app.id} className="border-gray-200">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">
                      @{app.user.twitterHandle || 'unknown'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      GitHub: {app.user.githubHandle || 'not connected'}
                    </p>
                    <p className={`font-semibold mt-2 text-sm ${
                      app.status === 'PENDING' ? 'text-yellow-600' :
                      app.status === 'APPROVED' ? 'text-green-600' :
                      'text-red-600'
                    }`}>
                      {app.status}
                    </p>
                  </div>
                  {app.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => handleReview(app.id, 'APPROVED')}
                        disabled={loading === app.id}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReview(app.id, 'REJECTED')}
                        disabled={loading === app.id}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>

                <div className="text-black space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Role</h4>
                    <p className="whitespace-pre-wrap text-black/90">{app.role}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">What they shipped (last 60 days)</h4>
                    <p className="whitespace-pre-wrap text-black/90 leading-relaxed">{app.whatYouShipped}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Proof of Work</h4>
                    <p className="whitespace-pre-wrap text-black/90 leading-relaxed">{app.proofOfWork}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">What they'll ship (first 14 days)</h4>
                    <p className="whitespace-pre-wrap text-black/90 leading-relaxed">{app.whatYouWillBuild}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Why Avalanche C-Chain?</h4>
                    <p className="whitespace-pre-wrap text-black/90 leading-relaxed">{app.whyAvalanche}</p>
                  </div>

                  {app.submittedAt && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Submitted</h4>
                      <p className="text-gray-700 text-sm">{new Date(app.submittedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

