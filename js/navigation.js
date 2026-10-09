
/*
 * LEVEL UP — NAVIGATION
 *
 * Déblocage manuel centralisé des matières.
 * Les autres comportements de navigation
 * sont conservés.
 */

"use strict";

const MAP_PAGE_SIZE = 6;
const COURSE_PAGE_SIZE = 10;

function pageIndex(value, length, size) {
  return Math.max(
    0,
    Math.min(
      Number(value) || 0,
      Math.max(0, Math.ceil(length / size) - 1)
    )
  );
}

function pagination(page, total, size, kind) {
  const pages = Math.ceil(total / size);

  if (pages <= 1) return "";

  return `<nav class="map-pagination" aria-label="Pagination">
    <button class="btn"
      data-act="mappage"
      data-kind="${kind}"
      data-page="${page - 1}"
      ${page === 0 ? "disabled" : ""}>
      Précédent
    </button>
    <span>${page + 1} / ${pages}</span>
    <button class="btn"
      data-act="mappage"
      data-kind="${kind}"
      data-page="${page + 1}"
      ${page >= pages - 1 ? "disabled" : ""}>
      Suivant
    </button>
  </nav>`;
}

function badgeChef(d) {
  return estChef(d)
    ? '<span class="role-badge chief-badge">Chef des Veilleurs Noirs</span>'
    : '<span class="role-badge">Sentinelle</span>';
}

/* ==========================================
   CONFIGURATION MANUELLE DES MATIÈRES
   ==========================================

   C'est ici qu'on débloque les matières.

   Identifiants :
   en = Anglais
   hi = Histoire-Géographie
   pc = Physique-Chimie
   fr = Français
   es = Espagnol

   Pour débloquer une matière :
   ajouter son identifiant dans la liste.

   Exemple :
   ["en", "hi", "fr"]

   Pour tout débloquer :
   ARCHIPELS_VERROUILLES = false

   Ce système est indépendant des sauvegardes.
   ========================================== */

let ARCHIPELS_VERROUILLES = true;


let ARCHIPELS_OUVERTS = [
    // "en", // Anglais
    // "hi", // Histoire-Géographie
    // "pc", // Physique-Chimie
    // "fr", // Français
    // "es"  // Espagnol
];

/*
 * Point d'entrée unique pour le contrôle
 * des matières dans tout le jeu.
 */
function archipelBloque(id) {
  if (!ARCHIPELS_VERROUILLES) {
    return false;
  }

  // Compatibilité éventuelle avec l'alias hg.
  const matiereId = id === "hg" ? "hi" : id;

  return !ARCHIPELS_OUVERTS.includes(matiereId);
}

/* ==========================================
   CARTE COMPACTE D'ORIGINE
   ========================================== */

function carteMatiereCompacte(subject) {
  const islands = subject.dungeons
    .slice(0, 5)
    .map((d, i) =>
      svgIle(
        62 + i * 42,
        72 + (i % 2) * 16,
        20,
        hacherTexte(d.id),
        S.dungeons[d.id]?.cleared ? GOLD : subject.color,
        false
      )
    )
    .join("");

  const done = subject.dungeons.filter(
    d => S.dungeons[d.id]?.cleared
  ).length;

  if (archipelBloque(subject.id)) {
    return `<button
      class="subject-island locked"
      disabled
      aria-disabled="true">
      <svg viewBox="0 0 300 135" aria-hidden="true">
        ${defsOcean(300, 135, hacherTexte(subject.id))}
        ${islands}
      </svg>
      <strong>
        ${esc(subject.name)}
        <span class="soonbadge">🔒</span>
      </strong>
      <span>
        ${esc(subject.region || "Archipel du Savoir")}
      </span>
      <span class="subject-progress">
        Bientôt disponible
      </span>
    </button>`;
  }

  return `<button
    class="subject-island"
    data-act="arch"
    data-id="${esc(subject.id)}">
    <svg viewBox="0 0 300 135" aria-hidden="true">
      ${defsOcean(300, 135, hacherTexte(subject.id))}
      ${islands}
    </svg>
    <strong>${esc(subject.name)}</strong>
    <span>
      ${esc(subject.region || "Archipel du Savoir")}
    </span>
    <span class="subject-progress">
      ${done} / ${subject.dungeons.length}
      portails libérés
    </span>
    <span class="mini-progress" aria-hidden="true">
      <i style="width:${
        subject.dungeons.length
          ? (done / subject.dungeons.length) * 100
          : 0
      }%"></i>
    </span>
  </button>`;
}

