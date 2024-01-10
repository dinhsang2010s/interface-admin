import {getPagination, useRequest} from "../hooks/useRequest.ts";
import {ARTICLES} from "./const.url.ts";

export const useGetArticles = async (
    query: QueryDto
): Promise<IPagination<IArticle[]>> => {
    return await getPagination<IArticle[]>({
        url: ARTICLES,
        params: {...query},
    });
};

export const useAddArticle = async (post: PostDto): Promise<IArticle> => {
    return await useRequest<IArticle>({
        url: ARTICLES,
        method: "POST",
        body: post,
    });
};

export const useUpdateArticle = async (
    postId: string,
    post: PostDto
): Promise<IArticle> => {
    return await useRequest<IArticle>({
        url: `${ARTICLES}/${postId}`,
        method: "PUT",
        body: post,
    });
};

export const useDeleteArticle = async (postId: string): Promise<void> => {
    await useRequest<void>({
        url: `${ARTICLES}/${postId}`,
        method: "DELETE",
    });
};
