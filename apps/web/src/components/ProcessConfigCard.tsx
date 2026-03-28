import type {
  ConvertTarget,
  FullToHalfProcess,
  HalfToFullProcess,
  Process,
  ReplaceProcess,
} from "@simple-text-formatter/core";
import {
  ChevronDownIcon,
  MoveDownIcon,
  MoveUpIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  process: Process;
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>;
  isTopProcess: boolean;
  isBottomProcess: boolean;
}

interface ControlPanelProps<T extends Process> {
  process: T;
  onChange: (updates: Partial<T>) => void;
}

const replacePresets = [
  { label: "改行を削除", updates: { from: "\n", to: "", useRegex: false } },
  {
    label: "連続する空白を1つにする",
    updates: { from: " +", to: " ", useRegex: true },
  },
  {
    label: "タブをスペース2つに",
    updates: { from: "\t", to: "  ", useRegex: false },
  },
];

function ReplaceControlPanel({
  process,
  onChange,
}: ControlPanelProps<ReplaceProcess>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              プリセットをロード
              <ChevronDownIcon className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {replacePresets.map((preset) => (
              <DropdownMenuItem
                key={preset.label}
                // biome-ignore lint/suspicious/noExplicitAny: type erasure for onChange
                onClick={() => onChange(preset.updates as any)}
              >
                {preset.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`from-${process.id}`}>置換前</Label>
          <Input
            id={`from-${process.id}`}
            value={process.from}
            onChange={(e) => onChange({ from: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`to-${process.id}`}>置換後</Label>
          <Input
            id={`to-${process.id}`}
            value={process.to}
            onChange={(e) => onChange({ to: e.target.value })}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          id={`regex-${process.id}`}
          checked={process.useRegex}
          onCheckedChange={(checked) =>
            onChange({ useRegex: checked === true })
          }
        />
        <Label htmlFor={`regex-${process.id}`}>正規表現を使用する</Label>
      </div>
    </div>
  );
}

const convertTargetLabels: Record<keyof ConvertTarget, string> = {
  alphabet: "英字",
  number: "数字",
  katakana: "カタカナ",
  space: "スペース",
  symbol: "記号",
};

const fullToHalfPresets = [
  {
    label: "全角スペースを半角にする",
    updates: {
      target: {
        alphabet: false,
        number: false,
        katakana: false,
        space: true,
        symbol: false,
      },
    },
  },
  {
    label: "英数字と記号を半角にする",
    updates: {
      target: {
        alphabet: true,
        number: true,
        katakana: false,
        space: false,
        symbol: true,
      },
    },
  },
  {
    label: "すべて半角にする",
    updates: {
      target: {
        alphabet: true,
        number: true,
        katakana: true,
        space: true,
        symbol: true,
      },
    },
  },
];

function FullToHalfControlPanel({
  process,
  onChange,
}: ControlPanelProps<FullToHalfProcess>) {
  return (
    <ConvertControlPanelBase
      process={process}
      onChange={onChange}
      presets={fullToHalfPresets}
    />
  );
}

const halfToFullPresets = [
  {
    label: "半角カタカナを全角にする",
    updates: {
      target: {
        alphabet: false,
        number: false,
        katakana: true,
        space: false,
        symbol: false,
      },
    },
  },
  {
    label: "英数字を全角にする",
    updates: {
      target: {
        alphabet: true,
        number: true,
        katakana: false,
        space: false,
        symbol: false,
      },
    },
  },
  {
    label: "すべて全角にする",
    updates: {
      target: {
        alphabet: true,
        number: true,
        katakana: true,
        space: true,
        symbol: true,
      },
    },
  },
];

function HalfToFullControlPanel({
  process,
  onChange,
}: ControlPanelProps<HalfToFullProcess>) {
  return (
    <ConvertControlPanelBase
      process={process}
      onChange={onChange}
      presets={halfToFullPresets}
    />
  );
}

function ConvertControlPanelBase<
  T extends FullToHalfProcess | HalfToFullProcess,
>({
  process,
  onChange,
  presets,
}: {
  process: T;
  onChange: (updates: Partial<T>) => void;
  // biome-ignore lint/suspicious/noExplicitAny: generic updates
  presets: { label: string; updates: any }[];
}) {
  const toggleTarget = (key: keyof ConvertTarget, checked: boolean) => {
    onChange({
      target: {
        ...process.target,
        [key]: checked,
      },
    } as unknown as Partial<T>);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              プリセットをロード
              <ChevronDownIcon className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {presets.map((preset) => (
              <DropdownMenuItem
                key={preset.label}
                onClick={() => onChange(preset.updates)}
              >
                {preset.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-wrap gap-4">
        {(
          Object.entries(convertTargetLabels) as [keyof ConvertTarget, string][]
        ).map(([key, label]) => (
          <div className="flex items-center space-x-2" key={key}>
            <Checkbox
              id={`${key}-${process.id}`}
              checked={process.target[key]}
              onCheckedChange={(checked) => toggleTarget(key, checked === true)}
            />
            <Label htmlFor={`${key}-${process.id}`}>{label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

const processConfigTitles: Record<Process["type"], string> = {
  replace: "置換",
  "full-to-half": "全角 → 半角",
  "half-to-full": "半角 → 全角",
};

export default function ProcessConfigCard({
  process,
  setProcesses,
  isTopProcess,
  isBottomProcess,
}: Props) {
  const title = processConfigTitles[process.type];

  if (!title) {
    return null;
  }

  const updateProcess = (updates: Partial<Process>) => {
    setProcesses((prev) =>
      prev.map((p) =>
        p.id === process.id ? ({ ...p, ...updates } as Process) : p,
      ),
    );
  };

  const moveUp = () => {
    setProcesses((prev) => {
      const idx = prev.findIndex((p) => p.id === process.id);
      if (idx <= 0) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = () => {
    setProcesses((prev) => {
      const idx = prev.findIndex((p) => p.id === process.id);
      if (idx === -1 || idx === prev.length - 1) return prev;
      const next = [...prev];
      [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
      return next;
    });
  };

  const deleteProcess = () => {
    setProcesses((prev) => prev.filter((p) => p.id !== process.id));
  };

  let ComponentNode: React.ReactNode;
  switch (process.type) {
    case "replace":
      ComponentNode = (
        <ReplaceControlPanel
          process={process as ReplaceProcess}
          // biome-ignore lint/suspicious/noExplicitAny: type erasure for onChange
          onChange={updateProcess as any}
        />
      );
      break;
    case "full-to-half":
      ComponentNode = (
        <FullToHalfControlPanel
          process={process as FullToHalfProcess}
          // biome-ignore lint/suspicious/noExplicitAny: type erasure for onChange
          onChange={updateProcess as any}
        />
      );
      break;
    case "half-to-full":
      ComponentNode = (
        <HalfToFullControlPanel
          process={process as HalfToFullProcess}
          // biome-ignore lint/suspicious/noExplicitAny: type erasure for onChange
          onChange={updateProcess as any}
        />
      );
      break;
  }

  return (
    <Card className="min-h-fit min-w-80 max-w-3xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{process.label}</CardDescription>
      </CardHeader>
      <CardContent>{ComponentNode}</CardContent>
      <CardFooter className="flex flex-row items-center justify-end gap-2">
        <ButtonGroup>
          <Button variant="outline" onClick={moveUp} disabled={isTopProcess}>
            <MoveUpIcon />
            1つ上に
          </Button>
          <Button
            variant="outline"
            onClick={moveDown}
            disabled={isBottomProcess}
          >
            <MoveDownIcon />
            1つ下に
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="destructive" onClick={deleteProcess}>
            <Trash2Icon />
            この処理を削除
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
