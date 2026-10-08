/* Intégration de la campagne au moteur historique. Pas de serveur ni d'API. */
"use strict";
const CG = window.SchoolCampaign;
const COMBAT_TIMERS = new Set();
let combatGeneration = 0;
function annulerCombat() {
  combatGeneration++;
  COMBAT_TIMERS.forEach(clearTimeout);
  COMBAT_TIMERS.clear();
}
function planifierCombat(fn, delay) {
  const generation = combatGeneration,
    combat = B;
  const t = setTimeout(() => {
    COMBAT_TIMERS.delete(t);
    if (generation !== combatGeneration || B !== combat || !B) return;
    fn();
  }, delay);
  COMBAT_TIMERS.add(t);
  return t;
}
function campagne() {
  if (!S) return null;
  if (!S.campaign) S.campaign = CG.fresh();
  const defaults = CG.fresh();
  Object.keys(defaults).forEach((k) => {
    if (S.campaign[k] === undefined) S.campaign[k] = defaults[k];
  });
  S.mastery = S.mastery || {};
  const c = S.campaign;
  for (const key of ["completed", "shadows", "variants", "styles", "history"])
    if (!Array.isArray(c[key])) c[key] = [];
  c.essence = Math.max(0, Number(c.essence) || 0);
  if (!CG.CONFIG.ranks.some((r) => r.id === c.rank)) c.rank = "E";
  if (!c.day || c.day.date !== today()) c.day = CG.dayState(today());
  return c;
}
function chapitreActuel() {
  const c = campagne();
  let chapter = CG.chapterOn(today());
  if (!c) return 0;
  if (!c.completed.includes("sanctuary")) return 0;
  if (!c.completed.includes("system-heart")) return Math.min(chapter, 1);
  if (!c.completed.includes("echo-4")) return Math.min(chapter, 2);
  return chapter;
}
function niveauEffectif() {
  return Math.min(S.level, CG.CONFIG.chapters[chapitreActuel()].cap);
}
function statEffective(k) {
  const budget = 3 * (niveauEffectif() - 1),
    spent = Object.values(S.stats).reduce((n, v) => n + Math.max(0, v - 5), 0),
    ratio = spent ? Math.min(1, budget / spent) : 1;
  return Math.min(
    5 + Math.floor(Math.max(0, S.stats[k] - 5) * ratio),
    5 + 2 * (niveauEffectif() - 1),
  );
}
function equipementEffectif(id, type) {
  const list = SHOP[type];
  const owned = item(id) || list[0];
  const limit = [1, 2, 3, 4][chapitreActuel()];
  const index = list.findIndex((x) => x.id === owned.id);
  return list[Math.min(Math.max(0, index), limit)];
}
rangDe = function () {
  return S && S.campaign ? campagne().rank : "E";
};
maxHp = function () {
  return 80 + statEffective("vit") * 10;
};
maxMp = function () {
  return 30 + statEffective("int") * 5;
};
atkVal = function () {
  return equipementEffectif(S.weapon, "weapons").atk + statEffective("str") * 2;
};
defVal = function () {
  return equipementEffectif(S.armor, "armors").def;
};
dodgeChance = function () {
  return Math.min(80, 30 + statEffective("agi") * 3);
};
function donnerEssence(n) {
  const c = campagne();
  const gain = Math.min(
    Math.max(0, Math.round(n)),
    CG.CONFIG.essenceDailyCap - c.day.essence,
  );
  c.essence += gain;
  c.day.essence += gain;
  return gain;
}
gagnerXP = function (n) {
  if (!S || n <= 0) return { xp: 0, essence: 0 };
  const c = campagne(),
    cap = CG.CONFIG.chapters[chapitreActuel()].cap,
    old = S.level;
  let remaining = Math.round(n),
    accepted = 0;
  while (remaining > 0 && S.level < cap) {
    const take = Math.min(remaining, xpNeed(S.level) - S.xp);
    S.xp += take;
    remaining -= take;
    accepted += take;
    if (S.xp >= xpNeed(S.level)) {
      S.xp -= xpNeed(S.level);
      S.level++;
      S.points += 3;
    }
  }
  const essence = remaining > 0 ? donnerEssence(Math.ceil(remaining / 4)) : 0;
  if (S.level > old)
    systeme(
      "Niveau supérieur",
      `<p>Tu atteins le <strong>niveau ${S.level}</strong>. +${(S.level - old) * 3} points à répartir.</p><p>Le rang se gagne dans une épreuve de promotion.</p>`,
      null,
      "levelup",
    );
  return { xp: accepted, essence };
};
estDebloque = function (d) {
  return (
    fondamentauxTermines() &&
    (d.storyMission ? missionDisponible(d.storyMission) : true)
  );
};
raisonVerrouillage = function (d) {
  return d.storyMission
    ? "Poursuis la quête principale pour ouvrir ce portail"
    : "Termine les Fondamentaux";
};
function raconter(messages, onClose) {
  messages.forEach((text, i) =>
    systeme(
      "Message du Système",
      `<p>${esc(text)}</p>`,
      i === messages.length - 1 ? onClose : null,
      "info",
    ),
  );
}
// Content locations are derived from stable fragment IDs, independently of course counts.
const CONTENT_AUDIT = window.ContentRules.audit(SUBJECTS);
CONTENT_AUDIT.errors.forEach((message) => console.warn(message));
function portailFragment(id) {
  const number = Number(id.replace("fragment-", ""));
  const dungeonId = CONTENT_AUDIT.locations.get(number);
  return dungeonId ? DMAP[dungeonId]?.d : null;
}
function fragmentOuvert(d) {
  const mission = CG.missions.find(
    (m) => m.id === "fragment-" + d.boss.fragment,
  );
  return !!mission && today() >= (d.boss.availableFrom || mission.from);
}
function prochaineMission() {
  const c = campagne();
  return CG.missions.find((m) => !c.completed.includes(m.id));
}
function missionDisponible(id) {
  const c = campagne(),
    m = CG.missions.find((x) => x.id === id);
  return !!(
    m &&
    (!m.fragment ||
      CG.CONFIG.fragmentSource === "campaign" ||
      portailFragment(id)) &&
    fondamentauxTermines() &&
    prochaineMission()?.id === id &&
    today() >= (portailFragment(id)?.boss.availableFrom || m.from) &&
    CG.chapterOn(today()) >= m.chapter &&
    (id !== "sanctuary" || c.keyFound)
  );
}
function poolRevision(kind = "mixed") {
  const entries = [];
  SUBJECTS.forEach((s) =>
    s.dungeons.forEach((d) =>
      d.questions.forEach((q) => {
        const key = d.id + ":" + q.id,
          h = S.mastery[key];
        if (h || S.dungeons[d.id]?.cleared)
          entries.push({ d: d.id, q: q.id, key, h: h || {}, subject: s.id });
      }),
    ),
  );
  if (!entries.length)
    SUBJECTS.forEach((s) =>
      s.dungeons.slice(0, 1).forEach((d) =>
        d.questions.forEach((q) =>
          entries.push({
            d: d.id,
            q: q.id,
            key: d.id + ":" + q.id,
            h: {},
            subject: s.id,
          }),
        ),
      ),
    );
  if (kind === "repair")
    entries.sort((a, b) => (S.mistakes[b.key] || 0) - (S.mistakes[a.key] || 0));
  else if (kind === "review")
    entries.sort((a, b) =>
      (a.h.lastCorrect || "").localeCompare(b.h.lastCorrect || ""),
    );
  else return shuffle(entries);
  return entries;
}
function selectionEquilibree(n, kind) {
  const pool = poolRevision(kind),
    buckets = {};
  pool.forEach((e) => (buckets[e.subject] ||= []).push(e));
  const groups = Object.values(buckets),
    out = [];
  while (out.length < n && groups.some((a) => a.length)) {
    for (const a of groups) {
      if (a.length && out.length < n) out.push(a.shift());
    }
  }
  return out;
}
function creerEpreuve(id, title, level, mission, target) {
  const pool = selectionEquilibree(target ? 15 : 8, "mixed");
  if (!pool.length) return null;
  const qs = pool.map((e, i) =>
    Object.assign({}, DMAP[e.d].qmap[e.q], {
      id: "test-" + i,
      sourceKey: e.key,
      sourceSubject: e.subject,
    }),
  );
  const d = {
    id,
    name: title,
    rank: target || rangDe(),
    req: level,
    lesson: "",
    questions: qs,
    boss: {
      name: mission?.boss || "Le Gardien du rang " + target,
      icon: mission?.icon || "⚔️",
      chief: true,
    },
    storyMission: mission?.id || null,
    promotion: target,
  };
  const qmap = {};
  qs.forEach((q) => (qmap[q.id] = q));
  DMAP[id] = {
    d,
    s: { id: "campaign", name: "Épreuve du Système", dungeons: [d] },
    i: 0,
    qmap,
  };
  return d;
}
function lancerMission(id) {
  if (!missionDisponible(id)) return;
  const course = portailFragment(id);
  if (course) {
    UI.dId = course.id;
    const subject = DMAP[course.id].s;
    UI.arch = subject.id;
    UI.group = Math.floor(DMAP[course.id].i / GROUP_SIZE);
    allerA("lesson");
    return;
  }
  const m = CG.missions.find((x) => x.id === id);
  raconter(m.intro, () => {
    const d = creerEpreuve("story:" + id, m.title, m.level, m, null);
    if (!d) return;
    demarrerDonjon(d.id);
    R.storyId = id;
    R.assessment = { seen: [], correct: 0, total: 0, subjects: {} };
    enregistrerEtape();
  });
}
function prochainRang() {
  const c = campagne(),
    i = CG.CONFIG.ranks.findIndex((r) => r.id === c.rank);
  return CG.CONFIG.ranks[i + 1]?.id;
}
function lancerPromotion() {
  const target = prochainRang(),
    c = campagne();
  if (!CG.promotionReady(c, S.level, target, chapitreActuel())) return;
  systeme(
    "Épreuve du rang " + target,
    "<p>Obtiens au moins <strong>80 %</strong> sur tes premières réponses et <strong>60 % dans chaque matière présente</strong>, puis vaincs le gardien. Aucun chronomètre.</p>",
    () => {
      const d = creerEpreuve(
        "promotion:" + target,
        "Épreuve du rang " + target,
        Math.max(2, CG.CONFIG.ranks.find((x) => x.id === target).min - 2),
        null,
        target,
      );
      demarrerDonjon(d.id);
      R.promotion = target;
      R.assessment = { seen: [], correct: 0, total: 0, subjects: {} };
      enregistrerEtape();
    },
  );
}
function enregistrerEtape() {
  if (!S || !R || R.mode !== "dungeon") return;
  campagne().attempt = {
    dId: R.dId,
    storyId: R.storyId || null,
    promotion: R.promotion || null,
    roomIndex: R.roomIndex,
    rooms: JSON.parse(JSON.stringify(R.rooms)),
    assessment: R.assessment,
    correct: R.correct,
    wrong: R.wrong,
    maxCombo: R.maxCombo,
    hp: R.hp,
    elite: !!R.elite,
    qtimeBonus: R.qtimeBonus || 0,
  };
  sauvegarder();
}
function effacerEtape() {
  if (S) {
    campagne().attempt = null;
    sauvegarder();
  }
}
function reprendreEtape() {
  const a = campagne().attempt;
  if (!a) return;
  if (a.storyId) {
    const m = CG.missions.find((x) => x.id === a.storyId);
    creerEpreuve(a.dId, m.title, m.level, m, null);
  } else if (a.promotion) {
    creerEpreuve(
      a.dId,
      "Épreuve du rang " + a.promotion,
      Math.max(2, CG.CONFIG.ranks.find((x) => x.id === a.promotion).min - 2),
      null,
      a.promotion,
    );
  }
  if (!DMAP[a.dId]) {
    effacerEtape();
    return;
  }
  // Snapshot questions are stored too: additions/removals cannot alter an active trial.
  if (a.questions) {
    const d = DMAP[a.dId].d;
    d.questions = a.questions;
    DMAP[a.dId].qmap = Object.fromEntries(a.questions.map((q) => [q.id, q]));
  }
  const valid = (a.rooms || []).every((room) =>
    room.ids.every((id) => DMAP[a.dId].qmap[id]),
  );
  if (!valid) {
    effacerEtape();
    systeme(
      "Portail modifié",
      "<p>Ce cours a changé. Recommence le donjon ; tes récompenses acquises sont conservées.</p>",
    );
    return;
  }
  demarrerDonjon(a.dId);
  R.storyId = a.storyId;
  R.promotion = a.promotion;
  R.rooms = a.rooms;
  R.roomIndex = Math.min(a.roomIndex, R.rooms.length - 1);
  R.assessment = a.assessment;
  R.correct = a.correct;
  R.wrong = a.wrong;
  R.maxCombo = a.maxCombo;
  R.hp = Math.min(R.hpMax, Math.max(1, a.hp));
  R.qtimeBonus = a.qtimeBonus;
  R.elite = a.elite;
  const room = R.rooms[R.roomIndex];
  room.queue = room.ids.map((qid, k) => ({
    d: a.dId,
    q: qid,
    mob: MOBS[k % MOBS.length],
  }));
  room.defeated = 0;
  R.stagePending = null;
  preparerQuestion();
  allerA("dungeon");
}
const _enregistrerEtape = enregistrerEtape;
enregistrerEtape = function () {
  _enregistrerEtape();
  if (S && R && campagne().attempt) {
    campagne().attempt.questions = DMAP[R.dId].d.questions;
    sauvegarder();
  }
};
const originalRooms = construireSalles;
construireSalles = function (d) {
  if (!d.storyMission && !d.promotion) return originalRooms(d);
  const ids = d.questions.map((q) => q.id),
    rooms = [];
  for (let i = 0; i < ids.length; i += 4)
    rooms.push({
      ids: ids.slice(i, i + 4),
      label: "Épreuve " + (rooms.length + 1),
    });
  return rooms;
};
const originalDemarrer = demarrerDonjon;
demarrerDonjon = function (id) {
  if (!fondamentauxTermines()) return;
  originalDemarrer(id);
  R.sessionSeen = [];
  R.sessionReward = 0;
  if (!DMAP[id].d.storyMission && !DMAP[id].d.promotion)
    R.lvl = Math.min(R.lvl, niveauEffectif() + 1);
  enregistrerEtape();
};
const originalQuestion = resoudreReponse;
resoudreReponse = function (ok, pick, typed, defInfo) {
  if (!R || R.fb) return;
  const q = R.cur.q,
    key = q.sourceKey || R.cur.e.d + ":" + R.cur.e.q,
    c = campagne(),
    history = S.mastery[key] || {
      asked: 0,
      correct: 0,
      wrong: 0,
      lastCorrect: null,
      lastResult: null,
    };
  const beforeXp = R.xp,
    beforeGold = S.gold,
    beforeRoomGold = R.gold,
    sessionFirst = !(R.sessionSeen || []).includes(key);
  if (R.assessment && !R.assessment.seen.includes(key)) {
    const a = R.assessment,
      sub = q.sourceSubject || DMAP[R.cur.e.d].s.id;
    a.seen.push(key);
    a.total++;
    a.correct += ok ? 1 : 0;
    const v = a.subjects[sub] || (a.subjects[sub] = { correct: 0, total: 0 });
    v.total++;
    v.correct += ok ? 1 : 0;
  }
  const xp = ok
    ? CG.questionReward(history, today(), c.day.questionXp[key] || 0)
    : 0;
  const gain = gagnerXP;
  gagnerXP = () => ({ xp: 0, essence: 0 });
  originalQuestion(ok, pick, typed, defInfo);
  gagnerXP = gain;
  R.xp = beforeXp;
  R.gold = beforeRoomGold;
  S.gold = beforeGold;
  history.asked++;
  history.lastResult = ok;
  if (ok) {
    history.correct++;
    history.lastCorrect = today();
  } else history.wrong++;
  S.mastery[key] = history;
  if (!R.sessionSeen) R.sessionSeen = [];
  if (sessionFirst) R.sessionSeen.push(key);
  if (ok) {
    c.day.questionXp[key] = (c.day.questionXp[key] || 0) + xp;
    const award = gagnerXP(xp);
    R.xp += award.xp;
    R.essence = (R.essence || 0) + award.essence;
    const gold = xp > 0 ? Math.max(1, Math.ceil(xp / 3)) : 0;
    S.gold += gold;
    R.gold += gold;
    R.fb.xp = award.xp;
    R.fb.gold = gold;
    R.fb.essence = award.essence;
  }
  enregistrerEtape();
  sauvegarder();
  afficher();
};
const originalNext = questionSuivante;
questionSuivante = function () {
  if (!R) return;
  if (R.mode === "training" && R.rooms[R.roomIndex].queue.length === 0) {
    const kind = R.contractKind,
      award = recompenserSession("training", kind);
    R.xp += award.xp;
    R.essence = (R.essence || 0) + award.essence;
  }
  if (R.hp <= 0) effacerEtape();
  originalNext();
};
function recompenserSession(type, kind) {
  const c = campagne();
  let amount = 0;
  if (c.day.missionRewards < CG.CONFIG.missionRewardDailyCap) {
    amount = type === "training" ? 40 : 60;
    c.day.missionRewards++;
  }
  const contract = CG.CONFIG.contracts.find((x) => x.id === kind);
  if (contract && !c.day.contracts.includes(kind)) {
    amount += contract.xp;
    c.day.contracts.push(kind);
  }
  return gagnerXP(amount);
}
const originalStage = ACTIONS.stagecontinue;
ACTIONS.stagecontinue = function () {
  originalStage();
  enregistrerEtape();
};
const originalFight = ACTIONS.fightboss;
ACTIONS.fightboss = function () {
  const dungeon = DMAP[R.dId].d;
  if (dungeon.boss.fragment && !fragmentOuvert(dungeon)) {
    systeme(
      "Sceau du chef",
      `<p>Ce chef apparaîtra à partir du ${dateLisible(dungeon.boss.availableFrom || CG.missions.find((m) => m.id === "fragment-" + dungeon.boss.fragment).from)}. Tu peux déjà réviser ce cours.</p>`,
    );
    return;
  }
  if (R.promotion) {
    const a = R.assessment;
    const passed =
      a &&
      a.total >= Math.min(15, poolRevision().length) &&
      a.correct / a.total >= 0.8 &&
      Object.values(a.subjects).every((x) => x.correct / x.total >= 0.6);
    if (!passed) {
      const target = R.promotion;
      effacerEtape();
      R = null;
      allerA("quests");
      systeme(
        "Épreuve à retravailler",
        `<p>Le rang ${target} demande 80 % de premières réponses justes, et 60 % dans chaque matière. Tes acquis et tes récompenses sont conservés.</p>`,
      );
      return;
    }
  }
  const storyId = R.storyId,
    promotion = R.promotion,
    assessment = R.assessment;
  originalFight();
  B.storyId = storyId;
  B.promotion = promotion;
  B.assessment = assessment;
  if (R?.elite) {
    B.elite = true;
    adapterBossElite();
  }
  if (assessment?.total)
    B.mult = 1 + (assessment.correct / assessment.total) * 0.5;
  afficher();
};
const originalBoss = demarrerBoss;
demarrerBoss = function (id, bless) {
  originalBoss(id, bless);
  B.cooldowns = { s1: 0, s2: 0 };
  B.potions = 0;
  B.perfectDodges = 0;
  B.interrupts = 0;
  B.shadowUsed = false;
  B.phase = 0;
  B.baseTemper = B.temper;
  if (!DMAP[id].d.storyMission && !DMAP[id].d.promotion) {
    B.L = Math.min(B.L, niveauEffectif() + 1);
    B.bossHp = B.bossMax = Math.round((150 + B.L * 55) * (B.chief ? 1.8 : 1));
    B.bossAtk = Math.round((9 + B.L * 3) * (B.chief ? 1.3 : 1));
  }
};
function appliquerCaracteristiquesBoss() {
  const stats = DMAP[B.dId].d.boss.stats;
  if (!stats) return;
  if (stats.level !== undefined) {
    B.L = stats.level;
    B.bossHp = B.bossMax = Math.round((150 + B.L * 55) * (B.chief ? 1.8 : 1));
    B.bossAtk = Math.round((9 + B.L * 3) * (B.chief ? 1.3 : 1));
  }
  if (stats.hp !== undefined) B.bossHp = B.bossMax = Math.round(stats.hp);
  if (stats.attack !== undefined) B.bossAtk = Math.round(stats.attack);
}
const bossAvantConfiguration = demarrerBoss;
demarrerBoss = function (id, bless) {
  bossAvantConfiguration(id, bless);
  appliquerCaracteristiquesBoss();
  afficher();
};

