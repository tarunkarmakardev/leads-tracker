import { NextFunction, Request, Response } from "express";

export default async function projectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const projectId = req.get("Project-Id") ?? "";

  if (projectId) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).projectId = projectId;
    next();
    return;
  }
  res.status(400).send({ message: "Project Id header is required" });
}
