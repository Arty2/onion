---
title: "GitHub content demo"
date: 2026-04-18
description: "Pulls a README from a public GitHub repo at build time."
tags: ["shortcodes", "theme"]
---

The `github-content` shortcode fetches a repository's README via the
unauthenticated GitHub API and inlines its rendered Markdown. If the
network call fails, it warns and falls back to a link.

{{< github-content repository="gohugoio/hugo-mod-bootstrap-scss" branch="main" >}}
