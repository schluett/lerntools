// app.js – Phasensteuerung, Bewertung, Fortschritt und Texte (I18N) für das Quiz „Ableitungen“.
// Ablauf je Aufgabe wie in tasks.js hinterlegt: pro Klick eine Entscheidung; falsche Wahl →
// Rückmeldung, Rechenweg bleibt, neuer Versuch. Keine Zufallselemente.

const stage = document.getElementById("dqStage");
const statusLine = document.getElementById("statusLine");
const taskBadge = document.getElementById("taskBadge");
const progressNav = document.getElementById("progressNav");
const restartButton = document.getElementById("restartButton");
const copyButton = document.getElementById("copyButton");

const LANG = (document.documentElement.lang || "de").toLowerCase().startsWith("en") ? "en" : "de";
const STORE_KEY = LANG === "en" ? "mathe_diff_quiz_ableitungen_progress_en_v1" : "mathe_diff_quiz_ableitungen_progress_v1";
const LETTERS = ["A", "B", "C", "D"];

const I18N = {
  de: {
    locale: "de-DE",
    quizName: "Quiz Ableitungen",
    badge: (i, n) => `Aufgabe ${i} von ${n}`,
    progressLabel: (i, st) => `Aufgabe ${i}` + (st === 1 ? ", ohne Fehler gelöst" : st === 2 ? ", mit Fehlern gelöst" : ", offen"),
    taskLabel: "Leiten Sie ab:",
    pathTitle: "Rechenweg",
    treeTitle: "Strukturbaum",
    // Review 1: Die Statuszeile nennt nur die Phase – nie die gesuchte Regel.
    phases: { struct: "Erster Schritt", rewrite: "Umformen", parts: "Bausteine benennen", deriv: "Teilableitungen",
              combine: "Zusammensetzen", simplify: "Zusammenfassen", subst: "v einsetzen", result: "Ergebnis" },
    phaseLine: p => `Phase: ${p}`,
    tags: { sum: "Summenregel", prod: "Produktregel", quot: "Quotientenregel", chain: "Kettenregel", power: "Potenzregel" },
    derivLabel: "Ableitung:",
    ruleTitles: { sum: "Summenregel", const: "Konstante Funktion", power: "Potenzregel",
                  exp: "Exponentialfunktion", ln: "Natürlicher Logarithmus", rewrite: "Umformen",
                  quotient: "Quotientenregel", product: "Produktregel", chain: "Kettenregel" },
    ruleNotes: {
      sum: "Jeder Summand wird einzeln abgeleitet; eine additive Konstante fällt weg.",
      constGraph: "Eine waagerechte Gerade hat überall die Steigung 0.",
      power: "Der Exponent wandert als Faktor nach vorn; oben steht danach $n - 1$. Ein konstanter Faktor bleibt stehen.",
      expGraph: "Bei $e^x$ ist die Steigung an jeder Stelle gleich dem Funktionswert.",
      lnGraph: "Bei $\\ln x$ ist die Steigung an der Stelle $x$ gleich $\\frac{1}{x}$.",
      rewrite: "Umformen ändert die Funktion nicht, nur ihre Schreibweise – oft genügt danach eine einfachere Regel.",
      quotient: "Zuerst wird der Zähler abgeleitet: $u' \\cdot v - u \\cdot v'$; im Nenner steht $v^2$.",
      product: "Erster Faktor abgeleitet mal zweiter Faktor, plus erster Faktor mal zweiter Faktor abgeleitet.",
      chain: "Äußere Ableitung mal innere Ableitung: zuerst $u'(v) \\cdot v'(x)$ mit $v$ bilden, im letzten Schritt für $v$ die innere Funktion einsetzen."
    },
    slopeLabel: (x, y, s) => `x = ${x}: Steigung ${s}`,
    plotTitle: "Kontrolle am Graphen",
    plotAria: "Oben f mit Tangente, unten die Ableitung mit dem Punkt an derselben Stelle",
    plotSlider: v => `Stelle $${v}_0$`,
    plotNumbers: (v, f, x0, d) => `$${v}_0 = ${x0}$: Steigung der Tangente $= ${f}'(${v}_0) \\approx ${d}$`,
    plotNote: (v, f) => `Die Steigung der Tangente an $${f}$ bei $${v}_0$ ist der Funktionswert von $${f}'$ bei $${v}_0$.`,
    constsNote: c => `Für die Grafik: ${c}.`,
    correct: "Richtig.",
    altCorrect: "Richtig – das ist ein anderer, ebenfalls korrekter Weg.",
    resultTitle: errors => errors ? "Aufgabe gelöst – mit Fehlversuchen." : "Aufgabe gelöst – ohne Fehler.",
    resultFinal: "Ergebnis",
    nextTask: "Nächste Aufgabe",
    toOverview: "Übersicht",
    allDone: n => `Alle ${n} Aufgaben gelöst.`,
    overviewTitle: "Übersicht je Regel",
    overviewRow: (name, clean, total) => `${name}: ${clean} von ${total} Aufgaben ohne Fehler`,
    overviewRetry: "Mit Fehlversuchen:",
    ruleNames: { sum: "Summenregel", power: "Potenzregel", basic: "Grundableitungen (eˣ, ln x)",
                 rewrite: "Funktionsterm umformen", product: "Produktregel", quotient: "Quotientenregel", chain: "Kettenregel" },
    copied: "Position kopiert.",
    copyText: (i, plain, phase) => `${"Quiz Ableitungen"} · Aufgabe ${i} · ${plain} · Phase ${phase}`,
    keysHint: "Tasten A–D wählen eine Option."
  },
  en: {
    locale: "en-GB",
    quizName: "Quiz Derivatives",
    badge: (i, n) => `Task ${i} of ${n}`,
    progressLabel: (i, st) => `Task ${i}` + (st === 1 ? ", solved without errors" : st === 2 ? ", solved with errors" : ", open"),
    taskLabel: "Differentiate:",
    pathTitle: "Working",
    treeTitle: "Structure tree",
    phases: { struct: "First step", rewrite: "Rewriting", parts: "Naming the building blocks", deriv: "Partial derivatives",
              combine: "Combining", simplify: "Simplifying", subst: "Substituting v", result: "Result" },
    phaseLine: p => `Phase: ${p}`,
    tags: { sum: "Sum rule", prod: "Product rule", quot: "Quotient rule", chain: "Chain rule", power: "Power rule" },
    derivLabel: "Derivative:",
    ruleTitles: { sum: "Sum rule", const: "Constant function", power: "Power rule",
                  exp: "Exponential function", ln: "Natural logarithm", rewrite: "Rewriting",
                  quotient: "Quotient rule", product: "Product rule", chain: "Chain rule" },
    ruleNotes: {
      sum: "Each term is differentiated separately; an additive constant vanishes.",
      constGraph: "A horizontal line has slope 0 everywhere.",
      power: "The exponent moves to the front as a factor; the new exponent is $n - 1$. A constant factor remains.",
      expGraph: "For $e^x$, the slope at every point equals the function value.",
      lnGraph: "For $\\ln x$, the slope at the point $x$ equals $\\frac{1}{x}$.",
      rewrite: "Rewriting does not change the function, only how it is written – often a simpler rule is then enough.",
      quotient: "The numerator is differentiated first: $u' \\cdot v - u \\cdot v'$; the denominator is $v^2$.",
      product: "First factor differentiated times second factor, plus first factor times second factor differentiated.",
      chain: "Outer derivative times inner derivative: first form $u'(v) \\cdot v'(x)$ with $v$, then in the last step substitute the inner function for $v$."
    },
    slopeLabel: (x, y, s) => `x = ${x}: slope ${s}`,
    plotTitle: "Check on the graph",
    plotAria: "Top: f with tangent; bottom: the derivative with the point at the same position",
    plotSlider: v => `Point $${v}_0$`,
    plotNumbers: (v, f, x0, d) => `$${v}_0 = ${x0}$: slope of the tangent $= ${f}'(${v}_0) \\approx ${d}$`,
    plotNote: (v, f) => `The slope of the tangent to $${f}$ at $${v}_0$ is the function value of $${f}'$ at $${v}_0$.`,
    constsNote: c => `For the graph: ${c}.`,
    correct: "Correct.",
    altCorrect: "Correct – this is a different route that also works.",
    resultTitle: errors => errors ? "Task solved – with incorrect attempts." : "Task solved – without errors.",
    resultFinal: "Result",
    nextTask: "Next task",
    toOverview: "Overview",
    allDone: n => `All ${n} tasks solved.`,
    overviewTitle: "Overview by rule",
    overviewRow: (name, clean, total) => `${name}: ${clean} of ${total} tasks without errors`,
    overviewRetry: "With incorrect attempts:",
    ruleNames: { sum: "Sum rule", power: "Power rule", basic: "Basic derivatives (eˣ, ln x)",
                 rewrite: "Rewriting the function", product: "Product rule", quotient: "Quotient rule", chain: "Chain rule" },
    copied: "Position copied.",
    copyText: (i, plain, phase) => `Quiz Derivatives · Task ${i} · ${plain} · Phase ${phase}`,
    keysHint: "Keys A–D select an option."
  }
};
const T = I18N[LANG] || I18N.de;

