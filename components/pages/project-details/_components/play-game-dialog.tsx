"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { useState } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations/motion";

export function PlayGameDialog({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-5xl">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-[clamp(1.6rem,3vw,2.8rem)] font-black leading-[0.98] tracking-[-0.06em] text-foreground">
          Play the game
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-[1.9] text-muted-foreground">
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
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="group relative mt-8 overflow-hidden rounded-[1.85rem] shadow-[0_40px_120px_rgba(0,0,0,0.22)] sm:rounded-[2.25rem]"
      >
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div className="absolute right-5 top-5 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100">
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="floating-overlay"
                size="icon-xl"
                aria-label={`Open ${title} playable build fullscreen`}
              >
                <Expand className="size-4" />
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent size="wide" chrome="plain">
            <VisuallyHidden.Root>
              <DialogTitle>Play the game</DialogTitle>
            </VisuallyHidden.Root>
            <DialogClose />
            <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_120px_rgba(0,0,0,0.32)]">
              <div className="overflow-hidden rounded-[1.6rem] bg-black">
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
        <div className="overflow-hidden rounded-[1.85rem] bg-black">
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
      </motion.div>
    </div>
  );
}
