"use client";
import OTPForm from "@/features/otp-form/OTPForm";
import AuthFormLayout from "@/features/auth-form-layout";
import { OTPFormValues } from "@/features/otp-form/config";
import { useAuth } from "@/features/auth-handler/hooks";
import { useRouter } from "next/navigation";
import { usePostVerifyEmail } from "@/services/auth/hooks/verify-email";

export default function SignIn() {
  const verifyEmailPostAPI = usePostVerifyEmail();
  const auth = useAuth();
  const { user } = auth.authState;
  const router = useRouter();

  const handleSubmit = (values: OTPFormValues) => {
    verifyEmailPostAPI.mutate(
      { ...values, _id: user._id },
      {
        onSuccess(data, variables, context) {
          auth.signIn(data);
          router.push("/");
        },
      }
    );
  };

  return (
    <AuthFormLayout title="Verify Email">
      <OTPForm onSubmit={handleSubmit} />
    </AuthFormLayout>
  );
}