/* ==========================================
   OBJECTIF DU JOUEUR
   ========================================== */

function prochainObjectif() {
  const c = campagne();
  const mission = prochaineMission();

  if (c.attempt) {
    return {
      title: "Ton expédition t’attend",
      text: "Reprends au début de la salle sauvegardée.",
      action: "resume"
    };
  }

  if (mission && missionDisponible(mission.id)) {
    return {
      title: titreMission(mission),
      text: "Un nouveau signal du Système est accessible.",
      action: "mission",
      id: mission.id
    };
  }

  const course = SUBJECTS
    .flatMap(s => s.dungeons)
    .find(d => !S.dungeons[d.id]?.cleared);

  if (course) {
    return {
      title: course.name,
      text: "Explore un portail et développe tes connaissances.",
      action: "gate",
      id: course.id
    };
  }

  return {
    title: "La maîtrise se construit",
    text: "Les révisions espacées et les médailles ouvrent de nouveaux défis.",
    action: "allerA",
    to: "training"
  };
}

/* ==========================================
   LISTE DES COURS
   ========================================== */

function listeCours(subject, courses) {
  const page = pageIndex(
    UI.coursePage,
    courses.length,
    COURSE_PAGE_SIZE
  );

  return `<div class="course-list">${
    courses
      .slice(
        page * COURSE_PAGE_SIZE,
        (page + 1) * COURSE_PAGE_SIZE
      )
      .map(d => {
        const record = S.dungeons[d.id];

        return `<button
          class="course-card"
          data-act="gate"
          data-id="${esc(d.id)}">
          <span>
            <strong>${esc(d.name)}</strong>
            <small>${
              record?.cleared
                ? "Libéré · " + stars(record.stars)
                : "Portail à explorer"
            }</small>
          </span>
          ${badgeChef(d)}
          <span class="course-arrow" aria-hidden="true">
            ›
          </span>
        </button>`;
      })
      .join("") ||
      '<p class="win">Aucun portail ne correspond à cette recherche.</p>'
  }</div>${
    pagination(
      page,
      courses.length,
      COURSE_PAGE_SIZE,
      "coursePage"
    )
  }`;
}

/* ==========================================
   NAVIGATION CARTE ET PORTAILS
   ========================================== */

let BARRE_CARTE_ACTIVE = false;

SCREENS.map = function () {
  const subject = SUBJECTS.find(s => s.id === UI.arch);

  if (!subject) {
    const page = pageIndex(
      UI.worldPage,
      SUBJECTS.length,
      MAP_PAGE_SIZE
    );

    return `
      <div class="title-row">
        <h2>La Mer des Portails</h2>
        <p class="sub">
          Choisis un archipel.
          Chaque matière ouvre un territoire.
        </p>
      </div>
      <div class="subject-grid">
        ${SUBJECTS
          .slice(
            page * MAP_PAGE_SIZE,
            (page + 1) * MAP_PAGE_SIZE
          )
          .map(carteMatiereCompacte)
          .join("")}
      </div>
      ${pagination(
        page,
        SUBJECTS.length,
        MAP_PAGE_SIZE,
        "worldPage"
      )}
    `;
  }

  const query = UI.mapQuery || "";

  const filtered = subject.dungeons.filter(
    d => norm(d.name).includes(norm(query))
  );

  const groups = groupesMatiere(subject);

  const toolbar = !BARRE_CARTE_ACTIVE
    ? ""
    : `<div class="map-toolbar">
      <div class="view-switch"
        aria-label="Présentation des cours">
        <button class="btn"
          data-act="mapview"
          data-view="map"
          aria-pressed="${UI.mapView !== "list"}">
          Carte
        </button>
        <button class="btn"
          data-act="mapview"
          data-view="list"
          aria-pressed="${UI.mapView === "list"}">
          Portails
        </button>
      </div>
      <label class="search-label" for="mapQuery">
        Trouver une notion
      </label>
      <div class="search-row">
        <input
          class="txt"
          id="mapQuery"
          type="search"
          value="${esc(query)}"
          placeholder="Nom d’une notion"
          maxlength="120">
        <button class="btn" data-act="mapsearch">
          Chercher
        </button>
      </div>
    </div>`;

  const header = `
    <button class="link" data-act="world">
      ← La Mer des Portails
    </button>
    <div class="title-row">
      <h2>${esc(subject.region || subject.name)}</h2>
      <p class="sub">
        ${
          subject.dungeons.filter(
            d => S.dungeons[d.id]?.cleared
          ).length
        } / ${subject.dungeons.length}
        portails libérés · ${esc(subject.name)}
      </p>
    </div>
    ${toolbar}
  `;

  if (
    BARRE_CARTE_ACTIVE &&
    (UI.mapView === "list" || query)
  ) {
    return header + listeCours(subject, filtered);
  }

  if (groups.length > 1 && UI.group === null) {
    const page = pageIndex(
      UI.regionPage,
      groups.length,
      MAP_PAGE_SIZE
    );

    return (
      header +
      `<p class="hint">
        Navigue entre les régions.
        La vue Portails permet de retrouver rapidement un cours.
      </p>` +
      carteRegions(
        subject,
        groups.slice(
          page * MAP_PAGE_SIZE,
          (page + 1) * MAP_PAGE_SIZE
        ),
        page * MAP_PAGE_SIZE
      ) +
      pagination(
        page,
        groups.length,
        MAP_PAGE_SIZE,
        "regionPage"
      )
    );
  }

  const group = pageIndex(
    UI.group,
    groups.length,
    1
  );

  const list = groups.length > 1
    ? groups[group]
    : subject.dungeons;

  return (
    header +
    (
      groups.length > 1
        ? `<button class="link" data-act="backgroup">
            ← Toutes les régions
          </button>
          <p class="eyebrow">
            Région ${group + 1}
          </p>`
        : ""
    ) +
    carteArchipel(subject, list)
  );
};

