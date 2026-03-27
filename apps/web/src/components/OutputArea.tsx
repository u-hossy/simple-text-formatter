import { Textarea } from "./ui/textarea";

interface Props {
  convertedText: string;
}

export default function OutputArea({ convertedText }: Props) {
  return (
    <div className="flex flex-col h-full gap-2">
      <h2 className="font-semibold">結果確認</h2>
      <Textarea
        className="flex-1 resize-none"
        readOnly
        value={convertedText}
        placeholder="ここに変換結果が表示されます"
      />
    </div>
  );
}
