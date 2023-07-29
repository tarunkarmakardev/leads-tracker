"use client";
import SignUpForm from "@/features/sign-up-form";
import AuthFormLayout from "@/features/auth-form-layout";

export default function SignUp() {
  return (
    <AuthFormLayout title="Sign up">
      <SignUpForm />
    </AuthFormLayout>
  );
}
