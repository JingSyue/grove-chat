/**
 * Clerk Authentication Middleware
 * Controls which routes require authentication
 */
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();
/**
 * Route matcher configuration
 * Defines which paths should be handled by Clerk middleware
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/api/:path((?!proxy).*)",
    "/api/webhooks/:path*",
  ],
};
