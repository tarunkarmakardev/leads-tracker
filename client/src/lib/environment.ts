/* eslint-disable @typescript-eslint/no-non-null-assertion */
export type ENV = {
  BACKEND_ROOT_API_URL: string;
  GOOGLE_CLIENT_ID: string;
  SITE_URL: string;
};

export function getEnv(): ENV {
  return {
    BACKEND_ROOT_API_URL: process.env.NEXT_PUBLIC_BACKEND_ROOT_API_URL!,
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL!,
  };
}
