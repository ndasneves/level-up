/* ===== Démarrage ===== */
S = chargerLocal();
if (!SUBJECTS.length) {
  document.getElementById("app").innerHTML =
    '<div class="win center-win" style="margin-top:20vh"><div class="win-head">Système</div><h2>Portails introuvables</h2><p>Le contenu des cours est absent ou mal écrit dans ce fichier.</p><p class="hint">Ta progression n’est pas touchée.</p></div>';
} else {
  if (S) {
    assurerQuotidienne();
    UI.screen = "map";
  }
  afficher();
  if (S) {
    verifierNouveauContenu();
    sauvegarder();
  }
}
/* Prévient d'une mise à jour de l'app — entièrement automatique, rien à
   changer à la main à chaque déploiement. On surveille index.html ET tous
   les fichiers de contenu (déduits directement des balises <script src=...>
   de la page, donc un futur fichier de matière est suivi sans rien changer
   ici) : pour chacun, on compare l'ETag (ou, à défaut, la date de dernière
   modification) renvoyée par le serveur à la dernière valeur vue sur cet
   appareil. Le message apparaît si NE SERAIT-CE QU'UN SEUL de ces fichiers
   a changé — un nouveau donjon ajouté dans un fichier de matière déclenche
   donc le message tout autant qu'une modification du moteur. Ne s'affiche
   jamais au tout premier lancement, et reste silencieux hors ligne ou si le
   serveur ne fournit aucune de ces deux informations pour aucun fichier. */
if (typeof fetch === "function") {
  const watchedFiles = [
    "index.html",
    ...[
      ...document.querySelectorAll("script[src],link[rel=stylesheet][href]"),
    ].map((s) => s.getAttribute("src") || s.getAttribute("href")),
  ];
  Promise.all(
    watchedFiles.map((f) =>
      fetch(f, { method: "HEAD", cache: "no-store" })
        .then(
          (res) =>
            res.headers.get("etag") || res.headers.get("last-modified") || "",
        )
        .catch(() => ""),
    ),
  ).then((tags) => {
    if (!tags.some(Boolean)) return; // aucune info exploitable pour aucun fichier
    const combined = tags.join("|");
    const VKEY = "eveil-chasseur-version";
    const last = localStorage.getItem(VKEY);
    if (last && last !== combined) {
      systeme(
        "Mise à jour installée",
        "<p>Une nouvelle version du Système vient d’être téléchargée.</p>",
        null,
        "info",
      );
    }
    localStorage.setItem(VKEY, combined);
  });
}
if (navigator.storage && navigator.storage.persist)
  navigator.storage.persist().catch(() => {});
if (S && S.total.correct >= 10 && Date.now() - (S.lastBackup || 0) > 7 * 864e5)
  systeme(
    "Pense à ta sauvegarde",
    "<p>Ça fait un moment que tu n’as pas mis ta progression à l’abri.</p><p>Va dans <strong>Stats</strong>, puis <strong>Sauvegarde</strong>.</p>",
  );
if ("serviceWorker" in navigator && location.protocol.startsWith("http"))
  navigator.serviceWorker
    .register("sw.js", { updateViaCache: "none" })
    .catch(() => {});
