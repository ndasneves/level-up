# Level Up — campagne scolaire 2026–2027

PWA HTML/JavaScript pour réviser les cours de 6e : le joueur est un Chasseur qui traverse des donjons, livre des combats au tour par tour et suit une histoire sur toute l’année. Pas de compte, de serveur applicatif ni de clé d’API.

## Installation et mise à jour

Servir le dossier complet sur la même adresse que le jeu actuel (GitHub Pages, ou votre hébergement habituel). Sur iPhone : ouvrir dans Safari, Partager → Sur l’écran d’accueil. La sauvegarde reste dans le navigateur : exporter une copie depuis Statut avant une mise à jour importante.

Publier le dossier complet, y compris tous les scripts et feuilles de style, **avec** `index.html`, `sw.js` et tous les sous-dossiers. Le service worker les prépare pour le mode hors ligne. La première ouverture après publication doit se faire avec du réseau.

Pour tester localement :

```bash
python -m http.server 8765
```

Ouvrir http://localhost:8765 dans un navigateur. Les tests logiques n’exigent aucun navigateur :

```bash
npm test
npm run check:content
npm run check:balance
```

## Organisation

| Fichier                                                                           | Rôle                                                                          |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `index.html`                                                                      | Point d’entrée et ordre explicite de chargement                               |
| `js/game-engine.js`                                                               | Moteur, écrans de base, questionnaires, sauvegardes                           |
| `js/boot.js`                                                                      | Démarrage, mises à jour et installation                                       |
| `js/content-rules.js`                                                             | Schéma des chefs, caractéristiques et fragments                               |
| `js/campaign.js`                                                                  | Configuration, dates, missions, messages, rangs et récompenses                |
| `js/campaign-runtime.js`                                                          | Contrats, maîtrise, sauvegardes, promotions et combat                         |
| `js/navigation.js`                                                                | Archipels (verrouillage, pagination), recherche, liste des portails           |
| `js/map-design.js`                                                                | Carte des régions et des îlots                                                |
| `js/game-art.js`                                                                  | Illustrations SVG locales et Clé progressive                                  |
| `js/key-design.js`                                                                | Codex de la Clé                                                               |
| `js/relic-gameplay.js`                                                            | Artefacts consommables, seuils et chronomètres                                |
| `js/adventure.js`                                                                 | Fragment caché, indice, lien d’ombre et rejouabilité                          |
| `js/combat-strategies.js`                                                         | Tactiques annoncées des chefs                                          |
| `js/chapter-challenges.js`                                                        | Défis par chapitre, titres, redistribution, paroles des Ombres                |
| `js/content/*.js`                                                                 | Cours et questions, un fichier actif par matière                              |
| `css/styles.css`, `css/interface.css`, `css/map-design.css`, `css/key-design.css` | Styles communs, interface mobile, carte et Clé                                |
| `sw.js`                                                                           | Service worker : cache et fonctionnement hors ligne (doit rester à la racine) |
| `js/tools/`                                                                       | Vérification du contenu                                                       |
| `js/tests/`                                                                       | Régressions, test navigateur et simulation indicative de combat               |
| `images/app/`                                                                     | Icônes de l’application                                                       |
| `images/physique-chimie/`                                                         | Images du cours de physique-chimie                                            |
| `docs/`                                                                           | Documentation (voir ci-dessous)                                               |

Documentation :

- [REGLES.md](docs/REGLES.md) : réglages, économie et fonctionnement détaillé ;
- [CONTENU.md](docs/CONTENU.md) : format des cours, des chefs et des fragments ;
- [SCENARIO.md](docs/SCENARIO.md) : tous les messages et jalons de l’histoire ;
- [REGIONS.md](docs/REGIONS.md) et [PV_ET_COMBATS.md](docs/PV_ET_COMBATS.md) : régions, points de vie et combats ;
- [ITERATIONS.md](docs/ITERATIONS.md) : historique des passes de révision.

`index.html` reste à la racine. Tous les scripts du jeu, cours, tests et outils sont dans `js/`, les styles dans `css/` et les images dans `images/`. Seul `sw.js` reste à la racine : un service worker ne contrôle que les pages situées dans son propre dossier, il doit donc être à côté de `index.html` pour couvrir toute l’application sur GitHub Pages.

Les fichiers de cours actifs sont `js/content/anglais.js`, `js/content/histoire.js`, `js/content/physique-chimie.js` et `js/content/fondamentaux.js`.

## Interrupteurs de développement

- `ARCHIPELS_OUVERTS` (`js/navigation.js`) : matières accessibles sur la carte. Les autres s’affichent verrouillées (« Bientôt disponible »). Actuellement ouverts : anglais (`en`), histoire-géographie (`hi`) et physique-chimie (`pc`).
- `STATS_EN_CALCUL` (`js/chapter-challenges.js`) : à `true`, l’écran Statut est remplacé par un écran d’attente « Calcul en cours » ; à `false`, l’écran complet (statistiques, équipement, défis, sceau de la Clé) est rétabli. Tant qu’il est à `true`, le sceau caché n’est pas accessible depuis Statut.

