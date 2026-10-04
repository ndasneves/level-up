/* Optional chapter goals survive absences. Fixed thresholds stay independent
   of future course counts; repeated actions have bounded daily credit. */
"use strict";
const CHAPTER_TITLES = [
  ["Éclaireur des failles", "Traqueur des fragments", "Gardien de la Clé"],
  ["Lecteur des cendres", "Passeur de lumière", "Purificateur du Système"],
  ["Chercheur d’échos", "Tisseur de souvenirs", "Archiviste des Ombres"],
  ["Sentinelle du Sanctuaire", "Défenseur du Grimoire", "Veilleur de l’Aube"],
];
const CHALLENGE_TARGETS = [
  { reviews: 30, wins: 5, prepared: 2, essence: 40 },
  { reviews: 60, wins: 10, prepared: 4, essence: 60 },
  { reviews: 90, wins: 15, prepared: 6, essence: 80 },
];
function defisChapitre(index = chapitreActuel()) {
  const c = campagne();
  c.chapterChallenges ||= {};
  return (c.chapterChallenges[index] ||= {
    reviews: 0,
    wins: 0,
    prepared: 0,
    claimed: [],
  });
}
function creditDefi(kind, id, index = chapitreActuel()) {
  const c = campagne(),
    p = defisChapitre(index);
  c.day.challengeCredits ||= {};
  const key = index + ":" + kind;
  const seen = (c.day.challengeCredits[key] ||= []);
  const limit = kind === "reviews" ? 10 : 3;
  if (seen.includes(id) || seen.length >= limit) return false;
  seen.push(id);
  p[kind] = Math.min(CHALLENGE_TARGETS[2][kind], p[kind] + 1);
  return true;
}
function titreChasseur() {
  const c = campagne();
  return c.chapterTitle || "Chasseur novice";
}
const SHADOW_WORDS = {
  knight: {
    win: "Nous avons tenu bon. Chaque savoir renforce notre rempart.",
    lose: "Je reste à tes côtés. Observons sa prochaine charge.",
    review: "Une réponse retrouvée, une brèche refermée.",
  },
  assassin: {
    win: "Tu as trouvé l’ouverture. Beau coup, Chasseur.",
    lose: "Même une ombre rate sa cible. Nous connaissons mieux ses mouvements.",
    review: "La précision se travaille aussi dans tes souvenirs.",
  },
  mage: {
    win: "Tes connaissances éclairent ce portail. Continuons notre enquête.",
    lose: "Ce Veilleur a encore un secret. Changeons notre stratégie.",
    review: "Ce souvenir reprend vie. Le Grimoire s’en souviendra.",
  },
  guardian: {
    win: "Le Grimoire est en sécurité. Grâce à toi.",
    lose: "Le Sanctuaire attendra. Préparons ensemble notre retour.",
    review: "Ce que tu apprends, personne ne peut te le voler.",
  },
};
function paroleOmbre(event) {
  const c = campagne();
  if (!c.shadows.includes(c.shadow) || !SHADOW_WORDS[c.shadow]) return null;
  const name =
    CG.CONFIG.shadows.find((x) => x.id === c.shadow)?.name || "Ombre";
  return (c.shadowVoice = { name, text: SHADOW_WORDS[c.shadow][event] });
}
const answerBeforeChallenges = resoudreReponse;
resoudreReponse = function (ok, pick, typed, info) {
  if (!R || R.fb || !R.cur)
    return answerBeforeChallenges(ok, pick, typed, info);
  const key = R.cur.q.sourceKey || R.cur.e.d + ":" + R.cur.e.q;
  const first = !(R.sessionSeen || []).includes(key);
  answerBeforeChallenges(ok, pick, typed, info);
  if (ok && first && creditDefi("reviews", key)) {
    if (defisChapitre().reviews % 10 === 0) paroleOmbre("review");
    sauvegarder();
  }
};
const victoryBeforeChallenges = victoireBoss;
victoireBoss = function () {
  if (!B || B.over) return;
  const index = chapitreActuel(),
    id = B.dId;
  const prepared =
    B.bless.acc >= 0.8 || B.interrupts > 0 || B.perfectDodges >= 2 || B.elite;
  victoryBeforeChallenges();
  creditDefi("wins", id, index);
  if (prepared) creditDefi("prepared", id, index);
  UI.result.shadowVoice = paroleOmbre("win");
  sauvegarder();
};
const defeatBeforeChallenges = defaiteBoss;
defaiteBoss = function () {
  if (!B || B.over) return;
  defeatBeforeChallenges();
  UI.result.shadowVoice = paroleOmbre("lose");
  sauvegarder();
};
function htmlDefisChapitre() {
  if (!fondamentauxTermines()) return "";
  const index = Math.min(
      chapitreActuel(),
      Math.max(
        0,
        UI.challengeChapter == null
          ? chapitreActuel()
          : Number(UI.challengeChapter) || 0,
      ),
    ),
    p = defisChapitre(index);
  const tier = CHALLENGE_TARGETS.findIndex((_, i) => !p.claimed.includes(i));
  const complete = tier < 0;
  const target = CHALLENGE_TARGETS[complete ? 2 : tier];
  const ready = ["reviews", "wins", "prepared"].every((k) => p[k] >= target[k]);
  const row = (name, key) =>
    `<div class="challenge-row"><span>${name}</span><b>${Math.min(p[key], target[key])} / ${target[key]}</b><progress value="${Math.min(p[key], target[key])}" max="${target[key]}" aria-label="${name}"></progress></div>`;
  return `<section class="win chapter-challenges"><div class="challenge-tabs" aria-label="Chapitre des défis">${CG.CONFIG.chapters
    .slice(0, chapitreActuel() + 1)
    .map(
      (chapter, i) =>
        `<button class="btn" data-act="challengechapter" data-index="${i}" aria-pressed="${index === i}">Chapitre ${i + 1}</button>`,
    )
    .join(
      "",
    )}</div><span class="eyebrow">Maîtrise du chapitre · palier ${complete ? 3 : tier + 1}/3</span><h3>${esc(CHAPTER_TITLES[index][complete ? 2 : tier])}</h3>${row("Réponses justes", "reviews")}${row("Portails vaincus", "wins")}${row("Victoires préparées", "prepared")}<p class="sub">10 questions différentes et 3 portails différents comptent par jour. Prépare une victoire avec 80 % de bonnes réponses, une interruption, deux esquives ou un combat Élite. Aucun délai, aucune série de connexions à maintenir.</p>${complete ? '<p class="hint">Maîtrise accomplie. Ton titre est conservé ; la quête principale continue dans le journal.</p>' : `<button class="btn gold" data-act="claimchallenge" data-tier="${tier}" data-chapter="${index}" ${ready ? "" : "disabled"}>${ready ? "Recevoir le titre" : "Défi en cours"} · jusqu’à ${target.essence} essence</button><p class="hint">Titres sans bonus de puissance. L’essence respecte le plafond quotidien.</p>`}</section>`;
}
ACTIONS.claimchallenge = function (t) {
  const index =
    t.dataset.chapter == null ? chapitreActuel() : Number(t.dataset.chapter);
  if (!Number.isInteger(index) || index < 0 || index > chapitreActuel()) return;
  const p = defisChapitre(index),
    tier = Number(t.dataset.tier);
  const next = CHALLENGE_TARGETS.findIndex((_, i) => !p.claimed.includes(i));
  const target = CHALLENGE_TARGETS[tier];
  if (
    !target ||
    tier !== next ||
    !["reviews", "wins", "prepared"].every((k) => p[k] >= target[k])
  )
    return;
  p.claimed.push(tier);
  campagne().chapterTitle = CHAPTER_TITLES[index][tier];
  const gain = donnerEssence(target.essence);
  sauvegarder();
  afficher();
  systeme(
    "Titre acquis",
    `<p>${esc(titreChasseur())}</p><p>+${gain} essence d’ombre. Ce titre récompense ta maîtrise ; il ne modifie pas tes statistiques.</p>`,
  );
};
ACTIONS.challengechapter = function (t) {
  const index = Number(t.dataset.index);
  if (!Number.isInteger(index) || index < 0 || index > chapitreActuel()) return;
  UI.challengeChapter = index;
  afficher();
};
function redistributionDisponible() {
  const c = campagne();
  c.respec ||= { freeChapters: [], lastPaid: null };
  const free = !c.respec.freeChapters.includes(chapitreActuel());
  const elapsed = c.respec.lastPaid
    ? Math.floor(
        (Date.parse(today()) - Date.parse(c.respec.lastPaid)) / 86400000,
      )
    : 7;
  const spent = Object.values(S.stats).reduce(
    (n, v) => n + Math.max(0, v - 5),
    0,
  );
  return {
    free,
    spent,
    available:
      fondamentauxTermines() &&
      !R &&
      (!B || B.over) &&
      spent > 0 &&
      (free || (elapsed >= 7 && S.gold >= 80)),
    wait: Math.max(0, 7 - elapsed),
  };
}
ACTIONS.respec = function () {
  if (!redistributionDisponible().available) return;
  UI.confirmRespec = !UI.confirmRespec;
  afficher();
};
ACTIONS.respecconfirm = function () {
  const info = redistributionDisponible(),
    c = campagne();
  if (!UI.confirmRespec || UI.screen !== "status" || !info.available) return;
  if (info.free) c.respec.freeChapters.push(chapitreActuel());
  else {
    S.gold -= 80;
    c.respec.lastPaid = today();
  }
  S.points += info.spent;
  S.stats = { str: 5, agi: 5, vit: 5, int: 5 };
  UI.confirmRespec = false;
  sauvegarder();
  afficher();
};
const statusBeforeChallenges = SCREENS.status;
SCREENS.status = function () {
  const info = redistributionDisponible(),
    voice = campagne().shadowVoice;
  return (
    statusBeforeChallenges() +
    `<section class="win"><span class="eyebrow">Identité du Chasseur</span><h3>${esc(titreChasseur())}</h3>${voice ? `<p class="shadow-voice"><b>${esc(voice.name)}</b> · « ${esc(voice.text)} »</p>` : ""}</section>` +
    htmlDefisChapitre() +
    `<section class="win"><h3>Redistribuer les statistiques</h3><p class="sub">Une redistribution gratuite par chapitre. Ensuite : 80 pièces, au plus une fois tous les 7 jours. Les artefacts déjà ouverts restent acquis.</p>${UI.confirmRespec && info.available ? `<p>${info.spent} points seront rendus ; les quatre statistiques reviendront à 5. Coût : ${info.free ? "gratuit" : "80 pièces"}.</p><div class="btnrow"><button class="btn gold" data-act="respecconfirm">Confirmer</button><button class="btn" data-act="respec">Annuler</button></div>` : `<button class="btn" data-act="respec" ${info.available ? "" : "disabled"}>Redistribuer · ${info.free ? "gratuit" : "80 pièces"}</button>${!info.free && info.wait ? `<p class="hint">Disponible dans ${info.wait} jour(s).</p>` : ""}`}</section>`
  );
};
const trainingBeforeChallenges = SCREENS.training;
SCREENS.training = function () {
  return trainingBeforeChallenges() + htmlDefisChapitre();
};
const resultBeforeChallenges = SCREENS.result;
SCREENS.result = function () {
  const voice = UI.result.shadowVoice;
  return (
    resultBeforeChallenges() +
    (voice
      ? `<section class="win shadow-voice"><b>${esc(voice.name)}</b><p>« ${esc(voice.text)} »</p></section>`
      : "")
  );
};

const headerBeforeChallenges = enteteJeu;
enteteJeu = function () {
  const html = headerBeforeChallenges();
  return campagne().chapterTitle
    ? html.replace(
        '<div class="hlvl">',
        `<div class="hunter-title">${esc(titreChasseur())}</div><div class="hlvl">`,
      )
    : html;
};

// Keep native disclosure state across purchases and statistic updates.
if (document.addEventListener)
  document.addEventListener(
    "toggle",
    (event) => {
      const key = event.target?.dataset?.panel;
      if (key === "savePanel" || key === "powerPanel")
        UI[key] = event.target.open;
    },
    true,
  );
