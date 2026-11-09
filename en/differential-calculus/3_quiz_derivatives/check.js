// check.js – Selbstprüfung der Aufgaben (Aufruf: de/index.html?check).
// Plan Abschnitt 9: f' gegen den Differenzenquotienten; je Schritt stimmen richtige Optionen
// numerisch mit dem Ziel überein, jede falsche Option weicht an mindestens zwei Prüfstellen ab;
// keine doppelten Optionen; genau eine richtige Option (bzw. Hauptweg + alternativer Weg).

function runChecks(stage) {
  const out = [];
  let fails = 0;
  const fail = msg => { fails++; out.push("FEHLER " + msg); };
  const close = (a, b) => Math.abs(a - b) <= 1e-5 * Math.max(1, Math.abs(a), Math.abs(b));
  const nd = (g, x) => { const h = 1e-5 * Math.max(1, Math.abs(x)); return (g(x + h) - g(x - h)) / (2 * h); };
  const ptsOf = (dom, k = 6) => Array.from({ length: k }, (_, i) => dom[0] + (dom[1] - dom[0]) * (i + 0.5) / k);

  // Englische Fassung: jeder Aufgabentext muss übersetzt sein (tasks_en.js).
  if (typeof TASK_TEXT_MISSING !== "undefined") {
    TASK_TEXT_MISSING.forEach(s => fail(`nicht übersetzt: ${s}`));
    if (!TASK_TEXT_MISSING.length) out.push(`Übersetzung: alle Aufgabentexte übersetzt (${Object.keys(TASK_TEXT_EN).length} Tabelleneinträge + ${TASK_RULES_EN.length} Regeln)`);
  }

  TASKS.forEach((t, ti) => {
    if (t.id !== ti + 1) fail(`Aufgabe ${ti + 1}: id ${t.id}`);
    const pts = ptsOf(t.dom);
    pts.forEach(x => { if (!close(t.dfn(x), nd(t.fn, x))) fail(`Aufgabe ${t.id}: f' weicht bei ${x.toFixed(3)} ab`); });
    const routes = [["Hauptweg", t.steps]].concat(t.alt ? [["alternativer Weg", t.alt.steps]] : []);
    routes.forEach(([name, steps]) => {
      const last = steps.filter(s => s.chk && s.chk.mode === "eq" && ["combine", "simplify", "subst"].includes(s.phase)).pop();
      steps.forEach((s, si) => {
        const where = `Aufgabe ${t.id}, ${name}, Schritt ${si + 1} (${s.phase})`;
        if (s.phase === "auto") return;
        const labels = s.opts.map(o => o[0]);
        if (new Set(labels).size !== labels.length) fail(`${where}: doppelte Optionen`);
        const okCount = s.opts.filter(o => o[1] === 1).length;
        const altCount = s.opts.filter(o => o[1] === "alt").length;
        if (okCount !== 1) fail(`${where}: ${okCount} richtige Optionen`);
        if (altCount && !t.alt) fail(`${where}: alt ohne alternativen Weg`);
        s.opts.forEach(o => { if (o[1] === 0 && !o[2]) fail(`${where}: falsche Option ohne Rückmeldung (${o[0]})`); });
        if (!s.chk) return;
        const cp = s.chk.pts || pts;
        const target = x => (s.chk.mode === "d" ? nd(s.chk.g, x) : s.chk.g(x));
        s.opts.forEach((o, oi) => {
          if (typeof o[3] !== "function") return;
          const diffs = cp.filter(x => !close(o[3](x), target(x))).length;
          const ok = o[1] === 1 || o[1] === "alt";
          if (ok && diffs) fail(`${where}: richtige Option ${"ABCD"[oi]} weicht an ${diffs} Stellen ab`);
          if (!ok && diffs < 2) fail(`${where}: falsche Option ${"ABCD"[oi]} weicht nur an ${diffs} Stellen ab`);
        });
      });
      // Endform des Weges = f'
      if (last) pts.forEach(x => { if (!close(last.chk.g(x), t.dfn(x))) fail(`Aufgabe ${t.id}, ${name}: Endform ≠ f' bei ${x.toFixed(3)}`); });
    });
    out.push(`Aufgabe ${t.id}: geprüft (${t.steps.length} Schritte${t.alt ? `, alternativer Weg ${t.alt.steps.length}` : ""})`);
  });
  out.unshift(fails ? `CHECK FAIL (${fails})` : "CHECK OK");
  document.title = out[0];
  const pre = document.createElement("pre");
  pre.id = "checkReport";
  pre.textContent = out.join("\n");
  stage.replaceChildren(pre);
}
