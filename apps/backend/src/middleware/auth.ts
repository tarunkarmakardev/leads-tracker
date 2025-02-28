import { NextFunction, Request, Response } from "express";
import { getTokenFromAuthHeader, decodeAndVerifyJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getTokenFromAuthHeader(req.get("Authorization"));
  const decoded = decodeAndVerifyJWT(token);
  if (decoded) {
    const user = await db().user.findUnique({
      where: { id: decoded.id },
    });
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).user = {
        id: decoded.id,
      };
      next();
      return;
    }
  }
  res.status(401).send({ message: "Unauthorized request" });
}
