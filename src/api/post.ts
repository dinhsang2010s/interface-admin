import { getPagination, useRequest } from "../hooks/useRequest";

export const useGetPosts = async (
  query: QueryDto
): Promise<IPagination<IPost[]>> => {
  return await getPagination<IPost[]>({
    url: "posts",
    params: { ...query },
  });

  // return await useRequest<IPost[]>({
  //   url: "posts",
  //   method: "GET",
  //   params: { ...query },
  // });
};

export const AddPost = async (post: PostDto): Promise<IPost> => {
  return await useRequest<IPost>({
    url: "categories",
    method: "POST",
    body: post,
  });
};

export const UpdatePost = async (
  postId: string,
  post: PostDto
): Promise<IPost> => {
  return await useRequest<IPost>({
    url: `posts/${postId}`,
    method: "PUT",
    body: post,
  });
};

export const DeletePost = async (postId: string): Promise<void> => {
  await useRequest<void>({
    url: `posts/${postId}`,
    method: "DELETE",
  });
};
