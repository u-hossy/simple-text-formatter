import { useId, useRef } from "react";
import { ScrollEdgeFade } from "@/components/ui/scroll-hint";
import { useScrollOverflow } from "@/hooks/use-scroll-overflow";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export default function InputArea({
  inputText,
  setInputText,
  className,
}: Props) {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { canScrollUp, canScrollDown } = useScrollOverflow(textareaRef, [
    inputText,
  ]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h2 className="font-semibold">
        <label htmlFor={id}>テキスト入力</label>
      </h2>
      <div className="relative">
        <Textarea
          id={id}
          name="inputText"
          ref={textareaRef}
          className="field-sizing-fixed h-40 resize-y"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          placeholder="変換したいテキストをここに入力してください"
        />
        <ScrollEdgeFade
          canScrollUp={canScrollUp}
          canScrollDown={canScrollDown}
        />
      </div>
    </div>
  );
}
