import { z } from "zod";

export const EnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

export const getEnv = () => {
  const env = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  } as Env;
  return EnvSchema.parse(env);
};
