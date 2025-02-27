import { createController } from "@/lib/controller";
import { CallStat, CallStatResponseObject } from "@/models/call-stat";

export type CallStatGetQuery = {
  limit?: number;
  skip?: number;
};

export type CallStatGetRes = {
  results: CallStatResponseObject[];
};

export default createController<object, object, CallStatGetQuery>({
  async handler(req, res) {
    const { limit, skip } = req.query;
    const callStats = await CallStat.find(
      { userId: req.user._id },
      {},
      {
        limit,
        skip,
      }
    );
    const resData: CallStatGetRes = {
      results: callStats,
    };
    return res.send(resData);
  },
});
