"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image, { type ImageProps } from "next/image";
import { Expand } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ZoomableImageProps = {
  src: ImageProps["src"];
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

export function ZoomableImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority,
  unoptimized,
}: ZoomableImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "group relative block w-full cursor-pointer overflow-hidden text-left",
            wrapperClassName,
          )}
          aria-label={`Open ${alt} fullscreen`}
        >
          <Image
            src={src}
            alt={alt}
            priority={priority}
            unoptimized={unoptimized}
            className={cn("h-auto w-full", className)}
          />
          <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="size-4" />
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-6xl w-full ring-0">
        <VisuallyHidden.Root>
          <DialogTitle>{alt}</DialogTitle>
        </VisuallyHidden.Root>
        <DialogClose />
        <Image
          src={src}
          alt={alt}
          priority={priority}
          unoptimized={unoptimized}
          className="h-auto max-h-[85vh] w-full object-contain rounded-4xl shadow-2xl"
        />
      </DialogContent>
    </Dialog>
  );
}
