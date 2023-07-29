"use client";

import AuthFormLayout from "@/features/auth-form-layout";
import { useAuth } from "@/features/auth-handler/hooks";
import useGoogleSignInCode from "@/features/google-sign-in/hooks/useGoogleSignInCode";
import Spinner from "@/features/spinner";
import { usePostGoogleSignIn } from "@/services/auth/hooks/google-sign-in";
import { useEffect } from "react";

export default function GoogleSignIn() {
  const googleSignInPayload = useGoogleSignInCode();
  const postGoogleSignIn = usePostGoogleSignIn();
  const auth = useAuth();
  useEffect(() => {
    postGoogleSignIn.mutate(googleSignInPayload, {
      onSuccess(data, variables, context) {
        auth.signIn(data);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthFormLayout title="Sign in">
      <Spinner
        loading
        loaderChildren={"Authenticating with Google"}
        stackProps={{
          my: 4,
        }}
        loaderProps={{
          size: 25,
        }}
      />
    </AuthFormLayout>
  );
}
