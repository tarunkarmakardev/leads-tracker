import { Router } from "express";
import signIn from "../controllers/auth/sign-in";
import signUp from "../controllers/auth/sign-up";
import verifyEmail from "../controllers/auth/verify-email";
import googleSignIn from "@/controllers/auth/google-sign-in";

const authRouter = Router();

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/google-sign-in", googleSignIn);

export default authRouter;
