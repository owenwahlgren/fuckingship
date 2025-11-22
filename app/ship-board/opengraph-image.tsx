import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const alt = 'Ship Board - f🔻ckingship'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  try {
    const [shipsCount, buildersCount, leaderboard] = await Promise.all([
      prisma.ship.count(),
      prisma.builder.count(),
      prisma.builder.findMany({
        orderBy: [{ shipCount: 'desc' }, { messageCount: 'desc' }],
        take: 3,
      }),
    ])

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FBFBFB',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '60px' }}>
            
            {/* Title Section */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', fontSize: 96, fontWeight: 900, color: 'black', lineHeight: 0.9, letterSpacing: '-0.05em' }}>
                  SHIP
                </div>
                <div style={{ display: 'flex', fontSize: 96, fontWeight: 900, color: 'black', lineHeight: 0.9, letterSpacing: '-0.05em' }}>
                  BO🔺RD
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginTop: 20, 
              }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e', marginRight: 12 }}></div>
                <div style={{
                  fontSize: 24, 
                  fontWeight: 600, 
                  color: 'rgba(0,0,0,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Live Feed
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div style={{ display: 'flex', gap: '60px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', fontSize: 80, fontWeight: 900, color: 'black', lineHeight: 1 }}>{shipsCount}</div>
                <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, color: '#E84142', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Ships</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', fontSize: 80, fontWeight: 900, color: 'black', lineHeight: 1 }}>{buildersCount}</div>
                <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Builders</div>
              </div>
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <div style={{ display: 'flex', fontSize: 24, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              Top Shippers
            </div>
            
            {leaderboard.map((builder, index) => (
              <div 
                key={builder.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  padding: '24px 40px',
                  borderRadius: '24px',
                  border: '2px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ 
                    display: 'flex',
                    fontSize: 32, 
                    fontWeight: 900, 
                    color: index === 0 ? '#E84142' : 'rgba(0,0,0,0.3)',
                    width: '50px'
                  }}>
                    0{index + 1}
                  </div>
                  <div style={{ display: 'flex', fontSize: 32, fontWeight: 800, color: 'black' }}>
                    @{builder.username}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', fontSize: 32, fontWeight: 900, color: 'black' }}>{builder.shipCount}</div>
                  <div style={{ display: 'flex', fontSize: 16, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase' }}>SHIPS</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      size
    )
  } catch (e) {
    console.error('OG Image Error:', e)
    return new ImageResponse(
      (
        <div style={{ fontSize: 64, color: 'black', background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
          SHIP BO🔺RD
        </div>
      ),
      size
    )
  }
}