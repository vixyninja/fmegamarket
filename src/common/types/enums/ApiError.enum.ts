/**
 * Enum for API error types
 * @readonly
 * @param {string} UNAUTHORIZED - 401 - JWT token is invalid or not provided
 * @param {string} UNPROCESSABLE_ENTITY - 422 - Validation error
 * @param {string} INTERNAL_SERVER_ERROR - 500 - Internal server error
 * @param {string} BAD_REQUEST - 400 - Bad request
 * @param {string} NOT_FOUND - 404 - Not found
 * @param {string} FORBIDDEN - 403 - Forbidden
 * @param {string} CONFLICT - 409 - Conflict
 * @param {string} GATEWAY_TIMEOUT - 504 - Gateway timeout
 * @param {string} NETWORK_ERROR - "NETWORK_ERROR" - Network error
 * @param {string} DEFAULT - "DEFAULT" - Default error
 */
export const API_ERROR_ENUM = {
  UNAUTHORIZED: "UNAUTHORIZED",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  BAD_REQUEST: "BAD_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
  CONFLICT: "CONFLICT",
  GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
  NETWORK_ERROR: "NETWORK_ERROR",
  DEFAULT: "DEFAULT",
} as const;