// Englische Fassung: Aufgabentexte aus tasks_en.js (Struktur und Optionen bleiben gleich).
if (LANG === "en" && typeof localizeTasks === "function") localizeTasks(TASKS);

// Regelbilder dürfen vor der Wahl nur erscheinen, wenn die Regel schon gewählt wurde.
const RULE_BEFORE = ["parts", "combine", "simplify", "subst"];

/* ------------------------------------------------------------------ Zustand */

const state = {
  index: 0, route: "main", steps: [], tree: [], stepIdx: 0, ns: {}, active: null,
  lines: [], message: null, wrong: new Set(), errors: false, rule: null, done: false, altNote: null
};

let progress = readProgress();

function readProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    const status = parsed.status && typeof parsed.status === "object" ? parsed.status : {};
    const current = Number.isInteger(parsed.current) && parsed.current >= 0 && parsed.current < TASKS.length ? parsed.current : 0;
    return { status, current };
  } catch (_) {
    return { status: {}, current: 0 };
  }
}

function writeProgress() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (_) { /* no-op */ }
}

function task() { return TASKS[state.index]; }
function step() { return state.steps[state.stepIdx]; }

function useTree(nodes) {
  state.tree = nodes;
  state.ns = {};
  nodes.forEach(n => { state.ns[n.id] = { shown: !n.parent, tag: null, done: null, label: null }; });
  state.active = nodes[0].id;
}

