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
gallery            github-content     include           marginalia
menu-social        model-viewer       section           simple-signup
dailymotion
```


## Feature toggles

A handful of features are togglable at site and/or page level via front-matter:

```
show_toc          show_meta          show_share
show_comments     show_gadgets       show_languages
show_author       show_social        show_search
```


## Theming

Set `params.theme` to one of the following. Every theme, except `theme--gray` and `theme--blue`, ships with both a light and a dark scheme.

| Themes           | Color schemes                       | Layout modifiers                                    | Font modifiers                                |
| ---------------- | ----------------------------------- | --------------------------------------------------- | --------------------------------------------- |
| `theme--default` | `scheme--light` (default from OS)   | `mod-newline` (paragraph spacing instead of indent) | `mod--font-serif` (default)                   |
| `theme--peach`   | `scheme--dark` (default from OS)    | `mod--fullwidth` (forces full-width content)        | `mod--font-sans`                              |
| `theme--retro`   |                                     |                                                     | `mod--font-mono`                              |
| `theme--gray`    |                                     |                                                     | `mod--font-local` (disables bundled webfonts) |
| `theme--blue`    |                                     |                                                     |                                               |

Values are whitespace-separated, so you can combine them — e.g. `theme = "theme--peach scheme--dark mod--font-sans"`. The same value can also be set on a page via `theme:` front-matter, overriding the site default for that page only.


## Installation

The theme works on **Hugo ≥ 0.128** (Extended is strongly recommended for WebP conversion). Pick one install path:

### As a Hugo Module (recommended)

```sh
hugo mod init github.com/you/your-site
hugo mod get github.com/arty2/onion
```

Then in `hugo.toml`:

```toml
theme = ["github.com/arty2/onion"]
```

Update later with `hugo mod get -u github.com/arty2/onion`.

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
Github          # "org/repo" — fetches live license + pushed_at via API
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
- CI (`.github/workflows/build.yml`) runs `hugo --gc --minify --printPathWarnings` on every push.
- Minimum supported Hugo: **0.128.0**. Bumped here whenever the theme relies on a newer template feature.


* * *

© 2018–2026 [Heracles Papatheodorou](http://heracl.es) a.k.a. [@heracles](https://www.mastodon.social/@heracles). [MIT Licence](./LICENSE.txt).
