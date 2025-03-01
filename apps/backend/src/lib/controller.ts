/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ZodError } from "zod";
import { ProtectedRequest } from "./auth";
import {
  RestControllerBaseSchema,
  RestControllerPaginationSchema,
} from "@leads-tracker/schemas";
import { Prisma } from "@prisma/client";

type R = Record<string, any>;

interface ControllerRequest<P extends R = R, B extends R = R, Q extends R = R>
  extends ProtectedRequest {
  params: P;
  body: B;
  query: Q;
}

type CreateControllerOptions<
  P extends R = R,
  B extends R = R,
  Q extends R = R
> = {
  handler: (
    req: ControllerRequest<P, B, Q>,
    res: Response
  ) => Promise<Response<any, Record<string, any>>>;
};

export function createController<
  P extends R = R,
  B extends R = R,
  Q extends R = R
>(options: CreateControllerOptions<P, B, Q>) {
  return async (_req: Request, res: Response) => {
    const { handler } = options;
    try {
      await handler(_req as ControllerRequest<P, B, Q>, res);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send({
          message: error.errors.map((e) => `${e.path} ${e.message}`).join(", "),
        });
      } else if (error instanceof ControllerError) {
        res.status(error.statusCode).send({ message: error.message });
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: error.message });
      } else if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  };
}

export class ControllerError extends Error {
  constructor(message: string, public statusCode = 400) {
    super(message);
    this.name = "ControllerError";
  }
}

type CreateRestControllersOptions<
  GetData,
  DetailData,
  PostPayload,
  PostData,
  PatchPayload,
  PatchData,
  DeleteData
> = {
  isProjectBased?: boolean;
  get: {
    searchFields: string[];
    query: (payload: {
      where: any;
      orderBy: any;
      take: number;
      skip: number;
    }) => Promise<GetData>;
  };
  detail: {
    query: (payload: { where: { id: string } }) => Promise<DetailData>;
  };
  post: {
    parsePayload: (rawPayload: any) => PostPayload;
    mutation: (payload: {
      data: PostPayload & { userId: string; projectId: string };
    }) => Promise<PostData>;
  };
  patch: {
    parsePayload: (rawPayload: any) => PatchPayload;
    mutation: (payload: {
      where: { id: string };
      data: PatchPayload;
    }) => Promise<PatchData>;
  };
  delete: {
    mutation: (payload: { where: { id: string } }) => Promise<DeleteData>;
  };
};

export function createRestControllers<
  GetData,
  DetailData,
  PostPayload,
  PostData,
  PatchPayload,
  PatchData,
  DeleteData
>({
  isProjectBased = true,
  get,
  detail,
  post,
  patch,
  delete: deleteProp,
}: CreateRestControllersOptions<
  GetData,
  DetailData,
  PostPayload,
  PostData,
  PatchPayload,
  PatchData,
  DeleteData
>) {
  const GET = createController({
    handler: async (req, res) => {
      const searchFields = get.searchFields;
      const { q, limit, offset, sortBy, sortOrder } =
        RestControllerPaginationSchema.parse(req.query);
      const where: any = {};
      let orderBy: any;
      if (isProjectBased) {
        where.projectId = req.projectId;
      }
      if (q) {
        where.OR = searchFields.map((field) => ({
          [field]: {
            contains: q,
          },
        }));
      }
      if (sortBy && sortOrder) {
        orderBy = {};
        orderBy[sortBy] = sortOrder;
      }
      const results = await get.query({
        where,
        orderBy,
        take: limit,
        skip: offset,
      });
      return res.json({ results });
    },
  });
  const DETAIL = createController({
    handler: async (req, res) => {
      const { id } = RestControllerBaseSchema.parse(req.params);
      const where: any = {
        id,
      };
      if (isProjectBased) {
        where.projectId = req.projectId;
      }
      const result = await detail.query({
        where,
      });
      return res.json(result);
    },
  });
  const POST = createController({
    handler: async (req, res) => {
      const data = post.parsePayload({ ...req.body, ...req.params }) as any;
      data.userId = req.user.id;
      if (isProjectBased) {
        data.projectId = req.projectId;
      }
      const result = await post.mutation({
        data,
      });
      return res.json(result);
    },
  });
  const DELETE = createController({
    handler: async (req, res) => {
      const { id } = RestControllerBaseSchema.parse(req.params);
      const where: any = {
        id,
      };
      if (isProjectBased) {
        where.projectId = req.projectId;
      }
      const result = await deleteProp.mutation({
        where,
      });
      return res.json(result);
    },
  });
  const PATCH = createController({
    handler: async (req, res) => {
      const { id, ...data } = patch.parsePayload({
        ...req.body,
        ...req.params,
      }) as any;
      const where: any = {
        id,
      };
      if (isProjectBased) {
        where.projectId = req.projectId;
      }
      const result = await patch.mutation({
        where,
        data,
      });
      return res.json(result);
    },
  });
  return { GET, DETAIL, POST, DELETE, PATCH };
}
