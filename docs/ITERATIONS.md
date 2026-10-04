# Les quatre passes de révision

## Passe 1 — contenu et maintenance

Le moteur, le démarrage et les styles ont été sortis de la page HTML. Les fichiers sont formatés, et les fonctionnalités récentes sont séparées en modules lisibles chargés dans un ordre explicite. Le site reste statique : aucun serveur applicatif, compilateur, compte ou dépendance JavaScript externe n’est requis par le joueur.

Les fichiers de cours définissent désormais le rôle du Veilleur, son nom, son fragment éventuel, sa date minimale, son tempérament, ses PV, son attaque et ses changements de phase. Chaque fragment possède un numéro stable, indépendant du nombre de matières et de notions. Un chef sans fragment ne donne pas de morceau de Clé. Un numéro non encore placé attend sa localisation et ne peut pas être gagné dans un combat automatique. Un mode de démonstration facultatif conserve les anciens combats narratifs.

Le guide `CONTENU.md` montre le format complet. La commande `node js/tools/check-content.cjs` vérifie les identifiants, les fragments dupliqués, les images, les scripts et le cache avant publication.

## Passe 2 — interface et navigation

Les panneaux, boutons, icônes de navigation, typographies et états utilisent une présentation commune. Bleu pour le Système, violet pour les pouvoirs, or pour les acquisitions, rouge pour les dangers. Les personnages et monstres sont dessinés en SVG local.

La carte montre six matières au maximum par page. Chaque matière peut comporter autant de régions de cinq notions que nécessaire. La sélection de région reste une carte d’îlots et de portails ; la recherche et la vue Portails permettent de retrouver directement une notion. La génération a été testée avec 40 matières et 120 notions par matière. Les collections ne produisent plus des milliers de cases vides sur le Statut.

Un objectif suggéré conduit à l’expédition sauvegardée, à la mission disponible ou à un cours encore à explorer. Le boss ou chef est présenté sur la leçon ; les chefs portent une couronne et une identité distincte. Le combat utilise six boutons principaux dans un ordre stable, et ses compétences verrouillées annoncent leurs conditions.

## Passe 3 — aventure et rejouabilité

La Clé se remplit visuellement : aucun fragment n’ouvre de fiche. Huit morceaux peuvent être attribués aux chefs de cours. Le cœur, neuvième et dernier morceau, est caché sur un petit sceau de la Fenêtre de statut ; on peut le découvrir avant les autres. Après huit fragments, une quête d’indice apparaît si nécessaire. Son affichage est temporaire mais son message reste archivé ; aucun compte à rebours ne pénalise les absences. Le récit s’adapte au cœur déjà trouvé et à l’ordre réel des fragments.

Les artefacts sont consommables. L’or achète un usage ; les statistiques et les connaissances uniques ouvrent leur accès sans être dépensées. Seuils fixes, cinq artefacts, deux usages maximum par combat, restrictions conservées en reprenant une salle. Les potions n’exigent que l’or. Les gains répétés d’un même boss sont bornés, tandis que la première réussite, les révisions espacées, les contrats et les médailles restent utiles.

L’ombre équipée développe un lien cosmétique sur trois portails différents par jour. Ses titres encouragent les aventures variées sans ajouter de puissance. Pas de série de connexions ni de perte de rang pour une absence.

## Passe 4 — corrections et validation

La promotion D exige trois fragments quelconques, et non le fragment numéro trois seul. L’Entaille s’ouvre après un premier fragment quelconque. La difficulté des salles de cours suit le niveau actif ; les caractéristiques explicitement configurées des chefs sont respectées. Les chronomètres se suspendent lors d’un changement d’écran ou d’une interruption du téléphone. La dilatation ajoute dix secondes restantes à la question actuelle et ne prolonge pas les suivantes.

Le cache hors ligne respecte le sous-dossier GitHub Pages, ne supprime pas les caches des autres applications et sert les fichiers sauvegardés après une erreur réseau ou HTTP. La version initiale prépare tous les modules et styles du jeu.

Validation effectuée :

- 42 tests de régression automatisés réussis.
- 3 matières, 18 notions et 183 questions vérifiées avec leurs ressources.
- Navigation tactile simulée dans Chromium, captures à 414×896 et absence de débordement contrôlée aussi à 375×812.
- Parcours de la carte à la leçon, aux questions puis au boss, affichage d’un chef configuré, boutique d’artefacts et découverte du cœur.
- Rechargement hors ligne depuis un sous-dossier de site, avec conservation de la sauvegarde.
- Simulation déterministe de combats : sur vingt essais par chef, la stratégie défensive gagne 20, 7, 11, 11 et 10 combats, respectivement pour le premier chef, le huitième, le Système Noir, le quatrième Écho et le souverain. Les gestes imprécis sans défense perdent les vingt essais de chaque cas. Ce sont des indicateurs du modèle, pas des probabilités de victoire pour l’enfant.

