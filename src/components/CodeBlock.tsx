import { useRef, useState } from "react";
import { highlightBash, highlightBib, highlightPython, highlightTokens } from "./highlight";
import { IconCheck, IconCopy } from "./Icons";

export function CopyButton({ text, small }: { text: string; small?: boolean }) {
  const [done, setDone] = useState(false);
  const t = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    if (t.current) window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setDone(false), 1600);
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy to clipboard"
      className={`group/copy inline-flex items-center gap-1.5 rounded border border-ink-600 bg-ink-800/70 font-mono transition-all duration-200 hover:border-ember-400/60 hover:bg-ink-700 active:scale-95 ${
        small ? "px-2 py-1 text-[11px]" : "px-2.5 py-1.5 text-xs"
      } ${done ? "border-mint-400/60 text-mint-400" : "text-ink-300 hover:text-ember-300"}`}
    >
      {done ? <IconCheck className="h-3.5 w-3.5" /> : <IconCopy className="h-3.5 w-3.5" />}
      <span>{done ? "copied" : "copy"}</span>
    </button>
  );
}

export default function CodeBlock({
  code,
  lang = "python",
  file,
  maxHeight = "max-h-[440px]",
}: {
  code: string;
  lang?: "python" | "bib" | "text" | "bash";
  file?: string;
  maxHeight?: string;
}) {
  const body =
    lang === "python"
      ? highlightPython(code)
      : lang === "bib"
        ? highlightBib(code)
        : lang === "bash"
          ? highlightBash(code)
          : highlightTokens(code, "chip");

  return (
    <div className="overflow-hidden rounded-lg border border-ink-700 bg-ink-900/90 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:border-ink-600">
      <div className="flex items-center justify-between border-b border-ink-700/80 bg-ink-850 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-ink-600" />
            <i className="h-2.5 w-2.5 rounded-full bg-ink-600" />
            <i className="h-2.5 w-2.5 rounded-full bg-ember-400/70" />
          </span>
          <span className="font-mono text-[11px] tracking-wide text-ink-400">
            {file ?? (lang === "python" ? "python" : lang === "bib" ? "citation.bib" : "output")}
          </span>
        </div>
        <CopyButton text={code} small />
      </div>
      <pre
        className={`code-scroll overflow-auto ${maxHeight} px-4 py-4 font-mono text-[12.5px] leading-[1.75] text-ink-200`}
      >
        <code>{body}</code>
      </pre>
    </div>
  );
}