function competenceDisponible(k) {
  const c = campagne(),
    r = CG.CONFIG.ranks.findIndex((x) => x.id === c.rank);
  if (k === "s1")
    return (
      S.level >= 3 &&
      CG.missions.some((m) => m.fragment && c.completed.includes(m.id))
    );
  if (k === "dodge") return r >= 1;
  if (k === "s2") return r >= 2 && S.level >= 10 && chapitreActuel() >= 1;
  if (k === "summon") return c.shadows.includes(c.shadow) && r >= 2;
  return true;
}
const originalActionBoss = actionBoss;
actionBoss = function (a) {
  if (a === "hit" && B?.timing?.kind === "dodge") {
    const t = B.timing;
    const elapsed = (performance.now() - t.start) % (t.period * 2),
      phase = elapsed / t.period,
      pos = phase <= 1 ? phase * 100 : (2 - phase) * 100,
      dist = Math.abs(pos - 50);
    B.timing = null;
    if (dist <= t.goodHalf) {
      B.perfectDodges++;
      ajouterJournal(
        "Esquive parfaite ! Prépare une contre-attaque.",
        "systeme",
      );
      B.turn = "busy";
      afficher();
      planifierCombat(() => tourBoss(true), 350);
    } else {
      ajouterJournal("Esquive trop tardive.", "foe");
      B.turn = "busy";
      afficher();
      planifierCombat(() => tourBoss(false), 350);
    }
    return;
  }
  if (
    !B ||
    B.over ||
    B.turn !== "player" ||
    B.timing ||
    B.missPending ||
    UI.screen !== "boss" ||
    !$("#sys").hidden
  ) {
    if (a === "hit" || a === "secondtry" || a === "keepmiss")
      originalActionBoss(a);
    return;
  }
  if (!competenceDisponible(a)) return;
  if (a === "guard") {
    B.guarding = true;
    ajouterJournal("Tu te protèges : −60 % sur la prochaine attaque.", "me");
    B.turn = "busy";
    afficher();
    planifierCombat(() => tourBoss(false), 350);
    return;
  }
  if (a === "dodge") {
    const period = Math.max(650, 1100 - B.L * 12);
    B.timing = {
      kind: "dodge",
      period,
      start: performance.now(),
      half: 8,
      goodHalf: Math.min(24, 12 + statEffective("agi") * 0.5),
      offset: 0,
    };
    afficher();
    return;
  }
  if (a === "summon") {
    if (B.shadowUsed) return;
    const c = campagne();
    B.shadowUsed = true;
    const level = Math.min(
      c.shadowLevels[c.shadow] || 1,
      Math.min(3, chapitreActuel() + 1),
    );
    if (c.shadow === "knight") {
      B.shadowShield = true;
      B.shadowReduction = 0.25 - 0.05 * (level - 1);
    }
    if (c.shadow === "assassin") B.shadowStrike = 1.5 + 0.1 * (level - 1);
    if (c.shadow === "mage")
      B.mp = Math.min(B.mpMax, B.mp + 20 + 4 * (level - 1));
    if (c.shadow === "guardian")
      B.hp = Math.min(B.hpMax, B.hp + 35 + 10 * (level - 1));
    ajouterJournal("Ton ombre répond à ton appel.", "me");
    B.turn = "busy";
    afficher();
    planifierCombat(() => tourBoss(false), 350);
    return;
  }
  if (a === "pot") {
    if (B.potions >= 2 || B.hp >= B.hpMax) return;
    const pots = (S.inv.potHp || 0) + (S.inv.potHpL || 0);
    if (!pots) return;
    B.potions++;
  }
  if (a === "s1" || a === "s2") {
    if (B.cooldowns[a] > 0) return;
    const spec =
      a === "s2"
        ? { m: 5, mp: 25 }
        : S.campaign.variant === "deep"
          ? { m: 3.6, mp: 18 }
          : S.campaign.variant === "quick"
            ? { m: 2, mp: 12 }
            : { m: 3, mp: 12 };
    if (B.mp < spec.mp) return;
    demarrerJauge(a, spec);
    return;
  }
  originalActionBoss(a);
};
const originalVictory = victoireBoss;
victoireBoss = function () {
  if (!B || B.over) return;
  const c = campagne(),
    story = B.storyId,
    prom = B.promotion,
    id = B.dId,
    wasCleared = !!S.dungeons[id]?.cleared;
  const gain = gagnerXP;
  gagnerXP = () => ({ xp: 0, essence: 0 });
  originalVictory();
  gagnerXP = gain;
  if (story && !c.completed.includes(story)) {
    c.completed.push(story);
    const m = CG.missions.find((x) => x.id === story);
    if (m.fragment)
      S.keyFragments = c.completed.filter((x) =>
        x.startsWith("fragment-"),
      ).length;
    const shadow = CG.CONFIG.shadows.find((x) => x.mission === story);
    if (shadow && !c.shadows.includes(shadow.id)) {
      c.shadows.push(shadow.id);
      c.shadow = c.shadow || shadow.id;
    }
    const messages = m.fragment
      ? revelationFragment(m, DMAP[id].d.boss.name)
      : m.outro;
    c.history.push({ id: story, date: today(), messages });
    raconter(messages);
  }
  const fragment = DMAP[id].d.boss.fragment;
  const fragmentId = fragment ? "fragment-" + fragment : null;
  const courseFragment = !!(
    fragmentId &&
    fragmentOuvert(DMAP[id].d) &&
    !c.completed.includes(fragmentId)
  );
  if (courseFragment) {
    c.completed.push(fragmentId);
    const m = CG.missions.find((x) => x.id === fragmentId);
    const messages = revelationFragment(m, DMAP[id].d.boss.name);
    c.history.push({ id: fragmentId, date: today(), messages });
    raconter(messages);
  }
  if (prom) {
    c.rank = prom;
    const messages =
      prom === "S"
        ? [
            "Tu as retrouvé le Grimoire, libéré le Système et fermé la Brèche.",
            "Les Gardiens reconnaissent ta maîtrise. Rang S accordé. Tu es désormais le protecteur du Grimoire des Mille Savoirs.",
          ]
        : [
            `Épreuve accomplie. Le Système reconnaît ta maîtrise : rang ${prom} accordé.`,
          ];
    c.history.push({ id: "rank-" + prom, date: today(), messages });
    raconter(messages);
  }
  const medalKey = B.elite ? id + ":elite" : id;
  const medal = c.medals[medalKey] || (c.medals[medalKey] = []);
  const gained = [];
  if (!B.potions && !medal.includes("sans-potion")) gained.push("sans-potion");
  if (B.perfectDodges >= 2 && !medal.includes("esquive"))
    gained.push("esquive");
  if (B.interrupts > 0 && !medal.includes("interruption"))
    gained.push("interruption");
  medal.push(...gained);
  donnerEssence(gained.length * 15);
  const reward = recompenserSession("dungeon", !story && !prom ? "hunt" : null);
  const bonus = story && !wasCleared ? gagnerXP(100) : { xp: 0, essence: 0 };
  UI.result.xp = reward.xp + bonus.xp;
  UI.result.essence = reward.essence + bonus.essence;
  UI.result.medals = gained;
  S.keyFragments = c.completed.filter((x) => x.startsWith("fragment-")).length;
  UI.result.fragment =
    courseFragment ||
    !!(
      story &&
      CG.missions.find((x) => x.id === story)?.fragment &&
      !wasCleared
    );
  UI.result.gold = wasCleared ? 10 : 30; // historical gold is replaced, not added twice
  S.gold -= Math.round(
    (30 + DMAP[id].d.req * 15) * (B.chief ? 1.5 : 1) * (wasCleared ? 0.5 : 1),
  );
  S.gold += UI.result.gold;
  effacerEtape();
  sauvegarder();
};
const originalDefeat = defaiteBoss;
defaiteBoss = function () {
  originalDefeat();
  UI.result.storyId = B.storyId;
  UI.result.promotion = B.promotion;
  UI.result.assessment = B.assessment;
  UI.result.elite = !!B.elite;
};
ACTIONS.retry = function () {
  const r = UI.result;
  demarrerBoss(r.dId, { acc: r.bless.acc, maxCombo: r.bless.maxCombo });
  B.storyId = r.storyId;
  B.promotion = r.promotion;
  B.assessment = r.assessment;
  if (r.elite) adapterBossElite();
  afficher();
};
const originalFlee = ACTIONS.flee;
ACTIONS.flee = function () {
  enregistrerEtape();
  originalFlee();
};
const originalBossFlee = ACTIONS.bossflee;
ACTIONS.bossflee = function () {
  const synthetic =
    (B && DMAP[B.dId]?.d.storyMission) || (B && DMAP[B.dId]?.d.promotion);
  originalBossFlee();
  if (synthetic) allerA("quests");
};
ACTIONS.resume = reprendreEtape;
ACTIONS.mission = (t) => lancerMission(t.dataset.id);
ACTIONS.promote = lancerPromotion;
ACTIONS.secret = function () {
  const c = campagne();
  if (c.completed.filter((x) => x.startsWith("fragment-")).length < 8) return;
  allerA("secret");
};
ACTIONS.solvekey = function () {
  const value = norm($("#keyAnswer").value);
  if (value !== "memoires") {
    systeme(
      "Signal incomplet",
      "<p>Lis les lettres des huit fragments dans leur ordre de découverte.</p>",
    );
    return;
  }
  campagne().keyFound = true;
  sauvegarder();
  raconter([
    "Le cœur caché de la Clé s’éveille. Les Gardiens l’avaient dissimulé dans la mémoire du Système.",
    "Clé ancestrale reconstituée. Le Sanctuaire pourra être ouvert dès que son signal sera localisé.",
  ]);
  allerA("quests");
};
ACTIONS.contract = function (t) {
  const kind = t.dataset.id;
  if (kind === "hunt") {
    allerA("map");
    systeme(
      "Contrat de Traque",
      "<p>Termine un donjon de cours pour recevoir la récompense du contrat.</p>",
    );
    return;
  }
  const pool = poolRevision(kind),
    eligible =
      kind === "repair"
        ? pool.some((x) => S.mistakes[x.key] > 0)
        : pool.some(
            (x) =>
              x.h.lastCorrect &&
              Date.parse(today()) - Date.parse(x.h.lastCorrect) >= 3 * 864e5,
          );
  if (!eligible) return;
  const list = pool.slice(0, 8),
    room = {
      ids: list.map((x) => x.q),
      label: "Contrat",
      defeated: 0,
      total: list.length,
      queue: list.map((x) => ({
        d: x.d,
        q: x.q,
        mob: ["🎯", "Sentinelle d’entraînement"],
      })),
    };
  R = {
    mode: "training",
    contractKind: kind,
    dId: null,
    lvl: 1,
    rooms: [room],
    roomIndex: 0,
    correct: 0,
    wrong: 0,
    combo: 0,
    maxCombo: 0,
    hpMax: maxHp(),
    hp: maxHp(),
    qtimeBonus: 0,
    xp: 0,
    gold: 0,
    cur: null,
    fb: null,
    log: [],
    logStageStart: 0,
    sessionSeen: [],
  };
  preparerQuestion();
  allerA("dungeon");
};
ACTIONS.train = function () {
  demarrerEntrainement();
  if (R) {
    R.sessionSeen = [];
    R.contractKind = null;
  }
};
ACTIONS.shadow = (t) => {
  const c = campagne();
  if (c.shadows.includes(t.dataset.id)) {
    c.shadow = t.dataset.id;
    sauvegarder();
    afficher();
  }
};
ACTIONS.variant = function (t) {
  const c = campagne(),
    v = CG.CONFIG.variants.find((x) => x.id === t.dataset.id);
  if (!v || chapitreActuel() < v.chapter) return;
  if (!c.variants.includes(v.id)) {
    if (c.essence < v.cost) return;
    c.essence -= v.cost;
    c.variants.push(v.id);
  }
  c.variant = v.id;
  sauvegarder();
  afficher();
};
ACTIONS.style = function (t) {
  const c = campagne(),
    v = CG.CONFIG.styles.find((x) => x.id === t.dataset.id);
  if (!v) return;
  if (!c.styles.includes(v.id)) {
    if (c.essence < v.cost) return;
    c.essence -= v.cost;
    c.styles.push(v.id);
  }
  c.style = v.id;
  sauvegarder();
  afficher();
};
const originalStat = ACTIONS.stat;
ACTIONS.stat = function (t) {
  if (!["str", "agi", "vit", "int"].includes(t.dataset.k)) return;
  if (S.stats[t.dataset.k] >= 5 + 2 * (niveauEffectif() - 1)) return;
  originalStat(t);
};
ACTIONS.claim = function () {
  if (!dailyDone() || S.daily.claimed) return;
  S.daily.claimed = true;
  S.gold += 40;
  const award = gagnerXP(60);
  systeme(
    "Quête terminée",
    `<p>+40 or, +${award.xp} XP${award.essence ? " et " + award.essence + " essence" : ""}.</p>`,
  );
  sauvegarder();
  afficher();
};
const originalBuy = ACTIONS.buy;
ACTIONS.buy = function (t) {
  const it = item(t.dataset.id);
  if (!it) return;
  if (it.atk !== undefined || it.def !== undefined) {
    const list = it.atk !== undefined ? SHOP.weapons : SHOP.armors;
    if (
      list.indexOf(it) > [1, 2, 3, 4][chapitreActuel()] ||
      S.owned.includes(it.id)
    )
      return;
  } else if ((S.inv[it.id] || 0) >= 10) return;
  originalBuy(t);
};
ACTIONS.equip = function (t) {
  const it = item(t.dataset.id);
  if (!it || !S.owned.includes(it.id)) return;
  if (it.atk !== undefined) S.weapon = it.id;
  else S.armor = it.id;
  sauvegarder();
  afficher();
};
const originalChrono = estSalleChronometree;
estSalleChronometree = function () {
  return (
    originalChrono() &&
    !R.storyId &&
    !R.promotion &&
    !DMAP[R.dId]?.d.storyMission &&
    !DMAP[R.dId]?.d.promotion
  );
};
function htmlFragments() {
  const c = campagne(),
    obtained = new Set(c.completed.filter((x) => x.startsWith("fragment-")));
  return `<section class="key-vault win"><div class="win-head">La Clé ancestrale</div><div class="key-art">${svgCleComplete(obtained, c.keyFound)}</div><p class="key-total">${obtained.size} / 8 fragments · ${c.keyFound ? "Cœur retrouvé" : "Cœur inconnu"}</p><div class="fragment-runes">${Array.from(
    "MEMOIRES",
  )
    .map(
      (l, i) =>
        `<span class="rune ${obtained.has("fragment-" + (i + 1)) ? "found" : ""}" title="Fragment ${i + 1}">${obtained.has("fragment-" + (i + 1)) ? l : "?"}</span>`,
    )
    .join(
      "",
    )}</div><p class="hint">Chaque chef vaincu révèle un fragment et une lettre.</p></section>`;
}
htmlProgressionCle = htmlFragments;
const oldQuests = SCREENS.quests;
SCREENS.quests = function () {
  if (!fondIntroTerminee()) return oldQuests();
  const c = campagne(),
    found =
      CG.missions.filter((x) => x.fragment && c.completed.includes(x.id)).length +
      (c.keyFound ? 1 : 0);
  return `<div class="title-row"><h2>Quête</h2></div>
  <section class="win"><div class="win-head">Quête principale</div><div class="task solo"><span class="check ${found >= 9 ? "done" : ""}">${found >= 9 ? "✓" : ""}</span><span>Récolter les 9 fragments de la Clé</span><b class="prog">${found} / 9</b></div>
  ${c.attempt ? '<button class="btn" style="margin-top:14px" data-act="resume">Reprendre l’expédition</button>' : ""}
  <button class="btn key-btn" style="margin-top:14px" data-act="keycodex">Codex de la clé</button></section>`;
};
ACTIONS.keycodex = function () {
  systeme("", corpsCodexCle(), null, "codex", "Fermer");
};
function dateLisible(date) {
  return new Date(date + "T12:00:00").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}
