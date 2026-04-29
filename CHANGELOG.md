# Changelog

This file preserves the release-note bodies of the pre-policy v1 / v2
/ v3 tags that were retired when the project switched to permanent
v0.x.x versioning (see [RELEASING.md](./RELEASING.md)). The tags and
GitHub Releases themselves were deleted to sidestep Go's
[major-version-suffix rule](https://go.dev/ref/mod#major-version-suffixes),
which makes any `v2+` tag unconsumable via `hugo mod get` unless the
`go.mod` module path includes a matching `/v2` (or `/v3`, …) suffix.
The first release under the new policy is `v0.1.0`, functionally
equivalent to what was briefly tagged as `v3.2.0`.

The bodies below are quoted verbatim from the original GitHub
Releases.


## v3.2.0 — 2026-04-29

What's Changed:

- add print.css as print-media stylesheet by @Arty2 in #6
- docs: document articles-list / articles-filter / image modifiers by @Arty2 in #4
- forge-content: multi-platform content shortcode replacing github-content by @Arty2 in #7
- polish: localStorage safety, scroll perf, a11y, dead code, modernize CSS by @Arty2 in #5

Full Changelog: v3.1.0…v3.2.0


## v3.1.0 — 2026-04-26

What's Changed: restructured CSS styles.

Full Changelog: v3.0.1…v3.1.0


## v3.0.1 — 2026-04-26

What's Changed:

- forge-meta partial + harden github-content against shortcode injection by @Arty2 in #2

Full Changelog: v3.0.0…v3.0.1


## v3.0.0 — 2026-04-26

What's Changed: major codebase restructuring with Claude Opus.

- Hugo compatibility and cleanup
- Automated tests
- Metadata and module infrastructure
- CSS restructuring and modernization

Full Changelog: v2.3.0…v3.0.0


## v2.3.0 — 2026-04-26

Incorporated previous manual changes from https://heracl.es with
orchestration from Claude Sonnet.

Full Changelog: v2.2…v2.3.0

### New

**Dailymotion shortcode** (`layouts/shortcodes/dailymotion.html`) —
embed videos via `{{< dailymotion id="…" >}}`. Supports `player`,
`mute`, `loading`, `ratio`, `width`, and `class` params. When
`Shortcodes.Dailymotion.Disable` is set in site config, renders a
plain fallback link instead of an iframe.

**Explicit color scheme classes** — `.scheme--light` and
`.scheme--dark` classes can now be applied to any element (not just
through `prefers-color-scheme`). Each scheme sets `--blend-mode`
(multiply/screen) and `--blend-filter` (none/invert) for image
blending. Light theme color changed to a blue-tinted white
(`221, 238, 255`); dark accent changed from blue to magenta
(`205, 35, 185`).

**`CustomCSS` front matter** — per-page inline `<style>` injected
via `Params.CustomCSS`.

**`featuredClass` Store variable** — partials can set
`.Store "featuredClass" "cover"` to render featured images as
full-bleed covers instead of thumbnails. Single pages use this by
default. The `featured-img` partial now supports `cover`,
`featured`, and `thumbnail` front matter params with correct
priority per class.

**RSS `<category>` elements** — each feed item now emits
`<category domain="types">` and `<category domain="tags">` entries.
Items with `Sitemap.Disable: true` are excluded from feeds.

**`.no-taxa` and `.no-types` modifier classes** — use on
`.articles-list` to hide all taxa or just type taxa.

### Improvements

**Font stacks expanded** — `--font-mono`: adds Source Code Pro,
SF Mono, Roboto Mono, DejaVu Mono. `--font-serif`: adds Source
Serif, New York, Cambria, Roboto Serif, DejaVu Serif. `--font-sans`:
corrected from `Alegreya Sansa` to `Alegreya Sans`; adds Source
Sans, SF Pro, Candara, Verdana, Roboto, DejaVu Sans. Default body
font changed from sans-serif to serif.

**Code block scroll shadows** — `<pre>` blocks use a pure-CSS
radial-gradient technique to show scroll-shadow indicators at
left/right overflow edges. The border and language label moved
from `<code>` to the `<pre>` wrapper; language label repositioned
to top-left.

**Video embeds rewritten** — `.video` now uses `aspect-ratio: 16/9`
+ flexbox instead of the old `padding-bottom: 56.25%` hack. When a
video embed is disabled, the fallback shows a full-area link with a
CSS `▶` play icon.

**RSS XSL reader view redesigned** — language switcher nav with
`aria-current` added. Items now display type/tag categories and a
formatted date. Date formatting done via an XSL named template. RSS
"about" text links to a "feed reader" article.

**Search index and UI (`askolonion.js`)** — `section` field renamed
to `types` in the JSON index. Search result order now matches
article listing: type → tags → title → summary → date. Arrow keys
`←`/`→` added as navigation shortcuts (Right = go to first result,
Left = return to search input).

**Language switcher accessibility** — `<nav>` gains `aria-label`
(new i18n key `languages-available`) and items use
`aria-current="page"`, `rel="alternate"`, and `hreflang` instead of
a `.active` class.

**Image rendering (`render-image.html`)** — now checks both page
resources and global resources. GIF files are never resized
(avoids broken animations). Self-closing `<img />` for XML
compatibility. `<figure>` / `<figcaption>` wrapping moved outside
the resource lookup so it applies in all cases. Extra attributes
passed via an `Attributes` dict are forwarded to the `<img>`.

**Copyright renders Markdown** — `site.Copyright` in footer and
RSS now passes through `RenderString`, so Markdown links work.

**`Scratch` → `Store` in templates** — `index.json` and
`single.html` migrated from the deprecated `.Scratch` to `.Store`.

### Fixes

- `render-link.html`: removed the `TrimLeft "0123456789"` workaround
  for links starting with digits; replaced with proper `urls.Parse`
  / `IsAbs` check. External links get `data-src="external"` instead
  of `target="_blank"`.
- `single.html`: fixed `Resources.Match` → `.Resources.Match` (was
  accessing global scope incorrectly).
- `articles-filter.html`: taxonomy page lookup uses `path.Join`
  instead of `printf "/%s"`.
- `.articles-list.no-tags` now targets `.tag` elements, not `.tags`
  containers.
- `articles-list` hover no longer fires on articles without an
  `<a href>`.
- `content-visibility: auto` disabled on article list items (was
  forcing `overflow: hidden` and clipping content).
- `meta.html`: `license` i18n key corrected to `post-license`.
- Disqus comments block removed from `single.html` (was broken
  without `disqusShortname`).
- Greek translation: `filter-reset` changed from "Όλα" to "Άπαντα";
  RSS about text fixed typo and updated wording.


## v2.2 — 2026-04-18

Pre-AI.


## v2.1 — 2020-09-25

- Typographic scale and various UI refinements.
- `{{< github-content >}}` shortcode to build pages from GitHub
  readmes.
- YAML custom param `github`, to add repository details to a page.


## v2.0 — 2020-09-16

(no release notes)


## v1.0 — 2020-09-16

(no release notes)
