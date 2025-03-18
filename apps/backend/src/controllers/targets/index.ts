import { createRestControllers } from "@/lib/controller";
import { db } from "@/lib/db";
import {
  TargetCreatePayloadSchema,
  TargetUpdatePayloadSchema,
} from "@leads-tracker/schemas";

export const { DELETE, DETAIL, GET, PATCH, POST } = createRestControllers({
  get: {
    query: (payload) => db().target.findMany(payload),
    searchFields: [],
  },
  post: {
    parsePayload: (rawPayload) => TargetCreatePayloadSchema.parse(rawPayload),
    mutation: (payload) => db().target.create(payload),
  },
  delete: {
    mutation: (payload) => db().target.delete(payload),
  },
  patch: {
    parsePayload: (rawPayload) => TargetUpdatePayloadSchema.parse(rawPayload),
    mutation: (payload) => db().target.update(payload),
  },
  detail: {
    query: (payload) => db().target.findUnique(payload),
  },
});
