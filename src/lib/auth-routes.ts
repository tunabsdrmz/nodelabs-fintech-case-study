/** Routes that do not require authentication */
export const PUBLIC_PATHS = ["/login", "/signup", "/429", "/500"] as const;

/** Routes where authenticated users should be redirected to dashboard */
export const AUTH_PATHS = ["/login", "/signup"] as const;

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}
