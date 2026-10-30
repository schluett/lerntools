// Aufgaben in fester Reihenfolge: grob steigende Schwierigkeit, Typen durchmischt.
// Grenzen in Hundertsteln (123 = 1,23), damit keine Rundungsfehler entstehen.
// Termformen: le = P(Z ≤ z), ge = P(Z ≥ z), bw = P(a ≤ Z ≤ b); s/sa/sb = strikte Ungleichung.
// r = R-Vergleich wie in Video 7 (Ausgabe mit 7 signifikanten Stellen wie in R).
const TASKS = [
  { id: 1, term: { k: "le", z: 123, s: false }, r: { call: "pnorm(q = 1.23)", out: "0.8906514" } },
  { id: 2, term: { k: "ge", z: 150, s: true }, r: { call: "1 - pnorm(q = 1.5)", out: "0.0668072" } },
  { id: 3, term: { k: "ge", z: -75, s: false }, r: { call: "1 - pnorm(q = -0.75)", out: "0.7733726" } },
  { id: 4, term: { k: "bw", a: 50, b: 150, sa: false, sb: false }, r: { call: "pnorm(q = 1.5) - pnorm(q = 0.5)", out: "0.2417303" } },
  { id: 5, term: { k: "le", z: -120, s: false }, r: { call: "pnorm(q = -1.2)", out: "0.1150697" } },
  { id: 6, term: { k: "ge", z: 84, s: false }, r: { call: "1 - pnorm(q = 0.84)", out: "0.2004542" } },
  { id: 7, term: { k: "bw", a: -100, b: 123, sa: false, sb: false }, r: { call: "pnorm(q = 1.23) - pnorm(q = -1)", out: "0.7319962" } },
  { id: 8, term: { k: "le", z: -52, s: true }, r: { call: "pnorm(q = -0.52)", out: "0.3015318" } },
  { id: 9, term: { k: "bw", a: -50, b: 80, sa: true, sb: true }, r: { call: "pnorm(q = 0.8) - pnorm(q = -0.5)", out: "0.4796071" } },
  { id: 10, term: { k: "bw", a: -200, b: -100, sa: false, sb: false }, r: { call: "pnorm(q = -1) - pnorm(q = -2)", out: "0.1359051" } }
];
