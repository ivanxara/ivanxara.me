import "./globals.css";
import { Manrope, Geist } from "next/font/google";
import type { Metadata } from "next";
import { PortfolioLayout } from "@/components/layout/portfolio-layout";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { AppQueryProvider } from "@/providers/query-provider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="font-sans antialiased selection:bg-accent/28 selection:text-ink">
        <AppQueryProvider>
          <SmoothScroll>
            <PortfolioLayout>{children}</PortfolioLayout>
          </SmoothScroll>
        </AppQueryProvider>
      </body>
    </html>
  );
}
