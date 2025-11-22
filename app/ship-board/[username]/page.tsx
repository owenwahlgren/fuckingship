import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { prisma } from '@/lib/prisma'
import Avatar from '@/components/Avatar'

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  return {
    title: `@${username} - f🔻ckingship`,
    description: `See what @${username} has shipped on f🔻ckingship.`,
  }
}

async function getBuilderData(username: string) {
  // Handle overrides (like owenwg) if needed, but we're using DB values now
  // Try to find builder by username (case insensitive)
  const builders = await prisma.builder.findMany({
    where: {
      username: {
        equals: username,
        mode: 'insensitive'
      }
    },
    include: {
      ships: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  const builder = builders[0]

  if (!builder) return null

  // Get rank
  const allBuilders = await prisma.builder.findMany({
    orderBy: [
      { shipCount: 'desc' },
      { messageCount: 'desc' }
    ],
    select: { id: true }
  })
  
  const rank = allBuilders.findIndex(b => b.id === builder.id) + 1

  // Get associated user for social links if available
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { twitterHandle: builder.username },
        { twitterHandle: `@${builder.username}` },
        { githubHandle: builder.username }
      ]
    },
    select: {
      twitterHandle: true,
      githubHandle: true,
      image: true
    }
  })

  return { builder, rank, user }
}

export default async function BuilderProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const data = await getBuilderData(username)
  
  if (!data) {
    notFound()
  }

  const { builder, rank, user } = data
  
  // Prioritize GitHub avatar
  const avatarUrl = user?.githubHandle 
    ? `https://github.com/${user.githubHandle}.png`
    : user?.image

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#FBFBFB]/90 backdrop-blur-sm z-50 border-b border-black/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-tight hover:opacity-60 transition-opacity">
            F🔻CKINGSHIP
          </Link>
          <Link 
            href="/ship-board"
            className="text-xs font-bold uppercase tracking-wider text-black/40 hover:text-black transition-colors"
          >
            ← All Builders
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <Link 
          href="/ship-board"
          className="inline-flex items-center gap-2 text-sm font-bold text-black/40 hover:text-black transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Board
        </Link>

        {/* Profile Header */}
        <div className="mb-20 border-b border-black pb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Avatar 
                  src={avatarUrl} 
                  username={builder.username} 
                  size="xl"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                    @{builder.username}
                  </h1>
                  {builder.firstName && (
                    <p className="text-black/40 font-medium mt-1">{builder.firstName} {builder.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4">
                {user?.twitterHandle && (
                  <a 
                    href={`https://x.com/${user.twitterHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wide text-black/40 hover:text-[#E84142] transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Twitter
                  </a>
                )}
                {(user?.githubHandle || builder.username) && (
                  <a 
                    href={`https://github.com/${user?.githubHandle || builder.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wide text-black/40 hover:text-black transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="flex gap-8 md:gap-12 mt-8 md:mt-0">
              <div className="text-right">
                <p className="text-5xl font-black tracking-tight text-black">{builder.shipCount}</p>
                <p className="text-xs font-bold text-black/30 uppercase tracking-widest">Total Ships</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-black tracking-tight text-black">#{rank}</p>
                <p className="text-xs font-bold text-black/30 uppercase tracking-widest">Rank</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ship Timeline */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E84142] rounded-full"></span>
            Ship Log
          </h2>

          {builder.ships.length === 0 ? (
            <div className="p-12 border border-dashed border-black/10 rounded-xl text-center">
              <p className="text-black/40">No ships logged yet.</p>
            </div>
          ) : (
            <div className="relative border-l border-black/10 ml-3 space-y-12 pb-4">
              {builder.ships.map((ship) => (
                <div key={ship.id} className="group relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-white border-2 border-black group-hover:border-[#E84142] transition-colors"></div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-mono text-black/40 font-bold">
                      {format(ship.createdAt, 'MMMM d, yyyy')}
                    </span>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-black/10">
                    <p className="text-xl font-medium text-black/90 leading-relaxed mb-4">
                      {ship.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-black/5 pt-4 mt-4">
                      {ship.nextSteps ? (
                        <div className="flex items-center gap-2 text-xs text-black/50 max-w-[70%]">
                          <span className="font-bold text-black/20">NEXT</span>
                          <span className="truncate">{ship.nextSteps}</span>
                        </div>
                      ) : <div></div>}

                      {ship.proofUrl && (
                        <a
                          href={ship.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#E84142] transition-colors uppercase tracking-wide border-b border-transparent hover:border-[#E84142]"
                        >
                          View Artifact
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

