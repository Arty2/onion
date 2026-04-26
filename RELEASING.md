# Releasing

Hugo Module consumers fetch the theme via the Go module proxy:

```sh
hugo mod get github.com/arty2/onion@latest
```

`@latest` resolves to the highest semver tag in the repo. To cut a release:

```sh
git tag vX.Y.Z
git push origin vX.Y.Z
```

The Go proxy picks it up within a few minutes. Users then upgrade with:

```sh
hugo mod get -u github.com/arty2/onion@vX.Y.Z
```

## Versioning

We follow [SemVer](https://semver.org/):

- **MAJOR** — breaking changes to template params, partials a downstream
  site might override, CSS class names, or removed shortcodes.
- **MINOR** — new shortcodes, partials, params, or i18n strings.
- **PATCH** — bug fixes, doc updates, asset tweaks, CI changes.

The first release should be `v1.0.0`.

## Pre-release checklist

- `cd exampleSite && hugo --gc --minify` builds clean.
- `hugo mod verify` exits 0.
- CI is green on `master` (matrix: pinned + latest Hugo).
- `images/screenshot.png` and `images/tn.png` exist at the required
  dimensions (1500x1000 and 900x600). Regenerate via `tools/screenshot.sh`.
- Bump `min_version` in `theme.toml` if the release relies on a newer Hugo
  template feature.

Tagging itself is a manual step; CI does not auto-tag.
