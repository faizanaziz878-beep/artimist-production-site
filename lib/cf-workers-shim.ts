/**
 * Stand-in for `cloudflare:workers` on non-Cloudflare runtimes.
 *
 * Every binding is absent, so callers hit their existing "binding
 * unavailable" branches (see db/index.ts and the media routes) instead of
 * crashing on an unresolvable module specifier.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const env: any = {};

// The Cloudflare Vite adapter re-exports these base classes while assembling
// the worker bundle. Vercel never instantiates them, but named exports must be
// present for the production build to remain portable.
export class WorkerEntrypoint<Env = unknown> {
  env: Env;
  ctx: unknown;
  constructor(ctx: unknown, runtimeEnv: Env) {
    this.ctx = ctx;
    this.env = runtimeEnv;
  }
}

export class DurableObject<Env = unknown> extends WorkerEntrypoint<Env> {}
export class WorkflowEntrypoint<Env = unknown> extends WorkerEntrypoint<Env> {}

export default { env, WorkerEntrypoint, DurableObject, WorkflowEntrypoint };
