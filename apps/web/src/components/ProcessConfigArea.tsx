import type { Process } from "@simple-text-formatter/core";
import { Import, Plus, ReplaceAll, SquareArrowRightExit } from "lucide-react";
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ProcessConfigCard from "./ProcessConfigCard";

interface Props {
  processes: Process[];
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>;
}

export default function ProcessConfigArea({ processes, setProcesses }: Props) {
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

  return (
    <div className="flex flex-col h-full gap-2">
      <h2 className="font-semibold">処理設定</h2>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          defaultSize="90%"
          className="flex flex-col border-y mr-2"
        >
          {processes.length > 0 ? (
            <div className="flex flex-col gap-4 my-4">
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
                    <DropdownMenuItem
                      onClick={() => handleAddProcess("replace")}
                    >
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
                <Button variant="outline">
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
                    <DropdownMenuItem
                      onClick={() => handleAddProcess("replace")}
                    >
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
                <Button variant="outline">
                  <Import />
                  変換処理のインポート
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          {/* TODO: ここに使い方とか正規表現のヒントを書く */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
