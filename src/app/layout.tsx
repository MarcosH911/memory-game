import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

import "./globals.css";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Memory game",
  description: "An amazing game to test and to improve your visual memory!",
};

function RootLayout({ children }: Props) {
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
