const stage = document.getElementById("rankStage");
const statusLine = document.getElementById("statusLine");
const exampleBadge = document.getElementById("exampleBadge");
const restartButton = document.getElementById("restartButton");
const newExampleButton = document.getElementById("newExampleButton");

const LANG = (document.documentElement.lang || "de").toLowerCase().startsWith("en") ? "en" : "de";
const ROMAN = ["I", "II", "III", "IV"];
const HISTORY_KEY = "matrix_rank_quiz_recent_examples_v1";

const I18N = {
  de: {
    example: (id, total) => `Beispiel ${id} von ${total}`,
    phaseCheck: "Zeilenstufenform prüfen",
    phaseStep: "Nächsten Umformungsschritt bestimmen",
    phaseRanks: "Ränge bestimmen",
    phaseResult: "Auswertung",
    checkQuestion: "Ist die erweiterte Matrix bereits in Zeilenstufenform?",
    yes: "Ja",
    no: "Nein",
    checkCorrectYes: "Richtig. Die Matrix ist bereits in Zeilenstufenform.",
    checkCorrectNo: "Richtig. Die Matrix ist noch nicht in Zeilenstufenform.",
    checkWrongYes: "Noch nicht. Mindestens eine Bedingung der Zeilenstufenform ist verletzt.",
    checkWrongNo: "Die Matrix erfüllt bereits die Bedingungen der Zeilenstufenform.",
    nextStepQuestion: "Welche Zeilenumformung ist als nächstes sinnvoll?",
    correctStep: "Richtiger Schritt:",
    wrongStep: "Dieser Schritt führt hier nicht am direktesten zur Zeilenstufenform.",
    betterStep: "Günstiger nächster Schritt:",
    continue: "Weiter",
    ranksIntro: "Die Stufen sind eingezeichnet. Zählen Sie die Stufen im Bereich von A und in der gesamten erweiterten Matrix (A|b).",
    rankA: "rang(A)",
    rankAug: "rang(A|b)",
    checkRanks: "Prüfen",
    ranksWrong: "Mindestens eine Rangangabe stimmt noch nicht. Prüfen Sie die eingezeichneten Stufen noch einmal.",
    ranksCorrect: "Richtig.",
    numberVariables: "Anzahl Unbekannte n",
    conclusionUnique: "Damit besitzt das Gleichungssystem genau eine Lösung.",
    conclusionInfinite: "Damit besitzt das Gleichungssystem unendlich viele Lösungen.",
    conclusionNone: "Damit besitzt das Gleichungssystem keine Lösung.",
    newExample: "Neues Beispiel",
    rowBefore: "vorher",
    rowAfter: "nachher",
    swapText: "Beim Zeilentausch werden die beiden vollständigen Zeilen vertauscht.",
    A: "A",
    b: "b"
  },
  en: {
    example: (id, total) => `Example ${id} of ${total}`,
    phaseCheck: "Check row echelon form",
    phaseStep: "Choose the next row operation",
    phaseRanks: "Determine the ranks",
    phaseResult: "Result",
    checkQuestion: "Is the augmented matrix already in row echelon form?",
    yes: "Yes",
    no: "No",
    checkCorrectYes: "Correct. The matrix is already in row echelon form.",
    checkCorrectNo: "Correct. The matrix is not yet in row echelon form.",
    checkWrongYes: "Not yet. At least one condition for row echelon form is violated.",
    checkWrongNo: "The matrix already satisfies the conditions for row echelon form.",
    nextStepQuestion: "Which row operation is the most useful next step?",
    correctStep: "Correct step:",
    wrongStep: "This step does not lead most directly to row echelon form here.",
    betterStep: "Better next step:",
    continue: "Continue",
    ranksIntro: "The staircase is drawn in. Count the steps in A and in the full augmented matrix (A|b).",
    rankA: "rank(A)",
    rankAug: "rank(A|b)",
    checkRanks: "Check",
    ranksWrong: "At least one rank is still incorrect. Check the drawn staircase again.",
    ranksCorrect: "Correct.",
    numberVariables: "Number of unknowns n",
    conclusionUnique: "The linear system therefore has exactly one solution.",
    conclusionInfinite: "The linear system therefore has infinitely many solutions.",
    conclusionNone: "The linear system therefore has no solution.",
    newExample: "New example",
    rowBefore: "before",
    rowAfter: "after",
    swapText: "A row swap exchanges the two complete rows.",
    A: "A",
    b: "b"
  }
};

