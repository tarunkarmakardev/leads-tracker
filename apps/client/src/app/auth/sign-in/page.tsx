"use client";
import SignInForm from "@/features/sign-in-form";
import AuthFormLayout from "@/features/auth-form-layout";

export default function SignIn() {
  return (
    <AuthFormLayout title="Sign in">
      <SignInForm />
    </AuthFormLayout>
  );
}
