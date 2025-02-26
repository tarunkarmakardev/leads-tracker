import { UserResponseObject, UserVirtuals } from "@/models/user";
import { Request } from "express";
import { Types } from "mongoose";

export type WithDocumentId<D> = {
  _id: Types.ObjectId;
} & D;

export type ProtectedRequest = Request & {
  user: UserResponseObject & UserVirtuals;
};