const T = I18N[LANG];

class Fraction {
  constructor(numerator, denominator = 1n) {
    let n = BigInt(numerator);
    let d = BigInt(denominator);
    if (d === 0n) throw new Error("division by zero");
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(absBigInt(n), d);
    this.n = n / g;
    this.d = d / g;
    Object.freeze(this);
  }

  static from(value) {
    if (value instanceof Fraction) return value;
    return new Fraction(BigInt(value));
  }

  add(other) { return new Fraction(this.n * other.d + other.n * this.d, this.d * other.d); }
  mul(other) { return new Fraction(this.n * other.n, this.d * other.d); }
  div(other) {
    if (other.isZero()) throw new Error("division by zero");
    return new Fraction(this.n * other.d, this.d * other.n);
  }
  neg() { return new Fraction(-this.n, this.d); }
  abs() { return new Fraction(absBigInt(this.n), this.d); }
  isZero() { return this.n === 0n; }
  eq(other) { return this.n === other.n && this.d === other.d; }
  toString() {
    const sign = this.n < 0n ? "−" : "";
    const a = absBigInt(this.n);
    return this.d === 1n ? `${sign}${a}` : `${sign}${a}/${this.d}`;
  }
}

function absBigInt(x) { return x < 0n ? -x : x; }
function gcd(a, b) {
  let x = a;
  let y = b;
  while (y !== 0n) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x === 0n ? 1n : x;
}

function F(x) { return Fraction.from(x); }

const EXAMPLES = [
  // 1–10: bereits in Zeilenstufenform
  { id: 1, matrix: [[1, 2, 5], [0, 1, 3]] },
  { id: 2, matrix: [[1, -2, 4], [0, 0, 0]] },
  { id: 3, matrix: [[1, 3, 2], [0, 0, 1]] },
  { id: 4, matrix: [[1, 2, 4], [0, 1, 1], [0, 0, 0]] },
  { id: 5, matrix: [[1, -1, 2], [0, 2, 5], [0, 0, 1]] },
  { id: 6, matrix: [[1, 2, 0, 5], [0, 0, 1, -1]] },
  { id: 7, matrix: [[1, 1, 2, 4], [0, 1, -1, 2], [0, 0, 2, 6]] },
  { id: 8, matrix: [[1, -2, 1, 3], [0, 0, 1, 4], [0, 0, 0, 0]] },
  { id: 9, matrix: [[1, 0, 2, 1], [0, 1, -1, 3], [0, 0, 1, 2], [0, 0, 0, 0]] },
  { id: 10, matrix: [[1, 2, 0, -1, 3], [0, 1, 3, 0, 2], [0, 0, 1, 4, -2], [0, 0, 0, 1, 5]] },

  // 11–20: fast in Zeilenstufenform; genau ein elementarer Zeilenschritt fehlt
  { id: 11, matrix: [[1, 2, 5], [1, 3, 8]] },
  { id: 12, matrix: [[1, -2, 4], [2, -4, 8]] },
  { id: 13, matrix: [[1, 3, 2], [-1, -3, -1]] },
  { id: 14, matrix: [[1, 2, 4], [0, 1, 1], [0, 2, 2]] },
  { id: 15, matrix: [[1, -1, 2], [0, 2, 5], [0, -2, -4]] },
  { id: 16, matrix: [[0, 0, 1, -1], [1, 2, 0, 5]] },
  { id: 17, matrix: [[1, 1, 2, 4], [0, 0, 2, 6], [0, 1, -1, 2]] },
  { id: 18, matrix: [[1, -2, 1, 3], [0, 0, 1, 4], [0, 0, -2, -8]] },
  { id: 19, matrix: [[1, 0, 2, 1], [0, 0, 1, 2], [0, 1, -1, 3], [0, 0, 0, 0]] },
  { id: 20, matrix: [[1, 2, 0, -1, 3], [0, 1, 3, 0, 2], [0, 0, 1, 4, -2], [0, 0, -1, -3, 7]] }
];

