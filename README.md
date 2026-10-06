# Eins

A reusable React + TypeScript foundation for SPA, PWA and Electron applications.
Shared UI uses MUI, routing uses TanStack Router, and i18next loads JSON translations on demand.

## Start

Use Node.js 22.12+ (Node 24 recommended) and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. React Fast Refresh is enabled.

| Target | Development | Production build | Output |
| --- | --- | --- | --- |
| SPA | `npm run dev:spa` | `npm run build:spa` | `dist/spa` |
| PWA | `npm run dev:pwa` | `npm run build:pwa` | `dist/pwa` |
| Electron | `npm run dev:electron` | `npm run build:electron` | `dist/electron`, `dist-electron` |

Electron development launches the desktop app, refreshes React components, and restarts the main process when it changes. Run one development target at a time; all use port 5173.

## Preview and package

- SPA: `npm run build:spa`, then `npm run preview:spa` (port 4173).
- PWA: `npm run build:pwa`, then `npm run preview:pwa` (port 4174).
- Desktop folder: `npm run package:electron:dir`.
- Desktop installer: `npm run package:electron`.
- All builds: `npm run build:all`.

Desktop packages go to `release/`. Package on the target operating system: Windows uses NSIS, macOS DMG, and Linux AppImage. Signing certificates, macOS notarization, app icons and publisher identity must be configured for distribution. The starter uses Electron's default desktop icon. Update `build.appId`, `build.productName`, name, version and author in `package.json` for each new project.

Browser deployments require a fallback to `index.html` for application routes, such as `/about`. They currently assume deployment at the domain root. Electron uses relative asset paths and hash routing to support local packaged files.

## PWA behavior

The PWA build includes a manifest, install icons and a service worker. Serve it over HTTPS or localhost. Use your browser's install action where supported.

Service workers are disabled in development to avoid stale caches during HMR. Test installation and offline behavior with the production preview. After the first successful service-worker installation, all bundled routes and translation chunks are precached. API data is not cached by this starter. New versions display a reload prompt instead of replacing an active session immediately.

SPA and Electron builds do not register a service worker. If replacing an existing PWA with a plain SPA at the same origin, explicitly retire its old service worker as part of deployment.

## Project structure

```text
electron/main.ts       Desktop window and security settings
src/components/        Shared layout and PWA update notice
src/pages/             Lazy-loaded route components
src/router.tsx         Typed route tree and target-specific history
src/i18n/locales/       JSON translations, grouped by language/namespace
src/theme.ts           Shared MUI theme
public/icons/          PWA icons
tests/                 Browser, offline and Electron integration tests
vite.config.ts         Target-specific build configuration
```

## Extend

Add a page in `src/pages/`, then register it in `src/router.tsx` with `createRoute` and `lazyRouteComponent`. TanStack links remain type checked.

English and German are included. To add a language, add `src/i18n/locales/<code>/common.json` and register it in `languages` in `src/i18n/index.ts`. The glob loader emits separate translation chunks; language selection persists in localStorage. English is the fallback.

For feature namespaces, add matching JSON files to each language directory and call `useTranslation('feature')`. Wrap components that load namespaces in Suspense. Translation edits participate in Vite's module reload; some changes can trigger a page reload.

MUI and its `sx` prop are the default styling layer. Tailwind is optional and not installed. See [architecture notes](docs/architecture.md) for integration guidance.

PWA icons can be regenerated with `node scripts/generate-icons.mjs`; edit the source SVG in that script to change the mark.

## Verification

```sh
npm run build:all
npx playwright install chromium
npm test
```

Tests cover navigation, direct route reloads, missing routes, language persistence, mobile overflow, offline PWA routes/translations, and Electron local-file navigation and Node isolation. The Electron test launches a desktop window. Run a subset with `npm test -- --project=spa`, `--project=pwa`, or `--project=electron`.

`npm run typecheck` checks the application, Electron entry, build configuration and tests.
