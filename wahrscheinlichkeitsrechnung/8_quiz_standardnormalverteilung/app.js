"use strict";

const stage = document.getElementById("nqStage");
const statusLine = document.getElementById("statusLine");
const taskBadge = document.getElementById("taskBadge");
const progressNav = document.getElementById("progressNav");
const restartButton = document.getElementById("restartButton");

const LANG = (document.documentElement.lang || "de").toLowerCase().startsWith("en") ? "en" : "de";
// Fortschritt je Sprache getrennt, da DE und EN auf derselben Domain liegen.
const STORE_KEY = LANG === "en" ? "stat_normal_quiz_progress_en_v1" : "stat_normal_quiz_progress_v1";
const SVG_NS = "http://www.w3.org/2000/svg";

// Farben wie in Video 7: gesuchte Fläche orange, übrige Fläche hellgrau.
const COLORS = { area: "#C4772B", neutral: "#A9AFB8", curve: "#20242A", muted: "#68707C" };

const I18N = {
  de: {
    decimal: ",",
    badge: (i, n) => `Aufgabe ${i} von ${n}`,
    progressLabel: (i, solved) => `Aufgabe ${i}${solved ? " (gelöst)" : ""}`,
    phase: {
      transform: "Umformen",
      diff: "Differenz aufteilen",
      read: "Tabellenwert ablesen",
      result: "Ergebnis"
    },
    task: "Bestimmen Sie mithilfe der Tabelle der Formelsammlung für Z ~ N(0,1):",
    pathTitle: "Rechenweg",
    transformQuestion: "Welcher Schritt bringt den markierten Ausdruck näher an einen Tabellenwert?",
    ops: { read: "Ablesen", comp: "Gegenereignis", sym: "Symmetrie", diff: "Differenz" },
    or: " oder ",
    readNaNegative: z => `Die Tabelle beginnt bei z = 0. Für die negative Grenze ${z} hilft die Symmetrie der Dichte.`,
    readNaRight: z => `Die Tabelle enthält Flächen links von z. Gesucht ist hier die Fläche rechts von ${z}.`,
    readNaBetween: (a, b) => `Die Tabelle enthält Flächen links von z. Gesucht ist hier die Fläche zwischen ${a} und ${b}.`,
    compNa: "Das Gegenereignis eines Intervalls besteht aus zwei getrennten Flächen links und rechts davon. Für Flächen zwischen zwei Grenzen hilft die Differenz.",
    diffNa: "Eine Differenz brauchen wir für Flächen zwischen zwei Grenzen. Hier gibt es nur eine Grenze.",
    alreadyReadable: "Diese Fläche lässt sich bereits direkt aus der Tabelle ablesen.",
    detour: res => `Diese Umformung ist korrekt und ergibt ${res}. Damit kommen wir der Tabelle aber nicht näher.`,
    hint: ops => `Etwas direkter wäre hier: ${ops}.`,
    diffHintLeft: (a, b) => `Etwas direkter wäre hier: Fläche links von ${b} minus Fläche links von ${a}.`,
    diffHintRight: (a, b) => `Etwas direkter wäre hier: Fläche rechts von ${a} minus Fläche rechts von ${b}.`,
    compFromRight: z => `Gegenereignis: Die Fläche rechts von ${z} ist die Gesamtfläche 1 minus die Fläche links von ${z}.`,
    compFromLeft: z => `Gegenereignis: Die Fläche links von ${z} ist die Gesamtfläche 1 minus die Fläche rechts von ${z}.`,
    symLeft: (z, mz) => `Symmetrie: Die Fläche links von ${z} ist genauso groß wie die Fläche rechts von ${mz}.`,
    symRight: (z, mz) => `Symmetrie: Die Fläche rechts von ${z} ist genauso groß wie die Fläche links von ${mz}.`,
    symBetween: (a, b, ma, mb) => `Symmetrie: Die Fläche zwischen ${a} und ${b} ist genauso groß wie die Fläche zwischen ${ma} und ${mb}.`,
    readOk: z => `P(Z ≤ ${z}) = Φ(${z}) steht in der Tabelle.`,
    readOkStrict: z => `Bei stetigen Zufallsvariablen ist P(Z < ${z}) = P(Z ≤ ${z}) = Φ(${z}). Dieser Wert steht in der Tabelle.`,
    diffOkLeft: (a, b) => `Differenz: Die Fläche zwischen ${a} und ${b} ist die Fläche links von ${b} minus die Fläche links von ${a}.`,
    diffOkRight: (a, b) => `Differenz: Die Fläche zwischen ${a} und ${b} ist die Fläche rechts von ${a} minus die Fläche rechts von ${b}.`,
    strictNote: " Ob die Grenzen mit < oder ≤ angegeben sind, spielt bei stetigen Zufallsvariablen keine Rolle.",
    diffQuestion: "Zerlegen Sie den markierten Ausdruck in große Fläche minus abzuziehende Fläche:",
    diffMinuend: "Große Fläche",
    diffSubtrahend: "Abzuziehende Fläche",
    diffCheck: "Prüfen",
    diffCancel: "Andere Umformung wählen",
    diffSame: "Beide Flächen sind gleich groß; die Differenz wäre null.",
    diffReversed: (a, b) => `Die Reihenfolge ist vertauscht: Die Fläche links von ${a} ist kleiner als die Fläche links von ${b}. Die Differenz wäre negativ.`,
    diffWrong: (a, b) => `Diese Kombination ergibt nicht die Fläche zwischen ${a} und ${b}. Vergleichen Sie die Skizzen: Große Fläche minus abzuziehende Fläche soll genau diesen Streifen ergeben.`,
    readQuestion: phi => `Lesen Sie ${phi} aus der Tabelle ab.`,
    tableCaption: "Ausschnitt aus der Tabelle der Formelsammlung: Φ(z) = P(Z ≤ z)",
    tableHelp: "Zeile: Stelle vor dem Komma und erste Nachkommastelle · Spalte: zweite Nachkommastelle",
    cellLabel: (row, col, value) => `z = ${row} plus ${col}: ${value}`,
    readCorrect: (phi, value) => `Richtig: ${phi} ≈ ${value}.`,
    readRowOk: "Die Zeile stimmt. Die Spalte gibt die zweite Nachkommastelle an.",
    readColOk: "Die Spalte stimmt. Die Zeile gibt die Stelle vor dem Komma und die erste Nachkommastelle an.",
    readBothWrong: z => `Für z = ${z} gehören die Stelle vor dem Komma und die erste Nachkommastelle zur Zeile, die zweite Nachkommastelle zur Spalte.`,
    resultTitle: "Richtig gerechnet.",
    resultText: (term, value, pct) => `${term} ≈ ${value}, also rund ${pct} Prozent.`,
    rTitle: "Vergleich mit R:",
    rSame: "Die Tabelle ist auf vier Nachkommastellen gerundet; R rechnet genauer.",
    rDiff: "Der kleine Unterschied in der vierten Nachkommastelle entsteht, weil die Tabellenwerte gerundet sind.",
    next: "Nächste Aufgabe",
    again: "Wieder mit Aufgabe 1 beginnen",
    allSolved: "Alle zehn Aufgaben sind gelöst.",
    graphCurrent: "Markierter Ausdruck",
    graphRead: "Abzulesende Fläche",
    graphResult: "Gesuchte Fläche",
    areaLeft: z => `Fläche links von ${z}`,
    areaRight: z => `Fläche rechts von ${z}`,
    areaBetween: (a, b) => `Fläche zwischen ${a} und ${b}`,
    stepTitle: op => `Letzter Schritt: ${op}`,
    diffPreview: "Vorschau der gewählten Flächen",
    open: "?"
  },
  en: {
    decimal: ".",
    badge: (i, n) => `Exercise ${i} of ${n}`,
    progressLabel: (i, solved) => `Exercise ${i}${solved ? " (solved)" : ""}`,
    phase: {
      transform: "Transform",
      diff: "Split into a difference",
      read: "Read the table value",
      result: "Result"
    },
    task: "Using the table in the formula sheet, determine for Z ~ N(0,1):",
    pathTitle: "Working",
    transformQuestion: "Which step brings the highlighted expression closer to a table value?",
    ops: { read: "Read from table", comp: "Complement", sym: "Symmetry", diff: "Difference" },
    or: " or ",
    readNaNegative: z => `The table starts at z = 0. For the negative bound ${z}, the symmetry of the density helps.`,
    readNaRight: z => `The table contains areas to the left of z. Here we are looking for the area to the right of ${z}.`,
    readNaBetween: (a, b) => `The table contains areas to the left of z. Here we are looking for the area between ${a} and ${b}.`,
    compNa: "The complement of an interval consists of two separate areas to its left and right. For areas between two bounds, the difference helps.",
    diffNa: "We need a difference for areas between two bounds. Here there is only one bound.",
    alreadyReadable: "This area can already be read directly from the table.",
    detour: res => `This transformation is correct and gives ${res}. However, it does not bring us any closer to the table.`,
    hint: ops => `A slightly more direct step here: ${ops}.`,
    diffHintLeft: (a, b) => `A slightly more direct way here: area to the left of ${b} minus area to the left of ${a}.`,
    diffHintRight: (a, b) => `A slightly more direct way here: area to the right of ${a} minus area to the right of ${b}.`,
    compFromRight: z => `Complement: The area to the right of ${z} is the total area 1 minus the area to the left of ${z}.`,
    compFromLeft: z => `Complement: The area to the left of ${z} is the total area 1 minus the area to the right of ${z}.`,
    symLeft: (z, mz) => `Symmetry: The area to the left of ${z} is exactly as large as the area to the right of ${mz}.`,
    symRight: (z, mz) => `Symmetry: The area to the right of ${z} is exactly as large as the area to the left of ${mz}.`,
    symBetween: (a, b, ma, mb) => `Symmetry: The area between ${a} and ${b} is exactly as large as the area between ${ma} and ${mb}.`,
    readOk: z => `P(Z ≤ ${z}) = Φ(${z}) is listed in the table.`,
    readOkStrict: z => `For continuous random variables, P(Z < ${z}) = P(Z ≤ ${z}) = Φ(${z}). This value is listed in the table.`,
    diffOkLeft: (a, b) => `Difference: The area between ${a} and ${b} is the area to the left of ${b} minus the area to the left of ${a}.`,
    diffOkRight: (a, b) => `Difference: The area between ${a} and ${b} is the area to the right of ${a} minus the area to the right of ${b}.`,
    strictNote: " For continuous random variables, it makes no difference whether the bounds are given with < or ≤.",
    diffQuestion: "Split the highlighted expression into a large area minus an area to subtract:",
    diffMinuend: "Large area",
    diffSubtrahend: "Area to subtract",
    diffCheck: "Check",
    diffCancel: "Choose another step",
    diffSame: "Both areas are equal; the difference would be zero.",
    diffReversed: (a, b) => `The order is reversed: The area to the left of ${a} is smaller than the area to the left of ${b}. The difference would be negative.`,
    diffWrong: (a, b) => `This combination does not give the area between ${a} and ${b}. Compare the sketches: the large area minus the area to subtract should give exactly this strip.`,
    readQuestion: phi => `Read ${phi} from the table.`,
    tableCaption: "Excerpt from the table in the formula sheet: Φ(z) = P(Z ≤ z)",
    tableHelp: "Row: digit before the decimal point and first decimal place · Column: second decimal place",
    cellLabel: (row, col, value) => `z = ${row} plus ${col}: ${value}`,
    readCorrect: (phi, value) => `Correct: ${phi} ≈ ${value}.`,
    readRowOk: "The row is correct. The column gives the second decimal place.",
    readColOk: "The column is correct. The row gives the digit before the decimal point and the first decimal place.",
    readBothWrong: z => `For z = ${z}, the digit before the decimal point and the first decimal place determine the row, the second decimal place determines the column.`,
    resultTitle: "Correctly calculated.",
    resultText: (term, value, pct) => `${term} ≈ ${value}, i.e. about ${pct} percent.`,
    rTitle: "Comparison with R:",
    rSame: "The table is rounded to four decimal places; R calculates more precisely.",
    rDiff: "The small difference in the fourth decimal place arises because the table values are rounded.",
    next: "Next exercise",
    again: "Start again with exercise 1",
    allSolved: "All ten exercises are solved.",
    graphCurrent: "Highlighted expression",
    graphRead: "Area to read off",
    graphResult: "Required area",
    areaLeft: z => `Area to the left of ${z}`,
    areaRight: z => `Area to the right of ${z}`,
    areaBetween: (a, b) => `Area between ${a} and ${b}`,
    stepTitle: op => `Last step: ${op}`,
    diffPreview: "Preview of the selected areas",
    open: "?"
  }
};

