import { PrismaClient } from "@prisma/client";

export function db() {
  const client = new PrismaClient();
  return client;
}
