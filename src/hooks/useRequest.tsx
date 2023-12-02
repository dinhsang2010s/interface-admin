import axios, { AxiosRequestConfig, Method } from "axios";

interface IRequest {
  url: string;
  method: Method;
  body?: any;
}

export const useRequest = async <T,>(request: IRequest): Promise<T> => {
  try {
    const { url, method, body } = request;
    const baseURL = `${import.meta.env.VITE_BASE_URL_DB}${url}`;
    const token = localStorage.getItem("token") ?? "";
    const config: AxiosRequestConfig = {
      baseURL,
      method: method,
      timeout: 15 * 1000,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
    };

    if (body) config.data = body;

    return (await axios.request(config)).data;
  } catch (error: any) {
    const { data, statusText } = error.response;
    throw {
      message: data.message ?? statusText,
    };
  }
};

export const useGetProfile = async (): Promise<object> => {
  return useRequest<object>({
    url: "users/profile",
    method: "GET",
  });
};

export const useLogin = async (dto: LoginDto): Promise<IToken> => {
  return useRequest<IToken>({
    url: "auth/login",
    method: "POST",
    body: dto,
  });
};
