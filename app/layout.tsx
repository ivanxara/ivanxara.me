import "./globals.css";
import { DM_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components/header";
import type { Metadata } from "next";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ivan Xara | Full-Stack Developer",
  description: "Full-Stack Developer with a keen eye for design and user experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans dark antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {/* <Header /> */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
