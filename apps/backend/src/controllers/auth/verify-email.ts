import { Request, Response } from "express";
import _ from "lodash";
import { OTP } from "@/models/otp";
import { User, UserResponseObject } from "@/models/user";

export type VerifyEmailPayload = {
  _id: string;
  otp: string;
};

export type VerifyEmailResponse = {
  user: UserResponseObject;
  token: string;
};

const INVALID_OTP_ERROR = new Error("OTP is invalid");

export default async function verifySignUp(req: Request, res: Response) {
  const { body } = req;
  const payload: VerifyEmailPayload = {
    otp: _.get(body, "otp", ""),
    _id: _.get(body, "_id", ""),
  };

  const user = await User.findOne({ _id: payload._id });

  if (!user) throw INVALID_OTP_ERROR;

  await user.populate("otps");

  const otps = user.otps;

  if (!otps.length) throw INVALID_OTP_ERROR;
  if (otps[0]?.value !== String(payload.otp)) throw INVALID_OTP_ERROR;

  user.isVerified = true;
  const token = user.generateAuthToken();
  await OTP.deleteMany({ _id: payload._id });
  await user.save();

  const resData: VerifyEmailResponse = {
    user: user.getUserResponseObject(),
    token,
  };
  return res.send(resData);
}
