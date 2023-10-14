import { Analytics } from "@vercel/analytics/react";
import { Nunito } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import { SWRProvider } from "./(components)/SWRProvider";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "CogniAprendo | Aumenta tu Cociente Intelectual",
  description:
    "El único juego respaldado por evidencia científica que aumenta tu Cociente Intelectual",
};

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

function RootLayout({ children }: Props) {
  return (
    <html lang="es" className={nunito.variable}>
      <body className="h-[100vh] bg-teal-50 supports-[height:100dvh]:h-[100dvh]">
        <ToasterProvider />
        <SWRProvider>
          {children}
          <Analytics />
        </SWRProvider>
      </body>
    </html>
  );
}

export default RootLayout;
