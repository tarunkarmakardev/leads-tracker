import {
  CallStat,
  CallStatObject,
  CallStatResponseObject,
} from "@/models/call-stat";
import { createMethodHandler } from "@/lib/controllerUtil";

const errors = {};

export type CallStatPostBody = CallStatObject;

export type CallStatPOSTRes = CallStatResponseObject;

export default createMethodHandler<{}, CallStatPostBody>({
  async handleRequest(req, res) {
    const payload = {
      ...req.body,
      userId: req.user._id,
    };
    const callStat = new CallStat(payload);
    await callStat.save();
    const resData: CallStatPOSTRes = callStat.toJSON();
    return res.status(201).send(resData);
  },
});
