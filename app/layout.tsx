import "./globals.css"
import { ChatInput } from "@/components/chat";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-plus-jakarta-sans antialiased">
        {children}
        <ChatInput />
      </body>
    </html>
  );
}
