"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
  type PanelGroupProps,
  type PanelProps,
  type PanelResizeHandleProps,
} from "react-resizable-panels";
import { cn } from "@/lib/utils";

const panelGroupVariants = cva("", {
  variants: {
    variant: {
      default: "",
      layout: "h-full w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const panelVariants = cva("", {
  variants: {
    variant: {
      default: "",
      content: "min-w-0 overflow-hidden",
      sidebar: "min-w-0 overflow-hidden bg-sidebar transition-[border-color] duration-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const handleVariants = cva("shrink-0 bg-transparent transition-colors duration-200", {
  variants: {
    variant: {
      default: "",
      divider: "",
    },
    collapsed: {
      true: "pointer-events-none w-0 opacity-0",
      false: "group relative w-4 cursor-col-resize",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const ResizablePanelGroup = ({
  className,
  variant,
  ...props
}: PanelGroupProps & {
  className?: string;
} & VariantProps<typeof panelGroupVariants>) => (
  <PanelGroup
    className={cn(panelGroupVariants({ variant }), className)}
    {...props}
  />
);

const ResizablePanel = React.forwardRef<
  ImperativePanelHandle,
  PanelProps & {
    className?: string;
  } & VariantProps<typeof panelVariants>
>(({ className, variant, ...props }, ref) => (
  <Panel
    ref={ref}
    className={cn(panelVariants({ variant }), className)}
    {...props}
  />
));

ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = ({
  className,
  variant,
  collapsed,
  ...props
}: PanelResizeHandleProps & {
  className?: string;
} & VariantProps<typeof handleVariants>) => (
  <PanelResizeHandle
    className={cn(handleVariants({ variant, collapsed }), className)}
    {...props}
  />
);

export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ImperativePanelHandle,
  type PanelProps,
};
