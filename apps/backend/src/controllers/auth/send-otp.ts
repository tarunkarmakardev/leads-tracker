import { createController } from "@/lib/controller";
import { db } from "@/lib/db";
import { createUserOtp } from "@/lib/otp";
import { SendOtpPostPayloadSchema } from "@leads-tracker/schemas";

export const POST = createController({
  handler: async (req, res) => {
    const payload = SendOtpPostPayloadSchema.parse(req.body);
    const existingUser = await db().user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (existingUser) {
      const otp = await createUserOtp(existingUser.id);
      return res.json({ otp });
    } else {
      const payload = SendOtpPostPayloadSchema.required().parse(req.body);
      const user = await db().user.create({
        data: {
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
        },
      });
      const otp = await createUserOtp(user.id);
      return res.json({ otp });
    }
  },
});
