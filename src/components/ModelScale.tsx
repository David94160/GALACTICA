import { useEffect, useRef, useState } from "react";
import { MODELS } from "../data/examples";
import { IconArrowUpRight } from "./Icons";

// log-scale positions: domain 125M → 120B
const LO = Math.log10(0.125);
const HI = Math.log10(120);
const pct = (b: number) => ((Math.log10(b) - LO) / (HI - LO)) * 100;

// shared grid template — the axis and every row must use the exact same one
const COLS = "grid-cols-[78px_minmax(0,1fr)_92px] sm:grid-cols-[104px_minmax(0,1fr)_112px]";
const GUTTER = "gap-x-3 px-2 sm:gap-x-4 sm:px-3";

const TICKS = [
  { label: "125M", at: 0 },
  { label: "1B", at: pct(1) },
  { label: "10B", at: pct(10) },
  { label: "120B", at: 100 },
];

export default function ModelScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-xl border border-ink-700 bg-ink-900/80 p-5 sm:p-8">
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
          parameter count <span className="text-mint-400">· log scale</span>
        </p>
        <p className="font-mono text-[11px] text-ink-500">all weights on the Hugging Face Hub</p>
      </div>

      {/* axis — same column grid as the rows below, ticks live in the track column */}
      <div className={`mb-2 grid ${COLS} ${GUTTER}`}>
        <span />
        <div className="relative h-5">
          {TICKS.map((t) => (
            <span
              key={t.label}
              className="absolute -translate-x-1/2 font-mono text-[10px] text-ink-500"
              style={{ left: `${t.at}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>
        <span />
      </div>

      <div className="space-y-1.5">
        {MODELS.map((m, i) => {
          const w = Math.max(pct(m.billions), 2.2);
          const isStd = m.name === "standard";
          return (
            <a
              key={m.name}
              href={`https://huggingface.co/${m.repo}`}
              target="_blank"
              rel="noreferrer"
              className={`group grid ${COLS} ${GUTTER} items-center rounded-lg border border-transparent py-2.5 transition-all duration-200 hover:border-ink-600 hover:bg-ink-850/80`}
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              <span
                className={`font-display text-sm font-semibold sm:text-base ${
                  isStd ? "text-ember-300" : "text-ink-100"
                }`}
              >
                {m.name}
              </span>

              <span className="relative h-7 overflow-hidden rounded-[4px] bg-ink-800/90">
                {/* decade gridlines, aligned with the axis above */}
                {TICKS.map((t) => (
                  <i
                    key={t.label}
                    className="absolute top-0 h-full w-px bg-ink-700/70"
                    style={{ left: `${t.at}%` }}
                  />
                ))}
                <span
                  className={`bar-fill absolute left-0 top-0 h-full rounded-[4px] ${
                    isStd
                      ? "bg-gradient-to-r from-ember-500/80 to-ember-400 shadow-[0_0_22px_-4px_rgba(255,180,84,0.55)]"
                      : "bg-gradient-to-r from-ink-600 to-mint-500/80 group-hover:to-mint-400"
                  }`}
                  style={{ width: on ? `${w}%` : "0%" }}
                >
                  <i className="absolute right-0 top-0 h-full w-[3px] bg-ink-100/70" />
                  {isStd && (
                    <span className="absolute inset-y-0 right-1.5 hidden items-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-950 min-[420px]:flex">
                      docs use this
                    </span>
                  )}
                </span>
              </span>

              <span className="flex items-center justify-end gap-2.5">
                <span className="whitespace-nowrap font-mono text-sm text-ink-200">{m.params}</span>
                <IconArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint-300" />
              </span>
            </a>
          );
        })}
      </div>

      <p className="mt-6 border-t border-ink-700/70 pt-4 font-mono text-[11px] leading-relaxed text-ink-500">
        <span className="text-mint-400">$</span> pip install git+https://github.com/paperswithcode/galai
        <span className="text-ink-400"> — every size loads through the same two-line API.</span>
      </p>
    </div>
  );
}
