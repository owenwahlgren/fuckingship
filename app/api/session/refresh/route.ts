import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        twitterHandle: true,
        githubHandle: true,
        role: true,
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update missing handles from JWT token if available
    const updateData: any = {}
    if (!dbUser.twitterHandle && session.user.twitterHandle) {
      updateData.twitterHandle = session.user.twitterHandle
    }
    if (!dbUser.githubHandle && session.user.githubHandle) {
      updateData.githubHandle = session.user.githubHandle
    }
    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: updateData,
      }).catch(() => {})
      console.log('Updated missing user fields:', updateData)
    }

    return NextResponse.json({
      twitterHandle: dbUser.twitterHandle || session.user.twitterHandle,
      githubHandle: dbUser.githubHandle || session.user.githubHandle,
      role: dbUser.role,
      hasTwitter: dbUser.accounts.some(a => a.provider === 'twitter'),
      hasGithub: dbUser.accounts.some(a => a.provider === 'github'),
    })
  } catch (error) {
    console.error('Session refresh error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

