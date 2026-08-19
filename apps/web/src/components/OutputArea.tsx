import { useId, useRef } from "react";
import { ScrollEdgeFade } from "@/components/ui/scroll-hint";
import { useScrollOverflow } from "@/hooks/use-scroll-overflow";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

interface Props {
  convertedText: string;
  className?: string;
}

export default function OutputArea({ convertedText, className }: Props) {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { canScrollUp, canScrollDown } = useScrollOverflow(textareaRef, [
    convertedText,
  ]);

  return (
    <div className={cn("flex flex-col h-full gap-2", className)}>
      <h2 className="font-semibold">
        <label htmlFor={id}>結果確認</label>
      </h2>
      <div className="relative flex min-h-0 flex-1 flex-col">
        <Textarea
          id={id}
          name="outputText"
          ref={textareaRef}
          className="field-sizing-fixed min-h-0 flex-1 resize-none overflow-y-auto"
          readOnly
          value={convertedText}
          placeholder="ここに変換結果が表示されます"
        />
        <ScrollEdgeFade
          canScrollUp={canScrollUp}
          canScrollDown={canScrollDown}
        />
      </div>
    </div>
  );
}
