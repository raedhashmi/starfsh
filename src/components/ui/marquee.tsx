"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import FastMarquee from "react-fast-marquee";
import type { MarqueeProps as FastMarqueeProps } from "react-fast-marquee";

export type MarqueeProps = HTMLAttributes<HTMLDivElement>;

export function Marquee({ className, ...props }: MarqueeProps) {
  return <div className={cn("relative w-full overflow-hidden", className)} {...props} />
}

export type MarqueeContentProps = FastMarqueeProps;

export function MarqueeContent({ loop = 0, autoFill = true, pauseOnHover = true, ...props }: MarqueeContentProps) {
  return  <FastMarquee autoFill={autoFill} loop={loop} pauseOnHover={pauseOnHover} {...props} />
}

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: "left" | "right";
};

export function MarqueeFade({ className, side, ...props }: MarqueeFadeProps) {
  return (
    <div className={cn(
          "absolute top-0 bottom-0 z-10 h-full w-24 from-background to-transparent",
          side === "left" ? "left-0 bg-linear-to-r" : "right-0 bg-linear-to-l",
          className
        )}
      {...props}
    />
  );
}

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export function MarqueeItem({ className, ...props }: MarqueeItemProps) {
  return <div className={cn("mx-2 shrink-0 object-contain", className)} {...props} />

}