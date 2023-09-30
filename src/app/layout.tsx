import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";
import { SWRProvider } from "./(components)/SWRProvider";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Memory game",
  description: "An amazing game to test and to improve your visual memory!",
};

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

function RootLayout({ children }: Props) {
  return (
    <html lang="es" className={nunito.variable}>
      <body className="h-screen bg-teal-50">
        <SWRProvider>
          {children}
          <Analytics />
        </SWRProvider>
      </body>
    </html>
  );
}

export default RootLayout;
