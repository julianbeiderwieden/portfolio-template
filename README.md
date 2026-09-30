# Portfolio Template

Portfolio website template. The website is built with [Astro](https://astro.build) and [Tailwind CSS 4](https://tailwindcss.com), content is managed in [Sanity Studio](https://www.sanity.io). The site is generated as static HTML and deployed on [Netlify](https://www.netlify.com).

## How it works

- The repository contains two apps (npm workspaces):
  - `astro-app/` – the website
  - `studio/` – Sanity Studio, the editor for all content
- Content is stored in a Sanity **project** in Sanity's cloud, in a **dataset** named `production`. The Studio writes to it, the website reads from it.
- The website is static: all pages are generated during the build. On the live site, content changes appear only after a new build (see [automatic rebuilds](#rebuild-automatically-when-content-changes)). During local development, reloading the page is enough.
- The website shows **published** content only, never drafts.

Layout: on desktop, the navigation fills the left half and the content the right half. On mobile, both are stacked. The home page and `/projects` show a slideshow of the project cover images. On `/projects` and project pages, the navigation lists all projects; hovering a project name shows its cover image.

## Requirements

- [Node.js](https://nodejs.org) 22.12 or newer (includes npm). Check with `node -v`.
- [Git](https://git-scm.com)
- A free [Sanity](https://www.sanity.io) account
- For deployment: a [GitHub](https://github.com) account and a free [Netlify](https://www.netlify.com) account

## Getting started

Run all commands in a terminal, in the repository root (the folder that contains this README), unless stated otherwise.

### 1. Get the code

Create your own repository from this one on GitHub (**Fork**, or **Use this template** if available). Then clone it and install the dependencies:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### 2. Create a Sanity project

```bash
cd studio
npx sanity login
npx sanity init --env
cd ..
```

- `sanity login` opens the browser. Log in or create an account.
- `sanity init` asks a few questions. Create a new project and give it a name. When asked **Use the default dataset configuration?**, answer yes. This creates a public dataset named `production`.
- The project ID is written to `studio/.env`.

Alternative: create the project at [sanity.io/manage](https://www.sanity.io/manage), copy the project ID from the project page and make sure a dataset named `production` exists.

### 3. Add the environment variables

Both apps need the project ID in their own `.env` file.

```bash
cp astro-app/.env.example astro-app/.env
```

Only if `studio/.env` does not exist yet:

```bash
cp studio/.env.example studio/.env
```

Open both files and enter your project ID (replace `abc123de`):

`studio/.env`

```bash
SANITY_STUDIO_PROJECT_ID=abc123de
SANITY_STUDIO_DATASET=production
```

`astro-app/.env`

```bash
PUBLIC_SANITY_STUDIO_PROJECT_ID=abc123de
PUBLIC_SANITY_STUDIO_DATASET=production
```

If `sanity init` wrote other variable names to `studio/.env`, rename them to the names above. `.env` files are ignored by Git and never committed.

### 4. Import the demo content (optional)

```bash
npm run seed --workspace=studio
```

Imports three sample projects with placeholder text (lorem ipsum) and plain gray images. Between them they use every content block except video: text, images, slideshows and two columns. Also included: About, Contact, Imprint, Privacy and Settings, with a favicon and a social image. If the CLI asks for a target dataset, choose `production`.

> [!WARNING]
> The import replaces documents with the same IDs. Running it again resets Settings, About, Contact, Imprint, Privacy and the demo projects to the demo content. To try the demo without touching your content, import it into a separate dataset instead: `npx sanity dataset create demo --visibility public`, then `npx sanity dataset import ./seed/content.ndjson --dataset demo --replace` in `studio/`, and set the dataset in both `.env` files to `demo`.

Skip this step to start with an empty site.

### 5. Start the development servers

```bash
npm run dev
```

| URL                                            | App                                             |
| ---------------------------------------------- | ----------------------------------------------- |
| [http://localhost:4321](http://localhost:4321) | Website                                         |
| [http://localhost:3333](http://localhost:3333) | Sanity Studio (log in with your Sanity account) |

Stop both with `Ctrl + C`.

### 6. Replace the demo content

In the Studio:

1. **Settings**: set **Site title** and, in the **SEO** tab, **Site URL**. Click **Publish**.
2. **Projects**: edit or delete the demo projects, add your own.
3. **About**, **Contact**, **Imprint**, **Privacy**: add your text.

Reload the website to see the changes. Then continue with [Deployment](#deployment).

## Managing content

Every change must be **published** (button at the bottom right of the document) before it appears on the website.

| Studio entry | Page               | Content                                                   |
| ------------ | ------------------ | --------------------------------------------------------- |
| **Projects** | `/projects/<slug>` | One document per project                                  |
| **About**    | `/about`           | Rich text                                                 |
| **Contact**  | `/contact`         | Rich text                                                 |
| **Imprint**  | `/imprint`         | Title and rich text                                       |
| **Privacy**  | `/privacy`         | Title and rich text                                       |
| **Settings** | all pages          | Site title, language, favicon, SEO and link preview texts |

About, Contact, Imprint, Privacy and Settings exist exactly once and cannot be deleted. A page without content shows "This page has no content yet."

### Projects

| Field                       | Required | Effect                                                                                                                    |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| Title                       | yes      | Page heading and entry in the project list                                                                                |
| Slug                        | yes      | URL of the page: `/projects/<slug>`. Click **Generate** to create it from the title.                                      |
| Order                       | no       | Position in the project list and slideshow, lower numbers first. Without numbers, projects are sorted by title.           |
| Metadata                    | no       | Label/value pairs shown under the title, e.g. `Year` / `2024`                                                             |
| Excerpt                     | no       | Not shown on the page. Used as the meta description if the SEO tab has none.                                              |
| Cover image (**Cover** tab) | no       | Slideshow on `/` and `/projects`, hover preview in the navigation, preview image for shared links                         |
| Content                     | no       | Text, image, slideshow, two-column and video blocks in any order. Add blocks with **Add item**, reorder them by dragging. |
| **SEO** tab                 | no       | SEO title and meta description for this page                                                                              |

- Projects without a cover image appear in the navigation, but not in the slideshow.
- If **Content** is empty, the project page shows the cover image.
- Every project page ends with a link to the next project in the order (after the last, the first).
- If a project page starts with its cover image, clicking the cover in the slideshow lets it grow into place on the project page (in browsers with View Transitions).
- Tip: number the projects in steps of 10 (10, 20, 30, …) so you can insert new ones in between.

### Images

- **Alt text**: describes the image for screen readers and search engines. The Studio warns if it is missing.
- **Caption**: optional, shown below the image.
- Images are shown uncropped in their original aspect ratio, at most 70 % of the screen height.
- While an image loads, a blurred preview of it is shown.
- On project pages, clicking an image enlarges it. Arrow buttons, the arrow keys or swiping switch between the project's images. Clicking the enlarged image zooms in on details if the uploaded file is large enough; moving the mouse (or dragging on touch screens) moves around. Close with the × button, Escape, a click next to the image or, on touch screens, by dragging the image down.
- Upload images in full resolution. The website loads scaled versions (640–2400 px wide) in modern formats from the Sanity image CDN. SVG files are used as they are.

### Slideshows in projects

A **Slideshow** block shows its images one at a time, like the slideshow on the home page, with previous/next buttons next to the caption below it. On touch screens, swiping also switches slides. Each image has its own alt text and caption. A slideshow with a single image is shown as a normal image.

### Two columns in projects

A **Two columns** block has a left and a right column, always of equal width. Each column holds text and images, stacked; put an image into each column to show two images side by side. Text in columns is set smaller than full-width text. On narrow phones (below 640 px) the columns are stacked.

### Videos in projects

A **Video** block plays an uploaded video file (MP4 with H.264 works in every browser). Keep files small: they are served as uploaded, ideally under 20 MB.

- **Play as moving image** (on by default): plays muted and looping, without controls, while it is on screen. Off: a player with sound and controls.
- **Poster image**: shown until the video plays. It also reserves the video's space, so the page doesn't jump while it loads.
- **Description**: describes the video for screen readers. **Caption**: optional, shown below it.
- With "reduce motion" enabled in the operating system, moving images don't start on their own and get controls instead.

### Rich text

- Write paragraphs; use italic and links for formatting.
- Link: select text, click the link icon, enter the URL. Allowed: `https://…`, `mailto:…`, `tel:…` or a path such as `/contact`. Enable **Open in new tab** if needed.
- The editor also offers headings, lists and quotes. The website shows them without extra styling: headings look like normal text, lists have no bullets.

### Settings

| Tab            | Field                  | Effect                                                                                                                                                               |
| -------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| General        | Site title             | Top left in the navigation, browser tab, web app manifest. Default: `Portfolio`                                                                                      |
| General        | Language               | `lang` attribute, `og:locale`, manifest. Does not translate the navigation labels (see [Text in the code](#text-in-the-code)).                                       |
| General        | Navigation footer text | Optional small text above the Imprint and Privacy links. Line breaks are kept.                                                                                       |
| General        | Favicon                | Icon for the browser tab, home screen and `favicon.ico`. Square SVG, or square PNG of at least 512 × 512 px.                                                         |
| SEO            | SEO title              | Title of the home page in search results and the browser tab. Falls back to the site title. Other pages use `<page title> – <site title>`.                           |
| SEO            | Meta Description       | Description for search results. Used on every page that has no own description.                                                                                      |
| SEO            | Site URL               | Address of the live site, e.g. `https://example.com`. Required for canonical URLs, `sitemap.xml`, the sitemap line in `robots.txt` and `og:url`.                     |
| Social Preview | Social title           | Title for link previews (messengers, social media) of the home page. Falls back to the SEO title.                                                                    |
| Social Preview | Social description     | Description for link previews. Falls back to the meta description.                                                                                                   |
| Social Preview | Social image, alt text | Preview image for shared links, 1200 × 630 px. Used on all pages except projects (they use their cover image). Without it, the favicon is used (needs the Site URL). |

## Customizing the code

### Colors

All colors are defined in the `@theme` block in `astro-app/src/styles/global.css`:

| Token                 | Used for                                                             |
| --------------------- | -------------------------------------------------------------------- |
| `--color-background`  | Page background, also the `theme-color` meta tag and manifest colors |
| `--color-foreground`  | Text                                                                 |
| `--color-muted`       | Secondary text: inactive navigation links, captions, empty states    |
| `--color-divider`     | Line between navigation and content                                  |
| `--color-placeholder` | Background behind images while they load                             |

Use them as Tailwind classes, e.g. `bg-background`, `text-muted`. Tailwind's default colors are disabled (`--color-*: initial`), so classes such as `text-red-500` do not exist.

### Font and text sizes

The font is [Overused Grotesk](https://github.com/RandomMaerks/Overused-Grotesk) (variable font, SIL Open Font License, see `astro-app/public/fonts/OFL.txt`). To use a different font:

1. Put the `.woff2` file into `astro-app/public/fonts/`.
2. Update `@font-face`, `--font-sans` and `--font-italic` in `astro-app/src/styles/global.css`.
3. Update the font `<link rel="preload">` in `astro-app/src/layouts/Layout.astro`.

Text sizes: `--text-body` (main text, scales with the window width), `--text-column` (text in two-column blocks, also scaling) and `--text-meta` (captions) in `global.css`.

### Text in the code

Interface texts are in English and set in the code:

| Text                                                   | File                                              |
| ------------------------------------------------------ | ------------------------------------------------- |
| Navigation: Projects, About, Contact, Imprint, Privacy | `astro-app/src/components/SiteNav.astro`          |
| "Skip to content" link                                 | `astro-app/src/layouts/Layout.astro`              |
| "No projects published yet."                           | `astro-app/src/components/CoverSlideshow.astro`   |
| "This page has no content yet.", fallback page titles  | `about.astro`, `contact.astro`, `LegalPage.astro` |
| 404 page                                               | `astro-app/src/pages/404.astro`                   |

To change a URL (e.g. `/imprint` → `/impressum`), rename the file in `astro-app/src/pages/` and update the link in `SiteNav.astro` and the entry in `astro-app/src/pages/sitemap.xml.ts`.

### Slideshow

Slides change every 4 seconds (`INTERVAL` in `astro-app/src/components/Slideshow.astro`), for the cover slideshow and slideshows in projects alike. A slideshow waits while the mouse is over it, while it is out of view and while one of its images is enlarged. With "reduce motion" enabled in the operating system, slides only change with the buttons or by swiping, and all animations are off.

### Adding a field

1. Add the field to the schema in `studio/src/schemaTypes/`, e.g. `documents/project.ts`.
2. Add it to the GROQ query and the TypeScript interface in `astro-app/src/utils/sanity.ts`.
3. Render it in the page, e.g. `astro-app/src/pages/projects/[slug].astro`.

For a new singleton page, also register the schema in `studio/src/schemaTypes/index.ts` (including `singletonTypes`), add it to the Studio sidebar in `studio/sanity.config.ts`, and add the page to `SiteNav.astro` and `sitemap.xml.ts`.

### Security headers

`netlify.toml` sets a Content Security Policy that only allows resources from the site itself and from `*.sanity.io`. External fonts, scripts, analytics or embeds (YouTube, Vimeo, …) are blocked on Netlify until you add their domains there. The headers do not apply during local development.

## Deployment

### Website on Netlify

1. Push your repository to GitHub.
2. In Netlify, choose **Import an existing project** and select the repository. Build command and publish directory are read from `netlify.toml`; keep the defaults.
3. Add two environment variables (during the import, or later under **Configuration → Environment variables**):

   | Key                               | Value           |
   | --------------------------------- | --------------- |
   | `PUBLIC_SANITY_STUDIO_PROJECT_ID` | your project ID |
   | `PUBLIC_SANITY_STUDIO_DATASET`    | `production`    |

4. Deploy.
5. In the Studio, set **Settings → SEO → Site URL** to the live address (Netlify URL or your own domain) and publish. Then start a new build in Netlify: **Deploys → Trigger deploy**.

A custom domain can be added in Netlify under **Domain management**.

### Rebuild automatically when content changes

Without this, every content change needs a manual **Trigger deploy** in Netlify.

1. Netlify: **Configuration → Build & deploy → Continuous deployment → Build hooks → Add build hook**. Copy the URL.
2. [sanity.io/manage](https://www.sanity.io/manage) → your project → **API → Webhooks → Create webhook**:
   - URL: the build hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - HTTP method: POST
3. Save. Every publish in the Studio now starts a new Netlify build.

### Studio on Sanity

Deploy the Studio so it can be used without running it locally:

```bash
npm run deploy --workspace=studio
```

- On the first deploy, choose a hostname. The Studio is then available at `https://<hostname>.sanity.studio`. To skip the question, set `SANITY_STUDIO_STUDIO_HOST` in `studio/.env`.
- The CLI prints an app ID. Add it to `studio/.env` as `SANITY_STUDIO_APP_ID`, so later deploys update the same Studio without asking.
- Invite other editors at [sanity.io/manage](https://www.sanity.io/manage) → your project → **Members**.

## Commands

Run in the repository root:

| Command                             | Description                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`                       | Start website (port 4321) and Studio (port 3333)                                        |
| `npm run dev:web`                   | Start the website only                                                                  |
| `npm run dev:studio`                | Start the Studio only                                                                   |
| `npm run build`                     | Type check (`astro check`, `tsc`) and build the website into `astro-app/dist`           |
| `npm run format`                    | Format all files with Prettier                                                          |
| `npm run format:check`              | Check formatting without changing files                                                 |
| `npm run seed --workspace=studio`   | Import the demo content (overwrites, see [step 4](#4-import-the-demo-content-optional)) |
| `npm run deploy --workspace=studio` | Deploy the Studio to `sanity.studio`                                                    |

## Project structure

```text
.
├── astro-app/                     Website (Astro)
│   ├── public/fonts/              Web font and its license
│   └── src/
│       ├── components/            Navigation, slideshow, images, rich text
│       ├── layouts/Layout.astro   Page frame: split layout, meta tags, Open Graph, JSON-LD, favicons
│       ├── pages/                 One file per route (see below)
│       ├── styles/global.css      Colors, font, text sizes
│       └── utils/sanity.ts        GROQ queries, types, image URL helpers
├── studio/                        Sanity Studio
│   ├── sanity.config.ts           Studio sidebar
│   ├── seed/                      Demo content and placeholder images
│   └── src/schemaTypes/           Content model: documents and reusable objects
├── netlify.toml                   Netlify build settings and security headers
└── package.json                   Scripts for both workspaces
```

Routes (files in `astro-app/src/pages/`):

| Route                                                                  | File                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `/`                                                                    | `index.astro` – slideshow of cover images                               |
| `/projects`                                                            | `projects/index.astro` – slideshow, project list open in the navigation |
| `/projects/<slug>`                                                     | `projects/[slug].astro`                                                 |
| `/about`, `/contact`                                                   | `about.astro`, `contact.astro`                                          |
| `/imprint`, `/privacy`                                                 | `imprint.astro`, `privacy.astro`                                        |
| any unknown URL                                                        | `404.astro`                                                             |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/favicon.ico` | `*.ts` endpoints, generated during the build from the Settings          |
| `/icons/<size>.png`                                                    | `icons/[size].png.ts` – favicon as PNG in 16, 32, 48, 180, 192, 512 px  |

## SEO and web standards

Built without plugins, controlled by the Settings in the Studio:

- `<title>`, meta description, canonical URL, Open Graph, Twitter Card and JSON-LD (`WebSite`) in `Layout.astro`. Projects, About and Contact can set their own SEO title and description.
- `/sitemap.xml` with all pages and projects, `/robots.txt` with a reference to the sitemap. Both need the **Site URL**.
- Favicon: `favicon.ico`, PNG sizes for browser tabs, the Apple touch icon and the manifest are generated during the build. SVG favicons are converted to PNG and additionally linked as SVG. Without a favicon in the Settings, no icon is linked and the icon URLs return 404.
- `/manifest.webmanifest`, 404 page with `noindex`.
- Accessibility: skip link, alt texts, `aria-current` in the navigation, reduced motion respected.
- Security headers in `netlify.toml`.

## Troubleshooting

| Problem                                                                    | Solution                                                                                                                                                   |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Missing Sanity project ID` when starting or building                      | `astro-app/.env` is missing or empty (locally), or the environment variables are not set in Netlify.                                                       |
| Studio cannot find the project `your-project-id`                           | `studio/.env` is missing or empty.                                                                                                                         |
| Website shows "No projects published yet." although the Studio has content | Publish the documents. Check that both `.env` files contain the same project ID and dataset. The dataset must be public (sanity.io/manage → **Datasets**). |
| Studio shows a CORS error                                                  | sanity.io/manage → **API → CORS origins** → add `http://localhost:3333` with **Allow credentials**.                                                        |
| A change is visible locally but not on the live site                       | The live site needs a new build: **Trigger deploy** in Netlify, or set up the [webhook](#rebuild-automatically-when-content-changes).                      |
| `sitemap.xml` is empty, no canonical URL                                   | Set **Settings → SEO → Site URL** and rebuild.                                                                                                             |
| External font, script or embed works locally but not on Netlify            | Blocked by the Content Security Policy, see [Security headers](#security-headers).                                                                         |
| `npm install` or `npm run dev` complains about the Node.js version         | Install Node.js 22.12 or newer.                                                                                                                            |
