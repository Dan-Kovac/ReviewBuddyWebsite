import { ImageResponse } from "next/og";

export const alt =
  "ReviewBuddy. Show your Google reviews on your website. For Australian tradies.";
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
          background: "#14332c",
          color: "#fffdf8",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#f5c400",
            }}
          />
          <div style={{ marginLeft: 20, fontSize: 32 }}>ReviewBuddy</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.05,
            maxWidth: 920,
          }}
        >
          Show your Google reviews on your website
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#f5c400" }}>
          For Aussie tradies. $75 + GST a month.
        </div>
      </div>
    ),
    { ...size },
  );
}
