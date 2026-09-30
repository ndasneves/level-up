/* =====================================================================
   GUIDE DU CONTENU — L'Éveil du Chasseur
   Ce dossier "content/" contient UNIQUEMENT les cours. Le moteur du jeu
   est dans index.html et n'a normalement pas besoin d'être modifié.

   UN FICHIER PAR MATIÈRE
   Aucun numéro de version à gérer à la main : le jeu calcule tout seul une
   empreinte du contenu chargé (visible dans Statut), qui change dès qu'une
   question, une fiche ou un donjon est modifié. Rien à oublier de ce côté.
   - content/anglais.js         → Anglais
   - content/histoire.js        → Histoire
   - content/physique-chimie.js → Physique-Chimie
   - content/fondamentaux.js    → Épreuve des Fondamentaux (à part, voir plus bas)
   Modifier une matière ne touche à aucun fichier des autres matières :
   les diffs restent petits et faciles à relire.

   AJOUTER UN CHAPITRE À UNE MATIÈRE EXISTANTE
   → Éditer uniquement le fichier de cette matière (ex. content/physique-chimie.js).
   → index.html n'a rien à changer.

   AJOUTER UNE TOUTE NOUVELLE MATIÈRE
   → Créer un nouveau fichier, ex. content/svt.js, sur le modèle des autres
     (window.GAME_CONTENT.subjects.push({ id:"svt", name:"SVT", ... })).
   → Ajouter UNE ligne dans index.html, juste après les autres matières :
       <script src="content/svt.js"></script>
     C'est le seul cas où index.html est à toucher, et c'est une seule ligne.

   RÈGLES POUR NE RIEN CASSER
   - Ne jamais renommer ni supprimer un "id" existant (matière, donjon, question).
   - Ajouter les nouveaux donjons À LA FIN du tableau "dungeons" de leur matière.
   - Ajouter les nouvelles questions à la fin d'un donjon avec un nouvel id (q10, q11…).

   Format d'un donjon :
   { id:"xx-8", name:"…", rank:"E|D|C|B|A|S", req:<niveau requis>,
     boss:{name:"…", icon:"emoji"}, lesson:`HTML de la fiche`,
     questions:[
       { id:"q1", q:"…", c:["BONNE réponse","fausse","fausse"], ex:"explication" },  // QCM
       { id:"q2", q:"…", t:["réponse","variante"], ex:"explication" },             // saisie (un mot/une expression courte)
       { id:"q3", q:"…", def:"la définition de référence, en une phrase", ex:"…" } // définition libre (voir plus bas)
     ] }

   QUESTIONS "ÉCRIS LA DÉFINITION" (optionnel)
   Avec { def:"…" } au lieu de "c" ou "t", l'enfant répond dans une zone de texte
   libre (plusieurs lignes), et le jeu compare sa réponse à la définition de
   référence en comptant les mots-clés qu'elle contient (pas d'IA embarquée
   possible dans une page statique et gratuite, donc pas de vraie compréhension
   du sens — juste un comptage de mots importants en commun, tolérant les
   fautes d'accent/majuscule et les variations simples comme le pluriel).
   Une reformulation qui garde les mots de la définition passe (ex. "il marche
   debout sur deux pieds tout le temps"), mais un synonyme absent de la
   définition de référence ne sera pas reconnu (ex. "jambes" à la place de
   "pieds", ou "se déplacer" à la place de "marcher"). En écrivant la
   définition de référence, penser à y inclure les mots que l'enfant risque
   réellement d'utiliser. Si une reformulation valable est quand même comptée
   fausse, le jeu affiche la bonne définition juste après (donc c'est corrigé
   pédagogiquement), seule la validation immédiate rate.

   IMAGES DANS UNE QUESTION OU UNE RÉPONSE (optionnel)
   Dépose les fichiers image dans content/images/ (voir le guide qui s'y trouve),
   puis référence-les par leur chemin, relatif à index.html :
     { id:"q1", img:"content/images/inflammable.png", q:"Comment s’appelle ce pictogramme ?", c:[...] }
   Et un choix de QCM peut être une image plutôt qu'un texte, à la place d'une
   chaîne dans "c" :
     { id:"q2", q:"Quel est le pictogramme « Toxique » ?",
       c:[{src:"content/images/toxique.png"}, {src:"content/images/corrosif.png"},
          {src:"content/images/explosif.png"}, {src:"content/images/pression.png"}] }
   Ajouter { src:"...", label:"Un texte" } affiche aussi une légende sous l'image ;
   { src:"...", alt:"..." } donne un texte alternatif pour l'accessibilité.
   Si un fichier est introuvable (mauvais chemin, faute de frappe), l'image
   affiche un cadre avec un repère visuel au lieu de planter le jeu — pratique
   pour repérer une faute de frappe dans un chemin.

   SECOURS TEMPORAIRE SANS VRAIE IMAGE (optionnel, à éviter si possible)
   En attendant qu'une vraie image soit prête, on peut utiliser un croquis déjà
   dessiné dans le moteur avec { icon:"nomIcone" } à la place de { src:"..." }.
   Existent à ce jour : inflammable, comburant, corrosif, irritant, toxique,
   environnement, sante, explosif, pression (voir PICTO_GLYPH dans index.html).
   Ce ne sont que des croquis de dépannage, pas les vrais pictogrammes officiels :
   à remplacer par une vraie image dès qu'elle est disponible.

   SALLES PAR NIVEAU DE DIFFICULTÉ (optionnel)
   Par défaut, un donjon est découpé automatiquement en 2 ou 3 salles à peu près
   égales avant le boss. Pour imposer une vraie progression de difficulté, ajoute
   un champ "tier" (1, 2, 3…) à chaque question, et un "tierLabels" au donjon :
     tierLabels:{1:"Facile", 2:"Plus dur", 3:"Expert"},
     questions:[
       { id:"q1", tier:1, q:"…", ... },
       { id:"q2", tier:2, q:"…", ... }
     ]
   Chaque palier devient sa propre salle, dans l'ordre des numéros de tier, et une
   dernière salle "Résumé" est ajoutée automatiquement en mélangeant tous les
   paliers — inutile de l'écrire à la main.

   CAS À PART : content/fondamentaux.js
   Ce fichier ne suit PAS le format ci-dessus (pas de donjons, pas de "tier",
   pas de boss). C'est une réserve à plat de 45 questions, chacune avec :
     { id:"FR-PRES-01", subject:"francais"|"maths", category:"...",
       q:"…", c:["bonne réponse", "fausse", ...], ex:"explication" }
   Le moteur choisit lui-même 15 questions à chaque tentative (9 français +
   6 maths), selon des quotas par catégorie définis dans index.html
   (const FOND_QUOTAS) — jamais une série figée à l'avance. Règles à
   respecter en modifiant ce fichier :
   - Ne jamais renommer/supprimer un id existant (l'historique de chaque
     enfant est attaché à ces id précis, dans sa sauvegarde).
   - Garder exactement les mêmes noms de "category" que ceux déjà utilisés :
     ce sont eux qui pilotent les quotas. Ajouter une catégorie ou changer
     un quota demande de modifier FOND_QUOTAS dans index.html en même temps
     — ce n'est donc pas un simple fichier de contenu isolé comme les autres.
   - Garder assez de questions par catégorie pour couvrir plusieurs
     tentatives (au moins 3 fois le quota par tentative, dans l'idéal).
   ===================================================================== */
