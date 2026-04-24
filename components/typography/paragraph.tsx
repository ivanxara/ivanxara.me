import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const paragraphVariants = cva("text-muted-foreground", {
  variants: {
    variant: {
      p: "text-sm leading-relaxed sm:text-base",
      small: "text-sm leading-6",
      compact: "text-xs leading-loose",
      muted: "text-sm leading-relaxed",
      eyebrow: "text-xs font-black uppercase tracking-widest",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type ParagraphProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof paragraphVariants> &
  Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Paragraph<T extends ElementType = "p">({
  as,
  variant,
  className,
  children,
  ...props
}: ParagraphProps<T>) {
  const Component = as ?? "p";

  return (
    <Component
      className={cn(paragraphVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
