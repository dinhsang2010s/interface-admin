import axios, {AxiosRequestConfig, Method} from "axios";

interface IRequest {
    url: string;
    method: Method;
    body?: any;
    params?: any;
}

export const useRequest = async <T, >(request: IRequest): Promise<T> => {
    try {
        const {url, method, body, params} = request;
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

        if (params) config.params = params;
        if (body) config.data = body;

        return (await axios.request(config))?.data ?? null;
    } catch (error: any) {
        let message: "";
        if (error.response)
            message = error?.response.data.message ?? error?.response.statusText;
        else message = error.message;

        throw {message};
    }
};

export const getPagination = async <T, >({
                                             url,
                                             params,
                                         }: {
    url: string;
    params?: Record<string, string | number>;
}): Promise<IPagination<T>> => {
    return await useRequest<IPagination<T>>({
        url: url,
        method: "GET",
        params,
    });
};

export const getAll = async <T, >({url}: { url: string }): Promise<T> => {
    return await useRequest<T>({
        url,
        method: "GET",
    });
};

export const update = async <T, M>({
                                       url,
                                       method,
                                       body,
                                       params,
                                   }: {
    url: string;
    method?: Method;
    body: M;
    params?: Record<string, string | number>;
}): Promise<T> => {
    return await useRequest<T>({
        url,
        method: method || "POST",
        body,
        params: {...params},
    });
};

export const del = async (url: string): Promise<void> => {
    await useRequest({url, method: "DELETE"});
};
