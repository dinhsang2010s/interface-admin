import { useRequest } from "../hooks/useRequest";

export const useGetCategories = async (q?: string): Promise<ICategory[]> => {
  return await useRequest<ICategory[]>({
    url: "categories",
    method: "GET",
    params: { q },
  });
};

export const useAddCategory = async (
  category: CategoryDto
): Promise<ICategory> => {
  return await useRequest<ICategory>({
    url: "categories",
    method: "POST",
    body: category,
  });
};

export const useUpdateCategory = async (
  categoryId: string,
  category: CategoryDto
): Promise<ICategory> => {
  return await useRequest<ICategory>({
    url: `categories/${categoryId}`,
    method: "PUT",
    body: category,
  });
};

export const useDeleteCategory = async (categoryId: string): Promise<void> => {
  await useRequest<void>({
    url: `categories/${categoryId}`,
    method: "DELETE",
  });
};
