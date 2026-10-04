# L’Éveil du Chasseur — campagne scolaire 2026–2027

PWA HTML/JavaScript pour réviser les cours de 6e avec des donjons, des combats au tour par tour et une histoire sur l’année. Pas de compte, de serveur applicatif ni de clé d’API.

## Installation et mise à jour

Servir le dossier complet sur la même adresse que le jeu actuel (GitHub Pages, ou votre hébergement habituel). Sur iPhone : ouvrir dans Safari, Partager → Sur l’écran d’accueil. La sauvegarde reste dans le navigateur : exporter une copie depuis Statut avant une mise à jour importante.

Publier le dossier complet, y compris tous les scripts et feuilles de style, **avec** `index.html`, `sw.js` et tous les sous-dossiers. Le service worker les prépare pour le mode hors ligne. La première ouverture après publication doit se faire avec du réseau.

Pour tester localement :

```bash
python3 -m http.server 8765
```

Ouvrir http://localhost:8765 dans un navigateur. Les tests logiques n’exigent aucun navigateur :

```bash
npm test
npm run check:content
npm run check:balance
```

## Organisation

| Fichier                                                     | Rôle                                                             |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| `index.html`                                                | Point d’entrée et ordre explicite de chargement                  |
| `js/game-engine.js`                                         | Moteur, écrans de base, questionnaires, sauvegardes              |
| `css/styles.css`, `css/interface.css`, `css/key-design.css` | Styles communs, interface mobile et Clé                          |
| `js/boot.js`                                                | Démarrage, mises à jour et installation                          |
| `js/content-rules.js`                                       | Schéma des chefs, caractéristiques et fragments                  |
| `js/navigation.js`                                          | Archipels paginés, recherche, liste des portails                 |
| `js/relic-gameplay.js`                                      | Artefacts consommables, seuils et chronomètres                   |
| `js/adventure.js`                                           | Fragment caché, indice, lien d’ombre et rejouabilité             |
| `js/combat-strategies.js`                                   | Tactiques annoncées des chefs et adaptation Élite                |
| `js/chapter-challenges.js`                                  | Défis par chapitre, titres, redistribution et paroles des Ombres |
| `js/campaign.js`                                            | Configuration, dates, missions, messages, rangs et récompenses   |
| `js/campaign-runtime.js`                                    | Contrats, maîtrise, sauvegardes, promotions et combat            |
| `js/game-art.js`                                            | Illustrations SVG locales, carte des régions et Clé progressive  |
| `js/content/*.js`                                           | Cours et questions, un fichier actif par matière                 |
| `sw.js`                                                     | Petit chargeur du service worker, nécessaire à la racine         |
| `js/sw.js`                                                  | Cache et fonctionnement hors ligne                               |
| `js/tools/`                                                 | Vérification du contenu                                          |
| `images/app/`                                               | Icônes de l’application                                          |
| `images/physique-chimie/`                                   | Images du cours de physique-chimie                               |
| `images/apercus/`                                           | Captures et illustrations de vérification                        |
| `docs/REGLES.md`                                            | Réglages, économie et fonctionnement détaillé                    |
| `docs/SCENARIO.md`                                          | Tous les futurs messages et jalons de l’histoire                 |
| `js/tests/`                                                 | Régressions et simulation indicative de combat                   |

Les anciennes copies `en.js`, `hi.js`, `pc.js`, les neuf images en double et les guides `_lisez-moi` ont été supprimés après comparaison du contenu. Modifier les fichiers actifs `js/content/anglais.js`, `js/content/histoire.js`, `js/content/physique-chimie.js`.

`index.html` reste à la racine. Tous les scripts du jeu, cours, tests et outils sont dans `js/`, les styles dans `css/` et les images dans `images/`. Seul `sw.js` reste à la racine : il contient un `importScripts("./js/sw.js")`. Sur GitHub Pages, cette entrée permet au service worker de contrôler la page d’accueil sans réglage d’en-têtes serveur. La logique complète du cache reste dans `js/sw.js`.

