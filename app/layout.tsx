import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>BaseTimer</title>
        <meta name="description" content="BaseTimer records your first onchain start time exactly once." />
        <meta name="application-name" content="BaseTimer" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="BaseTimer" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#09090b" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="base:app_id" content="69cb25346b6a2cd82c727ed8" />
        <meta
          name="talentapp:project_verification"
          content="c814b695bf88d380f1d49efc806d7b33b6d5836ec251c70b88550a59df895df7ee2bf8c5349f0a336b3350709ed233376a8f815d207b107e00239f3154ce8813"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
