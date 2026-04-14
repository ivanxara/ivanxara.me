"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Lisbon",
        }),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur-md"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-[11px] tracking-wider text-muted">
        {time}
      </span>
      <span className="text-[10px] text-muted opacity-60">PT</span>
    </motion.div>
  );
}