## Ajouter des leçons sans connaître leur nombre final

Ajouter les nouveaux donjons à la fin du fichier de matière. Conserver tous les identifiants existants : la maîtrise et la sauvegarde utilisent `donjon:question`. Pour corriger une question sans changer son identité, conserver son identifiant. Pour remplacer une notion par une autre, créer un nouvel identifiant.

Pour une nouvelle matière, ajouter son fichier dans les balises `<script>` de `index.html` et dans `CORE` de `sw.js` afin qu’elle soit immédiatement disponible hors ligne. Incrémenter la version du cache lors d’une modification de cette liste. Penser aussi à l’ajouter dans `ARCHIPELS_OUVERTS` pour qu’elle soit déverrouillée.

Les chemins d’images dans les cours sont relatifs à `index.html` : par exemple `images/physique-chimie/inflammable.png`. Pour de futures illustrations d’anglais ou d’histoire, créer `images/anglais/` ou `images/histoire/` au moment d’ajouter les fichiers, puis les inclure dans le cache de `sw.js`. Aucun dossier vide artificiel n’est nécessaire.

Les cours sont accessibles après les Fondamentaux, sans dépendre du niveau du Chasseur. Les missions narratives et les promotions sélectionnent des questions connues parmi les cours déjà rencontrés. Les huit fragments sont fixes et indépendants du nombre de leçons.

## Progression

L’XP augmente le niveau ; les épreuves accordent les rangs. Chaque chapitre limite la puissance. Au palier maximal, les récompenses deviennent de l’essence pour les variantes, les ombres et les apparences. Les anciennes sauvegardes conservent leur niveau, leurs équipements et leur ancien rang ; leur puissance active suit les nouveaux plafonds.

Le calendrier prévu commence en septembre 2026 et finit en juin 2027. Modifier `CONFIG.chapters[].from` et `missions[].from` dans `js/campaign.js` pour adapter les ouvertures. Les dates ne font jamais gagner un rang et ne pénalisent jamais une absence. Les chapitres doivent aussi être terminés dans l’ordre.

Les fragments se configurent dans les fichiers de cours : voir [CONTENU.md](docs/CONTENU.md). Un chef sans fragment ne donne pas de morceau de Clé. En mode normal, les numéros non placés attendent leur localisation ; les cours actuels ne reçoivent aucune attribution automatique.

Le Codex de la Clé affiche directement une clé qui se colore fragment après fragment, huit runes et un compteur. Les fragments ne sont pas cliquables et n’ouvrent aucune fiche. Le cœur, neuvième morceau, est caché sur un petit sceau de la Fenêtre de statut et s’illumine après sa découverte. Présentation dans `js/key-design.js` et `css/key-design.css`.

Les messages peuvent être relus dans Quête. Une expédition peut être reprise au début de sa salle, depuis Quête. Les répétitions de cette salle ne redonnent pas les bonus déjà consommés.

## Validation

Les tests (`npm test`) couvrent les plafonds d’XP, les contrats, les migrations, les premières réponses des promotions, la reprise, les fragments, les ombres, les régions, les archipels, les écrans et les callbacks de combat. La simulation (`npm run check:balance`) compare une stratégie défensive et des gestes imprécis sur cinq chefs. `npm run check:content` vérifie les identifiants, les fragments, les images, les scripts et la liste du cache.

Le test facultatif `js/tests/browser-smoke.cjs` pilote un vrai navigateur en mobile (414×896 et 375×812) : écrans, événements tactiles, parcours d’un donjon jusqu’au boss, chef configuré, artefacts, cœur caché, absence de débordement horizontal et rechargement hors ligne depuis un sous-dossier comme GitHub Pages. Il nécessite Playwright (`npm install playwright`, non déclaré dans le projet) ; indiquer un navigateur local avec `LEVEL_UP_CHROME` (Chrome ou Edge) et, si besoin, l’emplacement de Playwright avec `LEVEL_UP_PLAYWRIGHT`. Aucune de ces dépendances n’est chargée par le jeu. Les captures d’écran sont écrites dans le dossier temporaire du système, pas dans le dépôt.

Un contrôle visuel dans Safari sur iPhone reste à effectuer : les tests logiques et le navigateur de bureau ne le remplacent pas. L’équilibrage devra ensuite être ajusté à partir des premières parties de l’enfant.

Le formatage Prettier (`npm run format`) est la seule dépendance de développement du projet.

## Identifiants techniques

Les clés de stockage portent le nom du jeu : sauvegarde `level-up-v1` (`js/game-engine.js`), version vue `level-up-version` (`js/boot.js`) et caches `level-up-vNN` (`sw.js`). Changer la clé de sauvegarde efface les parties existantes (le joueur recommence) : à ne faire que volontairement. L’activation du service worker supprime aussi les anciens caches `eveil-chasseur-*`.
