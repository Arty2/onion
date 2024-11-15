# /onion

An experimental theme for the [Hugo](https://gohugo.io/) static site generator. See [heracl.es](https://heracl.es) for a live preview.

► This README is under construction and rudimentary. Major breaking changes may occur between versions, both in functionality and design approaches. Code quality may be rough. Using versioned (pre)-releases is more than encouraged.


## Design Principles

- Plug & Play. Should work with zero proprietary params in [configuration file](https://gohugo.io/getting-started/configuration/).
- [Progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) with single-purpose vanilla JavaScript libraries. As few as possible.
- [Graceful degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation) for older browsers, but no feature parity.
- No pre-proccessors. No frameworks. No external depedencies.
- Multilingual first. Greek translations included.
- [Mobile first](https://developer.mozilla.org/en-US/docs/Glossary/Mobile_First). Two fluid & responsive breakpoints.
- Respect user’s system preferences: default automatic light / dark theme; automatically reduced motion.
- Privacy by design. Every part of the theme is self-hosted, no cookies required.


## Features

- Extensive display options for posts via the built-in `{{< articles-list >}}` shortcode.
- Detailed & extensible page and post metadata display. Automatic Table of Contents for lengthy posts.
- Sidenotes (marginalia) inspired by [Tufte CSS](https://edwardtufte.github.io/tufte-css/). Collapsible on mobile.
- “Gadget” column which provides:
    + “Return to top” button.
    + Toggle between pre-set themes, or between dark / light scheme.
    + Abbreviations and external links display “tooltips” when a `title=""` attribute is provided. The title text must have at least one space.
- Easily themable with [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). Readily provided themes can be set in `config.yaml` .
- Three font options to be combined with themes: 1. serif (default) 2. sans-serif 3. monospaced.
- [Lazy menus](https://gohugo.io/templates/menu-templates/#section-menu-for-lazy-bloggers). Can be configured. No nesting support at the moment.
- “Hero” and listing images.
- Additional post types: preformatted. May be used for poems, aphorisms, code fragments.
- Full content RSS feed.
- Archives template. Grouped by year.
- Privacy-first social sharing.
- Syntax highlighting.
- Customizable CSS and JavaScript per page.
- Social media icons in footer. Also available as a shortcode.
- Open Graph and Twitter metadata.
- Image gallery (pile of images).
- Disqus comments via built-in Hugo template.
- Google Analytics via built-in Hugo template.
- [Microformats](http://microformats.org/wiki/what-are-microformats) friendly.


## Built-in Shortcodes

<!-- TODO: include details about attributes -->

- articles-filter
- articles-list
- figure
- gallery
- github-content
- img
- marginalia
- menu-social
- section
- simple-signup
- files-list


## Feature toggles

Several features can be enabled or disabled on a site or page level.
You can adjust as follows …

- show_toc
- show_meta (default: true)
- …


## Theming

The following values can be passed to `params.theme` and modify the site’s appearance.
Most themes have a light/dark color scheme. Themes and Color Schemes can also be applied to individual pages.

Themes
: `theme--default`
: `theme--peach`
: `theme--retro`
: `theme--gray` (no light/dark scheme)
: `theme--blue` (no light/dark scheme)

Color Schemes (default: browser preference)
: `scheme--light`
: `scheme--dark` 


Theme Modifiers
: `mod-newline` separates paragraphs with new line instead of ident.
: `mod--font-serif` sets serif fonts.
: `mod--font-sans` sets sans-serif fonts.
: `mod--font-mono` sets monospaced fonts.
: `mod--font-local` disables webfonts in favor of local fonts.
: `mod--fullwidth` forces full-width for the content area.



* * *

## Installation

The following instructions assume that you have already set [Hugo](https://gohugo.io/getting-started/quick-start/) up, and keep your site’s content in a Git repository, ready to [deploy](https://gohugo.io/hosting-and-deployment/).

You may move the provided `.bat` scripts (for Windows 10)  in your root directory to easily update to newer versions.

Don’t forget to set the theme in your `config.yaml` file:
```
theme: onion
```

### As a submodule

The official [Hugo documentation for themes](https://gohugo.io/getting-started/quick-start/#step-3-add-a-theme) suggest to install as a *submodule*:

```
cd themes
git submodule add https://github.com/Arty2/onion
```

To update the theme to the most current version:

```
cd themes/onion
git checkout master
git pull
cd ../../
```

### As a subtree

Installing as a *subtree* has [several advantages](https://training.github.com/downloads/submodule-vs-subtree-cheat-sheet/) if you wish to actively contribute with pull-requests:

```
git remote add onion https://github.com/Arty2/onion.git
git subtree add --prefix=themes/onion onion master --squash
```

To update the theme to the most current version:

```
git subtree pull --prefix=themes/onion onion master --squash
```

* * *

## Built-in shortcotes guide

```
...
```

## Customisation


### CSS Variables

```
...
```

### Custom CSS

Modify CSS per page custom styles via `custom.css` in the page’s bundle or folder. Global styles may be customized by creating a `/static/styles/custom.css` file.

### Custom JavaScript

This theme supports per page custom scripts via `custom.js` in the page’s bundle or folder, or a global `/static/scripts/custom.js` file.

### Favicon

Add a `/static/favicon.png` or `/static/favicon.ico` file.

### Site configuration

See `config.default.yml`

```yaml
...
```


## Post and page frontmatter options

Automatic *cover* (also known as *hero* or *featured*) images, by appending `*__cove` (hint: double underscore) to an image’s filename.

Supports the following default parameters well:

```yaml
title
tags
series
draft
description
summary
```

Custom parameters:

```yaml
cover
cover_listing
show_comments
show_meta
show_toc
license
rating
dateread
datecreated
crosspost
publication.title
directURL
githubURL
```


* * *


## Bundled webfonts

Included fonts contain Latin, Greek and Cyrillic character sets.

- [Alegreya](https://www.huertatipografica.com/en/fonts/alegreya-ht-pro) font (serif)
- [Fantasque Sans Mono](https://github.com/belluzj/fantasque-sans) font (sans-serif, monospaced)
- Subset of [Feather icons](https://feathericons.com/) via [IcoMoon](https://icomoon.io/) with custom character mapping.


## Bundled JavaScript libraries

No core functionality depends on JavaScript being enabled. Functionality that depends on JavaScript *should* have a `<noscript>` alternative that is progressively enhanced when enabled. All bundled scripts are self-hosted within the theme and there is no automated build process for updating depedencies.

- [fixedsearch](https://gist.github.com/Arty2/8b0c43581013753438a3d35c15091a9f) enables searching articles
- [fuse.js](https://fusejs.io/) fuzzy-search engine used by *fixedsearch*
- [instant.page](https://instant.page/) page pre-loading for faster navigation
- [simple-lightbox](https://simplelightbox.com/) a touch-friendly image lightbox


* * *

© 2018-2024 [Heracles Papatheodorou](http://heracl.es) a.k.a [@heracles](https://www.mastodon.social/@heracles), [MIT Licence](./LICENCE.txt)
