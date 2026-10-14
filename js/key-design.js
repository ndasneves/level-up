/* Présentation de la Clé : fragments visibles, sans fiches ni écran supplémentaire. */
"use strict";
function corpsCodexCle() {
  const c = campagne(),
    missions = CG.missions.filter((m) => m.fragment),
    obtained = new Set(
      missions.filter((m) => c.completed.includes(m.id)).map((m) => m.id),
    );
  return `<div class="key-display">${svgCleComplete(obtained, c.keyFound)}</div><div class="key-progress" role="progressbar" aria-label="Fragments de la Clé retrouvés" aria-valuenow="${obtained.size + (c.keyFound ? 1 : 0)}" aria-valuemin="0" aria-valuemax="9">${missions.map((m) => `<span class="${obtained.has(m.id) ? "lit" : ""}"></span>`).join("")}<span class="${c.keyFound ? "lit" : ""}"></span></div><p class="key-total">${obtained.size + (c.keyFound ? 1 : 0)} / 9 fragments retrouvés</p><div class="fragment-runes" aria-label="Runes des fragments">${missions.map((m, i) => `<span class="rune ${obtained.has(m.id) ? "found" : ""}" aria-label="Fragment ${i + 1} : ${obtained.has(m.id) ? "retrouvé, rune " + m.fragment : "manquant"}">${obtained.has(m.id) ? m.fragment : "?"}</span>`).join("")}</div><p class="hint">${c.keyFound ? "Le cœur de la Clé est éveillé." : "Chaque fragment retrouvé illumine une partie de la Clé."}</p>`;
}
function htmlCleVisuelle() {
  return `<section class="win key-chamber"><div class="win-head">Codex de la Clé</div>${corpsCodexCle()}</section>`;
}
htmlFragments = htmlCleVisuelle;
htmlProgressionCle = htmlCleVisuelle;
