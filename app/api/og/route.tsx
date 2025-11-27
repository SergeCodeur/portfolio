import { ImageResponse } from "next/og";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET() {
  try {
    const titleText = "Anani Serge AMOUSSOUGBO";
    const subtitleText = "Développeur Web Full-Stack & Automatisations";
    const bodyText = "React Next.js TypeScript n8n Automatisation Dashboards";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0a1628",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Pattern - Subtle Grid */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Gradient Accent - Top Right (Yellow Glow) */}
          <div
            style={{
              position: "absolute",
              top: -200,
              right: -200,
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(255, 217, 102, 0.15) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Gradient Accent - Bottom Left (Blue Glow) */}
          <div
            style={{
              position: "absolute",
              bottom: -250,
              left: -250,
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(21, 34, 56, 0.8) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "80px 100px",
              height: "100%",
              position: "relative",
              zIndex: 10,
              justifyContent: "space-between",
            }}
          >
            {/* Top Section - Name & Title */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Badge "Portfolio" */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  backgroundColor: "rgba(255, 217, 102, 0.1)",
                  borderRadius: 8,
                  border: "1px solid rgba(255, 217, 102, 0.3)",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: "#ffd966",
                    borderRadius: "50%",
                  }}
                />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#ffd966",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Portfolio 2025
                </span>
              </div>

              {/* Name */}
              <h1
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  margin: 0,
                  letterSpacing: "-1.5px",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Anani Serge AMOUSSOUGBO
              </h1>
            </div>

            {/* Middle Section - Main Value Proposition */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                marginTop: -80,
              }}
            >
              {/* Main Title */}
              <h2
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: "-2px",
                  maxWidth: 900,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Développeur Web
                <br />
                <span
                  style={{
                    color: "#ffd966",
                  }}
                >
                  Full-Stack
                </span>
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 28,
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: 800,
                  fontWeight: 400,
                }}
              >
                Boostez votre productivité grâce au développement web et à
                l&apos;automatisation.
              </p>
            </div>

            {/* Bottom Section - Tech Stack Tags */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Stats Row */}
              <div
                style={{
                  display: "flex",
                  gap: 40,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: "#ffd966",
                    }}
                  >
                    15+
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "rgba(255, 255, 255, 0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Projets
                  </span>
                </div>

                <div
                  style={{
                    width: 1,
                    height: 40,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: "#ffd966",
                    }}
                  >
                    3+
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "rgba(255, 255, 255, 0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Années
                  </span>
                </div>

                <div
                  style={{
                    width: 1,
                    height: 40,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: "#ffd966",
                    }}
                  >
                    100%
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "rgba(255, 255, 255, 0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Remote
                  </span>
                </div>
              </div>

              {/* Tech Tags */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {["React", "Next.js", "TypeScript", "n8n", "Dashboards"].map(
                  (tech) => (
                    <div
                      key={tech}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 20px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: 8,
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "rgba(255, 255, 255, 0.9)",
                        }}
                      >
                        {tech}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Accent Line - Bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              background:
                "linear-gradient(90deg, #ffd966 0%, rgba(255, 217, 102, 0.3) 100%)",
            }}
          />

          {/* Website URL - Bottom Right */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              right: 100,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: "rgba(255, 255, 255, 0.5)",
                fontWeight: 500,
              }}
            >
              serge-amoussougbo.dev
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await loadGoogleFont(
              "Inter:wght@400;600;700;900",
              titleText + subtitleText + bodyText
            ),
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}
