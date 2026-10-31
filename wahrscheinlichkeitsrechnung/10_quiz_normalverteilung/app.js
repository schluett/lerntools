"use strict";

// Logik für Umformen, Differenz und Ablesen aus Quiz 08 übernommen (Kopie, siehe Plan);
// neu sind Standardisieren, Fläche links, Symmetrie beim Quantil, Rückwärtslesen,
// Zurückrechnen und der Doppelplot aus Video 9.

const stage = document.getElementById("nqStage");
const statusLine = document.getElementById("statusLine");
const taskBadge = document.getElementById("taskBadge");
const progressNav = document.getElementById("progressNav");
const restartButton = document.getElementById("restartButton");

const LANG = (document.documentElement.lang || "de").toLowerCase().startsWith("en") ? "en" : "de";
// Fortschritt je Sprache getrennt, da DE und EN auf derselben Domain liegen.
const STORE_KEY = LANG === "en" ? "stat_normal_general_quiz_progress_en_v1" : "stat_normal_general_quiz_progress_v1";
const SVG_NS = "http://www.w3.org/2000/svg";

// Farben wie in Video 7 und 9: gesuchte Fläche orange, übrige Fläche hellgrau.
const COLORS = { area: "#C4772B", neutral: "#A9AFB8", curve: "#20242A", muted: "#68707C" };

