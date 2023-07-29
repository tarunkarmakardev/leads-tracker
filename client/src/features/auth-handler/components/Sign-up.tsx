"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export default function SignUp() {
  return (
    <Link href="/auth/sign-up">
      <Button variant="outlined">Sign Up</Button>
    </Link>
  );
}
