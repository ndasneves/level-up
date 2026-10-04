/* Relics are consumable actions. Knowledge/stat requirements are never spent. */
"use strict";
const ARTEFACTS = [
  {
    id: "potTime",
    name: "Dilatation du Temps",
    price: 60,
    stat: { int: 8 },
    knowledge: 10,
    lessons: 1,
    desc: "Ajoute 10 secondes à la question actuelle, ou ralentit la prochaine frappe.",
  },
  {
    id: "potSecond",
    name: "Seconde Chance",
    price: 80,
    stat: { int: 8, vit: 8 },
    knowledge: 20,
    lessons: 2,
    desc: "Permet de retenter une réponse ou une frappe manquée.",
  },
  {
    id: "artPrecision",
    name: "Précision de l’Ombre",
    price: 75,
    stat: { agi: 10 },
    knowledge: 15,
    lessons: 1,
    desc: "Élargit la zone parfaite de la prochaine frappe.",
  },
  {
    id: "artBreak",
    name: "Brise-Sceau",
    price: 90,
    stat: { str: 12 },
    knowledge: 25,
    lessons: 3,
    desc: "Ignore le bouclier sur la prochaine frappe.",
  },
  {
    id: "artWard",
    name: "Protection du Gardien",
    price: 85,
    stat: { vit: 12 },
    knowledge: 20,
    lessons: 2,
    desc: "Réduit de 75 % les dégâts du prochain coup reçu.",
  },
];
const STAT_NAMES = {
  str: "Force",
  agi: "Agilité",
  vit: "Vitalité",
  int: "Intelligence",
};
for (const artifact of ARTEFACTS) {
  const existing = item(artifact.id);
  if (existing) Object.assign(existing, artifact);
  else ALLITEMS.push({ ...artifact, icon: "◆", req: 1 });
}
SHOP.potions = SHOP.potions.filter(
  (p) => !ARTEFACTS.some((a) => a.id === p.id),
);

function connaissancesAcquises() {
  const courses = SUBJECTS.flatMap((s) => s.dungeons);
  return {
    unique: courses.reduce(
      (n, d) =>
        n +
        d.questions.filter(
          (q) => (S.mastery[d.id + ":" + q.id]?.correct || 0) > 0,
        ).length,
      0,
    ),
    lessons: courses.filter((d) => S.dungeons[d.id]?.cleared).length,
  };
}

function artefactsAcquis() {
  const c = campagne();
  // Keep consumables already owned by an existing player usable after migration.
  if (!Array.isArray(c.artifactUnlocked))
    c.artifactUnlocked = ARTEFACTS.filter((a) => S.inv[a.id] > 0).map(
      (a) => a.id,
    );
  return c.artifactUnlocked;
}

function conditionsArtefact(artifact) {
  const knowledge = connaissancesAcquises();
  return (
    Object.entries(artifact.stat).every(([key, min]) => S.stats[key] >= min) &&
    knowledge.unique >= artifact.knowledge &&
    knowledge.lessons >= artifact.lessons
  );
}
function artefactOuvert(artifact) {
  return (
    artefactsAcquis().includes(artifact.id) || conditionsArtefact(artifact)
  );
}
function artefactUtilisable(id, combat = false) {
  const artifact = ARTEFACTS.find((a) => a.id === id),
    state = combat ? B : R;
  return !!(
    artifact &&
    state &&
    S.inv[id] > 0 &&
    artefactOuvert(artifact) &&
    (state.artifactUses || 0) < 2
  );
}
function consommerArtefact(id, state) {
  S.inv[id]--;
  state.artifactUses = (state.artifactUses || 0) + 1;
  if (state === R) enregistrerEtape();
  sauvegarder();
}

const buyBeforeArtifacts = ACTIONS.buy;
ACTIONS.buy = function (target) {
  const artifact = ARTEFACTS.find((a) => a.id === target.dataset.id);
  const potion = SHOP.potions.find((p) => p.id === target.dataset.id);
  if (!artifact && !potion) {
    buyBeforeArtifacts(target);
    return;
  }
  const value = artifact || potion;
  if (
    (artifact && !artefactOuvert(artifact)) ||
    S.gold < value.price ||
    (S.inv[value.id] || 0) >= 10
  )
    return;
  S.gold -= value.price;
  S.inv[value.id] = (S.inv[value.id] || 0) + 1;
  if (artifact && !artefactsAcquis().includes(artifact.id))
    artefactsAcquis().push(artifact.id);
  sauvegarder();
  afficher();
};

