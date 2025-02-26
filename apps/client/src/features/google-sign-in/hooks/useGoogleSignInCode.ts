import { GoogleSignInPayload } from "@/services/auth/api/google-sign-in";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";

const useGoogleSignInCode = () => {
  const searchParams = useSearchParams();
  const googleSignInQueryParams = queryString.parse(
    searchParams.toString()
  ) as GoogleSignInPayload;

  return googleSignInQueryParams;
};

export default useGoogleSignInCode;
