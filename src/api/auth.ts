import { useRequest } from "../hooks/useRequest";

export const useGetProfile = async (): Promise<{
  loading: boolean;
  result: any;
}> => {
  return await useRequest<any>({
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
