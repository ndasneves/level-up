# Configurer les cours, les chefs et les fragments

L’application reste composée de fichiers statiques. Aucun serveur, compte ou compilation n’est nécessaire. Ajouter une matière en chargeant son fichier dans `index.html` et `js/sw.js`. Les cartes se calculent à partir des tableaux, sans nombre de matières ou de notions fixé à l’avance.

Chaque donjon garde un identifiant unique et stable. Ne pas renommer les identifiants de questions existantes : ils portent la maîtrise du joueur.

```js
boss: {
  name: "Le Collecteur de Brume",
  chief: true,                  // Faux ou absent : boss ordinaire
  fragment: 1,                  // 1 à 8, seulement pour un chef
  availableFrom: "2026-09-15", // Optionnel ; date minimale, pas une échéance
  mechanic: "collector",      // collector, sentinel, messenger, none
  temper: "gardien",            // brute, gardien, insaisissable, vampirique
  stats: { level: 3, hp: 480, attack: 14 },
  phases: [
    { below: 0.65, temper: "insaisissable" },
    { below: 0.30, temper: "brute" }
  ]
}
```

Les caractéristiques omises sont calculées d’après le niveau actif et le rôle. Les valeurs explicites permettent de régler un combat ; vérifier qu’il reste gagnable avec le personnage prévu. `phases: []` désactive les changements de tempérament. Sans ce champ, les chefs changent de tactique à 65 % puis 30 % de vie.

Un chef n’est pas automatiquement porteur de fragment. Attribuer chaque numéro une seule fois. Une victoire répétée ne redonne jamais le fragment. Les huit numéros correspondent aux huit segments de la Clé et aux lettres MEMOIRES. Le dernier morceau, le cœur, est caché dans l’application et n’est jamais attribué à un cours.

Le mode par défaut est `CONFIG.fragmentSource: "courses"`. Tant qu’un numéro n’est pas attribué à un cours, le Système attend sa localisation : aucun combat de remplacement ne donne le fragment. Dès qu’il est attribué, la quête conduit au cours concerné. Pour retrouver volontairement les huit anciens combats narratifs de démonstration, régler `fragmentSource: "campaign"` ; les cours configurés gardent la priorité. Les cours peuvent être étudiés avant l’apparition du chef, mais le combat de fragment respecte sa date minimale. Les chapitres continuent à demander les objectifs précédents : une absence ne saute pas l’histoire.

Les noms, statistiques et localisations viennent des fichiers de cours ; aucune attribution aléatoire. Les identifiants des fragments restent fixes même si de nouvelles matières sont ajoutées.

Les cours actuels ne reçoivent pas de fragments automatiquement. Renseigner `boss.chief` et `boss.fragment` aux emplacements choisis, au fur et à mesure de l’année. Les fragments déjà acquis dans une ancienne sauvegarde restent acquis.

## Tactiques des chefs

`boss.mechanic` choisit une tactique indépendamment du nom, du tempérament et des phases :

- `collector` : charge toutes les trois actions. Le chef enferme huit PM au début d’une charge, jusqu’à 24 PM cumulés. Protection, esquive réussie ou Entaille parfaite qui interrompt libèrent le mana. Protection reste utilisable avant le déblocage des compétences.
- `sentinel` : bouclier fermé pendant deux actions, ouvert pendant la troisième. Fermé, il ne reçoit qu’un quart des dégâts. Brise-Sceau traverse le bouclier pour une frappe. Les charges ordinaires restent annoncées.
- `messenger` : charge toutes les trois actions, alternance pointe/balayage. Pointe : protection −30 %, esquive réussie évite le coup. Balayage : protection −60 %, esquive réussie amortit de 45 %. Une Entaille parfaite interrompt les deux.
- `none` : conserve le combat classique, même pour un chef.

Sans champ explicite, un chef gardien devient Sentinelle, un chef vampirique devient Collecteur, les autres deviennent Messagers. Les boss ordinaires gardent le combat classique. La tactique est fixée au début du combat ; les phases changent le tempérament, pas cette identité. Donner un nom cohérent avec la tactique choisie.

Les statistiques explicites du parent continuent à s’appliquer au combat normal. En Élite, elles servent de minimum : la difficulté peut augmenter suivant la puissance du personnage. Vérifier les chefs avec les compétences disponibles au moment de leur rencontre ; une Sentinelle très résistante peut être trop difficile avant Entaille.

## Où placer les fichiers

- Cours : `js/content/anglais.js`, `js/content/histoire.js`, `js/content/physique-chimie.js`, `js/content/fondamentaux.js`.
- Images du jeu : `images/app/`.
- Images des cours : `images/<matière>/` ; actuellement les neuf pictogrammes sont dans `images/physique-chimie/`.
- Captures et aperçus techniques : `images/apercus/`, sans les mélanger aux ressources utilisées par le joueur.

Les chemins sont toujours relatifs au `index.html` de la racine, indépendamment du dossier du fichier JS. Exemple :

```js
{ id: "q10", img: "images/physique-chimie/inflammable.png",
  q: "Quel est ce pictogramme ?", c: ["Inflammable", "Corrosif"] }

{ id: "q20", q: "Quel pictogramme signifie toxique ?",
  c: [{ src: "images/physique-chimie/toxique.png", alt: "Tête de mort", label: "A" },
      { src: "images/physique-chimie/corrosif.png", alt: "Corrosion", label: "B" }] }
```

Ajouter les nouvelles images dans `CORE` de `js/sw.js` avec leur chemin `./images/...` pour qu’elles soient disponibles dès la première ouverture hors ligne, même si la question n’a jamais été affichée. Pour une nouvelle matière, ajouter son script dans `index.html` (`js/content/svt.js` par exemple) et dans le même cache. Lancer `npm run check:content` avant publication.

Conserver les identifiants existants des matières, donjons et questions. Les anciennes copies et les guides `_lisez-moi` ont été supprimés ; le présent document rassemble les consignes encore utiles.