const T = I18N[LANG] || I18N.de;

/* --------------------------------------------------------------------------
   Zahlen und Darstellung
   -------------------------------------------------------------------------- */

// z in Hundertsteln → "1,23" bzw. "−1,20"
function fmtZ(h) {
  const sign = h < 0 ? "−" : "";
  return sign + (Math.abs(h) / 100).toFixed(2).replace(".", T.decimal);
}

// Wahrscheinlichkeit in Zehntausendsteln → "0,8907"
function fmtProb(v) {
  return (v / 10000).toFixed(4).replace(".", T.decimal);
}

function fmtPercent(v) {
  return (v / 100).toFixed(1).replace(".", T.decimal);
}

function tableValue(z) {
  const text = PHI_TABLE_ROWS[Math.floor(z / 10)][z % 10];
  return { text, value: Math.round(parseFloat(text) * 10000) };
}

function termText(t) {
  if (t.k === "le") return `P(Z ${t.s ? "<" : "≤"} ${fmtZ(t.z)})`;
  if (t.k === "ge") return `P(Z ${t.s ? ">" : "≥"} ${fmtZ(t.z)})`;
  return `P(${fmtZ(t.a)} ${t.sa ? "<" : "≤"} Z ${t.sb ? "<" : "≤"} ${fmtZ(t.b)})`;
}

