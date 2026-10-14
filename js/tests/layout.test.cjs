"use strict";
const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path"),
  crypto = require("node:crypto");
const root = path.resolve(__dirname, "../..");
function files(dir = root) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const file = path.join(dir, entry.name);
    return entry.isDirectory()
      ? files(file)
      : [path.relative(root, file).split(path.sep).join("/")];
  });
}
test("la page reste à la racine, les scripts et images ont un emplacement unique", () => {
  const list = files();
  assert.ok(list.includes("index.html"));
  assert.ok(!list.includes("js/index.html"));
  assert.ok(
    list
      .filter((f) => /\.(js|cjs)$/.test(f))
      .every((f) => f.startsWith("js/") || f === "sw.js"),
  );
  assert.ok(
    list
      .filter((f) => /\.(png|jpg|jpeg|svg|webp)$/i.test(f))
      .every((f) => f.startsWith("images/")),
  );
  assert.ok(
    !list.some((f) => f.includes("_lisez-moi") || f.startsWith("content/")),
  );
  const hashes = new Map();
  for (const file of list.filter(
    (f) => f.startsWith("images/") && /\.(png|jpg|jpeg|svg|webp)$/i.test(f),
  )) {
    const hash = crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.join(root, file)))
      .digest("hex");
    assert.ok(
      !hashes.has(hash),
      `Images identiques : ${file} et ${hashes.get(hash)}`,
    );
    hashes.set(hash, file);
  }
});
test("le service worker est unique, à la racine, et le manifest couvre tout le site", () => {
  assert.ok(!fs.existsSync(path.join(root, "js/sw.js")));
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"),
  );
  assert.equal(manifest.start_url, "./");
  assert.equal(manifest.scope, "./");
});
