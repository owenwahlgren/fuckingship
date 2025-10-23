import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'About fuckingship'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: '100px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          fuckingship
        </div>
        <div
          style={{
            height: 4,
            width: 96,
            backgroundColor: '#E84142',
            marginBottom: 60,
          }}
        />
        <div
          style={{
            fontSize: 42,
            color: 'black',
            lineHeight: 1.4,
            maxWidth: 1000,
            marginBottom: 48,
          }}
        >
          We're a private, no-BS cell of Avalanche builders who ship.
          <br />
          Weekly. Publicly. On mainnet.
        </div>
        <div
          style={{
            fontSize: 36,
            color: 'black',
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          No "founders." No stealth. No decks. No grant beggars.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

