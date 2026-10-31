// Aufgaben in fester Reihenfolge: grob steigende Schwierigkeit, Typen durchmischt.
// X ~ N(mu, sigma²); var: true = Angabe mit der Varianz, z. B. N(180, 64) statt N(180, 8²).
// Wahrscheinlichkeit: Grenzen x ganzzahlig und so gewählt, dass z = (x − mu)/sigma genau zwei
// Nachkommastellen hat. Termformen wie in Quiz 08: le = P(X ≤ x), ge = P(X ≥ x),
// bw = P(a ≤ X ≤ b); s/sa/sb = strikte Ungleichung.
// Quantil: gegeben P(X ≤ x) = p (k: "le") bzw. P(X ≥ x) = p (k: "ge"), p in Zehntausendsteln.
// r = R-Vergleich wie in Video 9 (Ausgabe mit 7 signifikanten Stellen wie in R).
const TASKS = [
  { id: 1, type: "prob", mu: 100, sigma: 15, term: { k: "le", x: 118, s: false },
    r: { call: "pnorm(q = 118, mean = 100, sd = 15)", out: "0.8849303" } },
  { id: 2, type: "prob", mu: 500, sigma: 4, term: { k: "ge", x: 506, s: true },
    r: { call: "1 - pnorm(q = 506, mean = 500, sd = 4)", out: "0.0668072" } },
  { id: 3, type: "prob", mu: 100, sigma: 15, term: { k: "ge", x: 127, s: true },
    r: { call: "1 - pnorm(q = 127, mean = 100, sd = 15)", out: "0.03593032" } },
  { id: 4, type: "prob", mu: 500, sigma: 4, term: { k: "le", x: 495, s: true },
    r: { call: "pnorm(q = 495, mean = 500, sd = 4)", out: "0.1056498" } },
  { id: 5, type: "prob", mu: 180, sigma: 8, var: true, term: { k: "le", x: 190, s: false },
    r: { call: "pnorm(q = 190, mean = 180, sd = 8)", out: "0.8943502" } },
  { id: 6, type: "prob", mu: 30, sigma: 5, term: { k: "bw", a: 25, b: 40, sa: false, sb: false },
    r: { call: "pnorm(q = 40, mean = 30, sd = 5) - pnorm(q = 25, mean = 30, sd = 5)", out: "0.8185946" } },
  { id: 7, type: "quant", mu: 100, sigma: 15, given: { k: "ge", p: 250, s: true },
    r: { call: "qnorm(p = 0.975, mean = 100, sd = 15)", out: "129.3995" } },
  { id: 8, type: "prob", mu: 180, sigma: 8, var: true, term: { k: "ge", x: 172, s: true },
    r: { call: "1 - pnorm(q = 172, mean = 180, sd = 8)", out: "0.8413447" } },
  { id: 9, type: "quant", mu: 30, sigma: 5, given: { k: "ge", p: 1000, s: true },
    r: { call: "qnorm(p = 0.9, mean = 30, sd = 5)", out: "36.40776" } },
  { id: 10, type: "quant", mu: 500, sigma: 4, given: { k: "le", p: 250, s: true },
    r: { call: "qnorm(p = 0.025, mean = 500, sd = 4)", out: "492.1601" } }
];
