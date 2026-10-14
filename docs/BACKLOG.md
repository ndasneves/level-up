# Backlog

Flux : Boîte à idées → À faire → En cours → À tester → Terminés.

- **Boîte à idées :** idées non décidées, une ligne, sans engagement.
- **À faire :** décidé. Un objectif d'une phrase ; « à préciser » si les règles restent à écrire.
- **À tester :** implémenté, en attente de ta validation à l'écran.

## Boîte à idées

- **Retirer les boss de campagne** (missions d'histoire, promotions de rang). Beaucoup de dépendances : quêtes, scénario, rangs, ombres, fragments de la Clé.
- **Défis du boss et version Élite.** Médailles (sans potion, deux esquives parfaites, interrompre une charge) ouvrant une version plus dure du boss. Retiré car trop tôt.
- **Mode « cours » avant le donjon**, si le besoin de relire la leçon revient.
- **Skill de création de questions.** Guider l'ajout d'une notion (texte, photos éventuelles) : questions au bon format, écriture dans `js/content/*.js`, validation par `check:content`. Relecture humaine obligatoire ; photos sans donnée personnelle.

## À faire

- **Ajouter une marge entre le header et l'écran « Évanoui ».** Le bloc (`.win.center-win.result`) colle au header, alors que les autres écrans ont un espacement. À vérifier si les autres écrans de résultat (victoire, défaite contre le boss, entraînement) ont le même défaut. Fin : même espacement que le reste du jeu.
- **Supprimer la pastille jaune du menu Stats.** Cause : elle s'affiche quand `S.points > 0`, c'est-à-dire des points de caractéristique non répartis (le joueur du test en avait après être passé niveau 2). Décider : la retirer complètement, ou la garder pour signaler ces points. Fin : plus de pastille sur Stats, la pastille de Quête (coffre quotidien) reste.
- **Refaire les questions d'anglais.** Ordre de progression :
  1. Fondamentaux : chiffres, nombres, jours de la semaine, mois de l'année, saisons, lire l'heure.
  2. Vocabulaire de l'école : stylo, gomme, cahier, agrafeuse, cartable.
  3. Le verbe « be » (probablement au programme).
- **Reprendre le cours d'histoire** : le Paléolithique et le Néolithique.
- **Nettoyer le code mort du cours.** Supprimer `SCREENS.lesson` en tant que cours et les champs `lesson` de `js/content/*.js`, ou les réutiliser. Fin : plus de référence au texte de cours, `npm test` et `check:content` passent.
- **Évolution de l'XP** (à préciser). La salle chronométrée réduit déjà l'XP avec le temps ; la courbe et le rythme par rang sont à trancher.
- **Prix des potions** (à préciser). L'or ne vient plus que des boss : vérifier que l'économie tient (potions, coffre quotidien de 40 or).

## En cours

_Rien pour l'instant._

## À tester

- **Compacter les barres de PV et d'XP du header.** Implémenté : XP et PV côte à côte sur une seule ligne, sans le texte « avant le niveau X ». À vérifier : lisibilité sur mobile, palier d'XP atteint.

## Terminés

- Page boss à la place du cours avant le donjon (nom du donjon, infos, image en silhouette, dernière victoire).
- Or gagné uniquement sur les boss.
- XP dégressive dans la salle chronométrée, avec avertissement avant d'entrer.
- Récapitulatif de salle : « Ta réponse » et « Bonne réponse » sur chaque ligne.
- Suppression des défis du boss et de la version Élite.
