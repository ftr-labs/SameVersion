# SameVersion

SameVersion is a playful and ever‑changing website designed to troll anyone who opens it. Each visit offers a slightly different experience with random text, colors, fonts and visual glitches.

## Running

Simply open `index.html` in your browser. No build step is required; all assets are included in the repository. You can also serve the folder with any static HTTP server if desired.

## Key Files

* **effects.js** – Adds visual effects and glitches.
* **mutations.js** – Applies random layout mutations.
* **colors.js** – Chooses background colors.
* **fonts.js** – Randomizes fonts.
* **phrases.js** – Supplies on‑screen phrases.
* **versions.js** – Displays the fake version label.

Opening the page loads these scripts to produce a silly, constantly mutating site.

On desktop you can reveal a hidden message by hovering in the bottom left
corner for a couple of seconds. On touch devices you can press and hold in
that corner. The page disables text selection there so the overlay appears
instead of the usual highlight menu.
The pressable area is deliberately oversized on phones so you can trigger
the secret without precision tapping, and the message pops up well above
your finger.
