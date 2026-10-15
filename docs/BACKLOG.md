# Backlog

Flux : Boîte à idées → À faire → En cours → À tester → Terminés.

- **Boîte à idées :** idées non décidées, une ligne, sans engagement.
- **À faire :** décidé. Un objectif d'une phrase ; « à préciser » si les règles restent à écrire.
- **À tester :** implémenté, en attente de ta validation à l'écran.

## Boîte à idées

- **Retirer les boss de campagne** (missions d'histoire, promotions de rang). Beaucoup de dépendances : quêtes, scénario, rangs, ombres, fragments de la Clé.
- **Défis du boss et version Élite.** Médailles (sans potion, deux esquives parfaites, interrompre une charge) ouvrant une version plus dure du boss. Retiré car trop tôt.
- **Mode « cours » avant le donjon**, si le besoin de relire la leçon revient.

## À faire

- **Créer le fichier `CLAUDE.md`** à la racine. Résumer les conventions du projet pour ne pas les redécouvrir à chaque session : réponses en français, commandes `npm test` et `check:content`, `docs/SCENARIO.md` généré depuis `js/campaign.js`, structure `js/content/*.js`, pas de données personnelles. Fin : fichier créé et relu.
- **Refondre la Clé : 7 fragments et mot MEMOIRE.** Décidé :
  - 6 chefs portent un fragment, lettres mélangées R, M, E, I, E, M (de 2026-09-01 à 2026-11-15, dates actuelles). Les 2 derniers boss (Le Gardien Déchu, Le Messager de la Nuit) sont supprimés.
  - Le 7ᵉ fragment (O) n'a pas de boss : il est caché dans le jeu et le joueur le récupère en cliquant dessus, dès qu'il le trouve, même avant les chefs. Aujourd'hui le cœur est sur le sceau de la Fenêtre de statut. Si le 6ᵉ fragment est obtenu sans le 7ᵉ, un indice apparaît dans le journal.
  - Une fois les 7 fragments réunis, le joueur remet les lettres dans l'ordre : le mot **MEMOIRE** (singulier, remplace MEMOIRES) active la Clé. L'activation fait apparaître le « Sanctuaire oublié » sur la carte principale.
  - Placement des fragments sur les cours (aujourd'hui aucun chef n'en porte dans `js/content/*.js`). Les fragments se gagnent dans l'ordre 1, 2, 3… (mission suivante seulement) ; chaque chef reçoit `fragment: n`, avec `availableFrom` pour la date d'ouverture du cours :
    - Fragment 1 : **Histoire**, Paléolithique et Néolithique, quand le cours est refait.
    - Fragment 2 : **Espagnol**, quand le cours est fait (matière à créer).
    - Objectif : 2 fragments disponibles pendant les vacances de la Toussaint (17/10 au 02/11/2026).
    - Fragment 3 : **Anglais**, verbe « be », quand il arrivera.
    - **À faire : placer les fragments 4, 5 et 6** sur des cours (choix des cours à faire, un chef par fragment). Les dates actuelles de `js/campaign.js` (01/09 à 15/11) sont déjà passées ou à revoir selon la sortie des cours.
  - Sanctuaire oublié : ouverture le **2026-12-13** (une semaine avant les vacances du 19/12) au lieu du 15/12 ; les noyaux suivent à la même date. À vérifier : 4 semaines sans nouveau boss entre le 15/11 et le 13/12.
  - À faire :
    - `js/campaign.js` : 6 chefs, lettres, message du dernier fragment, date du Sanctuaire et des noyaux.
    - `js/content-rules.js` et `js/tools/check-content.cjs` : fragments de chefs 1 à 6.
    - `js/adventure.js` : seuil 6 fragments de chefs + cœur, mot `memoire`, messages « huit / neuf ».
    - `js/campaign-runtime.js` : quête principale « 7 fragments », condition du Sanctuaire (Clé activée par le mot, pas seulement cœur trouvé), écran secret « Six chefs, six lettres ».
    - Codex de la Clé : régénérer le SVG (`svgCleComplete` dans `js/game-art.js`, 6 pièces + cœur), `js/key-design.js` : 7 runes dont le cœur (O), compteur « x / 7 », barre de progression.
    - Tests (`game.test.cjs`, `balance.cjs`), `README.md`, `docs/REGLES.md`, `docs/SCENARIO.md` (régénéré).
- **Ajouter une marge entre le header et l'écran « Évanoui ».** Le bloc (`.win.center-win.result`) colle au header, alors que les autres écrans ont un espacement. À vérifier si les autres écrans de résultat (victoire, défaite contre le boss, entraînement) ont le même défaut. Fin : même espacement que le reste du jeu.
- **Reprendre le cours d'histoire** : le Paléolithique et le Néolithique.
- **Créer le skill de création de questions** (déplacé de la boîte à idées). Guider l'ajout d'une notion (texte, photos éventuelles) : questions au bon format, écriture dans `js/content/*.js`, validation par `check:content`. Relecture humaine obligatoire ; photos sans donnée personnelle. À faire après le `CLAUDE.md`.
- **Refaire les questions d'anglais.** Ordre de progression :
  1. Fondamentaux : chiffres, nombres, jours de la semaine, mois de l'année, saisons, lire l'heure.
  2. Vocabulaire de l'école : stylo, gomme, cahier, agrafeuse, cartable.
  3. Le verbe « be » (probablement au programme).
- **Boss du Sanctuaire : Gardien sans Mémoire.** Questions tirées dans tout ce que le joueur a vu depuis le début (base : `poolRevision`). Sanctuaire protégé contre la magie : compétences, mana et invocation d'ombres désactivés ; potions autorisées mais en nombre limité (limite à préciser). Avant le combat, le Système paraît un peu trop insistant (indice discret). À la victoire, sa mémoire revient, il reconnaît la Clé ; le message « le savoir ne peut être révélé à un esprit corrompu » vise le Système, pas le joueur (prépare les noyaux).
- **Couleur du Système corrompu.** Après le retournement du Sanctuaire, les fenêtres de messages du Système passent du bleu (`--sys` / `--sys-soft` dans `css/styles.css`) au **vert toxique** (décidé : `#b6ff3d`, version claire `#e0ffa6`, fond légèrement verdâtre ; rouge et violet sont déjà pris par l'erreur et la montée de niveau), jusqu'à la victoire sur le Système Noir (2027-01-15), où le bleu revient (« Intégrité restaurée »). À préciser : seulement les fenêtres de messages, ou toute l'interface (bordures, barres, boutons, qui utilisent aussi `--sys`).
- **Nettoyer le code mort du cours.** Supprimer `SCREENS.lesson` en tant que cours et les champs `lesson` de `js/content/*.js`, ou les réutiliser. Fin : plus de référence au texte de cours, `npm test` et `check:content` passent.
- **Évolution de l'XP** (à préciser). La salle chronométrée réduit déjà l'XP avec le temps ; la courbe et le rythme par rang sont à trancher.
- **Prix des potions** (à préciser). L'or ne vient plus que des boss : vérifier que l'économie tient (potions, coffre quotidien de 40 or).

## En cours

_Rien pour l'instant._

## À tester

- **Compacter les barres de PV et d'XP du header.** Implémenté : XP et PV côte à côte sur une seule ligne, sans le texte « avant le niveau X ». À vérifier : lisibilité sur mobile, palier d'XP atteint.
- **Supprimer la pastille jaune du menu Stats.** Implémenté : la pastille ne s'affiche plus pour les points de caractéristique non répartis ; celle de Quête (coffre quotidien) reste. À vérifier à l'écran après un passage de niveau.

## Terminés

- Page boss à la place du cours avant le donjon (nom du donjon, infos, image en silhouette, dernière victoire).
- Or gagné uniquement sur les boss.
- XP dégressive dans la salle chronométrée, avec avertissement avant d'entrer.
- Récapitulatif de salle : « Ta réponse » et « Bonne réponse » sur chaque ligne.
- Suppression des défis du boss et de la version Élite.