function phiText(z) {
  return `Φ(${fmtZ(z)})`;
}

function areaText(t) {
  if (t.k === "le") return T.areaLeft(fmtZ(t.z));
  if (t.k === "ge") return T.areaRight(fmtZ(t.z));
  return T.areaBetween(fmtZ(t.a), fmtZ(t.b));
}

function sameTerm(x, y) {
  return JSON.stringify(x) === JSON.stringify(y);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/* --------------------------------------------------------------------------
   Umformungen und kürzester Weg zur Tabelle
   -------------------------------------------------------------------------- */

const LE = (z, s = false) => ({ k: "le", z, s });
const GE = (z, s = false) => ({ k: "ge", z, s });
const BW = (a, b, sa = false, sb = false) => ({ k: "bw", a, b, sa, sb });

// Liefert für Ablesen, Gegenereignis und Symmetrie den neuen Ausdrucksknoten und die
// darin noch offenen Terme; null, wenn die Umformung auf diese Termform nicht passt.
function applyOp(op, t) {
  if (op === "read") {
    return t.k === "le" && t.z >= 0 ? { node: { n: "phi", z: t.z, strict: t.s }, children: [] } : null;
  }
  if (op === "comp") {
    if (t.k === "bw") return null;
    const other = t.k === "le" ? GE(t.z, !t.s) : LE(t.z, !t.s);
    return { node: { n: "om", c: { n: "t", t: other } }, children: [other] };
  }
  if (op === "sym") {
    let other;
    if (t.k === "le") other = GE(-t.z, t.s);
    else if (t.k === "ge") other = LE(-t.z, t.s);
    else other = BW(-t.b, -t.a, t.sb, t.sa);
    return { node: { n: "t", t: other }, children: [other] };
  }
  return null;
}

// Zulässige Zerlegungen eines Intervalls: links − links (wie im Video) oder rechts − rechts.
// Strikte Ungleichungen werden dabei zu ≤ bzw. ≥ (bei stetigen ZV gleichwertig).
function diffVariants(t) {
  if (t.k !== "bw") return [];
  return [
    { kind: "left", m: LE(t.b), s: LE(t.a) },
    { kind: "right", m: GE(t.a), s: GE(t.b) }
  ];
}

// Mindestanzahl an Schritten (Ablesen zählt mit), bis ein Term nur noch aus Tabellenwerten besteht.
function cost(t, depth = 0) {
  if (depth > 6) return Infinity;
  if (applyOp("read", t)) return 1;
  let best = Infinity;
  for (const op of ["comp", "sym"]) {
    const res = applyOp(op, t);
    if (res) best = Math.min(best, 1 + cost(res.children[0], depth + 1));
  }
  for (const v of diffVariants(t)) {
    best = Math.min(best, 1 + cost(v.m, depth + 1) + cost(v.s, depth + 1));
  }
  return best;
}

function opCost(op, t) {
  if (op === "diff") {
    return Math.min(...diffVariants(t).map(v => 1 + cost(v.m) + cost(v.s)), Infinity);
  }
  const res = applyOp(op, t);
  return res ? 1 + res.children.reduce((sum, c) => sum + cost(c), 0) : Infinity;
}

function bestOps(t) {
  const target = cost(t);
  return ["read", "comp", "sym", "diff"].filter(op => opCost(op, t) === target);
}

function bestOpsText(t) {
  return bestOps(t).map(op => T.ops[op]).join(T.or);
}

/* --------------------------------------------------------------------------
   Ausdrucksbaum des Rechenwegs
   Knoten: t (offener Term), phi (abzulesen), val (abgelesen), om (1 − c), df (l − r)
   -------------------------------------------------------------------------- */

function findFirst(node, pred, path = []) {
  if (pred(node)) return path;
  const keys = node.n === "om" ? ["c"] : node.n === "df" ? ["l", "r"] : [];
  for (const key of keys) {
    const found = findFirst(node[key], pred, [...path, key]);
    if (found) return found;
  }
  return null;
}

function getAt(root, path) {
  return path.reduce((node, key) => node[key], root);
}

function setAt(path, node) {
  if (!path.length) {
    state.expr = node;
    return;
  }
  const parent = getAt(state.expr, path.slice(0, -1));
  parent[path[path.length - 1]] = node;
}

function evalNode(node) {
  if (node.n === "val") return node.v;
  if (node.n === "om") return 10000 - evalNode(node.c);
  if (node.n === "df") return evalNode(node.l) - evalNode(node.r);
  throw new Error("Ausdruck enthält noch offene Terme");
}

function nodeText(node, inDiff = false) {
  if (node.n === "t") return termText(node.t);
  if (node.n === "phi") return phiText(node.z);
  if (node.n === "val") return fmtProb(node.v);
  if (node.n === "om") {
    const inner = `1 − ${nodeText(node.c)}`;
    return inDiff ? `(${inner})` : inner;
  }
  return `${nodeText(node.l, true)} − ${nodeText(node.r, true)}`;
}

// Wie nodeText, aber als DOM mit hervorgehobenem aktiven Baustein.
function nodeDom(node, activePath, path = [], inDiff = false) {
  const frag = document.createDocumentFragment();
  const isActive = activePath && activePath.length === path.length && activePath.every((k, i) => k === path[i]);
  if (node.n === "t" || node.n === "phi" || node.n === "val") {
    const span = el("span", "nq-atom" + (isActive ? " is-active" : ""), nodeText(node));
    frag.appendChild(span);
    return frag;
  }
  if (node.n === "om") {
    if (inDiff) frag.append("(");
    frag.append("1 − ");
    frag.appendChild(nodeDom(node.c, activePath, [...path, "c"]));
    if (inDiff) frag.append(")");
    return frag;
  }
  frag.appendChild(nodeDom(node.l, activePath, [...path, "l"], true));
  frag.append(" − ");
  frag.appendChild(nodeDom(node.r, activePath, [...path, "r"], true));
  return frag;
}

/* --------------------------------------------------------------------------
   Zustand und Fortschritt
   -------------------------------------------------------------------------- */

const state = {
  index: 0,
  expr: null,
  lines: [],
  phase: "transform",
  message: null,
  lastStep: null,
  mirrorFrom: null,
  diff: null,
  wrongCell: null,
  result: null
};

let progress = readProgress();

function readProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    const solved = Array.isArray(parsed.solved) ? parsed.solved.filter(id => TASKS.some(t => t.id === id)) : [];
    const current = Number.isInteger(parsed.current) && parsed.current >= 0 && parsed.current < TASKS.length ? parsed.current : 0;
    return { solved, current };
  } catch (_) {
    return { solved: [], current: 0 };
  }
}

