export type Example = {
  id: string;
  label: string;
  short: string;
  token: string;
  icon: string;
  blurb: string;
  prompt: string;
  flags: string[];
  code: string;
  output: string;
  note?: string;
};

export const EXAMPLES: Example[] = [
  {
    id: "citations",
    label: "Predict Citations",
    short: "Citations",
    token: "[START_REF]",
    icon: "brackets",
    blurb:
      "Append the [START_REF] token after a factual claim and the model completes it with a citation drawn from its 48M-paper corpus, in its own inline reference format.",
    prompt: String.raw`The Transformer architecture [START_REF]`,
    flags: [],
    code: String.raw`model.generate("The Transformer architecture [START_REF]")`,
    output:
      "The Transformer architecture [START_REF] Attention is All you Need, Vaswani[END_REF] is a sequence-to-sequence model that uses self-attention to capture long-range dependencies between input and output tokens. The Transformer has been shown to achieve state-of-the-art results on a wide range of natural",
  },
  {
    id: "latex",
    label: "Predict LaTeX",
    short: "LaTeX",
    token: "\\[ … \\]",
    icon: "radical",
    blurb:
      "Open a display-math delimiter and the model completes the equation — then keeps going, defining every variable it just introduced.",
    prompt: String.raw`The Schwarzschild radius is defined as: \[`,
    flags: [],
    code: String.raw`model.generate("The Schwarzschild radius is defined as: \\[")`,
    output: String.raw`The Schwarzschild radius is defined as: \[r_{s}=\frac{2GM}{c^{2}}\]

where \(G\) is the gravitational constant, \(M\) is the mass of the black hole, and`,
  },
  {
    id: "reasoning",
    label: "Reasoning",
    short: "Reasoning",
    token: "<work>",
    icon: "nodes",
    blurb:
      "The special <work> token switches the model into step-by-step mode: it writes out the working — Newton's second law, substitutions — before committing to an answer.",
    prompt: String.raw`A force of 0.6N is applied to an object, which accelerates at 3m/s. What is its mass? <work>`,
    flags: [],
    code: String.raw`model.generate("A force of 0.6N is applied to an object, which accelerates at 3m/s. What is its mass? <work>")`,
    output: String.raw`What force should be applied to accelerate an object of mass 3kg to 10m/s? <work>
We can use Newton's second law: F = ma. We can substitute variables to get:

\[ F = \left(66kg`,
    note: "<work> generations can meander — the model may rephrase the question before solving it. Useful as scratchpad, not as an oracle.",
  },
  {
    id: "molecules",
    label: "Generate Molecules",
    short: "Molecules",
    token: "[START_I_SMILES]",
    icon: "molecule",
    blurb:
      "Seed with [START_I_SMILES] and Galactica samples a drug-like molecule, then writes its own property sheet: formula, molecular weight, log P, hydrogen-bond counts.",
    prompt: String.raw`[START_I_SMILES]`,
    flags: ["max_length=200"],
    code: String.raw`model.generate("[START_I_SMILES]", max_length=200)`,
    output: `[START_I_SMILES]CCC1=CC=C(C=C1)C(=O)NC2=CC=CC(=C2)C(=O)NC3=CC=C(C=C3)S(=O)(=O)N[END_I_SMILES]

### Molecular Formula

C22H21N3O4S

## Chemical and Physical Properties

The following are chemical properties for 3-[[3-(4-ethylphenyl)-3-oxo-propanoyl]amino]-N-(4-sulfamoylphenyl)benzamide.

### Computed Properties

| Property Name | Property Value
| --- | ----------- |
| Molecular Weight | 423.5 |
| XLogP3-AA Log P | 3.2 |
| Hydrogen Bond Donor Count | 3 |
| Hydrogen Bond Acceptor Count`,
  },
  {
    id: "proteins",
    label: "Predict Protein Annotations",
    short: "Proteins",
    token: "[START_AMINO]",
    icon: "helix",
    blurb:
      "Wrap a sequence in [START_AMINO]…[END_AMINO] and ask for ## Keywords — out come GO-style annotations, followed by related literature with inline references.",
    prompt: String.raw`[START_AMINO]GHMQSITAGQKVISKHKNGRFYQCEVVRLTTETFYEVNFDDGSFSDNLYPEDIVSQDCLQFGPPAEGEVVQVRWTDGQVYGAKFVASHPIQMYQVEFEDGSQLVVKRDDVYTLDEELP[END_AMINO] ## Keywords`,
    flags: ["max_length=200"],
    code: String.raw`seq = (
    "[START_AMINO]GHMQSITAGQKVISKHKNGRFYQCEVVRLTTETFYEVNFDDGSFSDNLYPEDI"
    "VSQDCLQFGPPAEGEVVQVRWTDGQVYGAKFVASHPIQMYQVEFEDGSQLVVKRDDVYTLDEELP"
    "[END_AMINO] ## Keywords"
)

model.generate(seq, max_length=200)`,
    output: `[START_AMINO]GHMQSITAGQKVISKHKNGRFYQCEVVRLTTETFYEVNFDDGSFSDNLYPEDIVSQDCLQFGPPAEGEVVQVRWTDGQVYGAKFVASHPIQMYQVEFEDGSQLVVKRDDVYTLDEELP[END_AMINO] ## Keywords

Cytoplasm, Methyltransferase, rRNA processing, S-adenosyl-L-methionine, Transferase

## References

Question: What are some articles for Ribosomal RNA small subunit methyltransferase H?

Answer: 

[START_REF] Comparative Genomics of 28 Salmonella enterica Isolates: Evidence for CRISPR-Mediated Adaptive Sublineage Evolution, Fricke[END_REF]

</s>`,
  },
  {
    id: "freeform",
    label: "Free-Form Generation",
    short: "Free-form",
    token: "new_doc=False",
    icon: "ibeam",
    blurb:
      "With new_doc=False the model behaves like mid-document autocomplete instead of a cold-start writer — ideal for extending prose you already have.",
    prompt: String.raw`The reason why Transformers replaced RNNs was because`,
    flags: ["new_doc=False"],
    code: String.raw`model.generate("The reason why Transformers replaced RNNs was because",
               new_doc=False)`,
    output: `The reason why Transformers replaced RNNs was because they were able to capture long-term dependencies in the input sequence.

# 2.2.2. Attention Mechanism

The attention mechanism was introduced in [START_REF] Neural Machine Translation by Jointly Learning to Align and Translate, Bahdan`,
  },
  {
    id: "qa",
    label: "Question Answering",
    short: "QA",
    token: "Question: … Answer:",
    icon: "bubble",
    blurb:
      "Prefix with Question: and offer Answer: — the paper's QA format. No chat template needed; the shape of the prompt does all the steering.",
    prompt: String.raw`Question: What is the notch signaling pathway?

Answer:`,
    flags: [],
    code: String.raw`model.generate("Question: What is the notch signaling pathway?\n\nAnswer:")`,
    output: `Question: What is the notch signaling pathway?

Answer: 

Notch signaling pathway is a cell-cell communication pathway that regulates cell fate decisions during development. It is involved in cell proliferation, differentiation, apoptosis, and cell migration. The Notch signaling pathway is activated by the binding of`,
  },
  {
    id: "documents",
    label: "Documents",
    short: "Documents",
    token: "new_doc=True",
    icon: "page",
    blurb:
      "new_doc=True tells the model it is opening a fresh document. # starts wiki, lecture-note and repo-style docs; Title: starts paper-style docs.",
    prompt: String.raw`# Multi-Head Attention

`,
    flags: ["new_doc=True"],
    code: String.raw`# Wikipedia-style articles, lecture notes, repositories: begin with "#"
model.generate("# Multi-Head Attention\n\n", new_doc=True)

# Paper-style documents: begin with "Title:"
model.generate("Title: Self-Supervised Learning, A Survey\n\nAuthors: John Smith\n\n",
               new_doc=True)

# Less repetition on long-form: sample with nucleus sampling
model.generate("Lecture 1: The Ising Model\n\n", new_doc=True,
               top_p=0.7, max_length=200)`,
    output: `# Multi-Head Attention

The multi-head attention mechanism is a generalization of the single-head attention mechanism. The multi-head attention mechanism is a combination of multiple single-head attention mechanisms. The multi-head attention mechanism is shown in Figure 2.

The multi-`,
    note: "For long-form generation, alternative sampling such as top_p=0.7 reduces the repetition loops a greedy decode falls into.",
  },
  {
    id: "summarization",
    label: "Summarization",
    short: "TLDR",
    token: "TLDR:",
    icon: "compress",
    blurb:
      "Append TLDR: to any long-form text and the model compresses it into a single-sentence summary — here, its own abstract.",
    prompt: `…we believe these results demonstrate the potential for language models as a new interface for science. We open source the model for the benefit of the scientific community.\n\nTLDR:`,
    flags: ["max_length=400"],
    code: String.raw`TEXT = """Information overload is a major obstacle to scientific progress.
The explosive growth in scientific literature and data has made it ever
harder to discover useful insights in a large mass of information. Today
scientific knowledge is accessed through search engines, but they are
unable to organize scientific knowledge alone. In this paper we introduce
Galactica: a large language model that can store, combine and reason about
scientific knowledge. We train on a large scientific corpus of papers,
reference material, knowledge bases and many other sources. We outperform
existing models on a range of scientific tasks. On technical knowledge
probes such as LaTeX equations, Galactica outperforms the latest GPT-3 by
68.2% versus 49.0%. Galactica also performs well on reasoning,
outperforming Chinchilla on mathematical MMLU by 41.3% to 35.7%, and
PaLM 540B on MATH with a score of 20.4% versus 8.8%. It also sets a new
state-of-the-art on downstream tasks such as PubMedQA and MedMCQA dev of
77.6% and 52.9%. And despite not being trained on a general corpus,
Galactica outperforms BLOOM and OPT-175B on BIG-bench. We believe these
results demonstrate the potential for language models as a new interface
for science. We open source the model for the benefit of the scientific
community."""

model.generate(TEXT + "\n\nTLDR:", max_length=400)`,
    output: `TLDR: We introduce Galactica, a large language model that can store, combine and reason about scientific knowledge.</s>`,
  },
  {
    id: "entities",
    label: "Entity Extraction",
    short: "Entities",
    token: "…above?\\n\\n",
    icon: "gem",
    blurb:
      "Ask which entities a passage mentions and the model lists them — benchmarks, methods, datasets — as a clean comma-separated set.",
    prompt: `<the abstract above>

What scientific entities are mentioned in the abstract above?

`,
    flags: ["max_length=400"],
    code: String.raw`ENT_TEXT = TEXT + (
    "\n\nWhat scientific entities are mentioned in the abstract above?\n\n"
)

model.generate(ENT_TEXT, max_length=400)`,
    output: `What scientific entities are mentioned in the abstract above?

A: LaTeX equations, mathematical MMLU, MATH, PubMedQA, MedMCQA, BIG-bench</s>`,
  },
  {
    id: "iupac",
    label: "IUPAC Name Prediction",
    short: "IUPAC",
    token: "[START_I_SMILES]",
    icon: "flask",
    blurb:
      "Given a small SMILES inside [START_I_SMILES], the model names the compound IUPAC-style, then drafts the surrounding property documentation.",
    prompt: String.raw`[START_I_SMILES]C(C(=O)O)N[END_I_SMILES]

## Chemical and Physical Properties

The following are chemical properties for`,
    flags: ["max_length=400"],
    code: String.raw`context = (
    "[START_I_SMILES]C(C(=O)O)N[END_I_SMILES]\n\n"
    "## Chemical and Physical Properties\n\n"
    "The following are chemical properties for"
)

model.generate(context, max_length=400)`,
    output: String.raw`[START_I_SMILES]C(C(=O)O)N[END_I_SMILES]

## Chemical and Physical Properties

The following are chemical properties for 2-amino-2-oxo-acetic acid

# Note this is an incorrect prediction`,
    note: "The official docs flag this 6.7B prediction as incorrect — a useful reminder to validate any generated chemistry.",
  },
];

