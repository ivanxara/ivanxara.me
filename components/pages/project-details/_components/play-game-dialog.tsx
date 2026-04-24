"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Expand } from "lucide-react";
import { useState } from "react";
import { AnimationReveal } from "@/components/animations";
import { Heading } from "@/components/typography";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PlayGameDialog({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-5xl">
      <AnimationReveal>
        <Heading as="h3" variant="heading-2">
          Play the game
        </Heading>
        <p className="mt-3 max-w-2xl text-sm leading-loose text-muted-foreground">
          Sudden difficulty spike? Press{" "}
          <KbdGroup>
            <Kbd >
              O
            </Kbd>
            <span>+</span>
            <Kbd >
              I
            </Kbd>
          </KbdGroup>{" "}
          to activate cheat codes and keep exploring.
        </p>
      </AnimationReveal>

      <AnimationReveal
        amount={0.2}
        className="group relative mt-8 overflow-hidden rounded-4xl shadow-2xl sm:rounded-4xl"
      >
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div className="absolute right-5 top-5 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100">
            <Button
              type="button"
              variant="floating-overlay"
              size="icon-xl"
              aria-label={`Open ${title} playable build fullscreen`}
              onClick={() => setIsOpen(true)}
            >
              <Expand className="size-4" />
            </Button>
          </div>
          <DialogContent size="wide" chrome="plain">
            <VisuallyHidden.Root>
              <DialogTitle>Play the game</DialogTitle>
            </VisuallyHidden.Root>
            <DialogClose />
            <div className="overflow-hidden rounded-4xl shadow-2xl">
              <div className="overflow-hidden rounded-4xl bg-black">
                <div className="aspect-[16/9] w-full">
                  {isOpen ? (
                    <iframe
                      src="/my-game/index.html"
                      title={`${title} playable build fullscreen`}
                      className="h-full w-full border-0"
                      allow="fullscreen"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="overflow-hidden rounded-4xl bg-black">
          <div className="aspect-[16/9] w-full">
            {!isOpen ? (
              <iframe
                src="/my-game/index.html"
                title={`${title} playable build`}
                className="h-full w-full border-0"
                allow="fullscreen"
              />
            ) : null}
          </div>
        </div>
      </AnimationReveal>
    </div>
  );
}
