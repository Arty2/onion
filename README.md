# /onion

An experimental theme for the [Hugo](https://gohugo.io/) static site generator. See [heracl.es](https://heracl.es) for a live preview.

► This README may lag features in `master`. Use a tagged release for production sites; breaking changes are routine between untagged commits.


## Design principles

- **Plug & play.** Works with zero proprietary params — good Hugo defaults go a long way.
- **Progressive enhancement** with single-purpose vanilla JavaScript. No framework, no build pipeline.
- **Graceful degradation** for older browsers, without feature parity.
- **No pre-processors. No external dependencies.**
- **Multilingual first.** English and Greek bundled.
- **Mobile first.** Two fluid, responsive breakpoints.
- **Respect OS preferences.** Automatic light / dark scheme, automatic reduced motion.
- **Privacy by design.** Everything is self-hosted; no cookies required.


## Features

- Extensive display options for post listings via the built-in `{{< articles-list >}}` shortcode.
- Detailed, extensible page and post metadata. Automatic table of contents for long articles.
- Sidenotes (marginalia) inspired by [Tufte CSS](https://edwardtufte.github.io/tufte-css/). Collapsible on mobile.
- “Gadget” column providing a return-to-top button and theme toggle.
- Abbreviations and external links show tooltips when `title=""` is set (and the text has at least one space).
- Easily themable via [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
- Three bundled font stacks: serif (default), sans-serif, monospaced.
- [Lazy menus](https://gohugo.io/templates/menu-templates/#section-menu-for-lazy-bloggers) (no nesting support yet).
- “Hero” and listing images with responsive `srcset`, WebP conversion (Hugo Extended) and `fetchpriority="high"` on the LCP image.
- Additional post types: `preformatted`, for poems, aphorisms, or code fragments.
- Full-content RSS feed and JSON Feed 1.1.
- Archives template, grouped by year.
- Privacy-friendly social sharing.
- Syntax highlighting.
- Per-page custom CSS and JavaScript.
- Social media icons in the footer (also available as a shortcode).
- Open Graph and schema.org metadata.
- Image gallery (pile of images).
- Disqus comments via the built-in Hugo template.
- Google Analytics via the built-in Hugo template.
- [Microformats](https://microformats.org/wiki/what-are-microformats)-friendly markup.
- Native page prerender via [Speculation Rules](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API).
- Client-side search with [Fuse.js](https://fusejs.io/) (opt-in).


## Built-in shortcodes

```
articles-filter    articles-list      figure            files-list
forge-content      gallery            include           marginalia
menu-social        model-viewer       section           simple-signup
dailymotion
```


## Feature toggles

A handful of features are togglable at site and/or page level via front-matter. Both the legacy `snake_case` and the more conventional `camelCase` form are accepted:

```
showToc           showMeta           showShare
showComments      showGadgets        showLanguages
showAuthor        showSocial         showSearch
```

Set either form to `false` at site level to disable, or override per page in front-matter.


## Migrating from another theme

Onion's parameter names overlap with the conventions used by [PaperMod](https://adityatelange.github.io/hugo-PaperMod/), [Hextra](https://imfing.github.io/hextra/), [Stack](https://stack.jimmycai.com/), [Congo / Blowfish](https://blowfish.page/) and [Anatole](https://github.com/lxndrblz/anatole). Most keys can be pasted across; here are the ones worth knowing about:

| Their key | onion equivalent |
| --- | --- |
| `params.images` (default OG image) | `params.images` — pass-through |
| `params.mainSections` | `params.mainSections` — pass-through |
| `params.dateFormat` / `params.DateFormat` | `params.dateFormat` |
| `params.author` (object) | `params.author` — same shape (`name`, `email`, `image`, …) |
| `params.socialIcons` (PaperMod) | `[[params.social]]` with `name` + `url` |
| `params.ShowToc`, `params.ShowReadingTime`, etc. | `params.showToc`, etc. (camelCase) |
| `params.defaultTheme = "dark"` (PaperMod) | `params.theme = "theme--default scheme--dark"` |
| `params.colorScheme` (Congo) | `params.theme = "… scheme--dark"` (or omit for OS-driven) |


## Theming

`params.theme` is a space-separated list of class tokens. All values are optional; pick at most one per category and combine freely. Set the same value via `theme:` in page front-matter to override per page.

**Themes** (colour palette):

- `theme--default` — light + dark
- `theme--peach`   — light + dark
- `theme--retro`   — light + dark
- `theme--gray`    — single scheme
- `theme--blue`    — single scheme

**Colour scheme** (defaults to OS preference if unset):

- `scheme--light`
- `scheme--dark`

**Layout modifiers**:

- `mod--newline`   — paragraph spacing instead of first-line indent
- `mod--fullwidth` — forces full-width content (`--max-content: 100%`)

**Font modifiers**:

- `mod--font-serif` (default)
- `mod--font-sans`
- `mod--font-mono`
- `mod--font-local` — disables bundled webfonts; uses OS stacks

Combine, e.g. `theme = "theme--peach scheme--dark mod--font-sans"`.


## Article-listing modifiers

`{{< articles-list class="…" >}}` accepts space-separated classes. Each toggles a display tweak independently:

| Class          | Effect                                 |
| -------------- | -------------------------------------- |
| `preformatted` | Narrow, monospace summaries            |
| `cluster`      | 3-up flex grid                         |
| `no-taxa`      | Hide all taxonomy chips                |
| `no-types`     | Hide post-type chips                   |
| `no-tags`      | Hide tag chips                         |
| `no-time`      | Hide publication date                  |
| `no-summary`   | Hide article summary                   |
| `no-text`      | Hide all text — thumbnails only        |
| `no-gap`       | Collapse the gutter between cards      |

Two activation classes pair with related shortcodes:

- `articles-filterable` — opt in to client-side tag filtering driven by `{{< articles-filter >}}`. Articles are matched on the `data-tags` attribute the shortcode emits.
- `stack` — used by the archives template to group entries by year.


## Article filter

`{{< articles-filter >}}` renders a clickable bar of taxon buttons that hide/show items in any sibling `{{< articles-list class="articles-filterable" >}}`. Filtering is client-side, multi-select, and degrades to a post-count display when JavaScript is unavailable.

The shortcode walks `site.Taxonomies.tags` by default and renders one button per term, plus a reset button.

**Parameters:**

| Parameter   | Effect                                                          |
| ----------- | --------------------------------------------------------------- |
| `class`     | Extra classes on the rendered `<div class="taxonomy-filter">`.  |
| `tagfilter` | A single taxon slug to *exclude* from the filter bar (e.g. hide a `meta` tag from end users). |

**Useful classes via `class="…"`:**

| Class    | Effect |
| -------- | ------ |
| `sticky` | Pin the filter bar to the viewport top (`position: sticky; top: 0`). Useful when the listing is long. |

`sticky` is a generic helper rather than a filter-specific modifier; it just happens to be applied to the filter via this shortcode's `class` parameter.

**Pairing with `articles-list`:** the filter operates on any element matching `.articles-filterable [data-tags]`. Typical usage:

```hugo
{{< articles-filter class="sticky" >}}
{{< articles-list  class="articles-filterable" >}}
```

**Noscript fallback:** without JavaScript the bar still renders, with each taxon showing its post count (e.g. `tag (12)`). The reset button is hidden in this mode.


## Image modifiers

Append a `#fragment` to any image URL to apply visual-treatment classes. Works in plain markdown (`![alt](src#fragment)`), in `{{< figure >}}`, and on remote images. The fragment is forwarded as the `class` attribute on the rendered `<img>` by the markdown image render hook (`layouts/_default/_markup/render-image.html` → `layouts/partials/render-image.html`).

| Fragment    | Effect                                                          |
| ----------- | --------------------------------------------------------------- |
| `#blend`    | Theme-aware blend (multiply in light, screen + invert in dark)  |
| `#screen`   | `mix-blend-mode: screen` (always)                               |
| `#multiply` | `mix-blend-mode: multiply` (always)                             |
| `#shadow`   | Drop-shadow using the active theme's shadow colour              |

Combine by URL-encoding a space, e.g. `![diagram](architecture.svg#blend%20shadow)`.

The `{{< include >}}` shortcode inlines content as-is and does NOT process `#fragment` modifiers — use `{{< figure >}}` or plain markdown image syntax instead.


## Forge content

`{{< forge-content >}}` fetches a README (or any file) from a public GitHub / GitLab / Forgejo / Codeberg repo at build time and inlines its rendered Markdown. It supersedes the legacy `github-content` shortcode (removed in this release); migrate by changing the shortcode name and prefixing the host to `repository`.

```hugo
{{< forge-content repository="github.com/owner/repo"     branch="main" >}}
{{< forge-content repository="gitlab.com/group/project"  branch="main" >}}
{{< forge-content repository="codeberg.org/owner/repo"   branch="main" >}}
```

| Parameter    | Default      | Effect                                                                 |
| ------------ | ------------ | ---------------------------------------------------------------------- |
| `repository` | —            | `host/owner/repo` (unified) or `owner/repo` (legacy, GitHub assumed).  |
| `branch`     | `master`     | Branch / tag / ref.                                                    |
| `path`       | (empty)      | File path. Empty fetches the README — GitHub uses its dedicated endpoint; GitLab / Forgejo probe `README.md`, `README`, `readme.md` in order. |
| `platform`   | auto-detect  | `github` / `gitlab` / `forgejo`. Required for unrecognised hosts (e.g. self-hosted GitLab — also addable to `params.forgeContent.gitlabHosts`). |
| `unsafe`     | `false`      | When `true`, allows inline `<svg>` / `<math>` from trusted sources. All other dangerous tags remain stripped regardless. |

**Security.** Untrusted remote markdown passes through three filters before `markdownify`:

1. **Hugo shortcode delimiters are neutralised** — `{{<`, `{{%`, `>}}`, `%}}` are replaced with full-width lookalikes (`｛｛`, `｝｝`) so a malicious README cannot inject server-side template directives.
2. **Dangerous HTML tags are entity-escaped** — `<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, `<input>`, `<button>`, `<style>`, `<link>`, `<meta>`, `<base>`, `<noscript>` (and `<svg>` / `<math>` unless `unsafe="true"`) render as visible escaped text rather than executing.
3. **Dangerous attributes are stripped** — `on*=` event handlers, `javascript:` URIs in `href` / `src` / `xlink:href`, and IE `expression()` styles are removed wherever they appear; the containing tag survives but loses the attack vector.

This is a denylist, not a strict GFM allowlist. For most READMEs it's sufficient; for syndicating content from attacker-controlled repositories, run a dedicated sanitiser as a build step.


## Installation

The theme works on **Hugo ≥ 0.154** (Extended is strongly recommended for WebP conversion). Pick one install path:

### As a Hugo Module (recommended)

```sh
hugo mod init github.com/you/your-site
hugo mod get github.com/arty2/onion@v0.1.0
```

Then in `hugo.toml`:

```toml
theme = ["github.com/arty2/onion"]
```

Update to a newer minor with `hugo mod get -u github.com/arty2/onion@v0.X.Y`. Pinning a minor (rather than `@latest`) gives reproducible builds; see [RELEASING.md](./RELEASING.md) for the v0.x.x versioning policy.

### As a Git submodule

```sh
cd themes
git submodule add https://github.com/arty2/onion
```

Update with:

```sh
git submodule update --remote themes/onion
```

### As a Git subtree

```sh
git remote add onion https://github.com/arty2/onion.git
git subtree add --prefix=themes/onion onion master --squash
```

Update with:

```sh
git subtree pull --prefix=themes/onion onion master --squash
```

Windows users will find `.bat` helpers for the two Git-based workflows in [`tools/`](./tools/).

In every case set `theme = "onion"` in your site's config (or use the module path as shown above) and you're done.


## Example site

An `exampleSite/` is bundled with the theme. To develop against a real build:

```sh
cd exampleSite
hugo server
```

It uses `themesDir = "../.."` so the repo's working copy is the theme. CI builds the same site on every push via [`.github/workflows/build.yml`](./.github/workflows/build.yml).


## Site configuration

A fully-annotated starting point lives at [`config.default.toml`](./config.default.toml). Copy it into your site root, rename to `hugo.toml`, and edit. The example site's [`hugo.toml`](./exampleSite/hugo.toml) is a trimmed-down working version of the same.


## Customisation

### CSS variables

Every color, font stack, spacing unit, and typographic ratio is a CSS custom property declared on `:root` in `assets/styles/screen.css`. Override them in a site-level `static/styles/custom.css` or a page-level `custom.css` file in your content bundle.

### Custom CSS

Site-wide: `static/styles/custom.css`.
Per page: drop a `custom.css` file next to your `index.md` in a page bundle — it is inlined.

### Custom JavaScript

Site-wide: `static/scripts/custom.js`.
Per page: drop `custom.js` next to your `index.md`.

### Favicon

Add `static/favicon.png` or `static/favicon.ico`.


## Post and page front-matter

Automatic hero/cover images: append `__cover` (two underscores) to an image's filename inside a page bundle and it's picked up as the cover.

Standard Hugo front-matter supported: `title`, `tags`, `series`, `draft`, `description`, `summary`.

Theme-specific front-matter:

```yaml
cover
cover_listing
show_comments
show_meta
show_toc
show_share
license
rating          # 1–5
dateRead
dateCreated
crosspost
directURL       # override destination URL for the article
Forge           # "host/owner/repo" — fetches license + last-pushed via API
                # (github.com / gitlab.com / codeberg.org auto-detected)
Github          # legacy: "org/repo" — still works, treated as github.com
forge_platform  # required for unrecognised hosts: github | gitlab | forgejo
forge_label     # override the display label (default: auto from host)
publication:
  title
  subtitle
  titleOriginal
  author
  publisher
  published
  pages
  ISBN          # list
```


## Bundled webfonts

All fonts include Latin, Greek and Cyrillic ranges, and are served as WOFF2 only.

- [Alegreya](https://www.huertatipografica.com/en/fonts/alegreya-ht-pro) (serif, default)
- Alegreya Sans (sans-serif)
- [Fantasque Sans Mono](https://github.com/belluzj/fantasque-sans) (monospace)
- Subset of [Feather icons](https://feathericons.com/) via [IcoMoon](https://icomoon.io/).


## Bundled JavaScript

No core functionality depends on JavaScript being enabled; every JS feature has a `<noscript>` fallback or simply no-ops. All scripts are self-hosted inside the theme; there is no build step.

| Script | Purpose | Load strategy |
| --- | --- | --- |
| `onion.js` | Theme toggle, gadget scroller, piled image galleries | always, `async` |
| `fuse.basic.min.js` + `askolonion.js` | Client-side search | only on pages that include the `{{< search >}}` partial |
| `simple-lightbox` | Image lightbox | injected by `onion.js` only if the page contains image links |
| `model-viewer.min.js` | 3-D model viewer | injected by `partials/scripts.html` only on pages that use `{{< model-viewer >}}` |

Prefetch/prerender is delegated to the browser via [Speculation Rules](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) — no JavaScript required.


## Development

- `cd exampleSite && hugo server` for local preview.
- CI (`.github/workflows/build.yml`) builds the example site on every push against two Hugo versions (a pinned reproducible one and `latest`) and runs `html-validate` plus a deprecation grep against the output.
- Minimum supported Hugo: **0.154.0** (for the `try` statement used in `forge-meta`). Bumped here whenever the theme relies on a newer template feature.

Releases follow [`RELEASING.md`](./RELEASING.md): tag `v0.X.Y`, push the tag, and the Go module proxy serves it as `hugo mod get github.com/arty2/onion@v0.X.Y`. See [`CHANGELOG.md`](./CHANGELOG.md) for the catalogue of pre-policy v1/v2/v3 releases retired during the move to permanent v0.x.x versioning.


* * *

© 2018–2026 [Heracles Papatheodorou](http://heracl.es) a.k.a. [@heracles](https://www.mastodon.social/@heracles). [MIT Licence](./LICENSE.txt).
