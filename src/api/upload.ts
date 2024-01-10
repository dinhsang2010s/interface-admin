import {useRequest} from "../hooks/useRequest.ts";
import {URI_API_WP_CONTENTS} from "./const.url.ts";

export const useDeleteImageTopic = async (imageUri: string): Promise<void> => {
    await useRequest<void>({
        url: URI_API_WP_CONTENTS,
        method: "DELETE",
        params: {imageUri}
    });
};