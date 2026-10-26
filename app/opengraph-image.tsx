import { ImageResponse } from "next/og";
import tokens from "@/design/tokens/tokens.json";
import { sharePriceLine } from "@/lib/gst";

const theme = tokens.themes[tokens.active as keyof typeof tokens.themes];

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
          background: theme.color.brand,
          color: theme.color["on-brand"],
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: theme.color.accent,
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
        <div style={{ display: "flex", fontSize: 28, color: theme.color["on-brand-muted"] }}>
          {sharePriceLine()}
        </div>
      </div>
    ),
    { ...size },
  );
}
