import "./globals.css";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import { PortfolioLayout } from "@/components/layout/portfolio-layout";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AppQueryProvider } from "@/providers/query-provider";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ivan Xará",
  description:
    "Ivan Xará is a software engineer specializing in frontend development, with a passion for creating intuitive and engaging user experiences. With expertise in React, Next.js, and TypeScript, Ivan has a proven track record of delivering high-quality web applications. Explore Ivan's portfolio to see a selection of projects that showcase his skills and creativity in the world of frontend development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", manrope.variable)}>
      <body className="font-sans antialiased selection:bg-primary/28 selection:text-foreground">
        <AppQueryProvider>
          <SmoothScroll>
            <PortfolioLayout>{children}</PortfolioLayout>
          </SmoothScroll>
        </AppQueryProvider>
      </body>
    </html>
  );
}
