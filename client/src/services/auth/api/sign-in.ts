import { salesLoggerPublicBackend } from "@/lib/axios";
import { UserObject } from "../common.types";

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  user: UserObject;
  token: string;
};

export const POSTHandler = async (data: SignInPayload) => {
  const res = await salesLoggerPublicBackend({
    method: "POST",
    url: "/auth/sign-in",
    data,
  });

  return res.data as SignInResponse;
};
