import { format } from "date-fns";

export const date = (d, f = "dd MMM yyyy") => {
  if (!Date.parse(d)) return null;
  return format(new Date(d), f);
};
