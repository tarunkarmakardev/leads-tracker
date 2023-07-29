import { POSTHandler } from "../api/google-sign-in";
import { useMutation } from "react-query";

export const usePostGoogleSignIn = () => useMutation(POSTHandler);
