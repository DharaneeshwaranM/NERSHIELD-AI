import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NER-SHIELD AI — North Eastern Region Logistics Intelligence Platform",
  description:
    "AI-powered logistics and accessibility intelligence platform for the North Eastern Region of India. Monitor roads, track vehicles, predict disruptions, and optimize logistics in real-time.",
  keywords: ["NER-SHIELD", "logistics", "North East India", "SIH", "smart logistics", "accessibility intelligence"],
  authors: [{ name: "BYTE BUILDERS", url: "https://nershield.gov.in" }],
  openGraph: {
    title: "NER-SHIELD AI",
    description: "Smart Logistics & Accessibility Intelligence Platform for Northeast India",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