function writeProgress() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (_) { /* no-op */ }
}

function currentTask() {
  return TASKS[state.index];
}

function startTask(index) {
  state.index = index;
  state.expr = { n: "t", t: clone(TASKS[index].term) };
  state.lines = [{ rel: "", expr: clone(state.expr) }];
  state.phase = "transform";
  state.message = null;
  state.lastStep = null;
  state.mirrorFrom = null;
  state.diff = null;
  state.wrongCell = null;
  state.result = null;
  progress.current = index;
  writeProgress();
  render();
}

function activePath() {
  if (state.phase === "transform" || state.phase === "diff") return findFirst(state.expr, n => n.n === "t");
  if (state.phase === "read") return findFirst(state.expr, n => n.n === "phi");
  return null;
}

function pushLine(rel) {
  state.lines.push({ rel, expr: clone(state.expr) });
}

/* --------------------------------------------------------------------------
   Aktionen
   -------------------------------------------------------------------------- */

function handleOp(op) {
  const path = activePath();
  const t = getAt(state.expr, path).t;
  state.mirrorFrom = null;

  if (op === "diff") {
    if (t.k !== "bw") {
      state.message = { type: "wrong", text: T.diffNa };
      render();
      return;
    }
    const variants = diffVariants(t);
    state.phase = "diff";
    state.message = null;
    state.diff = {
      term: t,
      mOptions: shuffle([variants[0].m, variants[0].s, variants[1].m]),
      sOptions: shuffle([variants[0].s, variants[0].m, variants[1].s]),
      m: null,
      s: null
    };
    render();
    return;
  }

  const res = applyOp(op, t);
  if (!res) {
    state.message = { type: "wrong", text: notApplicableText(op, t) };
    render();
    return;
  }

  const current = cost(t);
  const childCost = res.children.reduce((sum, c) => sum + cost(c), 0);
  if (op !== "read" && childCost >= current) {
    const text = applyOp("read", t) ? T.alreadyReadable : T.detour(nodeText(res.node));
    state.message = { type: "wrong", text };
    render();
    return;
  }

  setAt(path, res.node);
  pushLine("=");
  // Ablesen braucht keine Schritt-Skizze; die Fläche zeigt die Hauptgrafik.
  state.lastStep = op === "read" ? null : { op, before: t, parts: res.children };
  if (op === "sym") state.mirrorFrom = t;

  let text = successText(op, t, res);
  let type = "correct";
  if (1 + childCost > current) {
    text += " " + T.hint(bestOpsText(t));
    type = "hint";
  }
  state.message = { type, text };
  advancePhase();
  render();
}

