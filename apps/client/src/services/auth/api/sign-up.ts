import { UserObject } from "@/services/auth/common.types";
import { salesLoggerPublicBackend } from "@/lib/axios";

export type SignUpPayload = {
  email: string;
  password: string;
  meta: {
    project: string;
  };
};

export type SignUpResponse = {
  user: UserObject;
};

export const POSTHandler = async (data: SignUpPayload) => {
  const res = await salesLoggerPublicBackend({
    method: "POST",
    url: "/auth/sign-up",
    data,
  });
  return res.data as SignUpResponse;
};
