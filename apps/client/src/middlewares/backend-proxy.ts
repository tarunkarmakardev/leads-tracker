import { getSession } from "@/server-lib/auth";
import { MiddlewareFactory } from "@/server-lib/combine-middlewares";
import { createBackendProxyRoute } from "@/server-lib/proxy-request";
import { NextResponse } from "next/server";

export const backendProxyMiddleware: MiddlewareFactory =
  (next) => async (request, _next) => {
    const beProxyRoute = createBackendProxyRoute(request);
    if (!beProxyRoute) {
      return next(request, _next);
    }
    let res = null;
    try {
      const url = beProxyRoute.toString();
      const headers: Record<string, string> = {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Origin: request.headers.get("origin") ?? "",
        Referer: request.headers.get("referer") ?? "",
        "Content-Type":
          request.headers.get("Content-Type") ?? "application/json",
      };
      const accessToken = await getSession();
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }
      const updatedRequest = new Request(url, {
        method: request.method,
        headers,
        body: request.body,
        mode: request.mode,
        credentials: request.credentials,
        cache: request.cache,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        integrity: request.integrity,
        keepalive: request.keepalive,
        signal: request.signal,
      });
      res = await fetch(updatedRequest);
      logRequest({
        url,
        method: request.method,
        body: request.body,
        headers,
        status: res.status,
      });
      return res;
    } catch (error) {
      return NextResponse.json(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { error: (error as any).message },
        {
          status: 500,
          statusText: "Unexpected Server Error",
        }
      );
    }
  };

function logRequest(payload: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: null | BodyInit;
  status: number;
}) {
  try {
    // eslint-disable-next-line no-console
    console.log(`${payload.method} ${payload.url} ${payload.status}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error logging request: ", error);
  }
}
