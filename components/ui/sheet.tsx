"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sheetVariants = cva(
  "fixed z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-2xl outline-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:translate-y-0 data-[state=closed]:translate-y-8",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b border-border data-[state=closed]:-translate-y-6",
        bottom:
          "inset-x-0 bottom-0 border-t border-border data-[state=open]:translate-y-0 data-[state=closed]:translate-y-10",
        left: "inset-y-0 left-0 h-full w-3/4 border-r border-border data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-6 sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l border-border data-[state=open]:translate-x-0 data-[state=closed]:translate-x-6 sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

function Sheet(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-background/50 transition-opacity duration-300 supports-backdrop-filter:backdrop-blur-sm data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetVariants>) {
  return (
    <DialogPrimitive.Portal data-slot="sheet-portal">
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function SheetTitle(
  props: React.ComponentProps<typeof DialogPrimitive.Title>,
) {
  return <DialogPrimitive.Title data-slot="sheet-title" {...props} />;
}

export {
  Sheet,
  SheetContent,
  SheetTitle,
};
