import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create AI Skills from Anything — CreateSkills.xyz",
  description:
    "Turn any URL, GitHub repo, doc, or video into a portable AI skill file. Power your agents and workflows in seconds.",
  keywords: [
    "create ai skill",
    "ai agent skill",
    "skill file generator",
    "MCP skill",
    "agent economy",
    "ai workflow",
    "LLM skill",
    "knowledge agent",
    "portable skill",
    "ai tools",
  ],
  openGraph: {
    title: "Create AI Skills from Anything — CreateSkills.xyz",
    description:
      "Turn any URL, GitHub repo, doc, or video into a portable AI skill file.",
    url: "https://createskills.xyz",
    type: "website",
    siteName: "CreateSkills",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create AI Skills from Anything",
    description: "Turn any knowledge source into a portable .skill file.",
  },
  alternates: {
    canonical: "https://createskills.xyz",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://createskills.xyz/#website",
      url: "https://createskills.xyz",
      name: "CreateSkills",
      description: "Turn any knowledge source into a portable AI skill file.",
    },
    {
      "@type": "SoftwareApplication",
      name: "CreateSkills",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: "https://createskills.xyz",
      description:
        "Generate portable .skill files from URLs, GitHub repos, docs, YouTube videos, and more for use in AI agent workflows.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free core .skill file",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
