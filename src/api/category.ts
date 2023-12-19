import { useRequest } from "../hooks/useRequest";

export const useGetCategories = async (): Promise<ICategory[]> => {
  return await useRequest<ICategory[]>({
    url: "categories",
    method: "GET",
  });
};
