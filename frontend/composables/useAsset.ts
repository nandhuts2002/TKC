// Prefixes /public paths with the app base URL (needed on GitHub Pages, served from /TKC/).
export function asset(path: string): string {
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return path.startsWith('/') ? base + path : path
}
