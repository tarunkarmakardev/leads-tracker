import { Request, Response } from "express";
import { sendEmailVerificationMail } from "@/lib/mail";
import { User, UserResponseObject } from "@/models/user";

export type SignUpPayload = {
  email: string;
  password: string;
  meta: {
    project: string;
  };
};

export type SignUpResponse = {
  user: UserResponseObject;
};

export default async function signUp(req: Request, res: Response) {
  try {
    const { body } = req;
    const payload: SignUpPayload = {
      email: body.email,
      password: body.password,
      meta: {
        project: body.meta.project,
      },
    };
    const user = new User(payload);
    const { otp } = await user.generateVerificationData();

    await sendEmailVerificationMail({
      to: user.email,
      otp,
    });

    await user.save();

    const resData: SignUpResponse = { user: user.getUserResponseObject() };

    return res.send(resData);
  } catch (error) {
    const e = error as Error;
    return res.status(400).send({ message: e.message });
  }
}
