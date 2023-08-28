import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import type { Metadata } from "next";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Memory game",
  description: "An amazing game to test and to improve your visual memory!",
};

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="h-screen bg-teal-50">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;