function startTask(index) {
  const t = TASKS[index];
  Object.assign(state, { index, route: "main", steps: t.steps, stepIdx: 0, lines: [t.f], message: null,
                         wrong: new Set(), errors: false, done: false, altNote: null, rule: null });
  useTree(t.tree);
  state.rule = null;
  runAutos();
  progress.current = index;
  writeProgress();
  try { history.replaceState(null, "", `#${index + 1}`); } catch (_) { /* file:// */ }
  render();
}

function applyStep(s) {
  (s.lines || []).forEach(l => state.lines.push(l));
  const tr = s.tree || {};
  Object.entries(tr.tag || {}).forEach(([id, tag]) => { state.ns[id].tag = tag; });
  (tr.show || []).forEach(id => { state.ns[id].shown = true; });
  Object.entries(tr.relabel || {}).forEach(([id, tex]) => { state.ns[id].label = tex; });
  Object.entries(tr.done || {}).forEach(([id, tex]) => { state.ns[id].done = tex; state.ns[id].shown = true; });
  if (tr.active) state.active = tr.active;
  if (s.rule) state.rule = s.rule;
}

function runAutos() {
  while (state.stepIdx < state.steps.length && step().phase === "auto") {
    applyStep(step());
    state.stepIdx++;
  }
  if (state.stepIdx >= state.steps.length) finishTask();
}