## Ajouter des leçons sans connaître leur nombre final

Ajouter les nouveaux donjons à la fin du fichier de matière. Conserver tous les identifiants existants : la maîtrise et la sauvegarde utilisent `donjon:question`. Pour corriger une question sans changer son identité, conserver son identifiant. Pour remplacer une notion par une autre, créer un nouvel identifiant.

Pour une nouvelle matière, ajouter son fichier dans les balises `<script>` de `index.html` et dans `CORE` de `js/sw.js` afin qu’elle soit immédiatement disponible hors ligne. Incrémenter la version du cache lors d’une modification de cette liste.

Les chemins d’images dans les cours sont relatifs à `index.html` : par exemple `images/physique-chimie/inflammable.png`. Pour de futures illustrations d’anglais ou d’histoire, créer `images/anglais/` ou `images/histoire/` au moment d’ajouter les fichiers, puis les inclure dans le cache de `js/sw.js`. Aucun dossier vide artificiel n’est nécessaire.

Les cours sont accessibles après les Fondamentaux, sans dépendre du niveau du Chasseur. Les missions narratives et les promotions sélectionnent des questions connues parmi les cours déjà rencontrés. Les huit fragments sont fixes et indépendants du nombre de leçons.

## Progression

L’XP augmente le niveau ; les épreuves accordent les rangs. Chaque chapitre limite la puissance. Au palier maximal, les récompenses deviennent de l’essence pour les variantes, les ombres et les apparences. Les anciennes sauvegardes conservent leur niveau, leurs équipements et leur ancien rang ; leur puissance active suit les nouveaux plafonds.

Le calendrier prévu commence en septembre 2026 et finit en juin 2027. Modifier `CONFIG.chapters[].from` et `missions[].from` dans `js/campaign.js` pour adapter les ouvertures. Les dates ne font jamais gagner un rang et ne pénalisent jamais une absence. Les chapitres doivent aussi être terminés dans l’ordre.

Les fragments se configurent dans les fichiers de cours : voir [CONTENU.md](docs/CONTENU.md). Un chef sans fragment ne donne pas de morceau de Clé. En mode normal, les numéros non placés attendent leur localisation ; les cours actuels ne reçoivent aucune attribution automatique.

Les messages peuvent être relus dans Quête. Une expédition peut être reprise au début de sa salle, depuis Quête. Les répétitions de cette salle ne redonnent pas les bonus déjà consommés.

## Validation

Les tests couvrent les plafonds d’XP, les contrats, les migrations, les premières réponses des promotions, la reprise, les fragments, les ombres, les écrans et les callbacks de combat. La simulation compare une stratégie défensive et des gestes imprécis sur cinq chefs. Les régressions supplémentaires couvrent les tactiques, la revanche Élite, les crédits journaliers, les titres et la conservation des points lors d’une redistribution.

Les fichiers `mobile-*.png` dans `images/apercus/` sont des captures de l’application dans Chromium à 414×896, avec les polices de repli et une navigation tactile simulée. Les autres aperçus sont des rendus d’illustrations SVG. Un contrôle visuel dans Safari sur iPhone reste à effectuer. Les tests logiques et le navigateur de bureau ne remplacent pas ce contrôle sur appareil. L’équilibrage devra ensuite être ajusté à partir des premières parties de l’enfant.

Le Codex de la Clé affiche directement une clé qui se colore fragment après fragment, huit runes et un compteur. Les fragments ne sont pas cliquables et n’ouvrent aucune fiche. Le cœur s’illumine après sa découverte. Présentation dans `js/key-design.js` et `css/key-design.css`.

Le test facultatif `js/tests/browser-smoke.cjs` vérifie les écrans, les événements tactiles, le parcours complet d’un donjon et le rechargement hors ligne depuis un sous-dossier comme GitHub Pages. Il nécessite Playwright et un navigateur local ; aucune de ces dépendances n’est chargée par le jeu. Le développement dispose d’un formatage Prettier, uniquement en dépendance de développement.
