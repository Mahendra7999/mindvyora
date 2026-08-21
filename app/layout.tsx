import "./globals.css";
import "./neon.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mindvyora-psi.vercel.app"),
  title: { default: "MINDVYORA — Digital Learning Space", template: "%s | MINDVYORA" },
  description: "MINDVYORA is a digital learning space for students to learn, connect with their coach, access resources, follow announcements and stay engaged with their learning journey.",
  applicationName: "MINDVYORA", keywords: ["MINDVYORA", "digital learning platform", "student learning", "STEM learning", "student resources", "student coach"],
  authors: [{ name: "MINDVYORA" }], creator: "MINDVYORA", publisher: "MINDVYORA", formatDetection: { email: false, telephone: false },
  openGraph: { type: "website", siteName: "MINDVYORA", title: "MINDVYORA — Where learning comes alive.", description: "A focused digital space for classes, projects, resources, announcements and conversations with your coach." },
  twitter: { card: "summary_large_image", title: "MINDVYORA — Where learning comes alive.", description: "A focused digital learning space for students and coaches." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: { google: "x-t28AtKs-EuUlWeVs9doLdkc2gxWmAzaQP2UltDhnQ" },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
