import type { Process } from "@simple-text-formatter/core";
import { formatText } from "@simple-text-formatter/core";
import { ExternalLink, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import HowToUse from "@/components/howToUse";
import InputArea from "@/components/InputArea";
import { ModeToggle } from "@/components/mode-toggle";
import OutputArea from "@/components/OutputArea";
import ProcessConfigArea from "@/components/ProcessConfigArea";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [processes, setProcesses] = useState<Process[]>([]);
  const convertedText = useMemo(() => {
    const config = {
      schemaVersion: 1 as const,
      processes: processes,
    };
    return formatText(inputText, config);
  }, [inputText, processes]);

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="flex flex-col h-svh min-h-fit min-w-sm">
        <header className="flex flex-row items-center justify-between h-14 shrink-0 px-2 md:px-6 border-b border-border">
          <div className="flex flex-row items-center">
            <span className="font-bold inline-block">テキスト整形くん</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Button variant="link">
              <a
                href="https://github.com/yufo211/simple-text-formatter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-1"
              >
                <span className="text-sm">GitHub</span>
                <ExternalLink />
              </a>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Lightbulb />
                  <span className="text-sm">使い方</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-semibold">
                    テキスト整形くんの使い方
                  </DialogTitle>
                  <DialogDescription>
                    このツールはテキストの整形とその処理ルールの出力・読み込みができます
                  </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                  <HowToUse />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">この画面を閉じる</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <ModeToggle />
          </div>
        </header>
        <main className="flex-1 min-h-0">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel minSize={20} className="px-2 md:px-6 py-1 my-2">
              <InputArea inputText={inputText} setInputText={setInputText} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={20} className="px-2 md:px-6 py-1 my-2">
              <ProcessConfigArea
                processes={processes}
                setProcesses={setProcesses}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={20} className="px-2 md:px-6 py-1 my-2">
              <OutputArea convertedText={convertedText} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
