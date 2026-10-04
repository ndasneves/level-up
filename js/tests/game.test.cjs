"use strict";
const test = require("node:test"),
  assert = require("node:assert/strict");
const { game } = require("./helpers.cjs");
test("une sauvegarde neuve ne valide jamais les Fondamentaux au rechargement", () => {
  const g = game();
  assert.equal(
    g.run(
      `!!migrerSauvegarde(JSON.parse(JSON.stringify(nouvelleSauvegarde('Neuf')))).dungeons.fondamentaux`,
    ),
    false,
  );
  assert.equal(
    g.run(
      `migrerSauvegarde({v:2,name:'Ancien',dungeons:{'en-1':{cleared:true}}}).dungeons.fondamentaux.cleared`,
    ),
    true,
  );
});
test("XP plafonnée par chapitre, essence plafonnée par jour, rang indépendant", () => {
  const g = game();
  g.run("gagnerXP(100000)");
  assert.equal(g.run("S.level"), 9);
  assert.equal(g.run("rangDe()"), "E");
  assert.equal(g.run("S.campaign.essence"), 240);
  assert.equal(g.run("S.xp"), 0);
  g.run("gagnerXP(100000)");
  assert.equal(g.run("S.campaign.essence"), 240);
});
test("récompenses répétées bornées par question, fuite sans remboursement des bonus", () => {
  const g = game();
  g.run(
    `demarrerDonjon('en-1');R.cur={e:{d:'en-1',q:'q1'},q:DMAP['en-1'].qmap.q1};for(let i=0;i<45;i++){R.fb=null;resoudreReponse(true,null);R.cur={e:{d:'en-1',q:'q1'},q:DMAP['en-1'].qmap.q1};}`,
  );
  assert.ok(g.run(`S.campaign.day.questionXp['en-1:q1']`) <= 30);
  assert.equal(g.run(`S.mastery['en-1:q1'].correct`), 45);
});
test("promotion exige un jalon et une épreuve, ajout de cours sans promotion", () => {
  const g = game();
  assert.equal(g.run(`CG.promotionReady(campagne(),5,'D',0)`), false);
  g.run(`S.campaign.completed=['fragment-1','fragment-2','fragment-3']`);
  assert.equal(g.run(`CG.promotionReady(campagne(),5,'D',0)`), true);
  g.run("S.level=9;gagnerXP(500)");
  assert.equal(g.run("rangDe()"), "E");
});
test("un échec puis une correction ne modifie pas la note de première réponse", () => {
  const g = game();
  g.run(
    `const d=creerEpreuve('promotion:D','Test',3,null,'D');demarrerDonjon(d.id);R.assessment={seen:[],correct:0,total:0,subjects:{}};resoudreReponse(false,null);R.fb=null;resoudreReponse(true,null);`,
  );
  assert.equal(g.run("R.assessment.total"), 1);
  assert.equal(g.run("R.assessment.correct"), 0);
});
test("fuite pendant une animation : callbacks annulés", () => {
  const g = game();
  g.run(
    `S.level=5;S.campaign.rank='D';demarrerBoss('en-1',{acc:1,maxCombo:0});actionBoss('guard');ACTIONS.bossflee();`,
  );
  assert.doesNotThrow(() => g.flush());
  assert.equal(g.run("B"), null);
});
test("Entaille verrouillée puis soumise au mana et au délai", () => {
  const g = game();
  g.run(`demarrerBoss('en-1',{acc:1,maxCombo:0});actionBoss('s1');`);
  assert.equal(g.run("!!B.timing"), false);
  g.run(`S.level=3;S.campaign.completed=['fragment-1'];actionBoss('s1');`);
  assert.equal(g.run("B.timing.spec.mp"), 12);
  g.run(`B.timing=null;B.cooldowns.s1=2;actionBoss('s1');`);
  assert.equal(g.run("!!B.timing"), false);
});
test("une définition niée est refusée", () => {
  const g = game();
  assert.equal(
    g.run(`noterDefinition('Ne se déplace pas debout','Se déplace debout').ok`),
    false,
  );
});
test("cours accessibles sans niveau et régions toujours navigables", () => {
  const g = game();
  assert.equal(g.run(`estDebloque(DMAP['en-9'].d)`), true);
  g.run(`UI.arch='en';UI.group=null;`);
  assert.match(g.run("SCREENS.map()"), /region-node/);
  assert.match(g.run("SCREENS.quests()"), /assembled-key/);
});
test("les premières réponses et le contenu de la tentative restent figés à la reprise", () => {
  const g = game();
  g.run(
    `const d=creerEpreuve('promotion:D','Test',3,null,'D');demarrerDonjon(d.id);R.promotion='D';R.assessment={seen:[],correct:0,total:0,subjects:{}};resoudreReponse(true,null);const first=R.cur.q.id;reprendreEtape();`,
  );
  assert.equal(g.run("R.assessment.total"), 1);
  assert.equal(g.run("R.promotion"), "D");
  assert.ok(g.run("R.rooms.length") > 0);
});
test("récupérer un noyau ne donne pas un fragment de Clé", () => {
  const g = game();
  g.run(
    `today=()=> '2027-01-20';S.campaign.completed=['sanctuary'];const m=CG.missions.find(x=>x.id==='core-1');const d=creerEpreuve('story:core-1',m.title,m.level,m,null);demarrerBoss(d.id,{acc:1,maxCombo:0});B.storyId='core-1';B.bossHp=0;victoireBoss();`,
  );
  assert.equal(g.run("S.keyFragments"), 0);
  assert.equal(g.run("UI.result.fragment"), false);
});
test("invocation une seule fois et limite des potions", () => {
  const g = game();
  g.run(
    `S.level=10;S.campaign.rank='C';S.campaign.shadows=['knight'];S.campaign.shadow='knight';demarrerBoss('en-1',{acc:1,maxCombo:0});actionBoss('summon');B.turn='player';actionBoss('summon');`,
  );
  assert.equal(g.run("B.shadowUsed"), true);
  g.run(`B.hp=1;B.turn='player';B.potions=2;actionBoss('pot')`);
  assert.equal(g.run("S.inv.potHp"), 2);
});
test("une épreuve de promotion présente bien les quinze questions, puis accorde le rang", () => {
  const g = game();
  g.run(
    `S.level=5;S.campaign.completed=['fragment-1','fragment-2','fragment-3'];const d=creerEpreuve('promotion:D','Test',3,null,'D');demarrerDonjon(d.id);R.promotion='D';R.assessment={seen:[],correct:0,total:0,subjects:{}};`,
  );
  assert.equal(g.run("R.rooms.reduce((n,r)=>n+r.ids.length,0)"), 15);
  g.run(
    `for(const q of DMAP['promotion:D'].d.questions){const a=R.assessment;a.seen.push(q.sourceKey);a.total++;a.correct++;a.subjects[q.sourceSubject]={correct:1,total:1};}R.hp=130;ACTIONS.fightboss();B.bossHp=0;victoireBoss();`,
  );
  assert.equal(g.run("S.campaign.rank"), "D");
  assert.equal(g.run("S.keyFragments"), 3);
});
test("les quatre chapitres requièrent leur date ET le précédent objectif", () => {
  const g = game();
  g.run(`today=()=> '2027-06-10';`);
  assert.equal(g.run("chapitreActuel()"), 0);
  g.run(`S.campaign.completed=['sanctuary']`);
  assert.equal(g.run("chapitreActuel()"), 1);
  g.run(`S.campaign.completed.push('system-heart')`);
  assert.equal(g.run("chapitreActuel()"), 2);
  g.run(`S.campaign.completed.push('echo-4')`);
  assert.equal(g.run("chapitreActuel()"), 3);
});
test("une reprise ne recrée pas un bonus de contrat déjà encaissé", () => {
  const g = game();
  g.run(
    `recompenserSession('training','repair');const xp=S.xp;recompenserSession('training','repair');`,
  );
  assert.equal(
    g.run('S.campaign.day.contracts.filter(x=>x==="repair").length'),
    1,
  );
});
test("tous les écrans et tous les archétypes se rendent sans erreur", () => {
  const g = game();
  for (const screen of [
    "status",
    "training",
    "shop",
    "quests",
    "secret",
    "map",
  ])
    assert.doesNotThrow(() => g.run(`SCREENS.${screen}()`));
  for (const name of [
    "Dragon",
    "Araignée",
    "Serpent",
    "Chauve-souris",
    "Louve",
    "Chevalier",
  ])
    assert.match(g.run(`illustrerCreature('${name}','chief')`), /<svg/);
  g.run(`UI.dId='en-1';demarrerDonjon('en-1');`);
  assert.doesNotThrow(() => g.run("SCREENS.dungeon()"));
  assert.doesNotThrow(() => g.run("SCREENS.lesson()"));
  g.run(`R.stagePending=null;UI.screen='bossgate'`);
  assert.doesNotThrow(() => g.run("SCREENS.bossgate()"));
  g.run(`demarrerBoss('en-1',{acc:1,maxCombo:0});`);
  assert.doesNotThrow(() => g.run("SCREENS.boss()"));
});
test("démarrage réel du script final, sans sauvegarde puis avec sauvegarde", () => {
  const fs = require("node:fs"),
    path = require("node:path");
  const html = fs.readFileSync(path.join(__dirname, "../../index.html"), "utf8"),
    boot = fs.readFileSync(path.join(__dirname, "../boot.js"), "utf8");
  const g = game();
  g.run(`let navigator={};let location={protocol:'file:'};`);
  assert.doesNotThrow(() => g.run(boot));
  assert.equal(g.run("S"), null);
  g.run(`S=nouvelleSauvegarde('Neuf');sauvegarder();`);
  assert.doesNotThrow(() => g.run(boot));
  assert.equal(g.run("fondamentauxTermines()"), false);
});

