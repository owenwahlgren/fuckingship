import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'fuckingship'
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 'bold',
            color: 'black',
            letterSpacing: '-0.02em',
          }}
        >
          f🔻ckingship
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

