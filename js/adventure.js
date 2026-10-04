/* Secrets, shadow companionship and bounded replay rewards. No login streaks. */
"use strict";
function nombreFragments() {
  return CG.missions.filter(
    (m) => m.fragment && campagne().completed.includes(m.id),
  ).length;
}
function titreMission(mission) {
  const course = portailFragment(mission.id);
  return course
    ? "Fragment " + course.boss.fragment + " — " + course.boss.name
    : mission.fragment && CG.CONFIG.fragmentSource !== "campaign"
      ? "Localiser le fragment " + mission.id.replace("fragment-", "")
      : mission.title;
}
function ouvrirIndiceCle() {
  const c = campagne();
  if (c.keyFound || nombreFragments() !== 8 || c.keyHint) return;
  c.keyHint = { active: true, date: today() };
  c.history.push({
    id: "key-hint",
    date: today(),
    messages: [
      "Les chefs n’avaient pas toute la Clé. Son dernier morceau a été caché dans le Système.",
      "Là où tu observes ta force et tes connaissances, un petit sceau attend ton regard.",
    ],
  });
  sauvegarder();
}
function recupererCoeur() {
  const c = campagne();
  if (!fondamentauxTermines() || c.keyFound) return;
  c.keyFound = true;
  if (c.keyHint) c.keyHint.active = false;
  const messages = [
    "Tu touches le sceau. Une lumière oubliée s’en échappe : le cœur de la Clé !",
    nombreFragments() === 8
      ? "Les neuf morceaux s’assemblent. Le Sanctuaire pourra s’ouvrir lorsque son signal apparaîtra."
      : "Les Gardiens l’avaient caché au sein du Système. Garde-le à l’abri et retrouve les fragments restants.",
  ];
  c.history.push({ id: "hidden-heart", date: today(), messages });
  sauvegarder();
  raconter(messages);
  allerA("quests");
}
ACTIONS.memoryseal = recupererCoeur;
ACTIONS.keyhintread = function () {
  if (campagne().keyHint) campagne().keyHint.active = false;
  sauvegarder();
  allerA("status");
};
ACTIONS.secret = function () {
  if (fondamentauxTermines()) allerA("secret");
};
ACTIONS.solvekey = function () {
  if (norm($("#keyAnswer").value) !== "memoires") {
    systeme(
      "Signal incomplet",
      "<p>Lis les lettres retrouvées sur la Clé.</p>",
    );
    return;
  }
  recupererCoeur();
};

function lienOmbre() {
  const c = campagne(),
    bond = c.shadowBond?.[c.shadow] || 0;
  return {
    bond,
    title:
      bond >= 60
        ? "Compagnon du Sanctuaire"
        : bond >= 30
          ? "Allié fidèle"
          : bond >= 10
            ? "Lien éveillé"
            : "Premier pacte",
    next: bond >= 60 ? null : bond >= 30 ? 60 : bond >= 10 ? 30 : 10,
  };
}
function renforcerLien(id) {
  const c = campagne();
  if (!c.shadow || !c.shadows.includes(c.shadow)) return;
  c.shadowBond ||= {};
  c.day.shadowEncounters ||= [];
  if (c.day.shadowEncounters.includes(id) || c.day.shadowEncounters.length >= 3)
    return;
  c.day.shadowEncounters.push(id);
  c.shadowBond[c.shadow] = Math.min(60, (c.shadowBond[c.shadow] || 0) + 1);
}

const victoryBeforeAdventure = victoireBoss;
victoireBoss = function () {
  if (!B || B.over) return;
  const id = B.dId,
    alreadyCleared = !!S.dungeons[id]?.cleared;
  victoryBeforeAdventure();
  const c = campagne();
  // Three paid replays per course/day; new knowledge and medals retain their value.
  c.day.bossReplays ||= {};
  if (alreadyCleared) {
    const count = c.day.bossReplays[id] || 0;
    if (count >= 3) {
      S.gold -= UI.result.gold;
      UI.result.gold = 0;
    }
    c.day.bossReplays[id] = count + 1;
  }
  for (const potion of SHOP.potions)
    S.inv[potion.id] = Math.min(10, S.inv[potion.id] || 0);
  renforcerLien(id);
  ouvrirIndiceCle();
  sauvegarder();
};

