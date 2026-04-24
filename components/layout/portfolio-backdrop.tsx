"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

export function PortfolioBackdrop({
  progress,
  enableMotion = true,
}: {
  progress: MotionValue<number>;
  enableMotion?: boolean;
}) {
  const driftA = useTransform(progress, [0, 1], [0, -80]);
  const driftB = useTransform(progress, [0, 1], [0, -140]);
  const driftC = useTransform(progress, [0, 1], [0, -200]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute left-[-8%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(196,168,130,0.07),rgba(196,168,130,0)_70%)] blur-3xl"
        style={enableMotion ? { y: driftA } : undefined}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[-10%] top-[22%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(130,150,196,0.05),rgba(130,150,196,0)_70%)] blur-3xl"
        style={enableMotion ? { y: driftB } : undefined}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[18%] top-[52%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(130,196,160,0.04),rgba(130,196,160,0)_72%)] blur-3xl"
        style={enableMotion ? { y: driftC } : undefined}
      />
    </div>
  );
}
