import { beProxyPath, navigationUrls } from "@/config/urls";
import { getSession } from "@/server-lib/auth";
import { MiddlewareFactory } from "@/server-lib/combine-middlewares";
import { NextResponse } from "next/server";

const publicRoutes = [
  navigationUrls.auth.signIn,
  navigationUrls.auth.signUp,
  beProxyPath,
];

export const authMiddleware: MiddlewareFactory =
  (next) => async (request, _next) => {
    const isPublicRoute = publicRoutes.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );
    if (!isPublicRoute) {
      const accessToken = await getSession();
      if (!accessToken) {
        return NextResponse.redirect(
          new URL(navigationUrls.auth.signIn, request.nextUrl.origin)
        );
      }
    }
    return next(request, _next);
  };
