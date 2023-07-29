import { WithDocumentId } from "@/lib/common.types";
import { model, Model, Schema, Types } from "mongoose";

export type CallStatTimeValue = {
  title: string;
  hours: number;
  minutes: number;
};

export type CallStatObject = {
  callDate: Date;
  basicDetails: {
    calls: number;
    pitched: number;
    callBacks: number;
    appointments: number;
    followUps: number;
    recordingsSent: boolean;
  };
  requests: {
    linkedin: number;
    email: number;
    whatsApp: number;
  };
  timings: CallStatTimeValue[];
  userId: Types.ObjectId;
};

export type CallStatResponseObject = WithDocumentId<CallStatObject>;

type CallStatMethods = {};
type CallStatStaticMethods = {};
type CallStatQueryHelpers = {};
type CallStatQueryVirtuals = {};

export type CallStatModel = Model<
  CallStatObject,
  CallStatQueryHelpers,
  CallStatMethods,
  CallStatQueryVirtuals
> &
  CallStatStaticMethods;

const schema = new Schema<
  CallStatObject,
  CallStatModel,
  {},
  CallStatQueryHelpers,
  CallStatQueryVirtuals,
  CallStatStaticMethods
>(
  {
    callDate: { type: Date, required: true },
    basicDetails: {
      calls: { type: Number, required: true },
      pitched: { type: Number, required: true },
      callBacks: { type: Number, required: true },
      appointments: { type: Number, required: true },
      followUps: { type: Number, required: true },
      recordingsSent: { type: Boolean, required: true },
    },
    requests: {
      linkedin: { type: Number, required: true },
      email: { type: Number, required: true },
      whatsApp: { type: Number, required: true },
    },
    timings: [
      {
        title: { type: String, required: true },
        hours: { type: Number, required: true },
        minutes: { type: Number, required: true },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const CallStat = model<CallStatObject, CallStatModel>(
  "CallStat",
  schema
);
