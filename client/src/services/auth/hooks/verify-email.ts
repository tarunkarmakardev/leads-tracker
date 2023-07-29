import { useMutation } from "react-query";
import { POSTHandler } from "../api/verify-email";

export const usePostVerifyEmail = () => useMutation(POSTHandler);
