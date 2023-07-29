import { chartFromValues } from "./common";

export type WithDocumentId<D> = {
  _id: string;
} & D;

export type ChartFromValue = keyof typeof chartFromValues;
