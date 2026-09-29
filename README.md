# L'Éveil du Chasseur

Application web installable (PWA) pour réviser les cours de 6e sous forme de jeu.

## Fichiers

| Fichier | Rôle | À modifier ? |
|---|---|---|
| `index.html` | Moteur du jeu (écrans, combats au tour par tour, boutique, salles, sauvegarde) | Non, sauf évolution du jeu lui-même, ou ajout d'une **toute nouvelle matière** |
| `content/en.js`, `content/hi.js`, `content/pc.js`, … | **Un fichier par matière** : ses donjons, fiches, questions | **Oui, un seul à la fois, celui de la matière concernée** |
| `content/_lisez-moi.js` | Le guide complet du format de contenu | Non (juste à lire) |
| `sw.js` | Mode hors ligne et mises à jour automatiques du contenu | Non |
| `manifest.webmanifest`, `icon-*.png` | Installation sur l'écran d'accueil | Non |
| `.nojekyll` | Désactive un traitement automatique de GitHub Pages | Non (fichier vide) |

**Pourquoi un fichier par matière plutôt qu'un seul gros fichier ?** Avec une seule matière ou
deux, un fichier unique reste simple. Mais il grossit à chaque chapitre ajouté, dans toutes les
matières mélangées — au bout de quelques mois, il devient long à relire et plus risqué à modifier
(plus facile de perdre un id ou une virgule au milieu de centaines de lignes). En séparant par
matière : ajouter un chapitre de physique-chimie ne touche qu'à `content/pc.js`, un fichier de
quelques dizaines de lignes qui reste lisible d'un coup d'œil, sans jamais risquer de perturber
l'anglais ou l'histoire à côté.

La progression de l'enfant est stockée **dans le navigateur du téléphone** (localStorage),
jamais dans ces fichiers. Modifier un fichier de contenu — ou même `index.html` pour une
amélioration du jeu — ne touche donc jamais à la progression, tant que l'adresse du site ne
change pas.

## 1. Mise en ligne (une fois), gratuite

### Option A — Netlify (recommandée, la plus simple)
1. Aller sur netlify.com, créer un compte gratuit.
2. *Add new site → Deploy manually*, puis glisser-déposer le dossier contenant les 6 fichiers.
3. Netlify donne une adresse du type `https://eveil-chasseur-xyz.netlify.app`. On peut la renommer
   dans *Site settings → Change site name*.
