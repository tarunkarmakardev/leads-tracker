import dayjs from "dayjs";

export function parseDateLabels<T>(list: T[], key: keyof T) {
  return list.map((r) => dayjs(r[key] as string).format("DD-MM-YYYY"));
}
