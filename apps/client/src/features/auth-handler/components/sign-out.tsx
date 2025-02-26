"use client";

import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../hooks";

export default function SignOut() {
  const { signOut } = useAuth();
  return (
    <Button variant="text" onClick={signOut}>
      Sign Out
    </Button>
  );
}
