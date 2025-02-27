import { createController } from "@/lib/controller";
import { CallStat } from "@/models/call-stat";

export type CallStatDeleteParams = {
  _id: string;
};

export default createController<CallStatDeleteParams>({
  async handler(req, res) {
    const { _id } = req.params;
    await CallStat.deleteOne({ _id });
    return res.status(204).send();
  },
});