export const MODELS = [
  { name: "mini", params: "125M", billions: 0.125, repo: "facebook/galactica-125m" },
  { name: "base", params: "1.3B", billions: 1.3, repo: "facebook/galactica-1.3b" },
  { name: "standard", params: "6.7B", billions: 6.7, repo: "facebook/galactica-6.7b" },
  { name: "large", params: "30B", billions: 30, repo: "facebook/galactica-30b" },
  { name: "huge", params: "120B", billions: 120, repo: "facebook/galactica-120b" },
];

export const QUICKSTART = [
  {
    tab: "galai",
    file: "quickstart.py",
    code: String.raw`import galai as gal

model = gal.load_model("standard")
model.generate("Scaled dot product attention:\n\n\\[")
# Scaled dot product attention:\n\n\[ \displaystyle\text{Attention}(Q,K,V)=\text{softmax}(\frac{QK^{T}}{\sqrt{d_{k}}}\n)V \]`,
  },
  {
    tab: "transformers · pipeline",
    file: "pipeline.py",
    code: String.raw`# pip install transformers accelerate
from transformers import pipeline

model = pipeline("text-generation", model="facebook/galactica-6.7b")
input_text = "The Transformer architecture [START_REF]"
model(input_text)`,
  },
  {
    tab: "transformers · low-level",
    file: "generate.py",
    code: String.raw`from transformers import AutoTokenizer, OPTForCausalLM

tokenizer = AutoTokenizer.from_pretrained("facebook/galactica-6.7b")
model = OPTForCausalLM.from_pretrained("facebook/galactica-6.7b",
                                       device_map="auto")

input_text = "The Transformer architecture [START_REF]"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to("cuda")

outputs = model.generate(input_ids)
print(tokenizer.decode(outputs[0]))`,
  },
];

export const BIBTEX = String.raw`@inproceedings{GALACTICA,
    title={GALACTICA: A Large Language Model for Science},
    author={Ross Taylor and Marcin Kardas and Guillem Cucurull and Thomas Scialom
            and Anthony Hartshorn and Elvis Saravia and Andrew Poulton
            and Viktor Kerkez and Robert Stojnic},
    year={2022}
}`;

export const METRICS = [
  { value: "68.2%", label: "LaTeX knowledge probes", vs: "GPT-3 · 49.0%" },
  { value: "41.3%", label: "Mathematical MMLU", vs: "Chinchilla · 35.7%" },
  { value: "20.4%", label: "MATH benchmark", vs: "PaLM-540B · 8.8%" },
  { value: "77.6%", label: "PubMedQA dev", vs: "state-of-the-art" },
  { value: "52.9%", label: "MedMCQA dev", vs: "state-of-the-art" },
];
