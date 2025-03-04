import { getEnv } from "@/lib/env";

const { NEXT_PUBLIC_API_URL } = getEnv();

export const beUrl = (url: string) => `${NEXT_PUBLIC_API_URL}${url}`;
export const beProxyPath = "/lt-backend";
export const beProxyUrl = (url: string) => `${beProxyPath}${url}`;

export const directEndpoints = {
  auth: {
    verifyOtp: beUrl("/auth/verify-otp"),
  },
};

// To be used in client
export const endpoints = {
  auth: {
    signinSendOtp: beProxyUrl("/auth/signin/send-otp"),
    signupSendOtp: beProxyUrl("/auth/signup/send-otp"),
    verifyOtp: "/api/auth/verify-otp",
  },
  reports: {
    list: beProxyUrl("/reports"),
    post: beProxyUrl("/reports"),
    detail: (id: string) => beProxyUrl(`/reports/${id}`),
    patch: (id: string) => beProxyUrl(`/reports/${id}`),
    delete: (id: string) => beProxyUrl(`/reports/${id}`),
  },
  projects: {
    list: beProxyUrl("/projects"),
    detail: (id: string) => beProxyUrl(`/projects/${id}`),
    patch: (id: string) => beProxyUrl(`/projects/${id}`),
    delete: (id: string) => beProxyUrl(`/projects/${id}`),
  },
};
export const navigationUrls = {
  dashboard: "/dashboard",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
  reports: {
    list: "/reports/list",
    detail: (id: string) => `/reports/${id}`,
    edit: (id: string) => `/reports/${id}/edit`,
    create: "/reports/create",
  },
  projects: {
    list: "/projects/list",
    detail: (id: string) => `/projects/${id}`,
    edit: (id: string) => `/projects/${id}/edit`,
    create: "/projects/create",
  },
};
