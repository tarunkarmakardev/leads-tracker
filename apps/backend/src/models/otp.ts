import { HydratedDocument, Model, model, Types, Schema } from "mongoose";
import { minutesToMilliseconds } from "@/lib/time";

export type OTPObject = {
  value: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
};

type OTPMethods = object;
type OTPQueryHelpers = object;
type OTPStaticMethods = {
  generateOTP: () => string;
  generateExpiry: () => number;
};

export type OTPDocument = HydratedDocument<OTPObject, OTPMethods>;

type OTPModel = Model<OTPObject, OTPQueryHelpers, OTPMethods> &
  OTPStaticMethods;

const OTPSchema = new Schema<OTPObject, OTPModel, OTPMethods>(
  {
    value: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OTPSchema.statics.generateOTP = function () {
  return String(Math.ceil(Math.random() * 1000000));
};

OTPSchema.statics.generateExpiry = function () {
  return Date.now() + minutesToMilliseconds(30);
};

export const OTP = model<OTPObject, OTPModel>("OTP", OTPSchema);
