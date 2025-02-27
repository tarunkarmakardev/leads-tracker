import {
  CallStat,
  CallStatObject,
  CallStatResponseObject,
} from "@/models/call-stat";
import { createController } from "@/lib/controller";

export type CallStatPostBody = CallStatObject;

export type CallStatPOSTRes = CallStatResponseObject;

export default createController<object, CallStatPostBody>({
  async handler(req, res) {
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
