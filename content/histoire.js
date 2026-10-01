/* =====================================================================
   CONTENU — Matière : Histoire
   Un seul fichier par matière : plus simple à relire, à modifier et à
   faire grandir sans risquer de toucher aux autres matières.
   Règle : ne jamais renommer/supprimer un id existant. Ajouter les
   nouveaux donjons à la fin du tableau "dungeons".
   ===================================================================== */
window.GAME_CONTENT.subjects.push(
{
  id:"hi", name:"Histoire", region:"Archipel des Âges Anciens", color:"#B08BFF",
  dungeons:[
  {
    id:"hi-1", name:"Les premiers humains", rank:"E", req:1,
    boss:{name:"Le Mammouth Primordial", icon:"🦣"},
    lesson:`
<p>L’humanité est apparue en <strong>Afrique</strong>. Les premiers humains du genre <em>Homo</em> y vivaient il y a environ <strong>3 millions d’années</strong>.</p>
<p><strong>Homo sapiens</strong>, notre espèce, apparaît en Afrique il y a environ <strong>300 000 ans</strong>. Par des <strong>migrations</strong> successives, il peuple toute la Terre : l’Asie, l’Australie, l’Europe (il y a environ 45 000 ans), puis l’Amérique.</p>
<p>En Europe, il a vécu en même temps qu’une autre espèce humaine : l’<strong>homme de Néandertal</strong>.</p>
<h3>Le Paléolithique : l’âge de la pierre taillée</h3>
<ul>
<li>Les humains sont <strong>nomades</strong> : ils se déplacent pour trouver leur nourriture.</li>
<li>Ils sont <strong>chasseurs-cueilleurs</strong> : ils chassent, pêchent et cueillent des fruits.</li>
<li>Ils fabriquent des outils en <strong>pierre taillée</strong> et maîtrisent le <strong>feu</strong>.</li>
<li>Ils peignent des animaux dans des grottes : <strong>Chauve</strong> (environ −36 000) et <strong>Lascaux</strong> en Dordogne (environ −18 000).</li>
</ul>
<div class="memo"><b>À retenir</b>Afrique · Homo sapiens (−300 000) · migrations · nomades chasseurs-cueilleurs · pierre taillée.</div>`,
    questions:[
      {id:"q1", q:"Sur quel continent l’humanité est-elle apparue ?", c:["L’Afrique","L’Europe","L’Asie","L’Amérique"], ex:"Les plus anciens fossiles humains ont été trouvés en Afrique."},
      {id:"q2", q:"« Paléolithique » signifie :", c:["âge de la pierre taillée","âge de la pierre polie","âge du fer","âge des rois"], ex:"Le Paléolithique est l’âge de la pierre taillée. La pierre polie, c’est le Néolithique."},
      {id:"q3", q:"Comment vivaient les humains du Paléolithique ?", c:["Nomades, ils chassaient et cueillaient","Dans des villes avec des rois","Dans des fermes avec des champs","Dans des châteaux forts"], ex:"Ils se déplaçaient pour trouver leur nourriture."},
      {id:"q4", q:"Homo sapiens apparaît il y a environ :", c:["300 000 ans","3 000 ans","30 ans","30 millions d’années"], ex:"Environ 300 000 ans, en Afrique."},
      {id:"q5", q:"Quelle grotte ornée célèbre se trouve en Dordogne ?", c:["Lascaux","Olympie","Carnac","Uruk"], ex:"Lascaux, peinte il y a environ 18 000 ans."},
      {id:"q6", q:"Comment Homo sapiens a-t-il peuplé toute la Terre ?", c:["Par des migrations successives","En bateau à moteur","En une seule année","Il est apparu partout en même temps"], ex:"Il a quitté l’Afrique par vagues de migrations sur des dizaines de milliers d’années."},
      {id:"q7", q:"Quelle autre espèce humaine a vécu en Europe en même temps que Homo sapiens ?", c:["L’homme de Néandertal","Les Romains","Les Égyptiens","Les dinosaures"], ex:"Néandertal a disparu il y a environ 40 000 ans. Les dinosaures avaient disparu bien avant les humains !"},
      {id:"q8", q:"Complète : les premiers humains étaient des chasseurs-…", t:["cueilleurs","cueilleur"], ex:"Chasseurs-cueilleurs : ils chassaient et cueillaient."}
    ]
  },
  {
    id:"hi-2", name:"La révolution néolithique", rank:"E", req:2,
    boss:{name:"Le Taureau des Moissons", icon:"🐂"},
    lesson:`
<p>Vers <strong>−10 000</strong>, au <strong>Proche-Orient</strong>, dans une région appelée le <strong>Croissant fertile</strong>, les humains changent de mode de vie. C’est le <strong>Néolithique</strong>.</p>
<h3>Les grandes nouveautés</h3>
<ul>
<li>L’<strong>agriculture</strong> : ils cultivent le blé et l’orge.</li>
<li>L’<strong>élevage</strong> : ils domestiquent chèvres, moutons, bœufs.</li>
<li>Ils deviennent <strong>sédentaires</strong> : ils restent au même endroit et construisent des <strong>villages</strong>.</li>
<li>Nouveaux outils en <strong>pierre polie</strong>, invention de la <strong>poterie</strong> (pour conserver et cuire les aliments) et du tissage.</li>
</ul>
<p>Le Néolithique se diffuse ensuite lentement vers l’Europe. En Bretagne, on trouve des mégalithes, comme les alignements de <strong>menhirs de Carnac</strong>.</p>
<div class="memo"><b>À retenir</b>−10 000 · Croissant fertile · agriculture + élevage · sédentaires · villages · pierre polie.</div>`,
    questions:[
      {id:"q1", q:"Le Néolithique commence au Proche-Orient vers :", c:["−10 000","−300 000","−500","l’an 1000"], ex:"Vers −10 000, dans le Croissant fertile."},
      {id:"q2", q:"Dans quelle région le Néolithique commence-t-il ?", c:["Le Croissant fertile (Proche-Orient)","La Bretagne","La Chine","L’Amérique du Sud"], ex:"Le Croissant fertile, au Proche-Orient."},
      {id:"q3", q:"Quelles sont les deux grandes nouveautés du Néolithique ?", c:["L’agriculture et l’élevage","La chasse et la cueillette","L’écriture et la monnaie","Le feu et la pierre taillée"], ex:"La chasse, la cueillette et le feu existaient déjà au Paléolithique."},
      {id:"q4", q:"Un humain « sédentaire » est un humain qui…", c:["vit toujours au même endroit","se déplace sans cesse","vit dans une grotte","ne mange que de la viande"], ex:"Le contraire de sédentaire, c’est nomade."},
      {id:"q5", q:"Carnac, en Bretagne, est célèbre pour ses…", c:["alignements de menhirs","pyramides","grottes ornées","temples grecs"], ex:"Des milliers de menhirs dressés au Néolithique."},
      {id:"q6", q:"À quoi sert la poterie inventée au Néolithique ?", c:["À conserver et cuire les aliments","À écrire des lois","À chasser le mammouth","À faire du feu"], ex:"Les récoltes doivent être stockées."},
      {id:"q7", q:"Complète : un humain qui ne se déplace plus et vit dans un village est…", t:["sedentaire","sédentaire"], ex:"Sédentaire."},
      {id:"q8", q:"Au Néolithique, les outils sont en pierre…", c:["polie","taillée","fondue","peinte"], ex:"Néolithique = âge de la pierre polie."}
    ]
  },
  {
    id:"hi-3", name:"Premiers États, premières écritures", rank:"D", req:4,
    boss:{name:"Le Scorpion d’Argile", icon:"🦂"},
    lesson:`
<p>Un <strong>État</strong>, c’est un territoire dirigé par un pouvoir (souvent un roi) qui fait des lois, lève des impôts et commande une armée.</p>
<h3>La Mésopotamie</h3>
<ul>
<li>Région entre deux fleuves : le <strong>Tigre</strong> et l’<strong>Euphrate</strong>.</li>
<li>Vers <strong>−3300</strong>, à <strong>Uruk</strong>, naît l’<strong>écriture cunéiforme</strong> : des signes en forme de <strong>clous</strong>, tracés avec un calame sur des <strong>tablettes d’argile</strong>.</li>
<li>L’écriture sert d’abord à <strong>compter</strong> (récoltes, impôts), puis à écrire des lois, comme le <strong>Code de Hammurabi</strong> (roi de Babylone, vers −1750).</li>
</ul>
<h3>L’Égypte</h3>
<ul>
<li>Civilisation née le long du <strong>Nil</strong>.</li>
<li>Elle est dirigée par le <strong>pharaon</strong>, considéré comme un dieu vivant.</li>
<li>Les Égyptiens écrivent en <strong>hiéroglyphes</strong> sur du papyrus. Ceux qui savent écrire sont les <strong>scribes</strong>.</li>
<li>Les pyramides de Gizeh sont les tombeaux des pharaons (Khéops, vers −2500).</li>
</ul>
<div class="memo"><b>À retenir</b>L’invention de l’écriture marque la <strong>fin de la Préhistoire</strong> et le début de l’<strong>Histoire</strong>.</div>`,
    questions:[
      {id:"q1", q:"Où apparaît la première écriture, vers −3300 ?", c:["En Mésopotamie","En Grèce","En Gaule","À Rome"], ex:"À Uruk, en Mésopotamie."},
      {id:"q2", q:"« Cunéiforme » veut dire :", c:["en forme de clous","en forme d’animaux","écrit à l’encre","écrit sur du papier"], ex:"Du latin cuneus : le clou, le coin."},
      {id:"q3", q:"Sur quoi écrivait-on en Mésopotamie ?", c:["Des tablettes d’argile","Du papier","Du parchemin","Des écorces d’arbre"], ex:"On traçait les signes avec un calame dans l’argile fraîche."},
      {id:"q4", q:"Comment s’appelle le souverain de l’Égypte ?", c:["Le pharaon","L’empereur","Le consul","Le chef de tribu"], ex:"Le pharaon est considéré comme un dieu vivant."},
      {id:"q5", q:"Quel fleuve traverse l’Égypte ?", c:["Le Nil","Le Tigre","L’Euphrate","Le Rhône"], ex:"Le Tigre et l’Euphrate sont les fleuves de la Mésopotamie."},
      {id:"q6", q:"Le Code de Hammurabi est…", c:["un recueil de lois","une pyramide","un dieu égyptien","une tablette de comptes de blé"], ex:"Des lois gravées sur une stèle par le roi de Babylone vers −1750."},
      {id:"q7", q:"Complète : l’écriture des Égyptiens s’appelle les…", t:["hieroglyphes","hiéroglyphes","hieroglyphe","hiéroglyphe"], ex:"Les hiéroglyphes."},
      {id:"q8", q:"Qu’est-ce qui marque la fin de la Préhistoire ?", c:["L’invention de l’écriture","L’invention du feu","La naissance de Rome","La construction des pyramides"], ex:"Avec l’écriture commence l’Histoire."},
      {id:"q9", q:"En Égypte, qui sont les spécialistes de l’écriture ?", c:["Les scribes","Les pharaons","Les soldats","Les paysans"], ex:"Les scribes comptent, écrivent et gèrent pour le pharaon."}
    ]
  },
  {
    id:"hi-4", name:"Le monde des cités grecques", rank:"D", req:6,
    boss:{name:"Le Cyclope des Récifs", icon:"👁️"},
    lesson:`
<p>À partir du <strong>VIIIe siècle av. J.-C.</strong>, le monde grec est formé de centaines de <strong>cités</strong> indépendantes (en grec : <em>polis</em>) : une ville et la campagne qui l’entoure. Exemples : <strong>Athènes</strong>, <strong>Sparte</strong>.</p>
<p>Les Grecs fondent des <strong>colonies</strong> autour de la Méditerranée, comme <strong>Massalia</strong> (Marseille), vers −600.</p>
<h3>Ce qui unit les Grecs</h3>
<ul>
<li>La même <strong>langue</strong>.</li>
<li>Les mêmes dieux : ils sont <strong>polythéistes</strong> (plusieurs dieux). <strong>Zeus</strong> est le roi des dieux, sur l’Olympe. <strong>Athéna</strong> protège Athènes.</li>
<li>Les mêmes récits : l’<strong>Iliade</strong> et l’<strong>Odyssée</strong>, attribuées au poète <strong>Homère</strong>.</li>
<li>Les grands sanctuaires : <strong>Olympie</strong>, où ont lieu les Jeux olympiques en l’honneur de Zeus (depuis −776), et Delphes.</li>
</ul>
<h3>La démocratie à Athènes (Ve siècle av. J.-C.)</h3>
<p>Démocratie signifie « pouvoir du peuple ». Les <strong>citoyens</strong> votent les lois à l’<strong>Ecclésia</strong>. Seuls les hommes libres, nés de parents athéniens, sont citoyens. Sont exclus : les <strong>femmes</strong>, les <strong>esclaves</strong> et les <strong>métèques</strong> (étrangers).</p>
<div class="memo"><b>À retenir</b>Cités indépendantes · polythéisme · Homère · Olympie · démocratie athénienne réservée aux citoyens.</div>`,
    questions:[
      {id:"q1", q:"Qu’est-ce qu’une cité grecque (polis) ?", c:["Une ville et sa campagne, indépendante","Un grand empire","Une simple maison","Un temple"], ex:"Chaque cité a ses lois, son armée, ses dieux protecteurs."},
      {id:"q2", q:"Qui est le roi des dieux grecs ?", c:["Zeus","Athéna","Homère","Apollon"], ex:"Zeus règne sur l’Olympe."},
      {id:"q3", q:"Quelles œuvres sont attribuées à Homère ?", c:["L’Iliade et l’Odyssée","La Bible","Le Code de Hammurabi","L’Énéide"], ex:"L’Énéide est un récit romain, écrit par Virgile."},
      {id:"q4", q:"Où se déroulaient les Jeux olympiques ?", c:["À Olympie","À Athènes","À Rome","À Sparte"], ex:"À Olympie, en l’honneur de Zeus, depuis −776."},
      {id:"q5", q:"Massalia, colonie grecque, est aujourd’hui…", c:["Marseille","Paris","Lyon","Nice"], ex:"Fondée vers −600 par des Grecs de Phocée."},
      {id:"q6", q:"À Athènes, qui n’a PAS le droit d’être citoyen ?", c:["Les femmes, les esclaves et les métèques","Les hommes nés de parents athéniens","Les soldats athéniens","Les paysans athéniens"], ex:"La démocratie athénienne était réservée à une minorité d’hommes."},
      {id:"q7", q:"Les Grecs sont « polythéistes », cela veut dire qu’ils…", c:["croient en plusieurs dieux","croient en un seul dieu","ne croient en aucun dieu","adorent le pharaon"], ex:"Poly = plusieurs, théos = dieu."},
      {id:"q8", q:"Complète : la déesse protectrice d’Athènes est…", t:["athena","athéna","athene"], ex:"Athéna, déesse de la sagesse."}
    ]
  },
  {
    id:"hi-5", name:"Rome, du mythe à l’histoire", rank:"C", req:8,
    boss:{name:"La Louve du Palatin", icon:"🐺"},
    lesson:`
<h3>Le mythe</h3>
<p>Selon la légende, Rome est fondée en <strong>−753</strong> par <strong>Romulus</strong>. Avec son jumeau <strong>Rémus</strong>, il aurait été abandonné puis allaité par une <strong>louve</strong>. Les Romains se disent aussi descendants d’<strong>Énée</strong>, un héros troyen (récit de Virgile, l’<em>Énéide</em>).</p>
<h3>L’histoire</h3>
<p>Les archéologues ont trouvé des traces de villages sur la colline du <strong>Palatin</strong> vers le VIIIe siècle av. J.-C. Rome est d’abord gouvernée par des rois.</p>
<h3>La République (à partir de −509)</h3>
<ul>
<li>Le pouvoir est partagé : <strong>deux consuls</strong> élus pour <strong>un an</strong> dirigent la cité.</li>
<li>Le <strong>Sénat</strong> conseille les magistrats. Devise : <strong>SPQR</strong>, « le Sénat et le peuple romain ».</li>
<li>Rome conquiert tout le tour de la Méditerranée.</li>
<li><strong>Jules César</strong> conquiert la Gaule : en <strong>−52</strong>, il bat <strong>Vercingétorix</strong> à <strong>Alésia</strong>. Il est assassiné en −44.</li>
</ul>
<div class="memo"><b>À retenir</b>Mythe : −753, Romulus et Rémus. Histoire : République en −509, consuls et Sénat, Alésia en −52.</div>`,
    questions:[
      {id:"q1", q:"Qui est le fondateur légendaire de Rome ?", c:["Romulus","Jules César","Auguste","Homère"], ex:"Romulus, jumeau de Rémus."},
      {id:"q2", q:"Date légendaire de la fondation de Rome :", c:["−753","−3300","−52","212"], ex:"−753, selon la tradition romaine."},
      {id:"q3", q:"Selon la légende, Romulus et Rémus ont été nourris par…", c:["une louve","une ourse","une chèvre","une lionne"], ex:"La louve est devenue le symbole de Rome."},
      {id:"q4", q:"En quelle année commence la République romaine ?", c:["−509","−753","−27","−776"], ex:"En −509, les Romains chassent leur dernier roi."},
      {id:"q5", q:"Sous la République, combien de consuls dirigent Rome ?", c:["Deux, élus pour un an","Un seul, à vie","Dix, élus pour cinq ans","Aucun"], ex:"Deux consuls, pour éviter qu’un seul homme ait tout le pouvoir."},
      {id:"q6", q:"Que se passe-t-il à Alésia en −52 ?", c:["César bat Vercingétorix","Romulus fonde Rome","Auguste devient empereur","Les Grecs fondent Marseille"], ex:"Cette victoire achève la conquête de la Gaule."},
      {id:"q7", q:"Que signifie SPQR ?", c:["Le Sénat et le peuple romain","Soldats pour la reine","Salut, peuple de Rome","Sénat, prêtres, questeurs, rois"], ex:"Senatus Populusque Romanus."},
      {id:"q8", q:"Complète : le héros troyen présenté comme l’ancêtre des Romains s’appelle…", t:["enee","énée"], ex:"Énée, héros de l’Énéide de Virgile."}
    ]
  },
  {
    id:"hi-6", name:"La naissance du monothéisme juif", rank:"C", req:10,
    boss:{name:"Le Lion du Désert", icon:"🦁"},
    lesson:`
<p>Au Proche-Orient, les <strong>Hébreux</strong> croient en un <strong>dieu unique</strong>, <strong>Yahvé</strong>. Croire en un seul dieu s’appelle le <strong>monothéisme</strong>.</p>
<h3>La Bible hébraïque</h3>
<p>Leur livre sacré est la <strong>Bible hébraïque</strong>, écrite progressivement au Ier millénaire av. J.-C. Ses cinq premiers livres forment la <strong>Torah</strong>.</p>
<h3>Les grands récits</h3>
<ul>
<li><strong>Abraham</strong> fait une alliance avec Dieu.</li>
<li><strong>Moïse</strong> guide les Hébreux hors d’Égypte (l’Exode) et reçoit les <strong>Dix Commandements</strong>.</li>
<li>Les rois <strong>David</strong> et <strong>Salomon</strong> règnent à <strong>Jérusalem</strong>. Salomon y fait construire le <strong>Temple</strong>.</li>
</ul>
<h3>L’histoire</h3>
<p>En <strong>−587</strong>, le roi de Babylone, Nabuchodonosor, détruit le Temple de Jérusalem et déporte une partie des Hébreux : c’est l’exil. Loin du Temple, ils se réunissent pour prier dans des <strong>synagogues</strong>.</p>
<div class="memo"><b>À retenir</b>Hébreux · Yahvé, dieu unique · Bible et Torah · Temple de Jérusalem · −587.</div>`,
    questions:[
      {id:"q1", q:"Que signifie « monothéisme » ?", c:["Croire en un seul dieu","Croire en plusieurs dieux","Ne croire en aucun dieu","Adorer le roi"], ex:"Mono = un seul, théos = dieu."},
      {id:"q2", q:"Comment s’appelle le dieu unique des Hébreux ?", c:["Yahvé","Zeus","Jupiter","Râ"], ex:"Zeus et Jupiter sont des dieux grecs et romains, Râ un dieu égyptien."},
      {id:"q3", q:"Qu’est-ce que la Torah ?", c:["Les cinq premiers livres de la Bible hébraïque","Un temple","Un roi des Hébreux","Une ville"], ex:"La Torah est le cœur de la Bible hébraïque."},
      {id:"q4", q:"Quel roi fait construire le Temple de Jérusalem ?", c:["Salomon","Moïse","Romulus","Hammurabi"], ex:"Salomon, fils de David."},
      {id:"q5", q:"Selon la Bible, qui reçoit les Dix Commandements ?", c:["Moïse","Abraham","David","Salomon"], ex:"Moïse, pendant l’Exode."},
      {id:"q6", q:"Que se passe-t-il en −587 ?", c:["Le Temple est détruit par Babylone","Rome est fondée","La démocratie naît à Athènes","L’écriture est inventée"], ex:"Nabuchodonosor détruit le Temple et déporte une partie des Hébreux."},
      {id:"q7", q:"Où les juifs se réunissent-ils pour prier ?", c:["À la synagogue","Au forum","À l’Ecclésia","Au Sénat"], ex:"La synagogue est le lieu de prière et d’étude."},
      {id:"q8", q:"Complète : la ville où se trouvait le Temple est…", t:["jerusalem","jérusalem"], ex:"Jérusalem."}
    ]
  },
  {
    id:"hi-7", name:"L’Empire romain", rank:"B", req:12,
    boss:{name:"L’Hydre des Frontières", icon:"🐲"},
    lesson:`
<h3>Auguste, premier empereur</h3>
<p>En <strong>−27</strong>, Octave reçoit le titre d’<strong>Auguste</strong>. Il devient le premier <strong>empereur</strong> : il concentre les pouvoirs politique, militaire et religieux. Les habitants lui rendent un <strong>culte</strong>.</p>
<h3>La paix romaine</h3>
<ul>
<li>Aux Ier et IIe siècles, l’Empire connaît une longue période de paix : la <strong>pax romana</strong>.</li>
<li>Ses frontières sont protégées par des fortifications : le <strong>limes</strong>.</li>
<li>Les peuples conquis adoptent le mode de vie romain : c’est la <strong>romanisation</strong>. On construit des villes avec forum, thermes, amphithéâtre et aqueducs, comme le <strong>pont du Gard</strong>.</li>
<li>En <strong>212</strong>, l’empereur <strong>Caracalla</strong> donne la citoyenneté romaine à tous les hommes libres de l’Empire.</li>
</ul>
<h3>Les chrétiens dans l’Empire</h3>
<ul>
<li>Le christianisme naît au Ier siècle autour de <strong>Jésus</strong>, en Palestine.</li>
<li>Les chrétiens refusent de rendre un culte à l’empereur : ils sont <strong>persécutés</strong>.</li>
<li>En <strong>313</strong>, l’empereur <strong>Constantin</strong> autorise le christianisme. À la fin du IVe siècle, il devient la religion officielle.</li>
</ul>
<h3>Rome et la Chine des Han</h3>
<p>Au même moment, la Chine des <strong>Han</strong> est aussi un grand empire. Les deux mondes échangent indirectement des produits (comme la soie) par les <strong>routes de la soie</strong>.</p>
<div class="memo"><b>À retenir</b>−27 Auguste · pax romana · romanisation · 212 Caracalla · 313 Constantin.</div>`,
    questions:[
      {id:"q1", q:"Qui est le premier empereur romain ?", c:["Auguste","Jules César","Romulus","Constantin"], ex:"Jules César n’a jamais porté le titre d’empereur."},
      {id:"q2", q:"En quelle année Octave devient-il Auguste ?", c:["−27","−753","212","313"], ex:"En −27 commence l’Empire."},
      {id:"q3", q:"Que signifie « pax romana » ?", c:["La paix romaine","La guerre romaine","Le pain romain","Le peuple romain"], ex:"Une longue période de paix aux Ier et IIe siècles."},
      {id:"q4", q:"Quel monument romain célèbre se trouve dans le Gard ?", c:["Un aqueduc : le pont du Gard","Une pyramide","Une grotte ornée","Un temple grec"], ex:"Il apportait l’eau jusqu’à la ville de Nîmes."},
      {id:"q5", q:"Que fait Caracalla en 212 ?", c:["Il donne la citoyenneté à tous les hommes libres","Il fonde Rome","Il détruit Jérusalem","Il interdit les Jeux olympiques"], ex:"L’édit de Caracalla, en 212."},
      {id:"q6", q:"Pourquoi les chrétiens sont-ils persécutés ?", c:["Ils refusent le culte de l’empereur","Ils refusent de payer les thermes","Ils parlent grec","Ils attaquent Rome"], ex:"Refuser le culte impérial était vu comme une trahison."},
      {id:"q7", q:"Quel empereur autorise le christianisme en 313 ?", c:["Constantin","Auguste","Caracalla","Néron"], ex:"Constantin, en 313."},
      {id:"q8", q:"Complète : les frontières fortifiées de l’Empire s’appellent le…", t:["limes"], ex:"Le limes."},
      {id:"q9", q:"Par quelles routes Rome et la Chine des Han échangeaient-elles ?", c:["Les routes de la soie","La route des épices du Nil","Le limes","Les voies de l’Olympe"], ex:"La soie chinoise arrivait jusqu’à Rome par de nombreux intermédiaires."}
    ]
  },
  {
    id:"hi-8", name:"Le grand lexique de la Préhistoire", rank:"B", req:13,
    boss:{name:"Le Gardien des Origines", icon:"🦴"},
    lesson:`
<p>Avant d’ouvrir ce dernier coffre de l’archipel, un gardien millénaire teste la mémoire du chasseur sur le lexique donné en classe. Voici les définitions à connaître, mot pour mot.</p>
<h3>Le lexique</h3>
<ul>
<li><strong>Archéologie</strong> : science étudiant le passé à partir de l’analyse de vestiges matériels.</li>
<li><strong>Bipédie</strong> : fait de marcher debout sur deux pieds de façon permanente.</li>
<li><strong>Chasseur-cueilleur</strong> : homme qui prélève son alimentation dans son environnement (par la chasse, la cueillette, la pêche).</li>
<li><strong>Espèce</strong> : ensemble d’individus qui peuvent se reproduire entre eux.</li>
<li><strong>Genre humain</strong> : le genre humain regroupe toutes les espèces d’hommes qui ont existé. En histoire, on le désigne par le mot scientifique <em>Homo</em> (qui signifie « homme » en latin), comme <em>Homo erectus</em> ou <em>Homo sapiens</em>.</li>
<li><strong>Hominidés</strong> : famille de grands mammifères totalement ou partiellement bipèdes.</li>
<li><strong>Néolithique</strong> : « âge de la pierre nouvelle », période de 10 000 à 3 300 avant J.-C. durant laquelle les êtres humains développent l’agriculture et l’élevage, puis deviennent sédentaires.</li>
<li><strong>Nomades</strong> : personnes qui se déplacent au fil des saisons.</li>
<li><strong>Paléolithique</strong> : « âge de la pierre taillée », première période de la préhistoire, se terminant vers 10 000 avant J.-C.</li>
<li><strong>Préhistoire</strong> : période qui débute avec l’apparition du genre humain (il y a 2,5 millions d’années) et s’achève avec l’apparition de l’écriture (vers 3 300 avant J.-C.).</li>
<li><strong>Préhumains</strong> : être vivant qui n’est pas encore un humain, mais qui possède déjà certains de nos caractères, comme la marche debout.</li>
<li><strong>Quadrupèdes</strong> : animaux qui marchent sur quatre pattes.</li>
<li><strong>Sédentaires</strong> : personnes qui ont un habitat fixe et qui vivent au même endroit toute l’année.</li>
</ul>
<div class="memo"><b>À retenir</b>Ce lexique reprend mot pour mot les définitions données en classe le 21 septembre. Apprends-les par cœur : elles tombent souvent telles quelles en contrôle.</div>`,
    questions:[
      {id:"q1", q:"Qu’est-ce que l’archéologie ?", c:["La science étudiant le passé à partir de l’analyse de vestiges matériels","La science qui étudie les étoiles","La science qui étudie les animaux vivants","La science qui étudie les volcans"], ex:"Archéologie : science étudiant le passé à partir de l’analyse de vestiges matériels."},
      {id:"q2", q:"Qu’est-ce que la bipédie ?", c:["Le fait de marcher debout sur deux pieds de façon permanente","Le fait de marcher à quatre pattes","Le fait de nager sous l’eau","Le fait de grimper aux arbres"], ex:"Bipédie : fait de marcher debout sur deux pieds de façon permanente."},
      {id:"q3", q:"Qu’est-ce qu’un chasseur-cueilleur ?", c:["Un homme qui prélève son alimentation dans son environnement (chasse, cueillette, pêche)","Un homme qui cultive des champs","Un homme qui élève des animaux","Un homme qui fabrique des outils en métal"], ex:"Chasseur-cueilleur : homme qui prélève son alimentation dans son environnement (par la chasse, la cueillette, la pêche)."},
      {id:"q4", q:"Une espèce, c’est un ensemble d’individus qui…", c:["peuvent se reproduire entre eux","vivent dans la même grotte","mangent la même chose","ont la même couleur de peau"], ex:"Espèce : ensemble d’individus qui peuvent se reproduire entre eux."},
      {id:"q5", q:"Que regroupe le « genre humain » ?", c:["Toutes les espèces d’hommes qui ont existé","Seulement Homo sapiens","Tous les grands singes","Tous les mammifères"], ex:"Le genre humain regroupe toutes les espèces d’hommes qui ont existé, désigné par le mot Homo."},
      {id:"q6", q:"Les Hominidés forment une famille de…", c:["grands mammifères totalement ou partiellement bipèdes","petits reptiles","oiseaux migrateurs","poissons préhistoriques"], ex:"Hominidés : famille de grands mammifères totalement ou partiellement bipèdes."},
      {id:"q7", q:"Le Néolithique se termine (en gros) vers quelle date ?", c:["3 300 avant J.-C.","10 000 avant J.-C.","300 avant J.-C.","l’an 1000"], ex:"Néolithique : « âge de la pierre nouvelle », période de 10 000 à 3 300 avant J.-C."},
      {id:"q8", q:"Que signifie « nomades » ?", c:["Des personnes qui se déplacent au fil des saisons","Des personnes qui vivent toujours au même endroit","Des personnes qui cultivent la terre","Des personnes qui écrivent sur des tablettes"], ex:"Nomades : personnes qui se déplacent au fil des saisons."},
      {id:"q9", q:"Le Paléolithique se termine (en gros) vers quelle date ?", c:["10 000 avant J.-C.","3 300 avant J.-C.","l’an 0","2,5 millions d’années avant notre ère"], ex:"Paléolithique : « âge de la pierre taillée », première période de la préhistoire, se terminant vers 10 000 avant J.-C."},
      {id:"q10", q:"Quand débute la Préhistoire ?", c:["Avec l’apparition du genre humain, il y a 2,5 millions d’années","Avec l’apparition de l’écriture","Avec l’apparition des dinosaures","Avec l’apparition de l’agriculture"], ex:"Préhistoire : période qui débute avec l’apparition du genre humain (il y a 2,5 millions d’années) et s’achève avec l’apparition de l’écriture (vers 3 300 avant J.-C.)."},
      {id:"q11", q:"Un « préhumain » est un être vivant qui…", c:["n’est pas encore un humain mais possède déjà certains de nos caractères","est un humain moderne","est un animal quelconque","n’a aucun lien avec l’être humain"], ex:"Préhumains : être vivant qui n’est pas encore un humain, mais qui possède déjà certains de nos caractères, comme la marche debout."},
      {id:"q12", q:"Un animal qui marche sur quatre pattes est un…", c:["quadrupède","bipède","hominidé","préhumain"], ex:"Quadrupèdes : animaux qui marchent sur quatre pattes."},
      {id:"q13", q:"Que signifie « sédentaires » ?", c:["Des personnes qui ont un habitat fixe et vivent au même endroit toute l’année","Des personnes qui se déplacent au fil des saisons","Des personnes qui chassent uniquement","Des personnes qui n’ont pas de maison"], ex:"Sédentaires : personnes qui ont un habitat fixe et qui vivent au même endroit toute l’année."},
      {id:"q14", q:"Écris, avec tes mots, la définition de la « bipédie ».", def:"le fait de marcher debout sur deux pieds de façon permanente", ex:"Bipédie : fait de marcher debout sur deux pieds de façon permanente."}
    ]
  }
  ]
}
);
