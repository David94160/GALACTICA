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

/* ------------------------- weights download routes ------------------------- */

export type DownloadRoute = {
  id: string;
  label: string;
  file: string;
  note: string;
  code: string;
};

export const DOWNLOADS: DownloadRoute[] = [
  {
    id: "xet",
    label: "Git + git-xet",
    file: "git-xet · recommended",
    note: "Xet-backed clones deduplicate the weight blobs and resume cleanly — the Hub's recommended path for multi-gigabyte repos.",
    code: String.raw`# Make sure git-xet is installed — https://hf.co/docs/hub/git-xet
brew install git-xet
git xet install

git clone https://huggingface.co/facebook/galactica-6.7b`,
  },
  {
    id: "lfs-skip",
    label: "Pointers only",
    file: "git-lfs · skip smudge",
    note: "Clone the repo skeleton instantly; the weight files stay behind LFS pointers until you decide to pull them.",
    code: String.raw`# Clone without large files — just their pointers
GIT_LFS_SKIP_SMUDGE=1 git clone https://huggingface.co/facebook/galactica-6.7b`,
  },
  {
    id: "hf-cli",
    label: "hf CLI",
    file: "huggingface-cli",
    note: "The official CLI downloads straight into your HF cache — no git repo, and transformers picks the weights up automatically.",
    code: String.raw`# Make sure the hf CLI is installed
curl -LsSf https://hf.co/cli/install.sh | bash

# Download the model
hf download facebook/galactica-6.7b`,
  },
];

/* ------------------------ runtime variants (model card) ------------------------ */

export type DeployVariant = {
  id: string;
  label: string;
  tag: string;
  blurb: string;
  deps: string | null;
  code: string;
};

export const DEPLOY_VARIANTS: DeployVariant[] = [
  {
    id: "cpu",
    label: "CPU",
    tag: "no extras",
    blurb: "Runs anywhere with transformers alone. Fine for short prompts on the 6.7B model — slow, but zero extra dependencies.",
    deps: null,
    code: String.raw`from transformers import AutoTokenizer, OPTForCausalLM

tokenizer = AutoTokenizer.from_pretrained("facebook/galactica-6.7b")
model = OPTForCausalLM.from_pretrained("facebook/galactica-6.7b")

input_text = "The Transformer architecture [START_REF]"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids

outputs = model.generate(input_ids)
print(tokenizer.decode(outputs[0]))`,
  },
  {
    id: "gpu",
    label: "GPU",
    tag: "accelerate",
    blurb: "device_map=\"auto\" shards the model across your accelerators; the tokenized inputs are moved to CUDA before generate().",
    deps: "pip install accelerate",
    code: String.raw`# pip install accelerate
from transformers import AutoTokenizer, OPTForCausalLM

tokenizer = AutoTokenizer.from_pretrained("facebook/galactica-6.7b")
model = OPTForCausalLM.from_pretrained("facebook/galactica-6.7b", device_map="auto")

input_text = "The Transformer architecture [START_REF]"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to("cuda")

outputs = model.generate(input_ids)
print(tokenizer.decode(outputs[0]))`,
  },
  {
    id: "fp16",
    label: "FP16",
    tag: "half precision",
    blurb: "torch_dtype=torch.float16 halves the memory footprint and speeds up generation on Ampere-and-newer GPUs.",
    deps: "pip install accelerate",
    code: String.raw`# pip install accelerate
import torch
from transformers import AutoTokenizer, OPTForCausalLM

tokenizer = AutoTokenizer.from_pretrained("facebook/galactica-6.7b")
model = OPTForCausalLM.from_pretrained(
    "facebook/galactica-6.7b", device_map="auto", torch_dtype=torch.float16
)

input_text = "The Transformer architecture [START_REF]"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to("cuda")

outputs = model.generate(input_ids)
print(tokenizer.decode(outputs[0]))`,
  },
  {
    id: "int8",
    label: "INT8",
    tag: "bitsandbytes",
    blurb: "load_in_8bit=True quantizes the weights to 8 bits — the 6.7B model fits comfortably in roughly 8 GB of VRAM.",
    deps: "pip install bitsandbytes accelerate",
    code: String.raw`# pip install bitsandbytes accelerate
from transformers import AutoTokenizer, OPTForCausalLM

tokenizer = AutoTokenizer.from_pretrained("facebook/galactica-6.7b")
model = OPTForCausalLM.from_pretrained(
    "facebook/galactica-6.7b", device_map="auto", load_in_8bit=True
)

input_text = "The Transformer architecture [START_REF]"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to("cuda")

outputs = model.generate(input_ids)
print(tokenizer.decode(outputs[0]))`,
  },
];