let currentExample = null;
let matrix = [];
let phase = "check";
let pendingOperation = null;
let rankAChoice = 0;
let rankAugChoice = 0;

function cloneMatrix(source) {
  return source.map(row => row.map(value => value instanceof Fraction ? value : F(value)));
}

function readHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter(x => Number.isInteger(x) && x >= 1 && x <= EXAMPLES.length).slice(-10) : [];
  } catch (_) {
    return [];
  }
}

function writeHistory(history) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-10))); } catch (_) { /* no-op */ }
}

function chooseNewExample() {
  const history = readHistory();
  const blocked = new Set(history.slice(-10));
  let candidates = EXAMPLES.filter(example => !blocked.has(example.id));
  if (!candidates.length) candidates = EXAMPLES.slice();
  currentExample = candidates[Math.floor(Math.random() * candidates.length)];
  writeHistory([...history, currentExample.id]);
  resetCurrentExample();
}

function resetCurrentExample() {
  matrix = cloneMatrix(currentExample.matrix);
  phase = "check";
  pendingOperation = null;
  rankAChoice = 0;
  rankAugChoice = 0;
  render();
}

function setStatus(text) {
  statusLine.textContent = text;
}

function render() {
  exampleBadge.textContent = T.example(currentExample.id, EXAMPLES.length);
  if (phase === "check") renderCheckPhase();
  else if (phase === "step") renderStepPhase();
  else if (phase === "confirm-step") renderStepConfirmation();
  else if (phase === "wrong-step") renderWrongStep();
  else if (phase === "ranks") renderRankPhase();
  else if (phase === "result") renderResultPhase();
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function renderCheckPhase() {
  setStatus(T.phaseCheck);
  stage.replaceChildren();
  stage.appendChild(renderMatrix(matrix));
  stage.appendChild(el("div", "rank-question", T.checkQuestion));

  const answers = el("div", "answer-row");
  const yes = el("button", "yes-no-button", T.yes);
  const no = el("button", "yes-no-button", T.no);
  yes.type = "button";
  no.type = "button";
  yes.addEventListener("click", () => handleEchelonAnswer(true, answers));
  no.addEventListener("click", () => handleEchelonAnswer(false, answers));
  answers.append(yes, no);
  stage.appendChild(answers);
}

function handleEchelonAnswer(answer, answersContainer) {
  const actuallyEchelon = isRowEchelon(matrix);
  const existing = stage.querySelector(".feedback-box");
  if (existing) existing.remove();

  if (answer === actuallyEchelon) {
    if (actuallyEchelon) {
      phase = "ranks";
      render();
    } else {
      phase = "step";
      render();
    }
    return;
  }

  const feedback = el("div", "feedback-box wrong", answer ? T.checkWrongYes : T.checkWrongNo);
  answersContainer.insertAdjacentElement("afterend", feedback);
}

function renderStepPhase() {
  setStatus(T.phaseStep);
  stage.replaceChildren();
  const operation = nextEchelonOperation(matrix);
  if (!operation) {
    phase = "ranks";
    render();
    return;
  }
  pendingOperation = operation;

  stage.appendChild(renderMatrix(matrix, { focus: focusCellsForOperation(operation) }));
  stage.appendChild(el("div", "rank-question", T.nextStepQuestion));

  const choices = buildChoices(operation, matrix);
  const list = el("div", "choice-list");
  choices.forEach(candidate => {
    const button = el("button", "choice-button", operationLabel(candidate));
    button.type = "button";
    button.addEventListener("click", () => {
      if (sameOperation(candidate, operation)) {
        pendingOperation = operation;
        phase = "confirm-step";
      } else {
        pendingOperation = operation;
        phase = "wrong-step";
      }
      render();
    });
    list.appendChild(button);
  });
  stage.appendChild(list);
}

function renderStepConfirmation() {
  setStatus(T.phaseStep);
  stage.replaceChildren();
  stage.appendChild(renderMatrix(matrix, { focus: focusCellsForOperation(pendingOperation) }));

  const box = el("div", "feedback-box correct");
  box.appendChild(el("div", "feedback-title", T.correctStep));
  box.appendChild(el("div", "operation-label", operationLabel(pendingOperation)));
  box.appendChild(renderOperationCalculation(matrix, pendingOperation));

  const actions = el("div", "feedback-actions");
  const cont = el("button", "", T.continue);
  cont.type = "button";
  cont.addEventListener("click", () => {
    matrix = applyOperation(matrix, pendingOperation);
    pendingOperation = null;
    phase = "check";
    render();
  });
  actions.appendChild(cont);
  box.appendChild(actions);
  stage.appendChild(box);
}

function renderWrongStep() {
  setStatus(T.phaseStep);
  stage.replaceChildren();
  stage.appendChild(renderMatrix(matrix, { focus: focusCellsForOperation(pendingOperation) }));
  const box = el("div", "feedback-box wrong");
  box.appendChild(el("div", "feedback-title", T.wrongStep));
  box.appendChild(el("div", "muted-note", T.betterStep));
  box.appendChild(el("div", "operation-label", operationLabel(pendingOperation)));

  const actions = el("div", "feedback-actions");
  const cont = el("button", "", T.continue);
  cont.type = "button";
  cont.addEventListener("click", () => {
    phase = "step";
    render();
  });
  actions.appendChild(cont);
  box.appendChild(actions);
  stage.appendChild(box);
}

function renderRankPhase() {
  setStatus(T.phaseRanks);
  stage.replaceChildren();
  stage.appendChild(renderMatrix(matrix, { staircase: true }));
  stage.appendChild(el("div", "rank-instruction", T.ranksIntro));

  const selectors = el("div", "rank-selectors");
  selectors.appendChild(renderRankSelector("A"));
  selectors.appendChild(renderRankSelector("Aug"));
  stage.appendChild(selectors);

  const submitRow = el("div", "rank-submit-row");
  const submit = el("button", "", T.checkRanks);
  submit.type = "button";
  submit.addEventListener("click", checkRankAnswers);
  submitRow.appendChild(submit);
  stage.appendChild(submitRow);
}

function renderRankSelector(which) {
  const isA = which === "A";
  const wrapper = el("div", "rank-selector");
  wrapper.appendChild(el("div", "rank-selector-label", isA ? T.rankA : T.rankAug));

  const up = el("button", "arrow-button", "▲");
  up.type = "button";
  up.setAttribute("aria-label", isA ? `${T.rankA} + 1` : `${T.rankAug} + 1`);
  const value = el("div", "rank-value", String(isA ? rankAChoice : rankAugChoice));
  const down = el("button", "arrow-button", "▼");
  down.type = "button";
  down.setAttribute("aria-label", isA ? `${T.rankA} − 1` : `${T.rankAug} − 1`);

  const n = matrix[0].length - 1;
  const maxValue = isA ? Math.min(matrix.length, n) : Math.min(matrix.length, n + 1);
  up.addEventListener("click", () => {
    if (isA) rankAChoice = Math.min(maxValue, rankAChoice + 1);
    else rankAugChoice = Math.min(maxValue, rankAugChoice + 1);
    value.textContent = String(isA ? rankAChoice : rankAugChoice);
  });
  down.addEventListener("click", () => {
    if (isA) rankAChoice = Math.max(0, rankAChoice - 1);
    else rankAugChoice = Math.max(0, rankAugChoice - 1);
    value.textContent = String(isA ? rankAChoice : rankAugChoice);
  });

  wrapper.append(up, value, down);
  return wrapper;
}

function checkRankAnswers() {
  const correctA = rankOfCoefficientPart(matrix);
  const correctAug = rankOfAugmented(matrix);
  const old = stage.querySelector(".feedback-box");
  if (old) old.remove();

  if (rankAChoice === correctA && rankAugChoice === correctAug) {
    phase = "result";
    render();
    return;
  }

  const submitRow = stage.querySelector(".rank-submit-row");
  submitRow.insertAdjacentElement("afterend", el("div", "feedback-box wrong", T.ranksWrong));
}

function renderResultPhase() {
  setStatus(T.phaseResult);
  stage.replaceChildren();
  stage.appendChild(renderMatrix(matrix, { staircase: true }));

  const rankA = rankOfCoefficientPart(matrix);
  const rankAug = rankOfAugmented(matrix);
  const n = matrix[0].length - 1;

  const box = el("div", "feedback-box correct");
  box.appendChild(el("div", "feedback-title", T.ranksCorrect));
  const grid = el("div", "result-grid");
  grid.appendChild(resultPair(T.rankA, rankA));
  grid.appendChild(resultPair(T.rankAug, rankAug));
  grid.appendChild(resultPair(T.numberVariables, n));
  box.appendChild(grid);

  let conclusion;
  if (rankA < rankAug) conclusion = T.conclusionNone;
  else if (rankA === n) conclusion = T.conclusionUnique;
  else conclusion = T.conclusionInfinite;
  box.appendChild(el("div", "solution-conclusion", conclusion));

  const actions = el("div", "feedback-actions");
  const next = el("button", "", T.newExample);
  next.type = "button";
  next.addEventListener("click", chooseNewExample);
  actions.appendChild(next);
  box.appendChild(actions);
  stage.appendChild(box);
}

function resultPair(label, value) {
  const wrap = el("div", "");
  wrap.appendChild(el("span", "", `${label}: `));
  wrap.appendChild(el("span", "result-value", String(value)));
  return wrap;
}

function renderMatrix(M, options = {}) {
  const n = M[0].length - 1;
  const area = el("div", "matrix-area");

  const caption = el("div", "matrix-caption");
  caption.style.gridTemplateColumns = `repeat(${n}, 62px) 62px`;
  const capA = el("div", "matrix-caption-a", T.A);
  capA.style.gridColumn = `1 / span ${n}`;
  const capB = el("div", "matrix-caption-b", T.b);
  capB.style.gridColumn = String(n + 1);
  caption.append(capA, capB);
  area.appendChild(caption);

  const shell = el("div", "matrix-shell");
  const table = el("table", "matrix-table");
  const tbody = document.createElement("tbody");
  const focus = options.focus || [];

  M.forEach((row, r) => {
    const tr = document.createElement("tr");
    row.forEach((value, c) => {
      const td = el("td", c === n ? "rhs-cell" : "", value.toString());
      td.dataset.row = String(r);
      td.dataset.col = String(c);
      if (focus.some(([fr, fc]) => fr === r && fc === c)) td.classList.add("focus-cell");
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  shell.appendChild(table);
  area.appendChild(shell);

  requestAnimationFrame(() => {
    const firstRowCells = table.rows[0]?.cells;
    if (firstRowCells && firstRowCells.length) {
      caption.style.gridTemplateColumns = Array.from(firstRowCells)
        .map(cell => `${cell.getBoundingClientRect().width}px`).join(" ");
    }
    if (options.staircase) drawStaircase(shell, table, pivotPositions(M));
  });
  return area;
}

function drawStaircase(shell, table, pivots) {
  const old = shell.querySelector(".matrix-overlay");
  if (old) old.remove();
  if (!pivots.length) return;

  const tableRect = table.getBoundingClientRect();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("matrix-overlay");
  svg.setAttribute("width", String(tableRect.width));
  svg.setAttribute("height", String(tableRect.height));
  svg.setAttribute("viewBox", `0 0 ${tableRect.width} ${tableRect.height}`);

  const xLeftOf = col => table.rows[0].cells[col].getBoundingClientRect().left - tableRect.left;
  const xRight = tableRect.width;
  const yBottomOf = row => table.rows[row].getBoundingClientRect().bottom - tableRect.top;

  let d = `M ${xLeftOf(pivots[0].col)} ${yBottomOf(pivots[0].row)}`;
  for (let i = 0; i < pivots.length; i += 1) {
    const current = pivots[i];
    const next = pivots[i + 1];
    const xTarget = next ? xLeftOf(next.col) : xRight;
    d += ` H ${xTarget}`;
    if (next) d += ` V ${yBottomOf(next.row)}`;
  }

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  svg.appendChild(path);
  shell.appendChild(svg);
}

function pivotPositions(M) {
  const pivots = [];
  for (let r = 0; r < M.length; r += 1) {
    const c = leadingIndex(M[r]);
    if (c !== -1) pivots.push({ row: r, col: c });
  }
  return pivots;
}

function leadingIndex(row) {
  for (let c = 0; c < row.length; c += 1) if (!row[c].isZero()) return c;
  return -1;
}

function isRowEchelon(M) {
  let previousLead = -1;
  let zeroRowSeen = false;
  for (let r = 0; r < M.length; r += 1) {
    const lead = leadingIndex(M[r]);
    if (lead === -1) {
      zeroRowSeen = true;
      continue;
    }
    if (zeroRowSeen || lead <= previousLead) return false;
    for (let rr = r + 1; rr < M.length; rr += 1) {
      if (!M[rr][lead].isZero()) return false;
    }
    previousLead = lead;
  }
  return true;
}

function nextEchelonOperation(M) {
  const rows = M.length;
  const cols = M[0].length;
  let pivotRow = 0;

  for (let col = 0; col < cols && pivotRow < rows; col += 1) {
    let candidate = -1;
    for (let r = pivotRow; r < rows; r += 1) {
      if (!M[r][col].isZero()) { candidate = r; break; }
    }
    if (candidate === -1) continue;

    if (M[pivotRow][col].isZero()) {
      return { type: "swap", r1: pivotRow, r2: candidate };
    }

    for (let r = pivotRow + 1; r < rows; r += 1) {
      if (!M[r][col].isZero()) {
        const factor = M[r][col].neg().div(M[pivotRow][col]);
        return { type: "add", target: r, source: pivotRow, factor };
      }
    }
    pivotRow += 1;
  }
  return null;
}

function applyOperation(M, operation) {
  const out = M.map(row => row.slice());
  if (operation.type === "swap") {
    const tmp = out[operation.r1];
    out[operation.r1] = out[operation.r2];
    out[operation.r2] = tmp;
    return out;
  }
  if (operation.type === "add") {
    out[operation.target] = out[operation.target].map((value, c) =>
      value.add(operation.factor.mul(out[operation.source][c]))
    );
  }
  return out;
}

function focusCellsForOperation(operation) {
  if (operation.type === "swap") {
    const firstNonzero = leadingIndex(matrix[operation.r2]);
    const c = firstNonzero === -1 ? 0 : firstNonzero;
    return [[operation.r1, c], [operation.r2, c]];
  }
  const col = firstDifferentColumnForAdd(operation);
  return [[operation.source, col], [operation.target, col]];
}

function firstDifferentColumnForAdd(operation) {
  for (let c = 0; c < matrix[0].length; c += 1) {
    if (!matrix[operation.target][c].isZero() && !matrix[operation.source][c].isZero()) return c;
  }
  return 0;
}

function operationLabel(op) {
  if (op.type === "swap") return `${ROMAN[op.r1]} ↔ ${ROMAN[op.r2]}`;
  const f = op.factor.toString();
  if (op.factor.eq(F(1))) return `${ROMAN[op.target]} ← ${ROMAN[op.source]} + ${ROMAN[op.target]}`;
  if (op.factor.eq(F(-1))) return `${ROMAN[op.target]} ← −${ROMAN[op.source]} + ${ROMAN[op.target]}`;
  return `${ROMAN[op.target]} ← ${f}·${ROMAN[op.source]} + ${ROMAN[op.target]}`;
}

function sameOperation(a, b) {
  if (!a || !b || a.type !== b.type) return false;
  if (a.type === "swap") {
    return (a.r1 === b.r1 && a.r2 === b.r2) || (a.r1 === b.r2 && a.r2 === b.r1);
  }
  return a.target === b.target && a.source === b.source && a.factor.eq(b.factor);
}

function operationKey(op) {
  if (op.type === "swap") return `s:${Math.min(op.r1, op.r2)}:${Math.max(op.r1, op.r2)}`;
  return `a:${op.target}:${op.source}:${op.factor.n}/${op.factor.d}`;
}

function buildChoices(correct, M) {
  const candidates = [correct];
  if (correct.type === "add") {
    candidates.push({ ...correct, factor: correct.factor.neg() });
    if (!correct.factor.eq(F(1))) candidates.push({ ...correct, factor: F(1) });
    if (!correct.factor.eq(F(-1))) candidates.push({ ...correct, factor: F(-1) });
    candidates.push({ type: "add", target: correct.source, source: correct.target, factor: correct.factor });
    for (let r = 0; r < M.length; r += 1) {
      if (r !== correct.target && r !== correct.source) {
        candidates.push({ type: "swap", r1: correct.target, r2: r });
      }
    }
  } else {
    for (let a = 0; a < M.length; a += 1) {
      for (let b = a + 1; b < M.length; b += 1) {
        candidates.push({ type: "swap", r1: a, r2: b });
      }
    }
    const c = leadingIndex(M[correct.r2]);
    if (c >= 0) {
      const source = correct.r2;
      const target = correct.r1;
      candidates.push({ type: "add", target, source, factor: F(1) });
      candidates.push({ type: "add", target, source, factor: F(-1) });
    }
  }

  const unique = [];
  const seen = new Set();
  for (const op of candidates) {
    const key = operationKey(op);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(op);
    }
  }

  // If necessary, add simple row additions until four distinct choices exist.
  for (let target = 0; unique.length < 4 && target < M.length; target += 1) {
    for (let source = 0; unique.length < 4 && source < M.length; source += 1) {
      if (source === target) continue;
      for (const factor of [F(1), F(-1), F(2), F(-2)]) {
        const op = { type: "add", target, source, factor };
        const key = operationKey(op);
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(op);
        }
      }
    }
  }

  const selected = unique.slice(0, 4);
  return shuffle(selected);
}

function shuffle(array) {
  const out = array.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function renderOperationCalculation(M, op) {
  const block = el("div", "calc-block");
  if (op.type === "swap") {
    block.appendChild(el("div", "muted-note", T.swapText));
    block.appendChild(renderSwapRow(ROMAN[op.r1], M[op.r1], M[op.r2]));
    block.appendChild(renderSwapRow(ROMAN[op.r2], M[op.r2], M[op.r1]));
    return block;
  }

  const result = M[op.target].map((value, c) => value.add(op.factor.mul(M[op.source][c])));
  const n = M[0].length - 1;
  const grid = el("div", "calc-grid");
  grid.style.gridTemplateColumns = `32px repeat(${M[0].length}, minmax(126px, auto))`;

  grid.appendChild(el("div", "calc-equals", ""));
  M[0].forEach((_, c) => {
    const expression = formatCalculation(op.factor, M[op.source][c], M[op.target][c]);
    const cell = el("div", `calc-cell${c === n ? " rhs-cell" : ""}`, expression);
    grid.appendChild(cell);
  });

  grid.appendChild(el("div", "calc-equals", "="));
  result.forEach((value, c) => {
    const cell = el("div", `calc-cell${c === n ? " rhs-cell" : ""}`, value.toString());
    grid.appendChild(cell);
  });

  block.appendChild(grid);
  return block;
}

function renderSwapRow(label, before, after) {
  const row = el("div", "swap-row");
  row.appendChild(el("div", "", `${label} ${T.rowBefore}:`));
  row.appendChild(el("div", "row-vector", vectorText(before)));
  row.appendChild(el("div", "", "→"));
  row.appendChild(el("div", "row-vector", vectorText(after)));
  return row;
}

function vectorText(row) {
  const n = row.length - 1;
  const left = row.slice(0, n).map(x => x.toString()).join(", ");
  return `( ${left} | ${row[n].toString()} )`;
}

function formatCalculation(factor, source, target) {
  const factorText = `(${factor.toString()})`;
  const sourceText = source.n < 0n ? `(${source.toString()})` : source.toString();
  const targetSign = target.n < 0n ? "−" : "+";
  const targetAbs = target.abs().toString();
  return `${factorText}·${sourceText} ${targetSign} ${targetAbs}`;
}

function rankOfCoefficientPart(M) {
  const n = M[0].length - 1;
  return M.filter(row => row.slice(0, n).some(value => !value.isZero())).length;
}

function rankOfAugmented(M) {
  return M.filter(row => row.some(value => !value.isZero())).length;
}

restartButton.addEventListener("click", resetCurrentExample);
newExampleButton.addEventListener("click", chooseNewExample);

chooseNewExample();
