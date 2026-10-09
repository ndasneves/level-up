
/*
 * LEVEL UP — MER DES PORTAILS V13
 *
 * Positions et silhouettes V12 conservées.
 * Brume enveloppante et irrégulière sur les archipels verrouillés.
 *
 * Charger après navigation.js, avant boot.js.
 */

(function () {
  'use strict';

  const FORCE_UNLOCKED = new Set(['en', 'hi', 'hg']);

  const MATIERES = [
    {
      ids: ['en'],
      nom: 'Anglais',
      zone: 'Archipel des Langues',
      couleur: '#F5BBA9',
      x: 27,
      top: 72,
      shape: 'alpha',
      runeX: 35
    },
    {
      ids: ['hi', 'hg'],
      nom: 'Histoire-Géographie',
      zone: 'Archipel des Âges anciens',
      couleur: '#F4E34A',
      x: 74,
      top: 100,
      shape: 'beta',
      runeX: 52
    },
    {
      ids: ['pc'],
      nom: 'Physique-Chimie',
      zone: 'Archipel des Découvertes',
      couleur: '#C2C1E7',
      x: 44,
      top: 290,
      shape: 'gamma',
      runeX: 44
    },
    {
      ids: ['fr'],
      nom: 'Français',
      zone: 'Archipel des Mots',
      couleur: '#32A4E8',
      x: 28,
      top: 555,
      shape: 'delta',
      runeX: 38
    },
    {
      ids: ['es'],
      nom: 'Espagnol',
      zone: 'Archipel des Horizons',
      couleur: '#D95350',
      x: 74,
      top: 495,
      shape: 'epsilon-small',
      runeX: 48
    }
  ];

  const MINI_ILES = [
    { x: 10, y: 24, kind: 'mini-c' },
    { x: 15, y: 38, kind: 'mini-a' },
    { x: 84, y: 236, kind: 'mini-b' },
    { x: 88, y: 249, kind: 'mini-c' },
    { x: 12, y: 255, kind: 'mini-d' },
    { x: 16, y: 271, kind: 'mini-c' },
    { x: 74, y: 340, kind: 'mini-a' },
    { x: 79, y: 351, kind: 'mini-c' },
    { x: 85, y: 427, kind: 'mini-b' },
    { x: 89, y: 443, kind: 'mini-c' },
    { x: 17, y: 481, kind: 'mini-d' },
    { x: 22, y: 491, kind: 'mini-c' },
    { x: 48, y: 690, kind: 'mini-b' },
    { x: 54, y: 704, kind: 'mini-a' },
    { x: 89, y: 735, kind: 'mini-c' }
  ];

  // Silhouettes conservées sans modification.
  const ARCHIPEL_SHAPES = {
    alpha: {
      main: 0,
      islands: [
        'M70 50 C51 44 42 35 45 23 C49 9 69 5 83 14 C94 20 101 36 96 49 C92 63 81 68 70 65 C63 63 67 55 70 50 Z',
        'M11 34 C1 30 2 18 12 13 C23 7 39 12 42 22 C46 34 36 42 24 42 C18 42 15 38 11 34 Z',
        'M21 86 C10 78 10 65 21 60 C32 53 45 59 49 71 C54 85 42 95 30 95 C26 95 24 89 21 86 Z',
        'M110 16 C101 9 105 3 115 3 C130 3 141 13 137 23 C133 32 120 30 110 25 Z',
        'M145 51 C135 43 137 29 148 25 C162 20 177 28 180 41 C183 54 170 63 157 60 C150 59 148 54 145 51 Z',
        'M155 94 C145 86 148 73 160 68 C172 64 187 72 189 84 C191 97 173 104 163 100 Z',
        'M194 28 C188 24 189 16 195 14 C204 11 210 18 208 26 C206 33 199 33 194 28 Z'
      ]
    },
    beta: {
      main: 3,
      islands: [
        'M17 20 C9 13 13 4 23 3 C37 1 47 9 44 20 C42 30 28 32 20 27 Z',
        'M76 16 C67 10 69 2 82 2 C95 1 106 8 103 19 C99 29 87 30 79 25 Z',
        'M157 16 C148 9 153 1 167 3 C181 5 187 14 181 24 C175 34 163 30 157 23 Z',
        'M91 54 C79 43 82 27 95 21 C110 15 127 24 132 37 C139 55 122 70 105 68 C99 67 96 59 91 54 Z',
        'M35 75 C24 67 28 53 40 49 C53 45 64 53 66 65 C69 78 55 88 44 86 Z',
        'M145 80 C132 71 136 56 150 51 C165 46 177 55 177 70 C177 85 158 91 149 85 Z',
        'M91 105 C82 100 87 90 99 88 C112 87 118 94 115 102 C111 110 99 112 91 105 Z',
        'M192 56 C186 51 188 43 197 42 C206 41 210 48 208 55 C205 63 197 62 192 56 Z'
      ]
    },
    gamma: {
      main: 2,
      islands: [
        'M48 15 C40 6 43 1 55 2 C68 3 76 14 73 27 C70 38 58 40 51 31 Z',
        'M121 12 C115 5 120 0 132 3 C143 6 148 16 143 25 C137 34 126 27 121 20 Z',
        'M74 74 C65 61 67 41 78 31 C92 19 106 28 111 44 C117 64 108 88 94 94 C84 99 78 85 74 74 Z',
        'M19 76 C8 68 10 54 23 48 C35 42 46 50 47 63 C49 76 33 84 23 82 Z',
        'M133 58 C124 48 128 34 141 32 C153 30 163 41 160 54 C156 67 142 69 133 58 Z',
        'M152 104 C143 98 146 85 159 79 C172 74 181 84 180 96 C179 109 162 112 152 104 Z',
        'M188 42 C182 33 187 24 195 27 C204 29 208 40 203 47 C199 52 191 50 188 42 Z'
      ]
    },
    delta: {
      main: 0,
      islands: [
        'M65 56 C45 47 41 30 53 18 C67 4 90 8 100 26 C110 43 105 66 86 72 C77 75 71 63 65 56 Z',
        'M138 93 C124 82 125 64 140 55 C158 46 178 51 186 68 C194 86 181 102 165 104 C151 105 145 100 138 93 Z',
        'M13 28 C5 21 10 11 22 9 C34 8 41 17 39 27 C35 38 22 35 13 28 Z',
        'M19 86 C9 80 11 68 22 64 C36 60 44 70 44 81 C44 94 28 95 19 86 Z',
        'M109 12 C101 7 104 2 116 2 C128 3 135 12 131 21 C127 27 118 22 109 12 Z',
        'M189 24 C182 18 186 8 197 8 C207 8 211 19 206 26 C202 32 194 30 189 24 Z'
      ]
    },
    'epsilon-small': {
      main: 0,
      islands: [
        'M82 75 C70 69 66 60 73 49 C84 36 94 37 103 27 C113 15 129 19 136 31 C143 45 132 57 124 66 C111 81 95 83 82 75 Z',
        'M40 40 C30 34 33 22 44 18 C56 14 65 22 64 33 C63 43 51 47 40 40 Z',
        'M149 28 C142 21 147 12 159 12 C171 13 179 22 175 31 C170 40 157 36 149 28 Z',
        'M163 86 C153 80 156 68 169 64 C181 60 192 68 190 80 C189 90 175 93 163 86 Z'
      ]
    }
  };

  if (
    typeof SCREENS === 'undefined' ||
    typeof SUBJECTS === 'undefined'
  ) {
    console.warn(
      '[Level Up] Charger navigation.js avant map-design.js.'
    );
    return;
  }

  if (window.__levelUpMapV13Loaded) return;
  window.__levelUpMapV13Loaded = true;

  const ancienneCarte = SCREENS.map;

  function getSubject(matiere) {
    return SUBJECTS.find(
      s => matiere.ids.includes(s.id)
    ) || null;
  }

  function getPrimaryId(matiere) {
    const subject = getSubject(matiere);
    return subject ? subject.id : matiere.ids[0];
  }

  function estVerrouillee(matiere) {
    const subject = getSubject(matiere);

    if (!subject) return true;

    if (matiere.ids.some(id => FORCE_UNLOCKED.has(id))) {
      return false;
    }

    return typeof archipelBloque === 'function'
      ? archipelBloque(subject.id)
      : true;
  }

  function progression(matiere) {
    const subject = getSubject(matiere);
    const donjons = subject?.dungeons || [];

    const sauvegarde =
      typeof S !== 'undefined'
        ? S.dungeons || {}
        : {};

    const reussis = donjons.filter(
      d => sauvegarde[d.id]?.cleared
    ).length;

    return { total: donjons.length, reussis };
  }

  function estTerminee(matiere) {
    if (estVerrouillee(matiere)) return false;

    const p = progression(matiere);

    return p.total > 0 && p.reussis === p.total;
  }

  function etatMatiere(matiere) {
    if (estVerrouillee(matiere)) return 'is-locked';
    if (estTerminee(matiere)) return 'is-complete';
    return 'is-unlocked';
  }

  function ilesHtml(shapeName) {
    const config =
      ARCHIPEL_SHAPES[shapeName] || ARCHIPEL_SHAPES.alpha;

    const chemins = config.islands.map((path, index) => `
      <path
        d="${path}"
        class="ld-island-shore"
      ></path>
      <path
        d="${path}"
        class="ld-island-land ${
          index === config.main ? 'ld-island-main' : ''
        }"
      ></path>
    `).join('');

    return `
      <svg
        class="ld-islands"
        viewBox="0 0 215 120"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <g class="ld-islands-group">
          ${chemins}
        </g>
      </svg>
    `;
  }

  function miniIlesHtml() {
    return MINI_ILES.map(ile => `
      <span
        class="ld-mini-island ${ile.kind}"
        style="left:${ile.x}%;top:${ile.y}px"
        aria-hidden="true"
      ></span>
    `).join('');
  }

  function fiche(matiere) {
    const etat = etatMatiere(matiere);
    const verrouille = etat === 'is-locked';
    const id = getPrimaryId(matiere);

    const action = verrouille
      ? 'disabled aria-disabled="true"'
      : `data-act="arch" data-id="${id}"`;

    const symbole = verrouille
      ? '<span class="ld-padlock" aria-hidden="true">🔒</span>'
      : '<span class="ld-chevron" aria-hidden="true"></span>';

    return `
      <button
        type="button"
        class="ld-archipelago ${etat} ld-shape-${matiere.shape}"
        style="
          --ld-accent:${matiere.couleur};
          --ld-x:${matiere.x}%;
          --ld-rune-x:${matiere.runeX}%;
          top:${matiere.top}px;
        "
        ${action}
        aria-label="${matiere.nom}${
          verrouille ? ', verrouillé' : ', accessible'
        }"
      >
        <span class="ld-card">
          <span class="ld-card-copy">
            <strong>${matiere.nom}</strong>
            <small>${matiere.zone}</small>
          </span>
          <span class="ld-card-end" aria-hidden="true">
            ${symbole}
          </span>
        </span>

        <span class="ld-rune-wrap" aria-hidden="true">
          <span class="ld-rune"></span>
        </span>

        <span class="ld-archipelago-art">
          ${ilesHtml(matiere.shape)}

          ${
            verrouille
              ? `<span class="ld-fog" aria-hidden="true">
                   <span class="ld-fog-layer"></span>
                 </span>`
              : ''
          }
        </span>
      </button>
    `;
  }

  SCREENS.map = function () {
    if (
      typeof UI !== 'undefined' &&
      SUBJECTS.some(s => s.id === UI.arch)
    ) {
      return ancienneCarte();
    }

    return `
      <section class="ld-world">
        <div class="title-row">
          <h2>La Mer des Portails</h2>
          <p class="sub">
            Chaque archipel représente une matière.
            Choisis une matière pour explorer ses îles.
          </p>
        </div>

        <div
          class="ld-sea"
          aria-label="Carte de la Mer des Portails"
        >
          <span class="ld-compass" aria-hidden="true">
            <small>N</small>✧
          </span>

          ${miniIlesHtml()}
          ${MATIERES.map(fiche).join('')}
        </div>
      </section>
    `;
  };
})();
