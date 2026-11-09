// visuals.js – Strukturbaum, Regelbilder und Doppelplot für das Quiz „Ableitungen“.
// Formeln mit KaTeX (lokale Kopie), Grafiken als SVG. Texte kommen aus I18N (app.js: T).

const COL = { u: "#2F6FB3", v: "#C4772B", curve: "#20242A", muted: "#68707C", grid: "#E3E6EA",
              tangent: "#2F6FB3", point: "#C4772B", soft: "#E9ECEF" };
const SVG_NS = "http://www.w3.org/2000/svg";
/* ---------------------------------------------------------------- Formeln */

// \U{…} und \V{…} färben u blau und v orange. Direkt ersetzt statt als KaTeX-Makro, weil
// „#2…“ im Makrotext als Parameter gelesen würde.
function colorTex(tex) {
  return tex.replace(/\\U\{/g, `\\textcolor{${COL.u}}{`).replace(/\\V\{/g, `\\textcolor{${COL.v}}{`);
}

function texInto(node, tex, display = false) {
  try {
    katex.render(colorTex(tex), node, { throwOnError: false, displayMode: display });
  } catch (_) {
    node.textContent = tex;
  }
  return node;
}

function texEl(tag, className, tex, display = false) {
  return texInto(el(tag, className), tex, display);
}

// Text mit $…$-Formeln
function mixedInto(node, text) {
  String(text).split(/(\$[^$]+\$)/).forEach(part => {
    if (!part) return;
    if (part.startsWith("$") && part.endsWith("$")) node.appendChild(texEl("span", "dq-inline", part.slice(1, -1)));
    else node.appendChild(document.createTextNode(part));
  });
  return node;
}

// Optionsbeschriftung: „T:…“ = Klartext mit $…$, sonst TeX
function labelInto(node, raw) {
  if (raw.startsWith("T:")) return mixedInto(node, raw.slice(2));
  return texInto(node, String.raw`\displaystyle ` + raw);   // Brüche in normaler Größe
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function fmt(v, digits = 2) {
  if (!Number.isFinite(v)) return "–";
  if (Math.abs(v) < 0.5 * 10 ** -digits) v = 0;   // kein „−0“
  const s = Math.abs(v) >= 1000 ? Math.round(v).toLocaleString(T.locale)
    : v.toLocaleString(T.locale, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
  return s.replace("-", "−");
}

function fmtTex(v, digits = 2) {
  return fmt(v, digits).replace(/−/g, "-").replace(/,/g, "{,}");
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------------------------------------------------------- Strukturbaum */

// nodes: [{id, parent, tex, role}], ns: {id: {shown, tag, done, label}}, active: id
function renderTree(container, nodes, ns, active) {
  const shown = nodes.filter(n => ns[n.id] && ns[n.id].shown);
  const kids = id => shown.filter(n => n.parent === id);
  const root = shown.find(n => !n.parent);
  const pos = {};
  let leafIndex = 0;
  let maxDepth = 0;
  (function place(n, depth) {
    maxDepth = Math.max(maxDepth, depth);
    const c = kids(n.id);
    if (!c.length) { pos[n.id] = { x: leafIndex++ + 0.5, depth, span: 1 }; return; }
    c.forEach(k => place(k, depth + 1));
    pos[n.id] = { x: (pos[c[0].id].x + pos[c[c.length - 1].id].x) / 2, depth,
                  span: c.reduce((s, k) => s + pos[k.id].span, 0) };
  })(root, 0);

  // Review 4: Kästen wachsen mit dem Inhalt. Breite höchstens der Platz, der dem Knoten im
  // Baum zusteht (Anteil seiner Blätter); Zeilenhöhe nach dem höchsten Kasten der Ebene.
  const wrap = el("div", "dq-tree");
  const svg = svgEl("svg", { class: "dq-tree-edges", "aria-hidden": "true" });
  wrap.appendChild(svg);
  const boxes = {};
  shown.forEach(n => {
    const st = ns[n.id];
    const box = el("div", "dq-node" + (n.role ? ` is-${n.role}` : "") + (n.id === active ? " is-active" : "")
      + (st.done ? " is-done" : ""));
    box.style.left = `${(pos[n.id].x / leafIndex) * 100}%`;
    box.style.maxWidth = `calc(${(pos[n.id].span / leafIndex) * 100}% - 10px)`;
    if (st.tag) box.appendChild(el("div", "dq-node-tag", T.tags[st.tag]));
    box.appendChild(texEl("div", "dq-node-expr", String.raw`\displaystyle ` + (st.label || n.tex)));
    if (st.done) {
      const d = el("div", "dq-node-deriv");
      d.appendChild(el("div", "dq-node-prime", T.derivLabel));
      d.appendChild(texEl("div", "dq-node-deriv-tex", String.raw`\displaystyle ` + st.done));
      box.appendChild(d);
    }
    wrap.appendChild(box);
    boxes[n.id] = box;
  });
  container.appendChild(wrap);

  // Zeilen und Kanten nach dem Layout (Kästen haben unterschiedliche Höhen)
  const gap = 34;
  const layout = () => {
    const rowH = Array(maxDepth + 1).fill(0);
    shown.forEach(n => { rowH[pos[n.id].depth] = Math.max(rowH[pos[n.id].depth], boxes[n.id].offsetHeight); });
    const top = [0];
    for (let d = 1; d <= maxDepth; d++) top[d] = top[d - 1] + rowH[d - 1] + gap;
    shown.forEach(n => { boxes[n.id].style.top = `${top[pos[n.id].depth]}px`; });
    wrap.style.height = `${top[maxDepth] + rowH[maxDepth] + 6}px`;
    svg.replaceChildren();
    const base = wrap.getBoundingClientRect();
    shown.filter(n => n.parent && boxes[n.parent]).forEach(n => {
      const a = boxes[n.parent].getBoundingClientRect();
      const b = boxes[n.id].getBoundingClientRect();
      svg.appendChild(svgEl("line", {
        x1: a.left + a.width / 2 - base.left, y1: a.bottom - base.top,
        x2: b.left + b.width / 2 - base.left, y2: b.top - base.top,
        stroke: "#B9BFC7", "stroke-width": 1.6
      }));
    });
  };
  layout();
  requestAnimationFrame(layout);   // nochmals, falls Schriften erst jetzt geladen sind
}

/* ------------------------------------------------------------ Regelbilder */

function ruleCard(container, title) {
  const card = el("div", "dq-rule");
  card.appendChild(el("div", "dq-rule-title", title));
  container.appendChild(card);
  return card;
}

function renderRule(container, rule, task) {
  if (!rule) return;
  const card = ruleCard(container, T.ruleTitles[rule.k]);
  const add = (tex, cls = "dq-rule-formula") => card.appendChild(texEl("div", cls, tex, true));
  const note = text => card.appendChild(mixedInto(el("div", "dq-rule-note"), text));
  switch (rule.k) {
    case "sum":
      add(String.raw`\bigl(g(x) + h(x)\bigr)' = g'(x) + h'(x)`);
      note(T.ruleNotes.sum);
      break;
    case "const":
      add(String.raw`f(x) = b \;\Rightarrow\; f'(x) = 0`);
      card.appendChild(miniGraph(() => 1.5, () => 0, [0.6, 2.2], [-0.5, 3], T.ruleNotes.constGraph));
      break;
    case "power": powerRule(card, rule); break;
    case "exp":
      add(String.raw`f(x) = e^x \;\Rightarrow\; f'(x) = e^x`);
      card.appendChild(miniGraph(Math.exp, Math.exp, [0, 1], [-1.6, 1.4], T.ruleNotes.expGraph));
      break;
    case "ln":
      add(String.raw`f(x) = \ln x \;\Rightarrow\; f'(x) = \tfrac{1}{x} \quad (x > 0)`);
      card.appendChild(miniGraph(Math.log, x => 1 / x, [1, 2], [0.15, 3.2], T.ruleNotes.lnGraph));
      break;
    case "rewrite":
      rule.rows.forEach(([a, b]) => add(`${a} = ${b}`));
      note(T.ruleNotes.rewrite);
      break;
    case "quotient":
      add(String.raw`\left(\frac{\U{u}}{\V{v}}\right)' = \frac{\U{u'} \cdot \V{v} - \U{u} \cdot \V{v'}}{\V{v}^2}`);
      note(T.ruleNotes.quotient);
      break;
    case "product":
      add(String.raw`(\U{u} \cdot \V{v})' = \U{u'} \cdot \V{v} + \U{u} \cdot \V{v'}`);
      note(T.ruleNotes.product);
      break;
    case "chain":
      add(String.raw`f'(x) = \U{u'(v(x))} \cdot \V{v'(x)}`);
      note(T.ruleNotes.chain);
      break;
    default: break;
  }
}

// Potenzregel: Exponent eingerahmt → wandert als Faktor nach vorn, oben n − 1.
function powerRule(card, rule) {
  const n = rule.n || "n";
  const num = Number(n);
  const general = el("div", "dq-power");
  general.appendChild(texEl("div", "dq-power-a", String.raw`x^{\boxed{n}}`, true));
  general.appendChild(el("div", "dq-power-arrow", "→"));
  general.appendChild(texEl("div", "dq-power-b" + (prefersReducedMotion() ? "" : " is-animated"),
    String.raw`n \cdot x^{\,n - 1}`, true));
  card.appendChild(general);
  if (n !== "n") {
    const lower = Number.isInteger(num) ? String(num - 1) : `${n} - 1`;
    card.appendChild(texEl("div", "dq-rule-formula", String.raw`x^{${n}} \;\to\; ${n} \cdot x^{${lower}}`, true));
  }
  card.appendChild(mixedInto(el("div", "dq-rule-note"), T.ruleNotes.power));
}

// Kleiner Graph mit Tangenten an den Stellen xs (eˣ, ln x, Konstante)
function miniGraph(f, df, xs, [x0, x1], caption) {
  const W = 300, H = 150, pad = 18;
  const ys = [];
  for (let i = 0; i <= 60; i++) ys.push(f(x0 + (x1 - x0) * i / 60));
  const yMin = Math.min(0, ...ys), yMax = Math.max(...ys) * 1.08;
  const X = x => pad + (x - x0) / (x1 - x0) * (W - 2 * pad);
  const Y = y => H - pad - (y - yMin) / (yMax - yMin) * (H - 2 * pad);
  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "dq-mini", role: "img", "aria-label": caption });
  svg.appendChild(svgEl("line", { x1: X(x0), y1: Y(0), x2: X(x1), y2: Y(0), stroke: COL.muted, "stroke-width": 1 }));
  if (x0 <= 0 && x1 >= 0) svg.appendChild(svgEl("line", { x1: X(0), y1: Y(yMin), x2: X(0), y2: Y(yMax), stroke: COL.muted, "stroke-width": 1 }));
  let d = "";
  for (let i = 0; i <= 80; i++) {
    const x = x0 + (x1 - x0) * i / 80;
    d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(f(x)).toFixed(1);
  }
  svg.appendChild(svgEl("path", { d, fill: "none", stroke: COL.curve, "stroke-width": 2.2 }));
  xs.forEach(x => {
    const s = df(x), y = f(x), h = (x1 - x0) * 0.16;
    svg.appendChild(svgEl("line", { x1: X(x - h), y1: Y(y - s * h), x2: X(x + h), y2: Y(y + s * h), stroke: COL.tangent, "stroke-width": 2 }));
    svg.appendChild(svgEl("circle", { cx: X(x), cy: Y(y), r: 3.5, fill: COL.point }));
    const t = svgEl("text", { x: X(x) + 6, y: Y(y) - 8, class: "dq-mini-label" });
    t.textContent = T.slopeLabel(fmt(x), fmt(y), fmt(s));
    svg.appendChild(t);
  });
  const fig = el("figure", "dq-mini-figure");
  fig.appendChild(svg);
  fig.appendChild(mixedInto(el("figcaption", "dq-rule-note"), caption));
  return fig;
}

/* -------------------------------------------------------------- Doppelplot */

// Oben f mit Tangente an der Stelle x0, unten f' mit Punkt (x0, f'(x0)); gleiche x-Achse.
function doublePlot(container, task) {
  const v = task.v || "x", fname = task.fname || "f";
  const W = 420, H = 380, padL = 46, padR = 12, gap = 30, panelH = (H - 2 * 14 - gap) / 2;
  const [a, b] = task.dom;
  const xs = Array.from({ length: 241 }, (_, i) => a + (b - a) * i / 240);
  const range = g => {
    const vals = xs.map(g).filter(Number.isFinite).sort((p, q) => p - q);
    let lo = vals[Math.floor(vals.length * 0.02)], hi = vals[Math.ceil(vals.length * 0.98) - 1];
    lo = Math.min(lo, 0); hi = Math.max(hi, 0);
    const m = (hi - lo) * 0.08 || 1;
    return [lo - m, hi + m];
  };
  const panels = [
    { g: task.fn, top: 14, yr: range(task.fn), label: `${fname}(${v})` },
    { g: task.dfn, top: 14 + panelH + gap, yr: range(task.dfn), label: `${fname}'(${v})` }
  ];
  const X = x => padL + (x - a) / (b - a) * (W - padL - padR);
  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "dq-plot", role: "img", "aria-label": T.plotAria });
  const slider = el("input");
  Object.assign(slider, { type: "range", min: 0, max: 400, value: Math.round((task.x0 - a) / (b - a) * 400) });
  slider.setAttribute("aria-label", T.plotSlider(v));
  const info = el("div", "dq-rule-numbers");

  function draw() {
    svg.replaceChildren();
    const x0 = a + (b - a) * slider.value / 400;
    panels.forEach((p, k) => {
      const [lo, hi] = p.yr;
      const Y = y => p.top + panelH - (y - lo) / (hi - lo) * panelH;
      const clipId = `dqclip${k}`;
      const defs = svgEl("defs");
      const cp = svgEl("clipPath", { id: clipId });
      cp.appendChild(svgEl("rect", { x: padL, y: p.top, width: W - padL - padR, height: panelH }));
      defs.appendChild(cp);
      svg.appendChild(defs);
      svg.appendChild(svgEl("rect", { x: padL, y: p.top, width: W - padL - padR, height: panelH, fill: "#FAFBFC", stroke: COL.grid }));
      if (lo < 0 && hi > 0) svg.appendChild(svgEl("line", { x1: padL, x2: W - padR, y1: Y(0), y2: Y(0), stroke: COL.muted, "stroke-width": 1 }));
      if (a < 0 && b > 0) svg.appendChild(svgEl("line", { x1: X(0), x2: X(0), y1: p.top, y2: p.top + panelH, stroke: COL.muted, "stroke-width": 1 }));
      niceTicks(lo, hi, 4).forEach(t => {
        const tx = svgEl("text", { x: padL - 5, y: Y(t) + 4, "text-anchor": "end", class: "dq-tick" });
        tx.textContent = fmt(t);
        svg.appendChild(tx);
      });
      let d = "", pen = false;
      xs.forEach(x => {
        const y = p.g(x);
        if (!Number.isFinite(y)) { pen = false; return; }
        d += (pen ? "L" : "M") + X(x).toFixed(1) + " " + Y(Math.max(lo - (hi - lo), Math.min(hi + (hi - lo), y))).toFixed(1);
        pen = true;
      });
      const g = svgEl("g", { "clip-path": `url(#${clipId})` });
      g.appendChild(svgEl("path", { d, fill: "none", stroke: COL.curve, "stroke-width": 2.2 }));
      const y0 = p.g(x0);
      if (k === 0) {
        const s = task.dfn(x0), h = (b - a) * 0.22;
        g.appendChild(svgEl("line", { x1: X(x0 - h), y1: Y(y0 - s * h), x2: X(x0 + h), y2: Y(y0 + s * h), stroke: COL.tangent, "stroke-width": 2.4 }));
      }
      g.appendChild(svgEl("circle", { cx: X(x0), cy: Y(y0), r: 4.5, fill: k === 0 ? COL.tangent : COL.point }));
      svg.appendChild(g);
      const lab = svgEl("text", { x: padL + 6, y: p.top + 15, class: "dq-panel-label" });
      lab.textContent = p.label;
      svg.appendChild(lab);
    });
    svg.appendChild(svgEl("line", { x1: X(x0), x2: X(x0), y1: 14, y2: H - 14, stroke: COL.point, "stroke-dasharray": "4 4", "stroke-width": 1.2 }));
    niceTicks(a, b, 5).forEach(t => {
      const tx = svgEl("text", { x: X(t), y: H - 1, "text-anchor": "middle", class: "dq-tick" });
      tx.textContent = fmt(t);
      svg.appendChild(tx);
    });
    info.replaceChildren();
    mixedInto(info, T.plotNumbers(v, fname, fmtTex(x0), fmtTex(task.dfn(x0))));
  }
  slider.addEventListener("input", draw);
  draw();
  const card = ruleCard(container, T.plotTitle);
  card.appendChild(svg);
  const row = el("label", "dq-slider");
  row.append(mixedInto(el("span", ""), T.plotSlider(v)), slider);
  card.appendChild(row);
  card.appendChild(info);
  card.appendChild(mixedInto(el("div", "dq-rule-note"), T.plotNote(v, fname) + (task.consts ? ` ${T.constsNote(task.consts)}` : "")));
}

function niceTicks(lo, hi, count) {
  const span = hi - lo;
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) || raw;
  const out = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi + 1e-9; t += step) out.push(Math.abs(t) < 1e-12 ? 0 : t);
  return out;
}
