# exampleSite

This site is both the theme's Hugo-themes-gallery `exampleSite/` and the
development / CI test harness. Every custom shortcode bundled with the theme
is exercised in [`content/posts/shortcodes-demo/`](content/posts/shortcodes-demo/index.md).

## Local preview

```sh
cd exampleSite
hugo server
```

`themesDir = "../.."` is set in `hugo.toml`, so Hugo resolves the theme from
the working copy of the repo.

## Vercel preview deployments

A [`vercel.json`](../vercel.json) at the repo root builds this site on every
push to Vercel. It pins `HUGO_VERSION=0.140.2` and sets `--baseURL` from
`$VERCEL_URL` so preview deploys get correct absolute links.

## CI

The GitHub Actions workflow [`.github/workflows/build.yml`](../.github/workflows/build.yml)
runs `hugo --gc --minify --printPathWarnings` from this directory and uploads
`public/` as an artefact.
