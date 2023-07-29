"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../hooks";

export default function SignIn() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return null;
  return (
    <Link href="/auth/sign-in">
      <Button variant="contained">Sign In</Button>
    </Link>
  );
}
