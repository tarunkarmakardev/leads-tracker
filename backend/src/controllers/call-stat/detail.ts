import { createMethodHandler } from "@/lib/controllerUtil";
import { CallStat, CallStatResponseObject } from "@/models/call-stat";

const errors = {
  NOT_FOUND: new Error("Stat was not found."),
};

export type CallStatDetailParams = {
  _id: string;
};

export interface CallStatDETAILRes extends CallStatResponseObject {}

export default createMethodHandler<CallStatDetailParams>({
  async handleRequest(req, res) {
    const callStat = await CallStat.findById(req.params._id);
    if (!callStat) throw errors.NOT_FOUND;
    const resData: CallStatDETAILRes = callStat;
    return res.send(resData);
  },
});
