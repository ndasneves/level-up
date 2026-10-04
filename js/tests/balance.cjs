/* Simulation indicative, sans remplacer un essai avec le joueur. */
const { game } = require("./helpers.cjs");
function duel(id, level, chapter, rank, skilled, seed) {
  const g = game();
  g.run(
    `let rngSeed=${seed};Math.random=()=>{rngSeed=(Math.imul(rngSeed,1664525)+1013904223)>>>0;return rngSeed/4294967296;};`,
  );
  g.run(
    `today=()=> '2027-06-10';S.level=${level};S.campaign.rank='${rank}';S.campaign.completed=${JSON.stringify(["fragment-1", ...(chapter >= 1 ? ["sanctuary"] : []), ...(chapter >= 2 ? ["system-heart"] : []), ...(chapter >= 3 ? ["echo-4"] : [])])};const points=3*(S.level-1);S.stats={str:5+Math.floor(points*.4),vit:5+Math.floor(points*.3),agi:5+Math.floor(points*.2),int:5+Math.floor(points*.1)};S.weapon='w${chapter + 1}';S.armor='a${chapter + 1}';S.inv.potHp=2;S.inv.potHpL=${chapter ? 2 : 0};const m=CG.missions.find(x=>x.id==='${id}');const d=creerEpreuve('story:'+m.id,m.title,m.level,m,null);demarrerBoss(d.id,{acc:.9,maxCombo:5});B.storyId=m.id;`,
  );
  for (let turn = 0; turn < 140; turn++) {
    if (g.run("B.over")) break;
    if (g.run(`B.turn==='player'`))
      g.run(
        `(()=>{if(B.hp<B.hpMax*.4&&B.potions<2){actionBoss('pot');return;}if(B.specialNext&&${skilled}){if(B.mechanic==='messenger'&&B.messengerPattern==='sweep'){actionBoss('guard');return;}if(competenceDisponible('dodge')){B.turn='busy';planifierCombat(()=>tourBoss(Math.random()<.85),0);}else actionBoss('guard');return;}const skill=competenceDisponible('s1')&&B.cooldowns.s1===0&&B.mp>=12?'s1':'atk';actionBoss(skill);if(B.timing){const t=B.timing;B.timing=null;const r=Math.random(),zone=${skilled}?(r<.75?'perfect':'good'):(r<.25?'good':'miss');attaqueJoueur(skill,t.spec,zone);}})()`,
      );
    g.flush();
    g.flush();
  }
  return g.run("B.bossHp<=0");
}
const cases = [
  ["fragment-1", 2, 0, "E"],
  ["fragment-8", 9, 0, "D"],
  ["system-heart", 15, 1, "C"],
  ["echo-4", 22, 2, "B"],
  ["sovereign", 30, 3, "A"],
];
for (const [id, l, ch, r] of cases) {
  const n = 20;
  let good = 0,
    bad = 0;
  for (let i = 0; i < n; i++) {
    good += duel(id, l, ch, r, true, i + 1);
    bad += duel(id, l, ch, r, false, i + 1);
  }
  console.log(
    `${id}: stratégie ${good}/${n}, gestes imprécis sans défense ${bad}/${n}`,
  );
}
