import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Azeer";
  const subtitle =
    searchParams.get("subtitle") ?? "One inbox for every customer conversation";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0B1020",
          padding: "80px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: "#A5B4FC",
            marginBottom: 24,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Azeer
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 32,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#94A3B8",
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
