import "./globals.css";
import { Archivo, Manrope } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import type { Metadata } from "next";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ivan Xara | Minimal Portfolio",
  description:
    "A minimal, art-directed portfolio for Ivan Xara focused on thoughtful digital products and full-stack craft.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${archivo.variable}`}>
      <body className="font-sans antialiased selection:bg-[#f1d0ad] selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
