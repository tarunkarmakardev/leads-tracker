import { cookies } from "next/headers";

const cookieNames = {
  LT_TOKEN: "LT_TOKEN",
  IS_AUTHENTICATED: "IS_AUTHENTICATED",
};
export async function createSession(token: string) {
  const maxAge = JSON.parse(
    Buffer.from(token?.split(".")[1], "base64").toString("utf-8")
  )?.exp;
  const cookiesStore = await cookies();
  cookiesStore.set({
    name: cookieNames.LT_TOKEN,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge,
  });
  cookiesStore.set({
    name: cookieNames.IS_AUTHENTICATED,
    value: "true",
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge,
  });
}

export async function getSession() {
  const cookiesStore = await cookies();
  return cookiesStore.get(cookieNames.LT_TOKEN)?.value;
}
