import { generateJWT } from "@/lib/auth";
import { ControllerError, createController } from "@/lib/controller";
import { db } from "@/lib/db";
import { validateOtp } from "@/lib/otp";

export const POST = createController({
  handler: async (req, res) => {
    const payload = req.body;
    const user = await db().user.findUnique({
      where: {
        email: payload.email,
      },
      include: {
        otp: true,
      },
    });
    if (!user) {
      throw new ControllerError("User not found");
    }
    if (!user.otp) {
      throw new ControllerError("Please request for OTP");
    }
    const validOtp = validateOtp(user.otp, payload.otp);
    if (!validOtp) {
      throw new ControllerError("Invalid OTP");
    }
    await db().user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });
    const { token: generatedToken, expiresIn } = generateJWT({ id: user.id });
    const token = await db().userToken.create({
      data: {
        userId: user.id,
        token: generatedToken,
        expiresAt: new Date(expiresIn),
      },
    });

    return res.json({ token: token.token });
  },
});
