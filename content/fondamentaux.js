/* =====================================================================
   CONTENU — Épreuve des Fondamentaux
   Vérifie les principaux acquis de fin de CM2 / entrée en 6e.
   Différente des autres matières : pas de donjon classique, pas de boss,
   pas de leçon avant les questions. À chaque tentative, le moteur choisit
   dynamiquement 15 questions dans ce pool de 45 (9 français + 6 maths),
   selon des quotas par catégorie (voir FOND_QUOTAS dans index.html) et en
   donnant la priorité aux questions jamais posées, puis aux ratées, puis
   aux réussies les moins récemment revues.

   Format de chaque question : id, subject ("francais"|"maths"), category,
   q (énoncé), c (choix — le premier est toujours le bon, mélangé à l'affichage),
   ex (explication montrée après la réponse).

   Règles à respecter en modifiant ce fichier :
   - Ne jamais renommer/supprimer un id existant (l'historique de progression
     de l'enfant est rattaché à ces id).
   - Garder exactement les mêmes catégories (ce sont elles qui pilotent les
     quotas). Pour ajouter une catégorie, il faut aussi mettre à jour
     FOND_QUOTAS dans index.html — ce n'est pas un fichier à modifier seul.
   - Chaque catégorie doit garder assez de questions pour couvrir plusieurs
     tentatives (le quota par tentative × au moins 3, dans l'idéal).
   ===================================================================== */