// Texte je Sprache; DE und EN verwenden dieselben Schlüssel.
const I18N = {
  de: {
    decimal: ",",
    badge: (i, n) => `Aufgabe ${i} von ${n}`,
    progressLabel: (i, solved) => `Aufgabe ${i}${solved ? " (gelöst)" : ""}`,
    phase: {
      std: "Standardisieren",
      transform: "Umformen",
      diff: "Differenz aufteilen",
      read: "Tabellenwert ablesen",
      left: "Fläche links bestimmen",
      qsym: "Symmetrie nutzen",
      qread: "Tabelle rückwärts lesen",
      back: "Zurückrechnen",
      result: "Ergebnis"
    },
    taskProb: model => `Bestimmen Sie mithilfe der Tabelle der Formelsammlung für X ~ ${model}:`,
    taskQuant: model => `Bestimmen Sie mithilfe der Tabelle der Formelsammlung für X ~ ${model} die Stelle x mit`,
    pathTitle: "Rechenweg",

    // Standardisieren
    stdQuestionOne: x => `Standardisieren Sie die Grenze ${x}: Wählen Sie Zähler und Nenner.`,
    stdQuestionLower: x => `Standardisieren Sie die untere Grenze ${x}: Wählen Sie Zähler und Nenner.`,
    stdQuestionUpper: x => `Standardisieren Sie die obere Grenze ${x}: Wählen Sie Zähler und Nenner.`,
    numerator: "Zähler",
    denominator: "Nenner",
    check: "Prüfen",
    stdNumRev: "Wir ziehen vom x-Wert den Erwartungswert ab: x − μ. So wird aus x = μ die Stelle z = 0, und Werte oberhalb von μ erhalten ein positives z.",
    stdNumX: "Zuerst wird der Erwartungswert abgezogen, damit die Mitte der Verteilung bei z = 0 liegt: x − μ.",
    stdDenVar: "In N(μ, σ²) steht an zweiter Stelle die Varianz. Für die Standardisierung teilen wir durch die Standardabweichung σ.",
    stdDenSqrt: "Wir teilen durch die Standardabweichung σ. Sie ist die Wurzel aus der Varianz σ².",
    stdBoundOk: (frac, z) => `Richtig: z = ${frac} = ${z}.`,
    stdKeepOne: " Da σ > 0 ist, bleibt das Ungleichheitszeichen erhalten.",
    stdKeepTwo: " Da σ > 0 ist, bleiben die Ungleichheitszeichen erhalten.",
    stdDone: "Bereits standardisiert:",

    // Umformen, Differenz, Ablesen (wie Quiz 08)
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

    // Quantil
    leftQuestion: "Die Tabelle enthält Flächen links. Welche Gleichung beschreibt die Fläche links von x?",
    leftOkRight: (p, q) => `Gegenereignis: Rechts von x liegt die Fläche ${p}, links von x also 1 − ${p} = ${q}.`,
    leftOkStrict: "Bei stetigen Zufallsvariablen ist P(X < x) = P(X ≤ x).",
    leftOkPlain: "Die Fläche links von x ist bereits gegeben.",
    leftPhi: " Mit z = (x − μ)/σ gilt P(X ≤ x) = Φ(z).",
    leftWrongRest: "P(X ≤ x) ist die Fläche links von x. Gegeben ist die Fläche rechts von x; links liegt der Rest bis zur Gesamtfläche 1.",
    leftWrongGivenLeft: "Gegeben ist bereits die Fläche links von x. Bei stetigen Zufallsvariablen ist P(X < x) = P(X ≤ x).",
    leftWrongDirRight: p => `P(X ≥ x) ist die Fläche rechts von x. Laut Aufgabe beträgt sie ${p}.`,
    leftWrongDirLeft: "P(X ≥ x) ist die Fläche rechts von x. Gegeben ist die Fläche links von x.",
    phiLine: (p, mu, sigma) => `Φ(z) = ${p} mit z = (x − ${mu})/${sigma}`,
    qsymQuestion: p => `Φ(z) = ${p} ist kleiner als 0,5. Die Tabelle beginnt bei Φ(0) = 0,5, z ist also negativ. Welche Umformung führt zu einem Tabellenwert?`,
    qsymOk: (p, q) => `Symmetrie: Die Fläche links von −z ist genauso groß wie die Fläche rechts von z, also 1 − ${p} = ${q}.`,
    qsymWrongSame: "Wegen der Symmetrie ist die Fläche links von −z genauso groß wie die Fläche rechts von z. Rechts von z liegt der Rest bis zur Gesamtfläche 1.",
    qsymWrongShift: "Die Symmetrie spiegelt an der Stelle 0: Aus z wird −z.",
    qreadQuestion: p => `Suchen Sie in der Tabelle den Wert, der ${p} am nächsten kommt.`,
    qreadSmaller: (v, p) => `Der Wert ${v} ist kleiner als ${p}. Es gibt einen Tabellenwert, der näher an ${p} liegt.`,
    qreadLarger: (v, p) => `Der Wert ${v} ist größer als ${p}. Es gibt einen Tabellenwert, der näher an ${p} liegt.`,
    qreadExact: (z, v) => `Richtig: Φ(${z}) = ${v}.`,
    qreadNearest: (z, v, p) => `Richtig: Φ(${z}) = ${v} liegt am nächsten an ${p}.`,
    qreadZ: z => ` Also ist z ≈ ${z}.`,
    qreadMinusZ: (mz, z) => ` Also ist −z ≈ ${mz} und damit z ≈ ${z}.`,
    zLine: z => `z ≈ ${z}`,
    minusZLine: (mz, z) => `−z ≈ ${mz}, also z ≈ ${z}`,
    backQuestion: "Wie erhalten Sie x aus z?",
    backOk: "Aus z = (x − μ)/σ folgt durch Umstellen x = μ + σ · z.",
    backWrongVar: "Wir lösen z = (x − μ)/σ nach x auf: mit σ multiplizieren, dann μ addieren. Hier steht die Varianz σ² statt der Standardabweichung σ.",
    backWrongInv: "Das ist die Standardisierung mit z an der Stelle von x. Wir lösen z = (x − μ)/σ nach x auf: mit σ multiplizieren, dann μ addieren.",

    // Ergebnis
    resultTitle: "Richtig gerechnet.",
    resultText: (term, value, pct) => `${term} ≈ ${value}, also rund ${pct} Prozent.`,
    resultQuant: (x, cond) => `x ≈ ${x}, d. h. ${cond}.`,
    rTitle: "Vergleich mit R:",
    rSame: "Die Tabelle ist auf vier Nachkommastellen gerundet; R rechnet genauer.",
    rDiff: "Der kleine Unterschied in der vierten Nachkommastelle entsteht, weil die Tabellenwerte gerundet sind.",
    rQuantSame: "z aus der Tabelle ist auf zwei Nachkommastellen gerundet; R rechnet genauer.",
    rQuantDiff: "Der kleine Unterschied entsteht, weil z aus der Tabelle auf zwei Nachkommastellen gerundet ist.",
    next: "Nächste Aufgabe",
    again: "Wieder mit Aufgabe 1 beginnen",
    allSolved: "Alle zehn Aufgaben sind gelöst.",

    // Grafik
    graphStd: "Fläche unter der Dichte von X",
    graphCurrent: "Markierter Ausdruck",
    graphRead: "Abzulesende Fläche",
    graphResult: "Gesuchte Fläche",
    graphQuant: "Gesuchte Stelle",
    areaLeft: z => `Fläche links von ${z}`,
    areaRight: z => `Fläche rechts von ${z}`,
    areaBetween: (a, b) => `Fläche zwischen ${a} und ${b}`,
    capGiven: (side, p) => `${side === "ge" ? "Fläche rechts von x" : "Fläche links von x"}: ${p}`,
    capOpen: z => `${z}, x = ?`,
    stepTitle: op => `Letzter Schritt: ${op}`,
    diffPreview: "Vorschau der gewählten Flächen",
    open: "?"
  },

  // Terms as in Quiz 08 EN and Video 9 EN (British spelling: standardise, standardisation).
  en: {
    decimal: ".",
    badge: (i, n) => `Exercise ${i} of ${n}`,
    progressLabel: (i, solved) => `Exercise ${i}${solved ? " (solved)" : ""}`,
    phase: {
      std: "Standardise",
      transform: "Transform",
      diff: "Split into a difference",
      read: "Read the table value",
      left: "Determine the area to the left",
      qsym: "Use symmetry",
      qread: "Read the table backwards",
      back: "Convert back",
      result: "Result"
    },
    taskProb: model => `Using the table in the formula sheet, determine for X ~ ${model}:`,
    taskQuant: model => `Using the table in the formula sheet, determine for X ~ ${model} the point x with`,
    pathTitle: "Working",

    // Standardise
    stdQuestionOne: x => `Standardise the bound ${x}: choose the numerator and the denominator.`,
    stdQuestionLower: x => `Standardise the lower bound ${x}: choose the numerator and the denominator.`,
    stdQuestionUpper: x => `Standardise the upper bound ${x}: choose the numerator and the denominator.`,
    numerator: "Numerator",
    denominator: "Denominator",
    check: "Check",
    stdNumRev: "We subtract the expected value from the x value: x − μ. This way, x = μ becomes the point z = 0, and values above μ get a positive z.",
    stdNumX: "First, the expected value is subtracted so that the centre of the distribution lies at z = 0: x − μ.",
    stdDenVar: "In N(μ, σ²), the second entry is the variance. For the standardisation, we divide by the standard deviation σ.",
    stdDenSqrt: "We divide by the standard deviation σ. It is the square root of the variance σ².",
    stdBoundOk: (frac, z) => `Correct: z = ${frac} = ${z}.`,
    stdKeepOne: " Since σ > 0, the inequality sign stays the same.",
    stdKeepTwo: " Since σ > 0, the inequality signs stay the same.",
    stdDone: "Already standardised:",

    // Transform, difference, read off (as in Quiz 08)
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

    // Quantile
    leftQuestion: "The table contains areas to the left. Which equation describes the area to the left of x?",
    leftOkRight: (p, q) => `Complement: The area to the right of x is ${p}, so the area to the left of x is 1 − ${p} = ${q}.`,
    leftOkStrict: "For continuous random variables, P(X < x) = P(X ≤ x).",
    leftOkPlain: "The area to the left of x is already given.",
    leftPhi: " With z = (x − μ)/σ, we have P(X ≤ x) = Φ(z).",
    leftWrongRest: "P(X ≤ x) is the area to the left of x. The area to the right of x is given; the area to the left is the rest up to the total area 1.",
    leftWrongGivenLeft: "The area to the left of x is already given. For continuous random variables, P(X < x) = P(X ≤ x).",
    leftWrongDirRight: p => `P(X ≥ x) is the area to the right of x. According to the exercise, it is ${p}.`,
    leftWrongDirLeft: "P(X ≥ x) is the area to the right of x. The area to the left of x is given.",
    phiLine: (p, mu, sigma) => `Φ(z) = ${p} with z = (x − ${mu})/${sigma}`,
    qsymQuestion: p => `Φ(z) = ${p} is smaller than 0.5. The table starts at Φ(0) = 0.5, so z is negative. Which transformation leads to a table value?`,
    qsymOk: (p, q) => `Symmetry: The area to the left of −z is exactly as large as the area to the right of z, i.e. 1 − ${p} = ${q}.`,
    qsymWrongSame: "Because of the symmetry, the area to the left of −z is exactly as large as the area to the right of z. The area to the right of z is the rest up to the total area 1.",
    qsymWrongShift: "Symmetry reflects at the point 0: z becomes −z.",
    qreadQuestion: p => `Find the value in the table that comes closest to ${p}.`,
    qreadSmaller: (v, p) => `The value ${v} is smaller than ${p}. There is a table value that is closer to ${p}.`,
    qreadLarger: (v, p) => `The value ${v} is larger than ${p}. There is a table value that is closer to ${p}.`,
    qreadExact: (z, v) => `Correct: Φ(${z}) = ${v}.`,
    qreadNearest: (z, v, p) => `Correct: Φ(${z}) = ${v} is closest to ${p}.`,
    qreadZ: z => ` So z ≈ ${z}.`,
    qreadMinusZ: (mz, z) => ` So −z ≈ ${mz} and therefore z ≈ ${z}.`,
    zLine: z => `z ≈ ${z}`,
    minusZLine: (mz, z) => `−z ≈ ${mz}, so z ≈ ${z}`,
    backQuestion: "How do you obtain x from z?",
    backOk: "Rearranging z = (x − μ)/σ gives x = μ + σ · z.",
    backWrongVar: "We solve z = (x − μ)/σ for x: multiply by σ, then add μ. Here, the variance σ² appears instead of the standard deviation σ.",
    backWrongInv: "This is the standardisation with z in place of x. We solve z = (x − μ)/σ for x: multiply by σ, then add μ.",

    // Result
    resultTitle: "Correctly calculated.",
    resultText: (term, value, pct) => `${term} ≈ ${value}, i.e. about ${pct} percent.`,
    resultQuant: (x, cond) => `x ≈ ${x}, i.e. ${cond}.`,
    rTitle: "Comparison with R:",
    rSame: "The table is rounded to four decimal places; R calculates more precisely.",
    rDiff: "The small difference in the fourth decimal place arises because the table values are rounded.",
    rQuantSame: "z from the table is rounded to two decimal places; R calculates more precisely.",
    rQuantDiff: "The small difference arises because z from the table is rounded to two decimal places.",
    next: "Next exercise",
    again: "Start again with exercise 1",
    allSolved: "All ten exercises are solved.",

    // Graphic
    graphStd: "Area under the density of X",
    graphCurrent: "Highlighted expression",
    graphRead: "Area to read off",
    graphResult: "Required area",
    graphQuant: "Required point",
    areaLeft: z => `Area to the left of ${z}`,
    areaRight: z => `Area to the right of ${z}`,
    areaBetween: (a, b) => `Area between ${a} and ${b}`,
    capGiven: (side, p) => `${side === "ge" ? "Area to the right of x" : "Area to the left of x"}: ${p}`,
    capOpen: z => `${z}, x = ?`,
    stepTitle: op => `Last step: ${op}`,
    diffPreview: "Preview of the selected areas",
    open: "?"
  }
};

