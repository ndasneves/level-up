/* Optional browser check. npm install playwright; set LEVEL_UP_CHROME if needed. */
"use strict";
const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.LEVEL_UP_PLAYWRIGHT || "playwright");
const root = path.resolve(__dirname, "../..");
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json",
};
(async () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    const relative =
      url.pathname.replace(/^\/level-up\//, "/").replace(/^\//, "") ||
      "index.html";
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (error, data) => {
      res.writeHead(error ? 404 : 200, {
        "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      });
      res.end(error ? "Not found" : data);
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}/level-up/`;
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.LEVEL_UP_CHROME || undefined,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 414, height: 896 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    const errors = [],
      page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    await page.route("https://fonts.**", (route) => route.abort());
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => typeof S !== "undefined");
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-intro.png"),
    });
    await page.evaluate(() => {
      S = nouvelleSauvegarde("Chasseur");
      S.dungeons.fondamentaux = { cleared: true, stars: 3, best: 1 };
      S.fondQuestClaimed = true;
      S.level = 3;
      S.gold = 200;
      S.points = 6;
      S.campaign.completed = ["fragment-1"];
      sauvegarder();
    });
    for (const screen of ["map", "status", "shop", "training", "quests"]) {
      await page.evaluate((s) => {
        allerA(s);
      }, screen);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        screen + " déborde horizontalement",
      );
      await page.screenshot({
        path: path.join(root, "images/apercus/mobile-" + screen + ".png"),
      });
    }
    await page.evaluate(() => {
      UI.arch = "en";
      UI.group = null;
      allerA("map");
    });
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-regions.png"),
    });
    await page.locator('[data-act="group"]').first().tap();
    await page.locator('[data-act="gate"]').first().tap();
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-lesson.png"),
    });
    await page.locator('[data-act="enter"]').tap();
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-question.png"),
    });
    // Test the rendered event handlers, not only the underlying functions.
    for (let step = 0; step < 80; step++) {
      const screen = await page.evaluate(() => UI.screen);
      if (screen === "bossgate") break;
      if (await page.locator("#sys:not([hidden])").count()) {
        await page.evaluate(() => {
          sysQ.length = 0;
          document.querySelector("#sys").hidden = true;
        });
      }
      if (await page.locator('[data-act="stagecontinue"]').count()) {
        await page.locator('[data-act="stagecontinue"]').tap();
        continue;
      }
      if (await page.locator('[data-act="next"]').count()) {
        await page.locator('[data-act="next"]').tap();
        continue;
      }
      const answer = await page.evaluate(() => ({
        index: R.cur.order?.indexOf(0),
        text: R.cur.q.t?.[0] || R.cur.q.def,
      }));
      if (answer.index !== undefined)
        await page.locator(`[data-act="ans"][data-i="${answer.index}"]`).tap();
      else {
        await page.locator("#ansIn").fill(answer.text);
        await page.locator('[data-act="submit"]').tap();
      }
    }
    assert.equal(await page.evaluate(() => UI.screen), "bossgate");
    await page.locator('[data-act="fightboss"]').tap();
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-boss.png"),
    });
    await page.locator('[data-bact="atk"]').tap();
    assert.ok(await page.evaluate(() => !!B.timing));
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
    // Inspect a configured chief and the artifact storefront in the real DOM.
    await page.evaluate(() => {
      annulerCombat();
      DMAP["en-1"].d.boss = window.ContentRules.boss({
        name: "Le Collecteur de Brume",
        chief: true,
        temper: "gardien",
        mechanic: "collector",
        stats: { hp: 480, attack: 14 },
        phases: [],
      });
      demarrerBoss("en-1", { acc: 1, maxCombo: 0 });
    });
    assert.match(
      await page.locator(".bname").innerText(),
      /Chef des Veilleurs Noirs/,
    );
    assert.equal(await page.evaluate(() => B.bossMax), 480);
    assert.match(await page.locator(".intent").innerText(), /Collecteur/);
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-chief.png"),
    });
    await page.evaluate(() => {
      annulerCombat();
      B = null;
      R = null;
      UI.shopTab = "artefacts";
      allerA("shop");
    });
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-artifacts.png"),
    });
    await page.setViewportSize({ width: 375, height: 812 });
    for (const screen of ["map", "status", "shop", "training", "quests"]) {
      await page.evaluate((s) => allerA(s), screen);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        "375px : " + screen,
      );
    }
    await page.setViewportSize({ width: 414, height: 896 });
    await page.evaluate(() => {
      allerA("status");
    });
    await page.locator('[data-act="memoryseal"]').tap();
    assert.equal(await page.evaluate(() => S.campaign.keyFound), true);
    await page.evaluate(() => {
      sysQ.length = 0;
      document.querySelector("#sys").hidden = true;
    });
    // New gameplay actions also travel through the real click handlers.
    await page.evaluate(() => {
      S.stats.str = 11;
      S.points = 0;
      allerA("status");
    });
    await page.locator('details[data-panel="powerPanel"] summary').tap();
    await page.waitForFunction(() => UI.powerPanel === true);
    assert.ok(
      await page
        .locator(".power-row")
        .first()
        .evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    );
    await page.locator(".power-row").first().scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-powers.png"),
    });
    await page.locator('details[data-panel="powerPanel"] summary').tap();
    await page.locator('[data-act="respec"]').tap();
    await page.locator('[data-act="respecconfirm"]').tap();
    assert.equal(await page.evaluate(() => S.points), 6);
    assert.equal(await page.evaluate(() => S.stats.str), 5);
    await page.evaluate(() => {
      Object.assign(defisChapitre(), { reviews: 30, wins: 5, prepared: 2 });
      afficher();
    });
    await page.locator('[data-act="claimchallenge"]').tap();
    assert.equal(await page.evaluate(() => defisChapitre().claimed.length), 1);
    await page.evaluate(() => {
      sysQ.length = 0;
      document.querySelector("#sys").hidden = true;
      S.campaign.shadows = ["knight"];
      S.campaign.shadow = "knight";
      paroleOmbre("win");
      allerA("status");
      sauvegarder();
    });
    assert.match(await page.locator(".hunter-title").innerText(), /Éclaireur/);
    await page.screenshot({
      path: path.join(root, "images/apercus/mobile-mastery.png"),
      fullPage: true,
    });
    // Cache readiness is tested from a project subdirectory, then with no network.
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await context.setOffline(true);
    const unseenImage = await page.evaluate(async () => {
      const response = await fetch("images/physique-chimie/toxique.png");
      return response.ok && (await response.arrayBuffer()).byteLength > 0;
    });
    assert.ok(
      unseenImage,
      "une image de cours jamais affichée doit être disponible hors ligne",
    );
    await page.reload({ waitUntil: "domcontentloaded" });
    assert.match(await page.locator("main").innerText(), /Mer des Portails/);
    assert.equal(await page.evaluate(() => S.name), "Chasseur");
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(
      "Mobile 414×896 et 375×812 : écrans, navigation tactile, donjon → boss, chef configuré, artefacts, cœur caché, absence de débordement et rechargement hors ligne vérifiés.",
    );
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
