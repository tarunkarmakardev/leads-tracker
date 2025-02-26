/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProtectedRequest } from "./common.types";

type R = Record<string, any>;

interface MethodHandlerRequest<
  P extends R = R,
  B extends R = R,
  Q extends R = R
> extends ProtectedRequest {
  params: P;
  body: B;
  query: Q;
}

type CreateMethodHandlerOptions<
  P extends R = R,
  B extends R = R,
  Q extends R = R
> = {
  handleRequest: (
    req: MethodHandlerRequest<P, B, Q>,
    res: Response
  ) => Promise<Response<any, Record<string, any>>>;
};

export function createMethodHandler<
  P extends R = R,
  B extends R = R,
  Q extends R = R
>(options: CreateMethodHandlerOptions<P, B, Q>) {
  return async (_req: Request, res: Response) => {
    const { handleRequest } = options;
    try {
      await handleRequest(_req as MethodHandlerRequest<P, B, Q>, res);
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ message: e.message });
    }
  };
}
