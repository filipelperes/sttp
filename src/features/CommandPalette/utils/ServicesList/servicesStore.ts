import type { IServicesList } from "@/types/Service";
import { ServicesList as BuiltInServices } from "./index";
import { loadUserServices } from "@/features/Settings/utils/servicesStorage";

// ── In-memory cache ──────────────────────────────────────────────────────────
// Avoids synchronous localStorage reads on every keystroke (previously called
// ~60×/min during active typing). The cache is invalidated explicitly whenever
// user services are modified.
let _cachedMerged: IServicesList | null = null;

/**
 * Returns the complete merged services list:
 * built-in hardcoded services + user-defined services from localStorage.
 *
 * Results are cached in memory after the first call. Call
 * `invalidateServicesCache()` after any write to user services to refresh.
 *
 * User services take precedence if there's a key collision.
 */
export const getMergedServicesList = (): IServicesList => {
  if (!_cachedMerged) {
    _cachedMerged = {
      ...BuiltInServices,
      ...loadUserServices(),
    };
  }
  return _cachedMerged;
};

/**
 * Invalidates the in-memory merged-services cache.
 * Must be called after any write to user services (add, edit, remove,
 * profile load, etc.) so the next `getMergedServicesList()` call
 * re-reads from localStorage.
 */
export const invalidateServicesCache = (): void => {
  _cachedMerged = null;
};

/**
 * Re-export built-in services for direct access when needed.
 */
export { BuiltInServices };
