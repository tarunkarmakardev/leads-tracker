import { WithDocumentId } from "@/config/common.types";
import { UseQueryResult } from "react-query";

export type CallStatTimeValue = {
  title: string;
  hours: number;
  minutes: number;
  disabled?: boolean;
};

export type CallStatBaseObject = {
  callDate: string;
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
};

export type CallStatObject = WithDocumentId<CallStatBaseObject> & {
  userId: string;
};

export type CallStatsGetPayload = {};
export type CallStatsGetRes = {
  results: CallStatObject[];
};
export type CallStatsGetQueryResult = UseQueryResult<CallStatsGetRes, any>;

export interface CallStatsPOSTPayload extends CallStatBaseObject {}
export type CallStatsPOSTResponse = CallStatBaseObject;

export interface CallStatsPatchPayload extends Partial<CallStatBaseObject> {
  _id: string;
}
export type CallStatsPatchResponse = CallStatBaseObject;

export interface CallStatsDeletePayload {
  _id: string;
}
export type CallStatsDeleteResponse = null;

export interface CallStatsDetailPayload {
  _id: string;
}
export type CallStatsDetailRes = CallStatObject;
export type CallStatsDetailQueryResult = UseQueryResult<
  CallStatsDetailRes,
  any
>;
