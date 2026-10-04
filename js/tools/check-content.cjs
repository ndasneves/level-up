/* Validate the actual static entry point before uploading to GitHub Pages. */
"use strict";
const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm");
const root = path.resolve(__dirname, "../..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
const styles = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(
  (m) => m[1],
);
const errors = [];
const mediaFiles = new Set();
for (const file of [...scripts, ...styles])
  if (!fs.existsSync(path.join(root, file)))
    errors.push("Fichier absent : " + file);
const context = vm.createContext({
  window: { GAME_CONTENT: { subjects: [] } },
});
for (const file of scripts.filter(
  (f) => f.startsWith("js/content/") || f === "js/content-rules.js",
))
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, {
    filename: file,
  });
const subjects = context.window.GAME_CONTENT.subjects;
const seenSubjects = new Set(),
  seenDungeons = new Set();
let questions = 0,
  dungeons = 0;
for (const subject of subjects) {
  if (seenSubjects.has(subject.id))
    errors.push("Matière en double : " + subject.id);
  seenSubjects.add(subject.id);
  for (const dungeon of subject.dungeons) {
    dungeons++;
    if (seenDungeons.has(dungeon.id))
      errors.push("Donjon en double : " + dungeon.id);
    seenDungeons.add(dungeon.id);
    const ids = new Set();
    for (const q of dungeon.questions) {
      questions++;
      if (ids.has(q.id))
        errors.push("Question en double : " + dungeon.id + ":" + q.id);
      ids.add(q.id);
      if (!q.q || !q.id || !(q.c?.length >= 2 || q.t?.length || q.def))
        errors.push("Question invalide : " + dungeon.id + ":" + q.id);
      const media = [q.img, ...(q.c || [])];
      for (const asset of media) {
        const file =
          typeof asset === "string" && asset === q.img ? asset : asset?.src;
        if (file && !/^https?:/.test(file)) mediaFiles.add(file);
        if (
          file &&
          !/^https?:/.test(file) &&
          !fs.existsSync(path.join(root, file))
        )
          errors.push("Image absente : " + file);
      }
    }
    const configured = dungeon.boss || {};
    if (
      configured.fragment !== undefined &&
      (!configured.chief ||
        !Number.isInteger(configured.fragment) ||
        configured.fragment < 1 ||
        configured.fragment > 8)
    )
      errors.push("Fragment invalide : " + dungeon.id);
    if (
      configured.temper &&
      !context.window.ContentRules.TEMPERAMENTS.includes(configured.temper)
    )
      errors.push("Tempérament invalide : " + dungeon.id);
    if (
      configured.mechanic &&
      !context.window.ContentRules.MECHANICS.includes(configured.mechanic)
    )
      errors.push("Mécanique invalide : " + dungeon.id);
    dungeon.boss = context.window.ContentRules.boss(configured);
  }
}
errors.push(...context.window.ContentRules.audit(subjects).errors);
const sw = fs.readFileSync(path.join(root, "js/sw.js"), "utf8");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"),
);
for (const icon of manifest.icons) {
  mediaFiles.add(icon.src);
  if (!fs.existsSync(path.join(root, icon.src)))
    errors.push("Icône absente : " + icon.src);
}
for (const file of [
  ...scripts,
  ...styles,
  ...mediaFiles,
  "index.html",
  "sw.js",
  "js/sw.js",
])
  if (!sw.includes('"./' + file + '"'))
    errors.push("Fichier absent du cache initial : " + file);
if (
  !/^importScripts\("\.\/js\/sw\.js"\);$/m.test(
    fs.readFileSync(path.join(root, "sw.js"), "utf8"),
  )
)
  errors.push("Le chargeur racine doit pointer sur js/sw.js.");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `${subjects.length} matières, ${dungeons} notions et ${questions} questions valides. Scripts, styles, images et cache initial vérifiés.`,
  );
