import { useState } from "react";
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
  const [convertedText, _setConvertedText] = useState<string>("");

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
            <ProcessConfigArea />
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
