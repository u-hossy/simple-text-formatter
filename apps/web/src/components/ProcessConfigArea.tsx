import type { Process, ReplacementSchema } from "@simple-text-formatter/core";
import { Import, Plus, ReplaceAll, SquareArrowRightExit } from "lucide-react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ScrollHintBox } from "@/components/ui/scroll-hint";

import ProcessConfigCard from "./ProcessConfigCard";

interface Props {
  processes: Process[];
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>;
}

export default function ProcessConfigArea({ processes, setProcesses }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddProcess = (type: Process["type"]) => {
    let newProcess: Process;
    const base = { id: uuidv4(), enabled: true, label: "" };

    switch (type) {
      case "replace":
        newProcess = { ...base, type, from: "", to: "", useRegex: false };
        break;
      case "half-to-full":
      case "full-to-half":
        newProcess = {
          ...base,
          type,
          target: {
            alphabet: false,
            number: false,
            katakana: false,
            space: false,
            symbol: false,
          },
        };
        break;
    }

    setProcesses((prev) => [...prev, newProcess]);
  };

  const handleExport = () => {
    const exportedProcesses = processes.map((p) => {
      const copy = { ...p } as Partial<Process>;
      delete copy.id;
      return copy;
    });
    const data = {
      schemaVersion: 1,
      processes: exportedProcesses,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simple_text_formatter_process_config_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text) as ReplacementSchema;

        if (data.schemaVersion !== 1 || !Array.isArray(data.processes)) {
          alert("不正なファイルフォーマットです。");
          return;
        }

        const newProcesses = data.processes.map((p) => ({
          ...p,
          id: uuidv4(),
        })) as Process[];

        setProcesses(newProcesses);
      } catch (err) {
        console.error("Failed to parse JSON", err);
        alert("JSONファイルの読み込みに失敗しました。");
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsText(file);
  };

  const listContent =
    processes.length > 0 ? (
      <div className="my-4 flex flex-col gap-4">
        {processes.map((process, index) => (
          <ProcessConfigCard
            process={process}
            setProcesses={setProcesses}
            isTopProcess={index === 0}
            isBottomProcess={index === processes.length - 1}
            className="mx-4 w-[100%-2rem]"
            key={process.id}
          />
        ))}
        <div className="flex flex-row justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus />
                処理の追加
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleAddProcess("replace")}>
                テキスト置換
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddProcess("half-to-full")}
              >
                半角から全角に変換
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddProcess("full-to-half")}
              >
                全角から半角に変換
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={handleExport}>
            <SquareArrowRightExit />
            変換処理のエクスポート
          </Button>
        </div>
      </div>
    ) : (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ReplaceAll />
          </EmptyMedia>
          <EmptyTitle>変換処理を追加してください</EmptyTitle>
          <EmptyDescription>
            テキストを整形する処理ルールをここで指定できます
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus />
                処理の追加
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleAddProcess("replace")}>
                テキスト置換
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddProcess("half-to-full")}
              >
                半角から全角に変換
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddProcess("full-to-half")}
              >
                全角から半角に変換
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Import />
            変換処理のインポート
          </Button>
        </EmptyContent>
      </Empty>
    );

  return (
    <div className="flex h-full flex-col gap-2">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="application/json"
        onChange={handleImport}
      />
      <h2 className="font-semibold">処理設定</h2>
      <ScrollHintBox
        className="max-h-[55vh] min-h-[32vh] border-y"
        deps={[processes.length]}
      >
        {listContent}
      </ScrollHintBox>
    </div>
  );
}
