import { ControllerError, createController } from "@/lib/controller";
import { db } from "@/lib/db";
import { createUserOtp } from "@/lib/otp";
import { SignupPostPayloadSchema } from "@leads-tracker/schemas";

export const POST = createController({
  handler: async (req, res) => {
    const payload = SignupPostPayloadSchema.parse(req.body);
    const existingUser = await db().user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (existingUser) {
      throw new ControllerError("User already exists");
    } else {
      const user = await db().user.create({
        data: payload,
      });
      const otp = await createUserOtp(user.id);
      // TODO: Need to send email with otp
      return res.json({ otp: otp.otp });
    }
  },
});
