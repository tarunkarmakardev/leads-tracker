import { Router } from "express";
import * as signinSendOtp from "../controllers/auth/signin-send-otp";
import * as signupSendOtp from "../controllers/auth/signup-send-otp";
import * as verifyOtp from "../controllers/auth/verify-otp";

const authRouter = Router();

authRouter.post("/signup/send-otp", signupSendOtp.POST);
authRouter.post("/signin/send-otp", signinSendOtp.POST);
authRouter.post("/verify-otp", verifyOtp.POST);

export default authRouter;
