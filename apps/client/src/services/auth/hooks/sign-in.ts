import { useMutation } from "react-query";
import { POSTHandler } from "../api/sign-in";

export const usePostSignIn = () => useMutation(POSTHandler);
