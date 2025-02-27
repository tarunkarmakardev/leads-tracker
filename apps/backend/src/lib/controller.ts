/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ZodError } from "zod";
import { ProtectedRequest } from "./auth";

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
        res
          .status(400)
          .send({ message: error.errors.map((e) => e.message).join(", ") });
      } else if (error instanceof ControllerError) {
        res.status(error.statusCode).send({ message: error.message });
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
