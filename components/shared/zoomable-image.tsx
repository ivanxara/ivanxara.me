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
import { Button } from "@/components/ui/button";
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
      <div className={wrapperClassName}>
        <DialogTrigger asChild>
          <Button
            variant="unstyled"
            size="image-trigger"
            aria-label={`Open ${alt} fullscreen`}
          >
            <div className="group relative block overflow-hidden text-left">
              <Image
                src={src}
                alt={alt}
                priority={priority}
                unoptimized={unoptimized}
                className={cn("h-auto w-full", className)}
              />
              <div className="absolute right-5 top-5 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <div className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-sm group-hover:border-white/25 group-hover:bg-black/60 group-focus-visible:border-white/25 group-focus-visible:bg-black/60">
                  <Expand className="size-4" />
                </div>
              </div>
            </div>
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent size="wide" chrome="plain">
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
