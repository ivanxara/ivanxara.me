import React from "react";

export default function Heading2({ label }: { label: string }) {
  return <h2 className="mx-auto font-black tracking-tighter text-sm lowercase">{label}</h2>;
}
