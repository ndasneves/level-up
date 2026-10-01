/* =====================================================================
   CONTENU — Matière : Physique-Chimie
   Un seul fichier par matière : plus simple à relire, à modifier et à
   faire grandir sans risquer de toucher aux autres matières.
   Règle : ne jamais renommer/supprimer un id existant. Ajouter les
   nouveaux donjons à la fin du tableau "dungeons". Les images utilisées par
   les questions vivent dans content/images/ (voir le champ img des questions).
   ===================================================================== */
window.GAME_CONTENT.subjects.push(
{
  id:"pc", name:"Physique-Chimie", region:"Archipel des Éléments", color:"#3DDC97",
  dungeons:[
  {
    id:"pc-8", name:"Les pictogrammes de sécurité", rank:"E", req:1,
    boss:{name:"Le Spectre Toxique", icon:"☠️"},
    tierLabels:{1:"Reconnaître les pictogrammes", 2:"Retrouver la définition", 3:"Repérer le bon pictogramme"},
    lesson:`
<p>Dans un laboratoire, chaque produit dangereux porte un <strong>pictogramme</strong> : un losange rouge et blanc qui prévient d’un danger précis. Voici la fiche donnée en classe, reprise telle quelle.</p>
<div class="tw"><table><tr><th>Pictogramme</th><th>Danger ⚠</th><th>Précaution ⊙</th></tr>
<tr><td>🔥 <strong>Inflammable</strong></td><td>Peut s’enflammer au contact d’une flamme, d’une étincelle, de la chaleur ou de frottements.</td><td>Tenir éloigné des flammes, étincelles et sources de chaleur.</td></tr>
<tr><td>⭕🔥 <strong>Comburant</strong></td><td>Peut favoriser un incendie ou provoquer une explosion en présence de matières combustibles.</td><td>Tenir éloigné des produits combustibles.</td></tr>
<tr><td>🧪 <strong>Corrosif</strong></td><td>Attaque la peau, les yeux et certains matériaux comme les métaux.</td><td>Porter des gants et lunettes de protections. Éviter tout contact avec la peau et les yeux.</td></tr>
<tr><td>🌳 <strong>Dangereux pour l’environnement</strong></td><td>Peut être nocif pour les animaux et les plantes, surtout dans les milieux aquatiques.</td><td>Ne pas rejeter dans l’environnement ou dans l’évier.</td></tr>
<tr><td>❗🫁 <strong>Dangereux pour la santé (PMR)</strong></td><td>Peut provoquer des maladies graves : cancer, allergies, atteintes d’organes ou de l’ADN.</td><td>Porter des équipements de protection et éviter de respirer les vapeurs.</td></tr>
<tr><td>☠️ <strong>Toxique</strong></td><td>Peut empoisonner rapidement et être mortel même à faible dose.</td><td>Porter des équipements de protection et manipuler avec prudence.</td></tr>
<tr><td>❗ <strong>Nocif ou irritant</strong></td><td>Peut provoquer des irritations, des allergies, des vertiges ou une somnolence.</td><td>Éviter le contact avec la peau et les yeux. Porter des équipements de protection.</td></tr>
<tr><td>💥 <strong>Explosif</strong></td><td>Peut exploser sous l’effet d’un choc, d’une flamme, de la chaleur ou de frottements.</td><td>Éviter les chocs, les frottements et toute source de chaleur.</td></tr>
<tr><td>💨 <strong>Produit sous pression</strong></td><td>Contient un gaz sous pression pouvant exploser ou provoquer des brûlures par le froid.</td><td>Protéger du soleil, éviter les chocs.</td></tr></table></div>
<div class="memo"><b>À retenir</b>Un pictogramme rouge et blanc = un danger précis. Ce tableau reprend mot pour mot la correction donnée en classe : danger (⚠) et précaution (⊙) pour chaque symbole.</div>`,
    questions:[
      {id:"q1", tier:2, q:"Quel danger signale le pictogramme « Inflammable » ?", c:["Peut s’enflammer au contact d’une flamme, d’une étincelle, de la chaleur ou de frottements","Peut exploser sous le choc","Attaque la peau","Pollue l’eau"], ex:"Inflammable : peut s’enflammer au contact d’une flamme, d’une étincelle, de la chaleur ou de frottements."},
      {id:"q2", tier:2, q:"Un produit « comburant » peut…", c:["favoriser un incendie ou provoquer une explosion en présence de matières combustibles","empoisonner rapidement","attaquer la peau et les métaux","polluer les rivières"], ex:"Comburant : peut favoriser un incendie ou provoquer une explosion en présence de matières combustibles."},
      {id:"q3", tier:2, q:"Le pictogramme « tête de mort » signifie que le produit est…", c:["toxique : peut empoisonner rapidement et être mortel même à faible dose","corrosif","comburant","sous pression"], ex:"Toxique : peut empoisonner rapidement et être mortel même à faible dose."},
      {id:"q4", tier:2, q:"Un produit « corrosif » peut…", c:["attaquer la peau, les yeux et certains matériaux comme les métaux","exploser au moindre choc","polluer l’air uniquement","provoquer juste une petite irritation"], ex:"Corrosif : attaque la peau, les yeux et certains matériaux comme les métaux."},
      {id:"q5", tier:2, q:"Un produit « nocif ou irritant » peut provoquer…", c:["des irritations, des allergies, des vertiges ou une somnolence","la mort immédiate","une explosion","la pollution des sols uniquement"], ex:"Nocif ou irritant : peut provoquer des irritations, des allergies, des vertiges ou une somnolence."},
      {id:"q6", tier:2, q:"Quel pictogramme représente un arbre et un poisson morts ?", c:["Dangereux pour l’environnement","Toxique","Corrosif","Explosif"], ex:"Dangereux pour l’environnement : peut être nocif pour les animaux et les plantes, surtout dans les milieux aquatiques."},
      {id:"q7", tier:2, q:"Un « produit sous pression » peut provoquer une brûlure…", c:["par le froid","par l’électricité","par la lumière","par le bruit"], ex:"Produit sous pression : contient un gaz sous pression pouvant exploser ou provoquer des brûlures par le froid."},
      {id:"q8", tier:2, q:"Comment appelle-t-on un produit qui peut exploser sous l’effet d’un choc, d’une flamme, de la chaleur ou de frottements ?", t:["explosif"], ex:"Explosif : peut exploser sous l’effet d’un choc, d’une flamme, de la chaleur ou de frottements."},
      {id:"q9", tier:2, q:"Quel sigle, donné en classe, désigne un produit dangereux pour la santé (cancer, allergies, atteintes d’organes ou de l’ADN) ?", t:["pmr"], ex:"Dangereux pour la santé (PMR) : peut provoquer des maladies graves (cancer, allergies, atteintes d’organes ou de l’ADN)."},

      {id:"q10", tier:1, img:"content/images/inflammable.png", q:"Comment s’appelle ce pictogramme ?", c:["Inflammable","Comburant","Explosif","Toxique"], ex:"La flamme signale un produit inflammable."},
      {id:"q11", tier:1, img:"content/images/comburant.png", q:"Comment s’appelle ce pictogramme ?", c:["Comburant","Inflammable","Explosif","Corrosif"], ex:"La flamme au-dessus d’un cercle signale un produit comburant."},
      {id:"q12", tier:1, img:"content/images/corrosif.png", q:"Comment s’appelle ce pictogramme ?", c:["Corrosif","Toxique","Nocif ou irritant","Comburant"], ex:"Les tubes qui rongent une surface signalent un produit corrosif."},
      {id:"q13", tier:1, img:"content/images/environnement.png", q:"Comment s’appelle ce pictogramme ?", c:["Dangereux pour l’environnement","Toxique","Nocif ou irritant","Corrosif"], ex:"L’arbre et le poisson morts signalent un danger pour l’environnement."},
      {id:"q14", tier:1, img:"content/images/toxique.png", q:"Comment s’appelle ce pictogramme ?", c:["Toxique","Nocif ou irritant","Corrosif","Dangereux pour la santé (PMR)"], ex:"La tête de mort signale un produit toxique."},
      {id:"q15", tier:1, img:"content/images/sante.png", q:"Comment s’appelle ce pictogramme ?", c:["Dangereux pour la santé (PMR)","Toxique","Nocif ou irritant","Corrosif"], ex:"Cette silhouette signale un danger pour la santé (PMR)."},
      {id:"q16", tier:1, img:"content/images/irritant.png", q:"Comment s’appelle ce pictogramme ?", c:["Nocif ou irritant","Toxique","Corrosif","Explosif"], ex:"Le point d’exclamation signale un produit nocif ou irritant."},
      {id:"q17", tier:1, img:"content/images/explosif.png", q:"Comment s’appelle ce pictogramme ?", c:["Explosif","Comburant","Inflammable","Produit sous pression"], ex:"La bombe qui explose signale un produit explosif."},
      {id:"q18", tier:1, img:"content/images/pression.png", q:"Comment s’appelle ce pictogramme ?", c:["Produit sous pression","Comburant","Gaz toxique","Explosif"], ex:"La bouteille de gaz signale un produit sous pression."},

      {id:"q19", tier:3, q:"Quel est le pictogramme qui signifie « Toxique » ?", c:[{src:"content/images/toxique.png"},{src:"content/images/corrosif.png"},{src:"content/images/irritant.png"},{src:"content/images/explosif.png"}], ex:"C’est la tête de mort."},
      {id:"q20", tier:3, q:"Quel est le pictogramme qui signifie « Inflammable » ?", c:[{src:"content/images/inflammable.png"},{src:"content/images/comburant.png"},{src:"content/images/pression.png"},{src:"content/images/explosif.png"}], ex:"C’est la flamme."},
      {id:"q21", tier:3, q:"Quel est le pictogramme qui signifie « Explosif » ?", c:[{src:"content/images/explosif.png"},{src:"content/images/inflammable.png"},{src:"content/images/comburant.png"},{src:"content/images/pression.png"}], ex:"C’est la bombe qui explose."},
      {id:"q22", tier:3, q:"Quel est le pictogramme qui signifie « Corrosif » ?", c:[{src:"content/images/corrosif.png"},{src:"content/images/toxique.png"},{src:"content/images/irritant.png"},{src:"content/images/sante.png"}], ex:"Ce sont les tubes qui rongent une surface."},
      {id:"q23", tier:3, q:"Quel est le pictogramme qui signifie « Dangereux pour l’environnement » ?", c:[{src:"content/images/environnement.png"},{src:"content/images/toxique.png"},{src:"content/images/pression.png"},{src:"content/images/comburant.png"}], ex:"C’est l’arbre et le poisson morts."},
      {id:"q24", tier:3, q:"Quel est le pictogramme qui signifie « Produit sous pression » ?", c:[{src:"content/images/pression.png"},{src:"content/images/explosif.png"},{src:"content/images/comburant.png"},{src:"content/images/inflammable.png"}], ex:"C’est la bouteille de gaz."},
      {id:"q25", tier:3, q:"Quel est le pictogramme qui signifie « Comburant » ?", c:[{src:"content/images/comburant.png"},{src:"content/images/inflammable.png"},{src:"content/images/explosif.png"},{src:"content/images/toxique.png"}], ex:"C’est la flamme au-dessus d’un cercle."},
      {id:"q26", tier:3, q:"Quel est le pictogramme qui signifie « Nocif ou irritant » ?", c:[{src:"content/images/irritant.png"},{src:"content/images/toxique.png"},{src:"content/images/sante.png"},{src:"content/images/corrosif.png"}], ex:"C’est le point d’exclamation."},
      {id:"q27", tier:3, q:"Quel est le pictogramme qui signifie « Dangereux pour la santé (PMR) » ?", c:[{src:"content/images/sante.png"},{src:"content/images/toxique.png"},{src:"content/images/irritant.png"},{src:"content/images/environnement.png"}], ex:"C’est la silhouette à l’éclat sur la poitrine."}
    ]
  }
  ]
}
);
