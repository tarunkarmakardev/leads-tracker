import { z } from "zod";

export const RestControllerBaseSchema = z.object({
  id: z.string(),
});
export const RestControllerPaginationSchema = z.object({
  q: z.string().optional(),
  limit: z.string().transform((v) => Number(v)),
  offset: z.string().transform((v) => Number(v)),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
