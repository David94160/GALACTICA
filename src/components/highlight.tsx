import type { ReactNode } from "react";

/** Highlight GALACTICA special tokens inside *model output / prompt* text. */
export function highlightTokens(text: string, variant: "chip" | "inline" = "inline"): ReactNode[] {
  const re = /(\[START_[A-Z_]+\]|\[END_[A-Z_]+\]|<work>|<\/s>)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const cls = m[1] === "</s>" ? "c-eos" : variant === "chip" ? "c-tok" : "c-tok-o";
    out.push(
      <span key={k++} className={cls}>
        {m[1]}
      </span>
    );
    last = m.index + m[1].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const PY_RE =
  /(#[^\n]*)|("""[\s\S]*?"""|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|\b(import|from|as|def|return|for|in|if|elif|else|with|class|while|not|and|or|is|True|False|None|print|lambda|try|except|pip|install)\b|(\[START_[A-Z_]+\]|\[END_[A-Z_]+\]|<work>|<\/s>)|(\b\d[\d._]*\b)|([A-Za-z_][A-Za-z0-9_]*(?=\s*\())/g;

/** Lightweight Python-ish highlighter for the snippets in the README. */
export function highlightPython(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  PY_RE.lastIndex = 0;
  while ((m = PY_RE.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index));
    let cls = "";
    if (m[1]) cls = "c-com";
    else if (m[2]) cls = "c-str";
    else if (m[3]) cls = "c-kw";
    else if (m[4]) cls = "c-tok";
    else if (m[5]) cls = "c-num";
    else if (m[6]) cls = "c-fn";
    out.push(
      <span key={k++} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) PY_RE.lastIndex++;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

const BIB_RE = /(@[a-zA-Z]+)|([a-zA-Z][\w-]*(?=\s*=))|("[^"]*")|([{}[\],=#])/g;

export function highlightBib(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  BIB_RE.lastIndex = 0;
  while ((m = BIB_RE.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index));
    let cls = "";
    if (m[1]) cls = "c-kw";
    else if (m[2]) cls = "c-fn";
    else if (m[3]) cls = "c-str";
    else if (m[4]) cls = "c-num";
    out.push(
      <span key={k++} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) BIB_RE.lastIndex++;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}
