"use client";

import { motion, type MotionValue } from "framer-motion";

export function EditorCursor({
  x,
  y,
  visible,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-[70] hidden md:block"
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.92 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{ x, y }}
    >
      {/* <div className="relative -translate-x-[6px] -translate-y-[4px]">
        <div className="absolute left-[25px] top-[30px] rounded-full bg-[#4A4A4A] px-3 py-[5px] text-[11px] font-black leading-none text-white shadow-[0_10px_20px_rgba(20,20,20,0.18)]">
          Edit
        </div>
      </div> */}

      <svg
        width="34"
        height="39"
        viewBox="0 0 34 39"
        fill="none"
        className="-translate-x-[4px] -translate-y-[2px] drop-shadow-[0_10px_18px_rgba(20,20,20,0.18)]"
      >
        <g filter="url(#cursor-pointer-shadow)">
          <path
            d="M10.9696 27.6419L7 7L24.4662 17.321L15.7331 19.7027L10.9696 27.6419Z"
            fill="#4A4A4A"
          />
          <path
            d="M7.40389 6.31649L5.88781 5.42063L6.22037 7.14993L10.19 27.7919L10.5821 29.8309L11.6504 28.0504L16.2498 20.3847L24.6751 18.0869L26.4869 17.5928L24.8701 16.6375L7.40389 6.31649Z"
            stroke="white"
            strokeWidth="1.58784"
            strokeLinecap="square"
          />
        </g>
        <defs>
          <filter
            id="cursor-pointer-shadow"
            x="0.012114"
            y="0.665628"
            width="33.259"
            height="37.7055"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.58784" />
            <feGaussianBlur stdDeviation="2.38176" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_151_43"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_151_43"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
