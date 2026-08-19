import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LoaderProvider } from "@/components/providers/LoaderProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/navigation/CustomCursor";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/data";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Digital Growth Agency`,
    template: `%s — ${site.name}`,
  },
  description:
    "Y-Vision helps businesses grow through websites, mobile apps, marketing, SEO, automation, and innovative technology solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="grain">
        <LoaderProvider>
          <SmoothScrollProvider>
            <TransitionProvider>
              <Preloader />
              <CustomCursor />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </TransitionProvider>
          </SmoothScrollProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
