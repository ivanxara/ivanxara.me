import "./globals.css";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import { AppQueryProvider } from "@/components/providers/query-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased selection:bg-accent/28 selection:text-ink">
        <AppQueryProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </AppQueryProvider>
      </body>
    </html>
  );
}
