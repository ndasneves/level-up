"use strict";
const fs = require("node:fs"),
  vm = require("node:vm"),
  path = require("node:path");
const root = path.resolve(__dirname, "../..");
function game(configure = "") {
  let timers = new Map(),
    next = 1;
  const elements = {
    app: { innerHTML: "" },
    sys: { hidden: true, innerHTML: "" },
  };
  const storage = new Map();
  const ctx = vm.createContext({
    window: { GAME_CONTENT: { subjects: [] }, scrollTo() {} },
    console,
    Date,
    Math: Object.create(Math),
    performance: { now: () => 1000 },
    setTimeout: (f) => {
      timers.set(next, f);
      return next++;
    },
    clearTimeout: (i) => timers.delete(i),
    localStorage: {
      getItem: (k) => storage.get(k) || null,
      setItem: (k, v) => storage.set(k, v),
    },
    document: {
      querySelector: (sel) => elements[sel.slice(1)] || null,
      getElementById: (id) => elements[id] || null,
    },
    matchMedia: () => ({ matches: false }),
  });
  for (const f of [
    "js/content/anglais.js",
    "js/content/histoire.js",
    "js/content/physique-chimie.js",
    "js/content/fondamentaux.js",
    "js/campaign.js",
    "js/content-rules.js",
  ])
    vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx);
  if (configure) vm.runInContext(configure, ctx);
  vm.runInContext(
    fs
      .readFileSync(path.join(root, "js/game-engine.js"), "utf8")
      .split('document.addEventListener("click"')[0]
      .replace("const today =", "let today ="),
    ctx,
  );
  for (const f of [
    "js/game-art.js",
    "js/campaign-runtime.js",
    "js/key-design.js",
    "js/navigation.js",
    "js/relic-gameplay.js",
    "js/adventure.js",
    "js/combat-strategies.js",
    "js/chapter-challenges.js",
  ])
    vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx);
  vm.runInContext(
    `afficher=()=>{}; systeme=()=>{}; S=nouvelleSauvegarde('Test'); S.dungeons.fondamentaux={cleared:true,stars:3,best:1}; today=()=> '2026-10-03'; campagne();`,
    ctx,
  );
  return {
    run: (code) => vm.runInContext(code, ctx),
    elements,
    timers,
    flush() {
      const tasks = [...timers.values()];
      timers.clear();
      tasks.forEach((f) => f());
    },
  };
}

module.exports = { game };
