import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

interface OgCard {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: string;
}

// Branded 1200x630 social card (navy ground, accent rule, eyebrow, title, subtitle, wordmark).
export function ogImage({ eyebrow, title, subtitle, accent = "#2DD4BF" }: OgCard): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0F1214",
          color: "#F8FAFB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 6, borderRadius: 3, background: accent }} />
          <div style={{ marginTop: 36, fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#9AA4AD" }}>
            {eyebrow}
          </div>
          <div style={{ marginTop: 20, fontSize: title.length > 48 ? 56 : 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.4, color: "#D5DAE0", maxWidth: 960 }}>{subtitle}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <div style={{ display: "flex", fontWeight: 700 }}>
            Zam<span style={{ color: "#2DD4BF" }}>Nexus</span>
          </div>
          <div style={{ color: "#9AA4AD" }}>zamnexus.com</div>
        </div>
      </div>
    ),
    ogSize
  );
}
