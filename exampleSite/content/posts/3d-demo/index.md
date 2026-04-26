---
title: "3D model viewer"
date: 2026-04-17
description: "Embeds a glTF model via the model-viewer shortcode."
tags: ["shortcodes", "theme"]
---

The `model-viewer` shortcode uses Google's `<model-viewer>` web component to
render a glTF / glb file. The 882 KB script is only loaded on pages that
include the shortcode (see `partials/scripts.html`).

The model below is a cube from the [Khronos glTF sample models](https://github.com/KhronosGroup/glTF-Sample-Models) (MIT-licensed).

{{< model-viewer src="cube.glb" alt="A unit cube." caption="Khronos Box sample (1.6 KB)." >}}
