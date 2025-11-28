import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Application {
  id: string
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

interface ApplicationStatusProps {
  application: Application
  onEdit?: () => void
}

export function ApplicationStatus({ application, onEdit }: ApplicationStatusProps) {
  const [deleting, setDeleting] = useState(false)

  const statusColors = {
    DRAFT: 'text-gray-500',
    PENDING: 'text-yellow-600',
    APPROVED: 'text-green-600',
    REJECTED: 'text-red-600',
  }

  const canEdit = application.status === 'DRAFT' || application.status === 'PENDING'
  const isRejected = application.status === 'REJECTED'
  const isApproved = application.status === 'APPROVED'

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this application? This cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      const response = await fetch('/api/application', {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to delete application')
        setDeleting(false)
        return
      }

      // Reload to show empty state (allowing reapplication)
      window.location.reload()
    } catch (error) {
      alert('Failed to delete application')
      setDeleting(false)
    }
  }

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-black">Your Application</CardTitle>
        <p className={`text-sm font-semibold mt-2 ${statusColors[application.status]}`}>
          Status: {application.status}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm text-gray-600 mb-2">
              What you shipped (last 60 days)
            </h3>
            <p className="whitespace-pre-wrap text-black leading-relaxed">
              {application.whatYouShipped}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-600 mb-2">Proof of Work</h3>
            <p className="whitespace-pre-wrap text-black leading-relaxed">
              {application.proofOfWork}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-600 mb-2">
              What you'll ship (first 14 days)
            </h3>
            <p className="whitespace-pre-wrap text-black leading-relaxed">
              {application.whatYouWillBuild}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-600 mb-2">Your role</h3>
            <p className="whitespace-pre-wrap text-black leading-relaxed">{application.role}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-600 mb-2">Why Avalanche C-Chain?</h3>
            <p className="whitespace-pre-wrap text-black leading-relaxed">
              {application.whyAvalanche}
            </p>
          </div>

          {application.submittedAt && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Submitted</h3>
              <p className="text-gray-700">{new Date(application.submittedAt).toLocaleString()}</p>
            </div>
          )}

          {isApproved && (
            <div className="pt-6 border-t border-gray-200 bg-green-50 -mx-6 -mb-6 px-6 pb-6">
              <p className="text-sm text-green-800 font-medium">
                ✓ Application approved!{' '}
                <a
                  href="https://x.com/freakingship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-900"
                >
                  @freakingship
                </a>{' '}
                will reach out to you on X with further details.
              </p>
            </div>
          )}

          {canEdit && onEdit && (
            <div className="pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={onEdit} className="w-full">
                Edit Application
              </Button>
            </div>
          )}

          {isRejected && (
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-black/60 mb-4">
                Your application was not accepted. You can delete this application then reapply
                after 14 days.
              </p>
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full bg-red-600 text-white hover:bg-red-700"
              >
                {deleting ? 'Deleting...' : 'Delete Application'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
