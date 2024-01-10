import {getPagination, useRequest} from "../hooks/useRequest.ts";
import {CATEGORIES} from "./const.url.ts";

export const useGetCategories = async (
    query: QueryDto
): Promise<IPagination<ICategory[]>> => {
    return await getPagination<ICategory[]>({
        url: CATEGORIES,
        params: {...query},
    });
};

export const useAddCategory = async (
    category: CategoryDto
): Promise<ICategory> => {
    return await useRequest<ICategory>({
        url: CATEGORIES,
        method: "POST",
        body: category,
    });
};

export const useUpdateCategory = async (
    categoryId: string,
    category: CategoryDto
): Promise<ICategory> => {
    return await useRequest<ICategory>({
        url: `${CATEGORIES}/${categoryId}`,
        method: "PUT",
        body: category,
    });
};

export const useDeleteCategory = async (categoryId: string): Promise<void> => {
    await useRequest<void>({
        url: `${CATEGORIES}/${categoryId}`,
        method: "DELETE",
    });
};
