import { proxiedApiEndpoints } from "@/config/urls";
import { createSession } from "@/server-lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const res = await fetch(proxiedApiEndpoints.auth.verifyOtp, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (res.status === 200) {
    const result = await res.json();
    await createSession(result.token);
    return NextResponse.json({ message: "Ok" });
  }
  return res;
};
