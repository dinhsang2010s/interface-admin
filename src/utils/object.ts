export const toOptions = (data: ICategory[]) => {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};