function choose(i) {
  if (state.done) return;
  const s = step();
  const opt = s.opts[i];
  if (!opt || state.wrong.has(i)) return;
  const [, ok, fb] = opt;
  if (ok === 0 || ok === "hint") {
    state.wrong.add(i);
    if (ok === 0) state.errors = true;
    state.message = { type: ok === 0 ? "wrong" : "hint", text: fb || "" };
    render();
    return;
  }
  applyStep(s);
  state.wrong = new Set();
  if (ok === "alt") {
    const alt = task().alt;
    state.route = "alt";
    state.altNote = alt.note;
    state.steps = alt.steps;
    state.stepIdx = 0;
    useTree(alt.tree);
    state.message = { type: "correct", text: T.altCorrect };
  } else {
    state.message = { type: "correct", text: fb ? `${T.correct} ${fb}` : T.correct };
    state.stepIdx++;
  }
  runAutos();
  render();
}

function finishTask() {
  state.done = true;
  state.active = null;
  const id = task().id;
  const before = progress.status[id];
  // Ein früher fehlerfreier Durchgang bleibt grün.
  progress.status[id] = before === 1 ? 1 : (state.errors ? 2 : 1);
  writeProgress();
}

/* ------------------------------------------------------------------ Darstellung */

function button(label, className, onClick) {
  const node = el("button", className, label);
  node.type = "button";
  node.addEventListener("click", onClick);
  return node;
}

function phaseName() {
  if (state.done) return T.phases.result;
  return T.phases[step().phase];
}

function render() {
  const t = task();
  taskBadge.textContent = T.badge(state.index + 1, TASKS.length);

  statusLine.textContent = T.phaseLine(phaseName());
  renderProgress();

  const layout = el("div", "dq-layout");
  const pathArea = el("div", "dq-path");
  const graphArea = el("div", "dq-graph");
  const actionArea = el("div", "dq-actions");
  layout.append(pathArea, actionArea, graphArea);
  stage.replaceChildren(layout);

  // Aufgabe und Rechenweg
  pathArea.appendChild(el("div", "dq-task-label", T.taskLabel));
  pathArea.appendChild(texEl("div", "dq-task-term", t.f, true));
  if (t.note) pathArea.appendChild(texEl("div", "dq-task-note", t.note));
  pathArea.appendChild(el("div", "dq-section-title", T.pathTitle));
  const list = el("div", "dq-lines");
  state.lines.slice(1).forEach((line, i, arr) => {
    const row = el("div", "dq-line" + (i === arr.length - 1 ? " is-new" : "") + (state.done && i === arr.length - 1 ? " is-result" : ""));
    texInto(row, String.raw`\displaystyle ` + line);
    list.appendChild(row);
  });
  if (!state.done) list.appendChild(el("div", "dq-line is-open", "…"));
  pathArea.appendChild(list);

  // Grafik: Strukturbaum und Regelbild bzw. Doppelplot
  graphArea.appendChild(el("div", "dq-section-title", T.treeTitle));
  renderTree(graphArea, state.tree, state.ns, state.active);
  if (state.done) doublePlot(graphArea, t);
  else {
    const s = step();
    renderRule(graphArea, RULE_BEFORE.includes(s.phase) && s.rule ? s.rule : state.rule, t);
  }

  // Aktionen
  if (state.message) actionArea.appendChild(mixedInto(el("div", `dq-message is-${state.message.type}`), state.message.text));
  if (state.done) renderResult(actionArea);
  else renderQuestion(actionArea);
}

function renderProgress() {
  progressNav.replaceChildren();
  TASKS.forEach((tk, i) => {
    const st = progress.status[tk.id];
    const chip = button(String(i + 1), "dq-chip" + (st === 1 ? " is-solved" : st === 2 ? " is-mixed" : "") + (i === state.index ? " is-current" : ""), () => startTask(i));
    chip.setAttribute("aria-label", T.progressLabel(i + 1, st));
    if (i === state.index) chip.setAttribute("aria-current", "step");
    progressNav.appendChild(chip);
  });
}

