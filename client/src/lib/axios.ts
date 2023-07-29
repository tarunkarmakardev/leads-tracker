import { authStorageInstance } from "@/features/auth-handler/config";
import axios from "axios";
import { getEnv } from "./environment";

const baseURL = getEnv().BACKEND_ROOT_API_URL;

export const salesLoggerPublicBackend = axios.create({
  baseURL,
});

export const salesLoggerPrivateBackend = axios.create({
  baseURL,
});

salesLoggerPrivateBackend.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    authStorageInstance.getItem().token
  }`;
  return config;
});
