import { db } from "./db";

export function generateOTP() {
  return {
    otp: String(Math.ceil(Math.random() * 1000000)),
    expiresAt: new Date(Date.now() + 1000 * 60),
  };
}

export function validateOtp(
  otp: { otp: string; expiresAt: Date },
  userOtp: string
) {
  return otp.otp === userOtp && otp.expiresAt > new Date();
}

export async function createUserOtp(userId: string) {
  const { otp: otpValue, expiresAt } = generateOTP();
  await db().userOtp.deleteMany({
    where: {
      userId,
    },
  });
  const otp = await db().userOtp.create({
    data: {
      userId,
      otp: otpValue,
      expiresAt,
    },
  });
  return otp;
}
