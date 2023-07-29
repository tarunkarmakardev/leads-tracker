import { useMutation } from "react-query";
import { POSTHandler } from "../api/sign-up";

export const usePostSignUp = () => useMutation(POSTHandler);
