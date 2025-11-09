import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "fuckingship"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: "black",
          }}
        >
          f🔻ckingship
        </div>
      </div>
    ),
    size
  )
}
