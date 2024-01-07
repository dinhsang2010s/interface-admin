import {useRequest} from "../hooks/useRequest";

export const useGetProfile = async (): Promise<{ id: string, exp: number }> => {
    return await useRequest<{ id: string, exp: number }>({
        url: "users/profile",
        method: "GET",
    });
};

export const useLogin = async (dto: LoginDto): Promise<IToken | null> => {
    return await useRequest<IToken>({
        url: "auth/login",
        method: "POST",
        body: dto,
    });
};
