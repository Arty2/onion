# Releasing

Hugo Module consumers fetch the theme via the Go module proxy:

```sh
hugo mod get github.com/arty2/onion@latest
```

`@latest` resolves to the highest semver tag. To cut a release:

```sh
git tag v0.X.Y
git push origin v0.X.Y
```

The Go proxy picks it up within a few minutes. Users then upgrade with:

```sh
hugo mod get -u github.com/arty2/onion@v0.X.Y
```

## Versioning

This theme stays on `v0.x.x` indefinitely. Per Go's [semantic-import-versioning rule](https://go.dev/ref/mod#major-version-suffixes), any tag with major version ≥ 2 requires a `/v2` (or `/v3`, …) suffix in the `go.mod` module path AND in every consumer's `theme = ["…"]` line. Staying on v0 sidesteps that without giving up granular versioning of changes — and is well-precedented in the Go ecosystem (`golang.org/x/…`, many widely-used libraries).

Within `v0`:

- **MINOR** (`v0.X.0`) — new shortcodes, partials, params, i18n strings, OR breaking changes to template params, partials a downstream site might override, CSS class names, or removed shortcodes. (In v0, breaking changes don't bump a major; they bump MINOR. Downstream sites should pin a minor version they've tested.)
- **PATCH** (`v0.X.Y`) — bug fixes, doc updates, asset tweaks, CI changes, dependency bumps.

The first release under this policy is `v0.1.0`. The retired pre-policy tags (v1.0, v2.x, v3.x) are catalogued in [CHANGELOG.md](./CHANGELOG.md).

## Pre-release checklist

- `cd exampleSite && hugo --gc --minify` builds clean.
- `hugo mod verify` exits 0.
- CI is green on `master` (matrix: pinned + latest Hugo).
- `images/screenshot.png` and `images/tn.png` exist at the required
  dimensions (1500x1000 and 900x600). Regenerate via `tools/screenshot.sh`.
- Bump `min_version` in `theme.toml` if the release relies on a newer Hugo
  template feature.

Tagging itself is a manual step; CI does not auto-tag.