test("Clé progressive sans fiches, boutons ni divulgation des runes manquantes", () => {
  const g = game();
  let html = g.run("htmlFragments()");
  assert.match(html, /0 \/ 8 fragments/);
  assert.doesNotMatch(html, /<button|fragmentdetail|dossier/);
  g.run("S.campaign.completed=['fragment-1','fragment-3','core-1'];");
  html = g.run("htmlFragments()");
  assert.match(html, /2 \/ 8 fragments/);
  assert.equal((html.match(/key-part obtained/g) || []).length, 2);
  assert.equal((html.match(/class="rune found"/g) || []).length, 2);
  assert.equal((html.match(/class="rune "[^>]*>\?/g) || []).length, 6);
  g.run(
    "S.campaign.completed=Array.from({length:8},(_,i)=>'fragment-'+(i+1));S.campaign.keyFound=true;",
  );
  html = g.run("htmlFragments()");
  assert.match(html, /8 \/ 8 fragments/);
  assert.match(html, /Clé reconstituée/);
});

test("le chef est configurable et un chef sans fragment ne donne aucune clé", () => {
  const g = game(
    `window.GAME_CONTENT.subjects[0].dungeons[0].boss={name:'Le Roi des Brumes',chief:true,temper:'gardien',stats:{hp:480,attack:14,level:3},phases:[]};`,
  );
  g.run(`demarrerBoss('en-1',{acc:1,maxCombo:0});`);
  assert.equal(g.run("B.bossMax"), 480);
  assert.equal(g.run("B.bossAtk"), 14);
  assert.equal(g.run("B.temper"), "gardien");
  g.run("B.bossHp=0;victoireBoss()");
  assert.equal(g.run("S.keyFragments"), 0);
});
test("le fragment est attribué au cours configuré, une seule fois même en rejouant", () => {
  const g = game(
    `window.GAME_CONTENT.subjects[0].dungeons[0].boss={name:'Chef',chief:true,fragment:1};`,
  );
  assert.equal(g.run(`portailFragment('fragment-1').id`), "en-1");
  g.run(
    `demarrerBoss('en-1',{acc:1,maxCombo:0});B.bossHp=0;victoireBoss();demarrerBoss('en-1',{acc:1,maxCombo:0});B.bossHp=0;victoireBoss();`,
  );
  assert.equal(g.run("S.keyFragments"), 1);
  assert.equal(
    g.run(`S.campaign.completed.filter(x=>x==='fragment-1').length`),
    1,
  );
});
test("un chef de fragment futur ne peut pas être affronté depuis son cours", () => {
  const g = game(
    `window.GAME_CONTENT.subjects[0].dungeons[0].boss={name:'Chef',chief:true,fragment:8};`,
  );
  g.run(`demarrerDonjon('en-1');ACTIONS.fightboss();`);
  assert.equal(g.run("B"), null);
});

