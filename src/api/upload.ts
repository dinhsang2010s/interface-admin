import {useRequest} from "../hooks/useRequest.ts";
import {WP_CONTENTS} from "./const.url.ts";

export const useDeleteImageTopic = async (fileName: string): Promise<void> => {
    await useRequest<void>({
        url: `${WP_CONTENTS}/${fileName}`,
        method: "DELETE",
    });
};