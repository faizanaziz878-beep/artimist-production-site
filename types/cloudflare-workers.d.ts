/**
 * Minimal ambient declarations for the Cloudflare Workers runtime.
 *
 * The site is authored for the Workers runtime (OpenAI Sites), where these
 * types and the `cloudflare:workers` module are supplied by the platform.
 * They are not installed as a dependency, so a plain `tsc`/`next build` on a
 * Node host (Vercel) cannot resolve them. These stubs keep the type check
 * honest without pulling in a platform-only package.
 *
 * If `@cloudflare/workers-types` is ever added to the project, delete this
 * file — it would collide with the real declarations.
 */

declare module "cloudflare:workers" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const env: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fetcher = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type D1Database = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type R2Bucket = any;