test("la carte reste bornée avec 40 matières et 120 notions", () => {
  const g = game(
    `const model=window.GAME_CONTENT.subjects[0];window.GAME_CONTENT.subjects=Array.from({length:40},(_,i)=>({...model,id:'s'+i,name:'Matière '+i,dungeons:Array.from({length:120},(_,j)=>({...model.dungeons[0],id:'s'+i+'-d'+j,name:'Notion '+j}))}));`,
  );
  let html = g.run("SCREENS.map()");
  assert.equal((html.match(/class="subject-island"/g) || []).length, 6);
  g.run(`UI.worldPage=6;`);
  assert.equal(
    (g.run("SCREENS.map()").match(/class="subject-island"/g) || []).length,
    4,
  );
  g.run(`UI.arch='s0';UI.group=null;UI.regionPage=2;`);
  html = g.run("SCREENS.map()");
  assert.equal((html.match(/class="isl region-node"/g) || []).length, 6);
  assert.match(html, /data-idx="12"/);
  g.run(`UI.mapView='list';UI.coursePage=11;`);
  assert.equal(
    (g.run("SCREENS.map()").match(/class="course-card"/g) || []).length,
    10,
  );
  g.run(`UI.mapQuery='Notion 119';`);
  assert.equal(
    (g.run("SCREENS.map()").match(/class="course-card"/g) || []).length,
    1,
  );
});
test("la navigation accepte un groupe devenu invalide après modification du contenu", () => {
  const g = game();
  g.run(`UI.arch='en';UI.group=999;`);
  assert.doesNotThrow(() => g.run("SCREENS.map()"));
  assert.match(g.run("enteteJeu()"), /stroke-linecap/);
});

