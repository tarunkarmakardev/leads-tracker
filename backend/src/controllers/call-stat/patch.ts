import { createMethodHandler } from "@/lib/controllerUtil";
import { CallStat, CallStatObject } from "@/models/call-stat";
import { dot } from "dot-object";

const errors = {
  NOT_FOUND: new Error("Stat was not found."),
};

export type CallStatPatchParams = {
  _id: string;
};

type CallStatPatchBody = Omit<CallStatObject, "userId">;

export type CallStatPatchRes = CallStatObject;

export default createMethodHandler<CallStatPatchParams, CallStatPatchBody>({
  async handleRequest(req, res) {
    const callStat = await CallStat.findByIdAndUpdate(
      req.params._id,
      dot(req.body),
      {
        new: true,
        runValidators: true,
      }
    );
    if (!callStat) throw errors.NOT_FOUND;
    const resData: CallStatPatchRes = callStat;
    return res.send(resData);
  },
});
