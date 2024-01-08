import {getPagination, useRequest} from "../hooks/useRequest.ts";

export const useGetCategories = async (
    query: QueryDto
): Promise<IPagination<ICategory[]>> => {
    return await getPagination<ICategory[]>({
        url: "categories",
        params: {...query},
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
