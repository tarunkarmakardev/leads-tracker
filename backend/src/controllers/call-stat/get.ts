import { createMethodHandler } from "@/lib/controllerUtil";
import { CallStat, CallStatResponseObject } from "@/models/call-stat";

const errors = {};

export type CallStatGetQuery = {
  limit?: number;
  skip?: number;
};

export type CallStatGetRes = {
  results: CallStatResponseObject[];
};

export default createMethodHandler<{}, {}, CallStatGetQuery>({
  async handleRequest(req, res) {
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
