---
title: "Articles filter"
date: 2026-04-21
description: "Exercises the articles-filter shortcode against a tag-filterable list."
tags: ["shortcodes", "theme"]
---

The `articles-filter` shortcode renders a tag picker that toggles
visibility on any list with class `articles-filterable`. Click a tag below
to filter the list.

{{< articles-filter >}}

{{< articles-list class="articles-filterable" types="posts" items=20 title="All posts" >}}
