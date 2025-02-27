import { config } from "dotenv";
import path from "path";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val)),
  SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
  FRONTEND_DOMAIN: z.string(),
  // GMAIL_APP_USER: z.string(),
  // GMAIL_APP_KEY: z.string(),
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_CLIENT_SECRET: z.string(),
});

type ENV = z.infer<typeof EnvSchema>;

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function isProd() {
  return process.env.NODE_ENV === "production";
}

export function setupEnv() {
  if (isDev()) {
    config({
      path: path.resolve(process.cwd(), ".env"),
    });
  }
  if (isProd()) {
    config({
      path: path.resolve(process.cwd(), ".env"),
    });
  }
}

export function getEnv() {
  setupEnv();
  const env = process.env as unknown as ENV;
  const isValid = EnvSchema.parse(env);
  if (!isValid) {
    throw new Error("Invalid Env variables passed");
  }
  return env;
}
