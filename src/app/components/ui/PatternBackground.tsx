"use client";

import clsx from "clsx";

type PatternBackgroundProps = {
  className?: string;
  variant?: "grid" | "dots" | "diagonal";
  size?: number;
  opacity?: number;
};

export default function PatternBackground({
  className,
  variant = "grid",
  size = 24,
  opacity = 0.4,
}: PatternBackgroundProps) {
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        backgroundImage:
          variant === "dots"
            ? `radial-gradient(currentColor 1px, transparent 1px)`
            : `linear-gradient(
                to right,
                currentColor 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                currentColor 1px,
                transparent 1px
              )`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}
