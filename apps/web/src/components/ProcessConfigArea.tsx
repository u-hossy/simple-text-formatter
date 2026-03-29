import type { Process } from "@simple-text-formatter/core";
import { Import, Plus, ReplaceAll, SquareArrowRightExit } from "lucide-react";
import { Button } from "@/components/ui/button";
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
                <Button>
                  <Plus />
                  処理の追加
                </Button>
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
                <Button>
                  <Plus />
                  処理の追加
                </Button>
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
