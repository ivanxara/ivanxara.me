"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image, { type StaticImageData } from "next/image";
import { Expand } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimationReveal } from "@/components/animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectGalleryProps = {
  title: string;
  images: StaticImageData[];
  isMobileGallery?: boolean;
};

export function ProjectGallery({
  title,
  images,
  isMobileGallery,
}: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!isOpen || !api) {
      return;
    }

    api.scrollTo(selectedIndex, true);
  }, [api, isOpen, selectedIndex]);

  return (
    <>
      <div
        className={
          isMobileGallery
            ? "grid justify-center gap-5 sm:grid-cols-2 xl:grid-cols-3"
            : "grid gap-5 md:grid-cols-2"
        }
      >
        {images.map((image, index) => (
          <AnimationReveal
            key={image.src}
            amount={0.22}
            delay={index * 0.08}
            className={isMobileGallery ? "mx-auto w-full max-w-[22rem]" : ""}
          >
            <Button
              type="button"
              variant="unstyled"
              size="image-trigger"
              aria-label={`Open ${title} gallery image ${index + 1}`}
              onClick={() => {
                setSelectedIndex(index);
                setIsOpen(true);
              }}
              className={cn(
                "group relative block overflow-hidden text-left",
                isMobileGallery
                  ? "mx-auto aspect-[9/19.5] max-w-[22rem] rounded-4xl bg-background p-2 shadow-2xl"
                  : "rounded-2xl",
              )}
            >
              <Image
                src={image}
                alt={`${title} gallery image ${index + 1}`}
                unoptimized
                className={
                  isMobileGallery
                    ? "h-full w-full rounded-4xl object-cover"
                    : "h-auto w-full rounded-2xl"
                }
              />
              <span className="absolute right-5 top-5 z-10 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/50 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-4" />
              </span>
            </Button>
          </AnimationReveal>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent size="wide" chrome="plain">
          <VisuallyHidden.Root>
            <DialogTitle>{title} gallery</DialogTitle>
          </VisuallyHidden.Root>
          <DialogClose />
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: images.length > 1 }}
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent className="-ml-0">
              {images.map((image, index) => (
                <CarouselItem key={image.src} className="pl-0">
                  <div className="flex min-h-[70vh] items-center justify-center">
                    <Image
                      src={image}
                      alt={`${title} gallery image ${index + 1}`}
                      unoptimized
                      className={cn(
                        "h-auto max-h-[85vh] w-full object-contain shadow-2xl",
                        isMobileGallery
                          ? "max-w-sm rounded-4xl"
                          : "rounded-4xl",
                      )}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 ? (
              <>
                <CarouselPrevious className="left-2 border-border bg-background/70 text-foreground backdrop-blur-sm transition-none hover:bg-background active:!-translate-y-1/2 md:-left-12" />
                <CarouselNext className="right-2 border-border bg-background/70 text-foreground backdrop-blur-sm transition-none hover:bg-background active:!-translate-y-1/2 md:-right-12" />
              </>
            ) : null}
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