function notApplicableText(op, t) {
  if (op === "read") {
    if (t.k === "le") return T.readNaNegative(fmtZ(t.z));
    if (t.k === "ge") return T.readNaRight(fmtZ(t.z));
    return T.readNaBetween(fmtZ(t.a), fmtZ(t.b));
  }
  return T.compNa;
}

function successText(op, t) {
  if (op === "read") return t.s ? T.readOkStrict(fmtZ(t.z)) : T.readOk(fmtZ(t.z));
  if (op === "comp") return t.k === "ge" ? T.compFromRight(fmtZ(t.z)) : T.compFromLeft(fmtZ(t.z));
  if (t.k === "le") return T.symLeft(fmtZ(t.z), fmtZ(-t.z));
  if (t.k === "ge") return T.symRight(fmtZ(t.z), fmtZ(-t.z));
  return T.symBetween(fmtZ(t.a), fmtZ(t.b), fmtZ(-t.b), fmtZ(-t.a));
}

function checkDiff() {
  const { term: t, m, s } = state.diff;
  const a = fmtZ(t.a);
  const b = fmtZ(t.b);
  const variant = diffVariants(t).find(v => sameTerm(v.m, m) && sameTerm(v.s, s));

  if (!variant) {
    let text = T.diffWrong(a, b);
    if (sameTerm(m, s)) text = T.diffSame;
    else if (sameTerm(m, LE(t.a)) && sameTerm(s, LE(t.b))) text = T.diffReversed(a, b);
    state.message = { type: "wrong", text };
    render();
    return;
  }

  const path = activePath();
  setAt(path, { n: "df", l: { n: "t", t: clone(m) }, r: { n: "t", t: clone(s) } });
  pushLine("=");
  state.lastStep = { op: "diff", before: t, parts: [m, s] };

  let text = variant.kind === "left" ? T.diffOkLeft(a, b) : T.diffOkRight(a, b);
  if (t.sa || t.sb) text += T.strictNote;
  let type = "correct";
  if (1 + cost(m) + cost(s) > cost(t)) {
    const other = diffVariants(t).find(v => v !== variant && 1 + cost(v.m) + cost(v.s) === cost(t));
    if (other) text += " " + (other.kind === "left" ? T.diffHintLeft(a, b) : T.diffHintRight(a, b));
    else text += " " + T.hint(bestOpsText(t));
    type = "hint";
  }
  state.message = { type, text };
  state.diff = null;
  state.phase = "transform";
  advancePhase();
  render();
}

function cancelDiff() {
  state.diff = null;
  state.phase = "transform";
  state.message = null;
  render();
}

function advancePhase() {
  if (state.phase === "transform" && !findFirst(state.expr, n => n.n === "t")) {
    state.phase = "read";
    state.wrongCell = null;
  }
}

function handleCell(row, col) {
  const path = activePath();
  const phi = getAt(state.expr, path);
  const targetRow = Math.floor(phi.z / 10);
  const targetCol = phi.z % 10;
  state.mirrorFrom = null;

  if (row !== targetRow || col !== targetCol) {
    let text = T.readBothWrong(fmtZ(phi.z));
    if (row === targetRow) text = T.readRowOk;
    else if (col === targetCol) text = T.readColOk;
    state.wrongCell = [row, col];
    state.message = { type: "wrong", text };
    render();
    return;
  }

  const { value } = tableValue(phi.z);
  setAt(path, { n: "val", v: value, z: phi.z });
  // Ablesungen eines Rechenwegs werden in einer gemeinsamen „≈“-Zeile gesammelt.
  const last = state.lines[state.lines.length - 1];
  if (last.rel === "≈") state.lines.pop();
  pushLine("≈");
  state.wrongCell = null;
  state.lastStep = null;
  state.message = { type: "correct", text: T.readCorrect(phiText(phi.z), fmtProb(value)) };

  if (!findFirst(state.expr, n => n.n === "phi")) finishTask();
  render();
}

function finishTask() {
  // Zwischenschritt für verschachtelte Gegenereignisse, z. B. 0,8907 − (1 − 0,8413).
  if (state.expr.n === "df" && (state.expr.l.n === "om" || state.expr.r.n === "om")) {
    for (const key of ["l", "r"]) {
      if (state.expr[key].n === "om") state.expr[key] = { n: "val", v: evalNode(state.expr[key]) };
    }
    pushLine("=");
  }
  const value = evalNode(state.expr);
  if (state.expr.n !== "val") {
    state.expr = { n: "val", v: value };
    pushLine("=");
  }
  state.result = value;
  state.phase = "result";
  state.message = null;
  const id = currentTask().id;
  if (!progress.solved.includes(id)) progress.solved.push(id);
  writeProgress();
}

/* --------------------------------------------------------------------------
   Rendering
   -------------------------------------------------------------------------- */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function button(label, className, onClick) {
  const node = el("button", className, label);
  node.type = "button";
  node.addEventListener("click", onClick);
  return node;
}