/* -------------------- inference-widget prompts (front matter) -------------------- */

export type WidgetPrompt = { text: string; target: string };

export const WIDGET_PROMPTS: WidgetPrompt[] = [
  { text: "The Transformer architecture [START_REF]", target: "citations" },
  { text: String.raw`The Schwarzschild radius is defined as: \[`, target: "latex" },
  {
    text: "A force of 0.6N is applied to an object, which accelerates at 3m/s. What is its mass? <work>",
    target: "reasoning",
  },
  { text: "Lecture 1: The Ising Model\n\n", target: "documents" },
  { text: "[START_I_SMILES]", target: "molecules" },
  {
    text: "[START_AMINO]GHMQSITAGQKVISKHKNGRFYQCEVVRLTTETFYEVNFDDGSFSDNLYPEDIVSQDCLQFGPPAEGEVVQVRWTDGQVYGAKFVASHPIQMYQVEFEDGSQLVVKRDDVYTLDEELP[END_AMINO] ## Keywords",
    target: "proteins",
  },
];

/* ======================== BUSINESS PLAN DATA ======================== */

export const BUSINESS = {
  name: "Sirius",
  tagline: "L'intelligence scientifique augmentée",
  vision:
    "Sirius est l'assistant de recherche ultime : il se souvient de tout ce que vous avez exploré, comprend vos projets en profondeur, et déploie une puissance de calcul inégalée pour résoudre les problèmes scientifiques les plus complexes.",

  problem: [
    {
      title: "Surcharge d'information",
      desc: "Plus de 5 millions d'articles scientifiques publiés chaque année. Impossible pour un chercheur de suivre son domaine.",
      stat: "5M+",
      unit: "papers/an",
    },
    {
      title: "Fragmentation des outils",
      desc: "Les chercheurs utilisent 7+ outils différents : PubMed, Google Scholar, Zotero, Overleaf, Mendeley… sans intégration.",
      stat: "7+",
      unit: "outils/disCIPLINE",
    },
    {
      title: "Barrière linguistique",
      desc: "80% de la littérature scientifique est en anglais, excluant des millions de chercheurs non-anglophones.",
      stat: "80%",
      unit: "en anglais",
    },
    {
      title: "Rédaction chronophage",
      desc: "Les chercheurs passent 30% de leur temps à rédiger, formater et citer — du temps volé à la recherche elle-même.",
      stat: "30%",
      unit: "du temps perdu",
    },
  ],

  solution: {
    name: "Sirius",
    desc: "Sirius combine deux capacités fondamentales : une mémoire persistante qui retient tout votre historique de recherche, et une puissance de calcul massive pour résoudre les problèmes scientifiques les plus complexes.",
    pillars: [
      {
        icon: "memory",
        title: "Mémoire",
        subtitle: "Il se souvient de tout",
        desc: "Sirius maintient un contexte permanent de vos recherches, conversations et découvertes. Il sait ce que vous avez exploré hier, la semaine dernière, il y a un mois.",
        features: [
          "Historique de recherche persistant",
          "Contexte conversationnel illimité",
          "Connexions automatiques entre vos projets",
          "Rappels intelligents basés sur vos patterns",
          "Base de connaissances personnelle évolutive",
        ],
      },
      {
        icon: "power",
        title: "Puissance",
        subtitle: "Force de calcul inégalée",
        desc: "Propulsé par GALACTICA 120B et des infrastructures GPU de pointe, Sirius déploie une puissance de raisonnement capable de résoudre des problèmes scientifiques complexes en temps réel.",
        features: [
          "Raisonnement mathématique avancé",
          "Analyse moléculaire en temps réel",
          "Génération de code scientifique optimisé",
          "Simulation et modélisation accélérée",
          "Traitement de corpus massifs (100K+ articles)",
        ],
      },
    ],
    features: [
      {
        icon: "search",
        title: "Recherche sémantique",
        desc: "Trouvez des articles par concept, pas par mot-clé. Sirius comprend le contexte scientifique et votre historique.",
      },
      {
        icon: "summarize",
        title: "Résumé automatique",
        desc: "Résumés TLDR instantanés de n'importe quel article, avec extraction des résultats clés.",
      },
      {
        icon: "cite",
        title: "Génération de citations",
        desc: "Écrivez un fait, Sirius trouve la citation appropriée dans son corpus de 48M d'articles.",
      },
      {
        icon: "write",
        title: "Assistant de rédaction",
        desc: "Rédigez des sections de papier avec assistance IA : introduction, méthodes, discussion.",
      },
      {
        icon: "molecule",
        title: "Analyse moléculaire",
        desc: "Pour la chimie et la biologie : génération de SMILES, prédiction de propriétés, annotations de protéines.",
      },
      {
        icon: "math",
        title: "Raisonnement mathématique",
        desc: "Résolution d'équations, génération de LaTeX, vérification de preuves — pas à pas.",
      },
    ],
  },

  market: {
    tam: { value: "$52B", label: "TAM", desc: "Marché mondial EdTech + ResearchTech" },
    sam: { value: "$8.4B", label: "SAM", desc: "Outils de recherche scientifique (académique + pharma)" },
    som: { value: "$420M", label: "SOM", desc: "Objectif 5 ans : 10% du marché SAM" },
    users: "30M+ chercheurs actifs dans le monde",
    growth: "12% CAGR marché ResearchTech",
  },

  pricing: [
    {
      tier: "Free",
      price: "$0",
      period: "",
      target: "Étudiants & chercheurs indépendants",
      features: [
        "50 requêtes/mois",
        "Résumés basiques",
        "Accès communauté",
        "Export BibTeX",
      ],
      cta: "Commencer gratuitement",
      highlight: false,
    },
    {
      tier: "Pro",
      price: "$29",
      period: "/mois",
      target: "Chercheurs actifs & PhD",
      features: [
        "Requêtes illimitées",
        "Résumés avancés + TLDR",
        "Génération de citations",
        "Assistant de rédaction",
        "Export LaTeX/Word",
        "Support prioritaire",
      ],
      cta: "Essai gratuit 14 jours",
      highlight: true,
    },
    {
      tier: "Lab",
      price: "$99",
      period: "/mois",
      target: "Laboratoires & équipes de recherche",
      features: [
        "Tout Pro +",
        "5 utilisateurs",
        "Bibliothèque partagée",
        "Analyse de corpus personnalisé",
        "API access",
        "Intégration Zotero/Mendeley",
      ],
      cta: "Contacter les ventes",
      highlight: false,
    },
    {
      tier: "Enterprise",
      price: "Custom",
      period: "",
      target: "Universités, Pharma, Biotech",
      features: [
        "Tout Lab +",
        "Utilisateurs illimités",
        "Déploiement on-premise",
        "Modèle fine-tuné personnalisé",
        "SLA 99.9%",
        "Support dédié 24/7",
      ],
      cta: "Planifier une démo",
      highlight: false,
    },
  ],

  projections: [
    { year: "Y1", arr: 0.8, users: 12000, note: "Lancement beta + early adopters" },
    { year: "Y2", arr: 4.2, users: 58000, note: "Croissance organique + partenariats universitaires" },
    { year: "Y3", arr: 12.5, users: 145000, note: "Expansion internationale + Enterprise" },
    { year: "Y4", arr: 28.0, users: 310000, note: "Leader du marché ResearchTech" },
    { year: "Y5", arr: 52.0, users: 520000, note: "Plateforme dominante + IPO candidate" },
  ],

  gtm: [
    {
      phase: "Phase 1 : Lancement (Q1-Q2 2025)",
      actions: [
        "Beta privée avec 500 chercheurs sélectionnés",
        "Partenariats avec 10 universités top-tier",
        "Content marketing : articles de blog techniques, webinaires",
        "Présence aux conférences : NeurIPS, ICML, ACS",
      ],
    },
    {
      phase: "Phase 2 : Croissance (Q3-Q4 2025)",
      actions: [
        "Lancement public + freemium",
        "Programme d'affiliation pour chercheurs influents",
        "Intégrations : Overleaf, Zotero, Mendeley, Google Scholar",
        "Campagnes LinkedIn ciblées (académique + pharma)",
      ],
    },
    {
      phase: "Phase 3 : Scale (2026)",
      actions: [
        "Expansion internationale (FR, DE, JP, CN)",
        "Offre Enterprise pour pharma/biotech",
        "Marketplace de plugins communautaires",
        "Série A : $15M pour accélérer",
      ],
    },
  ],

  team: [
    { role: "CEO", profile: "Ex-Google Scholar, PhD en NLP, 10+ ans EdTech" },
    { role: "CTO", profile: "Ex-Meta AI, expert transformers, contributeur HuggingFace" },
    { role: "CSO (Chief Science Officer)", profile: "Professeur universitaire, 50+ publications, réseau académique" },
    { role: "Head of Growth", profile: "Ex-Notion, growth hacker B2B SaaS, community builder" },
    { role: "Head of Engineering", profile: "Ex-OpenAI, infrastructure ML à grande échelle" },
  ],

  roadmap: [
    { quarter: "Q1 2025", milestone: "Beta privée", details: "500 early adopters, feedback loop" },
    { quarter: "Q2 2025", milestone: "Lancement public", details: "Freemium, Pro tier, 10K users" },
    { quarter: "Q3 2025", milestone: "Intégrations", details: "Overleaf, Zotero, API publique" },
    { quarter: "Q4 2025", milestone: "Enterprise", details: "On-premise, custom models, pharma" },
    { quarter: "Q1 2026", milestone: "International", details: "Multi-langue, expansion EU/Asia" },
    { quarter: "Q2 2026", milestone: "Série A", details: "$15M raise, scale team & infra" },
  ],

  risks: [
    {
      risk: "Licence CC BY-NC 4.0",
      impact: "Élevé",
      mitigation: "Modèle freemium non-commercial + licensing commercial négocié avec Meta AI",
    },
    {
      risk: "Concurrents (Elicit, Consensus, Scispace)",
      impact: "Moyen",
      mitigation: "Avantage technique GALACTICA (scientifique natif) + UX supérieure",
    },
    {
      risk: "Adoption lente du monde académique",
      impact: "Moyen",
      mitigation: "Partenariats universitaires + programme ambassadeurs",
    },
    {
      risk: "Coûts d'infrastructure (GPU)",
      impact: "Élevé",
      mitigation: "Optimisation INT8/quantization + caching agressif + pricing adapté",
    },
    {
      risk: "Hallucinations / qualité",
      impact: "Élevé",
      mitigation: "Vérification humaine + système de feedback + transparency sur limitations",
    },
  ],

  competitive: [
    {
      name: "Elicit",
      strength: "UX propre, bonne adoption",
      weakness: "Pas de mémoire, juste recherche ponctuelle",
      sirius: "Mémoire persistante + rédaction assistée",
    },
    {
      name: "Consensus",
      strength: "Moteur de recherche scientifique",
      weakness: "Pas de compréhension profonde, pas de contexte",
      sirius: "Puissance de raisonnement + mémoire contextuelle",
    },
    {
      name: "Scispace",
      strength: "Gratuit, bonne couverture",
      weakness: "Qualité variable, pas de génération, pas de mémoire",
      sirius: "Qualité scientifique supérieure + mémoire + citations automatiques",
    },
    {
      name: "ChatGPT / Claude",
      strength: "Capacités générales, popularité",
      weakness: "Pas spécialisé scientifique, hallucinations, mémoire limitée",
      sirius: "Entraîné sur 106B tokens scientifiques, mémoire illimitée, puissance dédiée",
    },
  ],
};
