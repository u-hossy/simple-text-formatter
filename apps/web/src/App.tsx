import type { Process } from "@simple-text-formatter/core";
import { formatText } from "@simple-text-formatter/core";
import { useMemo, useState } from "react";
import InputArea from "@/components/InputArea";
import OutputArea from "@/components/OutputArea";
import ProcessConfigArea from "@/components/ProcessConfigArea";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: "8a4219ad-90d7-41ef-9b6a-ffb030efec1d",
      enabled: true,
      type: "replace",
      from: "せん",
      to: "すん",
      useRegex: false,
    },
    {
      id: "8a4219ad-90d7-41ef-9b6a-ffb030efec1c",
      label: "半角カタカナを全角カタカナにします。",
      enabled: true,
      type: "half-to-full",
      target: {
        alphabet: false,
        number: false,
        katakana: true,
        space: false,
        symbol: false,
      },
    },
  ]);
  const convertedText = useMemo(() => {
    const config = {
      schemaVersion: 1 as const,
      processes: processes,
    };
    return formatText(inputText, config);
  }, [inputText, processes]);

  return (
    <div className="flex flex-col h-screen min-h-96">
      <header className="h-14 shrink-0 px-6 border-b border-border">aaa</header>
      <main className="flex-1 min-h-0">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel minSize={20} className="px-6 py-1 my-2">
            <InputArea inputText={inputText} setInputText={setInputText} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} className="px-6 py-1 my-2">
            <ProcessConfigArea
              processes={processes}
              setProcesses={setProcesses}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} className="px-6 py-1 my-2">
            <OutputArea convertedText={convertedText} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}

export default App;
