/* Chief tactics are announced before the player's choice. They never depend on
   the number of lessons, and the author can explicitly disable or choose them. */
"use strict";
function adapterBossElite() {
  if (!B || B.eliteScaled) return;
  B.elite = B.eliteScaled = true;
  B.temper = "insaisissable";
  B.L = Math.max(B.L, niveauEffectif());
  B.bossHp = B.bossMax = Math.max(
    Math.round(B.bossMax * 1.5),
    Math.round(atkVal() * 12 + B.L * 22),
  );
  B.bossAtk = Math.max(
    Math.round(B.bossAtk * 1.2),
    Math.round(maxHp() / 9 + defVal()),
  );
}
function rendreManaVole() {
  if (!B.stolenMana) return;
  const restored = Math.min(B.stolenMana, B.mpMax - B.mp);
  B.mp += restored;
  B.stolenMana = 0;
  ajouterJournal(`Sceau brisé : ${restored} PM récupérés.`, "systeme");
}
function preparerTactiqueChef() {
  if (B.mechanic === "sentinel") B.sentinelClosed = B.enemyTurns % 3 !== 2;
  if (!["collector", "messenger"].includes(B.mechanic)) return;
  B.specialNext = B.enemyTurns % 3 === 2;
  B.specialIn = 2 - (B.enemyTurns % 3);
  if (B.specialNext && B.mechanic === "collector") {
    const stolen = Math.min(B.mp, Math.max(0, 24 - B.stolenMana), 8);
    B.mp -= stolen;
    B.stolenMana += stolen;
    ajouterJournal(
      `Le Collecteur enferme ${stolen} PM. Protège-toi ou interromps sa charge pour les récupérer.`,
      "foe",
    );
  }
}
const bossBeforeStrategies = demarrerBoss;
demarrerBoss = function (id, bless) {
  bossBeforeStrategies(id, bless);
  const config = DMAP[id].d.boss;
  B.mechanic =
    config.mechanic ||
    (B.chief
      ? { gardien: "sentinel", vampirique: "collector" }[B.baseTemper] ||
        "messenger"
      : "none");
  B.enemyTurns = 0;
  B.stolenMana = 0;
  B.messengerPattern = "piercing";
  preparerTactiqueChef();
  afficher();
};
const attackBeforeStrategies = attaqueJoueur;
attaqueJoueur = function (name, spec, zone) {
  const charged = B.specialNext;
  attackBeforeStrategies(name, spec, zone);
  if (charged && name === "s1" && zone === "perfect" && !B.specialNext) {
    if (B.mechanic === "collector") rendreManaVole();
    // Restart the cycle: interruption earns two ordinary attacks before a charge.
    if (["collector", "messenger"].includes(B.mechanic)) B.enemyTurns = 0;
  }
};
const enemyBeforeStrategies = tourBoss;
tourBoss = function (dodging) {
  if (!B || B.over) return;
  const special = B.specialNext,
    guarded = B.guarding;
  const messenger = special && B.mechanic === "messenger";
  if (messenger && B.messengerPattern === "piercing") B.guardFactor = 0.7;
  if (messenger && B.messengerPattern === "sweep" && dodging) {
    B.incomingReduction = 0.55;
    dodging = false;
    ajouterJournal(
      "Le balayage te rattrape : l’esquive amortit le coup, la protection aurait été plus efficace.",
      "systeme",
    );
  }
  enemyBeforeStrategies(dodging);
  if (special && B.mechanic === "collector" && (guarded || dodging))
    rendreManaVole();
  B.guarding = false;
  B.guardFactor = B.incomingReduction = null;
  if (messenger)
    B.messengerPattern =
      B.messengerPattern === "piercing" ? "sweep" : "piercing";
  B.enemyTurns++;
  preparerTactiqueChef();
  afficher();
};
function intentionChef() {
  const charge = B.specialNext
    ? " Charge : protège-toi, esquive ou interromps avec une Entaille parfaite."
    : "";
  if (B.mechanic === "sentinel")
    return (
      (B.sentinelClosed
        ? "Sentinelle · Bouclier fermé : dégâts divisés par quatre. Il s’ouvre après deux actions ; Brise-Sceau le traverse."
        : "Sentinelle · Bouclier ouvert pour cette action : c’est le moment de frapper !") +
      charge
    );
  if (B.mechanic === "collector")
    return B.specialNext
      ? `Collecteur · ${B.stolenMana} PM enfermés. Protection, esquive ou Entaille parfaite libèrent le mana.`
      : `Collecteur · Charge dans ${Math.max(1, B.specialIn)} action(s). Mana enfermé : ${B.stolenMana} PM.`;
  if (B.mechanic === "messenger") {
    const advice =
      B.messengerPattern === "piercing"
        ? competenceDisponible("dodge")
          ? "Pointe : esquive conseillée ; protection = −30 %."
          : "Pointe : protection = −30 %. Une Entaille parfaite peut interrompre la charge."
        : "Balayage : protection = −60 % ; esquive = −45 %.";
    return `Messager · ${B.specialNext ? "Charge maintenant." : `Charge dans ${Math.max(1, B.specialIn)} action(s).`} ${advice}`;
  }
  return null;
}
const screenBeforeStrategies = SCREENS.boss;
SCREENS.boss = function () {
  let html = screenBeforeStrategies();
  const intention = intentionChef();
  if (intention)
    html = html.replace(
      /<p class="intent">[\s\S]*?<\/p>/,
      `<p class="intent" role="status">${esc(intention)}</p>`,
    );
  if (
    B.mechanic === "messenger" &&
    B.specialNext &&
    B.messengerPattern === "piercing"
  )
    html = html.replace("−60 % de dégâts", "−30 % sur cette pointe");
  if (B.elite)
    html =
      `<p class="elite-banner">Épreuve Élite · adaptée à ta puissance au début du combat</p>` +
      html;
  return html;
};