const oldTraining = SCREENS.training;
SCREENS.training = function () {
  return oldTraining();
  const c = campagne(),
    pool = poolRevision();
  return `<div class="title-row"><h2>Contrats du Système</h2><p class="sub">Varie tes révisions. Les trois contrats se renouvellent chaque jour, sans pénalité d’absence.</p></div><div class="contract-grid">${CG.CONFIG.contracts
    .map((v) => {
      const done = c.day.contracts.includes(v.id),
        eligible =
          v.id === "hunt" ||
          (v.id === "repair"
            ? pool.some((x) => S.mistakes[x.key] > 0)
            : pool.some(
                (x) =>
                  x.h.lastCorrect &&
                  Date.parse(today()) - Date.parse(x.h.lastCorrect) >=
                    3 * 864e5,
              ));
      return `<section class="win"><div class="win-head">${done ? "Contrat accompli" : "Contrat disponible"}</div><h2>${v.name}</h2><p>${v.desc}</p><p class="sub">Bonus : ${v.xp} XP, ou essence si ton palier est atteint.</p><button class="btn primary" data-act="contract" data-id="${v.id}" ${done || !eligible ? "disabled" : ""}>${done ? "Reviens demain" : eligible ? "Accepter le contrat" : "Aucune révision de ce type pour le moment"}</button></section>`;
    })
    .join(
      "",
    )}</div><section class="win" style="margin-top:14px"><h2>Entraînement libre</h2><p>Rejoue à ton rythme. Les répétitions immédiates donnent moins d’XP ; les révisions espacées en donnent davantage.</p><button class="btn" data-act="train">S’entraîner</button><button class="btn" data-act="storystart">Les Fondamentaux</button></section>`;
};
SCREENS.secret = function () {
  return `<section class="win"><div class="win-head">Mémoire oubliée du Système</div><h2>Le cœur de la Clé</h2>${htmlFragments()}<p>Huit chefs. Huit lettres. Lis les fragments dans l’ordre de leur découverte.</p><label class="field">Mot gravé dans la mémoire<input id="keyAnswer" class="txt" autocomplete="off" maxlength="32"></label><button class="btn primary" data-act="solvekey">Réveiller le cœur</button><button class="link" data-act="allerA" data-to="status">Retour au statut</button></section>`;
};
const oldStatus = SCREENS.status;
SCREENS.status = function () {
  const c = campagne();
  let html = oldStatus();
  html = html
    .replace("Chances d’esquive", "Précision d’esquive")
    .replace(
      "Portails nettoyés</span><span>" +
        Object.values(S.dungeons).filter((x) => x.cleared).length,
      "Portails nettoyés</span><span>" +
        SUBJECTS.flatMap((s) => s.dungeons).filter(
          (d) => S.dungeons[d.id]?.cleared,
        ).length,
    );
  const extras = `<section class="win" style="margin-top:16px"><details data-panel="powerPanel" ${UI.powerPanel ? "open" : ""}><summary>Pouvoirs, Ombres et apparences</summary><p>Essence : <strong>${c.essence}</strong> · ${CG.CONFIG.chapters[chapitreActuel()].title} · puissance active limitée au niveau ${CG.CONFIG.chapters[chapitreActuel()].cap}</p><p class="sub">Au palier maximal, l’XP devient de l’essence. Les variantes s’équipent une à la fois. Une seule ombre accompagne le combat.</p><h3>Compétences</h3><p>Protection : acquise · Entaille : ${competenceDisponible("s1") ? "acquise" : "niveau 3 + premier fragment"} · Esquive : ${competenceDisponible("dodge") ? "acquise" : "rang D"} · Frappe de l’ombre : ${competenceDisponible("s2") ? "acquise" : "rang C et niveau 10"}</p><h3>Ombres</h3>${CG.CONFIG.shadows.map((v) => `<div class="itemrow power-row"><div><b>${v.name}</b><small>${v.effect} · niveau ${c.shadowLevels[v.id] || 1}/3</small></div><button class="btn" data-act="shadow" data-id="${v.id}" ${!c.shadows.includes(v.id) ? "disabled" : ""}>${c.shadow === v.id ? "Équipée" : c.shadows.includes(v.id) ? "Équiper" : "À découvrir"}</button>${c.shadows.includes(v.id) ? `<button class="btn" data-act="shadowupgrade" data-id="${v.id}" ${(c.shadowLevels[v.id] || 1) >= Math.min(3, chapitreActuel() + 1) || c.essence < 200 * (c.shadowLevels[v.id] || 1) ? "disabled" : ""}>Renforcer · ${200 * (c.shadowLevels[v.id] || 1)} essence</button>` : ""}</div>`).join("")}<h3>Variantes d’Entaille</h3>${CG.CONFIG.variants.map((v) => `<div class="itemrow power-row"><div><b>${v.name}</b><small>${v.desc}</small></div><button class="btn" data-act="variant" data-id="${v.id}" ${chapitreActuel() < v.chapter || (!c.variants.includes(v.id) && c.essence < v.cost) ? "disabled" : ""}>${c.variant === v.id ? "Équipée" : c.variants.includes(v.id) ? "Équiper" : v.cost + " essence"}</button></div>`).join("")}<h3>Apparences sans bonus de puissance</h3>${CG.CONFIG.styles.map((v) => `<div class="itemrow power-row"><b>${v.name}</b><button class="btn" data-act="style" data-id="${v.id}" ${!c.styles.includes(v.id) && c.essence < v.cost ? "disabled" : ""}>${c.style === v.id ? "Équipée" : c.styles.includes(v.id) ? "Équiper" : v.cost + " essence"}</button></div>`).join("")}</details></section>${htmlFragments()}${c.completed.filter((x) => x.startsWith("fragment-")).length === 8 && !c.keyFound ? '<button class="btn" data-act="secret">Analyser le signal résiduel</button>' : ""}`;
  return html + extras;
};
const boutiqueVitrine = SCREENS.shop;
SCREENS.shop = function () {
  if (!BOUTIQUE_OUVERTE) return boutiqueVitrine();
  let html = SCREENS.shopReal();
  const limit = [1, 2, 3, 4][chapitreActuel()];
  for (const list of [SHOP.weapons, SHOP.armors])
    for (const it of list.slice(limit + 1)) {
      html = html.replace(
        `data-act="buy" data-id="${it.id}"`,
        `data-act="buy" data-id="${it.id}" disabled`,
      );
    }
  return html;
};
const oldBossScreen = SCREENS.boss;
SCREENS.boss = function () {
  let html = oldBossScreen(),
    c = campagne();
  const intention = B.specialNext
    ? "Charge dévastatrice : protège-toi, esquive ou interromps avec une Entaille parfaite."
    : B.temper === "gardien" && B.playerTurns % 4 === 3
      ? "Bouclier fermé : conserve tes compétences puissantes."
      : "Le boss prépare une attaque.";
  html = html
    .replace(
      '<div class="ppanel">',
      `<p class="intent">${intention}</p><div class="ppanel">`,
    )
    .replace('class="arena', 'class="arena aura-' + (c.style || "violet"));
  for (const skill of ["s1", "s2", "dodge"]) {
    const unavailable =
      !competenceDisponible(skill) || (B.cooldowns?.[skill] || 0) > 0;
    if (unavailable)
      html = html.replace(
        `data-bact="${skill}"`,
        `data-bact="${skill}" disabled`,
      );
  }
  html = html
    .replace("10 PM<kbd>K", "12 PM<kbd>K")
    .replace("niveau 5<kbd>L", "rang C · niveau 10<kbd>L")
    .replace(
      "Appuie sur <strong>Frapper</strong> quand le curseur passe par le centre !",
      B.timing?.kind === "dodge"
        ? "Appuie sur <strong>Esquiver</strong> dans la zone lumineuse !"
        : "Appuie sur <strong>Frapper</strong> dans la zone lumineuse !",
    );
  if (B.timing?.kind === "dodge")
    html = html.replace("Frapper !", "Esquiver !");
  if (!competenceDisponible("dodge"))
    html = html.replace("Au bon moment<kbd>Espace", "Rang D requis<kbd>Espace");
  const cost = S.campaign.variant === "deep" ? 18 : 12;
  html = html.replace("12 PM<kbd>K", cost + " PM<kbd>K");
  if (B.mp < cost)
    html = html.replace('data-bact="s1"', 'data-bact="s1" disabled');
  for (const skill of ["s1", "s2"]) {
    const label = skill === "s1" ? "Entaille" : "Frappe de l’ombre";
    if (B.cooldowns?.[skill] > 0)
      html = html.replace(
        label + "<small>",
        label + "<small>" + B.cooldowns[skill] + " tour(s) · ",
      );
    else if (!competenceDisponible(skill))
      html = html.replace(label + "<small>", label + "<small>À débloquer · ");
  }
  if (!B.timing && !B.missPending) {
    html = html.replace(
      '<div class="skills">',
      `<div class="skills"><button class="skill" data-bact="guard" ${B.turn !== "player" ? "disabled" : ""}>Protection<small>−60 % de dégâts</small></button>${competenceDisponible("summon") ? `<button class="skill" data-bact="summon" ${B.shadowUsed || B.turn !== "player" ? "disabled" : ""}>Invoquer<small>Une fois par combat</small></button>` : ""}`,
    );
  }
  if (B.potions >= 2)
    html = html.replace('data-bact="pot"', 'data-bact="pot" disabled');
  html = html.replace(
    /<small>\d+% de réussite<kbd>Espace<\/kbd><\/small>/,
    `<small>${competenceDisponible("dodge") ? "Au bon moment" : "Rang D requis"}<kbd>Espace</kbd></small>`,
  );
  return html;
};
const oldBossGate = SCREENS.bossgate;
SCREENS.bossgate = function () {
  let html = oldBossGate();
  html = html
    .replace("12 PM, dégâts ×3.", "12 PM, dégâts ×3 ; délai de deux tours.")
    .replace(
      "25 PM, dégâts ×6. Débloquée au niveau 5.",
      "25 PM, dégâts ×5. Rang C, niveau 10 ; délai de trois tours.",
    );
  html = html.replace(
    /<tr><td>Esquiver[\s\S]*?<\/tr>/,
    "<tr><td>Protection</td><td>Réduit les dégâts de 60 %.</td></tr><tr><td>Esquiver</td><td>Débloquée au rang D. Réussis le geste pour préparer une contre-attaque.</td></tr>",
  );
  return html;
};
const oldDungeonScreen = SCREENS.dungeon;
SCREENS.dungeon = function () {
  let html = oldDungeonScreen();
  if (R.fb?.essence)
    html = html.replace(
      "<h3>Créature vaincue</h3>",
      `<h3>Créature vaincue</h3><p>+${R.fb.essence} essence d’ombre</p>`,
    );
  return html;
};
const oldResult = SCREENS.result;
SCREENS.result = function () {
  let html = oldResult();
  if (UI.result.essence)
    html += `<p class="win">+${UI.result.essence} essence d’ombre</p>`;
  if (UI.result.medals?.length)
    html += `<p class="win">Défis accomplis : ${UI.result.medals.map(esc).join(" · ")}</p>`;
  return html;
};
const oldHeader = enteteJeu;
enteteJeu = function () {
  campagne();
  let html = oldHeader();
  if (S.level >= CG.CONFIG.chapters[chapitreActuel()].cap)
    html = html.replace(
      /<div class="xpbox">[\s\S]*?<div class="gold-count">/,
      `<div class="xpbox"><span>Palier atteint · tes récompenses deviennent de l’essence</span><span>${campagne().essence} essence d’ombre</span></div><div class="gold-count">`,
    );
  return html;
};
if (S) campagne();

