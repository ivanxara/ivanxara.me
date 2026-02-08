"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function ChatInput() {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("send:", message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/80 p-2 backdrop-blur-md shadow-lg">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Send a message…"
          className="border-none bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0"
        />
        <Button size="icon" onClick={handleSend} className="rounded-xl">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
