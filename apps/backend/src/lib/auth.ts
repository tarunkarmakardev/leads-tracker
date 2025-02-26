import { UserResponseObject } from "@/models/user";
import jwt from "jsonwebtoken";
import { getEnv } from "./env";

const { SECRET_KEY } = getEnv();

type JWTPayload = Pick<UserResponseObject, "_id">;

export function getTokenFromAuthHeader(header?: string | null) {
  return header?.replace("Bearer ", "");
}

export function generateJWT(payload: JWTPayload) {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "30 days",
  });
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
