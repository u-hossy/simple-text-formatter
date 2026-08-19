import { ChevronDown, ChevronUp } from "lucide-react";
import type * as React from "react";
import type { DependencyList } from "react";
import { useRef } from "react";

import { useScrollOverflow } from "@/hooks/use-scroll-overflow";
import { cn } from "@/lib/utils";

interface ScrollEdgeFadeProps {
  canScrollUp: boolean;
  canScrollDown: boolean;
}

function ScrollEdgeFade({ canScrollUp, canScrollDown }: ScrollEdgeFadeProps) {
  return (
    <>
      <div
        aria-hidden
        data-slot="scroll-hint-top"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 flex h-6 items-start justify-center bg-gradient-to-b from-background to-transparent transition-opacity duration-150",
          canScrollUp ? "opacity-100" : "opacity-0",
        )}
      >
        <ChevronUp className="mt-0.5 size-4 text-muted-foreground" />
      </div>
      <div
        aria-hidden
        data-slot="scroll-hint-bottom"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 flex h-6 items-end justify-center bg-gradient-to-t from-background to-transparent transition-opacity duration-150",
          canScrollDown ? "opacity-100" : "opacity-0",
        )}
      >
        <ChevronDown className="mb-0.5 size-4 text-muted-foreground" />
      </div>
    </>
  );
}

interface ScrollHintBoxProps extends React.ComponentProps<"div"> {
  deps?: DependencyList;
}

function ScrollHintBox({
  className,
  children,
  deps = [],
  ...props
}: ScrollHintBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { canScrollUp, canScrollDown } = useScrollOverflow(ref, deps);

  return (
    <div className="relative min-h-0">
      <div
        ref={ref}
        data-slot="scroll-hint-box"
        className={cn("touch-auto! h-full overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
      <ScrollEdgeFade canScrollUp={canScrollUp} canScrollDown={canScrollDown} />
    </div>
  );
}

export { ScrollEdgeFade, ScrollHintBox };
