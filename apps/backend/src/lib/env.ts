import { config } from "dotenv";
import path from "path";

interface ENV {
  PORT: number;
  DATABASE_URI: string;
  FRONTEND_DOMAIN: string;
  SECRET_KEY: string;
  GMAIL_APP_USER: string;
  GMAIL_APP_KEY: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}
const requiredEnvKeys = Object.keys({} as ENV);

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function isProd() {
  return process.env.NODE_ENV === "production";
}

export function setupEnv() {
  if (isDev()) {
    config({
      path: path.resolve(process.cwd(), ".env.local"),
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
  const envKeysList = Object.keys(env);
  const isValid = requiredEnvKeys.every((k) => envKeysList.includes(k));

  if (!isValid) {
    throw new Error("Invalid Env variables passed");
  }
  return env;
}
