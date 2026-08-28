import { useEffect, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import Reveal from "./components/Reveal";
import Playground from "./components/Playground";
import CodeBlock, { CopyButton } from "./components/CodeBlock";
import ModelScale from "./components/ModelScale";
import { highlightTokens } from "./components/highlight";
import { BIBTEX, DEPLOY_VARIANTS, DOWNLOADS, EXAMPLES, METRICS, QUICKSTART, WIDGET_PROMPTS } from "./data/examples";
import {
  IconAlert,
  IconArrowUpRight,
  IconAtom,
  IconBook,
  IconBrackets,
  IconBubble,
  IconCode,
  IconCompress,
  IconCpu,
  IconDownload,
  IconFace,
  IconFlask,
  IconGem,
  IconGpu,
  IconHelix,
  IconIBeam,
  IconMolecule,
  IconNodes,
  IconPage,
  IconPlay,
  IconRadical,
  IconSpark,
  IconTerminal,
} from "./components/Icons";

type IconT = ComponentType<{ className?: string }>;

const CAP_ICONS: Record<string, IconT> = {
  brackets: IconBrackets,
  radical: IconRadical,
  nodes: IconNodes,
  molecule: IconMolecule,
  helix: IconHelix,
  ibeam: IconIBeam,
  bubble: IconBubble,
  page: IconPage,
  compress: IconCompress,
  gem: IconGem,
  flask: IconFlask,
};

const NAV = [
  { id: "install", label: "Install" },
  { id: "models", label: "Models" },
  { id: "quickstart", label: "Quickstart" },
  { id: "deploy", label: "Deploy" },
  { id: "capabilities", label: "Capabilities" },
  { id: "card", label: "Model card" },
  { id: "citation", label: "Citation" },
];

const GLYPHS: { ch: string; top: string; left: string; size: number; color: string; dur: string }[] = [
  { ch: "∫", top: "9%", left: "3%", size: 120, color: "rgba(255,180,84,0.07)", dur: "24s" },
  { ch: "ψ", top: "22%", left: "88%", size: 96, color: "rgba(63,224,197,0.08)", dur: "30s" },
  { ch: "∇", top: "58%", left: "6%", size: 84, color: "rgba(127,180,255,0.07)", dur: "27s" },
  { ch: "Σ", top: "74%", left: "90%", size: 130, color: "rgba(255,180,84,0.05)", dur: "33s" },
  { ch: "λ", top: "38%", left: "47%", size: 72, color: "rgba(63,224,197,0.05)", dur: "22s" },
  { ch: "∂", top: "85%", left: "38%", size: 90, color: "rgba(185,167,255,0.07)", dur: "29s" },
  { ch: "ħ", top: "6%", left: "62%", size: 76, color: "rgba(127,180,255,0.06)", dur: "26s" },
  { ch: "π", top: "47%", left: "95%", size: 68, color: "rgba(185,167,255,0.06)", dur: "25s" },
  { ch: "Δ", top: "92%", left: "12%", size: 74, color: "rgba(63,224,197,0.06)", dur: "31s" },
];

const MARQUEE_TOKENS = [
  "[START_REF]",
  "[END_REF]",
  "<work>",
  "[START_AMINO]",
  "[END_AMINO]",
  "[START_I_SMILES]",
  "[END_I_SMILES]",
  "TLDR:",
  "new_doc=True",
  "\\[",
  "\\]",
  "</s>",
  "Question:",
  "Answer:",
];

function SectionHead({ no, title, sub }: { no: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="mb-10 flex items-end gap-5 sm:mb-14">
        <span className="font-mono text-sm text-ember-400 sm:text-base">{no}</span>
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink-100 sm:text-5xl">{title}</h2>
          {sub && <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300 sm:text-base">{sub}</p>}
        </div>
        <span className="mb-2 hidden h-px flex-1 bg-gradient-to-r from-ink-600 to-transparent sm:block" />
      </div>
    </Reveal>
  );
}

function OutputPanel({ text, token }: { text: string; token: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-700 bg-ink-950/80">
      <div className="flex items-center justify-between border-b border-ink-700/80 bg-ink-850/80 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          <i className="h-1.5 w-1.5 rounded-full bg-mint-400" />
          model output
        </span>
        <span className="font-mono text-[10.5px] text-ember-300">{token}</span>
      </div>
      <pre className="code-scroll max-h-[400px] overflow-auto whitespace-pre-wrap px-4 py-4 font-mono text-[12.5px] leading-[1.8] text-ink-200">
        {highlightTokens(text, "inline")}
      </pre>
    </div>
  );
}

function CardBlock({
  icon: Icon,
  tone,
  title,
  children,
}: {
  icon: IconT;
  tone: "mint" | "sky" | "ember" | "viol";
  title: string;
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    mint: "border-mint-400/30 bg-mint-400/10 text-mint-400",
    sky: "border-skyx-400/30 bg-skyx-400/10 text-skyx-400",
    ember: "border-ember-400/30 bg-ember-400/10 text-ember-400",
    viol: "border-viol-400/30 bg-viol-400/10 text-viol-400",
  };
  return (
    <article className="group rounded-xl border border-ink-700 bg-ink-900/70 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-500 hover:bg-ink-850/80 hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-transform duration-300 group-hover:scale-105 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-base font-semibold tracking-tight text-ink-100">{title}</h3>
      </div>
      <div className="mt-3.5 text-sm leading-relaxed text-ink-300">{children}</div>
    </article>
  );
}

export default function App() {
  const [sec, setSec] = useState("");
  const [qs, setQs] = useState(0);
  const [cap, setCap] = useState(EXAMPLES[0].id);
  const [pg, setPg] = useState("latex");
  const [deploy, setDeploy] = useState("gpu");

  const activeDeploy = DEPLOY_VARIANTS.find((v) => v.id === deploy) ?? DEPLOY_VARIANTS[1];

  useEffect(() => {
    const onScroll = () => {
      let cur = "";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < 160) cur = n.id;
      }
      setSec(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tryIt = (id: string) => {
    setPg(id);
    document.getElementById("playground")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const active = EXAMPLES.find((e) => e.id === cap) ?? EXAMPLES[0];
  const ActiveIcon = CAP_ICONS[active.icon];

  return (
    <div className="relative min-h-screen">
      {/* ambient drifting math glyphs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {GLYPHS.map((g) => (
          <span
            key={g.ch}
            className="glyph absolute select-none font-mono font-semibold"
            style={
              {
                top: g.top,
                left: g.left,
                fontSize: g.size,
                color: g.color,
                "--dur": g.dur,
              } as CSSProperties
            }
          >
            {g.ch}
          </span>
        ))}
      </div>

      {/* ---------- nav ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-700/60 bg-ink-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-2.5">
            <IconAtom className="h-7 w-7 text-mint-400 transition-transform duration-500 group-hover:rotate-90" />
            <span className="font-display text-xl font-bold tracking-tight text-ink-100">galai</span>
            <span className="hidden rounded border border-ink-600 px-1.5 py-px font-mono text-[10px] text-ink-400 sm:inline">
              pypi
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`nav-link font-mono text-[12.5px] transition-colors duration-200 ${
                  sec === n.id ? "is-active text-ember-300" : "text-ink-300 hover:text-ink-100"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="https://github.com/PapersWithCode/galai"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-ink-600 px-3 py-1.5 font-mono text-xs text-ink-200 transition-all duration-200 hover:border-mint-500/60 hover:text-mint-300 active:scale-95"
          >
            <IconCode className="h-4 w-4" />
            <span className="hidden sm:inline">paperswithcode/galai</span>
            <IconArrowUpRight className="h-3 w-3 text-ink-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint-300" />
          </a>
        </div>
      </header>

      <main id="top" className="relative z-10">
        {/* ---------- opening: doc token + playground ---------- */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
            <div>
              <Reveal>
                <p className="mb-5 flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.22em] text-ink-400">
                  <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint-400" />
                  papers with code · meta ai — open weights
                </p>
              </Reveal>
              <Reveal delay={60}>
                <p className="mb-2 font-mono text-sm text-mint-400">[START_DOC]</p>
                <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink-100 sm:text-7xl xl:text-8xl">
                  GALACTICA
                  <span className="cursor-blink text-mint-400">_</span>
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 font-display text-xl font-semibold text-ember-300 sm:text-2xl">
                  A large language model for science.
                </p>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-300">
                  Trained on a corpus of papers, reference material and knowledge bases — Galactica stores, combines
                  and reasons about scientific knowledge. It is <em className="text-ink-200 not-italic underline decoration-ember-400/60 decoration-2 underline-offset-4">not</em>{" "}
                  instruction-tuned: you steer it with special tokens, and{" "}
                  <span className="font-mono text-[13.5px] text-mint-300">galai</span> is the two-line Python interface
                  to all five checkpoints.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-7 max-w-xl overflow-hidden rounded-lg border border-ink-600 bg-ink-900/90">
                  <div className="flex items-center justify-between gap-3 border-b border-ink-700/80 px-4 py-2.5 transition-colors hover:bg-ink-850/60">
                    <p className="truncate font-mono text-[12.5px] text-ink-200">
                      <span className="text-mint-400">$</span> pip install galai
                    </p>
                    <CopyButton text="pip install galai" small />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-ink-850/60">
                    <p className="truncate font-mono text-[12.5px] text-ink-300">
                      <span className="text-mint-400">$</span> pip install git+https://github.com/paperswithcode/galai
                    </p>
                    <CopyButton text="pip install git+https://github.com/paperswithcode/galai" small />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#capabilities"
                    className="group inline-flex items-center gap-2 rounded-md bg-ember-400 px-4 py-2.5 font-mono text-xs font-semibold text-ink-950 shadow-[0_8px_28px_-8px_rgba(255,180,84,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-300 active:translate-y-0 active:scale-95"
                  >
                    browse the prompt recipes
                    <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </a>
                  <a
                    href="https://huggingface.co/facebook/galactica-6.7b"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-ink-600 px-4 py-2.5 font-mono text-xs text-ink-200 transition-all duration-200 hover:border-mint-500/60 hover:text-mint-300 active:scale-95"
                  >
                    <IconFace className="h-4 w-4" /> weights on the Hub
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160} className="lg:sticky lg:top-24">
              <Playground sel={pg} onSel={setPg} />
            </Reveal>
          </div>

          {/* metrics strip */}
          <Reveal delay={120}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700/60 sm:grid-cols-3 lg:grid-cols-5">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`group bg-ink-900/95 px-5 py-5 transition-colors duration-300 hover:bg-ink-850 ${
                    i === 0 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <p className="font-display text-3xl font-bold tracking-tight text-ember-300 transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-4xl">
                    {m.value}
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-300">{m.label}</p>
                  <p className="mt-1 font-mono text-[10.5px] text-mint-400/80">{m.vs}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-right font-mono text-[10.5px] text-ink-500">
              galactica-6.7b vs. larger closed models — from the paper's abstract
            </p>
          </Reveal>
        </section>

        {/* ---------- 01 install ---------- */}
        <section id="install" className="scroll-mt-24 border-t border-ink-800/80 bg-ink-900/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHead
              no="01"
              title="Install"
              sub="One package, five checkpoints. galai wraps the facebook/galactica-* Hub repos so loading any size is a single call."
            />
            <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
              <Reveal>
                <ul className="space-y-5">
                  {[
                    {
                      t: "From PyPI",
                      d: "pip install galai pulls the stable release — the fastest path to a working model.load_model().",
                    },
                    {
                      t: "From the repository",
                      d: "Install straight from GitHub for fixes that haven't shipped yet: pip install git+https://github.com/paperswithcode/galai.",
                    },
                    {
                      t: "Or skip it entirely",
                      d: "Every checkpoint is a standard OPTForCausalLM — transformers' pipeline API and AutoTokenizer work out of the box with pip install transformers accelerate.",
                    },
                  ].map((x, i) => (
                    <li key={x.t} className="group flex gap-4 rounded-lg border border-transparent p-3 transition-all duration-300 hover:border-ink-600 hover:bg-ink-850/70">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ember-400/40 bg-ember-400/10 font-mono text-xs text-ember-300 transition-colors duration-300 group-hover:bg-ember-400/20">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold text-ink-100">{x.t}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-300">{x.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-start gap-3 rounded-lg border border-mint-500/25 bg-mint-500/5 p-4">
                  <IconSpark className="mt-0.5 h-4.5 w-4.5 shrink-0 text-mint-300" />
                  <p className="text-sm leading-relaxed text-ink-300">
                    <span className="font-semibold text-mint-300">Heads-up:</span> Galactica is a base LM, not a chat
                    model. There is no system prompt to set — the prompt recipes in section 05 are the interface.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <CodeBlock
                  file="shell"
                  lang="text"
                  code={`$ pip install galai
# → stable release from PyPI

$ pip install git+https://github.com/paperswithcode/galai
# → latest from the repository

$ pip install transformers accelerate
# → or run the raw HF checkpoints directly`}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- 02 models ---------- */}
        <section id="models" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHead
              no="02"
              title="Five sizes of science"
              sub="From a 125M distillation probe to the 120B flagship — same tokenizer, same special tokens, same two-line API. Click a row for its model card and inference widget."
            />
            <Reveal>
              <ModelScale />
            </Reveal>

            {/* pull the weights */}
            <Reveal delay={120} className="mt-6">
              <div className="rounded-xl border border-ink-700 bg-ink-900/80 p-5 sm:p-8">
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink-100">
                    <IconDownload className="h-5 w-5 text-mint-400" />
                    Pull the weights
                  </h3>
                  <p className="font-mono text-[11px] text-ink-500">
                    three ways to get <span className="text-ink-300">facebook/galactica-6.7b</span> onto disk
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr_1fr]">
                  {DOWNLOADS.map((d, i) => (
                    <div
                      key={d.id}
                      className={`group flex flex-col gap-3 rounded-lg p-1 transition-colors duration-300 ${
                        i === 0 ? "border border-mint-500/25 bg-mint-500/[0.04] lg:-my-3 lg:py-4" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between px-2">
                        <span
                          className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                            i === 0 ? "text-mint-300" : "text-ember-300"
                          }`}
                        >
                          {d.label}
                        </span>
                        {i === 0 && (
                          <span className="rounded border border-mint-500/40 bg-mint-500/10 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-mint-300">
                            hub recommended
                          </span>
                        )}
                      </div>
                      <CodeBlock code={d.code} lang="bash" file={d.file} maxHeight="max-h-72" />
                      <p className="px-2 text-xs leading-relaxed text-ink-400">{d.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- 03 quickstart ---------- */}
        <section id="quickstart" className="scroll-mt-24 border-t border-ink-800/80 bg-ink-900/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHead
              no="03"
              title="Quickstart"
              sub="Three ways in: the galai wrapper, the one-liner pipeline, or the low-level OPT class when you want device maps and precision control."
            />
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              <Reveal>
                <div className="mb-4 flex flex-wrap gap-2">
                  {QUICKSTART.map((q, i) => (
                    <button
                      key={q.tab}
                      onClick={() => setQs(i)}
                      className={`rounded-md border px-3.5 py-2 font-mono text-xs transition-all duration-200 active:scale-95 ${
                        qs === i
                          ? "border-ember-400/80 bg-ember-400/15 text-ember-300"
                          : "border-ink-600 bg-ink-800/50 text-ink-300 hover:border-ink-500 hover:text-ink-100"
                      }`}
                    >
                      {q.tab}
                    </button>
                  ))}
                </div>
                <CodeBlock code={QUICKSTART[qs].code} file={QUICKSTART[qs].file} />
              </Reveal>
              <Reveal delay={140}>
                <aside className="flex flex-col gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">read more</p>
                  {[
                    { icon: IconBook, label: "Full introduction", meta: "paper · PDF & notebook", href: "https://arxiv.org/abs/2211.05100" },
                    { icon: IconFace, label: "Model cards", meta: "facebook/galactica-*", href: "https://huggingface.co/facebook/galactica-6.7b" },
                    { icon: IconTerminal, label: "transformers guide", meta: "CPU · GPU · precisions", href: "https://huggingface.co/docs/transformers" },
                    { icon: IconCode, label: "Source", meta: "paperswithcode/galai", href: "https://github.com/PapersWithCode/galai" },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-900/80 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-mint-500/50 hover:bg-ink-850 active:translate-y-0"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink-600 bg-ink-800 text-mint-300 transition-colors duration-200 group-hover:border-mint-500/50">
                        <l.icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-sm font-semibold text-ink-100">{l.label}</span>
                        <span className="block truncate font-mono text-[10.5px] text-ink-400">{l.meta}</span>
                      </span>
                      <IconArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint-300" />
                    </a>
                  ))}
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- 04 deploy ---------- */}
        <section id="deploy" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHead
              no="04"
              title="Run it anywhere"
              sub="Four runtime recipes lifted straight from the 6.7B model card — from a dependency-free CPU run to quantized inference in roughly 8 GB of VRAM."
            />
            <div className="grid gap-8 lg:grid-cols-[310px_1fr]">
              <Reveal className="lg:sticky lg:top-24 lg:self-start">
                <div className="space-y-2">
                  {DEPLOY_VARIANTS.map((v) => {
                    const on = deploy === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setDeploy(v.id)}
                        className={`group w-full rounded-lg border px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.99] ${
                          on
                            ? "border-ember-400/50 bg-ink-850 shadow-[0_12px_34px_-18px_rgba(255,180,84,0.45)]"
                            : "border-ink-700 bg-ink-900/60 hover:border-ink-500 hover:bg-ink-850/70"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span
                            className={`flex items-center gap-2 font-display text-sm font-semibold ${
                              on ? "text-ember-300" : "text-ink-100"
                            }`}
                          >
                            {v.id === "cpu" ? <IconCpu className="h-4 w-4" /> : <IconGpu className="h-4 w-4" />}
                            {v.label}
                          </span>
                          <span
                            className={`rounded border px-1.5 py-px font-mono text-[10px] ${
                              on
                                ? "border-ember-400/40 bg-ember-400/10 text-ember-300"
                                : "border-ink-600 text-ink-400"
                            }`}
                          >
                            {v.tag}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-xs leading-relaxed text-ink-400">{v.blurb}</span>
                      </button>
                    );
                  })}
                </div>
                <div
                  className={`mt-4 rounded-lg border px-4 py-3 font-mono text-xs transition-all duration-300 ${
                    activeDeploy.deps
                      ? "border-mint-500/25 bg-mint-500/5 text-mint-300"
                      : "border-ink-700 bg-ink-900/60 text-ink-500"
                  }`}
                >
                  <span className={activeDeploy.deps ? "text-mint-400" : "text-ink-600"}>$</span>{" "}
                  {activeDeploy.deps ?? "no extra packages needed"}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <CodeBlock
                  key={deploy}
                  code={activeDeploy.code}
                  file={`${activeDeploy.label.toLowerCase().replace(/\s+/g, "-")}.py`}
                />
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink-500">
                  <span className="text-mint-400">&gt;</span> all four paths end identically:{" "}
                  <span className="text-ink-300">model.generate(input_ids)</span> →{" "}
                  <span className="text-ink-300">tokenizer.decode(outputs[0])</span> — only the loading line changes.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- 05 capabilities ---------- */}
        <section id="capabilities" className="scroll-mt-24 border-t border-ink-800/80 bg-ink-900/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHead
              no="05"
              title="Capabilities"
              sub="Eleven prompt recipes from the official docs. Galactica doesn't follow instructions — it continues documents — so each capability is unlocked by a token shape."
            />
            <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
              {/* rail */}
              <Reveal>
                <div className="code-scroll flex gap-1.5 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:self-start lg:overflow-visible lg:pb-0">
                  {EXAMPLES.map((e) => {
                    const Icon = CAP_ICONS[e.icon];
                    const on = e.id === cap;
                    return (
                      <button
                        key={e.id}
                        onClick={() => setCap(e.id)}
                        className={`group flex shrink-0 items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-left transition-all duration-200 active:scale-[0.98] lg:w-full ${
                          on
                            ? "border-ember-400 bg-ink-850 text-ink-100"
                            : "border-ink-700 text-ink-300 hover:border-ink-500 hover:bg-ink-900/70 hover:text-ink-100"
                        }`}
                      >
                        <Icon className={`h-4.5 w-4.5 shrink-0 transition-colors duration-200 ${on ? "text-ember-300" : "text-ink-400 group-hover:text-mint-300"}`} />
                        <span className="whitespace-nowrap text-[13px] font-medium lg:whitespace-normal">{e.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              {/* detail */}
              <div key={cap}>
                <Reveal>
                  <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-ember-400/40 bg-ember-400/10 text-ember-300">
                      <ActiveIcon className="h-5.5 w-5.5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-ink-100">{active.label}</h3>
                      <p className="font-mono text-[11px] text-mint-400">{active.token}</p>
                    </div>
                    <button
                      onClick={() => tryIt(active.id)}
                      className="group ml-auto inline-flex items-center gap-2 rounded-md border border-mint-500/50 bg-mint-500/10 px-3.5 py-2 font-mono text-xs text-mint-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-mint-500/20 active:translate-y-0 active:scale-95"
                    >
                      <IconPlay className="h-3.5 w-3.5" />
                      run in playground
                    </button>
                  </div>
                  <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-ink-300">{active.blurb}</p>
                </Reveal>
                <div className="grid gap-5 xl:grid-cols-2">
                  <Reveal delay={80}>
                    <p className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-400">prompt · python</p>
                    <CodeBlock code={active.code} />
                  </Reveal>
                  <Reveal delay={160}>
                    <p className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-400">what comes back</p>
                    <OutputPanel text={active.output} token={active.token} />
                  </Reveal>
                </div>
                {active.note && (
                  <Reveal delay={220}>
                    <div className="mt-5 flex items-start gap-3 rounded-r-lg border-l-2 border-ember-400 bg-ember-400/5 px-4 py-3.5">
                      <IconSpark className="mt-0.5 h-4 w-4 shrink-0 text-ember-300" />
                      <p className="text-sm leading-relaxed text-ink-300">
                        <span className="mr-1.5 font-mono text-[10.5px] uppercase tracking-wider text-ember-300">field note</span>
                        {active.note}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 06 model card ---------- */}
        <section id="card" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHead
              no="06"
              title="The model card"
              sub="facebook/galactica-6.7b as Meta AI filed it on the Hub — what it is, what it learned, and where it still stumbles."
            />
            <div className="grid gap-8 lg:grid-cols-[330px_1fr]">
              {/* spec sheet */}
              <Reveal className="lg:sticky lg:top-24 lg:self-start">
                <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900/85 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center gap-3 border-b border-ink-700 bg-ink-850 px-5 py-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink-800 ring-1 ring-ink-600">
                      <IconFace className="h-6 w-6 text-ember-400" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-semibold text-ink-100">facebook/galactica-6.7b</p>
                      <p className="font-mono text-[11px] text-ink-400">Papers with Code · Meta AI</p>
                    </div>
                  </div>
                  <dl className="divide-y divide-ink-700/70 px-5">
                    {[
                      ["Size", "standard"],
                      ["Parameters", "6.7B"],
                      ["Released", "November 2022"],
                      ["Architecture", "decoder-only Transformer (OPT-based), with a few modifications"],
                      ["License", "CC BY-NC 4.0 · non-commercial"],
                      ["Trained on", "106B tokens of open-access science"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-start justify-between gap-4 py-3">
                        <dt className="shrink-0 pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
                          {k}
                        </dt>
                        <dd className="max-w-[195px] text-right text-xs font-medium leading-relaxed text-ink-200">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="grid grid-cols-3 divide-x divide-ink-700 border-t border-ink-700">
                    {[
                      ["Paper", "https://galactica.org/paper.pdf"],
                      ["Demo", "https://galactica.org"],
                      ["Hub card", "https://huggingface.co/facebook/galactica-6.7b"],
                    ].map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 px-2 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-400 transition-colors duration-200 hover:bg-ink-850 hover:text-ember-300"
                      >
                        {label}
                        <IconArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* card body */}
              <div className="space-y-5">
                <Reveal>
                  <CardBlock icon={IconBook} tone="mint" title="Intended use">
                    Built for researchers studying language models on the scientific domain, and for developers
                    building scientific tooling on top of them. The weights ship under a{" "}
                    <a
                      href="https://creativecommons.org/licenses/by-nc/4.0/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-mint-300 underline decoration-mint-500/50 underline-offset-2 transition-colors hover:text-mint-400"
                    >
                      non-commercial CC BY-NC 4.0 license
                    </a>{" "}
                    — and the card is blunt about production use: given how readily language models hallucinate,
                    deploy behind safeguards or not at all.
                  </CardBlock>
                </Reveal>
                <Reveal delay={60}>
                  <CardBlock icon={IconAtom} tone="sky" title="Training data">
                    <span className="font-semibold text-ink-100">106 billion tokens</span> of open-access scientific
                    text and data — papers, textbooks, scientific websites, encyclopedias, reference material,
                    knowledge bases and more. Each modality is tokenized into the vocabulary, which is what gives the
                    model a natural-language interface for LaTeX, molecules and proteins alike.
                  </CardBlock>
                </Reveal>
                <Reveal delay={120}>
                  <CardBlock icon={IconAlert} tone="ember" title="Performance & limitations">
                    GALACTICA outperforms existing language models on knowledge probes, reasoning and
                    knowledge-intensive scientific tasks — and even open-source general LMs on general NLP. The card
                    still lists the caveats:
                    <ul className="mt-3 space-y-2">
                      {[
                        "Hallucination-prone like any LM — a high-quality academic corpus doesn't prevent it, especially for less popular, less cited concepts.",
                        "No guarantees of truthful output, and that extends to citation prediction.",
                        "Citation behaviour approaches ground truth with scale, but a popularity bias persists even at the largest sizes.",
                        "Toxicity rates are substantially lower than comparable LLMs, yet bias remains on certain measures — generate with care.",
                      ].map((t) => (
                        <li key={t.slice(0, 24)} className="flex gap-2.5 text-[13px] leading-relaxed">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400/80" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBlock>
                </Reveal>
                <Reveal delay={180}>
                  <CardBlock icon={IconSpark} tone="viol" title="Broader implications">
                    A candidate interface for discovering academic literature — the paper demonstrates the model
                    acting as an alternative to standard search tools — with downstream room in mathematics, biology
                    and chemistry. The card's closing bet: a new generation of scientific tools gets built on large
                    language models like this one.
                  </CardBlock>
                </Reveal>
              </div>
            </div>

            {/* inference-widget prompts */}
            <Reveal delay={100} className="mt-10">
              <div className="rounded-xl border border-ink-700 bg-ink-900/70 p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-ink-100">Inference-widget prompts</h3>
                  <p className="font-mono text-[11px] text-ink-500">
                    lifted from the card's front matter — <span className="text-mint-400">run</span> loads one into
                    the playground above
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {WIDGET_PROMPTS.map((w) => (
                    <div
                      key={w.target}
                      className="group flex max-w-full items-center gap-2 rounded-lg border border-ink-600 bg-ink-850/90 py-1.5 pl-3 pr-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-mint-500/50"
                    >
                      <code className="max-w-[380px] truncate font-mono text-[11.5px] text-ink-200">
                        {highlightTokens(w.text, "inline")}
                      </code>
                      <button
                        onClick={() => tryIt(w.target)}
                        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-mint-500/40 bg-mint-500/10 px-2 py-1 font-mono text-[10px] text-mint-300 transition-all duration-200 hover:bg-mint-500/20 active:scale-95"
                      >
                        <IconPlay className="h-2.5 w-2.5" />
                        run
                      </button>
                      <CopyButton text={w.text} small />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- 07 citation ---------- */}
        <section id="citation" className="scroll-mt-24 border-t border-ink-800/80 bg-ink-900/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHead no="07" title="Citation" sub="If Galactica helps your research, cite the paper — BibTeX ready to copy." />
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              <Reveal>
                <article className="group h-full rounded-xl border border-ink-700 bg-ink-900/85 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember-400/40 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] sm:p-8">
                  <p className="font-mono text-xs text-ember-400">[1]</p>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-ink-100 sm:text-3xl">
                    GALACTICA: A Large Language Model for Science
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-300">
                    Ross Taylor, Marcin Kardas, Guillem Cucurull, Thomas Scialom, Anthony Hartshorn, Elvis Saravia,
                    Andrew Poulton, Viktor Kerkez &amp; Robert Stojnic
                  </p>
                  <p className="mt-2 font-mono text-xs text-ink-400">2022 · arXiv:2211.05100</p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <a
                      href="https://arxiv.org/abs/2211.05100"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-ember-400 px-3.5 py-2 font-mono text-xs font-semibold text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-300 active:translate-y-0 active:scale-95"
                    >
                      <IconBook className="h-4 w-4" /> read the paper
                    </a>
                    <a
                      href="https://huggingface.co/facebook/galactica-6.7b"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-ink-600 px-3.5 py-2 font-mono text-xs text-ink-200 transition-all duration-200 hover:border-mint-500/60 hover:text-mint-300 active:scale-95"
                    >
                      <IconFace className="h-4 w-4" /> all five model cards
                    </a>
                  </div>
                </article>
              </Reveal>
              <Reveal delay={120}>
                <CodeBlock code={BIBTEX} lang="bib" file="galactica.bib" maxHeight="max-h-[400px]" />
                <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink-500">
                  <span className="text-mint-400">&gt;</span> model.generate("Thanks for reading", new_doc=False) —
                  this page renders the official galai README and the 6.7B model card; every completion shown is
                  quoted from the docs, not sampled live.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- token marquee ---------- */}
        <div className="marquee overflow-hidden border-y border-ink-700/70 bg-ink-900/70 py-3.5" aria-hidden>
          <div className="marquee-track flex w-max items-center gap-8">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-8">
                {MARQUEE_TOKENS.map((t) => (
                  <span key={`${dup}-${t}`} className="flex items-center gap-8 font-mono text-xs text-ink-500">
                    <span className="transition-colors duration-300 hover:text-ember-300">{t}</span>
                    <i className="h-1 w-1 rounded-full bg-ink-600" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- footer ---------- */}
        <footer className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs text-mint-400">[END_DOC]</p>
                <p
                  className="mt-2 select-none font-display text-5xl font-bold tracking-tight text-transparent sm:text-7xl"
                  style={{ WebkitTextStroke: "1px rgba(95,115,150,0.45)" }}
                >
                  GALACTICA
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-ink-400">
                <a href="#install" className="nav-link transition-colors hover:text-ember-300">install</a>
                <a href="#models" className="nav-link transition-colors hover:text-ember-300">models</a>
                <a href="#deploy" className="nav-link transition-colors hover:text-ember-300">deploy</a>
                <a href="#capabilities" className="nav-link transition-colors hover:text-ember-300">capabilities</a>
                <a href="#card" className="nav-link transition-colors hover:text-ember-300">model card</a>
                <a href="https://github.com/PapersWithCode/galai" target="_blank" rel="noreferrer" className="nav-link transition-colors hover:text-ember-300">github</a>
                <a href="#top" className="nav-link transition-colors hover:text-ember-300">back to top ↑</a>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-2 border-t border-ink-800 pt-6 font-mono text-[10.5px] text-ink-500 sm:flex-row sm:justify-between">
              <p>docs rendered from the galai README + 6.7B model card · completions quoted, never sampled live</p>
              <p>
                load: <span className="text-mint-400">gal.load_model("mini"… "huge")</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
