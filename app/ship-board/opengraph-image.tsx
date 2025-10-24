import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ship Board - fuckingship'
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
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: '100px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: 'black',
            marginBottom: 24,
          }}
        >
          Ship Board
        </div>
        <div
          style={{
            height: 4,
            width: 96,
            backgroundColor: '#E84142',
            marginBottom: 48,
          }}
        />
        <div
          style={{
            fontSize: 38,
            color: 'black',
            lineHeight: 1.4,
          }}
        >
          Track who's shipping what, weekly.
        </div>
        <div
          style={{
            fontSize: 34,
            color: '#666',
            marginTop: 32,
            fontWeight: 600,
          }}
        >
          Public accountability. Real proof. No vapor.
        </div>
      </div>
    ),
    size
  )
}

