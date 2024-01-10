import {useRequest} from "../hooks/useRequest.ts";
import {AUTH, USERS} from "./const.url.ts";

export const useGetProfile = async (): Promise<{ id: string, exp: number }> => {
    return await useRequest<{ id: string, exp: number }>({
        url: `${USERS}/profile`,
        method: "GET",
    });
};

export const useLogin = async (dto: LoginDto): Promise<IToken | null> => {
    return await useRequest<IToken>({
        url: `${AUTH}/login`,
        method: "POST",
        body: dto,
    });
};
