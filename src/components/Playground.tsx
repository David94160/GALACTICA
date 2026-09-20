import { useEffect, useRef, useState } from "react";
import { EXAMPLES } from "../data/examples";
import { highlightTokens } from "./highlight";
import { IconPlay, IconRotate } from "./Icons";

function useTypewriter(full: string, runKey: string | number) {
  const [out, setOut] = useState("");
  const [typing, setTyping] = useState(false);
  const [stats, setStats] = useState<{ tokens: number; ms: number } | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    setOut("");
    setStats(null);
    setTyping(true);
    let i = 0;
    const t0 = performance.now();
    const start = window.setTimeout(() => {
      timer.current = window.setInterval(() => {
        i += 3 + Math.floor(Math.random() * 4);
        if (i >= full.length) i = full.length;
        setOut(full.slice(0, i));
        if (i >= full.length && timer.current) {
          window.clearInterval(timer.current);
          timer.current = null;
          setTyping(false);
          setStats({
            tokens: Math.max(1, Math.round(full.split(/\s+/).length * 1.32)),
            ms: Math.round(performance.now() - t0),
          });
        }
      }, 16);
    }, 340);
    return () => {
      window.clearTimeout(start);
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [full, runKey]);

  return { out, typing, stats };
}

export default function Playground({ sel, onSel }: { sel: string; onSel: (id: string) => void }) {
  const [runKey, setRunKey] = useState(0);
  const ex = EXAMPLES.find((e) => e.id === sel) ?? EXAMPLES[0];
  const { out, typing, stats } = useTypewriter(ex.output, `${sel}:${runKey}`);
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [out]);

  return (
    <div
      id="playground"
      className="flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-ink-600/80 bg-ink-900/95 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(63,224,197,0.05)]"
    >
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-ink-700 bg-ink-850 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <i className="h-3 w-3 rounded-full bg-[#f2695c]" />
            <i className="h-3 w-3 rounded-full bg-ember-400/80" />
            <i className="h-3 w-3 rounded-full bg-mint-400/70" />
          </span>
          <span className="font-mono text-xs text-ink-300">
            galai <span className="text-ink-500">·</span> python 3.11
          </span>
        </div>
        <span className="rounded border border-mint-500/40 bg-mint-500/10 px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-mint-300">
          galactica-6.7b
        </span>
      </div>

      {/* example selector */}
      <div className="code-scroll flex gap-1.5 overflow-x-auto border-b border-ink-700/70 bg-ink-900 px-3 py-2.5 [scrollbar-width:none]">
        {EXAMPLES.map((e) => (
          <button
            key={e.id}
            onClick={() => onSel(e.id)}
            className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[11px] transition-all duration-200 active:scale-95 ${
              e.id === sel
                ? "border-ember-400/80 bg-ember-400/15 text-ember-300"
                : "border-ink-600 bg-ink-800/60 text-ink-300 hover:border-ink-500 hover:text-ink-100"
            }`}
          >
            {e.short}
          </button>
        ))}
      </div>

      {/* prompt */}
      <div className="border-b border-ink-700/70 px-4 py-3.5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-400">prompt</span>
          <span className="flex flex-wrap justify-end gap-1">
            {ex.flags.map((f) => (
              <span
                key={f}
                className="rounded border border-skyx-400/30 bg-skyx-400/10 px-1.5 py-0.5 font-mono text-[10px] text-skyx-400"
              >
                {f}
              </span>
            ))}
          </span>
        </div>
        <p className="whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-ink-200">
          <span className="text-mint-400">model.generate(</span>
          <span className="text-ink-300">"</span>
          {highlightTokens(ex.prompt, "inline")}
          <span className="text-ink-300">"</span>
          <span className="text-mint-400">)</span>
        </p>
      </div>

      {/* controls */}
      <div className="flex items-center gap-2.5 border-b border-ink-700/70 bg-ink-850/60 px-4 py-3">
        <button
          onClick={() => setRunKey((k) => k + 1)}
          className="group inline-flex items-center gap-2 rounded-md bg-ember-400 px-4 py-2 font-mono text-xs font-semibold tracking-wide text-ink-950 shadow-[0_6px_24px_-6px_rgba(255,180,84,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-300 hover:shadow-[0_10px_30px_-6px_rgba(255,180,84,0.6)] active:translate-y-0 active:scale-95"
        >
          <IconPlay className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
          {typing ? "decoding…" : "generate"}
        </button>
        <button
          onClick={() => onSel(EXAMPLES[(EXAMPLES.findIndex((e) => e.id === sel) + 1) % EXAMPLES.length].id)}
          className="inline-flex items-center gap-2 rounded-md border border-ink-600 px-3.5 py-2 font-mono text-xs text-ink-300 transition-all duration-200 hover:border-mint-500/50 hover:text-mint-300 active:scale-95"
        >
          <IconRotate className="h-3.5 w-3.5" />
          next recipe
        </button>
      </div>

      {/* completion */}
      <div className="scanline flex-1">
        <div className="flex items-center justify-between px-4 pt-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-400">completion</span>
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-400">
            <i
              className={`h-1.5 w-1.5 rounded-full ${
                typing ? "pulse-dot bg-ember-400" : stats ? "bg-mint-400" : "bg-ink-500"
              }`}
            />
            {typing ? "sampling · greedy" : stats ? "done · </s>" : "idle"}
          </span>
        </div>
        <div ref={outRef} className="code-scroll min-h-[240px] max-h-[340px] overflow-auto px-4 pb-4 pt-2">
          <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-[1.8] text-ink-100">
            {out === "" && !typing ? (
              <span className="text-ink-500">— press generate —</span>
            ) : (
              <>
                {highlightTokens(out, "inline")}
                {typing && <span className="cursor-blink ml-0.5 inline-block h-[15px] w-[8px] translate-y-[3px] bg-mint-400" />}
              </>
            )}
          </pre>
        </div>
      </div>

      {/* status bar */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-ink-700 bg-ink-850 px-4 py-2.5 font-mono text-[10.5px] text-ink-400">
        <span>
          mode <span className="text-ink-200">{ex.flags.includes("new_doc=False") ? "mid-doc" : ex.id === "documents" ? "new-doc" : "completion"}</span>
        </span>
        <span>
          tokens <span className="text-ember-300">{stats ? stats.tokens : typing ? "…" : 0}</span>
        </span>
        <span>
          latency <span className="text-mint-300">{stats ? `${(stats.ms / 1000).toFixed(2)}s` : typing ? "…" : "—"}</span>
        </span>
        <span className="ml-auto hidden text-ink-500 sm:inline">demo · canned completions from the paper</span>
      </div>
    </div>
  );
}
