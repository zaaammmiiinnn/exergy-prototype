import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Exergy Solutions - Industrial Energy & Water Thermodynamic Optimization";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#061821",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient Top Glow Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #0c758d, #30a66a)",
          }}
        />

        {/* Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "36px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            EXERGY<span style={{ color: "#0c758d", marginLeft: "12px" }}>SOLUTIONS</span>
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(12, 117, 141, 0.2)",
              border: "1px solid rgba(12, 117, 141, 0.4)",
              borderRadius: "9999px",
              padding: "6px 16px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#30a66a",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Dubai, UAE
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "60px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
          >
            Turn Wasted Energy and Water into Profit.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: "950px",
            }}
          >
            Second-Law thermodynamic modeling, pinch recovery, and guaranteed turnkey implementation across industrial facilities.
          </div>
        </div>

        {/* Footer Metrics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", gap: "48px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#30a66a" }}>
                25% – 30%
              </div>
              <div style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>
                Typical OPEX Cut
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#0c758d" }}>
                Turnkey
              </div>
              <div style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>
                Guaranteed Execution
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff" }}>
                ISO 50001
              </div>
              <div style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>
                IPMVP Measurement
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#0c758d",
            }}
          >
            exergy-solutions.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
