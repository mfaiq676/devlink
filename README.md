# 🔗 DevLink – Dynamic Developer Resource Hub

[![Deploy to GitHub Pages](https://github.com/mfaiq676/devlink/actions/workflows/deploy.yml/badge.svg)](https://github.com/mfaiq676/devlink/actions/workflows/deploy.yml)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![Mantine](https://img.shields.io/badge/Mantine-7-339af0?logo=mantine)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)

A fast, accessible resource directory where developers can search, filter, bookmark and discover
tools, UI libraries, APIs and frameworks. It runs entirely in the browser: no backend, no database.

### 🚀 [Live Preview](https://mfaiq676.github.io/devlink/)

Try a pre-filtered link: [UI libraries matching "tailwind"](https://mfaiq676.github.io/devlink/?category=ui&search=tailwind)


---

## ✨ Features

- **Resource grid and search:** cards with title, description, category badge, tags, link and bookmark button. Real-time search across title, tags and description.
- **Category tabs:** instant filtering by UI Libraries, Backend & APIs, Icons & Assets and AI Tools.
- **Shareable URL state:** filters sync to the URL, e.g. `?category=ui&search=tailwind&saved=1`.
- **Bookmarks:** heart toggle with persistence in `localStorage`, plus a "Show saved only" filter.
- **Quick-view modal:** pricing, official docs link, copyable install command and related tools.
- **Responsive and accessible:** mobile-first grid, keyboard-friendly, labelled controls, light/dark mode.

## 🧰 Tech stack

Next.js 15 (App Router) · React 19 · Mantine 7 · TypeScript · Tabler Icons

## 📁 Project structure

```
src/
├─ app/            layout (MantineProvider, font) and page (Suspense boundary)
├─ components/     Header, FilterBar, ResourceGrid, ResourceCard, QuickViewModal, EmptyState, ResourceHub
├─ hooks/          useResourceFilters (URL state), useBookmarks (localStorage)
├─ lib/            filterResources (pure filter logic), params (URL parsing)
├─ data/           resources.ts, categories.ts
├─ types/          resource.ts
└─ theme.ts        Mantine theme
.github/workflows/ deploy.yml   (GitHub Pages deployment)
```

## 🏃 Run locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/mfaiq676/devlink.git
cd devlink
npm install
npm run dev
```

Open http://localhost:3000.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the static export in `out/` |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |

## 🌐 Deploy to GitHub Pages

1. Push this project to a GitHub repository named `devlink`.
2. In the repo, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.
4. After about two minutes, the site is live at `https://mfaiq676.github.io/devlink/`.

If your repository has a different name, change `repoName` in `next.config.mjs` to `"/your-repo-name"`.
For a `<username>.github.io` repository, set it to `""`.

## ➕ Adding content

Add an object to `RESOURCES` in `src/data/resources.ts`. To add a category, extend `CategoryId` in
`src/types/resource.ts` and add an entry to `CATEGORIES` in `src/data/categories.ts`.

## 📄 License

MIT
