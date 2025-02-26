import { HydratedDocument, Model, model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { OTP, OTPObject } from "./otp";
import { WithDocumentId } from "@/lib/common.types";
import { generateJWT } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = {
  INVALID_EMAIL: new Error("Invalid Email"),
  STRONG_PASSWORD: new Error("Strong password is required"),
};

export type UserObject = {
  email: string;
  password: string;
  isVerified: boolean;
  meta: {
    project: string;
  };
};

export type UserVerificationData = {
  otp: string;
};

type UserMethods = {
  generateVerificationData: () => Promise<UserVerificationData>;
  generateAuthToken: () => string;
  getUserResponseObject: () => UserResponseObject;
};

type UserDocument = HydratedDocument<UserObject, UserMethods>;

type UserQueryHelpers = object;

type UserStaticMethods = {
  findByCred: (
    payload: Pick<UserObject, "email" | "password">
  ) => Promise<UserDocument>;
};

export type UserVirtuals = {
  otps: OTPObject[];
};

export type UserResponseObject = WithDocumentId<Omit<UserObject, "password">>;

export type UserModel = Model<
  UserObject,
  UserQueryHelpers,
  UserMethods,
  UserVirtuals
> &
  UserStaticMethods;

const schema = new Schema<
  UserObject,
  UserModel,
  UserMethods,
  object,
  UserVirtuals
>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: ({ value }) => `${value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value: string) {
        return validator.isStrongPassword(value);
      },
      message: () => `Please use a strong password`,
    },
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  meta: {
    project: { type: String, required: true, trim: true },
  },
});

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

schema.methods.generateVerificationData = async function () {
  const user = this as UserDocument;
  const otp = new OTP({
    createdAt: Date.now(),
    userId: user._id,
    value: OTP.generateOTP(),
    expiresAt: OTP.generateExpiry(),
  });

  await otp.save();

  return {
    otp: otp.value,
  };
};

schema.methods.generateAuthToken = function () {
  const user = this as UserDocument;
  const token = generateJWT({ _id: user._id });
  return token;
};

schema.methods.getUserResponseObject = function () {
  const user = this as UserDocument;
  return {
    _id: user._id,
    email: user.email,
    isVerified: user.isVerified,
    meta: user.meta,
  };
};

schema.statics.findByCred = async function (payload: UserObject) {
  const user = await User.findOne({ email: payload.email });
  if (!user) return null;
  const isPassMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPassMatch) return null;
  return user;
};

schema.virtual("otps", {
  foreignField: "userId",
  localField: "_id",
  ref: "OTP",
});

export const User = model<UserObject, UserModel>("User", schema);
