/* Service worker : rend l'application installable et utilisable hors ligne.
   Stratégie "réseau d'abord" : dès qu'il y a du réseau, le téléphone récupère
   la dernière version des fichiers du site (moteur et contenu), même si le
   réseau est lent ; le cache ne sert que si le réseau échoue vraiment
   (vraiment hors ligne). La progression (localStorage) n'est jamais touchée. */
const CACHE = "eveil-chasseur-v15";
const APP_ROOT = new URL("./", self.location.href);
const CORE = [
  "./sw.js",
  "./js/sw.js",
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/game-engine.js",
  "./js/boot.js",
  "./js/content-rules.js",
  "./js/campaign.js",
  "./js/campaign-runtime.js",
  "./js/game-art.js",
  "./js/key-design.js",
  "./css/key-design.css",
  "./css/interface.css",
  "./js/navigation.js",
  "./js/relic-gameplay.js",
  "./js/adventure.js",
  "./js/combat-strategies.js",
  "./js/chapter-challenges.js",
  "./images/physique-chimie/comburant.png",
  "./images/physique-chimie/corrosif.png",
  "./images/physique-chimie/environnement.png",
  "./images/physique-chimie/explosif.png",
  "./images/physique-chimie/inflammable.png",
  "./images/physique-chimie/irritant.png",
  "./images/physique-chimie/pression.png",
  "./images/physique-chimie/sante.png",
  "./images/physique-chimie/toxique.png",
  "./manifest.webmanifest",
  "./images/app/icon-192.png",
  "./images/app/icon-512.png",
  "./js/content/anglais.js",
  "./js/content/histoire.js",
  "./js/content/physique-chimie.js",
  "./js/content/fondamentaux.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(CORE.map((file) => new URL(file, APP_ROOT).href)))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("eveil-chasseur-") && k !== CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(req) {
  try {
    const cached = await caches.match(req, { ignoreSearch: true });
    const controller = new AbortController();
    const timeout = cached ? setTimeout(() => controller.abort(), 2500) : null;
    let res;
    try {
      res = await fetch(req, { cache: "no-store", signal: controller.signal });
    } finally {
      if (timeout) clearTimeout(timeout);
    }
    if (res && res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
    }
    if (res && res.ok) return res;
    return cached || res;
  } catch (err) {
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    throw err;
  }
}
function cacheFirst(req) {
  return caches.match(req).then(
    (hit) =>
      hit ||
      fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }),
  );
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Fichiers du site (moteur + n'importe quel fichier de contenu, même ajouté
  // après coup) : réseau d'abord, pour recevoir les mises à jour automatiquement.
  if (url.origin === location.origin) e.respondWith(networkFirst(req));
  else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname))
    e.respondWith(cacheFirst(req));
});