test("acheter un artefact exige statistiques et savoirs uniques, sans les dépenser", () => {
  const g = game();
  g.run(`S.gold=500;S.stats.int=8;ACTIONS.buy({dataset:{id:'potTime'}});`);
  assert.equal(g.run("S.gold"), 500);
  g.run(
    `const courses=SUBJECTS.flatMap(s=>s.dungeons);for(const d of courses.slice(0,2))for(const q of d.questions)S.mastery[d.id+':'+q.id]={correct:50};S.dungeons[courses[0].id]={cleared:true};ACTIONS.buy({dataset:{id:'potTime'}});`,
  );
  assert.equal(g.run("S.gold"), 440);
  assert.equal(g.run("S.stats.int"), 8);
  assert.equal(g.run("connaissancesAcquises().unique"), 16);
  g.run(`S.stats.int=5;S.mastery={};ACTIONS.buy({dataset:{id:'potTime'}});`);
  assert.equal(g.run("S.gold"), 380);
});
test("les potions ne demandent que l’or et une place dans la réserve", () => {
  const g = game();
  g.run(`S.level=1;S.gold=100;ACTIONS.buy({dataset:{id:'potHpL'}});`);
  assert.equal(g.run("S.gold"), 40);
  assert.equal(g.run("S.inv.potHpL"), 1);
});
test("les artefacts sont limités à deux par combat et consommés une seule fois", () => {
  const g = game();
  g.run(
    `S.inv.artWard=2;S.inv.artPrecision=2;S.inv.artBreak=2;demarrerBoss('en-1',{acc:1,maxCombo:0});actionBoss('ward');actionBoss('precision');actionBoss('breakseal');`,
  );
  assert.equal(g.run("B.artifactUses"), 2);
  assert.equal(g.run("S.inv.artWard"), 1);
  assert.equal(g.run("S.inv.artBreak"), 2);
  assert.equal(g.run("B.shadowShield"), true);
});
test("Brise-Sceau n’ignore que le bouclier de la prochaine frappe", () => {
  const g = game();
  g.run(
    `S.inv.artBreak=1;demarrerBoss('en-1',{acc:1,maxCombo:0});B.temper='gardien';B.playerTurns=3;actionBoss('breakseal');Math.random=()=>.5;attaqueJoueur('atk',{m:1,mp:0},'perfect');`,
  );
  assert.equal(g.run("B.anim.shielded"), false);
  assert.equal(g.run("B.breakSeal"), false);
});
test("la dilatation ajoute exactement dix secondes et ses limites survivent à la reprise", () => {
  const g = game();
  g.run(
    `S.inv.potTime=3;demarrerDonjon('en-1');R.roomIndex=R.rooms.length-1;const room=R.rooms[R.roomIndex];room.queue=room.ids.map(q=>({d:'en-1',q,mob:MOBS[0]}));room.defeated=0;room.total=room.queue.length;preparerQuestion();const deadline=R.questionDeadline;utiliserDilatationTemps();utiliserDilatationTemps();`,
  );
  assert.equal(g.run("R.questionDeadline-deadline"), 10000);
  assert.equal(g.run("S.inv.potTime"), 2);
  g.run(`reprendreEtape();utiliserDilatationTemps();`);
  assert.equal(g.run("S.inv.potTime"), 2);
  assert.equal(g.run("R.artifactUses"), 1);
  assert.equal(g.run("R.qtimeBonus"), 0);
});
test("boutique et statut exposent les artefacts et le sceau caché", () => {
  const g = game();
  assert.match(g.run("SCREENS.shop()"), /data-k="artefacts"/);
  g.run(`UI.shopTab='artefacts'`);
  assert.match(g.run("SCREENS.shop()"), /Bonnes réponses uniques/);
  assert.match(g.run("SCREENS.status()"), /data-act="memoryseal"/);
});
test("le cœur se trouve avant les fragments sans sauter de chapitre", () => {
  const g = game();
  g.run(`today=()=> '2027-06-10';ACTIONS.memoryseal();`);
  assert.equal(g.run("S.campaign.keyFound"), true);
  assert.equal(g.run("chapitreActuel()"), 0);
  assert.equal(g.run("S.keyFragments"), 0);
  assert.equal(
    g.run(`S.campaign.history.filter(h=>h.id==='hidden-heart').length`),
    1,
  );
  g.run("ACTIONS.memoryseal()");
  assert.equal(
    g.run(`S.campaign.history.filter(h=>h.id==='hidden-heart').length`),
    1,
  );
});
test("l’indice apparaît une fois après les huit fragments, reste archivé et ne périme pas pendant une absence", () => {
  const g = game();
  g.run(
    `S.campaign.completed=Array.from({length:8},(_,i)=>'fragment-'+(i+1));SCREENS.quests();today=()=> '2027-06-10';`,
  );
  assert.match(g.run("SCREENS.quests()"), /Signal fugitif/);
  assert.equal(
    g.run(`S.campaign.history.filter(h=>h.id==='key-hint').length`),
    1,
  );
  g.run("ACTIONS.keyhintread()");
  assert.doesNotMatch(g.run("SCREENS.quests()"), /Signal fugitif/);
  assert.equal(
    g.run(`S.campaign.history.filter(h=>h.id==='key-hint').length`),
    1,
  );
});
test("le lien d’ombre est cosmétique et borné à trois portails différents par jour", () => {
  const g = game();
  g.run(
    `S.campaign.shadows=['knight'];S.campaign.shadow='knight';for(const id of ['a','a','b','c','d'])renforcerLien(id);`,
  );
  assert.equal(g.run("S.campaign.shadowBond.knight"), 3);
  assert.equal(g.run("S.level"), 1);
});