function renderQuestion(container) {
  const s = step();
  container.appendChild(mixedInto(el("div", "dq-question"), s.q));
  const row = el("div", "dq-options" + (s.opts.some(o => o[0].startsWith("T:")) ? " is-text" : ""));
  s.opts.forEach((o, i) => {
    const b = el("button", "dq-option" + (state.wrong.has(i) ? " is-wrong" : ""));
    b.type = "button";
    b.disabled = state.wrong.has(i);
    b.appendChild(el("span", "dq-letter", LETTERS[i]));
    b.appendChild(labelInto(el("span", "dq-option-label"), o[0]));
    b.addEventListener("click", () => choose(i));
    row.appendChild(b);
  });
  container.appendChild(row);
  container.appendChild(el("div", "dq-keys", T.keysHint));
}

function renderResult(container) {
  const t = task();
  const box = el("div", "dq-result");
  box.appendChild(el("div", "dq-result-title", T.resultTitle(state.errors)));
  if (state.altNote) box.appendChild(mixedInto(el("div", "dq-result-text"), state.altNote));
  (t.extra || []).forEach(x => box.appendChild(texEl("div", "dq-result-extra", x)));
  container.appendChild(box);

  const allSolved = TASKS.every(tk => progress.status[tk.id]);
  if (allSolved) renderOverview(container);
  const actions = el("div", "dq-action-row");
  if (state.index < TASKS.length - 1) actions.appendChild(button(T.nextTask, "", () => startTask(state.index + 1)));
  else {
    const firstOpen = TASKS.findIndex(tk => !progress.status[tk.id]);
    if (firstOpen >= 0) actions.appendChild(button(T.nextTask, "", () => startTask(firstOpen)));
  }
  container.appendChild(actions);
}

function renderOverview(container) {
  const box = el("div", "dq-overview");
  box.appendChild(el("div", "dq-result-title", T.allDone(TASKS.length)));
  box.appendChild(el("div", "dq-section-title", T.overviewTitle));
  Object.keys(T.ruleNames).forEach(key => {
    const tasks = TASKS.filter(tk => tk.rules.includes(key));
    if (!tasks.length) return;
    const clean = tasks.filter(tk => progress.status[tk.id] === 1).length;
    const row = el("div", "dq-overview-row", T.overviewRow(T.ruleNames[key], clean, tasks.length));
    const retry = tasks.filter(tk => progress.status[tk.id] === 2);
    if (retry.length) {
      row.appendChild(el("span", "dq-overview-retry", ` ${T.overviewRetry} `));
      retry.forEach(tk => row.appendChild(button(String(tk.id), "dq-chip is-mixed is-small", () => startTask(TASKS.indexOf(tk)))));
    }
    box.appendChild(row);
  });
  container.appendChild(box);
}

/* ------------------------------------------------------------------ Bedienung */

restartButton.addEventListener("click", () => startTask(state.index));

copyButton.addEventListener("click", () => {
  const text = T.copyText(state.index + 1, task().plain, phaseName());
  const done = () => { statusLine.textContent = T.copied; setTimeout(render, 1400); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  else fallbackCopy(text, done);
});

function fallbackCopy(text, done) {
  const ta = el("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (_) { /* no-op */ }
  ta.remove();
  done();
}

document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (["INPUT", "TEXTAREA"].includes(document.activeElement && document.activeElement.tagName)) return;
  const i = LETTERS.indexOf(e.key.toUpperCase());
  if (i >= 0 && !state.done && i < step().opts.length) { e.preventDefault(); choose(i); }
});

window.addEventListener("hashchange", () => {
  const n = parseInt(location.hash.slice(1), 10);
  if (n >= 1 && n <= TASKS.length && n - 1 !== state.index) startTask(n - 1);
});

let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(render, 150);
});

(function init() {
  if (/[?&]check\b/.test(location.search) && typeof runChecks === "function") { runChecks(stage); return; }
  const n = parseInt(location.hash.slice(1), 10);
  startTask(n >= 1 && n <= TASKS.length ? n - 1 : progress.current);
})();
