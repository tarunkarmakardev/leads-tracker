import { getEnv } from "@/lib/env";

const { NEXT_PUBLIC_API_URL } = getEnv();

export const beUrl = (url: string) => `${NEXT_PUBLIC_API_URL}${url}`;
export const beProxyPath = "/lt-backend";
export const beProxyUrl = (url: string) => `${beProxyPath}${url}`;

export const proxiedApiEndpoints = {
  auth: {
    verifyOtp: beUrl("/auth/verify-otp"),
  },
};

export const apiEndpoints = {
  auth: {
    sendOtp: beProxyUrl("/auth/send-otp"),
    verifyOtp: "/api/auth/verify-otp",
  },
};
export const navigationUrls = {
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
};
