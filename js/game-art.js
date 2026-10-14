/* Illustrations vectorielles locales : aucun téléchargement nécessaire hors ligne. */
"use strict";
function illustrerCreature(name, role = "mob") {
  const seed = hacherTexte(name),
    id = "creature-" + seed + "-" + role,
    chief = role === "chief",
    color = chief ? "#ff496f" : role === "boss" ? "#ab8cff" : "#71b8ce";
  const n = norm(name),
    dark = "#111a30",
    edge = "#354561";
  let shape;
  if (/dragon|hydre|kraken|souverain/.test(n))
    shape = `<path d="M58 143L15 112 31 65 70 98 85 55 97 78 126 63 140 91 174 56 193 111 154 143 149 175 69 175Z" fill="${dark}" stroke="${edge}" stroke-width="3"/><path d="M73 108L43 86 44 116 70 133M145 108L171 86 174 117 148 135" fill="${color}" opacity=".25"/><path d="M87 76L83 44 103 65M124 71L140 43 136 86" fill="#5b6982"/><path d="M84 100L104 108 88 115M136 99L117 108 134 115" fill="${color}"/><path d="M98 132L116 137 127 126 123 148 106 155 92 145Z" fill="#070d19"/><path d="M100 137L104 149 109 140 116 149 119 137" fill="#b7c6d6"/>`;
  else if (/araigne|arachne|scorpion/.test(n))
    shape = `<g fill="none" stroke="${edge}" stroke-width="9" stroke-linecap="round"><path d="M84 110L42 71 22 102M80 126L35 116 17 146M85 143L43 163 30 192M132 109L174 70 191 102M137 126L181 118 198 145M133 144L175 165 188 190"/></g><ellipse cx="110" cy="113" rx="31" ry="45" fill="${dark}" stroke="${edge}" stroke-width="3"/><path d="M90 134L110 114 131 134 121 165 100 165Z" fill="#202943"/><g fill="${color}"><circle cx="97" cy="104" r="5"/><circle cx="111" cy="100" r="5"/><circle cx="125" cy="104" r="5"/></g><path d="M101 155L102 171 111 162 120 173 121 154" fill="#8996ad"/>`;
  else if (/serpent|vipere/.test(n))
    shape = `<path d="M169 174C91 199 42 162 74 139S158 123 141 92 92 113 101 136" fill="none" stroke="${edge}" stroke-width="26" stroke-linecap="round"/><path d="M169 174C91 199 42 162 74 139S158 123 141 92 92 113 101 136" fill="none" stroke="${dark}" stroke-width="19"/><path d="M86 70L109 53 135 66 142 92 117 109 89 95Z" fill="${dark}" stroke="${edge}" stroke-width="3"/><path d="M96 79L107 84 98 88M130 76L118 82 127 86" fill="${color}"/><path d="M114 99L111 120 101 128M111 120L122 129" fill="none" stroke="#fa5178" stroke-width="3"/>`;
  else if (/chauve|hibou|griffon/.test(n))
    shape = `<path d="M89 99L50 66 17 99 43 105 33 127 58 125 61 145 88 128M133 98L172 66 204 99 179 105 187 127 162 125 158 145 133 128" fill="${dark}" stroke="${edge}" stroke-width="3"/><path d="M86 91L81 62 102 76 120 76 140 60 135 95 141 134 125 160 99 160 82 134Z" fill="#202b42"/><path d="M92 100L107 106 93 112M131 100L116 106 130 112" fill="${color}"/><path d="M106 119L115 119 110 130Z" fill="#c4b7a0"/>`;
  else if (/loup|louve|lion|taureau|mammouth|rat|sanglier/.test(n))
    shape = `<path d="M54 132L75 77 76 48 98 71 123 71 150 48 149 84 170 132 148 163 70 163Z" fill="${dark}" stroke="${edge}" stroke-width="3"/><path d="M83 88L102 116 89 140 109 151 134 134 120 115 141 87 145 127 127 154 92 154 75 128Z" fill="#29354c"/><path d="M81 108L102 115 84 122M143 108L122 115 141 122" fill="${color}"/><path d="M100 138L121 138 110 150Z" fill="#080d18"/><path d="M94 153L101 166 106 155 115 155 120 166 127 151" fill="#aeb8c6"/>`;
  else
    shape = `<path d="M59 180L67 113 85 98 83 63 96 48 124 48 138 64 136 98 155 115 165 180Z" fill="${dark}" stroke="${edge}" stroke-width="3"/><path d="M85 112L108 128 135 110 145 171 77 171Z" fill="#26324b"/><path d="M90 63L110 74 132 63 127 101 94 101Z" fill="#080e1c"/><path d="M94 80L106 84 94 88M126 80L114 84 126 88" fill="${color}"/><path d="M75 115L53 144 35 180M149 116L172 143 186 181" fill="none" stroke="${edge}" stroke-width="15"/><path d="M45 173L32 92 40 62 49 89 56 172Z" fill="#8191aa"/><path d="M29 170L66 167" stroke="${color}" stroke-width="6"/>`;
  const crown = chief
    ? '<path d="M80 54L74 29 94 39 110 14 126 39 147 28 141 55Z" fill="#301322" stroke="#ff496f" stroke-width="2"/><circle cx="110" cy="41" r="4" fill="#ffd17b"/>'
    : "";
  return `<svg class="creature-art ${role}" viewBox="0 0 220 220" role="img" aria-label="${esc(name)}"><defs><radialGradient id="${id}"><stop stop-color="${color}" stop-opacity=".28"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs><circle cx="110" cy="116" r="104" fill="url(#${id})"/><ellipse cx="110" cy="187" rx="65" ry="10" fill="#02060f" opacity=".65"/><circle cx="110" cy="114" r="78" fill="none" stroke="${color}" stroke-opacity=".22" stroke-dasharray="3 12"/>${shape}${crown}<path d="M79 190L108 182 141 190 111 198Z" fill="${color}" opacity=".4"/></svg>`;
}
function vignetteRegion(s, region) {
  const seed = hacherTexte(s.id + ":" + region.id);
  const R = generateurAleatoire(seed);
  const centerX = 63 + (R() - .5) * 8, centerY = 47;
  const main = svgIle(centerX, centerY, 23 + R()*4, seed, s.color, false);
  let satellites = "";
  for (let i=0; i<4; i++) {
    const angle = R()*Math.PI*2, dist=30+R()*11;
    satellites += svgIle(centerX+Math.cos(angle)*dist,
      centerY+Math.sin(angle)*dist*.75, 6+R()*4,
      hacherTexte(region.id+":islet:"+i), s.color, false);
  }
  const id="region-land-"+seed;
  return `<svg class="region-island" viewBox="0 0 130 95" role="img" aria-label="Îles de ${esc(region.name)}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#31604f"/><stop offset="1" stop-color="#132c25"/></linearGradient></defs><g style="--island-land: url(#${id})">${satellites}${main}</g></svg>`.replaceAll('url(#land)',`url(#${id})`);
}
function carteRegions(s, groups, offset = 0) {
  const regions=regionsMatiere(s).slice(offset,offset+groups.length);
  return `<div class="region-list" style="--region-accent:${s.color}">${regions.map((r,i)=>{
    const done=r.dungeons.filter(d=>S.dungeons[d.id]?.cleared).length;
    const total=r.dungeons.length;
    const pct=total?Math.round(done*100/total):0;
    return `<button type="button" class="region-entry" data-act="group" data-idx="${i+offset}" aria-label="${esc(r.name)} : ${done} sur ${total} donjons vaincus">
      <span class="region-entry-art">${vignetteRegion(s,r)}</span>
      <span class="region-entry-info"><strong>${esc(r.name)}</strong>${r.subtitle?`<small>${esc(r.subtitle)}</small>`:""}
      <span class="region-entry-count"><b>${done} / ${total}</b> donjon${total>1?'s':''}</span>
      <span class="region-entry-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-label="Donjons vaincus"><i style="width:${pct}%"></i></span></span>
      <span class="region-entry-chevron" aria-hidden="true">›</span>
    </button>`;
  }).join('')}</div>`;
}
function svgCleComplete(obtained, heart) {
  const parts = [
    "M69 27A40 40 0 0 0 29 67L47 67A22 22 0 0 1 69 45Z",
    "M29 67A40 40 0 0 0 69 107L69 89A22 22 0 0 1 47 67Z",
    "M69 107A40 40 0 0 0 109 67L91 67A22 22 0 0 1 69 89Z",
    "M109 67A40 40 0 0 0 69 27L69 45A22 22 0 0 1 91 67Z",
    "M106 58H156V76H106Z",
    "M160 58H203V76H160Z",
    "M207 58H224V103H207Z",
    "M228 58H245V91H228Z",
  ];
  return `<svg class="assembled-key" viewBox="0 0 275 135" role="img" aria-label="Clé ancestrale, ${obtained.size} fragments sur huit${heart ? ", cœur retrouvé" : ""}"><ellipse cx="136" cy="111" rx="108" ry="9" fill="#020612"/>${parts.map((d, i) => `<path d="${d}" class="key-part ${obtained.has("fragment-" + (i + 1)) ? "obtained" : ""}" fill="${obtained.has("fragment-" + (i + 1)) ? "#d5b471" : "#172338"}" stroke="${obtained.has("fragment-" + (i + 1)) ? "#ffdf94" : "#34445e"}" stroke-width="2"/>`).join("")}<path d="M69 52L80 67 69 82 58 67Z" fill="${heart ? "#b08bff" : "#080f20"}" stroke="${heart ? "#d3bdff" : "#40516f"}" stroke-width="2"/></svg>`;
}
