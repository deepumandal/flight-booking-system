import type { Metadata } from "next";
import { ReactNode } from "react";
import { getOrThrowEnv } from "@Components/config";
import { ThemeProvider } from "@Components/HOC";
import "@TailwindCSS";

export const metadata: Metadata = {};

const isProduction = process.env.NODE_ENV === "production";

export default ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no"
      />
      {isProduction && (
        <meta
          name="google-site-verification"
          content={getOrThrowEnv("GOOGLE_SITE_VERIFICATION")}
        />
      )}
    </head>
    <body className="no-scrollbar" suppressHydrationWarning>
      <ThemeProvider>{children}</ThemeProvider>
    </body>
  </html>
);
