import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { AdminReviewPanel } from '@/components/AdminReviewPanel'
import Link from 'next/link'

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  const applications = await prisma.application.findMany({
    include: {
      user: {
        select: {
          twitterHandle: true,
          githubHandle: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="min-h-screen bg-white p-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Admin Panel</h1>
            <p className="text-gray-600 text-sm mt-1">Logged in as @{session.user.twitterHandle}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/about" className="text-xs sm:text-sm text-black/60 hover:text-black underline">
              About
            </Link>
            <Link 
              href="/api/signout"
              className="px-3 sm:px-4 py-2 font-medium transition-all duration-200 bg-white text-black border-2 border-black/10 hover:bg-black/5 rounded-lg text-xs sm:text-sm"
            >
              Sign Out
            </Link>
          </div>
        </div>

        <AdminReviewPanel applications={applications as any} />
      </div>
    </div>
  )
}

