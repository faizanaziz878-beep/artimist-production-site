/**
 * Stand-in for `cloudflare:workers` on non-Cloudflare runtimes.
 *
 * Every binding is absent, so callers hit their existing "binding
 * unavailable" branches (see db/index.ts and the media routes) instead of
 * crashing on an unresolvable module specifier.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const env: any = {};

export default { env };