test("trois fragments quelconques sont requis pour D, un numéro isolé ne suffit pas", () => {
  const g = game();
  g.run(`S.campaign.completed=['fragment-3'];`);
  assert.equal(g.run(`CG.promotionReady(campagne(),5,'D',0)`), false);
  g.run(
    `S.campaign.completed=['fragment-2','fragment-5','fragment-8'];S.level=3;`,
  );
  assert.equal(g.run(`CG.promotionReady(campagne(),5,'D',0)`), true);
  assert.equal(g.run(`competenceDisponible('s1')`), true);
});
test("les erreurs de salles suivent la puissance active et non le niveau futur du cours", () => {
  const g = game();
  g.run(`DMAP['en-1'].d.req=30;demarrerDonjon('en-1');`);
  assert.equal(g.run("R.lvl"), 2);
});
test("une interruption suspend et reprend le chronomètre sans enlever de PV", () => {
  const g = game();
  g.run(
    `demarrerDonjon('en-1');R.roomIndex=R.rooms.length-1;const last=R.rooms[R.roomIndex];last.queue=last.ids.map(q=>({d:'en-1',q,mob:MOBS[0]}));preparerQuestion();const hp=R.hp;suspendreChronometre();`,
  );
  assert.equal(g.run("R.questionPaused"), true);
  assert.equal(g.run("QTIMER"), null);
  assert.equal(g.run("R.hp===hp"), true);
  g.run(`UI.screen='dungeon';reprendreChronometre();`);
  assert.equal(g.run("R.questionPaused"), false);
  assert.ok(g.run("QTIMER") > 0);
});
test("le codex ne génère pas des milliers de cases vides", () => {
  const g = game();
  g.run(
    `S.codex=Object.fromEntries(Array.from({length:120},(_,i)=>['b'+i,{name:'Chef '+i,chief:true,temper:'brute'}]));`,
  );
  assert.equal(
    (g.run("htmlCodexOmbres()").match(/<article/g) || []).length,
    24,
  );
});
test("rejouer un boss ne crée pas de source d’or illimitée", () => {
  const g = game();
  g.run(
    `S.dungeons['en-1']={cleared:true};for(let i=0;i<4;i++){demarrerBoss('en-1',{acc:1,maxCombo:0});B.bossHp=0;victoireBoss();}`,
  );
  assert.equal(g.run("UI.result.gold"), 0);
  assert.equal(g.run("S.gold"), 30);
});

