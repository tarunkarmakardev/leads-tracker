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
};
export const navigationUrls = {
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
};