function shuffle(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function render() {
  taskBadge.textContent = T.badge(state.index + 1, TASKS.length);
  statusLine.textContent = T.phase[state.phase];
  renderProgress();

  // In der Ablese-Phase erhält die Tabelle die volle Breite.
  const layout = el("div", "nq-layout" + (state.phase === "read" ? " is-read" : ""));
  const pathArea = el("div", "nq-path");
  const graphArea = el("div", "nq-graph");
  const actionArea = el("div", "nq-actions");
  layout.append(pathArea, graphArea, actionArea);
  stage.replaceChildren(layout);

  renderPath(pathArea);
  renderGraph(graphArea);

  if (state.phase === "transform") renderTransformActions(actionArea);
  else if (state.phase === "diff") renderDiffActions(actionArea);
  else if (state.phase === "read") renderReadActions(actionArea);
  else renderResult(actionArea);
}

function renderProgress() {
  progressNav.replaceChildren();
  TASKS.forEach((task, i) => {
    const solved = progress.solved.includes(task.id);
    const chip = button(String(i + 1), "nq-chip" + (solved ? " is-solved" : "") + (i === state.index ? " is-current" : ""), () => startTask(i));
    chip.setAttribute("aria-label", T.progressLabel(i + 1, solved));
    if (i === state.index) chip.setAttribute("aria-current", "step");
    progressNav.appendChild(chip);
  });
}

function renderPath(container) {
  container.appendChild(el("div", "nq-task-label", T.task));
  container.appendChild(el("div", "nq-task-term", termText(currentTask().term)));
  container.appendChild(el("div", "nq-section-title", T.pathTitle));

  const list = el("div", "nq-lines");
  const active = activePath();
  state.lines.forEach((line, i) => {
    const isLast = i === state.lines.length - 1;
    const row = el("div", "nq-line" + (isLast && state.phase === "result" ? " is-result" : ""));
    row.appendChild(el("span", "nq-rel", line.rel));
    const expr = el("span", "nq-expr");
    expr.appendChild(nodeDom(line.expr, isLast ? active : null));
    row.appendChild(expr);
    list.appendChild(row);
  });
  container.appendChild(list);
}

function renderMessage(container) {
  if (!state.message) return;
  container.appendChild(el("div", `nq-message is-${state.message.type}`, state.message.text));
}

function renderTransformActions(container) {
  renderMessage(container);
  container.appendChild(el("div", "nq-question", T.transformQuestion));
  const row = el("div", "nq-op-row");
  ["read", "comp", "sym", "diff"].forEach(op => {
    row.appendChild(button(T.ops[op], "nq-op-button", () => handleOp(op)));
  });
  container.appendChild(row);
}

function renderDiffActions(container) {
  const d = state.diff;
  container.appendChild(el("div", "nq-question", T.diffQuestion));

  const equation = el("div", "nq-diff-equation");
  equation.append(
    el("span", "nq-atom is-active", termText(d.term)),
    " = ",
    el("span", "nq-slot" + (d.m ? " is-filled" : ""), d.m ? termText(d.m) : T.open),
    " − ",
    el("span", "nq-slot" + (d.s ? " is-filled" : ""), d.s ? termText(d.s) : T.open)
  );
  container.appendChild(equation);

  const groups = el("div", "nq-diff-groups");
  groups.appendChild(diffGroup(T.diffMinuend, d.mOptions, d.m, choice => { d.m = choice; state.message = null; render(); }));
  groups.appendChild(diffGroup(T.diffSubtrahend, d.sOptions, d.s, choice => { d.s = choice; state.message = null; render(); }));
  container.appendChild(groups);

  renderMessage(container);

  const actions = el("div", "nq-action-row");
  actions.appendChild(button(T.diffCancel, "secondary-button", cancelDiff));
  const check = button(T.diffCheck, "", checkDiff);
  check.disabled = !(d.m && d.s);
  actions.appendChild(check);
  container.appendChild(actions);
}

function diffGroup(label, options, selected, onSelect) {
  const group = el("div", "nq-diff-group");
  group.appendChild(el("div", "nq-group-label", label));
  const row = el("div", "nq-choice-row");
  options.forEach(option => {
    const isSelected = selected && sameTerm(option, selected);
    const b = button(termText(option), "nq-choice" + (isSelected ? " is-selected" : ""), () => onSelect(option));
    b.setAttribute("aria-pressed", isSelected ? "true" : "false");
    row.appendChild(b);
  });
  group.appendChild(row);
  return group;
}

function renderReadActions(container) {
  renderMessage(container);
  const phi = getAt(state.expr, activePath());
  container.appendChild(el("div", "nq-question", T.readQuestion(phiText(phi.z))));
  const wrap = el("div", "nq-table-wrap");
  container.appendChild(wrap);
  // Spaltenzahl hängt von der tatsächlich verfügbaren Breite ab (Handy: Ausschnitt).
  renderTable(wrap, phi.z, wrap.clientWidth);
}

// Tabellenausschnitt: 8 Zeilen; bei genügend Breite alle 10 Spalten, sonst 6.
// Die Lage des Zielwerts im Ausschnitt variiert, damit sie nichts verrät.
function renderTable(wrap, z, width) {
  const targetRow = Math.floor(z / 10);
  const targetCol = z % 10;
  const nRows = 8;
  const nCols = width >= 520 ? 10 : 6;
  const seed = state.index * 7 + targetRow * 3 + targetCol;
  const rowStart = clamp(targetRow - (2 + seed % 4), 0, PHI_TABLE_ROWS.length - nRows);
  const colStart = clamp(targetCol - (1 + seed % (nCols === 10 ? 1 : 4)), 0, 10 - nCols);

  wrap.replaceChildren();
  wrap.appendChild(el("div", "nq-table-caption", T.tableCaption));
  const table = el("table", "nq-table");
  const head = el("tr");
  head.appendChild(el("th", "nq-corner", "z"));
  for (let c = colStart; c < colStart + nCols; c++) {
    head.appendChild(el("th", "nq-col-head", PHI_COL_LABELS[c]));
  }
  const thead = el("thead");
  thead.appendChild(head);
  table.appendChild(thead);

  const tbody = el("tbody");
  for (let r = rowStart; r < rowStart + nRows; r++) {
    const tr = el("tr");
    tr.appendChild(el("th", "nq-row-head", PHI_ROW_LABELS[r]));
    for (let c = colStart; c < colStart + nCols; c++) {
      const td = el("td");
      const isWrong = state.wrongCell && state.wrongCell[0] === r && state.wrongCell[1] === c;
      const cell = button(PHI_TABLE_ROWS[r][c], "nq-cell" + (isWrong ? " is-wrong" : ""), () => handleCell(r, c));
      cell.setAttribute("aria-label", T.cellLabel(PHI_ROW_LABELS[r], PHI_COL_LABELS[c], PHI_TABLE_ROWS[r][c]));
      cell.dataset.row = String(r - rowStart);
      cell.dataset.col = String(c - colStart);
      td.appendChild(cell);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrap.appendChild(table);
  wrap.appendChild(el("div", "nq-table-help", T.tableHelp));
  wireTableHighlight(table);
}

// Zeile und Spalte der Zelle unter Maus bzw. Fokus hervorheben (wie Video 7, Kapitel 8).
function wireTableHighlight(table) {
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const colHeads = Array.from(table.querySelectorAll(".nq-col-head"));
  const clear = () => table.querySelectorAll(".is-line").forEach(n => n.classList.remove("is-line"));
  const mark = cell => {
    clear();
    const r = Number(cell.dataset.row);
    const c = Number(cell.dataset.col);
    rows[r].querySelector(".nq-row-head").classList.add("is-line");
    colHeads[c].classList.add("is-line");
    rows[r].querySelectorAll(".nq-cell").forEach((n, j) => { if (j <= c) n.classList.add("is-line"); });
    rows.forEach((row, i) => { if (i <= r) row.querySelectorAll(".nq-cell")[c].classList.add("is-line"); });
  };
  table.querySelectorAll(".nq-cell").forEach(cell => {
    cell.addEventListener("mouseenter", () => mark(cell));
    cell.addEventListener("focus", () => mark(cell));
  });
  table.addEventListener("mouseleave", clear);
}

function renderResult(container) {
  renderMessage(container);
  const task = currentTask();
  const box = el("div", "nq-result");
  box.appendChild(el("div", "nq-result-title", T.resultTitle));
  box.appendChild(el("div", "nq-result-text", T.resultText(termText(task.term), fmtProb(state.result), fmtPercent(state.result))));

  box.appendChild(el("div", "nq-r-title", T.rTitle));
  const consoleBox = el("pre", "nq-console");
  consoleBox.textContent = `> ${task.r.call}\n[1] ${task.r.out}`;
  box.appendChild(consoleBox);
  const exact = Math.round(parseFloat(task.r.out) * 10000);
  box.appendChild(el("div", "nq-r-note", exact === state.result ? T.rSame : T.rDiff));
  container.appendChild(box);

  const actions = el("div", "nq-action-row");
  if (progress.solved.length === TASKS.length) actions.appendChild(el("div", "nq-all-solved", T.allSolved));
  if (state.index < TASKS.length - 1) actions.appendChild(button(T.next, "", () => startTask(state.index + 1)));
  else actions.appendChild(button(T.again, "", () => startTask(0)));
  container.appendChild(actions);
}

/* --------------------------------------------------------------------------
   Grafik: Dichte der Standardnormalverteilung mit Flächen
   -------------------------------------------------------------------------- */

const X_MIN = -3.5;
const X_MAX = 3.5;

function pdf(x) {
  return Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
  return node;
}

function termRegion(t) {
  if (t.k === "le") return [X_MIN, t.z / 100];
  if (t.k === "ge") return [t.z / 100, X_MAX];
  return [t.a / 100, t.b / 100];
}

function termBounds(t) {
  return t.k === "bw" ? [t.a, t.b] : [t.z];
}

// mini: kleine Skizze für Schritt-Erklärungen (ohne Achsenzahlen, größere Grenzbeschriftung)
function densityPlot(t, options = {}) {
  const mini = Boolean(options.mini);
  const W = mini ? 240 : 480;
  const H = mini ? 150 : 230;
  const pad = mini ? 10 : 18;
  const base = mini ? 112 : 176;
  const top = mini ? 12 : 16;
  const X = x => pad + (x - X_MIN) / (X_MAX - X_MIN) * (W - 2 * pad);
  const Y = y => base - y / 0.4 * (base - top);

  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: mini ? "nq-plot is-mini" : "nq-plot", role: "img" });
  svg.setAttribute("aria-label", t ? areaText(t) : "");

  const areaPath = (lo, hi) => {
    const a = clamp(lo, X_MIN, X_MAX);
    const b = clamp(hi, X_MIN, X_MAX);
    const steps = 80;
    let d = `M ${X(a).toFixed(1)} ${Y(0).toFixed(1)}`;
    for (let i = 0; i <= steps; i++) {
      const x = a + (b - a) * i / steps;
      d += ` L ${X(x).toFixed(1)} ${Y(pdf(x)).toFixed(1)}`;
    }
    return d + ` L ${X(b).toFixed(1)} ${Y(0).toFixed(1)} Z`;
  };

  svg.appendChild(svgEl("path", { d: areaPath(X_MIN, X_MAX), fill: COLORS.neutral, "fill-opacity": 0.45 }));

  const target = t ? svgEl("path", { d: areaPath(...termRegion(t)), fill: COLORS.area, "fill-opacity": 0.85 }) : null;
  if (target) svg.appendChild(target);

  let curve = "";
  for (let i = 0; i <= 140; i++) {
    const x = X_MIN + (X_MAX - X_MIN) * i / 140;
    curve += `${i ? "L" : "M"} ${X(x).toFixed(1)} ${Y(pdf(x)).toFixed(1)} `;
  }
  svg.appendChild(svgEl("path", { d: curve, fill: "none", stroke: COLORS.curve, "stroke-width": mini ? 2.2 : 2 }));
  svg.appendChild(svgEl("line", { x1: pad, x2: W - pad, y1: base, y2: base, stroke: COLORS.curve, "stroke-width": 1.2 }));

  if (!mini) {
    for (let k = -3; k <= 3; k++) {
      svg.appendChild(svgEl("line", { x1: X(k), x2: X(k), y1: base, y2: base + 5, stroke: COLORS.muted }));
      const label = svgEl("text", { x: X(k), y: base + 19, "text-anchor": "middle", class: "nq-tick" });
      label.textContent = k < 0 ? "−" + Math.abs(k) : String(k);
      svg.appendChild(label);
    }
  }

  if (t) {
    const bounds = termBounds(t);
    // Liegen zwei Grenzen eng beieinander, werden die Beschriftungen nach außen geschoben.
    const close = bounds.length === 2 && X(bounds[1] / 100) - X(bounds[0] / 100) < (mini ? 100 : 60);
    bounds.forEach((h, i) => {
      const x = X(h / 100);
      svg.appendChild(svgEl("line", { x1: x, x2: x, y1: base, y2: Y(pdf(h / 100)), stroke: COLORS.area, "stroke-width": mini ? 2 : 1.6 }));
      const anchor = close ? (i === 0 ? "end" : "start") : "middle";
      const dx = close ? (i === 0 ? -3 : 3) : 0;
      const label = svgEl("text", { x: x + dx, y: mini ? base + 26 : base + 40, "text-anchor": anchor, class: "nq-bound" });
      label.textContent = fmtZ(h);
      svg.appendChild(label);
    });
  }

  // Symmetrie: alte Fläche wird an der senkrechten Achse bei 0 auf die neue gespiegelt.
  if (options.mirrorFrom && target && !prefersReducedMotion()) {
    const ghost = svgEl("path", { d: areaPath(...termRegion(options.mirrorFrom)), fill: COLORS.area, "fill-opacity": 0.85 });
    svg.insertBefore(ghost, target);
    target.setAttribute("fill-opacity", "0");
    const x0 = X(0);
    const start = performance.now();
    const duration = 700;
    const frame = now => {
      const p = Math.min(1, (now - start) / duration);
      const s = Math.cos(Math.PI * p);
      ghost.setAttribute("transform", `translate(${x0} 0) scale(${s.toFixed(3)} 1) translate(${-x0} 0)`);
      if (p < 1) requestAnimationFrame(frame);
      else {
        ghost.remove();
        target.setAttribute("fill-opacity", "0.85");
      }
    };
    requestAnimationFrame(frame);
  }
  return svg;
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function renderGraph(container) {
  let term;
  let title;
  if (state.phase === "transform" || state.phase === "diff") {
    term = getAt(state.expr, activePath()).t;
    title = T.graphCurrent;
  } else if (state.phase === "read") {
    term = LE(getAt(state.expr, activePath()).z);
    title = T.graphRead;
  } else {
    term = currentTask().term;
    title = T.graphResult;
  }

  container.appendChild(el("div", "nq-section-title", title));
  const figure = el("figure", "nq-figure");
  figure.appendChild(densityPlot(term, { mirrorFrom: state.mirrorFrom }));
  const caption = el("figcaption", "nq-caption");
  caption.textContent = state.phase === "result"
    ? `${areaText(term)} ≈ ${fmtProb(state.result)}`
    : state.phase === "read"
      ? `${phiText(term.z)} = ${areaText(term)}`
      : areaText(term);
  figure.appendChild(caption);
  container.appendChild(figure);

  if (state.phase === "diff") {
    const d = state.diff;
    container.appendChild(stepStrip(T.diffPreview, [d.term, "=", d.m || null, "−", d.s || null]));
  } else if (state.lastStep && state.phase === "transform") {
    const s = state.lastStep;
    const parts = s.op === "comp" ? [s.before, "= 1 −", s.parts[0]]
      : s.op === "sym" ? [s.before, "=", s.parts[0]]
        : [s.before, "=", s.parts[0], "−", s.parts[1]];
    container.appendChild(stepStrip(T.stepTitle(T.ops[s.op]), parts));
  }
}

// Reihe kleiner Skizzen mit Rechenzeichen, z. B. [Fläche] = 1 − [Fläche].
function stepStrip(title, parts) {
  const wrap = el("div", "nq-strip");
  wrap.appendChild(el("div", "nq-strip-title", title));
  const row = el("div", "nq-strip-row");
  parts.forEach(part => {
    if (typeof part === "string") {
      row.appendChild(el("span", "nq-strip-op", part));
      return;
    }
    const cell = el("div", "nq-strip-cell");
    if (part) {
      cell.appendChild(densityPlot(part, { mini: true }));
      cell.appendChild(el("div", "nq-strip-label", termText(part)));
    } else {
      cell.classList.add("is-empty");
      cell.appendChild(el("div", "nq-strip-placeholder", T.open));
    }
    row.appendChild(cell);
  });
  wrap.appendChild(row);
  return wrap;
}

/* --------------------------------------------------------------------------
   Start
   -------------------------------------------------------------------------- */

restartButton.addEventListener("click", () => startTask(state.index));

// Tabellenausschnitt bei Breitenänderung (z. B. Drehen des Handys) neu aufbauen.
let resizeTimer = null;
window.addEventListener("resize", () => {
  if (state.phase !== "read") return;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(render, 150);
});

startTask(progress.current);