function carteArtefact(artifact) {
  const knowledge = connaissancesAcquises(),
    open = artefactOuvert(artifact);
  return `<article class="win artifact-card"><span class="eyebrow">${open ? "Sceau ouvert" : "Sceau de connaissance"}</span>
    <h3>${artifact.name}</h3><p>${artifact.desc}</p><ul class="artifact-requirements">
    ${Object.entries(artifact.stat)
      .map(
        ([key, min]) =>
          `<li class="${S.stats[key] >= min ? "met" : ""}">${STAT_NAMES[key]} : ${S.stats[key]} / ${min}</li>`,
      )
      .join("")}
    <li class="${knowledge.unique >= artifact.knowledge ? "met" : ""}">Bonnes réponses uniques : ${knowledge.unique} / ${artifact.knowledge}</li>
    <li class="${knowledge.lessons >= artifact.lessons ? "met" : ""}">Leçons terminées : ${knowledge.lessons} / ${artifact.lessons}</li></ul>
    <p class="sub">${S.inv[artifact.id] || 0} en réserve · ${artifact.price} or</p>
    <button class="btn gold" data-act="buy" data-id="${artifact.id}" ${!open || S.gold < artifact.price || (S.inv[artifact.id] || 0) >= 10 ? "disabled" : ""}>${open ? "Acheter un exemplaire" : "Conditions à remplir"}</button></article>`;
}
const shopBeforeArtifacts = SCREENS.shop;
SCREENS.shop = function () {
  if (UI.shopTab === "artefacts")
    return `<div class="title-row"><h2>Artefacts du Système</h2><p class="sub">${S.gold} or · Les connaissances ouvrent les sceaux. Seul l’or est dépensé.</p></div>
    <button class="link" data-act="shoptab" data-k="potions">← Potions et équipement</button>
    <p class="hint">Deux artefacts maximum par combat, et deux dans la salle chronométrée d’une expédition. Chaque exemplaire disparaît après utilisation.</p><div class="artifact-grid">${ARTEFACTS.map(carteArtefact).join("")}</div>`;
  return shopBeforeArtifacts().replace(
    '</div>\n      <div class="items">',
    '<button class="btn" data-act="shoptab" data-k="artefacts">Artefacts</button></div>\n      <div class="items">',
  );
};

function programmerFinQuestion() {
  clearTimeout(QTIMER);
  const question = R.cur;
  QTIMER = setTimeout(
    () => {
      if (R && R.cur === question && !R.fb) resoudreReponse(false, null, "");
    },
    Math.max(0, R.questionDeadline - Date.now()),
  );
}
const prepareBeforeArtifacts = preparerQuestion;
preparerQuestion = function () {
  R.qtimeBonus = 0;
  R.questionPaused = false;
  prepareBeforeArtifacts();
  R.questionDeadline = Date.now() + tempsQuestion(R.cur.q);
};
utiliserDilatationTemps = function () {
  if (!artefactUtilisable("potTime") || !estSalleChronometree() || R.fb) return;
  const key = R.cur.e.d + ":" + R.cur.e.q;
  R.artifactTimeQuestions ||= [];
  if (R.artifactTimeQuestions.includes(key)) return;
  R.artifactTimeQuestions.push(key);
  R.questionDeadline += 10000;
  R.qtimeBonus = 10000;
  consommerArtefact("potTime", R);
  programmerFinQuestion();
  afficher();
};
const secondBeforeArtifacts = utiliserSecondeChance;
utiliserSecondeChance = function () {
  if (
    !artefactUtilisable("potSecond") ||
    !estSalleChronometree() ||
    !R.fb ||
    R.fb.ok
  )
    return;
  const key = R.cur.e.d + ":" + R.cur.e.q;
  R.artifactSecondQuestions ||= [];
  if (R.artifactSecondQuestions.includes(key)) return;
  R.artifactSecondQuestions.push(key);
  secondBeforeArtifacts(); // Existing correction bookkeeping and consumed inventory.
  R.artifactUses = (R.artifactUses || 0) + 1;
  enregistrerEtape();
  sauvegarder();
};

