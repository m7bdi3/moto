/**
 * An array of routes that are accessible to public, those routes do not require authentication
 * @type{string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are used to authenticated users, those routes require authentication
 * @type{string[]}
 */
export const authRoutes: string[] = ["/login", "/error"];

export const apiAuthPrefix: string = "/api/auth";

