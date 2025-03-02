import { NextRequest } from "next/server";
import { beProxyPath, beUrl } from "@/config/urls";

export function createBackendProxyRoute(request: NextRequest) {
  let url = new URL(request.nextUrl.pathname, request.nextUrl.origin);
  const isMatch = url.pathname.startsWith(beProxyPath);
  if (isMatch) {
    url.pathname = url.pathname.split(beProxyPath)[1];
    url = new URL(beUrl(url.pathname));
    return url;
  }
}
