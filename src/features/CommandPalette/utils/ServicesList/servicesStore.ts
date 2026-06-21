import type { IServicesList } from "@/types/Service";
import { ServicesList as BuiltInServices } from "./index";
import { loadUserServices } from "@/features/Settings/utils/servicesStorage";

/**
 * Returns the complete merged services list:
 * built-in hardcoded services + user-defined services from localStorage.
 *
 * User services take precedence if there's a key collision.
 */
export const getMergedServicesList = (): IServicesList => {
  return {
    ...BuiltInServices,
    ...loadUserServices(),
  };
};

/**
 * Re-export built-in services for direct access when needed.
 */
export { BuiltInServices };
