import { Router } from "express";
import * as sendOtp from "../controllers/auth/send-otp";
import * as verifyOtp from "../controllers/auth/verify-otp";

const authRouter = Router();

authRouter.post("/send-otp", sendOtp.POST);
authRouter.post("/verify-otp", verifyOtp.POST);

export default authRouter;
