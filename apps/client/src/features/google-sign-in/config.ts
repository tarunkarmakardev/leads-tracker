"use client";
import queryString from "query-string";
import { getEnv } from "@/lib/environment";

const redirectURI = new URL("auth/google-sign-in", getEnv().SITE_URL);

const googleSignInPayload = queryString.stringify({
  client_id: getEnv().GOOGLE_CLIENT_ID,
  redirect_uri: redirectURI.toString(),
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "),
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});

export const googleSignInURL = `https://accounts.google.com/o/oauth2/v2/auth?${googleSignInPayload}`;
