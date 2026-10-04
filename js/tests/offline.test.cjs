"use strict";
const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  path = require("node:path");
const source = fs.readFileSync(path.join(__dirname, "../sw.js"), "utf8");
function worker(fetcher, hit) {
  const handlers = {},
    deleted = [],
    added = [];
  const cache = {
    put: async () => {},
    addAll: async (files) => added.push(...files),
  };
  const ctx = vm.createContext({
    self: {
      location: { href: "https://example.test/level-up/sw.js" },
      addEventListener: (k, v) => (handlers[k] = v),
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
    },
    caches: {
      match: async () => hit,
      open: async () => cache,
      keys: async () => [
        "other-app-cache",
        "eveil-chasseur-v9",
        source.match(/const CACHE = "([^"]+)"/)[1],
      ],
      delete: async (k) => deleted.push(k),
    },
    fetch: fetcher,
    location: { origin: "https://example.test" },
    URL,
    AbortController,
    setTimeout,
    clearTimeout,
  });
  vm.runInContext(source, ctx);
  return {
    run: (code) => vm.runInContext(code, ctx),
    handlers,
    deleted,
    added,
  };
}
test("le cache sert le contenu après erreur réseau et après HTTP 500", async () => {
  const hit = { cached: true };
  let w = worker(async () => {
    throw new Error("offline");
  }, hit);
  assert.equal(
    await w.run(
      `networkFirst({url:'https://example.test/level-up/index.html'})`,
    ),
    hit,
  );
  w = worker(async () => ({ ok: false, status: 500 }), hit);
  assert.equal(
    await w.run(
      `networkFirst({url:'https://example.test/level-up/index.html'})`,
    ),
    hit,
  );
});
test("l’activation ne supprime jamais les caches d’autres applications du même domaine", async () => {
  const w = worker(async () => {}, null);
  let pending;
  w.handlers.activate({ waitUntil: (p) => (pending = p) });
  await pending;
  assert.deepEqual(w.deleted, ["eveil-chasseur-v9"]);
});

test("le chargeur racine garde les URLs du cache dans le projet GitHub Pages", async () => {
  const w = worker(async () => {}, null);
  let pending;
  w.handlers.install({ waitUntil: (p) => (pending = p) });
  await pending;
  assert.ok(w.added.includes("https://example.test/level-up/index.html"));
  assert.ok(
    w.added.includes(
      "https://example.test/level-up/js/content/physique-chimie.js",
    ),
  );
  assert.ok(
    w.added.includes(
      "https://example.test/level-up/images/physique-chimie/toxique.png",
    ),
  );
  assert.ok(
    w.added.every((url) => url.startsWith("https://example.test/level-up/")),
  );
  assert.ok(!w.added.some((url) => url.includes("/js/js/")));
});
