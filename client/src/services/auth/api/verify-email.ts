import { UserObject } from "@/services/auth/common.types";
import { salesLoggerPublicBackend } from "@/lib/axios";

export type VerifyEmailPayload = {
  _id: string;
  otp: string;
};

export type VerifyEmailResponse = {
  user: UserObject;
  token: string;
};

export const POSTHandler = async (data: VerifyEmailPayload) => {
  const res = await salesLoggerPublicBackend({
    method: "POST",
    url: "/auth/verify-email",
    data,
  });

  return res.data as VerifyEmailResponse;
};
