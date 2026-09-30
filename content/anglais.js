/* =====================================================================
   CONTENU — Matière : Anglais
   Un seul fichier par matière : plus simple à relire, à modifier et à
   faire grandir sans risquer de toucher aux autres matières.
   Règles : ne jamais renommer/supprimer un id existant. Ajouter les
   nouveaux donjons à la fin du tableau "dungeons". Voir aussi le guide
   complet dans content/_lisez-moi.js.
   ===================================================================== */
window.GAME_CONTENT.subjects.push(
{
  id:"en", name:"Anglais", region:"Archipel des Langues", color:"#4DB5FF",
  dungeons:[
  {
    id:"en-1", name:"Saluer et se présenter", rank:"E", req:1,
    boss:{name:"L’Orc de la Première Porte", icon:"👹"},
    lesson:`
<p>Pour saluer quelqu’un en anglais :</p>
<div class="tw"><table><tr><th>Anglais</th><th>Français</th></tr>
<tr><td><strong>Hello</strong> / <strong>Hi</strong></td><td>Bonjour / Salut</td></tr>
<tr><td><strong>Good morning</strong></td><td>Bonjour (le matin)</td></tr>
<tr><td><strong>Good afternoon</strong></td><td>Bonjour (l’après-midi)</td></tr>
<tr><td><strong>Good evening</strong></td><td>Bonsoir (en arrivant le soir)</td></tr>
<tr><td><strong>Good night</strong></td><td>Bonne nuit (en partant, avant d’aller dormir)</td></tr>
<tr><td><strong>Goodbye</strong> / <strong>Bye</strong></td><td>Au revoir</td></tr>
<tr><td><strong>See you!</strong></td><td>À plus tard !</td></tr></table></div>
<h3>Se présenter</h3>
<ul>
<li><em>What’s your name?</em> → <strong>My name is</strong> Léo. / <strong>I’m</strong> Léo.</li>
<li><em>How old are you?</em> → <strong>I’m eleven</strong> (years old).</li>
<li><em>Where are you from?</em> → <strong>I’m from</strong> France.</li>
<li><em>How are you?</em> → <strong>I’m fine, thank you.</strong></li>
<li><em>Nice to meet you!</em> → Enchanté(e) !</li>
</ul>
<div class="memo"><b>À retenir</b>Pour dire son âge, l’anglais utilise le verbe <strong>être</strong> : <em>I’m eleven</em>. On ne dit jamais « I have eleven ».</div>`,
    questions:[
      {id:"q1", q:"Comment demande-t-on le prénom de quelqu’un ?", c:["What's your name?","How are you?","Where are you from?","How old are you?"], ex:"What’s your name? = Comment tu t’appelles ?"},
      {id:"q2", q:"« How old are you? » Quelle réponse est correcte ?", c:["I'm eleven.","I have eleven.","I'm fine.","I'm from Paris."], ex:"Pour l’âge, on utilise be : I’m eleven. Jamais « I have eleven »."},
      {id:"q3", q:"Tu arrives chez un ami à 19 h. Tu dis :", c:["Good evening!","Good night!","Good afternoon!","Goodbye!"], ex:"Good evening se dit en arrivant le soir. Good night se dit en partant ou avant d’aller dormir."},
      {id:"q4", q:"Complète : « Where are you ___? » — « I'm from France. »", t:["from"], ex:"Where are you from? = D’où viens-tu ?"},
      {id:"q5", q:"Que signifie « Nice to meet you! » ?", c:["Enchanté(e) !","Au revoir !","À demain !","Bon appétit !"], ex:"On le dit quand on rencontre quelqu’un pour la première fois."},
      {id:"q6", q:"« How are you? » Quelle réponse est correcte ?", c:["I'm fine, thank you.","I'm eleven.","My name is Tom.","I'm from London."], ex:"How are you? = Comment vas-tu ? On répond I’m fine (je vais bien)."},
      {id:"q7", q:"Écris en anglais : « Au revoir »", t:["goodbye","bye","good bye","bye bye","good-bye"], ex:"Goodbye ou, plus familier, Bye."},
      {id:"q8", q:"Quelle salutation utilise-t-on à 15 h ?", c:["Good afternoon","Good morning","Good evening","Good night"], ex:"Afternoon = après-midi."}
    ]
  },
  {
    id:"en-2", name:"Nombres, couleurs et calendrier", rank:"E", req:2,
    boss:{name:"Le Golem des Chiffres", icon:"🗿"},
    lesson:`
<h3>Les nombres</h3>
<p>1 one · 2 two · 3 three · 4 four · 5 five · 6 six · 7 seven · 8 eight · 9 nine · 10 ten · 11 eleven · 12 twelve</p>
<p>De 13 à 19, on ajoute <strong>-teen</strong> : thirteen (13), fourteen (14), fifteen (15)… nineteen (19).</p>
<p>Les dizaines finissent par <strong>-ty</strong> : twenty (20), thirty (30), forty (40), fifty (50).</p>
<h3>Les couleurs</h3>
<p>red (rouge), blue (bleu), green (vert), yellow (jaune), orange, pink (rose), purple (violet), brown (marron), black (noir), white (blanc), grey (gris).</p>
<h3>Les jours</h3>
<p>Monday (lundi), Tuesday (mardi), Wednesday (mercredi), Thursday (jeudi), Friday (vendredi), Saturday (samedi), Sunday (dimanche).</p>
<h3>Les mois</h3>
<p>January, February, March, April, May, June, July, August, September, October, November, December.</p>
<div class="memo"><b>À retenir</b>En anglais, les jours et les mois prennent toujours une <strong>majuscule</strong> : <em>Monday, March</em>. Attention : thir<strong>teen</strong> = 13 mais thir<strong>ty</strong> = 30.</div>`,
    questions:[
      {id:"q1", q:"Écris le nombre 12 en anglais (en lettres).", t:["twelve"], ex:"12 = twelve."},
      {id:"q2", q:"Comment dit-on « mercredi » ?", c:["Wednesday","Tuesday","Thursday","Monday"], ex:"Wednesday = mercredi. Tuesday = mardi, Thursday = jeudi."},
      {id:"q3", q:"En anglais, les jours et les mois s’écrivent…", c:["avec une majuscule","avec une minuscule","tout en majuscules","avec un tiret"], ex:"On écrit Monday, April… toujours avec une majuscule."},
      {id:"q4", q:"« Thirteen », c’est :", c:["13","30","3","33"], ex:"-teen = de 13 à 19. -ty = les dizaines (thirty = 30)."},
      {id:"q5", q:"Quel mois vient après « March » ?", c:["April","May","February","June"], ex:"January, February, March, April…"},
      {id:"q6", q:"Écris le nombre 20 en anglais (en lettres).", t:["twenty"], ex:"20 = twenty."},
      {id:"q7", q:"Comment dit-on « jaune » ?", c:["yellow","purple","orange","brown"], ex:"yellow = jaune, purple = violet, brown = marron."},
      {id:"q8", q:"Traduis « dimanche » en anglais.", t:["sunday"], ex:"Sunday, avec une majuscule !"}
    ]
  },
  {
    id:"en-3", name:"Les verbes be et have got", rank:"D", req:3,
    boss:{name:"L’Arachne des Verbes", icon:"🕷️"},
    lesson:`
<h3>Be (être)</h3>
<div class="tw"><table><tr><th>Forme pleine</th><th>Forme courte</th><th>Négation</th></tr>
<tr><td>I am</td><td>I’m</td><td>I’m not</td></tr>
<tr><td>you are</td><td>you’re</td><td>you aren’t</td></tr>
<tr><td>he / she / it is</td><td>he’s / she’s / it’s</td><td>he isn’t</td></tr>
<tr><td>we / you / they are</td><td>we’re / they’re</td><td>they aren’t</td></tr></table></div>
<p>Question : on inverse le sujet et le verbe → <em>Are you happy?</em> <em>Is she your sister?</em></p>
<h3>Have got (avoir, posséder)</h3>
<ul>
<li>I / you / we / they <strong>have got</strong> (’ve got) → <em>I’ve got a cat.</em></li>
<li>he / she / it <strong>has got</strong> (’s got) → <em>She’s got a bike.</em></li>
<li>Négation : <strong>haven’t got</strong> / <strong>hasn’t got</strong></li>
<li>Question : <em>Have you got a pen?</em> <em>Has he got a dog?</em></li>
</ul>
<div class="memo"><b>À retenir</b>Avec <strong>he, she, it</strong> : <em>is</em> et <em>has got</em>. Avec les autres : <em>are</em> (ou <em>am</em> pour I) et <em>have got</em>.</div>`,
    questions:[
      {id:"q1", q:"She ___ my best friend.", c:["is","are","am","be"], ex:"Avec she : is."},
      {id:"q2", q:"They ___ in the garden.", c:["are","is","am","has"], ex:"Avec they : are."},
      {id:"q3", q:"I ___ eleven years old.", c:["am","is","are","have"], ex:"Avec I : am (I’m eleven)."},
      {id:"q4", q:"He ___ got a dog.", c:["has","have","is","are"], ex:"Avec he, she, it : has got."},
      {id:"q5", q:"We ___ got two cats.", c:["have","has","are","is"], ex:"Avec we : have got."},
      {id:"q6", q:"Écris la forme courte de « I am ».", t:["i'm","im"], ex:"I am → I’m."},
      {id:"q7", q:"Quelle question est correcte ?", c:["Have you got a pen?","Do you got a pen?","Has you got a pen?","You have got a pen?"], ex:"On inverse : Have + sujet + got…?"},
      {id:"q8", q:"Négation de « It is cold » :", c:["It isn't cold.","It not is cold.","It doesn't cold.","It aren't cold."], ex:"is not → isn’t."}
    ]
  },
  {
    id:"en-4", name:"La famille et la possession", rank:"D", req:5,
    boss:{name:"Le Serpent aux Mille Liens", icon:"🐍"},
    lesson:`
<h3>La famille</h3>
<div class="tw"><table><tr><th>Anglais</th><th>Français</th><th>Anglais</th><th>Français</th></tr>
<tr><td>mother / mum</td><td>mère</td><td>father / dad</td><td>père</td></tr>
<tr><td>sister</td><td>sœur</td><td>brother</td><td>frère</td></tr>
<tr><td>grandmother</td><td>grand-mère</td><td>grandfather</td><td>grand-père</td></tr>
<tr><td>aunt</td><td>tante</td><td>uncle</td><td>oncle</td></tr>
<tr><td>daughter</td><td>fille (de…)</td><td>son</td><td>fils</td></tr>
<tr><td>cousin</td><td>cousin(e)</td><td>parents</td><td>parents</td></tr></table></div>
<h3>Le cas possessif : ’s</h3>
<p><em>Tom<strong>’s</strong> sister</em> = la sœur de Tom. Le possesseur vient <strong>en premier</strong>.</p>
<p>Si le nom finit déjà par un -s de pluriel, on met seulement l’apostrophe : <em>my parents<strong>’</strong> car</em> = la voiture de mes parents.</p>
<h3>Les adjectifs possessifs</h3>
<p>my (mon), your (ton), <strong>his</strong> (son, à lui), <strong>her</strong> (son, à elle), its (son, pour une chose ou un animal), our (notre), your (votre), their (leur).</p>
<div class="memo"><b>À retenir</b>En anglais, le possessif dépend du <strong>propriétaire</strong> : <em>Paul and his mother</em>, <em>Sarah and her brother</em>.</div>`,
    questions:[
      {id:"q1", q:"La sœur de ta mère est ta…", c:["aunt","uncle","cousin","daughter"], ex:"aunt = tante, uncle = oncle."},
      {id:"q2", q:"Traduis « la sœur de Tom ».", c:["Tom's sister","the sister of Tom's","Tom sister","sister's Tom"], ex:"Le possesseur d’abord, puis ’s : Tom’s sister."},
      {id:"q3", q:"Sarah dit : « This is ___ brother. » (le frère de Sarah)", c:["her","his","its","their"], ex:"Le frère appartient à Sarah (une fille) → her."},
      {id:"q4", q:"Paul loves ___ dog.", c:["his","her","its","our"], ex:"Le chien appartient à Paul (un garçon) → his."},
      {id:"q5", q:"Écris en anglais : « grand-père ».", t:["grandfather","grandpa","granddad","grandad"], ex:"grandfather (familier : grandpa)."},
      {id:"q6", q:"« My parents' car » veut dire :", c:["la voiture de mes parents","la voiture de mon parent","les voitures de mes parents","mes parents en voiture"], ex:"parents finit par -s, on ajoute seulement l’apostrophe."},
      {id:"q7", q:"We love ___ school.", c:["our","their","your","my"], ex:"we → our (notre)."},
      {id:"q8", q:"« daughter » signifie :", c:["fille (l’enfant de quelqu’un)","fils","sœur","tante"], ex:"daughter = fille, son = fils."}
    ]
  },
  {
    id:"en-5", name:"Le présent simple", rank:"C", req:7,
    boss:{name:"Le Chevalier des Habitudes", icon:"💀"},
    lesson:`
<p>Le <strong>présent simple</strong> sert à parler des habitudes et des vérités générales : <em>I play football on Saturdays.</em></p>
<h3>La règle d’or : -s à la 3e personne</h3>
<ul>
<li>I / you / we / they <strong>play</strong></li>
<li>he / she / it <strong>plays</strong></li>
<li>Après -s, -sh, -ch, -x, -o on ajoute <strong>-es</strong> : watch → watch<strong>es</strong>, go → go<strong>es</strong></li>
<li>Consonne + y → <strong>-ies</strong> : study → stud<strong>ies</strong></li>
<li>have → <strong>has</strong></li>
</ul>
<h3>Négation et question</h3>
<ul>
<li><strong>don’t</strong> / <strong>doesn’t</strong> + verbe sans -s : <em>She doesn’t like fish.</em></li>
<li><strong>Do</strong> / <strong>Does</strong> + sujet + verbe : <em>Does he play tennis?</em></li>
</ul>
<h3>Les adverbes de fréquence</h3>
<p>always (toujours), usually (d’habitude), often (souvent), sometimes (parfois), never (jamais). Ils se placent <strong>avant le verbe</strong> : <em>I always walk to school.</em></p>
<div class="memo"><b>À retenir</b>He, she, it : le verbe prend un <strong>-s</strong>… sauf après <em>doesn’t</em> et <em>does</em>, qui l’ont déjà « pris ».</div>`,
    questions:[
      {id:"q1", q:"My brother ___ football every Saturday.", c:["plays","play","playing","is play"], ex:"my brother = he → plays."},
      {id:"q2", q:"She ___ TV after dinner.", c:["watches","watchs","watch","watching"], ex:"Après -ch, on ajoute -es : watches."},
      {id:"q3", q:"I ___ like carrots. (négation)", c:["don't","doesn't","not","isn't"], ex:"Avec I : don’t + verbe."},
      {id:"q4", q:"He ___ like spiders. (négation)", c:["doesn't","don't","isn't","not"], ex:"Avec he : doesn’t + verbe sans -s."},
      {id:"q5", q:"___ your sister speak Spanish?", c:["Does","Do","Is","Has"], ex:"your sister = she → Does."},
      {id:"q6", q:"Conjugue « to go » avec « he » au présent simple.", t:["goes","he goes"], ex:"go se termine par -o → goes."},
      {id:"q7", q:"Quelle phrase est correcte ?", c:["I always walk to school.","I walk always to school.","Always I walk to school.","I walk to school always."], ex:"L’adverbe de fréquence se place avant le verbe."},
      {id:"q8", q:"study → she ___ (présent simple)", t:["studies","she studies"], ex:"Consonne + y → -ies : studies."}
    ]
  },
  {
    id:"en-6", name:"L’école et le verbe can", rank:"C", req:9,
    boss:{name:"Le Dragon d’Ardoise", icon:"🐉"},
    lesson:`
<h3>Can (pouvoir, savoir faire)</h3>
<ul>
<li><strong>can</strong> + verbe, <strong>identique à toutes les personnes</strong> : <em>I can swim. She can swim.</em></li>
<li>Jamais de -s, jamais de <em>to</em> après : <em>He can play</em> (pas « cans », pas « can to play »).</li>
<li>Négation : <strong>can’t</strong> (cannot) → <em>I can’t dance.</em></li>
<li>Question : <em>Can you ride a bike?</em> → <strong>Yes, I can.</strong> / <strong>No, I can’t.</strong></li>
</ul>
<h3>Les matières</h3>
<p>Maths, English, French, History, Geography, Science, <strong>PE</strong> (EPS, le sport), Art, Music.</p>
<h3>Le matériel</h3>
<p>pen (stylo), pencil (crayon), <strong>ruler</strong> (règle), rubber (gomme), <strong>pencil case</strong> (trousse), schoolbag (cartable), exercise book (cahier).</p>
<div class="memo"><b>À retenir</b>Après <strong>can</strong>, le verbe reste nu : <em>can + play</em>. Pour répondre, on reprend can : <em>Yes, I can.</em></div>`,
    questions:[
      {id:"q1", q:"She ___ swim very well.", c:["can","cans","can to","is can"], ex:"can est identique à toutes les personnes."},
      {id:"q2", q:"« Can you ride a bike? » Réponse courte positive :", c:["Yes, I can.","Yes, I do.","Yes, I am.","Yes, I ride."], ex:"On répond avec l’auxiliaire de la question : can."},
      {id:"q3", q:"Négation de « I can dance » :", c:["I can't dance.","I don't can dance.","I can dance not.","I not can dance."], ex:"can + not → can’t."},
      {id:"q4", q:"« PE » à l’école, c’est :", c:["l’EPS (le sport)","la physique","le français","les arts plastiques"], ex:"PE = Physical Education."},
      {id:"q5", q:"Traduis « une règle » (pour tracer des traits).", t:["ruler","a ruler"], ex:"ruler = règle."},
      {id:"q6", q:"« pencil case » signifie :", c:["trousse","taille-crayon","cartable","crayon de couleur"], ex:"pencil case = trousse."},
      {id:"q7", q:"Quelle phrase est correcte ?", c:["He can play the guitar.","He cans play the guitar.","He can plays the guitar.","He can to play the guitar."], ex:"can + verbe sans -s et sans to."},
      {id:"q8", q:"Traduis la matière « la musique ».", t:["music"], ex:"Music, avec une majuscule quand c’est la matière."}
    ]
  },
  {
    id:"en-7", name:"Les nombres", rank:"C", req:11,
    boss:{name:"Le Kraken des Grands Nombres", icon:"🐙"},
    tierLabels:{1:"0 à 20", 2:"20 à 100", 3:"1000 et plus"},
    lesson:`
<h3>De 0 à 20</h3>
<p>zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.</p>
<h3>De 20 à 100 : les dizaines</h3>
<p>twenty (20), thirty (30), <strong>forty</strong> (40, sans « u » !), fifty (50), sixty (60), seventy (70), eighty (80), ninety (90).</p>
<p>Pour les nombres composés, on ajoute un <strong>tiret</strong> entre la dizaine et l’unité : <em>twenty-one</em> (21), <em>forty-seven</em> (47), <em>ninety-nine</em> (99).</p>
<h3>1000 et au-delà</h3>
<p>Au-delà de 100, l’anglais construit les nombres avec des briques simples : <strong>hundred</strong> (cent), <strong>thousand</strong> (mille), <strong>million</strong> (million).</p>
<div class="tw"><table><tr><th>Nombre</th><th>En anglais</th></tr>
<tr><td>100</td><td>one hundred <em>(ou a hundred)</em></td></tr>
<tr><td>150</td><td>one hundred <strong>and</strong> fifty</td></tr>
<tr><td>300</td><td>three hundred</td></tr>
<tr><td>999</td><td>nine hundred and ninety-nine</td></tr>
<tr><td>1 000</td><td>one thousand <em>(ou a thousand)</em></td></tr>
<tr><td>2 500</td><td>two thousand five hundred</td></tr>
<tr><td>10 000</td><td>ten thousand</td></tr>
<tr><td>1 000 000</td><td>one million</td></tr></table></div>
<h3>Deux règles à ne jamais oublier</h3>
<ul>
<li><strong>hundred</strong>, <strong>thousand</strong> et <strong>million</strong> ne prennent <strong>jamais de -s</strong> quand ils sont précédés d’un nombre : <em>three hundred</em> (jamais <em>three hundreds</em>).</li>
<li>En anglais <strong>britannique</strong>, on met <strong>and</strong> entre les centaines et le reste : <em>two hundred and twenty</em>. En anglais <strong>américain</strong>, on peut l’omettre : <em>two hundred twenty</em>. Les deux sont compris.</li>
</ul>
<div class="memo"><b>À retenir</b>0-20 : des mots à connaître par cœur. 20-100 : dizaine + tiret + unité. 1000+ : hundred / thousand / million restent invariables, and avant les dizaines (anglais britannique).</div>`,
    questions:[
      {id:"q1", tier:1, q:"Écris 7 en anglais.", t:["seven"], ex:"7 = seven."},
      {id:"q2", tier:1, q:"Comment dit-on 13 ?", c:["thirteen","thirty","three","thirtieth"], ex:"13 = thirteen (à ne pas confondre avec thirty, 30)."},
      {id:"q3", tier:1, q:"Écris 19 en anglais.", t:["nineteen"], ex:"19 = nineteen."},
      {id:"q4", tier:1, q:"Comment dit-on 11 ?", c:["eleven","eleventh","ten one","onety-one"], ex:"11 = eleven (un mot à part, comme twelve pour 12)."},
      {id:"q5", tier:1, q:"Écris 0 en anglais.", t:["zero"], ex:"0 = zero."},
      {id:"q6", tier:1, q:"Comment dit-on 16 ?", c:["sixteen","sixty","six","sixteenth"], ex:"16 = sixteen. Attention à ne pas confondre avec sixty (60)."},
      {id:"q7", tier:2, q:"Comment dit-on 20 ?", c:["twenty","twoty","twentieth","two-ty"], ex:"20 = twenty."},
      {id:"q8", tier:2, q:"47 s’écrit en anglais :", c:["forty-seven","fourty-seven","forty seven's","four-seven-ty"], ex:"forty s’écrit sans « u », contrairement à four."},
      {id:"q9", tier:2, q:"90 s’écrit en anglais :", c:["ninety","ninty","nine-ty","ninetieth"], ex:"90 = ninety."},
      {id:"q10", tier:2, q:"Écris 21 en anglais (avec le tiret).", t:["twenty-one","twenty one"], ex:"21 = twenty-one, avec un tiret entre la dizaine et l’unité."},
      {id:"q11", tier:2, q:"99 s’écrit en anglais :", c:["ninety-nine","ninety nine's","nine-ty-nine","ninetynine"], ex:"99 = ninety-nine."},
      {id:"q12", tier:2, q:"Écris 72 en anglais.", t:["seventy-two","seventy two"], ex:"72 = seventy-two."},
      {id:"q13", tier:3, q:"Comment écrit-on 100 en anglais ?", c:["one hundred","hundred one","hundreds","one hundred's"], ex:"100 = one hundred (ou a hundred)."},
      {id:"q14", tier:3, q:"245 s’écrit en anglais :", c:["two hundred and forty-five","two hundred forty five's","two hundreds and forty-five","two-hundred-forty-five"], ex:"two hundred and forty-five, avec and avant les unités."},
      {id:"q15", tier:3, q:"Quelle phrase respecte la règle du -s ?", c:["I have three hundred stickers.","I have three hundreds stickers.","I have threehundred stickers.","I have three-hundreds stickers."], ex:"hundred ne prend jamais de -s après un nombre précis."},
      {id:"q16", tier:3, q:"Écris 1000 en anglais (en lettres).", t:["one thousand","a thousand"], ex:"1000 = one thousand."},
      {id:"q17", tier:3, q:"10 000 s’écrit en anglais :", c:["ten thousand","ten thousands","one ten thousand","hundred thousand"], ex:"10 000 = ten thousand."},
      {id:"q18", tier:3, q:"1 000 000 s’écrit en anglais :", c:["one million","one millions","thousand thousand","hundred thousand"], ex:"1 000 000 = one million."},
      {id:"q19", tier:3, q:"En anglais britannique, 220 s’écrit avec « and » :", c:["two hundred and twenty","two hundred twenty and","and two hundred twenty","two hundred twenty's"], ex:"two hundred AND twenty, and se place avant les dizaines."}
    ]
  },
  {
    id:"en-8", name:"Le calendrier anglo-saxon", rank:"B", req:12,
    boss:{name:"Le Hibou des Quatre Saisons", icon:"🦉"},
    lesson:`
<h3>Les jours, en abrégé</h3>
<p>À l’écrit, on abrège souvent les jours sur trois lettres : <strong>Mon</strong> (Monday), <strong>Tue</strong> (Tuesday), <strong>Wed</strong> (Wednesday), <strong>Thu</strong> (Thursday), <strong>Fri</strong> (Friday), <strong>Sat</strong> (Saturday), <strong>Sun</strong> (Sunday).</p>
<h3>Les mois, en abrégé</h3>
<p><strong>Jan</strong>, <strong>Feb</strong>, <strong>Mar</strong>, <strong>Apr</strong>, May <em>(pas d’abréviation)</em>, <strong>Jun</strong>, <strong>Jul</strong>, <strong>Aug</strong>, <strong>Sep</strong>, <strong>Oct</strong>, <strong>Nov</strong>, <strong>Dec</strong>.</p>
<h3>Les quatre saisons</h3>
<div class="tw"><table><tr><th>Saison</th><th>Anglais britannique</th><th>Anglais américain</th></tr>
<tr><td>Printemps</td><td colspan="2">spring</td></tr>
<tr><td>Été</td><td colspan="2">summer</td></tr>
<tr><td>Automne</td><td><strong>autumn</strong></td><td><strong>fall</strong></td></tr>
<tr><td>Hiver</td><td colspan="2">winter</td></tr></table></div>
<p>Les deux mots pour l’automne sont corrects : <em>autumn</em> est plus utilisé au Royaume-Uni, <em>fall</em> aux États-Unis.</p>
<div class="memo"><b>À retenir</b>Les jours et les mois gardent toujours leur majuscule, même abrégés : <em>Wed</em>, <em>Oct</em>. Automne = autumn (UK) ou fall (US).</div>`,
    questions:[
      {id:"q1", q:"L’abréviation « Wed » correspond à :", c:["Wednesday","Tuesday","Thursday","Sunday"], ex:"Wed = Wednesday (mercredi)."},
      {id:"q2", q:"L’abréviation « Oct » correspond à :", c:["October","September","November","August"], ex:"Oct = October (octobre)."},
      {id:"q3", q:"Comment dit-on « l’automne » en anglais britannique ?", c:["autumn","fall","summer","winter"], ex:"autumn, davantage utilisé au Royaume-Uni."},
      {id:"q4", q:"Comment dit-on « l’automne » en anglais américain ?", c:["fall","autumn","spring","winter"], ex:"fall, davantage utilisé aux États-Unis."},
      {id:"q5", q:"Quelle saison vient juste après « summer » ?", c:["autumn (ou fall)","winter","spring","May"], ex:"L’ordre est spring, summer, autumn/fall, winter."},
      {id:"q6", q:"Écris en anglais « le printemps ».", t:["spring"], ex:"spring = le printemps."},
      {id:"q7", q:"Écris l’abréviation à trois lettres de « Friday ».", t:["fri"], ex:"Fri = Friday."},
      {id:"q8", q:"Quel mois vient juste avant « December » ?", c:["November","January","October","September"], ex:"…October, November, December."}
    ]
  },
  {
    id:"en-9", name:"Les dates et les nationalités", rank:"B", req:13,
    boss:{name:"Le Griffon des Nations", icon:"🦅"},
    lesson:`
<h3>Les nombres ordinaux (pour les dates)</h3>
<p>1st <strong>first</strong> · 2nd <strong>second</strong> · 3rd <strong>third</strong> · 4th <strong>fourth</strong> · 5th fifth… La plupart se terminent par <strong>-th</strong>, sauf les trois premiers. On retrouve <strong>-st, -nd, -rd</strong> aussi pour 21st (twenty-first), 22nd (twenty-second), 23rd (twenty-third), 31st (thirty-first).</p>
<h3>Deux façons d’écrire une date</h3>
<div class="tw"><table><tr><th></th><th>Ordre</th><th>Exemple pour le 4 juillet 2026</th></tr>
<tr><td><strong>Anglais britannique</strong></td><td>jour / mois / année</td><td>04/07/2026 → <em>the fourth of July</em></td></tr>
<tr><td><strong>Anglais américain</strong></td><td>mois / jour / année</td><td>07/04/2026 → <em>July fourth</em></td></tr></table></div>
<div class="memo"><b>Attention au piège</b>07/04/2026 signifie le <strong>7 avril</strong> pour un Britannique, mais le <strong>4 juillet</strong> pour un Américain !</div>
<h3>Les nationalités</h3>
<p>L’adjectif de nationalité prend toujours une <strong>majuscule</strong> en anglais.</p>
<div class="tw"><table><tr><th>Pays</th><th>Nationalité</th></tr>
<tr><td>France</td><td><strong>French</strong></td></tr>
<tr><td>England / the UK</td><td><strong>British</strong> (ou English)</td></tr>
<tr><td>the United States</td><td><strong>American</strong></td></tr>
<tr><td>Germany</td><td><strong>German</strong></td></tr>
<tr><td>Spain</td><td><strong>Spanish</strong></td></tr>
<tr><td>Italy</td><td><strong>Italian</strong></td></tr></table></div>`,
    questions:[
      {id:"q1", q:"Comment écrit-on « 1er » en anglais (nombre ordinal) ?", c:["first","one-th","onest","firth"], ex:"1st = first."},
      {id:"q2", q:"Quel est l’ordinal de « twenty » (20) ?", c:["twentieth","twentyth","twenteeth","twoentieth"], ex:"20 → twentieth."},
      {id:"q3", q:"En anglais britannique, une date s’écrit dans l’ordre :", c:["jour / mois / année","mois / jour / année","année / mois / jour","mois / année / jour"], ex:"Comme en français : jour, mois, année."},
      {id:"q4", q:"En anglais américain, une date s’écrit dans l’ordre :", c:["mois / jour / année","jour / mois / année","année / jour / mois","jour / année / mois"], ex:"L’ordre américain commence par le mois."},
      {id:"q5", q:"Pour un Britannique, 07/04/2026 signifie :", c:["le 7 avril 2026","le 4 juillet 2026","le 4 avril 2026","le 7 juillet 2026"], ex:"Un Britannique lit jour/mois : le 7 avril."},
      {id:"q6", q:"Pour un Américain, 07/04/2026 signifie :", c:["le 4 juillet 2026","le 7 avril 2026","le 7 juillet 2026","le 4 avril 2026"], ex:"Un Américain lit mois/jour : le 4 juillet."},
      {id:"q7", q:"Une personne qui vient de France est :", c:["French","France","Frenchman only","Français"], ex:"L’adjectif de nationalité est French, avec une majuscule."},
      {id:"q8", q:"Une personne qui vient des États-Unis est :", c:["American","America","US-ian","Unitedstatian"], ex:"American, avec une majuscule."},
      {id:"q9", q:"Quelle est la nationalité d’une personne qui vient d’Espagne ?", t:["spanish"], ex:"Spanish."}
    ]
  }
  ]
}
);
