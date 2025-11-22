import Link from 'next/link'
import { format, startOfDay, startOfWeek, startOfMonth, endOfDay, endOfWeek, endOfMonth } from 'date-fns'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Ship Board - f🔻ckingship',
  description: "Live leaderboard. Who's shipping, who's talking.",
}

type TimeRange = 'day' | 'week' | 'month' | 'all'

async function getLeaderboardData(range: TimeRange = 'week') {
  const now = new Date()
  let startDate: Date | undefined
  let endDate: Date | undefined

  if (range === 'day') {
    startDate = startOfDay(now)
    endDate = endOfDay(now)
  } else if (range === 'week') {
    startDate = startOfWeek(now)
    endDate = endOfWeek(now)
  } else if (range === 'month') {
    startDate = startOfMonth(now)
    endDate = endOfMonth(now)
  }

  const ships = await prisma.ship.findMany({
    where: startDate ? {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    } : undefined,
    include: { builder: true },
    orderBy: { createdAt: 'desc' },
  })

  const messages = await prisma.message.findMany({
    where: startDate ? {
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    } : undefined,
    include: { builder: true },
  })

  const builderStats = new Map<string, {
    builder: any
    ships: number
    messages: number
    lastShip?: Date
  }>()

  ships.forEach(ship => {
    const existing = builderStats.get(ship.builderId) || { 
      builder: ship.builder, 
      ships: 0, 
      messages: 0,
      lastShip: ship.createdAt 
    }
    existing.ships++
    if (!existing.lastShip || ship.createdAt > existing.lastShip) {
      existing.lastShip = ship.createdAt
    }
    builderStats.set(ship.builderId, existing)
  })

  messages.forEach(msg => {
    if (!msg.builderId) return
    const existing = builderStats.get(msg.builderId) || { 
      builder: msg.builder, 
      ships: 0, 
      messages: 0 
    }
    existing.messages++
    builderStats.set(msg.builderId, existing)
  })

  const leaderboard = Array.from(builderStats.values())
    .sort((a, b) => {
      if (b.ships !== a.ships) return b.ships - a.ships
      return b.messages - a.messages
    })

  // Get all accepted applications + admins for the roster
  const acceptedUsers = await prisma.user.findMany({
    where: {
      OR: [
        { application: { status: 'APPROVED' } },
        { role: 'ADMIN' }
      ]
    },
    select: {
      twitterHandle: true,
      githubHandle: true,
      name: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    leaderboard,
    ships,
    totalShips: ships.length,
    totalMessages: messages.length,
    roster: acceptedUsers,
  }
}

export default async function ShipBoard({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const { range: rawRange } = await searchParams
  const range = (rawRange as TimeRange) || 'week'
  const { leaderboard, ships, totalShips, totalMessages, roster } = await getLeaderboardData(range)

  const now = new Date()
  const dateLabel = range === 'day' 
    ? format(now, 'MMMM d')
    : range === 'week'
    ? `${format(startOfWeek(now), 'MMM d')} — ${format(endOfWeek(now), 'MMM d')}`
    : range === 'month'
    ? format(now, 'MMMM yyyy')
    : 'All Time'

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#FBFBFB]/90 backdrop-blur-sm z-50 border-b border-black/5">
        <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-tight hover:opacity-60 transition-opacity">
            F🔻CKINGSHIP
          </Link>
          <div className="flex gap-1 bg-black/5 p-1 rounded-lg">
            {(['day', 'week', 'month', 'all'] as const).map((r) => (
              <Link
                key={r}
                href={`/ship-board?range=${r}`}
                className={`px-4 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all ${
                  range === r
                    ? 'bg-black text-white shadow-sm'
                    : 'text-black/40 hover:text-black hover:bg-white/50'
                }`}
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 pt-32 pb-20">
        {/* Dashboard Header */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">
          <div className="lg:col-span-2">
            <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
              SHIP BO🔺RD
            </h1>
            <p className="text-xl text-black/40 font-medium">{dateLabel}</p>
          </div>
          
          <div className="bg-white p-6 border border-black/5 rounded-xl shadow-sm lg:col-span-1">
            <p className="text-xs font-bold text-black/30 uppercase tracking-widest mb-2">Total Ships</p>
            <p className="text-5xl font-black tracking-tight text-black">{totalShips}</p>
          </div>
          
          <div className="bg-white p-6 border border-black/5 rounded-xl shadow-sm lg:col-span-1">
            <p className="text-xs font-bold text-black/30 uppercase tracking-widest mb-2">Total Messages</p>
            <p className="text-5xl font-black tracking-tight text-black">{totalMessages}</p>
          </div>

          <div className="bg-white p-6 border border-black/5 rounded-xl shadow-sm lg:col-span-1">
            <p className="text-xs font-bold text-black/30 uppercase tracking-widest mb-2">Active Builders</p>
            <p className="text-5xl font-black tracking-tight text-black">{leaderboard.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Leaderboard - Clean Table */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <h2 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                Rankings
              </h2>
              
              <div className="bg-white border border-black/5 rounded-2xl shadow-sm overflow-hidden">
                {leaderboard.length === 0 ? (
                  <div className="p-8 text-center text-black/30 text-sm">No data yet</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {leaderboard.map((entry, index) => (
                      <div 
                        key={entry.builder.id} 
                        className="flex items-center p-4 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-8 text-center font-mono text-sm font-bold text-black/30">
                          {(index + 1).toString().padStart(2, '0')}
                        </div>
                        
                        <div className="flex-1 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">@{entry.builder.username}</span>
                            {index === 0 && <span className="text-[10px] bg-[#E84142] text-white px-1.5 py-0.5 rounded font-bold">MVP</span>}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                              <div 
                                className="h-full bg-black"
                                style={{ width: `${Math.min((entry.ships / (leaderboard[0]?.ships || 1)) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono text-black/40">{entry.messages} msgs</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-black tabular-nums">{entry.ships}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Roster Links */}
              <div className="mt-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">
                  Accepted Roster ({roster.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {roster.map((user, i) => {
                    const handle = user.twitterHandle || user.githubHandle || user.name || 'anon'
                    const cleanHandle = handle.replace('@', '')
                    
                    return (
                      <a
                        key={i}
                        href={`https://x.com/${cleanHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-medium text-black/40 hover:text-black transition-colors"
                      >
                        @{cleanHandle}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Live Feed - Minimalist Stream */}
          <div className="lg:col-span-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E84142] rounded-full animate-pulse"></span>
              Live Stream
            </h2>

            <div className="space-y-8">
              {ships.length === 0 ? (
                <div className="p-12 border border-dashed border-black/10 rounded-xl text-center">
                  <p className="text-black/40">No ships logged in this period.</p>
                </div>
              ) : (
                ships.map((ship) => (
                  <div key={ship.id} className="group relative pl-8 border-l border-black/10 pb-8 last:pb-0 last:border-0">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-white border-2 border-black group-hover:border-[#E84142] transition-colors"></div>
                    
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-bold text-black">@{ship.builder.username}</span>
                      <span className="text-xs font-mono text-black/30">{format(ship.createdAt, 'HH:mm')}</span>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-black/10">
                      <p className="text-base text-black/80 leading-relaxed mb-4 whitespace-pre-wrap">
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
