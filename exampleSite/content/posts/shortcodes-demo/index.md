---
title: "Shortcodes demo"
date: 2026-04-22
description: "Exercises the custom shortcodes bundled with the onion theme."
tags: ["shortcodes", "theme"]
cover: gallery/a.png
---

This post is the one place that exercises every custom shortcode. It doubles
as both the Hugo-themes showcase and the CI smoke test.

## figure

The `figure` shortcode pipes a bundled image through the theme's
`render-image` partial, so it gets responsive `srcset`, WebP where Extended
is available, and the base64 placeholder trick for JPEGs.

{{< figure src="gallery/a.png" title="A figure" caption="With a caption." attr="credit" attrlink="https://example.org/" >}}

## gallery (directory mode)

Passing `dir=` generates a pile of thumbnails from the matching bundle
directory. Click one on the live site to cycle.

{{< gallery dir="gallery" class="pile" />}}

## marginalia

Sidenotes stay in the margin on wide viewports and collapse to inline
`<aside>` blocks on narrow ones.

{{< marginalia >}}
A **margin note** supports inline markdown.
{{< /marginalia >}}

Body copy continues around it.

## section

`section` is a thin wrapper around `<section>` with optional `class` and
`style`.

{{< section class="note" >}}
Content inside a named section.
{{< /section >}}

## articles-list

`articles-list` renders a grouped list of pages by type, with an optional
tag filter and an item cap.

{{< articles-list types="posts" items=4 title="Recent posts" >}}

## simple-signup

A styled HTML form — no JavaScript, so works everywhere.

{{< simple-signup label="Subscribe for updates" placeholder="you@example.org" subscribe="Subscribe" name="email" action="https://example.org/subscribe" >}}

## files-list

Lists files matching a regex inside `static/`. Handy for PDF downloads.

{{< files-list dir="downloads" regexp=".txt$" >}}

## menu-social

Rendered inline; normally lives in the footer.

{{< menu-social >}}

## include

Pulls the rendered content of another page — handy for shared prose or
reusable callouts.

{{< include "/about" >}}
