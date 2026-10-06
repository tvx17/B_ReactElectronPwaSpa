# Architecture

## One application, three outputs

Vite's mode selects the build target and defines the compile-time `__APP_TARGET__` constant. Shared React code stays in `src/`; desktop host code stays in `electron/`. Output directories are separate so building one target does not erase another.

TanStack Router uses explicit code-based routes and lazy page imports. Browser builds use browser history, while Electron uses hash history to avoid treating routes as filesystem paths.

i18next uses a dynamic-import backend instead of HTTP-only translation requests. The same translation files therefore work from a web server, an offline PWA cache, and Electron's local files. Additional namespaces can load independently of the initial common namespace. PWA precaching downloads translation chunks ahead of offline use even though the application imports them on demand.

## Desktop boundary

The renderer is sandboxed with context isolation and without Node integration. There is currently no preload bridge or IPC API because the starter needs no native capabilities. New windows, top-level navigation and permission requests are denied. Packaged windows load local assets and use a restrictive CSP; development additionally permits Vite's inline React Refresh preamble and local WebSocket for HMR.

If adding native functionality, expose narrowly scoped methods through a context-isolated preload bridge and validate IPC senders and arguments. Keep filesystem and process access in the main process.

## Optional Tailwind

MUI's theme and `sx` are sufficient for the starter. If a project needs Tailwind, install `tailwindcss` and `@tailwindcss/vite`, add the Vite plugin, and follow MUI's current Tailwind integration guide for CSS layer ordering. Enable MUI's CSS layer support and decide whether to omit Tailwind Preflight to avoid competing with CssBaseline. Keep colors and typography aligned with the MUI theme.

## References

- [Vite guide](https://vite.dev/guide/)
- [TanStack code-based routing](https://tanstack.com/router/latest/docs/routing/code-based-routing)
- [Vite PWA guide](https://vite-pwa-org.netlify.app/guide/)
- [Electron Vite](https://electron-vite.github.io/guide/getting-started)
- [i18next dynamic resources](https://www.i18next.com/how-to/add-or-load-translations)
- [MUI installation](https://mui.com/material-ui/getting-started/installation/)
- [Electron security](https://www.electronjs.org/docs/latest/tutorial/security)
