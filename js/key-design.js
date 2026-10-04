/* Présentation de la Clé : fragments visibles, sans fiches ni écran supplémentaire. */
"use strict";
function htmlCleVisuelle() {
  const c = campagne(),
    missions = CG.missions.filter((m) => m.fragment),
    obtained = new Set(
      missions.filter((m) => c.completed.includes(m.id)).map((m) => m.id),
    );
  return `<section class="win key-chamber"><div class="win-head">Codex de la Clé</div><span class="key-caption">${c.keyFound ? "Clé reconstituée" : "Reconstitution en cours"}</span><div class="key-display">${svgCleComplete(obtained, c.keyFound)}</div><div class="key-progress" role="progressbar" aria-label="Fragments de la Clé retrouvés" aria-valuenow="${obtained.size}" aria-valuemin="0" aria-valuemax="8">${missions.map((m) => `<span class="${obtained.has(m.id) ? "lit" : ""}"></span>`).join("")}</div><p class="key-total">${obtained.size} / 8 fragments retrouvés</p><p class="hint">${c.keyFound ? "Cœur retrouvé · " + (obtained.size + 1) + " / 9 morceaux" : "Un emplacement demeure vide au centre de la Clé."}</p><div class="fragment-runes" aria-label="Runes des fragments">${missions.map((m, i) => `<span class="rune ${obtained.has(m.id) ? "found" : ""}" aria-label="Fragment ${i + 1} : ${obtained.has(m.id) ? "retrouvé, rune " + m.fragment : "manquant"}">${obtained.has(m.id) ? m.fragment : "?"}</span>`).join("")}</div><p class="hint">${c.keyFound ? "Le cœur de la Clé est éveillé." : "Chaque fragment retrouvé illumine une partie de la Clé."}</p></section>`;
}
htmlFragments = htmlCleVisuelle;
htmlProgressionCle = htmlCleVisuelle;
