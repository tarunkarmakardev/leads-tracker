import { ControllerError, createController } from "@/lib/controller";
import { db } from "@/lib/db";
import { createUserOtp } from "@/lib/otp";
import { SigninPostPayloadSchema } from "@leads-tracker/schemas";

export const POST = createController({
  handler: async (req, res) => {
    const payload = SigninPostPayloadSchema.parse(req.body);
    const user = await db().user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      throw new ControllerError("User does not exist");
    } else {
      const otp = await createUserOtp(user.id);
      // TODO: Need to send email with otp
      return res.json({ otp: otp.otp });
    }
  },
});
