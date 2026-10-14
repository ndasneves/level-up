"use strict";
const test=require("node:test"), assert=require("node:assert/strict");
const {game}=require("./helpers.cjs");
test("les régions sont explicites et les sauvegardes ne changent pas d'identifiant",()=>{
 const g=game();
 assert.equal(g.run("groupesMatiere(SUBJECTS.find(s=>s.id==='en')).length"),2);
 assert.equal(g.run("regionDuDonjon(SUBJECTS.find(s=>s.id==='en'),DMAP['en-9'].d).id"),"en-r2");
 assert.equal(g.run("DMAP['en-1'].d.regionId"),"en-r1");
 assert.equal(g.run("DMAP['pc-8'].d.regionId"),"pc-r1");
});
test("une région seule reste sélectionnable et la progression est issue de la sauvegarde",()=>{
 const g=game();
 g.run("UI.arch='pc';UI.group=null;");
 assert.match(g.run("SCREENS.map()"),/class="region-entry"/);
 g.run("UI.arch='en';S.dungeons['en-1']={cleared:true};");
 const html=g.run("SCREENS.map()");
 assert.match(html,/1 \/ 6/);
 assert.match(html,/data-idx="1"/);
});
test("les nouvelles notions étendent le chemin d'une région sans limite de cinq",()=>{
 const g=game();
 g.run(`SUBJECTS[0].dungeons.push({...SUBJECTS[0].dungeons[0],id:'en-extra',name:'Nouvelle notion',regionId:'en-r1'});`);
 assert.equal(g.run("groupesMatiere(SUBJECTS[0])[0].length"),7);
 assert.match(g.run("carteArchipel(SUBJECTS[0],groupesMatiere(SUBJECTS[0])[0])"),/data-id="en-extra"/);
});
