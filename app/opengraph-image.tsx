import { ImageResponse } from "next/og";

export const alt = "ReviewBuddy. Google reviews on your website.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#1a1a1a",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "#38B6FF",
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
          <div style={{ marginLeft: 16, fontSize: 28, letterSpacing: 3 }}>
            ReviewBuddy
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            lineHeight: 1.05,
            maxWidth: 920,
          }}
        >
          Win their trust before they pick up the phone.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#1a1a1a" }}>
          Free for 7 days, no card needed. From $49 a month, GST included.
        </div>
      </div>
    ),
    { ...size },
  );
}
