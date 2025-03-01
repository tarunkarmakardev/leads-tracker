import jwt from "jsonwebtoken";
import { getEnv } from "./env";
import { Request } from "express";

export type ProtectedRequest = Request & {
  user: { id: string };
  projectId: string;
};

const { SECRET_KEY } = getEnv();

type JWTPayload = { id: string };

export function getTokenFromAuthHeader(header?: string | null) {
  return header?.replace("Bearer ", "");
}

export function generateJWT(payload: JWTPayload) {
  const expiresIn = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign(payload, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn,
  });
  return { token, expiresIn };
}

export function decodeAndVerifyJWT(token = "") {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded as JWTPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