4. Pour mettre à jour : revenir sur cette page et glisser-déposer le dossier à nouveau (garder le même site,
   ne pas en recréer un autre : l'adresse ne doit jamais changer).

### Option B — GitHub Pages
1. Créer un dépôt **public** sur GitHub, y déposer tous les fichiers **y compris `.nojekyll`**
   (fichier vide, invisible dans certains explorateurs de fichiers — pense à activer l'affichage
   des fichiers cachés, ou utilise "Add file → Upload files" sur github.com qui l'affichera).
2. *Settings → Pages* : Source = *Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. L'adresse est `https://<pseudo>.github.io/<depot>/`.
4. Pour mettre à jour : remplacer le(s) fichier(s) dans le dépôt (bouton crayon, ou *Upload files*).

> `.nojekyll` désactive le traitement automatique (Jekyll) que GitHub Pages applique par défaut,
> qui ignore sinon silencieusement certains fichiers (ceux commençant par `_`, comme
> `content/_lisez-moi.js`). Sans danger pour le jeu, mais autant l'éviter proprement.

> Dans les deux cas : **toujours la même adresse**. La sauvegarde du navigateur y est attachée.
> Avec GitHub Pages gratuit, le dépôt est public (visible de tous) : sans souci ici, il ne contient
> que le jeu et des cours, jamais de données personnelles.

## 2. Installation sur le téléphone de l'enfant

- **iPhone (Safari)** : ouvrir l'adresse → *Partager* → *Sur l'écran d'accueil*.
- **Android (Chrome)** : ouvrir l'adresse → menu ⋮ → *Installer l'application*.

Toujours lancer le jeu depuis l'icône installée : c'est elle qui doit rester à la même adresse.

## 3. Comment les mises à jour arrivent sur le téléphone

Le fichier `sw.js` (service worker) vérifie le réseau à chaque ouverture de l'app :
- **S'il y a du réseau** : il récupère `content.js` en ligne, l'affiche, et le garde en cache pour
  la prochaine fois hors connexion.
- **Sans réseau** : il utilise la dernière version qu'il a en mémoire.

Concrètement : dès que le nouveau contenu est en ligne (Netlify ou GitHub), il suffit que
l'enfant ouvre l'app avec du réseau (Wi-Fi ou données) pour voir apparaître, selon le cas,
« De nouvelles îles sont apparues » (une matière entière vient d'être ajoutée) ou « De nouveaux
donjons sont apparus » (un chapitre de plus dans une matière déjà connue) — sans jamais avoir à
réinstaller l'app, ni perdre sa progression, qui reste stockée séparément dans le navigateur.

**Seul `content.js` doit être remplacé pour ajouter une matière ou un chapitre.**
`index.html` ne change que si le jeu lui-même évolue (un nouveau type de combat, par exemple).

## 4. Ajouter un chapitre ou une matière (avec Claude)

Le fonctionnement le plus simple, sans outil supplémentaire :

1. Envoyer à Claude le cours (photo, notes, PDF) — en précisant si besoin des niveaux de
   difficulté (comme "0 à 20", "20 à 100"...) pour que le donjon ait plusieurs salles progressives.
2. Claude propose la fiche de cours et les questions, **directement lisibles dans la conversation** :
   on peut demander des corrections, en proposer d'autres, changer le ton, ajouter une question, etc.,
   aussi longtemps que nécessaire, avant de valider.
3. Une fois d'accord :
   - **Nouveau chapitre dans une matière existante** → Claude fournit uniquement le fichier de cette
     matière à jour (ex. `content/pc.js`). Rien d'autre à toucher, rien à mettre à jour à la main :
     le jeu détecte tout seul que le contenu a changé (voir encadré ci-dessous).
   - **Toute nouvelle matière** → Claude fournit le nouveau fichier (ex. `content/svt.js`) et la ligne
     à ajouter dans `index.html` (une seule ligne, juste après les matières existantes).
4. **Avant de mettre en ligne**, on peut tester en local sans rien publier : mettre les fichiers
   reçus au même endroit dans le dossier sur l'ordinateur, et ouvrir `index.html` dans un navigateur.
   Le jeu tourne à l'identique, avec le nouveau contenu, sans toucher au site en ligne.
5. Une fois satisfait, ne remplacer sur Netlify ou GitHub (voir §1) que le ou les fichiers reçus —
   pas besoin de retélécharger tout le dossier à chaque fois.

Cette validation par la conversation évite d'avoir à construire un outil d'administration séparé,
qui demanderait un vrai compte de base de données pour rester accessible depuis plusieurs appareils
— complexité inutile pour un usage familial.

### Règles pour ne jamais perdre la progression

- Ne jamais renommer ni supprimer un `id` existant (matière, donjon ou question).
- Nouveaux donjons : **à la fin** de la liste de leur matière.
- Un donjon ou une question mal formée est ignorée par le jeu plutôt que de le bloquer.
- Pour des paliers de difficulté (plusieurs salles avant le boss), ajouter un champ `tier` à chaque
  question et un `tierLabels` au donjon — voir les instructions écrites en tête de `content.js`.

## 5. Sauvegarde de secours

Écran **Statut → Sauvegarde** :
- *Copier le code* / *Envoyer le code* / *Télécharger un fichier* : exporte toute la progression.
- *Restaurer* : réimporte cette progression, sur le même téléphone ou un autre.

À faire avant tout changement d'adresse de site, de téléphone, ou de réinitialisation.

## Données

Aucune donnée n'est envoyée à un serveur : seuls un pseudo et la progression sont stockés
localement sur le téléphone. Le dépôt/site en ligne ne contient que le code du jeu et les cours.