Les captures `mobile-*.png` sont des captures réelles de Chromium avec les polices de repli. Elles ne constituent pas un test Safari ni un essai sur iPhone physique. Les illustrations anciennes du dossier previews sont des rendus SVG. Un essai sur XR/11 reste nécessaire pour valider les sensations tactiles, les interruptions iOS et la difficulté ressentie.

La campagne est réglée pour septembre 2026 à juin 2027. Les dates sont des ouvertures « à partir de » ; chaque chapitre exige aussi l’objectif précédent. Une absence de six mois ne fait donc pas sauter la récupération du Grimoire ou la purification du Système. Le rang S demande le dernier combat et une épreuve de promotion, sans dépendre d’un nombre futur de cours.

## Améliorations du gameplay après les quatre itérations

Ajout de deux modules : `js/combat-strategies.js` pour les tactiques et l’Élite, `js/chapter-challenges.js` pour la maîtrise et le compagnon. Le parent peut choisir `boss.mechanic` ou garder le combat classique. Le cours conserve sa localisation de fragment et les statistiques explicites.

Les chefs annoncent une stratégie exploitable avant chaque choix. Les versions Élite restent adaptées aux personnages avancés et conservent leur difficulté en revanche. Les trois paliers facultatifs de chaque chapitre font progresser un titre visible, avec des crédits journaliers bornés et sans bonus de puissance. Les objectifs passés restent accessibles sans expiration. La redistribution restitue exactement les points, avec confirmation et coût limité. Les Ombres ont des paroles adaptées aux révisions, victoires et défaites.

Une vérification visuelle supplémentaire a conduit à replier la sauvegarde et les pouvoirs dans Statut et à corriger la largeur des lignes d’Ombres. Les panneaux gardent leur état pendant les mises à jour de l’écran. Le compteur du carnet utilise désormais les mêmes fragments que la Clé graphique.

Validation : 55 tests automatisés réussis, contrôle du contenu et des assets hors ligne, parcours tactile Chromium à 414×896 et 375×812. Le navigateur vérifie également l’ouverture du panneau de pouvoirs, la redistribution confirmée, la réception d’un titre, sa présence dans le bandeau et le rechargement sans réseau. Captures complémentaires : `mobile-chief.png`, `mobile-mastery.png`, `mobile-powers.png`.

La simulation indicative, après prise en compte des tactiques, donne 15/20, 8/20, 17/20, 19/20 et 18/20 victoires avec stratégie sur les cinq chefs, contre 0/20 avec gestes imprécis sans défense. Ces chiffres servent au réglage du modèle, pas à prédire les résultats de l’enfant. L’essai réel sur Safari iPhone et l’ajustement à ses premières parties restent à faire.

## Rangement des fichiers

`index.html` reste à la racine. Les scripts du jeu sont dans `js/`, les cours dans `js/content/`, les tests dans `js/tests/` et les outils dans `js/tools/`. Les trois feuilles de style sont dans `css/`. Les icônes vont dans `images/app/`, les neuf pictogrammes dans `images/physique-chimie/` et les aperçus dans `images/apercus/`.

La seule entrée JavaScript à la racine est `sw.js`, un chargeur d’une instruction vers `js/sw.js`. Elle permet au service worker de contrôler `index.html` sur GitHub Pages. Le manifeste garde sa page de lancement et son périmètre à la racine ; la clé de sauvegarde locale reste identique.

Suppression de six copies anciennes de cours, neuf copies identiques de pictogrammes, quatre guides `_lisez-moi` et du fichier vide `download`. Les anciens cours ont été comparés aux trois fichiers actifs : même contenu pédagogique, mêmes identifiants. Les consignes de contenu encore utiles sont réunies dans CONTENU.md.

Le cache v15 contient les nouveaux chemins et précharge les pictogrammes. La commande de validation vérifie également leurs chemins et ceux des icônes. Validation : 58 tests réussis, contenu inchangé (3 matières, 18 notions, 183 questions), parcours mobile et rechargement hors ligne à la racine d’un sous-dossier GitHub Pages. Une image de cours jamais affichée avant la coupure réseau est récupérée hors ligne. Les tests contrôlent aussi l’absence d’images identiques et la résolution des URLs du cache.
