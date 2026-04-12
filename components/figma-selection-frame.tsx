import { motion } from "framer-motion";
import type { ReactNode, RefObject } from "react";

interface FigmaSelectionFrameProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  constraintsRef?: RefObject<HTMLElement | null>;
}

const handles = [
  "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
  "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
];

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FigmaSelectionFrame({
  children,
  className,
  contentClassName,
  constraintsRef,
}: FigmaSelectionFrameProps) {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      className={joinClasses(
        "group/figma relative inline-flex w-fit max-w-full hover:cursor-grab hover:select-none active:cursor-grabbing",
        className,
      )}
    >
      <div className={joinClasses("relative z-[1]", contentClassName)}>{children}</div>

      <div className="pointer-events-none absolute inset-0 z-10 rounded-[0.35rem] border border-[#3b82f6]/80 opacity-0 shadow-[0_0_0_1px_rgba(59,130,246,0.08)] transition-all duration-180 group-hover/figma:opacity-100">
        {handles.map((handleClassName) => (
          <span
            key={handleClassName}
            aria-hidden="true"
            className={joinClasses(
              "absolute z-10 h-2 w-2 rounded-[2px] border border-white/90 bg-[#3b82f6] shadow-[0_1px_4px_rgba(59,130,246,0.28)]",
              handleClassName,
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}