const T = I18N[LANG] || I18N.de;

/* --------------------------------------------------------------------------
   Zahlen und Darstellung
   -------------------------------------------------------------------------- */

const MINUS = "−";

// z in Hundertsteln → "1,23" bzw. "−1,20"
function fmtZ(h) {
  const sign = h < 0 ? MINUS : "";
  return sign + (Math.abs(h) / 100).toFixed(2).replace(".", T.decimal);
}

// Wahrscheinlichkeit in Zehntausendsteln → "0,8907"
function fmtProb(v) {
  return (v / 10000).toFixed(4).replace(".", T.decimal);
}

// Vorgegebene Wahrscheinlichkeit kurz: 250 → "0,025", 1000 → "0,10"
function fmtP(v) {
  let s = (v / 10000).toFixed(4);
  while (s.endsWith("0") && s.length > 4) s = s.slice(0, -1);
  return s.replace(".", T.decimal);
}

function fmtPercent(v) {
  return (v / 100).toFixed(1).replace(".", T.decimal);
}

function fmtNum(v) {
  return (v < 0 ? MINUS : "") + String(Math.abs(v)).replace(".", T.decimal);
}

// x in Hundertsteln → "129,40"
function fmtX(h) {
  return (h < 0 ? MINUS : "") + (Math.abs(h) / 100).toFixed(2).replace(".", T.decimal);
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
   Normalverteilung X ~ N(μ, σ²)
   -------------------------------------------------------------------------- */

function modelText(task) {
  // Geschütztes Leerzeichen, damit N(μ, σ²) nicht umbricht.
  return task.var ? `N(${fmtNum(task.mu)}, ${fmtNum(task.sigma * task.sigma)})` : `N(${fmtNum(task.mu)}, ${fmtNum(task.sigma)}²)`;
}

function xTermText(t) {
  if (t.k === "le") return `P(X ${t.s ? "<" : "≤"} ${fmtNum(t.x)})`;
  if (t.k === "ge") return `P(X ${t.s ? ">" : "≥"} ${fmtNum(t.x)})`;
  return `P(${fmtNum(t.a)} ${t.sa ? "<" : "≤"} X ${t.sb ? "<" : "≤"} ${fmtNum(t.b)})`;
}

function fracText(x, task) {
  return `(${fmtNum(x)} − ${fmtNum(task.mu)})/${fmtNum(task.sigma)}`;
}

function stdTermText(t, task) {
  if (t.k === "le") return `P(Z ${t.s ? "<" : "≤"} ${fracText(t.x, task)})`;
  if (t.k === "ge") return `P(Z ${t.s ? ">" : "≥"} ${fracText(t.x, task)})`;
  return `P(${fracText(t.a, task)} ${t.sa ? "<" : "≤"} Z ${t.sb ? "<" : "≤"} ${fracText(t.b, task)})`;
}

function xBounds(t) {
  return t.k === "bw" ? [t.a, t.b] : [t.x];
}

// z in Hundertsteln; die Grenzen der Aufgaben sind so gewählt, dass dies exakt ist.
function zOf(x, task) {
  return Math.round((x - task.mu) * 100 / task.sigma);
}

function zTermOf(t, task) {
  if (t.k === "le") return LE(zOf(t.x, task), t.s);
  if (t.k === "ge") return GE(zOf(t.x, task), t.s);
  return BW(zOf(t.a, task), zOf(t.b, task), t.sa, t.sb);
}

function givenText(task, x = "x") {
  const g = task.given;
  const rel = g.k === "le" ? (g.s ? "<" : "≤") : (g.s ? ">" : "≥");
  return `P(X ${rel} ${x}) = ${fmtP(g.p)}`;
}

function leftP(task) {
  return task.given.k === "ge" ? 10000 - task.given.p : task.given.p;
}

/* --------------------------------------------------------------------------
   Umformungen und kürzester Weg zur Tabelle (aus Quiz 08)
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

// Zeilen des Rechenwegs: { rel, expr } (Ausdrucksbaum in Z) oder { rel, text } (fester Text).
const state = {
  index: 0,
  phase: "std",
  expr: null,
  zTerm: null,
  lines: [],
  message: null,
  lastStep: null,
  mirrorFrom: null,
  diff: null,
  std: null,
  quant: null,
  choices: null,
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
  const task = TASKS[index];
  state.index = index;
  state.expr = null;
  state.zTerm = null;
  state.message = null;
  state.lastStep = null;
  state.mirrorFrom = null;
  state.diff = null;
  state.std = null;
  state.quant = null;
  state.choices = null;
  state.wrongCell = null;
  state.result = null;

  if (task.type === "prob") {
    state.phase = "std";
    state.lines = [{ rel: "", text: xTermText(task.term) }];
    state.std = { bounds: xBounds(task.term), cur: 0, done: [] };
    prepareStdChoices();
  } else {
    state.phase = "left";
    state.lines = [{ rel: "", text: givenText(task) }];
    state.quant = { z: null, x: null, sym: leftP(task) < 5000 };
    prepareLeftChoices();
  }
  progress.current = index;
  writeProgress();
  render();
}

function activePath() {
  if (!state.expr) return null;
  if (state.phase === "transform" || state.phase === "diff") return findFirst(state.expr, n => n.n === "t");
  if (state.phase === "read") return findFirst(state.expr, n => n.n === "phi");
  return null;
}

function pushLine(rel) {
  state.lines.push({ rel, expr: clone(state.expr) });
}

function pushText(rel, text) {
  state.lines.push({ rel, text });
}

/* --------------------------------------------------------------------------
   Aktionen: Standardisieren
   -------------------------------------------------------------------------- */

// Auswahlmöglichkeiten: { key, text, ok }. Bei Zähler und Nenner getrennt, sonst eine Liste.
function prepareStdChoices() {
  const task = currentTask();
  const x = state.std.bounds[state.std.cur];
  const s = task.sigma;
  const root = Math.sqrt(s);
  state.choices = {
    num: shuffle([
      { key: "ok", text: `${fmtNum(x)} − ${fmtNum(task.mu)}` },
      { key: "rev", text: `${fmtNum(task.mu)} − ${fmtNum(x)}` },
      { key: "x", text: fmtNum(x) }
    ]),
    den: shuffle([
      { key: "ok", text: fmtNum(s) },
      { key: "var", text: fmtNum(s * s) },
      { key: "sqrt", text: Number.isInteger(root) ? fmtNum(root) : `√${fmtNum(s)}` }
    ]),
    numSel: null,
    denSel: null
  };
}

function checkStd() {
  const task = currentTask();
  const c = state.choices;
  if (c.numSel.key !== "ok" || c.denSel.key !== "ok") {
    const parts = [];
    if (c.numSel.key === "rev") parts.push(T.stdNumRev);
    if (c.numSel.key === "x") parts.push(T.stdNumX);
    if (c.denSel.key === "var") parts.push(T.stdDenVar);
    if (c.denSel.key === "sqrt") parts.push(T.stdDenSqrt);
    state.message = { type: "wrong", text: parts.join(" ") };
    render();
    return;
  }

  const x = state.std.bounds[state.std.cur];
  const z = zOf(x, task);
  state.std.done.push({ x, z });
  let text = T.stdBoundOk(fracText(x, task), fmtZ(z));

  // Bei Intervallen zeigt die Liste „Bereits standardisiert“ die erste Grenze an.
  if (state.std.cur < state.std.bounds.length - 1) {
    state.std.cur += 1;
    prepareStdChoices();
    state.message = null;
    render();
    return;
  }

  text += state.std.bounds.length === 2 ? T.stdKeepTwo : T.stdKeepOne;
  state.zTerm = zTermOf(task.term, task);
  state.expr = { n: "t", t: clone(state.zTerm) };
  pushText("=", stdTermText(task.term, task));
  pushLine("=");
  state.std = null;
  state.choices = null;
  state.phase = "transform";
  state.message = { type: "correct", text };
  render();
}

/* --------------------------------------------------------------------------
   Aktionen: Umformen, Differenz, Ablesen (aus Quiz 08)
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
  // Zwischenschritt für verschachtelte Gegenereignisse, z. B. 0,9772 − (1 − 0,8413).
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
  markSolved();
}

function markSolved() {
  state.phase = "result";
  state.message = null;
  const id = currentTask().id;
  if (!progress.solved.includes(id)) progress.solved.push(id);
  writeProgress();
}

/* --------------------------------------------------------------------------
   Aktionen: Quantil
   -------------------------------------------------------------------------- */

function prepareLeftChoices() {
  const task = currentTask();
  const q = leftP(task);
  state.choices = {
    list: shuffle([
      { key: "ok", text: `P(X ≤ x) = ${fmtP(q)}` },
      { key: "rest", text: `P(X ≤ x) = ${fmtP(10000 - q)}` },
      { key: "dir", text: `P(X ≥ x) = ${fmtP(q)}` }
    ]),
    sel: null
  };
}

function handleLeft(choice) {
  const task = currentTask();
  const g = task.given;
  const q = leftP(task);
  if (choice.key !== "ok") {
    let text;
    if (choice.key === "rest") text = g.k === "ge" ? T.leftWrongRest : T.leftWrongGivenLeft;
    else text = g.k === "ge" ? T.leftWrongDirRight(fmtP(g.p)) : T.leftWrongDirLeft;
    state.message = { type: "wrong", text };
    render();
    return;
  }

  let text = g.k === "ge" ? T.leftOkRight(fmtP(g.p), fmtP(q)) : g.s ? T.leftOkStrict : T.leftOkPlain;
  text += T.leftPhi;
  pushText("⇒", `P(X ≤ x) = ${fmtP(q)}`);
  pushText("⇒", T.phiLine(fmtP(q), fmtNum(task.mu), fmtNum(task.sigma)));
  state.message = { type: "correct", text };
  if (state.quant.sym) {
    state.phase = "qsym";
    state.choices = {
      list: shuffle([
        { key: "ok", text: `Φ(−z) = ${fmtP(10000 - q)}` },
        { key: "same", text: `Φ(−z) = ${fmtP(q)}` },
        { key: "shift", text: `Φ(1 − z) = ${fmtP(10000 - q)}` }
      ])
    };
  } else {
    state.phase = "qread";
    state.choices = null;
  }
  render();
}

function handleQsym(choice) {
  const q = leftP(currentTask());
  if (choice.key !== "ok") {
    state.message = { type: "wrong", text: choice.key === "same" ? T.qsymWrongSame : T.qsymWrongShift };
    render();
    return;
  }
  pushText("⇒", `Φ(−z) = ${fmtP(10000 - q)}`);
  state.message = { type: "correct", text: T.qsymOk(fmtP(q), fmtP(10000 - q)) };
  state.phase = "qread";
  state.choices = null;
  render();
}

// Wert, der rückwärts in der Tabelle gesucht wird (bei unteren Quantilen nach der Symmetrie).
function qTarget() {
  const q = leftP(currentTask());
  return state.quant.sym ? 10000 - q : q;
}

// Tabellenzelle (als z in Hundertsteln), deren Wert dem Ziel am nächsten kommt.
function nearestCell(target) {
  let best = 0;
  let bestDist = Infinity;
  for (let z = 0; z < PHI_TABLE_ROWS.length * 10; z++) {
    const dist = Math.abs(tableValue(z).value - target);
    if (dist < bestDist) {
      best = z;
      bestDist = dist;
    }
  }
  return { z: best, dist: bestDist };
}

function handleQCell(row, col) {
  const target = qTarget();
  const nearest = nearestCell(target);
  const z = row * 10 + col;
  const { value } = tableValue(z);
  const pText = fmtP(target);

  if (Math.abs(value - target) > nearest.dist) {
    state.wrongCell = [row, col];
    const text = value < target ? T.qreadSmaller(fmtProb(value), pText) : T.qreadLarger(fmtProb(value), pText);
    state.message = { type: "wrong", text };
    render();
    return;
  }

  state.wrongCell = null;
  state.quant.z = state.quant.sym ? -z : z;
  let text = value === target ? T.qreadExact(fmtZ(z), fmtProb(value)) : T.qreadNearest(fmtZ(z), fmtProb(value), pText);
  if (state.quant.sym) {
    text += T.qreadMinusZ(fmtZ(z), fmtZ(-z));
    pushText("⇒", T.minusZLine(fmtZ(z), fmtZ(-z)));
  } else {
    text += T.qreadZ(fmtZ(z));
    pushText("⇒", T.zLine(fmtZ(z)));
  }
  state.message = { type: "correct", text };
  state.phase = "back";
  prepareBackChoices();
  render();
}

function zFactor(z) {
  return z < 0 ? `(${fmtZ(z)})` : fmtZ(z);
}

function backOkText(task, z) {
  return `x = ${fmtNum(task.mu)} + ${fmtNum(task.sigma)} · ${zFactor(z)}`;
}

function prepareBackChoices() {
  const task = currentTask();
  const z = state.quant.z;
  state.choices = {
    list: shuffle([
      { key: "ok", text: backOkText(task, z) },
      { key: "var", text: `x = ${fmtNum(task.mu)} + ${fmtNum(task.sigma * task.sigma)} · ${zFactor(z)}` },
      { key: "inv", text: `x = (${fmtZ(z)} − ${fmtNum(task.mu)})/${fmtNum(task.sigma)}` }
    ])
  };
}

function handleBack(choice) {
  const task = currentTask();
  if (choice.key !== "ok") {
    state.message = { type: "wrong", text: choice.key === "var" ? T.backWrongVar : T.backWrongInv };
    render();
    return;
  }
  // x in Hundertsteln: μ + σ · z mit z in Hundertsteln
  state.quant.x = task.mu * 100 + task.sigma * state.quant.z;
  pushText("⇒", `${backOkText(task, state.quant.z)} = ${fmtX(state.quant.x)}`);
  state.choices = null;
  markSolved();
  state.message = { type: "correct", text: T.backOk };
  render();
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

  // In den Ablese-Phasen erhält die Tabelle die volle Breite.
  const isTable = state.phase === "read" || state.phase === "qread";
  const layout = el("div", "nq-layout" + (isTable ? " is-read" : ""));
  const pathArea = el("div", "nq-path");
  const graphArea = el("div", "nq-graph");
  const actionArea = el("div", "nq-actions");
  layout.append(pathArea, graphArea, actionArea);
  stage.replaceChildren(layout);

  renderPath(pathArea);
  renderGraph(graphArea);

  const renderers = {
    std: renderStdActions,
    transform: renderTransformActions,
    diff: renderDiffActions,
    read: renderReadActions,
    left: c => renderChoiceActions(c, T.leftQuestion, handleLeft),
    qsym: c => renderChoiceActions(c, T.qsymQuestion(fmtP(leftP(currentTask()))), handleQsym),
    qread: renderQReadActions,
    back: c => renderChoiceActions(c, T.backQuestion, handleBack),
    result: renderResult
  };
  renderers[state.phase](actionArea);
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
  const task = currentTask();
  const isProb = task.type === "prob";
  container.appendChild(el("div", "nq-task-label", isProb ? T.taskProb(modelText(task)) : T.taskQuant(modelText(task))));
  container.appendChild(el("div", "nq-task-term", isProb ? xTermText(task.term) : givenText(task)));
  container.appendChild(el("div", "nq-section-title", T.pathTitle));

  const list = el("div", "nq-lines");
  const active = activePath();
  // Feste Textzeilen sind aktiv, solange an ihnen weitergerechnet wird.
  const textActive = ["std", "left", "qsym", "qread", "back"].includes(state.phase);
  state.lines.forEach((line, i) => {
    const isLast = i === state.lines.length - 1;
    const row = el("div", "nq-line" + (isLast && state.phase === "result" ? " is-result" : ""));
    row.appendChild(el("span", "nq-rel", line.rel));
    const expr = el("span", "nq-expr");
    if (line.expr) expr.appendChild(nodeDom(line.expr, isLast ? active : null));
    else expr.appendChild(el("span", "nq-atom" + (isLast && textActive ? " is-active" : ""), line.text));
    row.appendChild(expr);
    list.appendChild(row);
  });
  container.appendChild(list);
}

function renderMessage(container) {
  if (!state.message) return;
  container.appendChild(el("div", `nq-message is-${state.message.type}`, state.message.text));
}

function renderStdActions(container) {
  const task = currentTask();
  const std = state.std;
  const c = state.choices;
  const x = std.bounds[std.cur];
  renderMessage(container);

  if (std.done.length) {
    const done = el("div", "nq-std-done");
    done.appendChild(el("span", "nq-group-label", T.stdDone + " "));
    std.done.forEach(d => done.appendChild(el("span", "", `z = ${fracText(d.x, task)} = ${fmtZ(d.z)}`)));
    container.appendChild(done);
  }

  const question = std.bounds.length === 1 ? T.stdQuestionOne : std.cur === 0 ? T.stdQuestionLower : T.stdQuestionUpper;
  container.appendChild(el("div", "nq-question", question(fmtNum(x))));

  // Bruch z = Zähler / Nenner mit Platzhaltern
  const eq = el("div", "nq-frac-equation");
  eq.appendChild(el("span", "", "z ="));
  const frac = el("span", "nq-frac");
  frac.appendChild(el("span", "nq-slot" + (c.numSel ? " is-filled" : ""), c.numSel ? c.numSel.text : T.open));
  frac.appendChild(el("span", "nq-slot nq-frac-den" + (c.denSel ? " is-filled" : ""), c.denSel ? c.denSel.text : T.open));
  eq.appendChild(frac);
  container.appendChild(eq);

  const groups = el("div", "nq-diff-groups");
  groups.appendChild(choiceGroup(T.numerator, c.num, c.numSel, choice => { c.numSel = choice; state.message = null; render(); }));
  groups.appendChild(choiceGroup(T.denominator, c.den, c.denSel, choice => { c.denSel = choice; state.message = null; render(); }));
  container.appendChild(groups);

  const actions = el("div", "nq-action-row");
  const check = button(T.check, "", checkStd);
  check.disabled = !(c.numSel && c.denSel);
  actions.appendChild(check);
  container.appendChild(actions);
}

function choiceGroup(label, options, selected, onSelect) {
  const group = el("div", "nq-diff-group");
  group.appendChild(el("div", "nq-group-label", label));
  const row = el("div", "nq-choice-row");
  options.forEach(option => {
    const isSelected = selected === option;
    const b = button(option.text, "nq-choice" + (isSelected ? " is-selected" : ""), () => onSelect(option));
    b.setAttribute("aria-pressed", isSelected ? "true" : "false");
    row.appendChild(b);
  });
  group.appendChild(row);
  return group;
}

// Eine Entscheidung mit sofortiger Auswertung (Fläche links, Symmetrie, Zurückrechnen).
function renderChoiceActions(container, question, onChoose) {
  renderMessage(container);
  container.appendChild(el("div", "nq-question", question));
  const row = el("div", "nq-option-list");
  state.choices.list.forEach(option => {
    row.appendChild(button(option.text, "nq-op-button", () => onChoose(option)));
  });
  container.appendChild(row);
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
  const check = button(T.check, "", checkDiff);
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
  renderTable(wrap, phi.z, wrap.clientWidth, handleCell);
}

function renderQReadActions(container) {
  renderMessage(container);
  const target = qTarget();
  container.appendChild(el("div", "nq-question", T.qreadQuestion(fmtP(target))));
  const wrap = el("div", "nq-table-wrap");
  container.appendChild(wrap);
  renderTable(wrap, nearestCell(target).z, wrap.clientWidth, handleQCell);
}

// Tabellenausschnitt: 8 Zeilen; bei genügend Breite alle 10 Spalten, sonst 6.
// Die Lage des Zielwerts im Ausschnitt variiert, damit sie nichts verrät.
function renderTable(wrap, z, width, onCell) {
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
      const cell = button(PHI_TABLE_ROWS[r][c], "nq-cell" + (isWrong ? " is-wrong" : ""), () => onCell(r, c));
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
  let note;
  if (task.type === "prob") {
    box.appendChild(el("div", "nq-result-text", T.resultText(xTermText(task.term), fmtProb(state.result), fmtPercent(state.result))));
    note = Math.round(parseFloat(task.r.out) * 10000) === state.result ? T.rSame : T.rDiff;
  } else {
    const x = fmtX(state.quant.x);
    box.appendChild(el("div", "nq-result-text", T.resultQuant(x, givenText(task, x).replace(" = ", " ≈ "))));
    note = Math.round(parseFloat(task.r.out) * 100) === state.quant.x ? T.rQuantSame : T.rQuantDiff;
  }

  box.appendChild(el("div", "nq-r-title", T.rTitle));
  const consoleBox = el("pre", "nq-console");
  consoleBox.textContent = `> ${task.r.call}\n[1] ${task.r.out}`;
  box.appendChild(consoleBox);
  box.appendChild(el("div", "nq-r-note", note));
  container.appendChild(box);

  const actions = el("div", "nq-action-row");
  if (progress.solved.length === TASKS.length) actions.appendChild(el("div", "nq-all-solved", T.allSolved));
  if (state.index < TASKS.length - 1) actions.appendChild(button(T.next, "", () => startTask(state.index + 1)));
  else actions.appendChild(button(T.again, "", () => startTask(0)));
  container.appendChild(actions);
}

/* --------------------------------------------------------------------------
   Grafik: Doppelplot wie Video 9 (oben Z, unten X, Achsen deckungsgleich)
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

function svgText(attrs, text) {
  const node = svgEl("text", attrs);
  node.textContent = text;
  return node;
}

// Bereich [lo, hi] auf der z-Skala zu einem Z-Term
function termRegion(t) {
  if (t.k === "le") return [X_MIN, t.z / 100];
  if (t.k === "ge") return [t.z / 100, X_MAX];
  return [t.a / 100, t.b / 100];
}

// Grenzen eines Z-Terms als Beschriftungen
function termLabels(t) {
  return (t.k === "bw" ? [t.a, t.b] : [t.z]).map(h => ({ z: h / 100, text: fmtZ(h) }));
}

// Zeichnet eine Dichte mit Flächen in eine Gruppe.
// g: { X, base, height, mini, ticks: [{z, text}], name, title }
// panel: { region: [lo, hi] | null, labels: [{z, text}] }
function drawPanel(svg, g, panel, mirrorFrom) {
  const Y = y => g.base - y / 0.4 * g.height;
  const areaPath = (lo, hi) => {
    const a = clamp(lo, X_MIN, X_MAX);
    const b = clamp(hi, X_MIN, X_MAX);
    const steps = 80;
    let d = `M ${g.X(a).toFixed(1)} ${Y(0).toFixed(1)}`;
    for (let i = 0; i <= steps; i++) {
      const x = a + (b - a) * i / steps;
      d += ` L ${g.X(x).toFixed(1)} ${Y(pdf(x)).toFixed(1)}`;
    }
    return d + ` L ${g.X(b).toFixed(1)} ${Y(0).toFixed(1)} Z`;
  };

  svg.appendChild(svgEl("path", { d: areaPath(X_MIN, X_MAX), fill: COLORS.neutral, "fill-opacity": 0.45 }));
  const target = panel.region ? svgEl("path", { d: areaPath(...panel.region), fill: COLORS.area, "fill-opacity": 0.85 }) : null;
  if (target) svg.appendChild(target);

  let curve = "";
  for (let i = 0; i <= 140; i++) {
    const x = X_MIN + (X_MAX - X_MIN) * i / 140;
    curve += `${i ? "L" : "M"} ${g.X(x).toFixed(1)} ${Y(pdf(x)).toFixed(1)} `;
  }
  svg.appendChild(svgEl("path", { d: curve, fill: "none", stroke: COLORS.curve, "stroke-width": g.mini ? 2.2 : 2 }));
  svg.appendChild(svgEl("line", { x1: g.X(X_MIN), x2: g.X(X_MAX), y1: g.base, y2: g.base, stroke: COLORS.curve, "stroke-width": 1.2 }));

  (g.ticks || []).forEach(tick => {
    svg.appendChild(svgEl("line", { x1: g.X(tick.z), x2: g.X(tick.z), y1: g.base, y2: g.base + 5, stroke: COLORS.muted }));
    svg.appendChild(svgText({ x: g.X(tick.z), y: g.base + 19, "text-anchor": "middle", class: "nq-tick" }, tick.text));
  });
  if (g.name) svg.appendChild(svgText({ x: g.X(X_MAX), y: g.base - 6, "text-anchor": "end", class: "nq-axis-name" }, g.name));
  if (g.title) svg.appendChild(svgText({ x: g.X(X_MIN), y: g.base - g.height + 4, class: "nq-panel-label" }, g.title));

  const labels = panel.labels || [];
  // Liegen zwei Grenzen eng beieinander, werden die Beschriftungen nach außen geschoben.
  const close = labels.length === 2 && g.X(labels[1].z) - g.X(labels[0].z) < (g.mini ? 100 : 60);
  labels.forEach((label, i) => {
    const x = g.X(label.z);
    svg.appendChild(svgEl("line", { x1: x, x2: x, y1: g.base, y2: Y(pdf(label.z)), stroke: COLORS.area, "stroke-width": g.mini ? 2 : 1.6 }));
    const anchor = close ? (i === 0 ? "end" : "start") : "middle";
    const dx = close ? (i === 0 ? -3 : 3) : 0;
    svg.appendChild(svgText({ x: x + dx, y: g.mini ? g.base + 26 : g.base + 40, "text-anchor": anchor, class: "nq-bound" }, label.text));
  });

  // Symmetrie: alte Fläche wird an der senkrechten Achse bei 0 auf die neue gespiegelt.
  if (mirrorFrom && target && !prefersReducedMotion()) {
    const ghost = svgEl("path", { d: areaPath(...mirrorFrom), fill: COLORS.area, "fill-opacity": 0.85 });
    svg.insertBefore(ghost, target);
    target.setAttribute("fill-opacity", "0");
    const x0 = g.X(0);
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
  return Y;
}

// Kleine Skizze eines Z-Terms für Schritt-Erklärungen (ohne Achsenzahlen).
function densityPlot(t) {
  const W = 240;
  const pad = 10;
  const svg = svgEl("svg", { viewBox: `0 0 ${W} 150`, class: "nq-plot is-mini", role: "img" });
  svg.setAttribute("aria-label", areaText(t));
  const X = x => pad + (x - X_MIN) / (X_MAX - X_MIN) * (W - 2 * pad);
  drawPanel(svg, { X, base: 112, height: 100, mini: true }, { region: termRegion(t), labels: termLabels(t) });
  return svg;
}

// spec: { top, bottom: { region, labels }, arrows: [{ z, dir: "up" | "down" }], bigTop, mirrorFrom, label }
// Oben Z mit Achse z, unten X mit Achse x = μ + σz; beide auf derselben z-Skala.
function doublePlot(spec) {
  const task = currentTask();
  const W = 480;
  const pad = 18;
  const X = z => pad + (z - X_MIN) / (X_MAX - X_MIN) * (W - 2 * pad);
  const topH = spec.bigTop ? 150 : 110;
  const botH = spec.bigTop ? 80 : 110;
  const topBase = 16 + topH;
  const botBase = topBase + 74 + botH;
  const H = botBase + 48;

  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "nq-plot", role: "img" });
  svg.setAttribute("aria-label", spec.label || "");
  const ks = [-3, -2, -1, 0, 1, 2, 3];
  drawPanel(svg, {
    X, base: topBase, height: topH, name: "z", title: "Z ~ N(0, 1)",
    ticks: ks.map(k => ({ z: k, text: fmtNum(k) }))
  }, spec.top, spec.mirrorFrom);
  const Ybot = drawPanel(svg, {
    X, base: botBase, height: botH, name: "x", title: `X ~ ${modelText(task)}`,
    ticks: ks.map(k => ({ z: k, text: fmtNum(task.mu + k * task.sigma) }))
  }, spec.bottom);

  // Pfeile zwischen x (unten) und z (oben), unterhalb der Beschriftung des oberen Plots.
  (spec.arrows || []).forEach(a => {
    const x = X(a.z);
    const yTop = topBase + 48;
    const yBot = Ybot(pdf(a.z)) - 4;
    const [from, to] = a.dir === "down" ? [yTop, yBot] : [yBot, yTop];
    const dirSign = to < from ? 1 : -1;
    svg.appendChild(svgEl("line", { x1: x, x2: x, y1: from, y2: to + dirSign * 6, stroke: COLORS.muted, "stroke-width": 1.6, "stroke-dasharray": "4 3" }));
    svg.appendChild(svgEl("path", { d: `M ${x} ${to} L ${x - 5} ${to + dirSign * 8} L ${x + 5} ${to + dirSign * 8} Z`, fill: COLORS.muted }));
  });
  return svg;
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function xRegion(t, task) {
  const toZ = x => (x - task.mu) / task.sigma;
  if (t.k === "le") return [X_MIN, toZ(t.x)];
  if (t.k === "ge") return [toZ(t.x), X_MAX];
  return [toZ(t.a), toZ(t.b)];
}

function xLabels(t, task) {
  return xBounds(t).map(x => ({ z: (x - task.mu) / task.sigma, text: fmtNum(x) }));
}

function xAreaText(t) {
  if (t.k === "le") return T.areaLeft(fmtNum(t.x));
  if (t.k === "ge") return T.areaRight(fmtNum(t.x));
  return T.areaBetween(fmtNum(t.a), fmtNum(t.b));
}

function renderGraph(container) {
  const task = currentTask();
  const { title, spec, caption } = task.type === "prob" ? probGraph(task) : quantGraph(task);
  container.appendChild(el("div", "nq-section-title", title));
  const figure = el("figure", "nq-figure");
  spec.label = caption;
  figure.appendChild(doublePlot(spec));
  figure.appendChild(el("figcaption", "nq-caption", caption));
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

function probGraph(task) {
  const bottom = { region: xRegion(task.term, task), labels: xLabels(task.term, task) };
  if (state.phase === "std") {
    // Bereits standardisierte Grenzen erscheinen oben mit Pfeil; die Fläche oben folgt am Ende.
    const done = state.std.done.map(d => ({ z: d.z / 100, text: fmtZ(d.z) }));
    return {
      title: T.graphStd,
      caption: xAreaText(task.term),
      spec: { top: { region: null, labels: done }, bottom, arrows: done.map(d => ({ z: d.z, dir: "up" })) }
    };
  }

  let term;
  let title;
  let caption;
  if (state.phase === "transform" || state.phase === "diff") {
    term = getAt(state.expr, activePath()).t;
    title = T.graphCurrent;
    caption = areaText(term);
  } else if (state.phase === "read") {
    term = LE(getAt(state.expr, activePath()).z);
    title = T.graphRead;
    caption = `${phiText(term.z)} = ${areaText(term)}`;
  } else {
    term = state.zTerm;
    title = T.graphResult;
    caption = `${xAreaText(task.term)} ≈ ${fmtProb(state.result)}`;
  }
  // Pfeile nur, solange oben die Fläche direkt nach der Standardisierung zu sehen ist.
  const arrows = sameTerm(term, state.zTerm) ? termLabels(term).map(l => ({ z: l.z, dir: "up" })) : [];
  return {
    title,
    caption,
    spec: {
      top: { region: termRegion(term), labels: termLabels(term) },
      bottom,
      arrows,
      bigTop: true,
      mirrorFrom: state.mirrorFrom ? termRegion(state.mirrorFrom) : null
    }
  };
}

function quantGraph(task) {
  const q = state.quant;
  const p = leftP(task);
  // Lage von z und x aus der exakten Tabellenlösung; vor dem Ablesen nur mit „?“ beschriftet.
  const zTrue = (state.quant.sym ? -nearestCell(10000 - p).z : nearestCell(p).z) / 100;
  const leftOf = z => [X_MIN, z];
  const given = task.given.k === "ge" ? [zTrue, X_MAX] : leftOf(zTrue);

  if (state.phase === "left") {
    return {
      title: T.graphQuant,
      caption: T.capGiven(task.given.k, fmtP(task.given.p)),
      spec: { top: { region: null, labels: [] }, bottom: { region: given, labels: [{ z: zTrue, text: "x" }] } }
    };
  }
  const bottomLeft = { region: leftOf(zTrue), labels: [{ z: zTrue, text: q.x === null ? "x" : fmtX(q.x) }] };
  if (state.phase === "qsym" || state.phase === "qread") {
    const top = state.phase === "qread" && q.sym
      ? { region: leftOf(-zTrue), labels: [{ z: -zTrue, text: "−z" }] }
      : { region: leftOf(zTrue), labels: [{ z: zTrue, text: "z" }] };
    const value = state.phase === "qread" ? qTarget() : p;
    const phi = state.phase === "qread" && q.sym ? "Φ(−z)" : "Φ(z)";
    return {
      title: T.graphQuant,
      caption: `${phi} = ${fmtP(value)}`,
      spec: { top, bottom: { region: leftOf(zTrue), labels: [{ z: zTrue, text: "x" }] }, bigTop: true }
    };
  }
  const top = { region: leftOf(zTrue), labels: [{ z: zTrue, text: fmtZ(q.z) }] };
  return {
    title: T.graphQuant,
    caption: q.x === null ? T.capOpen(`z ≈ ${fmtZ(q.z)}`) : `z ≈ ${fmtZ(q.z)}, x ≈ ${fmtX(q.x)}`,
    spec: { top, bottom: q.x === null ? { region: leftOf(zTrue), labels: [{ z: zTrue, text: "?" }] } : bottomLeft, arrows: [{ z: zTrue, dir: "down" }] }
  };
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
      cell.appendChild(densityPlot(part));
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
  if (state.phase !== "read" && state.phase !== "qread") return;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(render, 150);
});

startTask(progress.current);
