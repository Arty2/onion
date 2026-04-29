---
title: "Forge content demo"
date: 2026-04-29
description: "Inlines a README from a public GitHub repo at build time via the multi-platform forge-content shortcode."
tags: ["shortcodes", "theme"]
---

The `forge-content` shortcode fetches a README (or any file) from a
public GitHub / GitLab / Forgejo / Codeberg repo at build time and
inlines its rendered Markdown. Untrusted remote content is filtered
through three security passes before reaching `markdownify`: Hugo
shortcode delimiters are neutralised, dangerous HTML tags are
entity-escaped, and event-handler attributes are stripped. If the
network call fails, it warns and falls back to a link.

{{< forge-content repository="github.com/gohugoio/hugo-mod-bootstrap-scss" branch="main" >}}
