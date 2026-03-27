import { Textarea } from "./ui/textarea";

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputArea({ inputText, setInputText }: Props) {
  return (
    <div className="flex flex-col h-full gap-2">
      <h2 className="font-semibold">テキスト入力</h2>
      <Textarea
        className="flex-1 resize-none"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        placeholder="変換したいテキストをここに入力してください"
      />
    </div>
  );
}
