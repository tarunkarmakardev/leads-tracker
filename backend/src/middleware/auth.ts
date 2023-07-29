import { NextFunction, Request, Response } from "express";
import { getTokenFromAuthHeader, decodeAndVerifyJWT } from "@/lib/auth";
import { User } from "@/models/user";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getTokenFromAuthHeader(req.header("Authorization"));
  const decoded = decodeAndVerifyJWT(token);
  if (decoded) {
    const user = await User.findOne({ _id: decoded._id });
    if (user) {
      (req as any).user = decoded;
      return next();
    }
  }

  return res.status(401).send({ message: "Unauthorized request" });
}