const checkpointBeforeArtifacts = enregistrerEtape;
enregistrerEtape = function () {
  checkpointBeforeArtifacts();
  if (!R || !campagne()?.attempt) return;
  Object.assign(campagne().attempt, {
    artifactUses: R.artifactUses || 0,
    artifactTimeQuestions: R.artifactTimeQuestions || [],
    artifactSecondQuestions: R.artifactSecondQuestions || [],
  });
  sauvegarder();
};
const resumeBeforeArtifacts = reprendreEtape;
reprendreEtape = function () {
  const saved = campagne().attempt;
  if (!saved) return;
  const uses = {
    artifactUses: saved.artifactUses || 0,
    artifactTimeQuestions: [...(saved.artifactTimeQuestions || [])],
    artifactSecondQuestions: [...(saved.artifactSecondQuestions || [])],
  };
  resumeBeforeArtifacts();
  if (R) {
    Object.assign(R, uses);
    enregistrerEtape();
    afficher();
  }
};
ACTIONS.resume = reprendreEtape;

const bossActionBeforeArtifacts = actionBoss;
actionBoss = function (action) {
  const id = {
    dilate: "potTime",
    secondtry: "potSecond",
    precision: "artPrecision",
    breakseal: "artBreak",
    ward: "artWard",
  }[action];
  if (!id) {
    bossActionBeforeArtifacts(action);
    return;
  }
  if (
    !artefactUtilisable(id, true) ||
    B.over ||
    UI.screen !== "boss" ||
    !$("#sys").hidden
  )
    return;
  if (action === "dilate" || action === "secondtry") {
    const before = S.inv[id];
    bossActionBeforeArtifacts(action);
    if (S.inv[id] < before) {
      B.artifactUses = (B.artifactUses || 0) + 1;
      sauvegarder();
    }
    return;
  }
  if (
    B.over ||
    B.turn !== "player" ||
    B.timing ||
    B.missPending ||
    UI.screen !== "boss" ||
    !$("#sys").hidden
  )
    return;
  if (
    (action === "precision" && B.precisionBoost) ||
    (action === "breakseal" && B.breakSeal) ||
    (action === "ward" && B.shadowShield)
  )
    return;
  consommerArtefact(id, B);
  if (action === "precision") B.precisionBoost = true;
  if (action === "breakseal") B.breakSeal = true;
  if (action === "ward") {
    B.shadowShield = true;
    B.shadowReduction = 0.25;
  }
  ajouterJournal("Artefact activé : " + item(id).name + ".", "me");
  afficher();
};
const gaugeBeforeArtifacts = demarrerJauge;
demarrerJauge = function (name, spec) {
  const boost = B.precisionBoost;
  gaugeBeforeArtifacts(name, spec);
  if (boost) {
    B.timing.half += 5;
    B.timing.goodHalf = Math.max(B.timing.goodHalf, B.timing.half + 3);
    B.precisionBoost = false;
    afficher();
  }
};
const bossScreenBeforeArtifacts = SCREENS.boss;
SCREENS.boss = function () {
  let html = bossScreenBeforeArtifacts();
  if (!artefactUtilisable("potTime", true))
    html = html.replace('data-bact="dilate"', 'data-bact="dilate" disabled');
  if (!artefactUtilisable("potSecond", true))
    html = html.replace(
      'data-bact="secondtry"',
      'data-bact="secondtry" disabled',
    );
  if (!B.over && !B.timing && !B.missPending && B.turn === "player")
    html += `<section class="win combat-artifacts"><span class="eyebrow">Artefacts · ${B.artifactUses || 0} / 2 utilisés</span>
    <div class="campaign-actions">${
      [
        ["precision", "artPrecision"],
        ["breakseal", "artBreak"],
        ["ward", "artWard"],
      ]
        .filter(([, id]) => S.inv[id] > 0)
        .map(
          ([action, id]) =>
            `<button class="btn" data-bact="${action}" ${artefactUtilisable(id, true) ? "" : "disabled"}>${item(id).name} · ×${S.inv[id]}</button>`,
        )
        .join("") ||
      '<p class="sub">Les artefacts s’acquièrent dans la boutique.</p>'
    }</div></section>`;
  return html;
};

function suspendreChronometre() {
  if (!R || R.fb || !estSalleChronometree() || R.questionPaused) return;
  R.questionRemaining = Math.max(0, R.questionDeadline - Date.now());
  R.questionPaused = true;
  clearTimeout(QTIMER);
  QTIMER = null;
}
function reprendreChronometre() {
  if (!R || !R.questionPaused || R.fb || UI.screen !== "dungeon") return;
  R.questionPaused = false;
  R.questionDeadline = Date.now() + R.questionRemaining;
  programmerFinQuestion();
  afficher();
}
const routeBeforeTimer = allerA;
allerA = function (screen) {
  if (screen !== "dungeon") suspendreChronometre();
  routeBeforeTimer(screen);
  if (screen === "dungeon") reprendreChronometre();
};
