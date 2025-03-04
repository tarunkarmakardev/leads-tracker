import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export function db() {
  return client;
}
