import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { analytics } from "./utils/analytics";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Protect all routes starting with `/admin`
  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  // Track analytics on the homepage
  if (req.nextUrl.pathname === "/") {
    try {
      // await analytics.track("pageview", {
      //   page: "/",
      //   country: req.geo?.country || "",
      // });
      // await analytics.track("homePageView", {
      //   country: req.geo?.country || "Unknown",
      // });
    } catch (err) {
      // Fail silently to avoid impacting request
      console.error(err);
    }
  }

  // Allow other requests to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Apply middleware to all routes, except Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/",
  ],
};
