import {getPagination, useRequest} from "../hooks/useRequest.ts";

export const useGetArticles = async (
    query: QueryDto
): Promise<IPagination<IArticle[]>> => {
    return await getPagination<IArticle[]>({
        url: "articles",
        params: {...query},
    });
};

export const useAddArticle = async (post: PostDto): Promise<IArticle> => {
    return await useRequest<IArticle>({
        url: "articles",
        method: "POST",
        body: post,
    });
};

export const useUpdateArticle = async (
    postId: string,
    post: PostDto
): Promise<IArticle> => {
    return await useRequest<IArticle>({
        url: `articles/${postId}`,
        method: "PUT",
        body: post,
    });
};

export const useDeleteArticle = async (postId: string): Promise<void> => {
    await useRequest<void>({
        url: `articles/${postId}`,
        method: "DELETE",
    });
};
