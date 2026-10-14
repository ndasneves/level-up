# Régions et donjons

Chaque matière possède `regions: [{id,name,subtitle}]`. Chaque donjon possède `regionId` avec l’identifiant de sa région.
Les questions et le boss appartiennent automatiquement à la région du donjon ; ne pas ajouter de `regionId` sur les questions.
Les régions apparaissent dans l’ordre du tableau `regions`, les donjons dans l’ordre du tableau `dungeons`.
Pour ajouter un cours : ajouter un nouveau donjon avec un ID **nouveau**, et un `regionId` correspondant à une région existante. Pour ajouter une région : ajouter une entrée dans `regions` et affecter le `regionId` voulu aux nouveaux cours.
Les IDs de donjons et de questions existants sont conservés pour les sauvegardes.
La carte de région et le chemin chronologique se dimensionnent d’après le nombre de donjons. Les vignettes SVG proviennent de la fonction `svgIle` déjà présente dans le jeu et sont stables par identifiant de région.
Les valeurs de couleurs appartiennent à chaque matière. Anglais : `#F5BBA9`.
