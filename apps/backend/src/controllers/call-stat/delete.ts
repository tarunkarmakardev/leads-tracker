import { createMethodHandler } from "@/lib/controllerUtil";
import { CallStat } from "@/models/call-stat";

export type CallStatDeleteParams = {
  _id: string;
};

export default createMethodHandler<CallStatDeleteParams>({
  async handleRequest(req, res) {
    const { _id } = req.params;
    await CallStat.deleteOne({ _id });
    return res.status(204).send();
  },
});
