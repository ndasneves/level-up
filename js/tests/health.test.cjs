"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { game } = require("./helpers.cjs");

test("les PV perdus pendant un donjon sont persistants", () => {
  const g = game();
  g.run("demarrerDonjon('en-1'); R.hp=87; enregistrerPV(R.hp)");
  assert.equal(g.run("pvActuels()"), 87);
  g.run("demarrerDonjon('en-2')");
  assert.equal(g.run("R.hp"), 87);
});

test("une défaite laisse le chasseur à zéro et empêche une revanche gratuite", () => {
  const g = game();
  g.run("demarrerBoss('en-1',{acc:1,maxCombo:0}); defaiteBoss()");
  assert.equal(g.run("pvActuels()"), 0);
  g.run("ACTIONS.retry()");
  assert.equal(g.run("pvActuels()"), 0);
  assert.match(g.run("SCREENS.result()"), /disabled/);
});

test("une potion hors combat rétablit les PV et consomme un objet", () => {
  const g = game();
  g.run("enregistrerPV(0); S.inv.potHp=1; ACTIONS.healout()");
  assert.equal(g.run("pvActuels()"), 50);
  assert.equal(g.run("S.inv.potHp"), 0);
});

test("la sauvegarde conserve les PV, les anciennes sauvegardes démarrent pleines", () => {
  const g = game();
  assert.equal(
    g.run("migrerSauvegarde({...nouvelleSauvegarde('A'), hp:37}).hp"),
    37,
  );
  assert.equal(
    g.run("migrerSauvegarde((({hp, ...s}) => s)(nouvelleSauvegarde('A'))).hp"),
    130,
  );
});

test("terminer un entraînement soigne de 35 PV au maximum", () => {
  const g = game();
  g.run(
    "enregistrerPV(40); demarrerEntrainement(); R.rooms[0].queue=[]; questionSuivante()",
  );
  assert.equal(g.run("pvActuels()"), 75);
  assert.equal(g.run("UI.result.healed"), 35);
});
