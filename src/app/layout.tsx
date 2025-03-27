import type { Metadata } from "next";
import { ReactNode } from "react";
import "@TailwindCSS";
import { QueryProvider } from "@Components/HOC/QueryClientProvider";
import ReduxProvider from "@Components/HOC/redux";
import { ToastProvider } from "@Components/HOC/ToastProvider";

export const metadata: Metadata = {};

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
    </head>
    <body className="no-scrollbar" suppressHydrationWarning>
      <QueryProvider>
        <ReduxProvider>{children}</ReduxProvider>
      </QueryProvider>
      <ToastProvider />
    </body>
  </html>
);
