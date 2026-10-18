# Writing docs

The docs are Markdown files under `docs/`, built by
[VitePress](https://vitepress.dev).

## Adding a page

1. Create a `.md` file, e.g. `docs/guide/rules.md`. Its URL is the path
   without the extension: `/docs/guide/rules`.
2. Add it to the sidebar in `docs/.vitepress/config.mjs`.

Search picks up every page automatically when the site is built.

## Callouts

```md
::: tip
Something that helps.
:::

::: warning
Something to be careful about.
:::

::: danger
Something that can break things.
:::
```

::: tip
Something that helps.
:::

::: warning
Something to be careful about.
:::

::: danger
Something that can break things.
:::

## Styling

The look comes from Humi's own tokens (`theme/theme.css`, copied from
cloud-ui). Don't hard-code colours in pages; see `cloud-ui/DESIGN.md`.
