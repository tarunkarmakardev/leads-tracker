import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const isAuthenticated = true;

  const signIn = () => {
    router.push("/dashboard");
  };

  const signOut = () => {
    router.push("/auth/sign-in");
  };

  const signUp = () => {
    router.push("/auth/verify-email");
  };

  return { isAuthenticated, signIn, signOut, signUp };
};
