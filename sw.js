/* Service worker : rend l'application installable et utilisable hors ligne.
   Stratégie "réseau d'abord" : dès qu'il y a du réseau, le téléphone récupère
   la dernière version des fichiers du site (moteur et contenu), même si le
   réseau est lent ; le cache ne sert que si le réseau échoue vraiment
   (vraiment hors ligne). La progression (localStorage) n'est jamais touchée. */
const CACHE = "eveil-chasseur-v5";
const CORE = [
  "./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png",
  "./content/en.js", "./content/hi.js", "./content/pc.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function networkFirst(req){
  try {
    const res = await fetch(req, {cache: "no-store"});
    if (res && res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  } catch (err){
    const hit = await caches.match(req, {ignoreSearch: true});
    if (hit) return hit;
    throw err;
  }
}
function cacheFirst(req){
  return caches.match(req).then(hit => hit || fetch(req).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
  }));
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Fichiers du site (moteur + n'importe quel fichier de contenu, même ajouté
  // après coup) : réseau d'abord, pour recevoir les mises à jour automatiquement.
  if (url.origin === location.origin) e.respondWith(networkFirst(req));
  else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) e.respondWith(cacheFirst(req));
});
