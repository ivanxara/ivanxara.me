"use client";

import * as React from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
  type PanelGroupProps,
  type PanelProps,
  type PanelResizeHandleProps,
} from "react-resizable-panels";

const ResizablePanelGroup = ({
  className,
  ...props
}: PanelGroupProps & {
  className?: string;
}) => (
  <PanelGroup
    className={className}
    {...props}
  />
);

const ResizablePanel = Panel;

const ResizableHandle = ({
  className,
  ...props
}: PanelResizeHandleProps & {
  className?: string;
}) => (
  <PanelResizeHandle
    className={className}
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