/* ==========================================
   ACTIONS DE NAVIGATION
   ========================================== */

ACTIONS.mappage = function (target) {
  if (
    ![
      "worldPage",
      "regionPage",
      "coursePage",
      "codexPage"
    ].includes(target.dataset.kind)
  ) {
    return;
  }

  UI[target.dataset.kind] = Math.max(
    0,
    Number(target.dataset.page) || 0
  );

  window.scrollTo(0, 0);
  afficher();
};

ACTIONS.mapview = function (target) {
  UI.mapView =
    target.dataset.view === "list"
      ? "list"
      : "map";

  UI.mapQuery = "";
  UI.coursePage = 0;
  afficher();
};

ACTIONS.mapsearch = function () {
  UI.mapQuery = ($("#mapQuery")?.value || "")
    .trim()
    .slice(0, 120);

  UI.coursePage = 0;
  afficher();
};

/*
 * Contrôle centralisé lors de l'entrée
 * dans un archipel.
 */

const choisirArchipel = ACTIONS.arch;

ACTIONS.arch = function (target) {
  if (archipelBloque(target.dataset.id)) {
    return;
  }

  UI.mapQuery = "";
  UI.regionPage = 0;
  UI.coursePage = 0;

  choisirArchipel(target);
};

/* ==========================================
   IDENTITÉ DES BOSS
   ========================================== */

const lessonBeforeNavigation = SCREENS.lesson;

SCREENS.lesson = function () {
  const dungeon = DMAP[UI.dId].d;

  return lessonBeforeNavigation().replace(
    '<div class="lesson-grid">',
    `<div class="boss-identity">
      ${badgeChef(dungeon)}
      <strong>${esc(dungeon.boss.name)}</strong>
      <span class="sub">
        ${TEMPERAMENTS[
          temperamentBoss(dungeon.id)
        ].label}
      </span>
    </div>
    <div class="lesson-grid">`
  );
};

/* ==========================================
   ICONES DU MENU
   ========================================== */

const MENU_GLYPHS = [
  '<path d="M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16m6-14v16"/>',
  '<path d="M7 4h12v16H7zM4 4h3M4 20h3M10 8h6m-6 4h6m-6 4h4"/>',
  '<path d="M3 4h3l2 12h11l2-8H7M10 21h.01M18 21h.01"/>',
  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 3v4m0 10v4M3 12h4m10 0h4"/>',
  '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>'
];

const headerBeforeIcons = enteteJeu;

enteteJeu = function () {
  let i = 0;

  return headerBeforeIcons().replace(
    /<span class="ti" aria-hidden="true">[^<]*<\/span>/g,
    () =>
      `<span class="ti" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round">
          ${MENU_GLYPHS[i++]}
        </svg>
      </span>`
  );
};