const statusBeforeAdventure = SCREENS.status;
SCREENS.status = function () {
  const c = campagne(),
    bond = lienOmbre();
  const seal =
    !c.keyFound && fondamentauxTermines()
      ? '<button class="memory-seal" data-act="memoryseal" aria-label="Inspecter le sceau de mémoire" title="Sceau de mémoire"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3L29 16 16 29 3 16Z M16 9L23 16 16 23 9 16Z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>'
      : "";
  const companion = c.shadow
    ? `<section class="win shadow-companion"><span class="eyebrow">Ton compagnon d’ombre</span><h3>${esc(CG.CONFIG.shadows.find((s) => s.id === c.shadow)?.name || "Ombre")}</h3><p>${bond.title} · ${bond.bond}${bond.next ? " / " + bond.next : ""} aventures partagées</p><p class="sub">Le lien grandit avec trois portails différents par jour. Ces titres ne donnent aucun bonus de combat.</p></section>`
    : "";
  const knowledge = connaissancesAcquises();
  return (
    statusBeforeAdventure().replace(
      "<h2>Fenêtre de statut</h2>",
      `<div class="status-title"><h2>Fenêtre de statut</h2>${seal}</div>`,
    ) +
    companion +
    `<section class="win"><h3>Artefacts en réserve</h3><div class="derived">${ARTEFACTS.map((a) => `<span>${a.name}</span><span>×${S.inv[a.id] || 0}</span>`).join("")}</div><button class="btn" data-act="artifactshop">Voir les sceaux d’accès</button></section><section class="win"><span class="eyebrow">Savoirs acquis</span><p>${knowledge.unique} bonnes réponses uniques · ${knowledge.lessons} leçons terminées</p><p class="sub">Ces acquis ouvrent les artefacts. Refaire la même question ne la compte pas une deuxième fois.</p></section>`
  );
};
const questsBeforeAdventure = SCREENS.quests;
SCREENS.quests = function () {
  ouvrirIndiceCle();
  const c = campagne();
  let html = questsBeforeAdventure();
  for (const m of CG.missions.filter((m) => m.fragment))
    html = html.split(esc(m.title)).join(esc(titreMission(m)));
  if (c.keyHint?.active && !c.keyFound)
    html =
      `<section class="win ephemeral-quest"><span class="eyebrow">Quête découverte · Signal fugitif</span><h3>Le dernier morceau</h3><p>La Clé reste silencieuse. Son cœur n’était entre les mains d’aucun chef.</p><p>Là où tu observes ta force et tes connaissances, un petit sceau attend ton regard.</p><button class="btn gold" data-act="keyhintread">Suivre l’indice</button></section>` +
      html;
  return html;
};
const replayBeforeAdventure = ACTIONS.replaystory;
ACTIONS.replaystory = function (target) {
  const course = portailFragment(target.dataset.id);
  if (course) {
    UI.dId = course.id;
    UI.arch = DMAP[course.id].s.id;
    allerA("lesson");
    return;
  }
  replayBeforeAdventure(target);
};

ACTIONS.artifactshop = function () {
  UI.shopTab = "artefacts";
  allerA("shop");
};
function htmlCodexOmbres() {
  const entries = Object.values(S.codex || {}),
    page = pageIndex(UI.codexPage, entries.length, 24);
  return `<section class="win"><details><summary>Codex des Ombres · ${entries.length} Veilleurs consignés</summary><div class="codexgrid">${
    entries
      .slice(page * 24, (page + 1) * 24)
      .map(
        (entry) =>
          `<article class="codexcard ${entry.chief ? "chief" : ""}"><div class="cicon">${illustrerCreature(entry.name, entry.chief ? "chief" : "boss")}</div><b>${esc(entry.name)}</b><small>${entry.chief ? "Chef · " : ""}${TEMPERAMENTS[entry.temper]?.label || "Veilleur"}</small></article>`,
      )
      .join("") ||
    '<p class="sub">Vaincs un Veilleur pour consigner son nom.</p>'
  }</div>${pagination(page, entries.length, 24, "codexPage")}</details></section>`;
}

function revelationFragment(mission, bossName) {
  const count = nombreFragments(),
    heart = campagne().keyFound;
  const followup =
    count === 8
      ? heart
        ? "La Clé se reconstitue autour du cœur que tu avais découvert. Le Sanctuaire attend son heure."
        : "Les huit fragments s’assemblent, mais un emplacement demeure vide. Une quête d’indice vient d’apparaître dans ton journal."
      : `${count} fragment${count > 1 ? "s sont" : " est"} désormais à l’abri. La Clé continue de se reconstruire.`;
  return [
    `${bossName} tombe. Tu récupères le fragment gravé de la lettre « ${mission.fragment} ».`,
    followup,
  ];
}
function titreMessage(id) {
  const mission = CG.missions.find((m) => m.id === id);
  if (mission) return titreMission(mission);
  if (id === "key-hint") return "Le dernier morceau · indice";
  if (id === "hidden-heart") return "Le cœur retrouvé";
  if (id.startsWith("rank-")) return "Promotion au rang " + id.slice(5);
  return "Message du Système";
}
