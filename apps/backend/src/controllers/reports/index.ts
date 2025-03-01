import { createRestControllers } from "@/lib/controller";
import { db } from "@/lib/db";
import {
  ReportCreatePayloadSchema,
  ReportUpdatePayloadSchema,
} from "@leads-tracker/schemas";

export const { DELETE, DETAIL, GET, PATCH, POST } = createRestControllers({
  get: {
    query: (payload) => db().report.findMany(payload),
    searchFields: [],
  },
  post: {
    parsePayload: (rawPayload) => ReportCreatePayloadSchema.parse(rawPayload),
    mutation: (payload) => db().report.create(payload),
  },
  delete: {
    mutation: (payload) => db().report.delete(payload),
  },
  patch: {
    parsePayload: (rawPayload) => ReportUpdatePayloadSchema.parse(rawPayload),
    mutation: (payload) => db().report.update(payload),
  },
  detail: {
    query: (payload) => db().report.findUnique(payload),
  },
});
