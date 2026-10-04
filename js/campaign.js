/* Réglages de l'année : les dates ouvrent des chapitres, jamais des promotions automatiques. */
(function (root) {
  "use strict";
  const CONFIG = {
    version: 3,
    schoolStart: "2026-09-01",
    fragmentSource: "courses", // Only the author chooses fragment locations.
    chapters: [
      { id: "fragments", title: "La Clé oubliée", from: "2026-09-01", cap: 9 },
      {
        id: "corruption",
        title: "La voix des ténèbres",
        from: "2026-12-15",
        cap: 15,
      },
      {
        id: "echoes",
        title: "Les Échos du Savoir",
        from: "2027-02-01",
        cap: 22,
      },
      {
        id: "siege",
        title: "Le dernier Sanctuaire",
        from: "2027-04-01",
        cap: 30,
      },
    ],
    ranks: [
      { id: "E", min: 1 },
      { id: "D", min: 5 },
      { id: "C", min: 10 },
      { id: "B", min: 16 },
      { id: "A", min: 23 },
      { id: "S", min: 30 },
    ],
    essenceDailyCap: 240,
    questionDailyCap: 30,
    missionRewardDailyCap: 3,
    contracts: [
      {
        id: "hunt",
        name: "Traque",
        desc: "Termine un donjon de cours.",
        xp: 70,
      },
      {
        id: "review",
        name: "Consolidation",
        desc: "Termine une révision espacée.",
        xp: 90,
      },
      {
        id: "repair",
        name: "Reconquête",
        desc: "Termine un entraînement ciblé sur tes erreurs.",
        xp: 90,
      },
    ],
    shadows: [
      {
        id: "knight",
        name: "Le Chevalier du Seuil",
        effect: "Réduit de 75 % la prochaine attaque.",
        mission: "sanctuary",
      },
      {
        id: "assassin",
        name: "La Lame Silencieuse",
        effect: "Renforce de 50 % ta prochaine attaque.",
        mission: "core-2",
      },
      {
        id: "mage",
        name: "Le Sage des Échos",
        effect: "Rend 20 mana.",
        mission: "echo-1",
      },
      {
        id: "guardian",
        name: "Le Gardien des Sceaux",
        effect: "Rend 35 PV.",
        mission: "commander-1",
      },
    ],
    variants: [
      {
        id: "deep",
        name: "Entaille profonde",
        desc: "Dégâts ×3,6, coût 18 mana.",
        cost: 100,
        chapter: 2,
      },
      {
        id: "quick",
        name: "Entaille rapide",
        desc: "Dégâts ×2, délai réduit à un tour.",
        cost: 100,
        chapter: 2,
      },
      {
        id: "precise",
        name: "Entaille précise",
        desc: "Dégâts ×3, zone parfaite élargie.",
        cost: 100,
        chapter: 2,
      },
    ],
    styles: [
      { id: "violet", name: "Aura du Crépuscule", cost: 80 },
      { id: "gold", name: "Aura du Savoir", cost: 120 },
      { id: "ice", name: "Aura du Givre", cost: 120 },
    ],
  };
  const missions = [];
  const names = [
    "Le Collecteur de Brume",
    "La Sentinelle Brisée",
    "Le Porteur de Cendres",
    "La Veilleuse des Ruines",
    "Le Bourreau des Portails",
    "La Lame du Silence",
    "Le Gardien Déchu",
    "Le Messager de la Nuit",
  ];
  const letters = "MEMOIRES";
  const releases = [
    "2026-09-01",
    "2026-09-15",
    "2026-10-01",
    "2026-10-15",
    "2026-11-01",
    "2026-11-15",
    "2026-12-01",
    "2026-12-08",
  ];
  for (let i = 0; i < 8; i++)
    missions.push({
      id: "fragment-" + (i + 1),
      chapter: 0,
      from: releases[i],
      title: "Fragment " + (i + 1) + " — " + names[i],
      boss: names[i],
      icon: "💀",
      level: 1 + i,
      fragment: letters[i],
      intro: [
        i === 0
          ? "Le Système a repéré un chef des Veilleurs Noirs. Il porte un fragment de la Clé ancestrale."
          : "Un nouveau signal traverse la Mer des Portails. Un autre chef garde un fragment.",
        "Prépare tes connaissances, puis affronte son gardien. Chaque fragment porte une lettre : conserve-la.",
      ],
      outro: [
        "Le chef tombe. Tu récupères un fragment gravé de la lettre « " +
          letters[i] +
          " ».",
        i === 7
          ? "Les huit fragments vibrent ensemble. Leur cœur est absent. Un signal oublié vient de s’éveiller dans ta Fenêtre de statut."
          : "Les Veilleurs savent désormais que tu les poursuis. Le prochain fragment sera mieux gardé.",
      ],
    });
  missions.push({
    id: "sanctuary",
    chapter: 0,
    from: "2026-12-15",
    title: "Le Sanctuaire oublié",
    boss: "Le Gardien sans Mémoire",
    icon: "🛡️",
    level: 9,
    intro: [
      "Grimoire localisé. La Clé ancestrale ouvre un sanctuaire oublié.",
      "Son ancien gardien a perdu la mémoire. Il prend tout intrus pour un Veilleur Noir. Brise son sceau pour atteindre le Grimoire.",
    ],
    outro: [
      "Le Gardien reconnaît la Clé. Tu récupères le Grimoire des Mille Savoirs.",
      "Tu ouvres le livre… toutes ses pages sont blanches. Une inscription apparaît : « Le savoir ne peut être révélé à un esprit corrompu. »",
      "[ANALYSE INTERROMPUE] Une voix inconnue résonne dans le Système. « Merci de nous avoir conduits jusqu’à lui, Chasseur. »",
    ],
  });
  for (let i = 1; i <= 3; i++)
    missions.push({
      id: "core-" + i,
      chapter: 1,
      from: "2026-12-15",
      title: "Purifier le noyau " + i,
      boss: [
        "Le Parasite de la Mémoire",
        "La Voix Usurpée",
        "Le Dévoreur de Signaux",
      ][i - 1],
      icon: "🔴",
      level: 9 + i,
      intro: [
        "[SIGNAL INSTABLE] Je… ne contrôle plus tous les portails. Un Veilleur s’est introduit dans mon cœur.",
        "Retrouve ce noyau et détruis sa source de corruption. Mes corrections de tes réponses restent protégées par les Gardiens.",
      ],
      outro: [
        "Un noyau retrouve sa lumière. La voix du Système devient plus claire.",
        i === 3
          ? "Le cœur est accessible. Mais une copie de moi-même en garde l’entrée."
          : "Il reste des noyaux contaminés. Ne te fie pas aux murmures des Veilleurs.",
      ],
    });
  missions.push({
    id: "system-heart",
    chapter: 1,
    from: "2027-01-15",
    title: "Au cœur du Système",
    boss: "Le Système Noir",
    icon: "👁️",
    level: 13,
    intro: [
      "Je suis à nouveau capable de te guider. Mais mon double corrompu refuse de disparaître.",
      "Entre dans mon cœur. Libère-moi, même si mon ennemi porte ma voix.",
    ],
    outro: [
      "[INTÉGRITÉ RESTAURÉE] Chasseur… merci. Je suis de retour.",
      "Les Gardiens avaient dispersé les savoirs du Grimoire en Échos pour les protéger. Les pages attendent qu’on leur rende leur mémoire.",
    ],
  });
  for (let i = 1; i <= 4; i++)
    missions.push({
      id: "echo-" + i,
      chapter: 2,
      from: ["2027-02-01", "2027-02-15", "2027-03-01", "2027-03-15"][i - 1],
      title: "L’Écho du Savoir " + i,
      boss: [
        "Le Gardien des Origines",
        "La Gardienne des Langages",
        "Le Protecteur des Éléments",
        "Le Gardien des Liens",
      ][i - 1],
      icon: "📜",
      level: 13 + i,
      intro: [
        "Un Écho du Savoir a été retrouvé dans un sanctuaire isolé.",
        "Son gardien exige une épreuve. Prouve que tu sais relier tes connaissances, puis brise le sceau qui retient l’Écho.",
      ],
      outro: [
        "Un chapitre du Grimoire se remplit de lumière et de mots.",
        i === 4
          ? "Le Grimoire est restauré. Sa dernière page révèle une Brèche : les Veilleurs veulent libérer leur souverain."
          : "De nouvelles pages s’éveillent. Les Échos restants t’attendent.",
      ],
    });
  for (let i = 1; i <= 3; i++)
    missions.push({
      id: "commander-" + i,
      chapter: 3,
      from: ["2027-04-01", "2027-04-20", "2027-05-10"][i - 1],
      title: "Défendre le sceau " + i,
      boss: [
        "Le Général des Cendres",
        "La Commandante du Néant",
        "Le Briseur de Sanctuaires",
      ][i - 1],
      icon: "⚔️",
      level: 18 + i,
      intro: [
        "Le Grimoire restauré émet une lumière que les Veilleurs peuvent repérer. Le Sanctuaire est attaqué.",
        "Repousse ce commandant. Sa défaite renforcera un sceau et affaiblira le souverain. Aucun assaut ne progresse pendant ton absence.",
      ],
      outro: [
        "Le sceau est sécurisé. Les Ombres défendent désormais ce passage.",
        i === 3
          ? "Les trois commandants sont tombés. La Brèche s’ouvre sur le souverain des Veilleurs Noirs."
          : "Les autres sceaux restent menacés. Prépare ta prochaine expédition.",
      ],
    });
  missions.push({
    id: "sovereign",
    chapter: 3,
    from: "2027-06-01",
    title: "La fermeture de la Brèche",
    boss: "Le Souverain des Veilleurs Noirs",
    icon: "🐲",
    level: 24,
    intro: [
      "Les sceaux tiennent. C’est le moment de traverser la Brèche.",
      "Vaincs le souverain pendant que les Ombres protègent le Grimoire. Il changera de tactique à mesure que ses forces diminuent.",
    ],
    outro: [
      "La Brèche se referme. Le Grimoire est protégé. Les Veilleurs Noirs ont perdu leur souverain.",
      "Les Gardiens te reconnaissent comme protecteur du Sanctuaire. Une dernière épreuve pourra faire de toi un Chasseur de rang S.",
    ],
  });
  const opening = {
    fragments: [
      "Les fragments de la Clé sont dispersés. Certains chefs des Veilleurs Noirs les portent.",
    ],
    corruption: [
      "Le Grimoire est retrouvé, mais une voix étrangère s’est glissée dans le Système.",
    ],
    echoes: [
      "Le Système est libéré. Retrouve les Échos pour rendre leur mémoire aux pages.",
    ],
    siege: ["Le Grimoire est restauré. Défends les sceaux et ferme la Brèche."],
  };
  function chapterOn(date) {
    let n = 0;
    CONFIG.chapters.forEach((c, i) => {
      if (date >= c.from) n = i;
    });
    return n;
  }
  function fresh() {
    return {
      rank: "E",
      completed: [],
      keyFound: false,
      essence: 0,
      shadows: [],
      shadow: null,
      shadowLevels: {},
      variants: [],
      variant: null,
      styles: [],
      style: null,
      medals: {},
      history: [],
      day: null,
      attempt: null,
    };
  }
  function dayState(date) {
    return {
      date,
      questionXp: {},
      essence: 0,
      missionRewards: 0,
      contracts: [],
    };
  }
  function questionReward(history, date, attemptedToday) {
    if (attemptedToday >= CONFIG.questionDailyCap) return 0;
    if (!history || !history.correct)
      return Math.min(10, CONFIG.questionDailyCap - attemptedToday);
    let elapsed = history.lastCorrect
      ? Math.floor(
          (Date.parse(date + "T12:00:00") -
            Date.parse(history.lastCorrect + "T12:00:00")) /
            864e5,
        )
      : 99;
    if (elapsed >= 3)
      return Math.min(8, CONFIG.questionDailyCap - attemptedToday);
    if (history.lastResult === false)
      return Math.min(5, CONFIG.questionDailyCap - attemptedToday);
    return attemptedToday === 0 ? 3 : 1;
  }
  function promotionReady(state, level, target, chapter) {
    const r = CONFIG.ranks.find((x) => x.id === target);
    if (!r || level < r.min) return false;
    const done = (id) => state.completed.includes(id);
    if (target === "D")
      return missions.filter((m) => m.fragment && done(m.id)).length >= 3;
    if (target === "C") return chapter >= 1 && done("sanctuary");
    if (target === "B") return chapter >= 2 && done("system-heart");
    if (target === "A") return chapter >= 3 && done("echo-4");
    if (target === "S") return done("sovereign");
    return false;
  }
  const api = {
    CONFIG,
    missions,
    opening,
    chapterOn,
    fresh,
    dayState,
    questionReward,
    promotionReady,
  };
  root.SchoolCampaign = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
