import moment from "moment";

export const toLocalDate = (date?: string | number) => {
  const pattern = "YYYY-MM-DD HH:mm:ss";

  if (!date) return moment(new Date()).format(pattern);
  return moment(new Date(date)).format(pattern);
};
