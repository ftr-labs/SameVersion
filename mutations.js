const formatMutations = [
  ['solid-border'],
  ['double-border'],
  ['no-border', 'pill-shape'], // base for circle
  ['glow-border', 'slight-tilt'],
  ['sharp-corner', 'align-left', 'text-left'],
  ['pill-shape', 'align-right', 'text-right'],
  ['split-layout'],
  ['align-bottom', 'glow-border'],
  ['tall-box'],
  ['wide-box'],
  ['low-opacity'],
  ['reverse-order'],
  ['distorted'],
  ['no-border', 'pill-shape'] // duplicate to increase chance of circle
];

function applyRandomMutation(element) {
  const chance = Math.random();
  if (chance <= 0.75) {
    const chosen = formatMutations[Math.floor(Math.random() * formatMutations.length)];

    // Boosted condition: if combo is 'no-border' + 'pill-shape', make it a circle
    const isCircle = chosen.includes("no-border") && chosen.includes("pill-shape");
    if (isCircle) {
      chosen.push("circle-box");
    }

    element.classList.add(...chosen);
  }
}
