import { UserObject } from "@/services/auth/common.types";
import { salesLoggerPublicBackend } from "@/lib/axios";

export type GoogleSignInPayload = {
  authuser: string;
  code: string;
  prompt: string;
  scope: string;
};

export type VerifyEmailResponse = {
  user: UserObject;
  token: string;
};

export const POSTHandler = async (data: GoogleSignInPayload) => {
  const res = await salesLoggerPublicBackend({
    method: "POST",
    url: "/auth/google-sign-in",
    data,
  });

  return res.data as VerifyEmailResponse;
};
