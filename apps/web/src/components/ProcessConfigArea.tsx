import type { Process } from "@simple-text-formatter/core";
import { ReplaceAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import ProcessConfigCard from "./ProcessConfigCard";

interface Props {
  processes: Process[];
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>;
}

export default function ProcessConfigArea({ processes, setProcesses }: Props) {
  return (
    <div className="flex flex-col h-full gap-2">
      <h2 className="font-semibold">処理設定</h2>
      {processes.length > 0 ? (
        processes.map((process, index) => (
          <ProcessConfigCard
            process={process}
            setProcesses={setProcesses}
            isTopProcess={index === 0}
            isBottomProcess={index === processes.length - 1}
            key={process.id}
          />
        ))
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
            <Button>処理の追加</Button>
            <Button variant="outline">変換処理のインポート</Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
