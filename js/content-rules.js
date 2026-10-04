/* Author-facing content rules. Pure functions, shared by the game and validation. */
(function (root) {
  "use strict";
  const TEMPERAMENTS = ["brute", "gardien", "insaisissable", "vampirique"];
  const MECHANICS = ["collector", "sentinel", "messenger", "none"];
  const FRAGMENT_COUNT = 8; // The ninth and final piece is hidden inside the app.

  function bounded(value, min, max) {
    return Number.isFinite(value)
      ? Math.max(min, Math.min(max, value))
      : undefined;
  }

  function boss(source = {}) {
    const value = source && typeof source === "object" ? source : {};
    const fragment =
      Number.isInteger(value.fragment) &&
      value.fragment >= 1 &&
      value.fragment <= FRAGMENT_COUNT
        ? value.fragment
        : null;
    return {
      ...value,
      name:
        typeof value.name === "string" && value.name.trim()
          ? value.name
          : "Gardien du portail",
      icon: value.icon || "👹",
      chief: value.chief === true,
      // Fragments must be assigned deliberately to chiefs, never to random bosses.
      fragment: value.chief === true ? fragment : null,
      temper: TEMPERAMENTS.includes(value.temper) ? value.temper : null,
      mechanic: MECHANICS.includes(value.mechanic) ? value.mechanic : null,
      stats: {
        level: bounded(value.stats?.level, 1, 30),
        hp: bounded(value.stats?.hp, 50, 5000),
        attack: bounded(value.stats?.attack, 2, 300),
      },
      phases: Array.isArray(value.phases)
        ? value.phases
            .filter(
              (p) =>
                p &&
                p.below > 0 &&
                p.below < 1 &&
                TEMPERAMENTS.includes(p.temper),
            )
            .map((p) => ({ below: p.below, temper: p.temper }))
            .sort((a, b) => b.below - a.below)
        : null,
    };
  }

  function audit(subjects) {
    const errors = [],
      locations = new Map();
    for (const subject of subjects) {
      for (const dungeon of subject.dungeons) {
        const b = dungeon.boss;
        if (b.fragment != null) {
          if (locations.has(b.fragment))
            errors.push(
              `Fragment ${b.fragment} attribué deux fois : ${locations.get(b.fragment)} et ${dungeon.id}.`,
            );
          else locations.set(b.fragment, dungeon.id);
        }
        if (
          b.availableFrom &&
          (!/^\d{4}-\d{2}-\d{2}$/.test(b.availableFrom) ||
            !Number.isFinite(Date.parse(b.availableFrom)))
        ) {
          errors.push(`Date du chef ${dungeon.id} invalide.`);
        }
      }
    }
    return { errors, locations };
  }

  const api = { boss, audit, FRAGMENT_COUNT, TEMPERAMENTS, MECHANICS };
  root.ContentRules = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
