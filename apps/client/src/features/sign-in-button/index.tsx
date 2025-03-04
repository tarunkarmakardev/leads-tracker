"use client";
import { Button } from "@mui/material";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href="/auth/sign-in">
      <Button variant="contained">Sign In</Button>
    </Link>
  );
}
