"use client";

import { AnimatedBorder } from "./animated-border";

export function FillerBox() {
  return (
    <div className="flex-grow min-h-0 overflow-hidden">
      <AnimatedBorder className="p-0 h-full" borderClassName="border-theme-tertiary">
        <div className="h-full w-full filler-bg"></div>
      </AnimatedBorder>
    </div>
  );
}