// Les chefs changent effectivement de tactique, en plus de la jauge plus rapide.
const originalAttack = attaqueJoueur;
attaqueJoueur = function (name, spec, zone) {
  originalAttack(name, spec, zone);
  if (!B || B.over || !B.chief) return;
  const ratio = B.bossHp / B.bossMax,
    configured = DMAP[B.dId].d.boss.phases;
  const phases = configured || [
    { below: 0.65, temper: "insaisissable" },
    { below: 0.3, temper: "brute" },
  ];
  const phase = phases.filter((p) => ratio <= p.below).length;
  if (phase > B.phase) {
    B.phase = phase;
    B.temper = phases[phase - 1].temper;
    ajouterJournal(
      "Le chef change de tactique : " + TEMPERAMENTS[B.temper].label + ".",
      "systeme",
    );
  }
};

ACTIONS.elite = function (t) {
  const id = t.dataset.id;
  if (!S.dungeons[id]?.cleared || (campagne().medals[id] || []).length < 2)
    return;
  demarrerDonjon(id);
  R.elite = true;
  enregistrerEtape();
};
const originalLessonScreen = SCREENS.lesson;
SCREENS.lesson = function () {
  const html = originalLessonScreen(),
    medals = campagne().medals[UI.dId] || [];
  return (
    html +
    `<section class="win" style="margin-top:16px"><div class="win-head">Défis du boss</div><p>Sans potion · Deux esquives parfaites · Interrompre une charge</p><p>${medals.length ? medals.map(esc).join(" · ") : "Aucune médaille pour le moment."}</p><button class="btn gold" data-act="elite" data-id="${UI.dId}" ${medals.length < 2 || !S.dungeons[UI.dId]?.cleared ? "disabled" : ""}>Version Élite — deux médailles requises</button></section>`
  );
};

ACTIONS.shadowupgrade = function (t) {
  const c = campagne(),
    id = t.dataset.id,
    level = c.shadowLevels[id] || 1,
    cost = 200 * level;
  if (
    !c.shadows.includes(id) ||
    level >= Math.min(3, chapitreActuel() + 1) ||
    c.essence < cost
  )
    return;
  c.essence -= cost;
  c.shadowLevels[id] = level + 1;
  sauvegarder();
  afficher();
};

ACTIONS.replaystory = function (t) {
  const c = campagne(),
    m = CG.missions.find((x) => x.id === t.dataset.id);
  if (!m || !c.completed.includes(m.id)) return;
  const d = creerEpreuve("story:" + m.id, m.title, m.level, m, null);
  demarrerDonjon(d.id);
  enregistrerEtape();
};
