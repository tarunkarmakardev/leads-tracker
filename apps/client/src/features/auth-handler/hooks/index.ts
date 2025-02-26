import { useReduxDispatch, useReduxSelector } from "@/redux/hooks";
import { setToken, AuthState, setUser } from "../slices/authSlice";
import { useRouter } from "next/navigation";
import { SignUpResponse } from "@/services/auth/api/sign-up";

export const useAuth = () => {
  const router = useRouter();
  const authState = useReduxSelector((state) => state.auth);
  const dispatch = useReduxDispatch();
  const isAuthenticated = Boolean(authState.token);

  const signIn = (data: AuthState) => {
    dispatch(setToken(data.token));
    dispatch(setUser(data.user));
    router.push("/dashboard");
  };

  const signOut = () => {
    dispatch(setToken(""));
    router.push("/auth/sign-in");
  };

  const signUp = (data: SignUpResponse) => {
    dispatch(setUser(data.user));
    router.push("/auth/verify-email");
  };

  return { isAuthenticated, signIn, signOut, signUp, authState };
};
