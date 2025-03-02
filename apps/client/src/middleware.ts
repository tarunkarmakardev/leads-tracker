import { authMiddleware } from "./middlewares/auth";
import { backendProxyMiddleware } from "./middlewares/backend-proxy";
import { combineMiddlewares } from "./server-lib/combine-middlewares";

export const middleware = combineMiddlewares([
  authMiddleware,
  backendProxyMiddleware,
]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
