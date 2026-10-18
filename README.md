# Humi Docs

The Humi documentation site, served at
<https://cloud.humi.kaese.space/docs/>. Built with
[VitePress](https://vitepress.dev), with search built in (local search,
indexed at build time) and the Humi look from cloud-ui.

## Development

> npm install
> npm run dev

This opens a development server, likely on http://localhost:5173/docs/

`npm run build` builds the static site into `docs/.vitepress/dist`, and
`npm run preview` serves that build.

## Writing

Pages are Markdown files under `docs/`. See `docs/writing-docs.md`.

## Styling

`docs/.vitepress/theme/` holds the Humi theme:

| File | What |
|---|---|
| `theme.css`, `components/BrandMark.vue`, `components/HumiH.vue`, `components/ThemeToggle.vue`, `composables/useTheme.js`, `../public/` | Copied **unchanged** from cloud-ui. Change them there first (see `cloud-ui/DESIGN.md`) and copy them across. |
| `humi.css` | Maps VitePress's variables onto the Humi tokens |
| `Layout.vue` | Puts the Humi logo and theme toggle into VitePress's top bar |
| `index.js` | Ties it together, and mirrors `data-theme` onto VitePress's `dark` class |

The light/dark choice is shared with cloud-ui: both use the `humi-theme`
localStorage key on the same origin.

## Deployment

The Docker image serves the build with nginx under `/docs/`. It is deployed
by `huemie-gitops-base/cloud/base/humi-docs`, and the cloud ingress routes
`/docs` to it.
