import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const headingVariants = cva("text-foreground", {
  variants: {
    variant: {
      "heading-1":
        "text-[clamp(3.5rem,12vw,13rem)] font-black leading-none tracking-tighter",
      "heading-2":
        "text-[clamp(1.8rem,5vw,5rem)] font-black leading-tight tracking-tighter leading-none",
      "heading-3":
        "text-[clamp(1.3rem,2vw,1.9rem)] font-black leading-tight tracking-tighter",
      "heading-4": "text-xl font-semibold leading-tight tracking-tight",
    },
  },
  defaultVariants: {
    variant: "heading-2",
  },
});

type HeadingProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof headingVariants> &
  Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Heading<T extends ElementType = "h2">({
  as,
  variant,
  className,
  children,
  ...props
}: HeadingProps<T>) {
  const Component = as ?? "h2";

  return (
    <Component className={cn(headingVariants({ variant }), className)} {...props}>
      {children}
    </Component>
  );
}