test("le récit de fragment respecte une découverte précoce du cœur et l’ordre réel des gains", () => {
  const g = game();
  g.run(`S.campaign.completed=['fragment-8'];`);
  assert.match(
    g.run(
      `revelationFragment(CG.missions.find(m=>m.id==='fragment-8'),'Chef')[1]`,
    ),
    /1 fragment est/,
  );
  g.run(
    `S.campaign.completed=CG.missions.filter(m=>m.fragment).map(m=>m.id);S.campaign.keyFound=true;`,
  );
  assert.doesNotMatch(
    g.run(`revelationFragment(CG.missions[0],'Chef')[1]`),
    /vide|absent|indice/,
  );
});
test("les phases vides d’un chef respectent le choix éditorial", () => {
  const g = game(
    `window.GAME_CONTENT.subjects[0].dungeons[0].boss={name:'Chef',chief:true,temper:'gardien',stats:{hp:1000,attack:5},phases:[]};`,
  );
  g.run(
    `demarrerBoss('en-1',{acc:1,maxCombo:0});B.bossHp=200;attaqueJoueur('atk',{m:1,mp:0},'good');`,
  );
  assert.equal(g.run("B.temper"), "gardien");
});

test("un fragment non placé par le parent ne peut pas apparaître dans un combat automatique", () => {
  const g = game();
  g.run(`today=()=> '2027-06-10';`);
  assert.equal(g.run(`missionDisponible('fragment-1')`), false);
  assert.match(g.run("SCREENS.quests()"), /Aucun signal/);
  assert.match(g.run(`titreMission(CG.missions[0])`), /Localiser/);
  const placed = game(
    `window.GAME_CONTENT.subjects[0].dungeons[0].boss={name:'Chef choisi',chief:true,fragment:1};`,
  );
  assert.equal(placed.run(`missionDisponible('fragment-1')`), true);
});
