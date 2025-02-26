import _ from "lodash";
import { Request, Response } from "express";
import { User, UserResponseObject } from "@/models/user";

const errors = {
  INVALID_CREDENTIALS: new Error("Invalid Credentials"),
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  user: UserResponseObject;
  token: string;
};

export default async function signIn(req: Request, res: Response) {
  const { body } = req;
  const payload: SignInPayload = {
    email: _.get(body, "email", ""),
    password: _.get(body, "password", ""),
  };

  try {
    const user = await User.findByCred(payload);
    if (!user) throw errors.INVALID_CREDENTIALS;
    const token = user.generateAuthToken();

    const resData: SignInResponse = {
      user: user.getUserResponseObject(),
      token,
    };
    res.send(resData);
  } catch (error) {
    const e = error as Error;
    res.status(401).send({ message: e.message });
  }
}