window.GAME_CONTENT.fondamentaux = {
  questions: [
    // ===== FRANÇAIS — Conjugaison directe : présent (3) =====
    {id:"FR-PRES-01", subject:"francais", category:"conjugaison-present",
     q:"Conjugue l’auxiliaire être au présent, à la 2e personne du pluriel.",
     c:["êtes", "sommes", "sont", "étiez"],
     ex:"La 2e personne du pluriel correspond à « vous ». Au présent : vous êtes."},
    {id:"FR-PRES-02", subject:"francais", category:"conjugaison-present",
     q:"Conjugue l’auxiliaire avoir au présent, à la 3e personne du pluriel.",
     c:["ont", "avez", "avons", "avaient"],
     ex:"La 3e personne du pluriel correspond à « ils / elles ». Au présent : ils ont."},
    {id:"FR-PRES-03", subject:"francais", category:"conjugaison-present",
     q:"Conjugue le verbe aller au présent, à la 1re personne du pluriel.",
     c:["allons", "allez", "vont", "allions"],
     ex:"La 1re personne du pluriel correspond à « nous ». Nous allons."},

    // ===== FRANÇAIS — Conjugaison directe : imparfait (3) =====
    {id:"FR-IMP-01", subject:"francais", category:"conjugaison-imparfait",
     q:"Conjugue l’auxiliaire avoir à l’imparfait, à la 1re personne du pluriel.",
     c:["avions", "avons", "aurons", "avons eu"],
     ex:"À l’imparfait : nous avions."},
    {id:"FR-IMP-02", subject:"francais", category:"conjugaison-imparfait",
     q:"Conjugue l’auxiliaire être à l’imparfait, à la 3e personne du singulier.",
     c:["était", "est", "sera", "a été"],
     ex:"À la 3e personne du singulier : il / elle était."},
    {id:"FR-IMP-03", subject:"francais", category:"conjugaison-imparfait",
     q:"Conjugue le verbe jouer à l’imparfait, à la 2e personne du pluriel.",
     c:["jouiez", "jouez", "jouerez", "avez joué"],
     ex:"À l’imparfait : vous jouiez."},

    // ===== FRANÇAIS — Conjugaison directe : passé composé (3) =====
    {id:"FR-PC-01", subject:"francais", category:"conjugaison-passe-compose",
     q:"Conjugue le verbe finir au passé composé, à la 3e personne du singulier.",
     c:["a fini", "finissait", "finit", "finira"],
     ex:"Le passé composé se construit ici avec l’auxiliaire avoir : il / elle a fini."},
    {id:"FR-PC-02", subject:"francais", category:"conjugaison-passe-compose",
     q:"Conjugue le verbe manger au passé composé, à la 1re personne du pluriel.",
     c:["avons mangé", "mangions", "mangeons", "mangerons"],
     ex:"Au passé composé : nous avons mangé."},
    {id:"FR-PC-03", subject:"francais", category:"conjugaison-passe-compose",
     q:"Conjugue le verbe aller au passé composé, à la 3e personne du pluriel.",
     c:["sont allés", "ont allé", "allaient", "iront"],
     ex:"Le verbe aller se conjugue avec l’auxiliaire être : ils sont allés."},

    // ===== FRANÇAIS — Reconnaissance du temps (6) =====
    {id:"FR-TEMPS-01", subject:"francais", category:"reconnaissance-temps",
     q:"À quel temps est le verbe dans la phrase : « Tous les matins, Tom prend le bus. » ?",
     c:["Présent", "Imparfait", "Passé composé", "Futur"],
     ex:"« prend » est conjugué au présent."},
    {id:"FR-TEMPS-02", subject:"francais", category:"reconnaissance-temps",
     q:"À quel temps est le verbe dans la phrase : « Quand j’étais petit, je jouais souvent dans ce parc. » ?",
     c:["Imparfait", "Présent", "Passé composé", "Futur"],
     ex:"« jouais » est conjugué à l’imparfait."},
    {id:"FR-TEMPS-03", subject:"francais", category:"reconnaissance-temps",
     q:"À quel temps est le verbe dans la phrase : « Hier, nous avons terminé notre exercice. » ?",
     c:["Passé composé", "Présent", "Imparfait", "Futur"],
     ex:"« avons terminé » est au passé composé."},
    {id:"FR-TEMPS-04", subject:"francais", category:"reconnaissance-temps",
     q:"À quel temps est le verbe dans la phrase : « Léa range soigneusement sa chambre. » ?",
     c:["Présent", "Imparfait", "Passé composé", "Futur"],
     ex:"« range » est conjugué au présent."},
    {id:"FR-TEMPS-05", subject:"francais", category:"reconnaissance-temps",
     q:"À quel temps est le verbe dans la phrase : « Nous regardions souvent les étoiles. » ?",
     c:["Imparfait", "Présent", "Passé composé", "Futur"],
     ex:"« regardions » est conjugué à l’imparfait."},
    {id:"FR-TEMPS-06", subject:"francais", category:"reconnaissance-temps",
     q:"À quel temps est le verbe dans la phrase : « Ils ont préparé le repas. » ?",
     c:["Passé composé", "Présent", "Imparfait", "Futur"],
     ex:"« ont préparé » est au passé composé."},

    // ===== FRANÇAIS — Identifier le sujet (3) =====
    {id:"FR-SUJET-01", subject:"francais", category:"sujet",
     q:"Dans la phrase « Au fond du jardin poussent trois grands arbres. », quel est le sujet du verbe « poussent » ?",
     c:["trois grands arbres", "le jardin", "Au fond du jardin", "grands"],
     ex:"Ce sont « trois grands arbres » qui poussent."},
    {id:"FR-SUJET-02", subject:"francais", category:"sujet",
     q:"Dans la phrase « Chaque matin, les élèves entrent dans la classe. », quel est le sujet du verbe « entrent » ?",
     c:["les élèves", "Chaque matin", "la classe", "matin"],
     ex:"Ce sont les élèves qui entrent."},
    {id:"FR-SUJET-03", subject:"francais", category:"sujet",
     q:"Dans la phrase « Sur la table se trouvent plusieurs livres. », quel est le sujet du verbe « se trouvent » ?",
     c:["plusieurs livres", "la table", "Sur la table", "trouvent"],
     ex:"Ce sont « plusieurs livres » qui se trouvent sur la table."},

    // ===== FRANÇAIS — Accords (6) =====
    {id:"FR-ACC-01", subject:"francais", category:"accord",
     q:"Complète : « Les ___ maisons sont au bord de la mer. »",
     c:["grandes", "grand", "grande", "grands"],
     ex:"« maisons » est féminin pluriel : grandes maisons."},
    {id:"FR-ACC-02", subject:"francais", category:"accord",
     q:"Quelle phrase est correctement écrite ?",
     c:["Les enfants jouent dans la cour.", "Les enfants joue dans la cour.", "Les enfants joues dans la cour.", "Les enfants jouont dans la cour."],
     ex:"« Les enfants » est un sujet au pluriel : ils jouent."},
    {id:"FR-ACC-03", subject:"francais", category:"accord",
     q:"Complète : « Les garçons sont très ___. »",
     c:["sportifs", "sportif", "sportive", "sportives"],
     ex:"« garçons » est masculin pluriel : sportifs."},
    {id:"FR-ACC-04", subject:"francais", category:"accord",
     q:"Quelle phrase est correctement écrite ?",
     c:["Mon frère et ma sœur regardent la télévision.", "Mon frère et ma sœur regarde la télévision.", "Mon frère et ma sœur regardes la télévision.", "Mon frère et ma sœur regardont la télévision."],
     ex:"« Mon frère et ma sœur » correspond à plusieurs personnes : ils regardent."},
    {id:"FR-ACC-05", subject:"francais", category:"accord",
     q:"Complète : « Les petites filles sont ___. »",
     c:["contentes", "content", "contente", "contents"],
     ex:"« filles » est féminin pluriel : contentes."},
    {id:"FR-ACC-06", subject:"francais", category:"accord",
     q:"Complète : « Les oiseaux ___ dans les arbres. »",
     c:["chantent", "chante", "chantes", "chantons"],
     ex:"« Les oiseaux » correspond à « ils » : ils chantent."},

    // ===== FRANÇAIS — Homophones (3) =====
    {id:"FR-HOM-01", subject:"francais", category:"homophone",
     q:"Complète : « Hugo ___ oublié son cahier. »",
     c:["a", "à"],
     ex:"On peut remplacer « a » par « avait » : Hugo avait oublié son cahier."},
    {id:"FR-HOM-02", subject:"francais", category:"homophone",
     q:"Complète : « Léa ___ Tom jouent ensemble. »",
     c:["et", "est"],
     ex:"« et » permet de relier Léa et Tom."},
    {id:"FR-HOM-03", subject:"francais", category:"homophone",
     q:"Complète : « Ils ___ terminé leur exercice. »",
     c:["ont", "on"],
     ex:"« ont » est le verbe avoir : ils ont terminé."},

    // ===== MATHS — Multiplications (3) =====
    {id:"MATH-MULT-01", subject:"maths", category:"multiplication",
     q:"7 × 8 = ?", c:["56", "48", "54", "64"], ex:"7 × 8 = 56."},
    {id:"MATH-MULT-02", subject:"maths", category:"multiplication",
     q:"6 × 9 = ?", c:["54", "45", "48", "56"], ex:"6 × 9 = 54."},
    {id:"MATH-MULT-03", subject:"maths", category:"multiplication",
     q:"8 × 6 = ?", c:["48", "42", "54", "56"], ex:"8 × 6 = 48."},

    // ===== MATHS — Divisions (3) =====
    {id:"MATH-DIV-01", subject:"maths", category:"division",
     q:"72 ÷ 9 = ?", c:["8", "6", "7", "9"], ex:"9 × 8 = 72, donc 72 ÷ 9 = 8."},
    {id:"MATH-DIV-02", subject:"maths", category:"division",
     q:"48 ÷ 6 = ?", c:["8", "6", "7", "9"], ex:"6 × 8 = 48."},
    {id:"MATH-DIV-03", subject:"maths", category:"division",
     q:"63 ÷ 7 = ?", c:["9", "7", "8", "10"], ex:"7 × 9 = 63."},

    // ===== MATHS — Numération (3) =====
    {id:"MATH-NUM-01", subject:"maths", category:"numeration",
     q:"Dans le nombre 47 582, que représente le chiffre 7 ?",
     c:["7 milliers", "7 unités", "7 centaines", "70 milliers"],
     ex:"Dans 47 582, le 7 est le chiffre des milliers. Il représente 7 000."},
    {id:"MATH-NUM-02", subject:"maths", category:"numeration",
     q:"Dans le nombre 63 419, que représente le chiffre 4 ?",
     c:["4 centaines", "4 unités", "4 milliers", "40 milliers"],
     ex:"Dans 63 419, le 4 représente 400."},
    {id:"MATH-NUM-03", subject:"maths", category:"numeration",
     q:"Dans le nombre 82 653, que représente le chiffre 6 ?",
     c:["6 centaines", "6 unités", "6 milliers", "60 milliers"],
     ex:"Dans 82 653, le 6 représente 600."},

    // ===== MATHS — Nombres décimaux (3) =====
    {id:"MATH-DEC-01", subject:"maths", category:"decimaux",
     q:"Quel est le plus grand nombre ?", c:["3,9", "3,09", "3,19", "3,89"],
     ex:"3,9 = 3,90. C’est donc plus grand que 3,89."},
    {id:"MATH-DEC-02", subject:"maths", category:"decimaux",
     q:"Quel est le plus petit nombre ?", c:["5,08", "5,8", "5,18", "5,81"],
     ex:"5,08 est plus petit que 5,18, 5,8 et 5,81."},
    {id:"MATH-DEC-03", subject:"maths", category:"decimaux",
     q:"Quel est le plus grand nombre ?", c:["4,72", "4,7", "4,07", "4,27"],
     ex:"4,72 est plus grand que 4,70."},

    // ===== MATHS — Fractions (3) =====
    {id:"MATH-FRAC-01", subject:"maths", category:"fraction",
     q:"Une tablette est partagée en 8 morceaux identiques. Léa en mange 3. Quelle fraction de la tablette a-t-elle mangée ?",
     c:["3/8", "3/5", "5/8", "8/3"], ex:"Elle mange 3 morceaux parmi 8 : 3/8."},
    {id:"MATH-FRAC-02", subject:"maths", category:"fraction",
     q:"Quelle fraction représente la moitié ?",
     c:["2/4", "1/3", "3/4", "2/3"], ex:"2 parts sur 4 représentent la moitié."},
    {id:"MATH-FRAC-03", subject:"maths", category:"fraction",
     q:"Un gâteau est partagé en 6 parts égales. Paul en mange 2. Quelle fraction du gâteau a-t-il mangée ?",
     c:["2/6", "4/6", "2/4", "6/2"], ex:"Il mange 2 parts parmi les 6 parts du gâteau : 2/6."},

    // ===== MATHS — Problèmes (3) =====
    {id:"MATH-PROB-01", subject:"maths", category:"probleme",
     q:"Un livre coûte 12,50 €. Tu paies avec 20 €. Combien doit-on te rendre ?",
     c:["7,50 €", "6,50 €", "8,50 €", "7,05 €"], ex:"20 € − 12,50 € = 7,50 €."},
    {id:"MATH-PROB-02", subject:"maths", category:"probleme",
     q:"Une classe compte 28 élèves. On forme des groupes de 4 élèves. Combien peut-on faire de groupes ?",
     c:["7", "6", "8", "24"], ex:"28 ÷ 4 = 7 groupes."},
    {id:"MATH-PROB-03", subject:"maths", category:"probleme",
     q:"Emma possède 30 €. Elle achète 2 jeux à 9 € chacun. Combien lui reste-t-il ?",
     c:["12 €", "9 €", "18 €", "21 €"], ex:"2 × 9 = 18 €. 30 − 18 = 12 €."}
  ]
};
