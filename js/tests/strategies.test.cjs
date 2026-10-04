"use strict";
const test = require("node:test"),
  assert = require("node:assert/strict");
const { game } = require("./helpers.cjs");
function chief(mechanic) {
  const g = game();
  g.run(
    `DMAP['en-1'].d.boss={name:'Chef test',chief:true,temper:'brute',mechanic:'${mechanic}',phases:[],stats:{hp:2000,attack:20}};S.level=9;S.campaign.completed=['fragment-1'];demarrerBoss('en-1',{acc:1,maxCombo:0});`,
  );
  return g;
}
test("le parent choisit la tactique, y compris son absence", () => {
  const g = chief("none");
  assert.equal(g.run("B.mechanic"), "none");
  assert.match(
    g.run("SCREENS.status()"),
    /Fragments de la Clé<\/span><span>1<\/span>/,
  );
  assert.equal(
    g.run(`window.ContentRules.boss({mechanic:'collector'}).mechanic`),
    "collector",
  );
  assert.equal(
    g.run(`window.ContentRules.boss({mechanic:'inconnu'}).mechanic`),
    null,
  );
});
test("la Sentinelle ouvre son bouclier pour la troisième action", () => {
  const g = chief("sentinel");
  assert.equal(g.run("B.sentinelClosed"), true);
  g.run("tourBoss(true)");
  g.flush();
  assert.equal(g.run("B.sentinelClosed"), true);
  g.run("tourBoss(true)");
  g.flush();
  assert.equal(g.run("B.sentinelClosed"), false);
  g.run("tourBoss(true)");
  g.flush();
  assert.equal(g.run("B.sentinelClosed"), true);
});
test("Brise-Sceau traverse le vrai bouclier de Sentinelle une fois", () => {
  const g = chief("sentinel");
  g.run(
    "Math.random=()=>.5;B.counter=false;attaqueJoueur('atk',{m:1,mp:0},'perfect');",
  );
  const blocked = g.run("B.bossMax-B.bossHp");
  g.run(
    "B.bossHp=B.bossMax;B.breakSeal=true;attaqueJoueur('atk',{m:1,mp:0},'perfect')",
  );
  assert.ok(g.run("B.bossMax-B.bossHp") >= blocked * 3);
  assert.equal(g.run("B.breakSeal"), false);
});
test("le Collecteur rend le mana après protection, même au rang E", () => {
  const g = chief("collector");
  g.run("tourBoss(true)");
  g.flush();
  g.run("tourBoss(true)");
  g.flush();
  assert.equal(g.run("B.specialNext"), true);
  assert.equal(g.run("B.stolenMana"), 8);
  g.run("B.guarding=true;tourBoss(false)");
  g.flush();
  assert.equal(g.run("B.stolenMana"), 0);
  assert.equal(g.run("B.mp"), g.run("B.mpMax"));
});
test("interrompre le Collecteur libère aussi son mana et relance le cycle", () => {
  const g = chief("collector");
  g.run(
    "B.enemyTurns=2;preparerTactiqueChef();attaqueJoueur('s1',{m:3,mp:12},'perfect');",
  );
  assert.equal(g.run("B.stolenMana"), 0);
  assert.equal(g.run("B.specialNext"), false);
  assert.equal(g.run("B.enemyTurns"), 0);
});
test("le Messager annonce son alternance et la bonne défense compte", () => {
  const g = chief("messenger");
  g.run(
    "Math.random=()=>.5;B.specialNext=true;B.guarding=true;tourBoss(false)",
  );
  const piercing = g.run("B.hpMax-B.hp");
  assert.equal(g.run("B.messengerPattern"), "sweep");
  g.run("B.hp=B.hpMax;B.specialNext=true;B.guarding=true;tourBoss(false)");
  assert.ok(g.run("B.hpMax-B.hp") < piercing);
  g.run(
    "B.hp=B.hpMax;B.messengerPattern='sweep';B.specialNext=true;tourBoss(true)",
  );
  assert.ok(g.run("B.hp") < g.run("B.hpMax"));
  assert.equal(g.run("B.incomingReduction"), null);
});
test("l’Élite reste adaptée après défaite et ne se multiplie pas deux fois", () => {
  const g = game();
  g.run(
    "S.level=9;S.stats.str=20;demarrerBoss('en-1',{acc:1,maxCombo:0});adapterBossElite();",
  );
  const hp = g.run("B.bossMax");
  assert.ok(hp >= g.run("atkVal()*12+B.L*22"));
  g.run("adapterBossElite()");
  assert.equal(g.run("B.bossMax"), hp);
  g.run("defaiteBoss();ACTIONS.retry()");
  assert.equal(g.run("B.elite"), true);
  assert.equal(g.run("B.temper"), "insaisissable");
  assert.equal(g.run("B.bossMax"), hp);
});
test("les objectifs bornent le crédit, sans dépendre des nouveaux cours", () => {
  const g = game();
  g.run(
    "for(let i=0;i<40;i++)creditDefi('reviews','q'+i);for(let i=0;i<10;i++)creditDefi('wins','d'+i)",
  );
  assert.equal(g.run("defisChapitre().reviews"), 10);
  assert.equal(g.run("defisChapitre().wins"), 3);
  g.run(
    "today=()=> '2026-10-04';creditDefi('reviews','q0');creditDefi('reviews','q0')",
  );
  assert.equal(g.run("defisChapitre().reviews"), 11);
  g.run("today=()=> '2027-06-20'");
  assert.equal(g.run("chapitreActuel()"), 0);
  assert.equal(g.run("defisChapitre().reviews"), 11);
});
test("corriger un premier échec ne crédite pas le défi de réponses justes", () => {
  const g = game();
  g.run(
    "demarrerDonjon('en-1');resoudreReponse(false,null);R.fb=null;resoudreReponse(true,null)",
  );
  assert.equal(g.run("defisChapitre().reviews"), 0);
});
test("un titre n’est gagné qu’une fois, et ne change pas la puissance", () => {
  const g = game();
  g.run(
    "Object.assign(defisChapitre(),{reviews:30,wins:5,prepared:2});const before=atkVal();ACTIONS.claimchallenge({dataset:{tier:'0'}});ACTIONS.claimchallenge({dataset:{tier:'0'}})",
  );
  assert.equal(g.run("defisChapitre().claimed.length"), 1);
  assert.equal(g.run("campagne().essence"), 40);
  assert.equal(g.run("atkVal()"), g.run("before"));
});
test("redistribuer conserve le budget, l’accès aux artefacts et exige confirmation", () => {
  const g = game();
  g.run(
    "UI.screen='status';S.level=3;S.points=1;S.stats.str=10;S.campaign.artifactUnlocked=['artBreak'];ACTIONS.respecconfirm()",
  );
  assert.equal(g.run("S.stats.str"), 10);
  g.run("ACTIONS.respec();ACTIONS.respecconfirm();ACTIONS.respecconfirm()");
  assert.equal(g.run("S.points"), 6);
  assert.equal(g.run("S.stats.str"), 5);
  assert.equal(g.run("S.campaign.artifactUnlocked[0]"), "artBreak");
  assert.equal(g.run("S.campaign.respec.freeChapters.length"), 1);
  g.run(
    "S.stats.agi=8;S.points-=3;S.gold=100;ACTIONS.respec();ACTIONS.respecconfirm()",
  );
  assert.equal(g.run("S.gold"), 20);
  g.run("S.stats.agi=8;S.points-=3;S.gold=1000");
  assert.equal(g.run("redistributionDisponible().available"), false);
  g.run("today=()=> '2026-10-10'");
  assert.equal(g.run("redistributionDisponible().available"), true);
});
test("les ombres réagissent sans fournir de statistiques supplémentaires", () => {
  const g = game();
  g.run(
    "S.campaign.shadows=['knight'];S.campaign.shadow='knight';const before=atkVal();paroleOmbre('lose')",
  );
  assert.match(g.run("campagne().shadowVoice.text"), /côtés/);
  assert.equal(g.run("atkVal()"), g.run("before"));
});

test("les anciens paliers restent réclamables après passage au chapitre suivant", () => {
  const g = game();
  g.run(
    "Object.assign(defisChapitre(0),{reviews:30,wins:5,prepared:2});today=()=> '2027-02-10';campagne().completed.push('sanctuary');UI.challengeChapter=0",
  );
  assert.equal(g.run("chapitreActuel()"), 1);
  assert.match(g.run("htmlDefisChapitre()"), /data-chapter="0"/);
  g.run("ACTIONS.claimchallenge({dataset:{tier:'0',chapter:'0'}})");
  assert.equal(g.run("defisChapitre(0).claimed.length"), 1);
  assert.equal(g.run("defisChapitre(1).claimed.length"), 0);
  g.run("ACTIONS.claimchallenge({dataset:{tier:'0',chapter:'3'}})");
  assert.equal(g.run("campagne().chapterChallenges[3]"), undefined);
});
